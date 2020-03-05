import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOAD_USER,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from '../actions/types';

import axios from 'axios';
import { setAlert } from './alert'
import { setAuthToken } from '../utils/authToken'
export const loadUser = () => async dispatch => {
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        let res = await axios.get('/api/auth');
        dispatch({
            type: LOAD_USER,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR,
        })
    }
}

export const RegisterUser = (username, last_name, email, password) => async dispatch => {
        let config = {
            headers: {
                "Content-Type": 'application/json'
            }
        }
        let body = JSON.stringify({
                    username,
                    last_name,
                    email,
                    password
                })
                try {
                    let res = await axios.post('api/register', body, config)
                    dispatch({
                        type: REGISTER_SUCCESS,
                        payload: res.data
                    });
                    dispatch(loadUser());
                } catch (err) {  
                    let error = err.response.data.errors;
                    if(error) {
                        error.forEach(err => dispatch(setAlert(err.msg, 'danger')))
                    }
                    dispatch({
                        type: REGISTER_FAIL
                    })
                }
        }

export const LoginUser = (email, password) => async dispatch => {
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let body = JSON.stringify({email, password})
        try {
            let res = await axios.post('/auth/login', body, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            dispatch(loadUser());
        } catch (error) {
            let err = error.response.data.errors;
            err.forEach(err => dispatch(setAlert(err.msg, 'danger')))
            dispatch({
                type: LOGIN_FAIL
            })
        }
}

export const Logout = () => dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    dispatch({
        type: LOGOUT
    })
}