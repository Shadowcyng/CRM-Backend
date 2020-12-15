const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userid : {type:String, required:true, unique:true},
   addressLine1 : {type:String, required:false, },
    addressLine2 : {type: String, required: false,},
    city : {type: String, required: false,},
    state : {type: String, required: false,},
    country : {type:String, required: false},
    postalCode : {type:Number, required: false},
})

const addressModel = mongoose.model('Address', addressSchema);

module.exports = addressModel
