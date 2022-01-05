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

import ImageLoading from '../../../../UI/ImageLoading/ImageLoading';


class Post extends Component{

    state = {
        isActionsVisible : false,
        isCommentVisibe : false,
        commentText : "",
        cmtCount: this.props.commentCount,
        comments:[],
        loading:false,
        commentPageNo:1,
        isLiked:this.props.isLikedByuser,
        likeId: this.props.likeId,
        likeCount: this.props.likesCount,

        postImageRef: React.createRef(null),
        postImgLoaded:false,
        profileImageRef: React.createRef(null),
        profileImageLoaded:false,
        
    }

    componentDidMount() {
        this.state.postImageRef.current.addEventListener('load',() =>  this.onImageLoad("post"));
        this.state.profileImageRef.current.addEventListener('load',() => this.onImageLoad("profile"));
    }

    onImageLoad = (which) => { 
        if(which === "post") this.setState({postImgLoaded: true})
        if(which === "profile") this.setState({profileImageLoaded: true})
    }

    

    postComment = () => {

        if(this.state.commentText.trim() === "") return; //we have to manage for empty comment
        this.setState({
            loading:true,
        })

        const data = {
            post : this.props.id,
            commentText : this.state.commentText,
            commentatorUser : localStorage.getItem('user'),
        }

        this.props.onComment(data, () => {
            this.setState({
                isCommentVisibe: true,
                commentText:"",
                loading: false,
                commentPageNo:1,
            }, () => {
                this.fetchComment(true);
            })
        });
        
    }

    fetchComment= (shouldRefresh) => {

        const callBack = () => {
            //this callback will be called to fetch comments after setState is completed.
            axios.get(`feed/get_comment/?post=${this.props.id}&page=${this.state.commentPageNo}`)
            .then(res => {
                let cmtNextPage = res.data.next ? res.data.next.match(/page=.*&/gm)[0] : null;
                if(cmtNextPage) cmtNextPage = String(cmtNextPage).substring(5, cmtNextPage.length-1); //getting comment nexpage no

                this.setState({
                    comments: shouldRefresh ? [...res.data.results] : this.state.comments.concat(res.data.results),
                    loading:false,
                    cmtCount: res.data.results.length > 0 ? res.data.results[0].commentCount : 0,
                    commentPageNo : cmtNextPage
                })
            })
            .catch(err => this.setState({loading:false}))
        }

        if(shouldRefresh){ //if we added new comment then we are passing a boolean to refresh the commentSection
            this.setState({
                commentPageNo:1,
                loading:true,
            }, callBack)
        }

        if(!shouldRefresh && this.state.commentPageNo == null) {
            return;
        };

        if(!shouldRefresh){
            this.setState({
                loading:true,
            },callBack)
        }
        
    }

    postLike = () => {
        const data ={
            post: this.props.id,
            likeUser: localStorage.getItem('user'),
        }
        this.setState({
            loading:true,
        })
        this.props.onLike(data, this.state.isLiked, this.state.likeId, (res,likeId) => {
            let likeCnt = this.state.likeCount;
            let isLiked = this.state.isLiked;
            this.setState({
                loading:false,
                isLiked: res === 'Success' ? !isLiked : isLiked, 
                likeId: res === 'Success' ? likeId : this.state.likeId,
                likeCount : res === 'Success' ? isLiked ?  likeCnt-1 : likeCnt+1 : likeCnt,
            })
        });
        
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

    setLoading = (val) => {
        this.setState({loading:val})
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
                            this.props.onChangePage(this.props.userId, () => {
                                this.props.history.push({
                                    pathname: '/profile',
                                    userId: this.props.userId
                                })
                            });
                        }}>
                            <img ref={this.state.profileImageRef} src = {this.props.profileImage? this.props.profileImage:"https://cdn.iconscout.com/icon/free/png-256/boy-avatar-4-1129037.png"} alt="" style={{display:`${this.state.profileImageLoaded ? 'block' : 'none' }`}}/>
                            {!this.state.profileImageLoaded && this.props.profileImage? <ImageLoading width="35px" height="35px" borderRadius="50%"/> : null}
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
                        <img src = {this.props.postImage}  alt="" ref={this.state.postImageRef} style={{display:`${this.state.postImgLoaded ? 'block' : 'none' }`}} />
                        {!this.state.postImgLoaded && this.props.postImage? <ImageLoading width="100%" height="200px"/> : null}
                    </div>

                    {this.props.userId ? <div className={classes.Interact}>
                        <div className={classes.Icons}>
                            <div className={classes.IconLeft}>
                                <IconButton onClick = {this.postLike}>
                                    {this.state.isLiked ? 
                                        <FavoriteIcon 
                                            style={{color:"crimson"}}
                                        /> : 
                                        <FavoriteBorderOutlinedIcon 
                                            style={{color:"crimson"}}
                                        /> 
                                    }
                                </IconButton>
                                <p>{this.state.likeCount}</p>
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
                            ifMoreComment={this.state.commentPageNo != null}
                            setLoading={this.setLoading}
                            onChangePage={this.props.onChangePage}
                        />  
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
                        theme={this.props.theme}
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
        onComment : (data, callBack) => actions.createNewComment(data, callBack),
        onLike: (data, isLiked, likeId, callBack) => actions.toggleLikeRequest(data, isLiked, likeId,callBack),
        onDeletePost : (postId) => dispatch(actions.deletePost(postId)),
        onChangePage : (userId, callBack) => dispatch(actions.changePage('/profile', {userId:userId})).then(() => callBack())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Post));
