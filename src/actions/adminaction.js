import { checkAndGetToken, logout } from './authaction';
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

const changeClerError = () => ({
    type: ADMIN_CHANGE_CLEARERROR
});

const adminChangeClear = () => ({
    type: ADMIN_CHANGE_CLEAR
});

export const getUserList = (page, size, option = {
    Rol: 'customer_access',
    SearchQuery: null,
    EmailConfirmed: true,
}) => (dispatch, getState) => {
    const token = checkAndGetToken(dispatch, getState);
    if (token) {
        // console.log('List fetched');
        dispatch(userListStart());
        fetch(`${apiurl}/api/admins/getusers?
        &PageNumber=${page}
        &PageSize=${size}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                dispatch(logout());
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