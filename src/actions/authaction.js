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

import { apiurl } from '../appconfig';

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
    fetch(`${apiurl}/api/accounts/drivers`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify(regdata)
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            dispatch(loginDriver({ userName: regdata.userName, password: regdata.password }));
        })
        .catch(error => { dispatch(userFailed(error.message)) });
}

// actionCreator login driver
export const loginDriver = (logdata) => (dispatch, getState) => {
    dispatch(userStart());
    fetch(`${apiurl}/api/Auth/driver/signuptoken`, {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(logdata)
    })
        .then(res => {
            if (res.status !== 200) {
                throw new Error(res.statusText);
            } else {
                return res.json();
            }
        })
        .then(token => {
            token.role = 'driver';
            dispatch(tokenSuccess(token));
            dispatch(getDriver(token));
        })
        .catch(error => {
            dispatch(userFailed(error.message));
            // dispatch(logout());
        });
}

// actionCreator get driver profile
export const getDriver = (token) => (dispatch, getState) => {
    if (token) {
        fetch(`${apiurl}/api/accounts/drivers/${token.id}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => checkAuth(res, dispatch))
            .then(data => {
                data.role = 'driver';
                dispatch(userSuccess(data));
                dispatch(getPhoto(token, data.profilePictureId));
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
}

// actionCreator get user photo
export const getPhoto = (token, photoid) => (dispatch, getState) => {
    dispatch(photoStart());
    if (token) {
        fetch(`${apiurl}/api/images/${photoid}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => {
                if (res.status === 401) {
                    dispatch(logout());
                } else {
                    return res.blob();
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

// actionCreator upload user photo
export const uploadPhoto = (file) => (dispatch, getState) => {
    dispatch(photoStart());
    const token = checkAndGetToken(getState);
    if (token && file) {
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
                dispatch(getUser());
            })
            .catch((error) => dispatch(photoFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

// TODO: actionCreator register Customer
export const registerCustomer = () => (dispatch, getState) => {

}

// TODO: actionCreator login Customer
export const loginCustomer = () => (dispatch, getState) => {

} 

// TODO: actionCreator get Customer profile
export const getCustomer = (token) => (dispatch, getState) => {

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
    if (token) {
        switch(token.role) {
            case 'admin': dispatch(getAdmin(token));
            case 'driver': dispatch(getDriver(token));
            case 'customer': dispatch(getCustomer(token));
        }
    } else {
        dispatch(logout());
    }
}

// TODO: create ActionCreator update Driver profile
export const updateDriver = (data) => (dispatch, getState) => {
    
}

// TODO: create ActionCreator update Customer profile
export const updateCustomer = (data) => (dispatch, getState) => {

}

// TODO: create ActionCreator update Admin profile
export const updateAdmin = (data) => (dispatch, getState) => {

}


