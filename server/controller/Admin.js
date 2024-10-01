const Admin             = require('../models/Admin');
const validator         = require('validator')
const jwt               = require('jsonwebtoken');
const bcrypt            = require('bcrypt');

exports.adminLogin =  async (req,res) => {

   const {adminEmail,password} = req.body.user;
      console.log('req.body-',req.body);

   if(!adminEmail || !password){
        return res.status(400).json({message:'All info are required',success:false})
   }

   if(!validator.isEmail(adminEmail)){
        return res.status(400).json({message:'Email is not valid',success:false})
   }

     if(password.length < 8 ){
          return res.status(400).json({message:'password length is minimum 8',success:false}) 
     }

   try{
     const admin = await Admin.findOne({adminEmail});
     if(!admin){
        return res.status(400).json({message:'invalid credential',success:false}) 
     }

     if (password !== admin.password) {
          return res.status(400).json({ message: 'Invalid credentials', success: false });
     }

    console.log('admin-',admin)
    const tokenobj = {
        id : admin._id
    };

    const token = jwt.sign(tokenobj,'sourabh',{
        expiresIn:'1h'
    });

    return res.status(200).json({message:'login succesfull',success:true, token:token})

   }catch(err){
        return res.status(400).json({message:'internal server error',success:false})   
   }
}