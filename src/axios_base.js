import axios from 'axios';

let isAlredyFetchedRefreshToken = false;

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


customAxios.interceptors.response.use((response) => {
    return response
    }, async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && isAlredyFetchedRefreshToken) {
        isAlredyFetchedRefreshToken = false;
        return Promise.reject(error);
    }

    if (error.response.status === 401 && !isAlredyFetchedRefreshToken) {

        isAlredyFetchedRefreshToken = true;
        const res = await customAxios.post('dj-rest-auth/token/refresh/',
        {
            refresh: localStorage.getItem('refresh_token'),
        });
        if (res.status === 200) {
            localStorage.setItem('access_token', res.data.access);
            customAxios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
            return customAxios(originalRequest);
        }
    }
    return Promise.reject(error);
});


export default customAxios;