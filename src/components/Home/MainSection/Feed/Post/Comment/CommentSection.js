import React, { Component } from 'react';
import classes from './CommentSection.css';
import CommentItem from './CommentItem/CommentItem';

class CommentSection extends Component{

    componentWillMount(){
        this.props.fetchComment();
    }

    render(){
        
        // console.log(this.state.comments).
        let CmtSectionClass = [classes.CommentSection];
        if(this.props.theme === 'dark'){
            CmtSectionClass.push(classes.Dark)
        }

        let comments = <p>Loading...</p>;
        console.log(this.props.comments)
        if(this.props.comments){
            comments = this.props.comments.map(comment =>{
                return  <CommentItem
                    theme = {this.props.theme}
                    user = {comment.commentatorUser.username}
                    key={comment.id}
                    id={comment.id}
                    postId={this.props.postId}
                    userId = {comment.commentatorUser.id}
                    comment = {comment.commentText}
                    userPic = {comment.commentatorUser.userPic}
                    createdAt = {comment.createdAt}
                    refreshComment = {this.props.fetchComment}
                    replies= {comment.replies}
                />    
            })
        }
        
        return(
            <div className={CmtSectionClass.join(" ")}>
                {comments}
                <button className={classes.LoadMore}>load more Comments</button>
            </div>
        )
    }
}

export default CommentSection;