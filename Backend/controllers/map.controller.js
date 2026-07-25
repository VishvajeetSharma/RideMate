/**
 * @module mapController
 * @description Controller for handling map-related requests.
 */

 /**
    * Get coordinates for a given address.
    * 
    * @async
    * @function getCoordinate
    * @param {Object} req - Express request object.
    * @param {Object} res - Express response object.
    * @param {Function} next - Express next middleware function.
    * @returns {Promise<void>} - Returns a JSON response with coordinates or an error message.
    */
 
 /**
    * Get distance and time between origin and destination.
    * 
    * @async
    * @function getDistanceTime
    * @param {Object} req - Express request object.
    * @param {Object} res - Express response object.
    * @param {Function} next - Express next middleware function.
    * @returns {Promise<void>} - Returns a JSON response with distance and time or an error message.
    */
 
 /**
    * Get autocomplete suggestions for a given input.
    * 
    * @async
    * @function getAutoCompleteSuggestions
    * @param {Object} req - Express request object.
    * @param {Object} res - Express response object.
    * @param {Function} next - Express next middleware function.
    * @returns {Promise<void>} - Returns a JSON response with autocomplete suggestions or an error message.
    */

 
const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

module.exports.getCoordinate = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;
    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(400).json({ message: 'Coordinate not found!' });

    }
};

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    try {
        const distanceTime = await mapService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        res.status(400).json({ message: 'Distance or time not found!' });
    }
};

module.exports.getAutoCompleteSuggestions = async (req, res, next) =>{
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {input} = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'})
    }
}