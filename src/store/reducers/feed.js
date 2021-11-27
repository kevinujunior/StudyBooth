import * as actionTypes from '../actions/actionTypes';

const initialState = {
    refreshFeed: false,
    posts : [],
    sections: null,
    nextPageNo: 1,
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

const updatePosts = (newPosts, state, nextPage) => {
    let posts = [...state.posts];
    console.log("update post called", newPosts)
    posts = newPosts ? posts.concat(newPosts) : posts;

    return {
        ...state,
        posts: posts,
        nextPageNo: nextPage
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
                posts: state.posts.concat(action.posts),
                nextPageNo: action.next,
            }
        case actionTypes.FETCH_SECTIONS: //we fetch the sections
            return updatePosts(action.posts, state, action.next)
        case actionTypes.UPDATE_POST_COMMENT:
            return updatePostComment(state, action);
        case actionTypes.TOGGLE_LIKE:
            return toggleLike(state, action.postId, action.likeId);
        default:
            return state;
    }
}

export default reducer;