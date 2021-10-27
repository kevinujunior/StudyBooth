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
            "accept": "application/json",
            // 'Content-Type': 'application/json',
            // 'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            
        }
        
    };
    return dispatch => {
        let userId = localStorage.getItem('user');
        axios.get('http://localhost:8000/users/userview/'+userId,config)
        .then(response =>{
            console.log("hello")
            console.log(response.data)
            dispatch(setCurrentUser(response.data));
        })
        .catch(err => console.log(err));
    }
}