const { Schema, model } = require('mongoose');

const userSchema = new Schema({
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	phone_number: {
		type: String
	},
	favorite: {
		type: Boolean,
		default: false
	}
});

module.exports = model('User', userSchema);