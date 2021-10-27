import * as actionTypes from '../actions/actionTypes';

const initialState = {
    profilePic: null,
    username: null,
    fullname: null,
    following: null,
    followers: null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CURRENT_USER_FETCH:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default reducer;