import React, { Component } from "react";
import classes from './CommentItem.css';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {IconButton } from '@mui/material';


class CommentItem extends Component {

    state = {
        isRepliesVisible: false,
        isReplyBoxVisible: false,
    }
    
    
    toggleReplyBox = (currState) => {
        this.setState({
            isReplyBoxVisible: !currState,
        });
    }

    render(){
        let time = Math.floor((new Date().getTime() - new Date(this.props.createdAt).getTime())/(1000*60));
        let cmtItemClasses = [classes.CommentItem];
        let replyBoxClasses = [classes.ReplyBox];
        if(this.props.theme === 'dark'){
            cmtItemClasses.push(classes.Dark)
        }

        if(this.state.isReplyBoxVisible){
            replyBoxClasses.push(classes.Visible)
        }

        return (
            <div className={cmtItemClasses.join(' ')}>
                <div>
                    <img src={this.props.userPic} className={classes.CommentorImage}/>
                </div>
                <div className={classes.Comment}>
                    <div className={classes.CommentInfo}>
                        <p>{this.props.user}</p>
                        <p className={classes.Time}>{time < 60 ? time+"min ago":  time <= 1440 ? Math.floor(time/60)+"hr ago": Math.floor(time/(60*24))+"d ago"}</p>
                    </div>
                    <p>{this.props.comment}</p>
                    <div className={classes.Actions}>
                        <button onClick={() => this.toggleReplyBox(this.state.isReplyBoxVisible)}>Reply</button>
                        <button>Show replies</button>
                    </div>
                    <div className={replyBoxClasses.join(' ')}>
                        <input placeholder="enter a reply..."></input>
                        <IconButton>
                            <SendRoundedIcon style={{color:"#1e90ff"}}/>
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentItem;