import React, { useState, useEffect } from 'react';
import classes from './CommentSection.css';
import CommentItem from './CommentItem/CommentItem';

const CommentSection = (props) => {

    const [mount, setMount] = useState(true);
    useEffect(() => {
        if(mount){
            props.fetchComment();
            setMount(false);
        }
    },[props.comments, props.theme])

    let CmtSectionClass = [classes.CommentSection];
    if(props.theme === 'dark'){
        CmtSectionClass.push(classes.Dark)
    }

    console.log("component updated")
    let comments = <p>Loading...</p>;
    console.log(props.comments)
    if(props.comments){
        comments = props.comments.map(comment =>{
            return  <CommentItem
                theme = {props.theme}
                user = {comment.commentatorUser.username}
                key={comment.id}
                id={comment.id}
                postId={props.postId}
                userId = {comment.commentatorUser.id}
                comment = {comment.commentText}
                userPic = {comment.commentatorUser.userPic}
                createdAt = {comment.createdAt}
                refreshComment = {props.fetchComment}
                setLoading={props.setLoading}
            /> ;  
        })
    }
        
    return(
        <div className={CmtSectionClass.join(" ")}>
            {comments}
            {props.ifMoreComment ? <button className={classes.LoadMore} onClick={() => props.fetchComment()}>load more Comments</button> : null}
        </div>
    )
}

export default React.memo(CommentSection);