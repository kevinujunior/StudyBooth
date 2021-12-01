import React, { Component , useEffect} from 'react';
import Post from './Post/Post';
import Spinner from '../../../UI/Spinner/Spinner'
import {connect } from 'react-redux';
import * as actions from '../../../../store/actions/index';
import { AnimatePresence, motion } from 'framer-motion';
const blackBox = {
    initial: {
      height: "100vh",
      bottom: 0,
    },
    animate: {
      height: 0,    
    },
  };
  
const InitialTransition = () => {
return (
    <div className="absolute inset-0 flex items-center justify-center">
    <motion.div
        className="relative z-50 w-full bg-black"
        initial="initial"
        animate="animate"
        variants={blackBox}
    />      
    </div>
);
}

class Feed extends Component {
    
  state = {
    loading: true,
  };


  componentDidMount() {
  }


    render () {
        
        // let posts  = <Spinner/>;
        let posts = [];
        
        console.log(this.props.posts)
        if(this.props.posts != null && this.props.posts.length > 0){
            const number_of_posts = Object.keys(this.props.posts).length;
            posts = [...Array(number_of_posts)].map((x, i) => {
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

        if(this.props.posts != null && this.props.posts.length === 0) posts = <Post about="Hey new user please make a post.. :-)"/>;

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


export default connect(mapStateToProps)(Feed);