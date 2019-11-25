const {Router} = require('express');
const router = Router();
const User = require('../models/user');

router.get('/search', async (req, res) =>{
	User.aggregate([{
			$match: {
				$or: [
					{first_name: {$regex: `${req.query.search}`, $options: 'i'}},
					{last_name: {$regex: `${req.query.search}`, $options: 'i'}},
					{phone_number: {$regex: `${req.query.search}`, $options: 'i'}}
				]
			}
		}
	], (err, users) =>{
		if(err) throw err;
		console.log(users);
		res.status(200).send(users);
	});
});

router.get('/', async (req, res) =>{
	User.find({}, (err, users) =>{
		if(err) throw err;
		res.status(200).send(users);
	});
});

router.post('/', async (req, res) =>{
	const user = new User(req.body);
	user.save()
		.then(() =>{
			console.log('user has been added');
			res.status(201).send(user);
		})
		.catch((err) =>{
			res.status(500);
			console.log(err);
		})
});

router.put('/:id', async (req, res) =>{
	const user = new User(req.body);
	User.updateOne({_id: req.params.id}, user)
		.then(() =>{
			res.status(200).send(user);
			console.log(`user ${user.first_name} has been edited`)
		})
		.catch((err) =>{
			res.status(500);
			console.log(err);
		})
});

router.delete('/:id', async (req, res) =>{
	try{
		const id = req.params.id;
		User.deleteOne({_id: id})
			.then(() =>{
				res.status(200).send(id);
				console.log(`user has been deleted`)
			})
			.catch((err) =>{
				res.status(500);
				console.log(err);
			})
	}catch(err){
		console.log(err);
	}
});

module.exports = router;