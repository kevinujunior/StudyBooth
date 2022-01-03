import React, { Component } from 'react';
import {connect} from 'react-redux';
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
        userId : this.props.location.userId ? this.props.location.userId : localStorage.getItem('user'),
        loading:false,
    }

    postFollow = () =>{
        //this postFollow function will be called from NFP
        console.log("post follow called ");

        let currUserId = localStorage.getItem('user')
        let testid = this.props.location.userId
        if(testid!==currUserId){ 
            this.setState({loading:true})
            axios.post("users/followingview/",{
                currUser : currUserId,
                followingUser : this.props.location.userId
            }).then(res => {
                //if we followed the user of whom we were viewing profile then we should refresh userData
                this.props.onFetchUserData(testid, () => this.setState({
                    loading:false
                }));
            })
            .catch(err=>console.log(err))
        }
    }

    postUnfollow= () => { 
        this.setState({loading:true})
        axios.delete('users/unfollow/'+this.state.userId)
        .then(res => {
            //we have to reset profile to show unfollowed profile
            this.props.onFetchUserData(this.state.userId, () => this.setState({
                loading:false
            }));
        })
        .catch(err => console.log(err))
    }

    componentWillUnmount(){
        //when profile will unmount then we setHomeLoading true and fetch latest feed for home
        // this.props.onSetHomeLoading();
        if(this.props.history.action === "POP") {
            this.props.onPageChange('/home', () => {
                this.props.history.replace('/home')
            })
        }
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
            }} style={{'marginTop':`${this.props.device === 'mobile' ? '0px' : '51px'}`}}>
                {this.state.loading ? <div className={[classes.emptyBox, this.props.theme === 'dark' ? classes.Dark : null].join(" ")}>
                    <Spinner /> 
                </div>: <div className={classes.main}>
                    {this.props.posts ? <RightPanel user={this.props.userData} postUnfollow={this.postUnfollow}/> : <NotFollowedProfile user={this.props.userData ? this.props.userData[0] : null} postFollow={this.postFollow}  />}
                    {this.props.posts ? <MainSection posts={this.props.posts}/> : null}
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
        loading: state.page.pageLoading && state.page.whichPage==='/profile',
        device: state.page.whichDevice,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchUserData : (userId,callBack) => dispatch(actions.fetchUserData(userId)).then(() => callBack()),
        onFetchUserPosts : (pageno, userId) => dispatch(actions.fetchUserPosts(pageno, userId)),
        onFetchFeed : () => dispatch(actions.fetchFeed(1)),
        // onSetHomeLoading : () => dispatch(actions.setHomeLoading(true))
        onPageChange : (page, callBack) => dispatch(actions.changePage(page)).then(() => callBack())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));