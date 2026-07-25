const mongose = require('mongoose');


function connectToDb() {
    mongose.connect(process.env.DB_CONNECT).then(()=>{
        console.log('Connected to db');
    }).catch(err => {
        console.log(err);
    });
}

module.exports = connectToDb;