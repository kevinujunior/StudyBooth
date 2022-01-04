import * as actionTypes from './actionTypes'

import {fetchFeed} from './feed';
import {fetchCurrentUser} from './currentUser'
import {fetchUserData} from './profile'

export const changeDevice = (device) => {
    return {
        type: actionTypes.DEVICE_SIZE_CHANGE,
        device: device,
    }
}

export const changePage = (page, props) => {

    return dispatch => {

        switch(page){

            case '/home':
                dispatch({type: actionTypes.PAGE_CHANGE, page:page, loading: true});
                return dispatch(fetchFeed(1, false))
                .then(() => dispatch(fetchCurrentUser()))
                .then(() => dispatch(pageLoading(false)))

            case '/profile':
                dispatch({type: actionTypes.PAGE_CHANGE, page:page, loading: true});
                return dispatch(fetchUserData(props.userId))
                .then(() => dispatch(pageLoading(false)))

            case '/chat':
                dispatch({type: actionTypes.PAGE_CHANGE, page:page, loading: true});
                return Promise.resolve();
            
            case '/search':
                dispatch({type: actionTypes.PAGE_CHANGE, page:page, loading: true});
                return Promise.resolve();

            default:
                dispatch({type: actionTypes.PAGE_CHANGE, page:page, loading: true});
                return Promise.resolve();
        }
    }
}

export const pageLoading = (loading) => {

    return dispatch => {
        dispatch({type: actionTypes.PAGE_LOADING, pageLoading:loading});
        return Promise.resolve();
    }
}

export const deviceWidthChage = (width, device) => {
    return dispatch => {
        if(width > 630 && device === 'mobile') {
            dispatch(changeDevice("desktop"))
        }
        else if(width < 630 && device === 'desktop'){
            dispatch(changeDevice("mobile"))
        }
    }
}