import * as actionTypes from './actionTypes';
import axios from  '../../axios_base';


export const setLoading = (loading) => {
    return{
        type: actionTypes.PROFILE_SET_LOADING,
        loading: loading
    }
}

export const setProfileUserData = (userData) => {
    return {
        type: actionTypes.SET_PROFILE_USER_DATA,
        userData: userData,
    }
}

export const setProfileUserPosts = (posts, nextPage, currPage) => {
    return {
        type: actionTypes.SET_PROFILE_USER_POSTS,
        posts: posts,
        nextPageNo: nextPage,
        currPage: currPage,
    }
}


export const fetchUserData = (userId) => {
    return dispatch => {
        //this will fetch the user profile details
        dispatch(setLoading(true));
        axios.get('users/profileview/?viewUser='+userId)
        .then(res => {
            console.log(res.data)
            dispatch(setProfileUserData(res.data));
        })
        .catch(err => console.log(err))

        //this will fetch the user posts if followed by current user or current user watching his/her profile.

        axios.get('/users/followingview/?followingUser='+userId)
        .then(res => {
            console.log("im following", res)
            if(res.data.length >= 1 || userId == localStorage.getItem('user')){ 
                //res.data will have length greater than 1 if current user follow other user.
                dispatch(fetchUserPosts(1,userId));
            }
            else{
                dispatch(setProfileUserPosts(null, null))
            }
        })
        .catch(err => console.log(err))
    }
}

export const fetchUserPosts = (nextPageNo, userId) => {
    
    return dispatch => {
        if(nextPageNo == null) return;
        axios.get(`feed/get_post/?page=${nextPageNo}&viewUserPost=${userId}`)
        .then(res => {
            console.log(res)
            let nextNo = res.data.next ? res.data.next.match(/page=.*&/gm)[0]: null;
            if(nextNo) nextNo = String(nextNo).substring(5, nextNo.length-1);
            dispatch(setProfileUserPosts(res.data.results, nextNo, nextPageNo))
        })
        .catch(err => console.log(err))
    }
}