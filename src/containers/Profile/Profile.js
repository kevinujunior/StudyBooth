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
        postsCurrPageNo:null,
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
                this.props.onFetchUserData(testid);
            })
            .catch(err=>console.log(err))
        }
    }

    postUnfollow= () => { 
        axios.delete('users/unfollow/'+this.state.userId)
        .then(res => {
            //we have to rest profile to show unfollowed profile
            this.props.onFetchUserData(this.state.userId)
        })
        .catch(err => console.log(err))
    }

    componentWillUnmount(){
        //when profile will unmount then we setHomeLoading true and fetch latest feed for home
        this.props.onSetHomeLoading();
        this.props.onFetchFeed();
    }

    render(){
        let profileClasses = [classes.Profile];
        if(this.props.theme === 'dark'){
            profileClasses.push(classes.Dark);
        }
        return (
            <div className={profileClasses.join(" ")} onScroll ={(e) => {
                //here we are checking the scroll of home page and if scroll reaches to end we are calling fetchFeed for next page.
                if(Math.round(e.target.scrollHeight -  e.target.scrollTop) <= e.target.offsetHeight + 400){
                    if(this.props.nextPageNo == this.state.postsCurrPageNo) return; //if we are calling for same page again return;
                    this.props.onFetchUserPosts(this.props.nextPageNo, this.state.userId)
                    this.setState({
                        postsCurrPageNo: this.props.nextPageNo,
                    })
                }
            }}>
                <Navbar />
                {this.props.loading ? <div className={[classes.emptyBox, this.props.theme === 'dark' ? classes.Dark : null].join(" ")}>
                    <Spinner /> 
                </div>: <div className={classes.main}>
                    {this.props.posts.length > 0 ? <RightPanel user={this.props.userData} postUnfollow={this.postUnfollow}/> : <NotFollowedProfile user={this.props.userData ? this.props.userData[0] : null} postFollow={this.postFollow}  />}
                    {this.props.posts.length > 0 ? <MainSection posts={this.props.posts}/> : null}
                </div>}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
        userData: state.profile.userData,
        posts: state.profile.posts,
        nextPageNo: state.profile.nextPageNo,
        loading: state.profile.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
        onFetchUserData : (userId) => dispatch(actions.fetchUserData(userId)),
        onFetchUserPosts : (pageno, userId) => dispatch(actions.fetchUserPosts(pageno, userId)),
        onFetchFeed : () => dispatch(actions.fetchFeed(1)),
        onSetHomeLoading : () => dispatch(actions.setHomeLoading(true))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));