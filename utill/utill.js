const jwt = require('jsonwebtoken');
const config = require('../config');

const getToken = (user) => {
	return jwt.sign(
		{
			_id: user.id,
			name: user.name,
			email: user.email,
		},
		config.JWT_SECRET,
		{
			expiresIn: '48h',
		}
	);
};

const isAuth = (req, res, next) => {
	const token = req.headers.authorization;
	if (token) {
		const onlyToken = token.slice(7, token.length); //"Bearer dsjbgfiosdhgibiwego"
		jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
			if (err) {
				return res.status(401).json({ message: 'Invalid Token' });
			}
			req.user = decode;
			next();
			return;
		});
	} else {
		return res.status(401).json({ message: 'Token is not supplied' });
	}
};

module.exports = { getToken, isAuth };
