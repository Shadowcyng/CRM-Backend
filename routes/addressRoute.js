const express = require('express')
const Address = require('../model/addressModel');
const router = express.Router();
const expressAsyncHandle = require('express-async-handler');

router.post('/', expressAsyncHandle(async(req, res)=>{
    const address = new Address( {
        userid : req.body.userid,
        addressLine1 : req.body.addressLine1,
         addressLine2 : req.body.addressLine2,
         city :req.body.city,
         state :req.body.state,
         country : req.body.country,
         postalCode : req.body.postalCode,
    })
    const newAddress = await address.save();
     if(newAddress){
        return res.status(200).json({
            id : newAddress.id,
            userid : req.body.userid,
            addressLine1 : req.body.addressLine1,
            addressLine2 : req.body.addressLine2,
            city :req.body.city,
            state :req.body.state,
            country : req.body.country,
            postalCode : req.body.postalCode,
        })
    }else{
        return res.status(501).json('something went wrong')
    }
}))


router.get('/:id', expressAsyncHandle(async(req,res)=>{
    var addressId = req.params.id;
    try{
        const address = await Address.findById(addressId);
        if(address){
            return res.status(200).json(address)
        }else{
            return res.status(404).json({error: 'Address Not found'})
        }
    }catch(err){
        return res.status(500).json({error: err.message});
    }
}))

router.put('/:id', expressAsyncHandle(async(req,res)=>{
    var addressId = req.params.id;
    const address = await Address.findById(addressId);
    try{
        if(address){
            address.id = address.id
            address.userid = address.userid
            address.addressLine1 = req.body.addressLine1 ? req.body.addressLine1 : address.addressLine1
            address.addressLine2 = req.body.addressLine2 ? req.body.addressLine2 : profiile.addressLine2
            address.city = req.body.city ? req.body.city : address.city
            address.state = req.body.state ? req.body.state : address.state
            address.country = req.body.country ? req.body.country : address.country
            address.postalCode = req.body.postalCode ? req.body.postalCode : address.postalCode

            const updatedAddress = await address.save();
            if(updatedAddress){
                return res.status(200).json({
                    id : updatedAddress.id,
                    userid :updatedAddress.userid,
                    addressLine1 : updatedAddress.addressLine1,
                    addressLine2 : updatedAddress.addressLine2,
                    city : updatedAddress.city,
                    state : updatedAddress.state,
                    country : updatedAddress.country,
                    postalCode : updatedAddress.postalCode,
                })
            }else{
                return res.status(500).json({error: 'Something went Wrong'});
            }
        }else{
            return res.status(404).json({error: 'Address not found'});

        }

    }catch(err){
        return res.status(500).json({error: 'err.message'});
    }
}))

module.exports = router