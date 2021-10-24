import React, { Component } from 'react';
import classes from './CommentSection.css';
import CommentItem from './CommentItem/CommentItem';

class CommentSection extends Component{
    
    
    render(){
    
        // console.log(this.state.comments).
        let CmtSectionClass = [classes.CommentSection];
        if(this.props.theme === 'dark'){
            CmtSectionClass.push(classes.Dark)
        }
        if(this.props.Visible){
            CmtSectionClass.push(classes.Visible)
        }

        const comments = this.props.comments.map(comment =>{
            return  <CommentItem
            theme = {this.props.theme}
            key={comment.id}
            comment = {comment.commentText}
            user = {comment.commentatorUser.username}
            createdAt = {comment.createdAt}
            />    
        })
        
        return(
            <div className={CmtSectionClass.join(" ")}>
                {comments}
                <button className={classes.LoadMore}>load more Comments</button>
            </div>
        )
    }
}

export default CommentSection;