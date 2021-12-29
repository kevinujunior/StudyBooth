import React, {Component} from 'react';
import classes from './Post.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {IconButton } from '@mui/material';
import ActionPopUp from './ActionPopup/PostActionPopup';
import CommentSection from './Comment/CommentSection';
import {connect } from 'react-redux';
import * as actions from '../../../../../store/actions/index';
import {withRouter} from 'react-router-dom'
import axios from '../../../../../axios_base';


class Post extends Component{

    state = {
        isActionsVisible : false,
        isCommentVisibe : false,
        commentText : "",
        cmtCount: this.props.commentCount,
        comments:[],
        loading:false,
        commentPageNo:1,
    }

    postComment = async () => {
        if(this.state.commentText === "" || this.state.commentText === " ") return; //we have to manage for empty comment
        this.setState({
            loading:true,
        })
        const data = {
            post : this.props.id,
            commentText : this.state.commentText,
            commentatorUser : localStorage.getItem('user'),
        }
        await this.props.onComment(data);
        this.setState({
            isCommentVisibe: true,
            commentText:"",
            loading: false,
        })

        console.log(this.state.commentPageNo)
        this.fetchComment(true);
    }

    fetchComment= (shouldRefresh) => {

        console.log("refresh", shouldRefresh)
        if(shouldRefresh){ //if we added new comment then we are passing a boolean to refresh the commentSection
            this.setState({
                commentPageNo:1,
                loading:true,
            })
        }

        console.log(this.state)

        if(this.state.commentPageNo == null) {
            console.log("null comments");
            return;
        };
        if(!shouldRefresh){
            this.setState({
                loading:true,
            })
        }
        axios.get(`feed/get_comment/?post=${this.props.id}&page=${this.state.commentPageNo}`)
        .then(res => {
            let cmtNextPage = res.data.next ? res.data.next.match(/page=.*&/gm)[0] : null;
            if(cmtNextPage) cmtNextPage = String(cmtNextPage).substring(5, cmtNextPage.length-1); //getting comment nexpage no

            console.log(res)

            this.setState({
                comments: shouldRefresh ? [...res.data.results] : this.state.comments.concat(res.data.results),
                loading:false,
                cmtCount: res.data.results.length > 0 ? res.data.results[0].commentCount : 0,
                commentPageNo : cmtNextPage
            })
        })
        .catch(err => console.log(err))
    }

    postLike = async () => {
        const data ={
            post: this.props.id,
            likeUser: localStorage.getItem('user'),
        }
        this.setState({
            loading:true,
        })
        await this.props.onLike(data, this.props.isLikedByuser, this.props.likeId);
        this.setState({
            loading:false,
        })
        
    }

    commentHandler = (event) => {
        // if(event.target.files[0] === null) return;
        this.setState({
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
        time = Math.max(time, 0);
        
        return (
            <div className={classes.Wrapper}>
                    <div className={postClasses.join(' ')}>
                    {this.state.loading ?<div className={classes.loader}>
                            <div className={classes.bar}></div>
                        </div> : null }
                    <div className={classes.Header}>
                        <div className={classes.NamePhoto} onClick={() => {
                            this.props.onFetchUserProfile(this.props.userId);
                            this.props.history.push({
                                pathname: '/profile',
                                userId: this.props.userId,
                            });
                        }}>
                            <img src = {this.props.profileImage? this.props.profileImage:"https://cdn.iconscout.com/icon/free/png-256/boy-avatar-4-1129037.png"} alt=""/>
                            
                            <p className={classes.userName}>{this.props.name}</p>
                            <p className={classes.Time}>{time ? time < 60 ? time+"min ago":  time <= 1440 ? Math.floor(time/60)+"hr ago": Math.floor(time/(60*24))+"d ago" : ""}</p>
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

                    {this.props.userId ? <div className={classes.Interact}>
                        <div className={classes.Icons}>
                            <div className={classes.IconLeft}>
                                <IconButton onClick = {this.postLike}>
                                    {this.props.isLikedByuser ? 
                                        <FavoriteIcon 
                                            style={{color:"crimson"}}
                                        /> : 
                                        <FavoriteBorderOutlinedIcon 
                                            style={{color:"crimson"}}
                                        /> 
                                    }
                                </IconButton>
                                <p>{this.props.likesCount}</p>
                                <IconButton onClick={() => this.toggleCommentSection(this.state.isCommentVisibe)}>
                                    <CommentOutlinedIcon style={{color:"grey"}}/>
                                </IconButton>
                                <p>{this.state.cmtCount}</p>
                            </div>
                            <div className={classes.VerticalLine}></div>
                            <div className={classes.Comment}>
                                <input 
                                    type="text" 
                                    value={this.state.commentText} 
                                    placeholder="write a comment..." 
                                    onChange={this.commentHandler}
                                />
                            </div>
                            <IconButton onClick={this.postComment}>
                                <SendRoundedIcon style={{color:"#1e90ff"}}/>
                            </IconButton>
                        </div>
                    </div>:null}
                    { this.state.isCommentVisibe ? 
                        <CommentSection 
                            theme={this.props.theme} 
                            fetchComment={this.fetchComment} 
                            comments={this.state.comments} 
                            postId={this.props.id} 
                            ifMoreComment={this.state.commentPageNo != null}/>  
                        : null
                    }
                </div>
                {this.state.isActionsVisible ?
                    <ActionPopUp 
                        userId={this.props.userId} 
                        onDeletePost={() => {
                            this.setState({
                                loading:true,
                            })
                            this.props.onDeletePost(this.props.id)
                        }}
                        close={() => this.setState({isActionsVisible:false})}
                    /> : 
                    null
                }
            </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        theme: state.theme.theme,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onComment : (data) => actions.createNewComment(data),
        onLike: (data, isLiked, likeId) => dispatch(actions.toggleLikeRequest(data, isLiked, likeId)),
        onDeletePost : (postId) => dispatch(actions.deletePost(postId)),
        onFetchUserProfile : (userId) => dispatch(actions.fetchUserData(userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
