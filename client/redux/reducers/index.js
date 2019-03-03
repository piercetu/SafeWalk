import { combineReducers } from 'react-redux';

import MapReducer from './map';

export default combineReducers({
    map: MapReducer
});