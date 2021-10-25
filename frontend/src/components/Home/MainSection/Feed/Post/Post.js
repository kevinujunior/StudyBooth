import React, {Component} from 'react';
import classes from './Post.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {IconButton } from '@mui/material';
import ActionPopUp from './ActionPopup/ActionPopup';
import CommentSection from './Comment/CommentSection';
import axios from 'axios';
import {connect } from 'react-redux';


class Post extends Component{

    state = {
        isActionsVisible : false,
        isCommentVisibe : false,
        loadedPost : null,
        commentText : "",
    }

    postComment = () => {

            const data = {
                post : this.state.loadedPost,
                commentText : this.state.commentText,
                commentatorUser : 1,
            }
            axios.post("http://localhost:8000/feed/comments/", data)
            .then(response =>{
             console.log(this.state.loadedPost)
            })
            .catch(err => console.log(err));
        
    }

    commentHandler = (event) => {
        // if(event.target.files[0] === null) return;
        console.log("hello")
        console.log(this.props.id)
        this.setState({
            loadedPost: this.props.id,
            commentText: event.target.value,
        })
    }

    toggleActions = (actionState) =>{
        this.setState({
            isActionsVisible: !actionState,
        })
    }

    toggleCommentSection = (commentSectionState) => {
        this.setState({
            isCommentVisibe: !commentSectionState,
        })
    }
    
    render(){
        let postClasses = [classes.Post]
        if(this.props.theme === 'dark') postClasses.push(classes.Dark);

        let time = Math.floor((new Date().getTime() - new Date(this.props.time).getTime())/(1000*60)); //time in minutes

        console.log(time)
        return (
            <div className={postClasses.join(' ')}>
                <div className={classes.Header}>
                    <div className={classes.NamePhoto}>
                        <img src = {this.props.profileImage} alt=""/>
                        <p>{this.props.name}</p>
                        <p className={classes.Time}>{time < 60 ? time+"min ago":  time <= 1440 ? Math.floor(time/60)+"hr ago": Math.floor(time/(60*24))+"d ago"}</p>
                    </div>
                    <div className={classes.Category}>
                        <p>{this.props.category}</p>
                        {/* <IconButton onClick = {() => this.toggleActions(this.state.isActionsVisible)}> */}
                        <IconButton onClick = {this.toggleActions.bind(this,this.state.isActionsVisible)}>
                            <MoreHorizIcon className={classes.IconColor}/>
                        </IconButton>
                    </div>
                </div>

                <div className={classes.PostInfo}>
                    <p>{this.props.about}</p> 
                </div>

                <div className={classes.PostImage}>
                    <img src = {this.props.postImage}  alt=""/>
                </div>

                <div className={classes.Interact}>
                    <div className={classes.Icons}>
                        <div className={classes.IconLeft}>
                            <IconButton>
                                <FavoriteBorderOutlinedIcon style={{color:"crimson"}}/>
                            </IconButton>
                            <p>{this.props.likesCount}</p>
                            <IconButton onClick={() => this.toggleCommentSection(this.state.isCommentVisibe)}>
                                <CommentOutlinedIcon style={{color:"grey"}}/>
                            </IconButton>
                            <p>{this.props.commentCount}</p>
                        </div>
                        <div className={classes.VerticalLine}></div>
                        <div className={classes.Comment}>
                            <input type="text" value ={this.state.commentText} placeholder="write a comment..." onChange={this.commentHandler}/>
                        </div>
                        <IconButton>
                            <SendRoundedIcon style={{color:"#1e90ff"}} onClick={this.postComment}/>
                        </IconButton>
                    </div>
                </div>

                <ActionPopUp Visible={this.state.isActionsVisible}/>
                <CommentSection comments ={this.props.comments} theme={this.props.theme} Visible={this.state.isCommentVisibe}/>
            </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

export default connect(mapStateToProps)(Post);
