import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setPosts = (posts) => {
    return {
        type: actionTypes.FETCH_FEED,
        posts: posts,
    }
}


export const setSections = (sections) => {
    return {
        type: actionTypes.FETCH_SECTIONS,
        sections: sections,
    }
}

export const updatePostComment = (commentData) => {
    console.log(commentData)
    return {
        type: actionTypes.UPDATE_POST_COMMENT,
        data : commentData,
    }
}

export const fetchFeed = () => {
    //this is the method to fetch the feed.
    const config = {
        headers: {
            "Authorization": "Bearer "+localStorage.getItem('access_token') ,
            "Content-Type": "application/json",
         }
    };
    return dispatch => {
        axios.get('http://localhost:8000/feed/posts/',config)
        .then(response =>{
            const posts = response.data;
            console.log(posts)
            dispatch(setPosts(posts))  //after getting the post we are setting post in global state.
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export const createNewPost = (formData) => {
    const config = {
        headers: {
            "Authorization": "Bearer "+localStorage.getItem('access_token') ,
            "Content-Type": "application/json",
         }
      };

    return dispatch => {
        axios.post("http://localhost:8000/feed/posts/", formData ,config)
        .then(response =>{
            dispatch(fetchFeed()); //whenever we create a new post we fetch the feed again.
        })
        .catch(err => console.log(err));
    }
}

export const createNewComment = (data) => {
    const config = {
        headers: {
            "Authorization": "Bearer "+localStorage.getItem('access_token') ,
            "Content-Type": "application/json",
         }
      };
    return dispatch => {
        axios.post("http://localhost:8000/feed/comments/", data,config)
        .then(response =>{
            dispatch(updatePostComment(response.data));
        })
        .catch(err => console.log(err));
    }
}

export const fetchFeedFilterBySection = (id) => {
    //here we are getting the section id and the we are filtering feed on basis of that.
    const config = {
        headers: {
            "Authorization": "Bearer "+localStorage.getItem('access_token') ,
            "Content-Type": "application/json",
         }
      };
    return dispatch => {
        axios.get('http://localhost:8000/feed/posts/?section='+id,config)
        .then(response =>{
            const posts = response.data;
            dispatch(setPosts(posts)) //after we got all the posts we set the posts. and that will be stored in our global state.
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export const fetchSection = () => {
    const config = {
        headers: {
            "Authorization": "Bearer "+localStorage.getItem('access_token') ,
            "Content-Type": "application/json",
         }
      };
    return dispatch => {
        axios.get("http://localhost:8000/feed/sections/",config)
        .then(response =>{
            dispatch(setSections(response.data));
        })
        .catch(err => console.log(err));
    }
}