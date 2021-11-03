import * as actionTypes from './actionTypes';
import axios from  '../../axios_base';

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

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const authLogin = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('dj-rest-auth/login/',{
            username: username,
            password: password
        })
        .then(res =>{
            console.log(res.data.user)
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
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const authSignup = (username, fullname,email, password1, password2) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('dj-rest-auth/registration/',{
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
        })
        .catch(err => {
            dispatch(authFail(err))
        })
    }
}

export const fetchAccessToken = () => {
    return dispatch => {
        axios.post('dj-rest-auth/token/refresh/', {
            refresh: localStorage.getItem('refresh_token'),
        } )
        .then(res => {
            localStorage.setItem('refresh_token', res.data.access )
        })
        .catch(res => console.log(res))
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('access_token');
        if(token === undefined) {
            dispatch(logout());
        } else {
            dispatch(authSuccess(token));
            // const expirationDate = new Date(localStorage.getItem('expirationDate'));
            // if (expirationDate <= new Date()) {
            //     dispatch(logout());
            // }
            // else {
            //     dispatch(authSuccess(token));
            //     // dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() )/1000) );
            // }
        }
    }
}