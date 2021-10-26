import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setPosts = (posts) => {
    return {
        type: actionTypes.FETECH_FEED,
        posts: posts,
    }
}


export const setSections = (sections) => {
    return {
        type: actionTypes.FETCH_SECTIONS,
        sections: sections,
    }
}

export const fetchFeed = () => {
    //this is the method to fetch the feed.
    return dispatch => {
        axios.get('http://localhost:8000/feed/posts/')
        .then(response =>{
            const posts = response.data;
            dispatch(setPosts(posts))  //after getting the post we are setting post in global state.
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
            dispatch(fetchFeed()); //whenever we create a new post we fetch the feed again.
        })
        .catch(err => console.log(err));
    }
}

export const createNewComment = (data) => {
    return dispatch => {
        axios.post("http://localhost:8000/feed/comments/", data)
        .then(response =>{
            dispatch(fetchFeed()) //when ever we create a new comment we fetch the feed again we have to imporve this.
        })
        .catch(err => console.log(err));
    }
}

export const fetchFeedFilterBySection = (id) => {
    //here we are getting the section id and the we are filtering feed on basis of that.
    return dispatch => {
        axios.get('http://localhost:8000/feed/posts/?section='+id)
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
    return dispatch => {
        axios.get("http://localhost:8000/feed/sections/")
        .then(response =>{
            dispatch(setSections(response.data));
        })
        .catch(err => console.log(err));
    }
}