import axios from 'axios';

import { SET_ADDRESSES } from './types';
import { MAPS_API_KEY } from '../../config/keys';

const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const URL_LEG = `&key=${MAPS_API_KEY}`;

export const setAddresses = (startingAddress, endingAddress) => {
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
                                    latitude: location.lat,
                                    longitude: location.lng
                                }, endingRegion: {
                                    latitude: location2.lat,
                                    longitude: location2.lng
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

export const submitAddress = (startingRegion, endingAddress) => {
    return dispatch => {
        axios.get(URL + endingAddress.split(' ').join('+') + URL_LEG)
            .then(res => {
                let location = res.data.results[0].geometry.location;

                dispatch({
                    type: SET_ADDRESSES,
                    payload: {
                        startingRegion, 
                        endingRegion: {
                            latitude: location.lat,
                            longitude: location.lng
                        }
                    }
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
}