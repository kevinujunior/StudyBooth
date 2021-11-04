import React, { Component } from 'react';
import classes from './UserPosts.css';
import {connect} from 'react-redux'

class Posts extends Component{


    render(){
        let posts = <p>Loading...</p>

        console.log(this.props.posts)
        if(this.props.posts){
            posts = [...Array(this.props.posts.length)].map((_,i) => {
                return <img src={this.props.posts[i].postFile} className={classes.ImgBox} key={this.props.posts[i].id} alt=""/>;
            })
        }
        return(
            <div className={classes.Posts}>
                {posts}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.feed.posts,
    }
}


export default connect(mapStateToProps)(Posts);
