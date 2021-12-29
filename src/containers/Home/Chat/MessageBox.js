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

        console.log(messages)
        return messages.map((message, i) => {

            let time = Math.floor((new Date().getTime() - new Date(message.timestamp).getTime())/(1000*60)); //time in minutes
            time = Math.max(time, 0);

            return (
                <div  
                    key={i}
                    className={[classes.MsgRow , message.user === currentUser ? classes.Sent : classes.Received].join(" ")}>
                    <img src="http://emilcarlsson.se/assets/mikeross.png" />
                    <div className={classes.Msg}>
                        <div >
                            <p style={{fontSize:'11px'}}>{message.user}</p>
                            <small style={{fontSize:'11px'}}>
                            {time ? time < 60 ? time+"min ago":  time <= 1440 ? Math.floor(time/60)+"hr ago": Math.floor(time/(60*24))+"d ago" : ""}
                            </small>
                        </div>
                        <p>{message.content}</p>
                    </div>
                </div>
            )
        });
    }


    return(
      <div className={[classes.MessageBox, props.show ? classes.Show : null,].join(" ")}>
          <div className={classes.Head}>
            <h1>{props.chatName}</h1>
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