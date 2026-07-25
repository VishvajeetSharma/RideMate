const mongoose = require('mongoose');

//Create Schema
const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const adminTable = mongoose.model('admin', adminSchema);

module.exports = { adminTable };