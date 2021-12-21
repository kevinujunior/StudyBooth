import React, {useState} from 'react';
import classes from './MessageBox.css';
import { IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const MessageBox = (props) => {

    const [message, setMessage] = useState("");
    console.log(props.messages)

    const renderMessages = (messages) => {
        const currentUser = "user1";
        console.log(messages)
        if(messages === undefined) return;
        return messages.map((message, i) => (
            <div key={message.id}>
                <li  
                    className={message.author === currentUser ? classes.Sent : classes.Received}>
                    <img src="http://emilcarlsson.se/assets/mikeross.png" />
                    <p>{message.content}
                        <br />
                        <small style={{fontSize:'11px'}}>
                        {Math.round((new Date().getTime() - new Date(message.timestamp).getTime())/60000)} minutes ago
                        </small>
                    </p>
                </li>
            </div>
        ));
      }
    return(
      <div className={[classes.MessageBox, props.show ? classes.Show : null,].join(" ")}>
          <div className={classes.Head}>
            <p>UserName</p>
          </div>
          <div className={classes.Messages}>
            <ul>
                {renderMessages(props.messages)}
            </ul>
          </div>
          <div className={classes.Input}>
                <div className={classes.Comment}>
                    <input type="text" value={message}  placeholder="write a comment..." onChange={(e) => setMessage(e.target.value)}/>
                </div>
                <IconButton onClick={(e) => {
                    props.send(e, message);
                    setMessage("");
                }}>
                    <SendRoundedIcon style={{color:"#1e90ff"}} fontSize="huge"/>
                </IconButton>
          </div>
      </div>
    )
}

export default MessageBox;