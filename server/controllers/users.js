var mongoose = require('mongoose');
var User = mongoose.model('Userdb');

module.exports = (function() {
	return {
		getUser: function(req, res){
			User.find({_id: req.params.id}, function(err, result){
				if(err){
					console.log('this is the error you are looking for', err);
				}else{
					console.log('this is our user', result);
					res.json(result);
				}
			})
		},
		createUser: function(req, res){
			user = new User(req.body);
			user.save(function(err, result){
				if(err){
					console.log(err);
				}else{
					res.json(result);
				}
			})
		},
		updateUser: function(req, res){
			User.findOne({_id: req.params.id}, function(err, result){
				if(err){
					console.log('couldnt save update user', err);
				}else{
					console.log(req.body);
					result.score = req.body.score;
					result.save(function(err, result){
						if(err){
							console.log('couldnt save update user', err);
						}else{
							console.log('found mongoose', result);
							res.json(result);
						}
					})
				}
			})
		},
		getTopUser: function(req, res){
			User.find().sort({score: -1}).limit(10).exec(function(err, players){
				if(err){
					console.log('couldnt get top players', err);
				}else{
					res.json(players);
				}
			})
		}
	}
})();
