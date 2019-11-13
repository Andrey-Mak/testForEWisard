const {Router} = require('express');
const router = Router();
const User = require('../models/user');

router.get('/users', async (req, res) =>{
	User.find({}, (err, users) =>{
		if (err) throw err;
		let userMap = {};
		users.forEach((user) =>{
			userMap[user._id] = user;
		});
		res.send(userMap);
	});
});

router.post('/users/:id', async (req, res) =>{
	const user = new User(req.body);

	if(req.params && req.params.id && req.params.id !== 'undefined'){
		User.updateOne({ _id: req.params.id}, user, async (err, res) =>{
			if (err) throw err;
			console.log('user has been edited')
		});
	}else{
		user.save()
			.then(() => console.log('user has been added'))
			.catch((err) => console.log(err))
	}
});

router.delete('/users/:id', async (req, res) =>{
	User.deleteOne({ _id: req.params.id}, function (err) {
		if (err) throw err;
		console.log('user has been deleted')
	});
});

module.exports = router;