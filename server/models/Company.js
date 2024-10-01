const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    companyname:{type:String,unique:true,required:true},
    domain:{type:String,unique:true,required:true},
});

module.exports = mongoose.model('company',companySchema);
