import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navbar from '../../components/Home/Header/Header'
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import MainSection from './MainSection/MainSection';

import classes from './Profile.css';
import * as actions from '../../store/actions/index';
import axios from '../../axios_base'


class Profile extends Component{

    state = {
        userData: null,
        posts: null,
    }

    componentWillMount(){
        this.props.onFetchFeed();
        this.props.onFetchCurrentUser();
        axios.get('users/profileview/?viewUser='+1)
        .then(res => {
            console.log(res.data)
            this.setState({
                userData: res.data,
            })
        })
        .catch(err => console.log(err))

        axios.get('feed/get_post/?viewUserPost='+1)
        .then(res => {
            console.log(res.data)
            this.setState({
                posts: res.data,
            })
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
                <div className={classes.main}>
                    <LeftPanel />
                    <MainSection posts={this.state.userData ? this.state.userData[0] ? this.state.userData[0].viewUser : null : null}/>
                    <RightPanel user={this.state.userData}/>
                </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Profile);