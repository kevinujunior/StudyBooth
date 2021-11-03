import * as actionTypes from './actionTypes';
import axios from '../../axios_base';


export const setCurrentUser = (userdata) => {
    return{
        type: actionTypes.CURRENT_USER_FETCH,
        userdata: userdata,
    }
}

export const fetchCurrentUser = () => {

    return dispatch => {
        let userId = localStorage.getItem('user');
        axios.get('users/userview/'+userId,)
        .then(response =>{
            dispatch(setCurrentUser(response.data));
        })
        .catch(err => console.log(err));
    }
}