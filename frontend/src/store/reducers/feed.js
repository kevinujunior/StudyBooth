import * as actionTypes from '../actions/actionTypes';

const initialState = {
    refreshFeed: false,
    posts : null,
    sections: null,
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
        case actionTypes.FETECH_FEED: //when ever fetch feed we set the new posts.
            return {
                ...state,
                posts: action.posts,
            }
        case actionTypes.FETCH_SECTIONS: //we fetch the sections
            return {
                ...state,
                sections: action.sections
            }
        default:
            return state;
    }
}

export default reducer;