import React, {useState, useRef, useEffect} from 'react';
import classes from './MessageBox.css';
import { IconButton } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const MessageBox = (props) => {

    const [message, setMessage] = useState("");

    const node = useRef(null);

    useEffect(() => {
        const domNode = node.current;
        if(domNode) domNode.scrollTop = domNode.scrollHeight;
    },[props.messages])

    const renderMessages = (messages) => {
        const currentUser = props.username;
        if(messages === undefined) return;
        return messages.map((message, i) => (
            <div  
                id={message.id}
                className={[classes.MsgRow , message.author === currentUser ? classes.Sent : classes.Received].join(" ")}>
                <img src="http://emilcarlsson.se/assets/mikeross.png" />
                <div className={classes.Msg}>
                    <div >
                        <p style={{fontSize:'11px'}}>{message.author}</p>
                        <small style={{fontSize:'11px'}}>
                        {Math.round((new Date().getTime() - new Date(message.timestamp).getTime())/60000)} minutes ago
                        </small>
                    </div>
                    <p>{message.content}</p>
                </div>
            </div>
        ));
    }


    return(
      <div className={[classes.MessageBox, props.show ? classes.Show : null,].join(" ")}>
          <div className={classes.Head}>
            <p>Chat++</p>
          </div>
          <div className={classes.Messages} ref={node}>
                {renderMessages(props.messages)}
          </div>
          <div className={classes.Input}>
                <div className={classes.Comment}>
                    <input type="text" value={message}  placeholder="enter a message..." onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => {
                        if (e.code === "Enter") {
                            e.preventDefault()
                            props.send(e, message);
                            setMessage("");
                        }
                    }}/>
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