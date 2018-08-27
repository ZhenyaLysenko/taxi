export const USER_FETCH_START = 'USER_FETCH_START';
export const USER_FETCH_SUCCESS = 'USER_FETCH_SUCCESS';
export const USER_FETCH_FAILED = 'USER_FETCH_ERROR';
export const USER_DELETE = 'USER_DELETE';

export const USERPHOTO_FETCH_START = 'USERPHOTO_FETCH_START';
export const USERPHOTO_FETCH_SUCCESS = 'USERPHOTO_FETCH_SUCCESS';
export const USERPHOTO_FETCH_FAILED = 'USERPHOTO_FETCH_FAILED';

export const TOKEN_SUCCESS = 'TOKEN_SUCCESS';
// export const TOKEN_FAILED = 'TOKEN_FAILED';
export const TOKEN_DELETE = 'TOKEN_DELETE';

export const CLEAR_ERRORS = 'CLEAR_ERRORS';

import { apiurl } from '../appconfig';

import { updatestart, updatesuccess, updatefailed } from './chengeaction';

import { vehClear } from './vehiclesaction';
import { docClear } from './docaction';
import { clearUpdate } from './chengeaction';
import { statClear } from './stataction';

const userStart = () => ({
    type: USER_FETCH_START
});

const userSuccess = (user) => ({
    type: USER_FETCH_SUCCESS,
    user
});

const userFailed = (error) => ({
    type: USER_FETCH_FAILED,
    error
});

const userDelete = () => ({
    type: USER_DELETE
});

const tokenSuccess = (token) => ({
    type: TOKEN_SUCCESS,
    token
});

const tokenDelete = () => ({
    type: TOKEN_DELETE
})

const photoStart = () => ({
    type: USERPHOTO_FETCH_START
});

const photoSuccess = (blob, url) => ({
    type: USERPHOTO_FETCH_SUCCESS,
    blob,
    url,
});

const photoFailed = (error) => ({
    type: USERPHOTO_FETCH_FAILED,
    error
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS
})

export const checkAndGetToken = (getState) => {
    if (getState().tokenData.token) {
        return getState().tokenData.token;
    }
    if (localStorage.getItem('Taxi_Token')) {
        return (JSON.parse(localStorage.getItem('Taxi_Token')));
    }
    return null;
}

export const checkAuth = (res, dispatch) => {
    if (res.status === 200 || res.status === 204) {
        return res.json();
    } else if (res.status === 401) {
        dispatch(logout());
    } else {
        throw new Error(res.statusText);
    }
}

// TODO: ActionCreator refresh token
export const refreshToken = () => (dispatch, getState) => {

}

// actionCreator register driver
export const registerDriver = (regdata, file) => (dispatch, getState) => {
    dispatch(userStart());
    // console.log(regdata);
    fetch(`${apiurl}/api/accounts/drivers`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(regdata)
    })
        .then(res => {
            if (res.status === 200 || res.status === 204 || res.status === 201) {
                return res.json();
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(data => {
            if (Array.isArray(data[Object.keys(data)[0]])) {
                dispatch(userFailed(data[Object.keys(data)[0]][0]));
            } else {
                dispatch(loginDriver({ userName: regdata.email, password: regdata.password }));
            }
        })
        .catch(error => { dispatch(userFailed(error.message)) });
}

// actionCreator login driver
export const loginDriver = (logdata) => (dispatch, getState) => {
    dispatch(userStart());
    fetch(`${apiurl}/api/Auth/driver`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(logdata)
    })
        .then(res => {
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                return res.json();
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(token => {
            if (token.auth_token) {
                token.role = 'drivers';
                dispatch(tokenSuccess(token));
                dispatch(getDriver(token));
            } else {
                // console.log(token[Object.keys(token)[0]][0]);
                dispatch(userFailed(token[Object.keys(token)[0]][0]));
            }
        })
        .catch(error => {
            dispatch(userFailed(error.message));
            // dispatch(logout());
        });
}

// actionCreator get driver profile
export const getDriver = (token) => (dispatch, getState) => {
    if (token) {
        dispatch(userStart());
        fetch(`${apiurl}/api/accounts/drivers/${token.id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => {
                if (res.status === 200 || res.status === 204 || res.status === 201) {
                    return res.json();
                } else if (res.status === 400) {
                    return res.json();
                } else if (res.status === 404) {
                    dispatch(userSuccess(null));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                if (data) {
                    data.role = 'drivers';
                    dispatch(userSuccess(data));
                    if (!getState().photoData.url || (getState().userData.user && data.profilePictureId !== getState().userData.user.profilePictureId)) {
                        dispatch(getPhoto(token, data.profilePictureId));
                    }
                }
            })
            .catch(error => dispatch(userFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

// actionCreator log out user
export const logout = () => (dispatch, getState) => {
    dispatch(userDelete());
    dispatch(tokenDelete());
    dispatch(docClear());
    dispatch(vehClear());
    dispatch(clearUpdate());
    dispatch(statClear());
}

// actionCreator get user photo
export const getPhoto = (tok, id) => (dispatch, getState) => {
    const token = (tok) ? tok : checkAndGetToken(getState);
    const photoid = (id) ? id : getState().userData.user.profilePictureId;
    if (photoid) {
        if (token) {
            dispatch(photoStart());
            fetch(`${apiurl}/api/images/${photoid}`, {
                method: 'GET',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`
                })
            })
                .then(res => {
                    if (res.status === 401) {
                        dispatch(logout());
                    } else if (res.status === 404) {
                        dispatch(photoSuccess(null, null));
                    } else if (res.status === 200 || res.status === 204 || res.status === 201) {
                        return res.blob();
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .then(blob => {
                    const url = URL.createObjectURL(blob);
                    dispatch(photoSuccess(blob, url));
                })
                .catch(error => dispatch(photoFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

// actionCreator upload user photo
export const uploadPhoto = (file) => (dispatch, getState) => {
    const token = checkAndGetToken(getState);
    if (file) {
        dispatch(updatestart());
        if (token) {
            dispatch(photoStart());
            const data = new FormData();
            data.append('files', file);

            fetch(`${apiurl}/api/profilepicture`, {
                method: 'POST',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                    // 'Content-Type': 'multipart/form-data'
                }),
                body: data
            })
                .then(res => checkAuth(res, dispatch))
                .then(data => {
                    dispatch(updatesuccess('Photo is updated'))
                    dispatch(getUser());
                })
                .catch((error) => {
                    dispatch(updatefailed(error.message));
                    dispatch(photoFailed(error.message));
                });
        } else {
            dispatch(logout());
        }
    } else {
        dispatch(updatefailed('No file choosed'));
    }
}

// TODO: actionCreator register Customer
export const registerCustomer = (regdata, file) => (dispatch, getState) => {
    dispatch(userStart());
    // console.log(regdata);
    fetch(`${apiurl}/api/accounts/customers`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(regdata)
    })
        .then(res => {
            if (res.status === 200 || res.status === 204 || res.status === 201) {
                return res.json();
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(data => {
            if (Array.isArray(data[Object.keys(data)[0]])) {
                dispatch(userFailed(data[Object.keys(data)[0]][0]));
            } else {
                dispatch(loginCustomer({ userName: regdata.email, password: regdata.password }));
            }
        })
        .catch(error => { dispatch(userFailed(error.message)) });
}

// TODO: actionCreator login Customer
export const loginCustomer = (logdata) => (dispatch, getState) => {
    dispatch(userStart());
    fetch(`${apiurl}/api/Auth/customer`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(logdata)
    })
        .then(res => {
            if (res.status === 200 || res.status === 201 || res.status === 204) {
                return res.json();
            } else if (res.status === 400) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then(token => {
            if (token.auth_token) {
                token.role = 'customers';
                dispatch(tokenSuccess(token));
                dispatch(getCustomer(token));
            } else {
                // console.log(token[Object.keys(token)[0]][0]);
                dispatch(userFailed(token[Object.keys(token)[0]][0]));
            }
        })
        .catch(error => {
            dispatch(userFailed(error.message));
            // dispatch(logout());
        });
}

// TODO: actionCreator get Customer profile
export const getCustomer = (token) => (dispatch, getState) => {
    if (token) {
        dispatch(userStart());
        fetch(`${apiurl}/api/accounts/customers/${token.id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => {
                if (res.status === 200 || res.status === 204 || res.status === 201) {
                    return res.json();
                } else if (res.status === 400) {
                    return res.json();
                } else if (res.status === 404) {
                    dispatch(userSuccess(null));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                if (data) {
                    data.role = 'customers';
                    dispatch(userSuccess(data));
                    if (!getState().photoData.url || (getState().userData.user && data.profilePictureId !== getState().userData.user.profilePictureId)) {
                        dispatch(getPhoto(token, data.profilePictureId));
                    }
                }
            })
            .catch(error => dispatch(userFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

// TODO: actionCreator register Admin
export const registerAdmin = () => (dispatch, getState) => {

}

// TODO: actionCreator login Admin
export const loginAdmin = () => (dispatch, getState) => {

}

// TODO: actionCreator get Admin profile
export const getAdmin = (token) => (dispatch, getState) => {

}

// ActionCreator get User by Role
export const getUser = () => (dispatch, getState) => {
    const token = checkAndGetToken(getState);
    if (token && token.role) {
        switch (token.role) {
            case 'admins': {
                dispatch(getAdmin(token));
                break;
            }
            case 'drivers': {
                dispatch(getDriver(token));
                break;
            }
            case 'customers': {
                dispatch(getCustomer(token));
                break;
            }
        }
    } else {
        dispatch(logout());
    }
}

export const resendLetter = (data) => (dispatch, getState) => {
    dispatch(userStart());
    fetch(`${apiurl}/api/Auth/resendemail`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.status === 204) {
                dispatch(userFailed('Email send'));
            } else {
                throw new Error(res.statusText);
            }
        })
        .catch(error => dispatch(userFailed(error.message)));
}

