import React, { Component } from 'react';
import classes from './CommentSection.css';
import CommentItem from './CommentItem/CommentItem';
import axios from '../../../../../../axios_base';

class CommentSection extends Component{
    
    state = {
        comments: null,
    }

    componentDidMount(){

        axios.get("feed/get_comment/?post="+this.props.id,)
        .then(res => {
            this.setState({
                comments: res.data,
            })
        })
        .catch(err => console.log(err))
    }

    render(){
    
        // console.log(this.state.comments).
        let CmtSectionClass = [classes.CommentSection];
        if(this.props.theme === 'dark'){
            CmtSectionClass.push(classes.Dark)
        }

        let comments = <p>Loading...</p>;
        if(this.state.comments){
            comments = this.state.comments.map(comment =>{
                return  <CommentItem
                    theme = {this.props.theme}
                    user = {comment.commentatorUser.username}
                    key={comment.id}
                    comment = {comment.commentText}
                    userPic = {comment.commentatorUser.userPic}
                    createdAt = {comment.createdAt}
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