import { SET_ADDRESSES } from '../actions/types';

const initialState = {
    startingRegion: {
        latitude: null, longitude: null
    }, endingRegion: {
        latitude: null, longitude: null
    }
}; 

export default MapReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ADDRESSES: 
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}