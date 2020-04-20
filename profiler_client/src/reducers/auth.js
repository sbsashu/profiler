import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types';
const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true
}

export default function(state = intialState, actions) {
    let { type, payload } = actions;
    
    switch(type) {
        case LOAD_USER:
            return {
                ...state,
                user: payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default :
            return state;
    }
}
