import {
    GLOBALVIEW_OPEN,
    GLOBALVIEW_CLOSE,
} from '../actions/globalviewaction';

import { CLEAR_ALL } from '../actions/authaction';

const initState = {
    show: null,
    data: null,
}

const globalviewData = (state = initState, action) => {
    switch (action.type) {
        case GLOBALVIEW_OPEN: return { show: action.show, data: action.data };
        case GLOBALVIEW_CLOSE: return Object.assign({}, initState);
        case CLEAR_ALL: return Object.assign({}, initState);
        default: return state
    }
}

export { globalviewData }