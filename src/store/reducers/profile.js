import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading:false,
    userData:null,
    posts:[],
    nextPageNo:1,
    profileFeedLoading:false,
}

const updatePosts = (newPosts, state, nextPageNo, currPageNo) => {

    if(currPageNo == 1){ 
        //if currPageNo is 1 means either we have refreshed, or new post, or delete post, on feed load
        //in that case we don't want to concat with previous posts.
        return {
            ...state,
            posts: [...newPosts],
            nextPageNo: nextPageNo,
            loading: false,
            profileFeedLoading:false,
        }
    }

    if(currPageNo == null){
        return {
            ...state,
            posts : null,
            nextPageNo:1,
            loading: false,
            profileFeedLoading:false,
        }
    }

    if(state.nextPageNo == nextPageNo) return {
        ...state,
        loading:false,
    };

    let posts = [...state.posts];
    posts = newPosts ? posts.concat(newPosts) : posts;


    return {
        ...state,
        posts: posts,
        nextPageNo: nextPageNo,
        loading: false,
        profileFeedLoading:false,
    }

}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PROFILE_SET_LOADING:
            return {
                ...state,
                loading: action.loading ? action.loading : state.loading,
                profileFeedLoading: action.profileFeedLoading ? action.profileFeedLoading : state.profileFeedLoading,
            }
        case actionTypes.SET_PROFILE_USER_POSTS:
            return updatePosts(action.posts, state, action.nextPageNo, action.currPage)
        case actionTypes.SET_PROFILE_USER_DATA:
            return {
                ...state,
                userData: action.userData,
            }
        default:
            return state;
    }
}

export default reducer;