import { apiurl } from '../appconfig';
// Need to take token
import { checkAndGetToken, logout, checkAuth } from './authaction';

import { updatestart, updatesuccess, updatefailed } from './chengeaction';

export const DOCUMENT_FETCH_START = 'DOCUMENT_FETCH_START';
export const DOCUMENT_FETCH_SUCCESS = 'DOCUMENT_FETCH_SUCCESS';
export const DOCUMENT_FETCH_FAILED = 'DOCUMENT_FETCH_FAILED';
export const DOCPHOTO_FETCH_START = 'DOCPHOTO_FETCH_START';
export const DOCPHOTO_FETCH_SUCCESS = 'DOCPHOTO_FETCH_SUCCESS';
export const DOCPHOTO_FETCH_FAILED = 'DOCPHOTO_FETCH_FAILED';
export const DOCUMENT_CLEAR = 'DOCUMENT_CLEAR';
// TODO: create all action's types

// TODO: create all action's
const docStart = () => ({
    type: DOCUMENT_FETCH_START
});

const docSuccess = (doc) => ({
    type: DOCUMENT_FETCH_SUCCESS,
    doc
});

const docFailed = (error) => ({
    type: DOCUMENT_FETCH_FAILED,
    error
});

const docphotoStart = () => ({
    type: DOCPHOTO_FETCH_START
});

const docphotoSuccess = (blob, url) => ({
    type: DOCPHOTO_FETCH_SUCCESS,
    blob,
    url
});

const docphotoFailed = (error) => ({
    type: DOCPHOTO_FETCH_FAILED,
    error
});

export const docClear = (error) => ({

});

// TODO: actionCreator upload Document info
export const uploadDocument = (data, file) => (dispatch, getState) => {
    // dispatch(docStart());
    const token = checkAndGetToken(getState);
    const checkData = (data) => {
        if (data.dayFrom &&
            data.yearFrom &&
            data.monthFrom &&
            data.dayTo &&
            data.yearTo &&
            data.monthTo) {
            return true
        }
        return false
    }
    if (checkData(data)) {
        dispatch(updatestart());
        if (token) {
            fetch(`${apiurl}/api/documents/driverlicense`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.auth_token}`
                }),
                body: JSON.stringify(data)
            })
                .then(res => {
                    if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                        if (file) {
                            dispatch(uploadDocPhoto(file, token));
                        } else {
                            dispatch(updatesuccess('Documents is update'));
                            dispatch(getDocument());
                        }
                    } else if (res.status === 401) {
                        dispatch(logout());
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => {
                    dispatch(updatefailed(error.message));
                    dispatch(docFailed(error.message));
                });

        } else {
            dispatch(logout());
        }
    } else if (file) {
        dispatch(updatestart());
        dispatch(uploadDocPhoto(file, token));
    } else {
        dispatch(updatefailed('No data and photo'));
    }
}

// TODO: actionCreator upload Document Photo
export const uploadDocPhoto = (file, token) => (dispatch, getState) => {
    // dispatch(docphotoStart());
    if (file) {
        if (token) {
            const data = new FormData();
            data.append('files', file);

            fetch(`${apiurl}/api/documents/driverlicense/image`, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                }),
                body: data
            })
                .then(res => {
                    if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                        dispatch(updatesuccess('Documents is update'));
                        dispatch(getDocument());
                    } else if (res.status === 401) {
                        dispatch(logout());
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => {
                    dispatch(updatefailed(error.message));
                    dispatch(docphotoFailed(error.message));
                });
        } else {
            dispatch(logout());
        }
    }
}

// TODO: actionCreator get Document info 
export const getDocument = () => (dispatch, getState) => {
    dispatch(docStart());
    const token = checkAndGetToken(getState);
    if (token) {
        fetch(`${apiurl}/api/documents/driverlicense`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => checkAuth(res, dispatch))
            .then(data => {
                // console.log(data);
                dispatch(docSuccess(data));
                dispatch(getDocPhoto());
            })
            .catch(error => dispatch(docFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

// TODO: actionCreator get Document phoho
export const getDocPhoto = () => (dispatch, getState) => {
    dispatch(docphotoStart());
    const token = checkAndGetToken(getState);
    if (token) {
        fetch(`${apiurl}/api/documents/driverlicense/image`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => {
                if (res.status === 401) {
                    dispatch(logout());
                } else if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                    return res.blob();
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(blob => {
                const url = URL.createObjectURL(blob);
                dispatch(docphotoSuccess(blob, url));
            })
            .catch(error => dispatch(docphotoFailed(error.message)));
    } else {
        dispatch(logout());
    }
}