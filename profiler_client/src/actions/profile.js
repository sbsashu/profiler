import { 
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILES,
    GET_REPO
} from './types';
import { setAlert } from './alert'
import axios from 'axios';

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

// GET ALL PROFILES
export const GetProfiles  = () => async dispatch => {
    dispatch({
        type: CLEAR_PROFILE
    })
    try {
        let res = await axios.get('/api/get_all_profile');
        dispatch({
            type: GET_PROFILES,
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

// GET ALL PROFILE_ID
export const GetProfileById  = userId => async dispatch => {
    try {
        let res = await axios.get(`/api/profile/${userId}`);
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
// GET ALL GITHUB
export const GetProfileGitHub  = username => async dispatch => {
    try {
        let res = await axios.get(`/github/${username}`);
        dispatch({
            type: GET_REPO,
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

export const CreateProfileUpdate = (formData, history, edit = false) => async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            let res = await axios.post('/api/profile', formData, config);
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })

            dispatch(setAlert(edit ? 'Profile updated' : 'Profile created', 'success'));
            
            if(edit) {
                history.push('/dashboard');
            }
        
        } catch (err) {
            let error = err.response.data.errors;
            if(error) {
                error.forEach(err => dispatch(setAlert(err.msg, 'danger')))
            }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {msg: err.response.statusText, status: err.response.status}
                })
        }
}
//ADD  Experience

export const AddExperience = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let res = await axios.put('/api/add/experience', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Your Experience Added Successfully', 'success'));
        history.push('/dashboard');

    } catch (err) {
        let error = err.response.data.errors;
        if(error) {
            error.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}
//AddEducation
export const AddEducation = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        let res = await axios.put('/api/add/education', formData, config);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Your Education Added Successfully', 'success'));
        history.push('/dashboard');
        
    } catch (err) {
        let error = err.response.data.errors;
        if(error) {
            error.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}

//DELETE EXPERIENCE
export const deleteExperience = id => async dispatch => {
    try {
        let res = await axios.delete(`/api/delete/experience/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Experience has been deleted', 'success'));
        // history.push('/dashboard');
        
    } catch (err) {
        let error = err.response.data.errors;
        if(error) {
            error.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}
//DELETED EDUCATION
export const deleteEducation = id => async dispatch => {
    try {
        
        let res = await axios.delete(`/api/delete/education/${id}`);
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })

        dispatch(setAlert('Education has been deleted', 'success'));
        // history.push('/dashboard');
        
    } catch (err) {
        let error = err.response.data.errors;
        if(error) {
            error.forEach(err => dispatch(setAlert(err.msg, 'danger')))
        }
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            })
    }
}
//DELETE Account
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Do you want to delete your account , its not undo able')) {
        try {
        
            let res = await axios.delete('/api/profile/delete');
            dispatch({
                type: ACCOUNT_DELETED,
                payload: res.data
            })
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});
            dispatch(setAlert('Account has been deleted permanently', 'success'));            
        } catch (err) {
            let error = err.response.data.errors;
            if(error) {
                error.forEach(err => dispatch(setAlert(err.msg, 'danger')))
            }
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {msg: err.response.statusText, status: err.response.status}
                })
        }       
    }
}