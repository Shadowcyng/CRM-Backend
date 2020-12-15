const express = require('express');
const router = express.Router();
const Event = require('../model/eventModel');
const expressAsyncHandle = require('express-async-handler');
const { isAuth } = require('../utill/utill');
const { validEventData } = require('../utill/validator');

router.post(
	'/',
	isAuth,
	expressAsyncHandle(async (req, res) => {
		const { errors, valid } = validEventData(req.body);
		if (!valid) {
			return res.status(401).json(errors);
		}
		const event = new Event({
			userid: req.user._id,
			title: req.body.title,
			startDate: req.body.startDate,
			endDate: req.body.allDay ? null : req.body.endDate,
			allDay: req.body.allDay,
			resource: req.body.resource,
			description: req.body.description,
		});
		const newEvent = await event.save();
		if (newEvent) {
			return res.status(200).json({
				id: newEvent.id,
				userid: newEvent.userid,
				userId: newEvent.userid,
				startDate: newEvent.startDate,
				endDate: newEvent.endDate,
				allDay: newEvent.allDay,
				resource: newEvent.resource,
				description: newEvent.description,
			});
		} else {
			return res.status(401).json('Something went wrong');
		}
	})
);

//get All Events of a user
router.get(
	'/',
	isAuth,
	expressAsyncHandle(async (req, res) => {
		const userid = req.user._id;
		const items = await Event.find({ userid: userid });
		let events = [];
		if (items) {
			items.forEach((event) => {
				events.push({
					id: event.id,
					title: event.title,
					startDate: event.startDate,
					endDate: event.endDate
						? event.endDate
						: new Date(event.startDate + 1),
					allDay: event.allDay,
					resource: event.resource,
					description: event.description,
				});
			});
			console.log('events', events);
			return res.status(200).json(events);
		} else {
			return res.status(404).json({ error: 'Something went wrong' });
		}
	})
);
router.get(
	'/:id',
	isAuth,
	expressAsyncHandle(async (req, res) => {
		const userid = req.user._id;
		const eventid = req.params.id;
		try {
			const event = await Event.findById(eventid);
			if (event) {
				if (event.userid != req.user._id) {
					return res.status(401).json({ error: 'Unauthorized' });
				}
				return res.status(200).json({ event });
			} else {
				return res.status(404).json({ error: 'Event not found' });
			}
		} catch (error) {
			return res.status(501).json({ error: error });
		}
	})
);

router.put(
	'/:id',
	isAuth,
	expressAsyncHandle(async (req, res) => {
		const userid = req.user._id;
		const eventid = req.params.id;
		const { errors, valid } = validEventData(req.body);
		if (!valid) return res.status(401).json(errors);
		try {
			const event = await Event.findById(eventid);
			if (event) {
				event.id = event.id;
				event.userid = event.userid;
				event.title = req.body.title ? req.body.title : event.title;
				event.startDate = req.body.startDate
					? req.body.startDate
					: event.startDate;
				event.endDate = req.body.allDay
					? null
					: req.body.endDate
					? req.body.endDate
					: event.endDate;
				event.allDay = req.body.allDay;
				event.resource = req.body.resource ? req.body.resource : event.resource;
				event.description = req.body.description
					? req.body.description
					: event.description;

				const updatedEvent = await event.save();
				if (updatedEvent) {
					return res.status(200).json(event);
				} else {
					return res.status(501).json({ error: 'Something went wrong' });
				}
			}
			res.status(404).json({ error: 'event not found' });
		} catch (error) {
			return res.status(501).json({ error: error });
		}
	})
);

router.delete(
	'/:id',
	isAuth,
	expressAsyncHandle(async (req, res) => {
		const eventid = req.params.id;
		const userid = req.user._id;
		try {
			const event = await Event.findById(eventid);
			if (event) {
				if (event.userid != userid) {
					return res.status(401).json({ error: 'Unauthorized' });
				}
				const deletedEvent = await Event.findByIdAndDelete(eventid);
				return res
					.status(200)
					.json({ message: `event with title ${event.name} has been deleted` });
			}
			return res.status(404).json({ error: 'event not found' });
		} catch (error) {
			return res.status(501).json({ error: error });
		}
	})
);

module.exports = router;
