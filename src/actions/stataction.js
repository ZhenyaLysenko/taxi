import { logout, checkAndGetToken, refreshToken } from './authaction';
import { apiurl } from '../appconfig';

export const STATISTIC_FETCH_START = 'STATISTIC_FETCH_START';
export const STATISTIC_FETCH_SUCCESS = 'STATISTIC_FETCH_SUCCESS';
export const STATISTIC_FETCH_FAILED = 'STATISTIC_FETCH_FAILED';
export const STATISTIC_CLEAR = 'STATISTIC_CLEAR';

const statStart = () => ({
    type: STATISTIC_FETCH_START
});

const statSuccess = (stat) => ({
    type: STATISTIC_FETCH_SUCCESS,
    stat
});

const statFailed = (error) => ({
    type: STATISTIC_FETCH_FAILED,
    error
});

export const statClear = () => ({
    type: STATISTIC_CLEAR
});

export const getStatistic = (page, size) => (dispatch, getState) => {
    const token = checkAndGetToken(dispatch, getState);
    if (token) {
        dispatch(statStart());
        fetch(`${apiurl}/api/tripshistory/${token.role}?PageNumber=${page}&PageSize=${size}`, {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${token.auth_token}`,
            })
        })
            .then(res => {
                if (res.status === 200 || res.status === 201 ||res.status === 204) {
                    return res.json();
                } else if (res.status === 401) {
                    dispatch(refreshToken(token, getStatistic, page, size));
                } else {
                    throw new Error(res.statusText);
                }
            })
            .then(data => {
                if (Array.isArray(data)) {
                    if (data.length === 0) {
                        dispatch(statFailed('No statistic'));
                    } else {
                        dispatch(statSuccess(data));
                    }
                } else {
                    dispatch(statFailed('No array'));
                }  
            })
            .catch(error => dispatch(statFailed(error.message)));
    } else {
        dispatch(logout());
    }
}


