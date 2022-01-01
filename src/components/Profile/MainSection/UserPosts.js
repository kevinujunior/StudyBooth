import React, { Component } from 'react';
import classes from './UserPosts.css';
import Post from '../../Home/MainSection/Feed/Post/Post';
class Posts extends Component{


    render(){
        let posts = <p>Loading...</p>
        console.log(this.props.posts)
        if(this.props.posts){
            posts = [...Array(this.props.posts.length)].map((_,i) => {
                return <Post
                    key={this.props.posts[i].id}
                    id  = {this.props.posts[i].id}
                    userId = {this.props.posts[i].user}
                    name={this.props.posts[i].userName}
                    postImage={this.props.posts[i].postFile}
                    profileImage={this.props.posts[i].userPic}
                    category={!this.props.posts[i].sectionName ? null : this.props.posts[i].sectionName}
                    // category = {this.props.posts[i].postSection}
                    about={this.props.posts[i].postCaption}
                    likesCount={this.props.posts[i].likeCount}
                    time={this.props.posts[i].createdAt}
                    commentCount={this.props.posts[i].commentCount}
                    isLikedByuser = {this.props.posts[i].isLiked}
                    likeId = {this.props.posts[i].likeId}
                />
            })
        }
        return(
            <div className={classes.Posts}>
                {posts}
            </div>
        )
    }
}



export default React.memo(Posts);
