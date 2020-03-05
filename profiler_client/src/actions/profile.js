import { 
    GET_PROFILE,
    PROFILE_ERROR,
} from './types';
import { setAlert } from './alert'
import axios from 'axios';
import CreateProfile from '../components/create-profiles/CreateProfile';

export const GetProfile  = () => async dispatch => {
    try {
        let res = await axios.get('/api/me');
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        if(!error.response.data.success) {
            setAlert(error.response.data.message, 'danger');
        }
        dispatch({
            type: PROFILE_ERROR,
            payload: {message: error.response.statusText, status: error.response.status}
        })
    }
}

export const CreateProfileUpdate = (formData, history, edit = false) => dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let res = axios.post('/api/profile', formData, config);

            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            dispatch(setAlert(edit ? 'Profile updated' : 'Profile created'));
            if(!edit) {
                history.push('/dashboard');
            }
        } catch (error) {
            let err = error.response.data.errors;
            
                err.forEach(err => dispatch(setAlert(err.msg, 'danger')));

                dispatch({
                    type: PROFILE_ERROR,
                    payload: {msg: error.response.statusText, status: error.response.status}
                })
        }
}