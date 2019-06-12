import * as actionTypes from '../actions/actionTypes';
import { updateObject } from "../utility";

const initialState = {
    token: null,
    error: null,
    loading: false
}

const authStart = (state, action) => {
    /*
     * when we start to authenticate we want our error to remain null and our loading to be true.
     */
    return updateObject(state, {
        error: null,
        loading: true
    });
}

const authSuccess = (state, action) => {
    /*
     * our action will be received from actions/auth.js
     * we will be taking in an updated action with the token.
     */
    return updateObject(state, {
        token: action.token,
        error: null,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
       error: action.error,
       loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    });
}

/*
 *
 */
const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        default:
            // just return the state as is (rare case).
            return state;
    }
}

export default reducer;