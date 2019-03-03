import axios from 'axios';

import { SET_PHONE } from './types';

export const setPhone = phone => ({
    type: SET_PHONE,
    payload: {
        phoneNumber: phone
    }
});
