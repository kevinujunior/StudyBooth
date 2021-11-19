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
        posts: null,
        loading: true,
    }

    componentWillMount(){

        console.log(this.props.location)
        this.props.onFetchFeed();
        this.props.onFetchCurrentUser();

        let userId = this.props.location.userId ? this.props.location.userId : localStorage.getItem('user');

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
            if(res.data.length >= 1 || userId === localStorage.getItem('user')){ 
                //res.data will have length greater than 1 if current user follow other user.
                axios.get('feed/get_post/?viewUserPost='+userId)
                .then(res => {
                    this.setState({
                        posts: res.data,
                        loading: false,
                    })
                })
                .catch(err => console.log(err))
            }
            else{
                this.setState({
                    loading:false,
                })
            }

        })
        .catch(err => console.log(err))


    }

    render(){
        let profileClasses = [classes.Profile];
        if(this.props.theme === 'dark'){
            profileClasses.push(classes.Dark);
        }
        return (
            <div className={profileClasses.join(" ")}>
                <Navbar />
                {this.state.loading ? <Spinner /> : <div className={classes.main}>
                    {this.state.posts ? <RightPanel user={this.state.userData}/> : <NotFollowedProfile user={this.state.userData ? this.state.userData[0] : null} />}
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
        onFetchFeed: () => dispatch(actions.fetchFeed())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Profile));