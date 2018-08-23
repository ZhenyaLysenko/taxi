import {
    UPDATE_FETCH_START,
    UPDATE_FETCH_SUCCESS,
    UPDATE_FETCH_FAILED,
    CLEAR_UPDATE_SUCCESS
} from '../actions/chengeaction.js'

import { CLEAR_ERRORS } from '../actions/authaction';

const initState = {
    loading: false,
    success: null,
    error: null,
}

const chengeddata = (state = initState, action ) =>{
    switch (action.type) {
        case UPDATE_FETCH_START: return Object.assign({}, state, { loading: true });
        case UPDATE_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, success: action.success });
        case UPDATE_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_UPDATE_SUCCESS: return Object.assign({}, state, { success: null });
        default: return state;
    }
    
}

export { chengeddata }