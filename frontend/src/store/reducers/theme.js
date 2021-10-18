import * as actionTypes from '../actions/actionTypes';

const initialState = {
    theme: 'light',
}


const reducer = (state = initialState, action) => {
    //work of reduer is on basis of action change the state
    switch(action.type){
        case action.types = actionTypes.LIGHT_THEME:
            return {
                theme: 'light',
            }
        case action.types = actionTypes.DARK_THEME:
            return {
                theme: 'dark',
            }
        default:
            return state;
    }
}

export default reducer;