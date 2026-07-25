/**
 * Fetches the coordinates (latitude and longitude) for a given address.
 * @param {string} address - The address to fetch coordinates for.
 * @returns {Promise<{ltd: number, lng: number}>} - An object containing the latitude and longitude of the address.
 * @throws Will throw an error if unable to fetch coordinates.
 */

/**
 * Fetches the distance and time between an origin and a destination.
 * @param {string} origin - The starting point for the route.
 * @param {string} destination - The endpoint for the route.
 * @returns {Promise<{distance: string, duration: string}>} - An object containing the distance and duration of the route.
 * @throws Will throw an error if unable to fetch distance and time or if origin or destination is missing.
 */

/**
 * Fetches autocomplete suggestions for a given input query.
 * @param {string} input - The input query to fetch autocomplete suggestions for.
 * @returns {Promise<Array>} - An array of autocomplete suggestions.
 * @throws Will throw an error if unable to fetch suggestions or if input query is missing.
 */

const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (adress) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${(adress)}&language=en&region=en&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[0].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if(!origin || !destination) throw new Error('Missing origin or destination');

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.gomaps.pro/maps/api/directions/json?destination=${destination}&origin=${origin}&key=${apiKey}`;

    try {    
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const route = response.data.routes[0];
            const leg = route.legs[0]; 

            return {
                distance: leg.distance.text, 
                duration: leg.duration.text 
            };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getAutoCompleteSuggestions = async (input) =>{
    if(!input){
        throw new Error('Query is Required');
    }
    const apiKey = process.env.GOOGLE_MAPS_API;
    // Construct the URL for the Google Maps Place Autocomplete API request
    const url = `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${input}&key=${apiKey}`;

    try{
        const response = await axios.get(url);
        if(response.data.status === 'OK'){
            return response.data.predictions;
        }
        else{
            throw new Error('Unable to fetch suggestions');
        }
    }catch(error){
        throw error
    }


    
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}