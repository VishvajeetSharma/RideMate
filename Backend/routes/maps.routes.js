/**
 * @route GET /get-coordinate
 * @description Get the coordinates for a given address
 * @access Private
 * @param {string} address - The address to get coordinates for (min length: 3)
 * @middleware authMiddleware.authUser - Middleware to authenticate the user
 * @controller mapController.getCoordinate - Controller to handle the request
 */

/**
 * @route GET /get-distance-time
 * @description Get the distance and time between two locations
 * @access Private
 * @param {string} origin - The starting location (min length: 3)
 * @param {string} destination - The destination location (min length: 3)
 * @middleware authMiddleware.authUser - Middleware to authenticate the user
 * @controller mapController.getDistanceTime - Controller to handle the request
 */

/**
 * @route GET /get-suggestions
 * @description Get autocomplete suggestions for a given input
 * @access Private
 * @param {string} input - The input string to get suggestions for (min length: 3)
 * @middleware authMiddleware.authUser - Middleware to authenticate the user
 * @controller mapController.getAutoCompleteSuggestions - Controller to handle the request
 */


const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const mapController = require('../controllers/map.controller');
const { query } = require('express-validator');

router.get('/get-coordinate',
    query('address').isString().isLength({min: 3}),
    authMiddleware.authUser, mapController.getCoordinate);

router.get('/get-distance-time',
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authMiddleware.authUser, mapController.getDistanceTime
)

router.get('/get-suggestions', 
    query('input').isString().isLength({min: 3}),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

module.exports = router;