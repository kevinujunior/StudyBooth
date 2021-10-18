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
                    <img src="https://i.pinimg.com/600x315/4b/74/cf/4b74cfb5f9ba362728b5ebfa6920b0f5.jpg" className={classes.CommentorImage}/>
                </div>
                <div className={classes.Comment}>
                    <div className={classes.CommentInfo}>
                        <p>@username</p>
                        <p>11:40 pm</p>
                    </div>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                    <div className={classes.Actions}>
                        <button onClick={() => this.toggleReplyBox(this.state.isReplyBoxVisible)}>Reply</button>
                        <button>Show replies</button>
                    </div>
                    <div className={replyBoxClasses.join(' ')}>
                        <input></input>
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