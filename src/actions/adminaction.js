import { checkAndGetToken, logout, refreshToken } from './authaction';
import { apiurl } from '../appconfig';

export const USERLIST_FETCH_START = 'USERLIST_FETCH_START';
export const USERLIST_FETCH_SUCCESS = 'USERLIST_FETCH_SUCCESS';
export const USERLIST_FETCH_FAILED = 'USERLIST_FETCH_FAILED';
export const USERLIST_ERROR_CLEAR = 'USERLIST_ERROR_CLEAR';
export const USERLIST_CLEAR = 'USERLIST_CLEAR';

export const ADMIN_CHANGE_START = 'ADMIN_CHANGE_START';
export const ADMIN_CHANGE_SUCCESS = 'ADMIN_CHANGE_SUCCESS';
export const ADMIN_CHANGE_FAILED = 'ADMIN_CHANGE_FAILED';
export const ADMIN_CHANGE_CLEARERROR = 'ADMIN_CHANGE_CLEARERROR';
export const ADMIN_CHANGE_CLEAR = 'ADMIN_CHANGE_CLEAR';
export const ADMIN_CHANGE_UPDATE = 'ADMIN_CHANGE_UPDATE';

const userListStart = () => ({
    type: USERLIST_FETCH_START
});

const userListSuccess = (list) => ({
    type: USERLIST_FETCH_SUCCESS,
    list
});

const userListFailed = (error) => ({
    type: USERLIST_FETCH_FAILED,
    error
});

const userListErrorClear = () => ({
    type: USERLIST_ERROR_CLEAR
});

const userListClear = () => ({
    type: USERLIST_CLEAR
});

const changeStart = () => ({
    type: ADMIN_CHANGE_START
});

const changeSuccess = (mess) => ({
    type: ADMIN_CHANGE_SUCCESS,
    mess
});

const changeFailed = (error) => ({
    type: ADMIN_CHANGE_FAILED,
    error
});

const changeUpdate = (id) => ({
    type: ADMIN_CHANGE_UPDATE,
    id
})

export const changeClearError = () => ({
    type: ADMIN_CHANGE_CLEARERROR
});

const adminChangeClear = () => ({
    type: ADMIN_CHANGE_CLEAR
});

export const getUserList = (page, size, search, option = {
    Rol: 'customer_access',
    SearchQuery: null,
    EmailConfirmed: true,
}) => (dispatch, getState) => {
    const token = checkAndGetToken(dispatch, getState);
    if (token) {
        // console.log('List fetched');
        dispatch(userListStart());
        fetch(`${apiurl}/api/admins/getusers?
        ${(page) ? `&PageNumber=${page}&` : ''}
        ${(page) ? `&PageSize=${size}&` : ''}
        ${(search) ? `&SearchQuery=${search}&` : ''}
        PageSize=${size}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
            .then(res => {
                if (res.status === 200 || res.status === 201 || res.status === 204) {
                    return res.json();
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getUserList, page, size, search, option));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(list => {
                if (list) {
                    dispatch(userListSuccess(list));
                }
            })
            .catch(error => dispatch(userListFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

export const setUserToAdmin = (id) => (dispatch, getState) => {
    if (id) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/api/admins/root/userToAdmin/${id}`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 200 || res.status === 201 || res.status === 204) {
                        dispatch(changeSuccess('User is admin now'));
                        dispatch(getUserList(1, 20));
                    } else if (res.status === 401) {
                        dispatch(refreshToken(token, setUserToAdmin, id));
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(changeFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}
// Not done yet
export const deleteAdmin = (id) => (dispatch, getState) => {
   console.log('Delete admin dont done yet');
}

export const deleteUser = (id) => (dispatch, getState) => {
    if (id) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/api/admins/removeuser/${id}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
            .then(res => {
                if (res.status === 200 || res.status === 201 || res.status === 204) {
                    dispatch(changeSuccess('User was deleted'));
                    dispatch(getUserList(1, 20));
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, deleteAdmin, id));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .catch(error => dispatch(changeFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

export const approveLicense = (id) => (dispatch, getState) => {
    if (id) {
        const token = checkAndGetToken(dispatch, getState);
        if (token) {
            dispatch(changeStart());
            fetch(`${apiurl}/api/admins/driverlicenses/${id}/approve`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
            .then(res => {
                if (res.status === 200 || res.status === 201 || res.status === 204) {
                    dispatch(changeSuccess('License was approved'));
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, approveLicense, id));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .catch(error => dispatch(changeFailed(error.message)))
        } else {
            dispatch(logout());
        }
    }
}