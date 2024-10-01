// const connectdatabase  = require('../config');
// const connection = {};

// const getTanantconnection = (dbname)=>{
//     if(!connection[dbname]){
//         connection[dbname] = connectdatabase(dbname);
//     }
//     return connections[dbname];
// };

// module.exports = {getTanantconnection};


// // const connectdatabase  = require('../config');

const mongoose = require('mongoose');
const connections = {};

const getTanantconnection = (dbname,url)=>{
    if(!connections[dbname]){
        return connections[dbname];
    }

    const connection = mongoose.createConnection(url).then(()=>console.log('yes')).catch((err)=>console.log('not'));
    
    connections[dbname]  = connection;
    console.log('call')
    return connection;
};

module.exports = getTanantconnection;