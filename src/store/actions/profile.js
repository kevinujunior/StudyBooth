import * as actionTypes from './actionTypes';
import axios from  '../../axios_base';

import {setCurrentUser} from './currentUser'


export const setLoading = (loading, profileFeedLoading) => {
    return{
        type: actionTypes.PROFILE_SET_LOADING,
        loading: loading,
        profileFeedLoading: profileFeedLoading,
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
    console.log(userId)
    return dispatch => {
        //this will fetch the user profile details
        axios.get('users/profileview/?viewUser='+userId)
        .then(res => {
            dispatch(setProfileUserData(res.data));
            if(userId == localStorage.getItem('user')) dispatch(setCurrentUser(res.data[0]))
        })
        .catch(err => console.log(err))

        //this will fetch the user posts if followed by current user or current user watching his/her profile.

        return axios.get('/users/followingview/?followingUser='+userId)
        .then(res => {
            if(res.data.length >= 1 || userId == localStorage.getItem('user')){ 
                //res.data will have length greater than 1 if current user follow other user.
                return dispatch(fetchUserPosts(1,userId))
            }
            else{
                dispatch(setProfileUserPosts(null, null))
                return Promise.resolve();
            }
        })
        .catch(err => console.log(err))
    }
}

export const fetchUserPosts = (nextPageNo, userId) => {
    
    return dispatch => {
        if(nextPageNo == null) return;
        dispatch(setLoading(null,true));
        return axios.get(`feed/get_post/?page=${nextPageNo}&viewUserPost=${userId}`)
        .then(res => {
            let nextNo = res.data.next ? res.data.next.match(/page=.*&/gm)[0]: null;
            if(nextNo) nextNo = String(nextNo).substring(5, nextNo.length-1);
            dispatch(setProfileUserPosts(res.data.results, nextNo, nextPageNo))
            return Promise.resolve()
        })
        .catch(err => console.log(err))
    }
}