const express = require('express');
const adminRoute = express.Router();  //Extract router from express
const { adminTable } = require('../models/admin.model');
const userTable = require('../models/user.model');
const captainTable = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');

adminRoute.post('/register', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Store data
    const data = new adminTable({ name, email, password });
    const result = await data.save();

    //send respose in json
    res.json({
        code: 200,
        data: result
    });
});

// Login
adminRoute.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await adminTable.findOne({ email, password })
    if (result) {
        res.json({
            code: 200,
            message: 'Login Successfull',
            data: result
        })
    }
    else {
        res.json({
            code: 404,
            message: 'Invalid Email or Password',
            data: []
        })
    }
});

// Users List
adminRoute.get('/userslist', async (req, res) => {
    try {
        const result = await userTable.find();
        // console.log(result);
        
        res.json({
            code: 200,
            message: 'Data Found',
            data: result
        })
    } catch (error) {
        // console.log(error);
        
        res.json({
            code: 404,
            message: error
        })
    }
})

// Captainss List
adminRoute.get('/captainslist', async (req, res) => {
    try {
        const result = await captainTable.find();
        res.json({
            code: 200,
            message: 'Data Found',
            data: result
        })
    } catch (error) {
        res.json({
            code: 404,
            message: error
        })
    }
})

//user block
adminRoute.put('/userblock/:_id',async(req, res)=>{
    const _id = req.params._id;
    const status = req.body.status;
    const result = await userTable.findByIdAndUpdate({_id:_id},
        {$set:{isBlock: status}},
        {new: true})
        res.json({
            code: 200,
            message: "Updated Successfully",
            data: result
        })
})

// captain block

adminRoute.put('/captainblock/:_id',async(req, res)=>{
    const _id = req.params._id;
    const status = req.body.status;
    const result = await captainTable.findByIdAndUpdate({_id:_id},
        {$set:{isBlock: status}},
        {new: true})
        res.json({
            code: 200,
            message: "Updated Successfully",
            data: result
        })
})

adminRoute.get('/logout', async (req, res) => {
    res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        // await blacklistTokenModel.create({token});
        res.status(200).json({message: 'Logged Out'});
})
module.exports = adminRoute;