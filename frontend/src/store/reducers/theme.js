import * as actionTypes from '../actions/actionTypes';

const initialState = {
    primaryColor : 'white',
    theme: 'light',
}


const reducer = (state = initialState, action) => {
    //work of reduer is on basis of action change the state
    switch(action.type){
        case action.types = actionTypes.LIGHT_THEME:
            return {
                ...state,
                primaryColor:'white',
                theme: 'light',
            }
        case action.types = actionTypes.DARK_THEME:
            return {
                ...state,
                primaryColor:'#21212B',
                theme: 'dark',
            }
        default:
            return state;
    }
}

export default reducer;