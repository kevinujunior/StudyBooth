import React, { Component } from 'react';
import classes from './Chat.css';
import {connect } from 'react-redux';

import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton} from '@mui/material';


import PersonalChat from '../../../components/Home/Chat/PersonalChat/Chat';

class Chat extends Component {

    componentDidUpdate(){
        console.log(this.props)
    }
    render(){
        let chatclasses = [classes.Chat];
        if(this.props.theme === 'dark') chatclasses.push(classes.Dark)
        if(this.props.isActive){
            chatclasses.push(classes.ActiveChat)
        }
        return (
            <div className={chatclasses.join(" ")}>
                <div className={classes.Header}>
                    <div></div>
                    <div className={classes.Switch}>
                        <button className={classes.ActiveButton}>Chat</button>
                        <button>Classes</button>
                    </div>
                    <div className={classes.Option}>
                        <IconButton>
                            <SearchIcon className={classes.IconColor}/>
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon className={classes.IconColor} />
                        </IconButton>
                    </div>
                </div>
                <div>
                    <PersonalChat />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

export default connect(mapStateToProps)(Chat);