import React, { Component } from 'react';
import {connect} from 'react-redux';
import Navbar from '../../components/Home/Header/Header'
import LeftPanel from './LeftPanel/LeftPanel';
import RightPanel from './RightPanel/RightPanel';
import MainSection from './MainSection/MainSection';

import classes from './Profile.css';
import * as actions from '../../store/actions/index'


class Profile extends Component{

    componentDidMount(){
        this.props.onFetchFeed();
        this.props.onFetchCurrentUser();
    }
    render(){
        return (
            <div>
                <Navbar />
                <div className={classes.main}>
                    <LeftPanel />
                    <MainSection />
                    <RightPanel />
                </div>
            </div>
        );
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchCurrentUser: () => dispatch(actions.fetchCurrentUser()),
        onFetchFeed: () => dispatch(actions.fetchFeed())
    }
}
export default connect(null, mapDispatchToProps)(Profile);