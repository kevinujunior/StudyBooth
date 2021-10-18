import React, {Component} from 'react';
import classes from './Post.css';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import {IconButton } from '@mui/material';
import ActionPopUp from './ActionPopup/ActionPopup';
import CommentSection from './Comment/CommentSection';

import {connect } from 'react-redux';


class Post extends Component{

    state = {
        isActionsVisible : false,
        isCommentVisibe : false,
    }

    toggleActions = (actionState) =>{
        // console.log("called")
        this.setState({
            isActionsVisible: !actionState,
        })
    }

    toggleCommentSection = (commentSectionState) => {
        console.log('comment active')
        this.setState({
            isCommentVisibe: !commentSectionState,
        })
    }
    
    render(){
        let postClasses = [classes.Post]
        if(this.props.theme === 'dark') postClasses.push(classes.Dark);

        let time = Math.floor((new Date().getTime() - new Date(this.props.time).getTime())/(1000*3600)); //time in hours


        return (
            <div className={postClasses.join(' ')}>
                <div className={classes.Header}>
                    <div className={classes.NamePhoto}>
                        <img src = {this.props.profileImage} alt=""/>
                        <p>{this.props.name}</p>
                        <p className={classes.Time}>{time <= 24 ? time+"hr ago": Math.floor(time/24)+"d ago"}</p>
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
                            <input type="text" placeholder="write a comment..."/>
                        </div>
                        <IconButton>
                            <SendRoundedIcon style={{color:"#1e90ff"}}/>
                        </IconButton>
                    </div>
                    
                </div>
                <ActionPopUp Visible={this.state.isActionsVisible}/>
                <CommentSection theme={this.props.theme} Visible={this.state.isCommentVisibe}/>
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
