import * as actionTypes from './actionTypes';
import axios from  '../../axios_base';
import {fetchUserPosts} from './profile'


export const setPosts = (posts, nextPageNo, pageNo) => {
    return {
        type: actionTypes.FETCH_FEED,
        posts: posts,
        nextPage : nextPageNo,
        currPage : pageNo
    }
}


export const setFeedLoading = (loading) => {
    return{
        type: actionTypes.FEED_SET_LOADING,
        loading: loading
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
    return {
        type: actionTypes.UPDATE_POST_COMMENT,
        data : commentData,
    }
}

export const fetchFeed = (pageNo, loading) => {
    //this is the method to fetch the feed.
    return (dispatch) => {

        if(pageNo == null) return;
        if(loading) return;

        dispatch(setFeedLoading(true))

        return axios.get(`feed/get_post/?page=${pageNo}`)
        .then(res =>{
            const posts = res.data.results;
            let nextNo = res.data.next ? res.data.next.match(/page=.*/gm)[0]: null;
            if(nextNo) nextNo = String(nextNo).substring(5, nextNo.length); //post next page no
            dispatch(setPosts(posts,nextNo,pageNo))  //after getting the post we are setting post in global state.
            dispatch(setFeedLoading(false))
            return Promise.resolve();
        })
        .catch(err => {
            console.log(err)
            return Promise.reject();
        });
    }
}

export const createNewPost = (formData, errorHandler) => {

    return dispatch => {
        axios.post("feed/create_post/", formData)
        .then(response =>{
            dispatch(fetchFeed(1)); //whenever we create a new post we fetch the feed again.
            dispatch(fetchUserPosts(1, localStorage.getItem('user')))
            errorHandler(false);
        })
        .catch(function (error) {
            const err = error.response.data;
            errorHandler(true,err);
        })
    }
}

export const deletePost = (postId) => {
    return dispatch => {
        axios.delete("feed/create_post/"+postId)
        .then(res => {
            console.log("post deleted")
            //after we have delete a post we should load new post in feed and profile too.
            dispatch(fetchFeed(1))
            dispatch(fetchUserPosts(1, localStorage.getItem('user')))
        })
        .catch(err => console.log(err))
    }
}

export const createNewComment = (data, callBack) => {
    axios.post("feed/create_comment/", data)
    .then(response =>{
        callBack();
    })
    .catch(err => {
        console.log(err)
    })
}

export const deleteComment = (commentId, callBack) => {
    axios.delete("feed/create_comment/"+commentId)
    .then(res => {
        callBack();
    })
    .catch(err => console.log(err))
}

export const toggleLikeRequest = (data, isLiked,likeId, callBack) => {

    if(!isLiked){
        axios.post('feed/create_like/',data)
        .then(res => {
            callBack("Success", res.data.id);
        })  
        .catch(err => {
            console.log(err)
            callBack();
        });
    }
    else{
        axios.delete('feed/create_like/'+likeId,data)
        .then(res => {
            callBack("Success");
        })
        .catch(err =>{
            console.log(err)
            callBack();
        })
    }
}

export const fetchFeedFilterBySection = (id) => {
    //here we are getting the section id and the we are filtering feed on basis of that.
    return dispatch => {
        // dispatch(setFeedLoading(true))
        axios.get('feed/get_post/?section='+id)
        .then(response =>{
            const posts = response.data;
            // dispatch(setPosts(posts)) //after we got all the posts we set the posts. and that will be stored in our global state.
        })
        .catch(err => {
            // dispatch(setFeedLoading(false))
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

