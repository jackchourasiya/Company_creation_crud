const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({

    companyname:{
        type:String,unique:true,required:true
    },
    domain:{
        type:String,unique:true,required:true
    },
});

const create = (db) => {
    return mongoose.model('company1',companySchema);
};

module.exports = create;
