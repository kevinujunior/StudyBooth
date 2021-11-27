import * as actionTypes from './actionTypes';
import axios from  '../../axios_base';
import { useEffect } from 'react';


export const setPosts = (posts, nextPageNo) => {
    return {
        type: actionTypes.FETCH_FEED,
        posts: posts,
        next : nextPageNo
    }
}


export const setSections = (sections) => {
    return {
        type: actionTypes.FETCH_SECTIONS,
        sections: sections,
    }
}

export const toggleLike = (postId, likeId) => {
    return {
        type: actionTypes.TOGGLE_LIKE,
        postId: postId,
        likeId: likeId,
    }
}

export const updatePostComment = (commentData) => {
    console.log(commentData)
    return {
        type: actionTypes.UPDATE_POST_COMMENT,
        data : commentData,
    }
}

export const fetchFeed = (pageNo) => {
    //this is the method to fetch the feed.
    return dispatch => {
        if(pageNo == null) return;
        axios.get(`feed/get_post/?page=${pageNo}`)
        .then(response =>{
            console.log(response)
            const posts = response.data.results;
            const nextNo = response.data.next ? response.data.next[response.data.next.length-1] : null;
            console.log(nextNo)
            dispatch(setPosts(posts,nextNo))  //after getting the post we are setting post in global state.
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
        .catch(function (error) {
            if (error.response) {
                const json = JSON.stringify(error.response.data);
                localStorage.setItem("createPostError", json);
            }
          });
    }
}

export const deletePost = (postId) => {
    return dispatch => {
        return new Promise(resolve => 
            axios.delete("feed/create_post/"+postId)
            .then(res => {
                dispatch(fetchFeed())
                resolve("Success")
            })
            .catch(err => console.log(err))
        );
    }
}


export const createNewComment = (data) => {
    return new Promise(resolve => 
        axios.post("feed/create_comment/", data)
        .then(response =>{
            resolve("Success")
        })
        .catch(err => {
            console.log(err)
        })
    );
}

export const deleteComment = (commentId) => {
    
    return new Promise(resolve => axios.delete("feed/create_comment/"+commentId)
    .then(res => {
        resolve("Success");
    })
    .catch(err => console.log(err)));
    
}

export const toggleLikeRequest = (data, isLiked,likeId) => {
    return dispatch => {
        console.log("function called", isLiked)
        if(!isLiked){
            return new Promise(resolve => {
                axios.post('feed/create_like/',data)
                .then(res => {
                    dispatch(toggleLike(data.post, res.data.id));
                    resolve("Success")
                })  //sending post id and like id to toggle post like in redux store.
                .catch(err => console.log(err));
            })
        }
        else{
            return new Promise(resolve => {
                axios.delete('feed/create_like/'+likeId,data)
                .then(res => {
                    dispatch(toggleLike(data.post));
                    resolve("Success")
                })
                .catch(err => console.log(err))
            })
        }
    }
}

export const fetchFeedFilterBySection = (id) => {
    //here we are getting the section id and the we are filtering feed on basis of that.
    return dispatch => {
        axios.get('feed/get_post/?section='+id)
        .then(response =>{
            const posts = response.data;
            // dispatch(setPosts(posts)) //after we got all the posts we set the posts. and that will be stored in our global state.
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

