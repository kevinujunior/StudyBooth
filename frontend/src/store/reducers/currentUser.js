import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data:null,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CURRENT_USER_FETCH:
            return {
                ...state,
                data: action.userdata,
            }
        default:
            return state;
    }
}

export default reducer;