import React, { Component } from "react";
import classes from './CommentItem.css';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {IconButton } from '@mui/material';
import {withRouter} from 'react-router-dom'
import ActionPopUp from '../../ActionPopup/CommentActionPopup';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions/index';
import onClickOutside from 'react-onclickoutside';
import axios from '../../../../../../../axios_base';
import CommentRepliedItem from "../CommentRepliedItem/CommentRepliedItem";


class CommentItem extends Component {

    state = {
        isRepliesVisible: false,
        isReplyBoxVisible: false,
        isActionPopUpVisible: false,
        reply:"",
    }
    
    
    toggleReplyBox = (currState) => {
        this.setState({
            isReplyBoxVisible: !currState,
            isRepliesVisible: !currState ? false : this.state.isRepliesVisible,
        });
    }

    handleClickOutside = () => {
        this.setState({
            isActionPopUpVisible:false,
        })
    }

    createNewReplyComment = () => {
        const data = {
            post : this.props.postId,
            commentText : this.state.reply,
            commentatorUser : localStorage.getItem('user'),
            parent: this.props.id,
        }
        axios.post("feed/create_comment/", data)
        .then(res =>{
            this.setState({
                isRepliesVisible:true,
                reply:"",
                isReplyBoxVisible:false,
            })
            this.props.refreshComment()
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        console.log(this.props.replies)
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
        let currUserID = localStorage.getItem('user');


        let replies = <p>Loading...</p>;
        if(this.props.replies){
            replies = this.props.replies.map(comment =>{
                return  <CommentRepliedItem
                    theme = {this.props.theme}
                    user = {comment.commentatorUser.username}
                    key={comment.id}
                    id={comment.id}
                    postId={this.props.postId}
                    userId = {comment.commentatorUser.id}
                    comment = {comment.commentText}
                    userPic = {comment.commentatorUser.userPic}
                    createdAt = {comment.createdAt}
                    refreshComment = {this.props.refreshComment}
                />    
            })
        }


        return (
            <div className={cmtItemClasses.join(' ')}>
                <div onClick={() => this.props.history.push({
                    pathname: '/profile',
                    userId: this.props.userId,
                })} style={{'cursor':'pointer'}}>
                    <img src={this.props.userPic ? this.props.userPic : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtpifVQVd-5cglJ6GahRdGyMVW_ZbY_CJD5w&usqp=CAU"} className={classes.CommentorImage} alt="xxx"/>
                </div>
                <div className={classes.Comment}>
                    <div className={classes.CommentInfo}>
                        <p>{this.props.user}</p>

                        <div style={{'display':'flex', 'alignItems':'center'}}>
                            <p className={classes.Time}>{time < 60 ? time+"min ago":  time <= 1440 ? Math.floor(time/60)+"hr ago": Math.floor(time/(60*24))+"d ago"}</p>

                            <MoreHorizIcon style={{'marginLeft':'5px', 'cursor':'pointer'}} className={classes.IconColor} onClick = {() => {this.setState({
                                isActionPopUpVisible: !this.state.isActionPopUpVisible
                            })}}/>
                        </div>

                    </div>

                    <p>{this.props.comment}</p>

                    <div className={classes.Actions}>
                        <button onClick={() => this.toggleReplyBox(this.state.isReplyBoxVisible)}>Reply</button>
                        <button onClick={() => this.setState({
                            isRepliesVisible: !this.state.isRepliesVisible,
                            isReplyBoxVisible: !this.state.isRepliesVisible ? false : this.state.isReplyBoxVisible,
                        })}>Show replies</button>
                    </div>

                    <div className={replyBoxClasses.join(' ')}>
                        <input placeholder="enter a reply..." onChange={(e) => this.setState({
                            reply: e.target.value,
                        })}></input>
                        <IconButton onClick={this.createNewReplyComment}>
                            <SendRoundedIcon style={{color:"#1e90ff"}}/>
                        </IconButton>
                    </div>
                    {this.props.userId == currUserID ? <ActionPopUp Visible={this.state.isActionPopUpVisible} userId={this.props.userId} deleteCmt ={ async () => {
                        const res = await this.props.onCommentDelete(this.props.id);
                        if(res !== null) this.props.refreshComment();
                    }}/> : null}
                    {this.state.isRepliesVisible ? <div style={{'marginTop':'10px'}}>{replies}</div> : null}
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCommentDelete: (commentId) => actions.deleteComment(commentId)
    }
}
export default connect(null, mapDispatchToProps)(withRouter(onClickOutside(CommentItem)));