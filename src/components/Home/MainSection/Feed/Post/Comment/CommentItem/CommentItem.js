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

import {deleteComment} from '../../../../../../../store/actions/feed'

class CommentItem extends Component {

    state = {
        isRepliesVisible: false,
        isReplyBoxVisible: false,
        isActionPopUpVisible: false,
        reply:"",
        replies:[],
        repliesNextPageNo:1,
        repliesCount: 0,
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
            this.fetchReplies(true);
        })
        .catch(err => {
            console.log(err)
        })
    }

    fetchReplies = (shouldRefresh) => {
        console.log("refresh called", shouldRefresh)
        if(shouldRefresh){
            this.setState({
                repliesNextPageNo:1,
                replies:[],
            })
        }
        
        if(this.state.repliesNextPageNo == null) return;
        axios.get(`feed/get_comment/replies/?parent=${this.props.id}&page=${this.state.repliesNextPageNo}`)
        .then(res =>{
            console.log(res)
            let repliesNextPage = res.data.next ? res.data.next.match(/page=.*&/gm)[0] : null;
            if(repliesNextPage) repliesNextPage = String(repliesNextPage).substring(5, repliesNextPage.length-1);
            
            this.setState({
                replies: this.state.replies.concat(res.data.results),
                repliesNextPageNo: repliesNextPage,
                repliesCount: res.data.count
            })

            console.log('replies', this.state.replies)
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount(){
        this.fetchReplies()
    }

    


    render(){
        let time = Math.floor((new Date().getTime() - new Date(this.props.createdAt).getTime())/(1000*60)) ;
        time = Math.max(0,time);
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
        if(this.state.replies.length > 0){
            replies = this.state.replies.map(comment =>{
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
                    refreshReplies = {this.fetchReplies}
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
                        })}><span>{ this.state.repliesCount > 0 ? this.state.repliesCount+" replies" : null}</span></button>
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
                        const res = await deleteComment(this.props.id);

                        if(res !== null) this.props.refreshComment(true);
                    }}/> : null}
                    {this.state.isRepliesVisible && this.state.replies.length > 0 ? <div style={{'marginTop':'10px'}}>
                        {replies}
                        {this.state.repliesNextPageNo != null ? <div onClick={() => this.fetchReplies()}><p>load more replies</p></div> : null}
                    </div> : null}
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