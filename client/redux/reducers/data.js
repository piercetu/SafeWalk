import { SET_PHONE } from '../actions/types';

const initialState = {
    phoneNumber: ''
};

export default DataReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PHONE:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};