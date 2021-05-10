const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
	const user = new User(req.body);
	user.setPassword(req.body.password);
	user.save((err, user) => {
		if(err){
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		user.hash = undefined;
		user.salt = undefined;
		res.json(user);
	});
};

exports.signin = (req, res) => {

	const { email, password } = req.body;
	User.findOne({email}, (err, user) => {
		if(err || !user){
			return res.status(400).json({
				error: "User not exist"
			});
		}
		if(!user.validatePassword(password)){
			return res.status(400).json({
				error: "Wrong password"
			});
		}

		const token = jwt.sign({ 
			userId: user._id,
			name: user.name,
			// email: user.email,
			role: user.role,
			isAdmin: user.isAdmin,
			departments: user.departments
		}, process.env.JWT_SECRET, { expiresIn: '8h' });
		return res.json(token);
	});
};

exports.signout = (req, res) => {
	res.json({ message: "Signed out" });
};

exports.authenticateToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null){
		return res.status(401).json({
			error: 'Unauthorized'
		});
	} 
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
	    if(err){
	    	return res.status(403).json({
				error: "You don'nt have permission to access this page"
			})
	    }
		// req.user = user;
	    next()
	});
}
