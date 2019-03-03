import { SET_PHONE, NOTIFY_PARENT } from './types';

export const setPhone = phone => ({
    type: SET_PHONE,
    payload: {
        phoneNumber: phone
    }
});

export const notifyParent = () => ({ 
    type: NOTIFY_PARENT
});