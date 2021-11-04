import * as actionTypes from './actionTypes';
import axios from  '../../axios_base';


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
    return dispatch => {
        axios.get('feed/get_post/')
        .then(response =>{
            const posts = response.data;
            dispatch(setPosts(posts))  //after getting the post we are setting post in global state.
        })
        .catch(err => {
            console.log(err)
        });
    }
}

export const createNewPost = (formData) => {

    return dispatch => {
        axios.post("feed/create_post/", formData)
        .then(response =>{
            dispatch(fetchFeed()); //whenever we create a new post we fetch the feed again.
        })
        .catch(err => {
            console.log(err)
        });
    }
}

export const getLikes = () => {
    return dispath => {
        let id = localStorage.getItem('user');
        axios.get('feed/get_like/?user='+id)
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
    }
}

export const createNewComment = (data) => {
    return dispatch => {
        axios.post("feed/create_comment/", data)
        .then(response =>{
            dispatch(updatePostComment(response.data));
        })
        .catch(err => {
            console.log(err)
        });
    }
}

export const fetchFeedFilterBySection = (id) => {
    //here we are getting the section id and the we are filtering feed on basis of that.
    return dispatch => {
        axios.get('feed/get_post/?section='+id)
        .then(response =>{
            const posts = response.data;
            dispatch(setPosts(posts)) //after we got all the posts we set the posts. and that will be stored in our global state.
        })
        .catch(err => {
            console.log(err)
        });
    }
}

export const fetchSection = () => {

    return dispatch => {
        axios.get('feed/section/')
        .then(response =>{
            dispatch(setSections(response.data));
        })
    }
}

