import React, { Component } from 'react';
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
    loading: true
  };


    componentDidMount() {
        this.props.onFetchFeed();
    }
    
    render () {
        
        // let posts  = <Spinner/>;
        let posts = [];
        const content = {
            animate: {
              transition: { staggerChildren: 0.1, delayChildren: 2.8 },
            },
          };
          
          const title = {
            initial: { y: -20, opacity: 0 },
            animate: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 1.3,
                ease: [0.6, -0.05, 0.01, 0.99],
              },
            },
          };
          
          const products = {
            initial: { y: -20, opacity: 0 },
            animate: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 1.0,
                ease: [0.6, -0.05, 0.01, 0.99],
              },
            },
          };

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
                {/* <AnimationComponent /> */}
                {/* {posts} */}
                <motion.section exit={{ opacity: 0 }}>
                <InitialTransition/>
                <motion.div
                    initial="initial"
                    animate="animate"
                    variants={content}
                    className="space-y-12"
                >
                    <motion.div variants={title} className="text-6xl font-black text-center">
                    {posts}
                    </motion.div>

                    <motion.section variants={products} className="text-gray-700 body-font">
                    
                    </motion.section>
                </motion.div>
                </motion.section>
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