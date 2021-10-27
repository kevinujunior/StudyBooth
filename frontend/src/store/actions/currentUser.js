import * as actionTypes from './actionTypes';
import axios from 'axios';


export const setCurrentUser = (userdata) => {
    return{
        type: actionTypes.CURRENT_USER_FETCH,
        userdata: userdata,
    }
}

export const fetchCurrentUser = () => {
    const config = {
        headers: {
            "Authorization": "Bearer "+localStorage.getItem('access_token') ,
            "Content-Type": "application/json",
        }
    };
    return dispatch => {
        let userId = localStorage.getItem('user');
        axios.get('http://localhost:8000/users/userview/1', config)
        .then(response =>{
            console.log(response.data)
            dispatch(setCurrentUser(response.data));
        })
        .catch(err => console.log(err));
    }
}