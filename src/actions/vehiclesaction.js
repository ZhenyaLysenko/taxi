import { apiurl } from '../appconfig';
// Need to take token
import { checkAndGetToken, checkAuth, logout } from './authaction';

export const VEHICLE_FETCH_START = 'DOCUMENT_FETCH_START';
export const VEHICLE_FETCH_SUCCESS = 'VEHICLE_FETCH_SUCCESS';
export const VEHICLE_FETCH_FAILED = 'VEHICLE_FETCH_FAILED';
export const VEHPHOTO_FETCH_START = 'VEHPHOTO_FETCH_START';
export const VEHPHOTO_FETCH_SUCCESS = 'VEHPHOTO_FETCH_SUCCESS';
export const VEHPHOTO_FETCH_FAILED = 'VEHPHOTO_FETCH_FAILED';
// TODO: create all action's types


// TODO: create all action's
const vehicleStart = () => ({
    type: VEHICLE_FETCH_START
})

const vehicleSuccess = (veh) => ({
    type: VEHICLE_FETCH_SUCCESS,
    veh
});

const vehicleFailed = (error) => ({
    type: VEHICLE_FETCH_FAILED,
    error
})

const vehphotoStart = () => ({
    type: VEHPHOTO_FETCH_START
})

const vehphotoSuccess = (blob, url) => ({
    type: VEHPHOTO_FETCH_SUCCESS,
    blob,
    url
})

const vehphotoFailed = (error) => ({
    type: VEHPHOTO_FETCH_FAILED,
    error
})

// TODO: actionCreator upload Vehicle info
export const uploadVehicle = (data, file) => (dispatch, getState) => {
    dispatch(vehicleStart());
    const token = checkAndGetToken(getState);
    if (data && file) {
        if (token) {
            fetch(`${apiurl}/api/vehicles`, {
                method: 'PUT',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.auth_token}`,
                }),
                body: JSON.stringify(data)
            })
                .then(res => {
                    console.log(res);
                    if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                        dispatch(uploadVehPhoto(file, token));
                    } else if (res.status === 401) {
                        dispatch(logout());
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(vehicleFailed(error.message)));
        } else {
            dispatch(logout());
        }
    }
}

// TODO: actionCreator upload Vehicle Photo
export const uploadVehPhoto = (file, token) => (dispatch, getState) => {
    if (file) {
        if (token) {
            const data = new FormData();
            data.append('files', file);

            fetch(`${apiurl}/api/vehicles/images`, {
                method: 'PUT',
                headers: new Headers({
                    'Authorization': `Bearer ${token.auth_token}`,
                }),
                body: data
            })
                .then(res => {
                    if (res.status === 200 || res.status === 204 || res.status === 201 || res.status === 202) {
                        dispatch(getVehicle());
                    } else if (res.status === 401) {
                        dispatch(logout());
                    } else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(error => dispatch(error.message));
        } else {
            dispatch(logout());
        }
    }
}

// TODO: actionCreator get Document info 
export const getVehicle = () => (dispatch, getState) => {
    dispatch(vehicleStart());
    const token = checkAndGetToken(getState);
    if (token) {
        fetch(`${apiurl}/api/vehicles`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`
            })
        })
            .then(res => checkAuth(res, dispatch))
            .then(data => {
                // console.log(data);
                dispatch(vehicleSuccess(data));
                dispatch(getVehPhoto());
            })
            .catch(error => dispatch(vehicleFailed(error.message)));
    } else {
        dispatch(logout());
    }
}

// TODO: actionCreator get Document phoho
export const getVehPhoto = () => (dispatch, getState) => {
    const id = getState().vehData.veh.pictures[0];
    if (id) {
        dispatch(vehphotoStart());
        const token = checkAndGetToken(getState);
        if (token) {
            fetch(`${apiurl}/api/images/${id}`, {
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
                    dispatch(vehphotoSuccess(blob, url));
                })
                .catch(error => dispatch(vehphotoFailed(error.message)));
        } else {
            dispatch(logout());
        }
    } 
}
