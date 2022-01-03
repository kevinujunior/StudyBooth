import * as actionsTypes from '../actions/actionTypes';
const initialState = {
    whichPage:'/home',
    whichDevice:'desktop',
    pageLoading:false,
}


const PageReducer = (state = initialState, action) => {

    switch(action.type){
        case actionsTypes.PAGE_CHANGE:
            return {
                ...state,
                whichPage: action.page,
                pageLoading: action.loading,
            }
        case actionsTypes.DEVICE_SIZE_CHANGE:
            return {
                ...state,
                whichDevice:action.device,
            }
        case actionsTypes.PAGE_LOADING:
            return {
                ...state,
                pageLoading: action.pageLoading,
            }
        default:
            return state
    }
}

export default PageReducer;