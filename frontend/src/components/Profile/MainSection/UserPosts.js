import React, { Component } from 'react';
import classes from './UserPosts.css';

class Posts extends Component{


    render(){
        let posts = <p>Loading...</p>

        console.log(this.props.posts)
        if(this.props.posts){
            posts = [...Array(this.props.posts.length)].map((_,i) => {
                console.log(this.props.posts[i].postFile)
                return <img src={this.props.posts[i].postFile?this.props.posts[i].postFile:"https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg"} onError={(e)=>{e.target.onerror = null; e.target.src="https://www.wpbeginner.com/wp-content/uploads/2013/04/wp404error.jpg"}} className={classes.ImgBox} key={this.props.posts[i].id} alt=""/>;
            })
        }
        return(
            <div className={classes.Posts}>
                {posts}
            </div>
        )
    }
}



export default Posts;
