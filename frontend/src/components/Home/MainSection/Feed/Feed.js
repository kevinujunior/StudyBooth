import React, { Component } from 'react';
import Post from './Post/Post';
import Spinner from '../../../UI/Spinner/Spinner'

import {connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';

class Feed extends Component {
    

    componentDidMount() {
        this.props.onFetchFeed();
    }
    
    render () {
        
        let posts  = <Spinner />;
        
        if(this.props.posts != null && this.props.posts.length > 0){
            const number_of_posts = Object.keys(this.props.posts).length;
            posts = [...Array(number_of_posts)].map((x, i) => {
                return <Post
                    key={this.props.posts[i].id}
                    id  = {this.props.posts[i].id}
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

const mapStateToProps = state => {
    return {
        posts: state.feed.posts,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchFeed: () => dispatch(actions.fetchFeed()),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Feed);