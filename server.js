const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require("./modules/dbconnect.js");
const user = require("./modules/users.js");
//const auth = require("./modules/authenticate.js");

app.set('port', (process.env.PORT ||8080));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(user);
//app.use(auth);

app.listen(app.get('port'), function(){
	console.log('quizmaster running', app.get('port'));
});
