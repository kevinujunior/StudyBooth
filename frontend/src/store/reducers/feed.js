import * as actionTypes from '../actions/actionTypes';

const initialState = {
    refreshFeed: false,
    posts : null,
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
        case actionTypes.FETECH_FEED:
            return {
                ...state,
                posts: action.posts,
            }
        default:
            return state;
    }
}

export default reducer;