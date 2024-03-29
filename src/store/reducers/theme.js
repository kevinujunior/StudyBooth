import * as actionTypes from '../actions/actionTypes';

var initialState = {
    theme: localStorage.getItem("theme") || 'light',
}


const reducer = (state = initialState, action) => {
    //work of reduer is on basis of action change the state
    switch(action.type){
        case action.types = actionTypes.LIGHT_THEME:
            localStorage.setItem("theme",  'light');
            return {
                theme: 'light',
            }
        case action.types = actionTypes.DARK_THEME:
            localStorage.setItem("theme",  'dark');
            return {
                theme: 'dark',
            }
        default:
            return state;
    }
}

export default reducer;