export const ETH_BALANCE_START = 'ETH_BALANCE_START';
export const ETH_BALANCE_SUCCESS = 'ETH_BALANCE_SUCCESS';
export const ETH_BALANCE_FAILED = 'ETH_BALANCE_SUCCESS';

export const TAXI_BALANCE_START = 'TAXI_BALANCE_START';
export const TAXI_BALANCE_SUCCESS = 'TAXI_BALANCE_SUCCESS';
export const TAXI_BALANCE_FAILED = 'TAXI_BALANCE_FAILED';

export const CHANGE_BALANCE_START = 'CHANGE_BALANCE_START';
export const CHANGE_BALANCE_SUCCESS = 'CHANGE_BALANCE_SUCCESS';
export const CHANGE_BALANCE_FAILED = 'CHANGE_BALANCE_FAILED';
export const CHANGE_BALANCE_CLEAR = 'CHANGE_BALANCE_CLEAR';

const ethStart = () => ({
    type: ETH_BALANCE_START
});

const ethSuccess = (bal) => ({
    type: ETH_BALANCE_SUCCESS,
    bal
});

const ethFailed = (error) => ({
    type: ETH_BALANCE_FAILED,
    error
});

const taxiStart = () => ({
    type: TAXI_BALANCE_START
});

const taxiSuccess = (bal) => ({
    type: TAXI_BALANCE_SUCCESS,
    bal
});

const taxiFailed = (error) => ({
    type: TAXI_BALANCE_FAILED,
    error
});

const changeStart = () => ({
    type: CHANGE_BALANCE_START
});

const changeSuccess = (mess) => ({
    type: CHANGE_BALANCE_SUCCESS,
    mess
});

const changeFailed = (error) => ({
    type: CHANGE_BALANCE_FAILED,
    error
});

export const clearChange = () => ({
    type: CHANGE_BALANCE_CLEAR
});

let EthBalance = 200;
let TaxiBalance = 56;

export const getEthBalance = () => (dispatch, getState) => {
    dispatch(ethStart());

    setTimeout(() => {
        dispatch(ethSuccess(EthBalance));
    }, 1000);
}

export const getTaxiBalance = () => (dispatch, getState) => {
    dispatch(taxiStart());

    setTimeout(() => {
        dispatch(taxiSuccess(TaxiBalance));
    }, 1000);
}

export const depositToTaxiBalance = (value) => (dispatch, getState) => {
    dispatch(changeStart());
    const val = Number.parseFloat(value);
    setTimeout(() => {
        if ((EthBalance - val) >= 0) {
            EthBalance -= val;
            TaxiBalance += val;
            dispatch(changeSuccess('Balance changed'));
            dispatch(getEthBalance());
            dispatch(getTaxiBalance());
        } else {
            dispatch(changeFailed('Not enough balance'));
        }
    }, 1000);
}