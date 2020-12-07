const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    userid : {type:String, required:true, unique:true},
   addressLine1 : {type:String, required:true, },
    addressLine2 : {type: String, required: false,},
    city : {type: String, required: true,},
    state : {type: String, required: true,},
    country : {type:String, required: true},
    postalCode : {type:Number, required: true},
})

const addressModel = mongoose.model('Address', addressSchema);

module.exports = addressModel
