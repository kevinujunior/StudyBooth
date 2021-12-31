import * as actionTypes from '../actions/actionTypes';

const initialState = {
    refreshFeed: false,
    posts : [],
    sections: null,
    nextPageNo: 1,
    isFeedLoading: true,
    isHomeLoading: true,
}


const updatePostComment = (state, action) => {

    let posts = [...state.posts];
    let index = posts.findIndex(post => post.id === action.data.post); //finding post by post id

    posts[index] ={
        ...posts[index],
        commentCount: posts[index].commentCount+1,
    }

    return {
        ...state,
        posts,
    };
}

const updatePosts = (newPosts, state, nextPageNo, currPageNo) => {

    if(currPageNo == 1){ 
        //if currPageNo is 1 means either we have refreshed, or new post, or delete post, on feed load
        //in that case we don't want to concat with previous posts.
        return {
            ...state,
            posts: [...newPosts],
            nextPageNo: nextPageNo,
            isFeedLoading: false,
            isHomeLoading: false,
        }
    }

    if(state.nextPageNo == nextPageNo) return state;

    let posts = [...state.posts];
    posts = newPosts ? posts.concat(newPosts) : posts;

    return {
        ...state,
        posts: posts,
        nextPageNo: nextPageNo,
        isFeedLoading: false,
        isHomeLoading: false,
    }

}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CREATE_NEW_POST: 
            return {
                ...state,
                refreshFeed: true
            }
        case actionTypes.REFRESH_FEED:
            return {
                ...state,
                refreshFeed: false,
            }
        case actionTypes.FETCH_FEED: //when ever fetch feed we set the new posts.
            return updatePosts(action.posts, state, action.nextPage, action.currPage)
        case actionTypes.FETCH_SECTIONS: //we fetch the sections
            return {
                ...state,
                sections: action.sections,
            }
        case actionTypes.UPDATE_POST_COMMENT:
            return updatePostComment(state, action);
        case actionTypes.FEED_SET_LOADING:
            return {
                ...state,
                isFeedLoading: action.loading,
            }
        case actionTypes.SET_HOME_LOADING:
            return {
                ...state,
                isHomeLoading: action.loading,
            }
        default:
            return state;
    }
}

export default reducer;