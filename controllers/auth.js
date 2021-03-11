const User = require('../models/user');
const jwt = require('jsonwebtoken');

function uniqueMessage(error) {
    let output;
    try {
        let fieldName = error.message.substring(
            error.message.lastIndexOf(".$") + 2,
            error.message.lastIndexOf("_1")
        );
        output =
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1) +
            " already exists";
    } catch (ex) {
        output = "Unique field already exists";
    }
 
    return output;
};

function errorHandler(error){
    let message = "";
 
    if (error.code) {
        switch (error.code) {
            case 11000:
            case 11001:
                message = uniqueMessage(error);
                break;
            default:
                message = "Something went wrong";
        }
    } else {
        for (let errorName in error.errors) {

            if (error.errors[errorName].message)
                message = error.errors[errorName].message;
        }
    }
    return message;
};

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
			email: user.email,
			role: user.role
		}, process.env.JWT_SECRET, { expiresIn: '8h' });
		return res.json(token);
	});
};

exports.signout = (req, res) => {
	res.json({ message: "Signed out" });
};
