var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    score: Number
});

mongoose.model('Userdb', UserSchema);
// Validations
UserSchema.path('name').required(true, 'Name cannot be blank');
