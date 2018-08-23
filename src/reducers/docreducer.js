// TODO: import action's types
import {
    DOCPHOTO_FETCH_START,
    DOCPHOTO_FETCH_SUCCESS,
    DOCPHOTO_FETCH_FAILED,
    DOCUMENT_FETCH_START,
    DOCUMENT_FETCH_SUCCESS,
    DOCUMENT_FETCH_FAILED,
} from '../actions/docaction';

const initState = {
    loaddoc: false,
    loadphoto: false,
    doc: null,
    errordoc: null,
    errorphoto: null,
    blob: null,
    url: null,
}

// TODO: create reducer docData
const docData = (state = initState, action) => {
    switch (action.type) {
        case DOCUMENT_FETCH_START: return Object.assign({}, state, { loaddoc: true });
        case DOCUMENT_FETCH_SUCCESS: return Object.assign({}, state, { loaddoc: false, doc: action.doc });
        case DOCUMENT_FETCH_FAILED: return Object.assign({}, state, { loaddoc: false, errordoc: action.error });
        case DOCPHOTO_FETCH_START: return Object.assign({}, state, { loadphoto: true });
        case DOCPHOTO_FETCH_SUCCESS: return Object.assign({}, state, { loadphoto: false, blob: action.blob, url: action.url });
        case DOCPHOTO_FETCH_FAILED: return Object.assign({}, state, { loadphoto: false, errorphoto: action.error });
        default: return state;
    }
}

export { docData };