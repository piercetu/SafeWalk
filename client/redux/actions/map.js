import axios from 'axios';

import { SET_ADDRESSES } from './types';
import { MAPS_API_KEY } from '../../config/keys';

const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const URL_LEG = `&key=${MAPS_API_KEY}`;

export const setAddresses = (startingAddress, endingAddress) => {
    console.log(URL + startingAddress.split(' ').join('+') + URL_LEG);
    return dispatch => {
        axios.get(URL + startingAddress.split(' ').join('+') + URL_LEG)
            .then(res => {
                let { location } = res.data.results[0].geometry;

                axios.get(URL + endingAddress.split(' ').join('+') + URL_LEG)
                    .then(res2 => {
                        let location2 = res2.data.results[0].geometry.location;
                        
                        dispatch({
                            type: SET_ADDRESSES,
                            payload: {
                                startingAddress, endingAddress,
                                startingRegion: {
                                    ...location
                                }, endingRegion: {
                                    ...location2
                                }
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }
}