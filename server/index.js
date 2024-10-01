const express       = require('express');
const app           = express();
const cors          = require('cors');
const methodoverride = require('method-override');
const mongoose      = require('mongoose');
const companyroute  = require('./routes/CompanyRoute');
const Adminroute    = require('./routes/AdminRoute');

const getTanantconnection = require('./services/tenanatservice');
const create              = require('./services/dynamicmodels');
require('dotenv').config();

require('dotenv').config();
app.set('view engine','ejs');

const dburl         = process.env.DB_URL;
mongoose.connect(dburl).then(()=>{

    console.log('connected main db')
}).catch((err)=>{
    console.log('not connected')
});

app.use(cors());
app.use(express.json());
app.use(methodoverride('_method'));

app.use(Adminroute);
app.use(companyroute)

app.listen((5000),()=>{
    console.log('port running')
})

