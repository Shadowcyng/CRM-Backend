var express = require('express');
const config = require('./config');
const mongoose  = require('mongoose');
const dotenv  = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors');
const userRoute = require('./routes/userRoute')
const profileRoute = require('./routes/profileRoute')
const addressRoute = require('./routes/addressRoute')

var app = express();
app.use(cors())
app.use(bodyParser.json())

const mongodburl  = config.MONGODB_URL;

mongoose.connect(mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(res=> console.log('res', res)).catch(err=>console.log('error', err))


app.use('/api/user/', userRoute);
app.use('/api/profile/', profileRoute);
app.use('/api/address/', addressRoute);
app.get('/', function(req, res){
   res.send("Helloooooooooooooooooo");
});


app.listen(5000,  ()=> console.log('server Started at localhost 5000'));
