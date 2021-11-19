import React, { Component } from 'react';

import classes from './DashBoard.css';
import DashBoardItems from './DashBoardItems/DashBoardItem';
import Profile from '../Profile/Profile'
import SectionItems from '../../../../containers/Home/Sections/SectionList';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import {connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';


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
                <div className={[classes.Component1, this.state.selected === "Sections" ? classes.SlideLeft_c1 : classes.SlideRight_c1].join(" ")}>
                    <div>
                        <DashBoardItems name="Feed" icon = {<HomeOutlinedIcon />} active = {this.state.selected === "Feed"} onClick = {() => {
                            this.changeSelected("Feed");
                            this.props.onFetchFeed();
                            document.documentElement.scrollTop = 0;
                        }} />
                        <DashBoardItems name="Sections" icon = {<ListAltOutlinedIcon />} active = {this.state.selected === "Sections"} onClick = {() => this.changeSelected("Sections")}/>
                        {/* <Sections visible = {this.state.selected === "Sections"} /> */}
                        <DashBoardItems name="MyClass" icon = {<ClassOutlinedIcon />} active = {this.state.selected === "MyClass"} onClick = {() => this.changeSelected("MyClass")}/>
                        <DashBoardItems name="Questions" icon = {<HelpOutlineOutlinedIcon />} active = {this.state.selected === "Questions"} onClick = {() => this.changeSelected("Questions")}/>
                    </div>
                    <div className = {classes.Bottom}>
                        <DashBoardItems name="Logout" icon = {<LogoutOutlinedIcon />} onClick = {this.props.onLogOut}/>
                    </div>
                </div>
                <div className={[classes.Component2, this.state.selected === "Sections" ? classes.SlideLeft_c2 : classes.SlideRight_c2].join(" ")}>
                    <button onClick = {() => this.changeSelected("Feed")}><ArrowBackIcon /></button>
                    <SectionItems />
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