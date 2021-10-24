import React, { Component } from 'react';
import Post from './Post/Post';
import axios from 'axios';
import Spinner from '../../../UI/Spinner/Spinner'

class Feed extends Component {
    
    state = {
        posts : null,
    }

    componentDidMount() {
        axios.get('http://localhost:8000/feed/posts/')
        .then(response =>{
            const posts = response.data;
            this.setState({posts: posts});
        });
    }
    

    
    render () {
        
        let posts  = <Spinner />;
        
        if(this.state.posts != null){
            const number_of_posts = Object.keys(this.state.posts).length;
            posts = [...Array(number_of_posts)].map((x, i) => {
                return <Post
                    key={this.state.posts[i].id}
                    name={this.state.posts[i].userFields.username}
                    postImage={this.state.posts[i].postFile}
                    profileImage={this.state.posts[i].postFile}
                    category={!this.state.posts[i].postSection ? null : this.state.posts[i].postSection.sectionName}
                    // category = {this.state.posts[i].postSection}
                    about={this.state.posts[i].postCaption}
                    likesCount={this.state.posts[i].likeCount}
                    time={this.state.posts[i].createdAt}
                    commentCount={this.state.posts[i].commentCount}
                    comments = {this.state.posts[i].comments}
                /> 
            })
        }

        return (
    
            <div>
                {posts}
            </div>
        );
    }

}
export default Feed;