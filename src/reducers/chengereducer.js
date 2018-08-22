import {
    UPDATE_FETCH_START,
    UPDATE_FETCH_SUCCESS,
    UPDATE_FETCH_FAILED,
} from '../actions/chengeaction.js'

const initState = {
    loaddoc: false,
    succses: false,
    error: null,
}

const chengeddata = (state = initState, action ) =>{
    switch (action.type) {
        case UPDATE_FETCH_START: return Object.assign({}, state, { loaddoc: true });
        case UPDATE_FETCH_SUCCESS: return Object.assign({}, state, { loaddoc: false, succses: true });
        case UPDATE_FETCH_FAILED: return Object.assign({}, state, { loaddoc: false, error: action.error });
        default: return state;
    }
    
}

export { chengeddata }