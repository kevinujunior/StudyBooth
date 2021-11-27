import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navbar from '../../components/Home/Header/Header'
import NotFollowedProfile  from './NotFollowedProfile/NotFollowedProfile';
import RightPanel from './RightPanel/RightPanel';
import MainSection from './MainSection/MainSection';
import { withRouter } from 'react-router';
import classes from './Profile.css';
import * as actions from '../../store/actions/index';
import axios from '../../axios_base';
import Spinner from '../../components/UI/Spinner/Spinner';

class Profile extends Component{

    state = {
        userData: null,
        posts: [],
        loading: true,
        currPage:1,
        userId : this.props.location.userId ? this.props.location.userId : localStorage.getItem('user')
    }

    postFollow = () =>{
        //this postFollow function will be called from NFP
        console.log("post follow called ");

        let currUserId = localStorage.getItem('user')
        let testid = this.props.location.userId
        if(testid!==currUserId)
           { axios.post("users/followingview/",{
                currUser : currUserId,
                followingUser : this.props.location.userId
            }).then(res => {
                //if we followed the user of whom we were viewing profile then we should refresh userData
                this.setState({
                    loading:true
                })
                this.fetchUserData();
            })
            .catch(err=>console.log(err))
        }
    }

    postUnfollow= () => { 
        axios.delete('users/unfollow/'+this.props.location.userId)
        .then(res => this.setState({
            posts:null,
        }))
        .catch(err => console.log(err))
    }

    fetchUserData(){
        let userId = this.state.userId;

        //this will fetch the user profile details
        axios.get('users/profileview/?viewUser='+userId)
        .then(res => {
            console.log(res.data)
            this.setState({
                userData: res.data,
            })
        })
        .catch(err => console.log(err))

        //this will fetch the user posts if followed by current user or current user watching his/her profile.
        axios.get('/users/followingview/?followingUser='+userId)
        .then(res => {
            console.log("im following", res)
            if(res.data.length >= 1 || userId === localStorage.getItem('user')){ 
                //res.data will have length greater than 1 if current user follow other user.
                this.fetchUserPosts(userId);
            }
            else{
                this.setState({
                    loading:false, //after fetching the data we should set loading false,
                })
            }

        })
        .catch(err => console.log(err))
    }

    fetchUserPosts = (userId) => {

        if(this.state.currPage == null) return;
        axios.get(`feed/get_post/?page=${this.state.currPage}&viewUserPost=${userId}`)
        .then(res => {
            console.log(res)
            this.setState({
                posts: this.state.posts.concat(res.data.results),
                loading: false,
                currPage : res.data.next ? res.data.next[res.data.next.length-17] : null
            })
        })
        .catch(err => console.log(err))
    }

    componentWillMount(){
        this.props.onFetchCurrentUser();
        this.fetchUserData()
    }

    render(){
        let profileClasses = [classes.Profile];
        if(this.props.theme === 'dark'){
            profileClasses.push(classes.Dark);
        }
        return (
            <div className={profileClasses.join(" ")} onScroll ={(e) => {
                //here we are checking the scroll of home page and if scroll reaches to end we are calling fetchFeed for next page.
                if(Math.round(e.target.scrollHeight -  e.target.scrollTop) === e.target.offsetHeight){
                    this.fetchUserPosts(this.state.userId);
                }
            }}>
                <Navbar />
                {this.state.loading ? <div className={[classes.emptyBox, this.props.theme === 'dark' ? classes.Dark : null].join(" ")}>
                    <Spinner /> 
                </div>: <div className={classes.main}>
                    {this.state.posts ? <RightPanel user={this.state.userData} postUnfollow={this.postUnfollow}/> : <NotFollowedProfile user={this.state.userData ? this.state.userData[0] : null} postFollow={this.postFollow}  />}
                    {this.state.posts ? <MainSection posts={this.state.posts}/> : null}
                </div>}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        theme: state.theme.theme
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));