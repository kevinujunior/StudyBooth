import axios from 'axios';
import store from './store/store';
import * as actionTypes from './store/actions/actionTypes';

let isRefreshTokenFetched = false;
let count = 0;
const customAxios = axios.create({
    baseURL: `https://study-booth-backend.herokuapp.com/`,
    headers: {
        "Content-Type": "application/json",
    }
});


const requestHandler = request => {
    request.headers.Authorization = 'Bearer '+localStorage.getItem('access_token');  
    return request;
};


const errorHandler = error => {
    if(error.response.status === 401){
        customAxios.post('dj-rest-auth/token/refresh/', {
            refresh: localStorage.getItem('refresh_token'),
        })
        .then(res => {
            localStorage.setItem('access_token', res.data.access)
        })
        .catch(res => console.log(res))
    }
};


customAxios.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

customAxios.interceptors.response.use((response) => {
    return response
    }, async function (error) {
    const originalRequest = error.config;

    if(error.response.status === 401 && isRefreshTokenFetched && count === 5){
        isRefreshTokenFetched = false;
        count = 0;
        store.dispatch(logout())
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !isRefreshTokenFetched) {

        isRefreshTokenFetched = true;
        count++;
        const res = await customAxios.post('dj-rest-auth/token/refresh/',
        {
            refresh: localStorage.getItem('refresh_token'),
        });
        console.log("access token fetch", res)
        if (res.status === 200) {
            localStorage.setItem('access_token', res.data.access);
            customAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
            return customAxios(originalRequest);
        }
    }

    
    return Promise.reject(error);
});


export default customAxios;