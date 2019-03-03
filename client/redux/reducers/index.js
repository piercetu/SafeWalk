import { combineReducers } from 'redux';

import MapReducer from './map';
import DataReducer from './data';

export default combineReducers({
    map: MapReducer,
    data: DataReducer
});