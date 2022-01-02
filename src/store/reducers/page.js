import * as actionsTypes from '../actions/actionTypes';
const initialState = {
    whichPage:'home',
    whichDevice:'desktop'
}


const PageReducer = (state = initialState, action) => {
    switch(action.type){
        case actionsTypes.PAGE_CHANGE:
            return {
                ...state,
                whichPage: action.page,
            }
        case actionsTypes.DEVICE_SIZE_CHANGE:
            return {
                ...state,
                whichDevice:action.device,
            }
        default:
            return state
    }
}

export default PageReducer;