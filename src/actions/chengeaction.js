import { apiurl } from '../appconfig';

import { checkAndGetToken, logout, getUser } from './authaction';

export const UPDATE_FETCH_START = 'UPDATE_FETCH_START';
export const UPDATE_FETCH_SUCCESS = 'UPDATE_FETCH_SUCCESS';
export const UPDATE_FETCH_FAILED = 'UPDATE_FETCH_FAILED';

const updatestart = () => ({
    type: UPDATE_FETCH_START
});

const updatesuccess = () => ({
    type: UPDATE_FETCH_SUCCESS
});

const updatefailed = () => ({
    type: UPDATE_FETCH_FAILED,
    error
});

export const chengeName = (data) => (dispatch, getState) => {
    dispatch(updatestart());
    const token = checkAndGetToken(getState);
    if (data) {
        if (token) {
            fetch(`${apiurl}/api/accounts/drivers/${token.id}`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.auth_token}`
                }),
                body: JSON.stringify(data)
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 204) {
                        dispatch(updatesuccess());
                        dispatch(getUser());
                    }
                    else {
                        throw new Error(res.statusText)
                    }
                })
                .catch(error => dispatch(updatefailed(error.massege)));

        }
        else {
            dispatch(logout());
        }
    }
}
