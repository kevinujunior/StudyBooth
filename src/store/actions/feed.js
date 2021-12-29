import * as actionTypes from './actionTypes';
import axios from  '../../axios_base';


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

export const setHomeLoading = (loading) => {
    return{
        type: actionTypes.SET_HOME_LOADING,
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
    console.log(commentData)
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

        dispatch(setFeedLoading(true));

        axios.get(`feed/get_post/?page=${pageNo}`)
        .then(res =>{
            const posts = res.data.results;
            let nextNo = res.data.next ? res.data.next.match(/page=.*/gm)[0]: null;
            if(nextNo) nextNo = String(nextNo).substring(5, nextNo.length); //post next page no
            dispatch(setPosts(posts,nextNo,pageNo))  //after getting the post we are setting post in global state.
        })
        .catch(err => {
            dispatch(setFeedLoading(false))
            console.log(err)
        });
    }
}

export const createNewPost = (formData, callBack) => {

    return dispatch => {
        axios.post("feed/create_post/", formData)
        .then(response =>{
            dispatch(fetchFeed(1)); //whenever we create a new post we fetch the feed again.
        })
        .catch(function (error) {
            if (error.response) {
                const json = JSON.stringify(error.response.data);
                localStorage.setItem("createPostError", json);
            }
        })
        .finally(() => callBack());
        
    }
}

export const deletePost = (postId) => {
    return dispatch => {
        return new Promise(resolve => 
            axios.delete("feed/create_post/"+postId)
            .then(res => {
                console.log("post deleted")
                dispatch(fetchFeed(1))
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
        dispatch(setFeedLoading(true))
        axios.get('feed/get_post/?section='+id)
        .then(response =>{
            const posts = response.data;
            // dispatch(setPosts(posts)) //after we got all the posts we set the posts. and that will be stored in our global state.
        })
        .catch(err => {
            dispatch(setFeedLoading(false))
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

