import * as actionTypes from './actionTypes';
import axios from  'axios';
import * as feedFunc from './feed';
import * as userFunc from './currentUser';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

// export const checkAuthTimeout = expirationTime => {
//     return dispatch => {
//         setTimeout(() =>{
//             dispatch(logout());
//         }, expirationTime*1000)
//     }
// }

const loadEssential = dispatch => {
    console.log("load essential called")
    // feedFunc.fetchSection();
    dispatch(userFunc.fetchCurrentUser());
    dispatch(feedFunc.fetchFeed(1));
    console.log("end")
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://study-booth-backend.herokuapp.com/dj-rest-auth/login/',{
            username: username,
            password: password
        })
        .then(res =>{
            console.log(res)
            const access_token = res.data.access_token;
            const refresh_token = res.data.refresh_token;
            const user = res.data.user.pk;
            const expirationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('user', user);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(access_token));
            // dispatch(checkAuthTimeout(3600));
            loadEssential(dispatch);
        })
        .catch(err => {
            console.log(err.response.data)
            dispatch(authFail(Object.values(err.response.data)[0][0]))
        })
    }
}

export const authSignup = (username, fullname,email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://study-booth-backend.herokuapp.com/dj-rest-auth/registration/',{
            username: username,
            fullName: fullname,
            email: email,
            password1: password1,
            password2: password2,
        })
        .then(res =>{
            const access_token = res.data.access_token;
            const refresh_token = res.data.refresh_token;
            const user = res.data.user.pk;
            const expirationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            localStorage.setItem('user', user);
            localStorage.setItem('expirationDate',expirationDate);
            dispatch(authSuccess(access_token));
            // dispatch(checkAuthTimeout(3600));
            loadEssential(dispatch);
        })
        .catch(err => {
            dispatch(authFail(Object.values(err.response.data)[0][0]))
        })
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('access_token');
        if(token === undefined) {
            dispatch(logout());
        } else {
            loadEssential(dispatch);
            dispatch(authSuccess(token));
        }
    }
}