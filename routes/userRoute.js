const express = require('express');
const User = require('../model/userModel');
const Profile = require('../model/profileModel');
const Address = require('../model/addressModel');
const router = express.Router();
const expressAsyncHandle = require('express-async-handler');
const { getToken, isAuth } = require('../utill/utill');
const { validRegisterData, validSigninData } = require('../utill/validator');

const bcrypt = require('bcrypt');
const saltRounds = 10;
const someOtherPlaintextPassword = 'not_bacon';

router.post(
	'/signup',
	expressAsyncHandle(async (req, res) => {
		const { valid, errors } = validRegisterData(req.body);
		if (!valid) return res.status(401).json(errors);

		const existUser = await User.findOne({ email: req.body.email });
		if (existUser) {
			errors.message = 'User already exists';
			return res.status(401).json(errors);
		}
		const password = bcrypt.hashSync(req.body.password, saltRounds);
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: password,
		});
		const newUser = await user.save();
		if (newUser) {
			const profile = new Profile({
				userid: newUser.id,
				name: req.body.name,
				gender: '',
				image: 'https://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
				company: '',
				position: '',
				website: '',
			});
			const newProfile = await profile.save();
			if (newProfile) {
				const address = new Address({
					userid: newUser.id,
					addressLine1: '',
					addressLine2: '',
					city: '',
					state: '',
					country: '',
					postalCode: '',
				});
				const newAddress = await address.save();
				if (newAddress) {
					return res.json({
						_id: newUser.id,
						profileid: newProfile.id,
						addressid: newAddress.id,
						name: newUser.name,
						email: newUser.email,
						token: getToken(newUser),
					});
				}
			}
		} else {
			return res.status(401).json({ message: 'Invalid User Data' });
		}
	})
);

// Sign in

router.post(
	'/login',
	expressAsyncHandle(async (req, res, next) => {
		const user = req.body;
		const { errors, valid } = validSigninData(req.body);
		if (!valid) return res.status(401).json(errors);
		const signinUser = await User.findOne({
			email: req.body.email,
		});
		if (signinUser) {
			const validPassword = bcrypt.compareSync(
				req.body.password,
				signinUser.password
			);
			if (validPassword) {
				return res.status(200).json({
					id: signinUser.id,
					name: signinUser.name,
					email: signinUser.email,
					token: getToken(signinUser),
				});
			} else {
				errors.message = 'Invalid Email or Password';
				return res.status(404).json(errors);
			}
		} else {
			errors.message = 'User not found. Please Signup';
			return res.status(404).json(errors);
		}
	})
);

module.exports = router;
