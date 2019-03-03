import { SET_ADDRESS } from '../actions/types';

const initialState = {
    startingAddress: '', endingAddress: '',
    startingRegion: {
        latitude: null, longitude: null
    }, endingRegion: {
        latitude: null, longitude: null
    }
}; 

export default MapReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_ADDRESS: 
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}