import { SET_ADDRESSS } from '../actions/types';

const initialState = {
    startingAddress: '', endingAddress: '',
    startingRegion: {
        latitude: null, longitude: null
    }, endingRegion: {
        latitude: null, longitude: null
    }
}; 