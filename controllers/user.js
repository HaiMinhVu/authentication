const User = require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');

const options = {
	new: true
}

exports.create = (req, res) => {
	const user = new User(req.body);
	user.setPassword(req.body.password);
	user.save((err, user) => {
		if(!user || err){
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json(user);
	});
}

exports.findAll = (req, res) => {
	User.find((err, users) => {
		if(!users || err){
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json(users);
	});
}

exports.findOne = (req, res) => {
	User.findById(req.params.id, (err, user) => {
		if(!user || err){
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		user.hash = undefined;
		user.salt = undefined;
		res.json(user);
	});
}

exports.update = (req, res) => {
	User.findById(req.params.id, function (err, user) {
  		if(!user || err){
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
  		user.name = req.body.name;
  		user.email = req.body.email;
  		if(req.body.password !== ''){
  			user.setPassword(req.body.password);
  		}
  		user.save((err, updatedUser) => {
			if(!updatedUser || err){
				return res.status(400).json({
					error: errorHandler(err)
				});
			}
			updatedUser.hash = undefined;
			updatedUser.salt = undefined;
			res.json(updatedUser);
		});
	});
}

exports.deleteOne = async (req, res) => {
	User.findByIdAndRemove(req.params.id, (err, user) => {
		if(!user || err){
			return res.status(400).json({
				error: errorHandler(err)
			});
		}
		res.json(user);
	});
}
