const { url } = require('inspector')
const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    userid : {type:String, required:true, unique:true},
    name : {type: String, required: false,},
    gender : {type: String, required: false,},
    image : {type: String, required: false,},
    company : {type:String, required: false},
    position : {type:String, required: false},
    website : {type: String, required: false},
})

const profileModel = mongoose.model('Profile', profileSchema);

module.exports = profileModel
