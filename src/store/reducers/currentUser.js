import * as actionTypes from '../actions/actionTypes';

const initialState = {
    data:null,
    loading:true,
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CURRENT_USER_FETCH:
            return {
                ...state,
                data: {...action.userdata},
                loading:false,
            }
        case actionTypes.USER_SET_LOADING:
            return {
                ...state,
                loading: action.loading,
            }
        default:
            return state;
    }
}

export default reducer;