import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setPosts = (posts) => {
    console.log("posts fetched.")
    return {
        type: actionTypes.FETECH_FEED,
        posts: posts,
    }
}

export const fetchFeed = () => {
    return dispatch => {
        axios.get('http://localhost:8000/feed/posts/')
        .then(response =>{
            const posts = response.data;
            dispatch(setPosts(posts))
        })
        .catch(err => {
            console.log(err);
        });
    }
}

export const createNewPost = (formData, config) => {
    return dispatch => {
        axios.post("http://localhost:8000/feed/posts/", formData ,config)
        .then(response =>{
            dispatch(fetchFeed());
        })
        .catch(err => console.log(err));
    }
}

export const createNewComment = (data) => {
    return dispatch => {
        axios.post("http://localhost:8000/feed/comments/", data)
        .then(response =>{
            dispatch(fetchFeed())
        })
        .catch(err => console.log(err));
    }
}

