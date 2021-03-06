const isEmpty = (text) => {
	return text.trim() === '' ? true : false;
};

const isEmail = (email) => {
	const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(emailRegEx)) return true;
	else return false;
};

exports.validRegisterData = (user) => {
	let errors = {};
	if (isEmpty(user.name)) {
		errors.name = 'Name must not be empty';
	}

	if (isEmpty(user.email)) {
		errors.email = 'email must not be empty';
	} else if (!isEmail(user.email)) {
		errors.email = 'enter a valid email';
	}
	if (isEmpty(user.password)) errors.password = 'Password must not be empty';
	if (user.password !== user.confirmPassword)
		errors.confirmPassword = 'Password did not match';

	return {
		errors: errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

exports.validSigninData = (user) => {
	let errors = {};
	if (isEmpty(user.email)) {
		errors.email = 'email must not be empty';
	} else if (!isEmail(user.email)) {
		errors.email = 'enter a valid email';
	}
	if (isEmpty(user.password)) errors.password = 'Password must not be empty';
	return {
		errors: errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};
exports.validEventData = (eventData) => {
	let errors = {};
	if (isEmpty(eventData.title)) {
		errors.title = 'tltle must not be empty';
	}
	if (isEmpty(eventData.startDate)) {
		errors.startDate = 'Start Date must not be empty';
	} else {
		if (new Date(eventData.startDate).getDate() < new Date().getDate()) {
			errors.startDate = 'You can not create a event in previous date';
		}
	}
	if (isEmpty(eventData.endDate) && !eventData.allDay)
		errors.endDate = 'End Date must not be empty if not all Day event';
	if (!isEmpty(eventData.startDate) && !isEmpty(eventData.endDate)) {
		if (eventData.endDate < eventData.startDate) {
			errors.endDate = 'End Date can not be less than start Date';
		}
	}
	return {
		errors: errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};
