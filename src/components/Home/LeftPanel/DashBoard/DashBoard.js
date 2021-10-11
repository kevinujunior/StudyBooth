import React, { Component } from 'react';

import classes from './DashBoard.css';
import DashBoardItems from './DashBoardItems/DashBoardItem';
import Profile from '../Profile/Profile'
import Sections from './Sections/Sections';

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
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
                    <DashBoardItems name="Feed" icon = {<HomeOutlinedIcon />} active = {this.state.selected === "Feed"} onClick = {() => this.changeSelected("Feed")}/>
                    <DashBoardItems name="Sections" icon = {<ListAltOutlinedIcon />} active = {this.state.selected === "Sections"} onClick = {() => this.changeSelected("Sections")}/>
                    <Sections visible = {this.state.selected === "Sections"} />
                    <DashBoardItems name="MyClass" icon = {<ClassOutlinedIcon />} active = {this.state.selected === "MyClass"} onClick = {() => this.changeSelected("MyClass")}/>
                    <DashBoardItems name="Questions" icon = {<HelpOutlineOutlinedIcon />} active = {this.state.selected === "Questions"} onClick = {() => this.changeSelected("Questions")}/>
                </div>
                <div className = {classes.Bottom}>
                    <DashBoardItems name="Logout" icon = {<LogoutOutlinedIcon />}/>
                </div>
            </div>
        )
    }
}

export default DashBoard;