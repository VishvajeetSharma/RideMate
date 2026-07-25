const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const BlacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullname, email, password } = req.body;
    const isUserAlreadyExist = await userModel.findOne({
        email
    });
    if (isUserAlreadyExist) {
        return res.status(400).json({message: 'User already exists'});
    }
    const hashPassword = await userModel.hashPassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ // Changed to 404 (Not Found)
            code: 401,
            message: 'Invalid Email or Password'
        });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return res.status(401).json({ // Changed to 401 (Unauthorized)
            code: 401,
            message: 'Invalid Email or Password'
        });
    }

    // If user account is blocked, return a response and prevent further execution
    if (user.isBlock) {
        return res.status(403).json({ // Changed to 403 (Forbidden)
            code: 403,
            message: "Your Account is Blocked",
            data: {}
        });
    }

    // Generate token and send response if the user is not blocked
    const token = user.generateAuthToken();
    res.cookie('token', token, { httpOnly: true }); // You may want to set httpOnly flag for security
    return res.status(200).json({ // Changed to 200 (OK)
        code: 200,
        message: 'Login Successful',
        token,
        user
    });
};


module.exports.getUserProfile = async (req, res, next)=>{
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    await BlacklistTokenModel.create({token});
    res.status(200).json({message: 'Logged Out'});
}