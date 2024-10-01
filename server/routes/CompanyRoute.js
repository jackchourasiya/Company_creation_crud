const express                   = require('express');
const route                     = express.Router();
const {addcompany,getCompany,getCompanyByid,editcompany,deletecompany}   = require('../controller/Company')
const auth                      = require('../middleware/AuthVerify');

route.post('/addcompany',auth,addcompany);
route.get('/getcompany', auth, getCompany);
route.get('/getcompany/:id', auth, getCompanyByid);
route.put('/editcompany/:id', auth, editcompany);
route.delete('/deletecompany/:id', auth, deletecompany);

module.exports = route;
