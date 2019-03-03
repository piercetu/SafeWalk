import { combineReducers } from 'redux';

import MapReducer from './map';

export default combineReducers({
    map: MapReducer
});