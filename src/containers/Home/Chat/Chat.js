import React, { Component } from 'react';
import classes from './Chat.css';

import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {IconButton} from '@mui/material';

import PersonalChat from '../../../components/Home/Chat/PersonalChat/Chat';

class Chat extends Component {

    render(){
        return (
            <div className={classes.Chat}>
                <div className={classes.Header}>
                    <div></div>
                    <div className={classes.Switch}>
                        <button className={classes.ActiveButton}>Chat</button>
                        <button>Classes</button>
                    </div>
                    <div className={classes.Option}>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                        <IconButton>
                            <MoreVertIcon />
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

export default Chat;