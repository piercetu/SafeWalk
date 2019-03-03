import axios from 'axios';

import { SET_PHONE, NOTIFY_PARENT } from '../actions/types';

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
        
        case NOTIFY_PARENT: 
            axios.put('/api/twilio/notify', {
                parentNumber: state.phoneNumber
            })
                .then(res => {
                    if (res.data.success)
                        console.log('Successfully notified parent');
                })
                .catch(err => {
                    console.log(err);
                });
                
            return state;
        default:
            return state;
    }
};