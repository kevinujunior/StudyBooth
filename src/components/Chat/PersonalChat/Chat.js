import React from 'react';

import ChatItem from '../ChatItem/ChatItem';
import classes from './Chat.css';
const Chat = (props) => {

    let curruserId = localStorage.getItem('user');
    return(
        <div className={classes.Chat}>
            {props.chatList.map((data,i) => {
                let key = data.author ? curruserId == data.author.id ? data.friend.username : data.author.username : data.name;
                return <ChatItem data={data} key={key} changeChatId={props.changeChatId}/>
            })}
        </div>
    );
}

export default Chat;