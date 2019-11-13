const {Router} = require('express');
const router = Router();
const User = require('../models/user');

router.get('/users', async (req, res) =>{
	User.find({}, (err, users) =>{
		let userMap = {};
		users.forEach((user) =>{
			userMap[user._id] = user;
		});
		res.send(userMap);
	});
});



module.exports = router;