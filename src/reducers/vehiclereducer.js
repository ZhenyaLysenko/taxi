// TODO: import action's types
import {
    VEHICLE_FETCH_START,
    VEHICLE_FETCH_SUCCESS,
    VEHICLE_FETCH_FAILED,
    VEHPHOTO_FETCH_START,
    VEHPHOTO_FETCH_SUCCESS,
    VEHPHOTO_FETCH_FAILED,
    VEHICLE_CLEAR
} from '../actions/vehiclesaction';


const initState = {
    loadveh: false,
    loadphoto: false,
    veh: null,
    errorveh: null,
    errorphoto: null,
    blob: null,
    url: null,
}

// TODO: create reducer docData
const vehData = (state = initState, action) => {
    switch (action.type) {
        case VEHICLE_FETCH_START: return Object.assign({}, state, { loadveh: true });
        case VEHICLE_FETCH_SUCCESS: return Object.assign({}, state, { loadveh: false, veh: action.veh });
        case VEHICLE_FETCH_FAILED: return Object.assign({}, state, { loadveh: false, errorveh: action.error });
        case VEHPHOTO_FETCH_START: return Object.assign({}, state, { loadphoto: true });
        case VEHPHOTO_FETCH_SUCCESS: return Object.assign({}, state, { loadphoto: false, blob: action.blob, url: action.url });
        case VEHPHOTO_FETCH_FAILED: return Object.assign({}, state, { loadphoto: false, errorphoto: action.error });
        case VEHICLE_CLEAR: return Object.assign({}, initState);
        default: return state;
    }
}

export { vehData };