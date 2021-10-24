import React, { Component } from 'react';
import Post from './Post/Post';
import axios from 'axios';

class Feed extends Component {
    
  state = {
    posts : [],
   
}
componentDidMount() {
        axios.get('http://localhost:8000/feed/posts/')
        .then(response =>{
            const posts = response.data;
            this.setState({posts: posts});
            console.log(response);
        });
}
    

    
    render () {
      console.log("rendered")
      const number_of_posts = Object.keys(this.state.posts).length;
    return (
  
        <div>
        
            {[...Array(number_of_posts)].map((x, i) => 
                <Post
                key={this.state.posts[i].id}
                name={this.state.posts[i].postText}
                postImage={this.state.posts[i].postFile}
                profileImage={this.state.posts[i].postFile}
                category={this.state.posts[i].postSection}
                about={this.state.posts[i].postCaption}
                likesCount={this.state.posts[i].likeCount}
                time={this.state.posts[i].createdAt}
                commentCount={this.state.posts[i].commentCount}
                />)}
        </div>
    );

}

}
export default Feed;