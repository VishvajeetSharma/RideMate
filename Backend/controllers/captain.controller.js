const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password, vehicle } = req.body;
    const isCaptainAlreadyExist = await captainModel.findOne({ email });
    if (isCaptainAlreadyExist) {
        return res.status(400).json({ error: 'Captain already exists' });
    }

    const hashPassword = await captainModel.hashPassword(password);
    try {
        const captain = await captainService.createCaptain({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        });
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        res.status(201).json({ captain });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports.loginCaptain = async (req, res, next) => {
    const { email, password } = req.body;
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            code: 400,
            message: 'Validation failed',
            errors: errors.array()
        });
    }

    // Find captain by email and include password field
    const captain = await captainModel.findOne({ email }).select('+password');
    
    if (!captain) {
        return res.status(401).json({
            code: 401,
            message: 'Invalid Email or Password'
        });
    }

    // Check if the password matches
    const isMatch = await captain.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ // Changed to 401 (Unauthorized)
            code: 401,
            message: 'Invalid Email or Password'
        });
    }

    if (captain.isBlock) {
        return res.status(403).json({
            code: 403,
            message: 'Your Account is Blocked',
            data: {}
        });
    }

    // Generate token and send response if the captain is not blocked
    const token = captain.generateAuthToken();
    res.cookie('token', token);

    return res.status(200).json({
        code: 200,
        message: 'Login Successful',
        token,
        captain
    });
}


module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    await blacklistTokenModel.create({token});
    res.clearCookie('token');
    res.status(200).json({message: 'Logout Successfully'});
}