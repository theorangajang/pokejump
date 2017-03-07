var users = require('./../controllers/users.js');
module.exports = function(app){
	//get the single user infomation
	app.get('/user/:id', function(req, res){
		console.log('made it to my /user/:id get route');
		users.getUser(req, res)
	});
	//add user route
	app.post('/users', function(req, res){
		console.log('made it to my /users post route');
		users.createUser(req, res);
	});
	//update user score
	app.post('/user/:id/update', function(req, res){
		console.log("made it to my /user/:id/update post route");
		users.updateUser(req, res);
	});
	//get the top ten players
	app.get('/user', function(req, res){
		console.log('made it to my /user get route');
		users.getTopUser(req, res);
	})

}
