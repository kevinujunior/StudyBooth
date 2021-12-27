import React from 'react';

import ChatItem from '../ChatItem/ChatItem';
import classes from './Chat.css';
const Chat = () => {

    return(
        <div className={classes.Chat}>
            <ChatItem />
        </div>
    );
}

export default Chat;