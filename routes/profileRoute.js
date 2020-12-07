const express = require('express');
const Profile = require('../model/profileModel');
const { isAuth } = require('../utill/utill');
const router = express.Router();
const expressAsyncHandle = require('express-async-handler');

router.post(
	'/',
	isAuth,
	expressAsyncHandle(async (req, res) => {
		const profile = new Profile({
			userid: req.body.userid,
			name: req.body.name,
			gender: req.body.gender,
			image: req.body.image,
			company: req.body.company,
			position: req.body.position,
			website: req.body.website,
		});
		const newProfile = await profile.save();
		if (newProfile) {
			return res.status(200).json({
				id: newProfile.id,
				user_id: newProfile.userid,
				name: newProfile.name,
				gender: newProfile.gender,
				image: newProfile.image,
				company: newProfile.company,
				position: newProfile.position,
				website: newProfile.website,
			});
		} else {
			return res.status(501).json('something went wrong');
		}
	})
);

router.get(
	'/:id',
	isAuth,
	expressAsyncHandle(async (req, res) => {
		var profileId = req.params.id;
		try {
			const profile = await Profile.findById(profileId);
			if (profile) {
				return res.status(200).json(profile);
			} else {
				return res.status(404).json({ error: 'Profile Not found' });
			}
		} catch (err) {
			return res.status(500).json({ error: err, message: 'err.message' });
		}
	})
);

router.put(
	'/:id',
	isAuth,
	expressAsyncHandle(async (req, res) => {
		var profileId = req.params.id;
		const profile = await Profile.findById(profileId);
		try {
			if (profile) {
				profile.id = profile.id;
				profile.userid = profile.userid;
				profile.name = req.body.name ? req.body.name : profile.name;
				profile.gender = req.body.gender ? req.body.gender : profiile.gender;
				profile.image = req.body.image ? req.body.image : profile.image;
				profile.company = req.body.company ? req.body.company : profile.company;
				profile.position = req.body.position
					? req.body.position
					: profile.position;
				profile.website = req.body.website ? req.body.website : profile.website;

				const updatedProfile = await profile.save();
				if (updatedProfile) {
					console.log('updatedProfile', updatedProfile);
					return res.status(200).json({
						id: updatedProfile.id,
						userid: updatedProfile.userid,
						name: updatedProfile.name,
						gender: updatedProfile.gender,
						image: updatedProfile.image,
						company: updatedProfile.company,
						position: updatedProfile.position,
						website: updatedProfile.website,
					});
				} else {
					return res.status(500).json({ error: 'Something went Wrong' });
				}
			} else {
				return res.status(404).json({ error: 'Profile not found' });
			}
		} catch (err) {
			return res.status(500).json({ error: 'err.message' });
		}
	})
);

module.exports = router;
