import * as actionTypes from './actionTypes';
import axios from '../../axios_base';


export const setCurrentUser = (userdata) => {
    return{
        type: actionTypes.CURRENT_USER_FETCH,
        userdata: userdata,
    }
}

export const setLoading = (loading) => {
    return {
        type: actionTypes.USER_SET_LOADING,
        loading:loading,
    }
}

export const fetchCurrentUser = () => {

    return dispatch => {
        dispatch(setLoading(true));
        let userId = localStorage.getItem('user');
        return axios.get('users/userview/'+userId,)
        .then(response =>{
            dispatch(setCurrentUser(response.data));
            return Promise.resolve();
        })
        .catch(err => console.log(err));
    }
}