import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
const intialState = [];

export default function(state = intialState, actions) {
    let { type, payload } = actions;

    switch (type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== actions.payload);
        default:
            return state;
    }
}