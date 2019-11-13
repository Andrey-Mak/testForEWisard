const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const usersRouter = require('./routes/users');

const app = express();

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(usersRouter);

app.listen(3000, () => { console.log("The server has been started"); });

async function begin(){
	try{
		await mongoose.connect("mongodb+srv://admin:pass4DB@cluster0-rwgpv.mongodb.net/testForeWizard", {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		const user = new User({
			first_name: "Vasya",
			last_name: "Ivanov",
			phone_number: "123456"
		});
		
		user.save()
			.then(() => console.log('user has been added'))
			.catch((err) => console.log(err))
		
	}catch(err){
		console.warn('begin Error: ', err);
	}
}

begin();
