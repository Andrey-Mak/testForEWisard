const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');

const usersRouter = require('./routes/users');

const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
app.use(express.urlencoded());
app.use(express.json());
app.use(usersRouter);

app.listen(config.port, () => { console.log("The server has been started"); });

async function begin(){
	try{
		await mongoose.connect(`mongodb+srv://admin:${config.mongo.pass}@cluster0-rwgpv.mongodb.net/testForeWizard`, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	}catch(err){
		console.warn('begin Error: ', err);
	}
}

begin();
