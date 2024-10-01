const mongoose = require('mongoose');

const connectdatabase = (dbname) => {
    const dburl = `mongodb://localhost:27017/${dbname}`
    return mongoose.connect((dburl),{
        useNeUrlParser:true,
    });
}


module.exports = connectdatabase;