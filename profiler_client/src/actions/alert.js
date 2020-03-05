import uuid from 'uuid' 
import { SET_ALERT, REMOVE_ALERT} from './types';

export const setAlert = (message, alertTypes, timeout = 5000) => dispatch => {
    let id = uuid.v4();
    dispatch({
        type: SET_ALERT,
        payload: {message, alertTypes, id}
    })
    setTimeout(() => dispatch({type: REMOVE_ALERT, payload: id}), timeout);
}