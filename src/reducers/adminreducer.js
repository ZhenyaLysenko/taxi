import {
    USERLIST_FETCH_START,
    USERLIST_FETCH_SUCCESS,
    USERLIST_FETCH_FAILED,
    USERLIST_ERROR_CLEAR,
    USERLIST_CLEAR,
    ADMIN_CHANGE_START,
    ADMIN_CHANGE_SUCCESS,
    ADMIN_CHANGE_FAILED,
    ADMIN_CHANGE_CLEARERROR,
    ADMIN_CHANGE_CLEAR,
} from '../actions/adminaction';

import { CLEAR_ALL, CLEAR_ERRORS } from '../actions/authaction';

const initUserListState = {
    list: [],
    loading: false,
    error: null,
}

const userlistData = (state = initUserListState, action) => {
    switch (action.type) {
        case USERLIST_FETCH_START: return Object.assign({}, state, { loading: true });
        case USERLIST_FETCH_SUCCESS: return Object.assign({}, state, { loading: false, list: action.list });
        case USERLIST_FETCH_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case USERLIST_ERROR_CLEAR: return Object.assign({}, state, { error: null });
        case USERLIST_CLEAR: return Object.assign({}, initUserListState);
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initUserListState);
        default: return state;
    }
}

const initAdminChangeState = {
    loading: false,
    success: null,
    error: null,
}

const adminChangeData = (state = initAdminChangeState, action) => {
    switch (action.type) {
        case ADMIN_CHANGE_START: return Object.assign({}, state, { loading: true });
        case ADMIN_CHANGE_SUCCESS: return Object.assign({}, state, { loading: false, success: action.mess });
        case ADMIN_CHANGE_FAILED: return Object.assign({}, state, { loading: false, error: action.error });
        case ADMIN_CHANGE_CLEARERROR: return Object.assign({}, state, { error: null, success: null });
        case ADMIN_CHANGE_CLEAR: return Object.assign({}, initAdminChangeState);
        case CLEAR_ERRORS: return Object.assign({}, state, { error: null });
        case CLEAR_ALL: return Object.assign({}, initAdminChangeState);
        default: return state;
    }
}

export { userlistData, adminChangeData };