const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(400).json({message:'authorization header missing', success:false})
    }

    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(400).json({message:'token is not valid', success:false})
    }

    try{
        const decode = jwt.verify(token,'sourabh');
        req.id = decode.id;
        next();
    }catch(err){
        return res.status(400).json({message:'internal server error', success:false})
    }
}