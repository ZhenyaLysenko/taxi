import {
    USERLIST_FETCH_START,
    USERLIST_FETCH_SUCCESS,
    USERLIST_FETCH_FAILED,
    USERLIST_ERROR_CLEAR,
    USERLIST_CLEAR
} from '../actions/adminaction';

const initUserListState = {
    list: [],
    loading: false,
    error: null,
}

const userlistData = (state= initUserListState, action) => {
    switch(action.type) {
        case USERLIST_FETCH_START: return Object.assign({}, state, { loading: true });
        case USERLIST_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, list: action.list });
        case USERLIST_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error});
        case USERLIST_ERROR_CLEAR: return Object.assign({}, state, { error: null});
        case USERLIST_CLEAR: return Object.assign({}, initUserListState);
        default: return state;
    }
}

export { userlistData };