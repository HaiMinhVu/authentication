const mongoose = require('mongoose');
const crypto = require('crypto');

mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			maxlength: 128
		},
		email: {
			type: String,
			trim: true,
			required: true,
			unique: 64
		},
		hash: String,
		salt: String,
		role: {
			type: Number,
			default: 0
		}
	},
	{ timestamps: true }
);

userSchema.methods = {
	setPassword: function(password){
		this.salt = crypto.randomBytes(16).toString('hex');
		this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
	},	
	validatePassword: function(password){
		var checkingHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`); 
    	return this.hash === checkingHash; 
	}
}

module.exports = mongoose.model('User', userSchema);