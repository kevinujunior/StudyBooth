import React, { Component } from "react";
import classes from './CommentItem.css';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {IconButton } from '@mui/material';
import {withRouter} from 'react-router-dom'
import ActionPopUp from '../../ActionPopup/CommentActionPopup';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {connect } from 'react-redux';
import * as actions from '../../../../../../../store/actions/index';
import onClickOutside from 'react-onclickoutside'


class CommentItem extends Component {

    state = {
        isRepliesVisible: false,
        isReplyBoxVisible: false,
        isActionPopUpVisible: false,
    }
    
    
    toggleReplyBox = (currState) => {
        this.setState({
            isReplyBoxVisible: !currState,
        });
    }

    handleClickOutside = () => {
        this.setState({
            isActionPopUpVisible:false,
        })
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
                        <button>Show replies</button>
                    </div>

                    <div className={replyBoxClasses.join(' ')}>
                        <input placeholder="enter a reply..."></input>
                        <IconButton>
                            <SendRoundedIcon style={{color:"#1e90ff"}}/>
                        </IconButton>
                    </div>
                    {this.props.userId == currUserID ? <ActionPopUp Visible={this.state.isActionPopUpVisible} userId={this.props.userId} deleteCmt ={ async () => {
                        const res = await this.props.onCommentDelete(this.props.id);
                        if(res !== null) this.props.refreshComment();
                    }}/> : null}
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