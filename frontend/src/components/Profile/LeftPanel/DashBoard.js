import React, { Component } from 'react';

import classes from './DashBoard.css';
import DashBoardItems from '../../Home/LeftPanel/DashBoard/DashBoardItems/DashBoardItem';
import Profile from '../../Home/LeftPanel/Profile/Profile'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {connect } from 'react-redux';
import * as actions from '../../../store/actions/index';


class DashBoard extends Component{

    state = {
        selected : "Feed",
    }

    changeSelected = (selected) => {
        this.setState({
            selected: selected,
        })
    }

    render(){
        return (
            <div className = {classes.DashBoard}>
                <Profile />
                <div>
                    <DashBoardItems name="Feed" icon = {<HomeOutlinedIcon />} active = {this.state.selected === "Feed"} onClick = {() => {
                        this.changeSelected("Feed");
                        this.props.onFetchFeed();
                        document.documentElement.scrollTop = 0;
                    }} />
                    <DashBoardItems name="MyClass" icon = {<ClassOutlinedIcon />} active = {this.state.selected === "MyClass"} onClick = {() => this.changeSelected("MyClass")}/>
                    <DashBoardItems name="Questions" icon = {<HelpOutlineOutlinedIcon />} active = {this.state.selected === "Questions"} onClick = {() => this.changeSelected("Questions")}/>
                </div>
                <div className = {classes.Bottom}>
                    <DashBoardItems name="Logout" icon = {<LogoutOutlinedIcon />} onClick = {this.props.onLogOut}/>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFeed: () => dispatch(actions.fetchFeed()),
        onLogOut : () => dispatch(actions.logout()),
    }
}

export default connect(null, mapDispatchToProps)(DashBoard);