import React, { Component } from 'react';

import classes from './DashBoard.css';
import DashBoardItems from './DashBoardItems/DashBoardItem';
import Profile from '../Profile/Profile'
import SectionItems from '../../../../containers/Home/Sections/SectionList';
import ToggleButton from '../../../UI/ToggleButton/ToggleButton';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import {connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import * as actionsTypes from '../../../../store/actions/actionTypes';
import {withRouter} from 'react-router-dom';


class DashBoard extends Component{

    state = {
        selected : "Feed",
    }

    changeSelected = (selected,path) => {
        this.setState({
            selected: selected,
        })

        if(path){
            this.props.onPageChange(path, ()=> {
                this.props.history.push({
                    pathname:path,
                })
            })
        }

        if (this.props.closeLeftPanel) this.props.closeLeftPanel()
    }

    render(){
        return (
            <div className = {classes.DashBoard}>
                <Profile close={this.props.closeLeftPanel}/>
                <div className={[classes.Component1, this.state.selected === "Sections" ? classes.SlideLeft_c1 : classes.SlideRight_c1].join(" ")}>
                    <div>
                        <DashBoardItems name="Feed" icon = {<HomeOutlinedIcon />} active = {this.state.selected === "Feed"} onClick = {() => {
                            this.changeSelected("Feed", "/home");
                            document.documentElement.scrollTop = 0;
                        }} />
                        {/* <DashBoardItems name="Sections" icon = {<ListAltOutlinedIcon />} active = {this.state.selected === "Sections"} onClick = {() => this.changeSelected("Sections")}/> */}
                        <DashBoardItems name="Chat" icon = {<ChatBubbleOutlineOutlinedIcon />} active = {this.state.selected === "Chat"} onClick = {() => {
                            this.changeSelected("Chat","/chat")
                        }}/>
                        <DashBoardItems name="Settings" icon = {<SettingsIcon />} active = {this.state.selected === "Settings"} onClick = {() => {
                            this.changeSelected("Settings","/settings")
                        }}/>
                        <DashBoardItems name="About" icon = {<InfoIcon />} active = {this.state.selected === "About"} onClick = {() => {
                            this.changeSelected("About","/about")
                        }}/>
                        {/* <Sections visible = {this.state.selected === "Sections"} /> */}
                        {/* <DashBoardItems name="MyClass" icon = {<ClassOutlinedIcon />} active = {this.state.selected === "MyClass"} onClick = {() => this.changeSelected("MyClass")}/>
                        <DashBoardItems name="Questions" icon = {<HelpOutlineOutlinedIcon />} active = {this.state.selected === "Questions"} onClick = {() => this.changeSelected("Questions")}/> */}
                    </div>
                    <div className = {classes.Bottom}>
                        <DashBoardItems name="Logout" icon = {<LogoutOutlinedIcon />} onClick = {this.props.onLogOut}/>
                        <div className={classes.ToggleBtn}>
                            <ToggleButton theme={this.props.theme} onClick = {() => {this.props.onChangeTheme(this.props.theme);this.props.closeLeftPanel()}} />
                        </div>
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

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogOut : () => dispatch(actions.logout()),
        onChangeTheme: (theme) => {
            //here we are changing theme of basis of current theme
            if(theme === 'light') return dispatch({type: actionsTypes.DARK_THEME})
            return dispatch({type: actionsTypes.LIGHT_THEME})
        },
        onPageChange : (page, callBack) => dispatch(actions.changePage(page)).then(() => callBack())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(DashBoard));