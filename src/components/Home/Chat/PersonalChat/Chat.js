import React from 'react';

import ChatItem from '../ChatItem/ChatItem';
import classes from './Chat.css';
const Chat = (props) => {

    return(
        <div className={classes.Chat}>
            {props.chatList.map((data,i) => <ChatItem data={data} key={i} changeChatId={props.changeChatId}/>)}
        </div>
    );
}

export default Chat;