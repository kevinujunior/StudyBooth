import * as actionTypes from '../actions/actionTypes';

const initialState = {
    refreshFeed: false,
    posts : null,
    sections: null,
}


const updatePostComment = (state, action) => {

    let posts = [...state.posts];
    let index = posts.findIndex(post => post.id === action.data.post); //finding post by post id
    //after finding the post index pushing the new comment into it.
    // let comments = [...posts[index].comments];
    // comments.push(action.data);

    posts[index] ={
        ...posts[index],
        commentCount: posts[index].commentCount+1,
    }

    return {
        ...state,
        posts,
    };
}


const toggleLike = (state, postId, likeId) => {
    let posts = [...state.posts];
    let index = posts.findIndex(post => post.id === postId);

    posts[index] = {
        ...posts[index],
        likeCount: posts[index].isLiked ? posts[index].likeCount-1: posts[index].likeCount+1, //if post in already like then decrease the count else increase the count.
        isLiked: !posts[index].isLiked, //inverse the current like
        likeId: likeId
    }

    return {
        ...state,
        posts,
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
            return {
                ...state,
                posts: action.posts,
            }
        case actionTypes.FETCH_SECTIONS: //we fetch the sections
            return {
                ...state,
                sections: action.sections
            }
        case actionTypes.UPDATE_POST_COMMENT:
            return updatePostComment(state, action);
        case actionTypes.TOGGLE_LIKE:
            return toggleLike(state, action.postId, action.likeId);
        default:
            return state;
    }
}

export default reducer;