import * as actionsTypes from './actionTypes'

export const changeDevice = (device) => {
    return {
        type: actionsTypes.DEVICE_SIZE_CHANGE,
        device: device,
    }
}

export const deviceWidthChage = (width, device) => {
    return dispatch => {
        if(width > 630 && device === 'mobile') {
            dispatch(changeDevice("desktop"))
        }
        if(width < 630 && device === 'desktop'){
            dispatch(changeDevice("mobile"))
        }
    }
}