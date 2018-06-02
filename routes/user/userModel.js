var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');
var sanitizerPlugin = require('mongoose-sanitizer');

var UserSchema = mongoose.Schema({
	role: {
		type: String,
		default: 'admin'
	},
	fullname: {
		type: String
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String
	}
});

UserSchema.plugin(sanitizerPlugin);

UserSchema.pre('save', function(next) {
	var user = this;
	if (!this.isModified('password')) return next();
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		});
	});
});

var User = module.exports = mongoose.model('User', UserSchema);


/*var User = new User({
	role: 'admin',
	fullname: 'Armana Imsirevic',
	email: 'admin@remotio.com',
	password: 'dscpkn2010'
});

User.save(function(err, savedUser){
	if (err) throw err; //duplicate entry for email
	console.log(savedUser);
});*/

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	var query = {_id: id};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch){
		if (err) throw err;
		callback(null, isMatch);
	});	
}