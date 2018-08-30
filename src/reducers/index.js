// Index.js compose all custome reducers in one

import { combineReducers } from 'redux';

// here import custom reducers
import { testData } from './testreducer';
import { userData, tokenData, photoData } from './authreducer';
import { historyData } from './historyreducer';
import { docData } from './docreducer';
import { vehData } from './vehiclereducer';
import { chengeddata } from './chengereducer';
import { statData } from './statreducer';
import { resetData } from "./resetreducer";
import { userlistData, adminChangeData, refundlistData } from './adminreducer';
// Here combine custom reducers
export default combineReducers({
    testData,
    userData,
    tokenData,
    historyData,
    photoData,
    docData,
    vehData,
    chengeddata,
    statData,
    resetData,
    userlistData,
    adminChangeData,
    refundlistData
});