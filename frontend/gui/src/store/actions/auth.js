import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as Constants from '../../Constants';

/*
 * the below actions are events.
 * they can act as triggers.
 */

export const authStart = () => {
    return {
        // type property must always be included
        type: actionTypes.AUTH_START,
    }
}

export const authSuccess = token => {
    return {
        // type property must always be included
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        // type property must always be included
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkoutAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const processSuccess = (res, dispatch) => {
    /*
     * we can't store in the state of our application our redux because if we restart our application the token will
     * no longer be present.
     * so instead we store in the localStorage (browser) which is something that persists.
     */
    const token = res.data.key;
    // 3600 is seconds in hour and 1000 is to offset that we are working with milliseconds by default.
    const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
    // localStorage is api available in the browser.
    localStorage.setItem('token', token)
    localStorage.setItem('expirationDate', expirationDate);
    dispatch(authSuccess(token));
    // once we log in with the token we check if the token has expired.
    dispatch(checkoutAuthTimeout(3600));
}

export const authLogin = (username, password) => {
    /*
     * return a dispatch when we log in
     * dispatch: a method, a call to action
     */
    return dispatch => {
        // alert us that the auth_start has taken place.
        dispatch(authStart());
        axios.post(Constants.LOGIN_URL, {
            username: username,
            password: password
        })
        .then(res => {
            processSuccess(res, dispatch);
        })
        .catch(err => {
            dispatch(authFail(err));
        });
    }
}

export const authSignup = (username, email, password1, password2) => {
    /*
     * return a dispatch when we log in
     * dispatch: a method, a call to action
     */
    return dispatch => {
        // alert us that the auth_start has taken place.
        dispatch(authStart());
        axios.post(Constants.SIGNUP_URL, {
            username: username,
            email: email,
            password1: password1,
            password2: password2
        })
        .then(res => {
            processSuccess(res, dispatch);
        })
        .catch(err => {
            dispatch(authFail(err));
        });
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkoutAuthTimeout((expirationDate.getTime() - new Date().getTime())/ 1000));
            }
        }
    }
}