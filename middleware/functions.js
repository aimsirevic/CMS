const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
var tokens = {};

module.exports.ensureAuthenticated = function(req, res, next){
	if (req.isAuthenticated()) {
		return next();
	}else{
		res.redirect('./login');
	}
}
module.exports.ensureNotLoggedIn = function(req, res, next){
	if (req.isAuthenticated()) {
		res.redirect('./');
	}else{
		return next();
	}
}
module.exports.randomString = function (len) {
    var buf = []
        , chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        , charlen = chars.length;

    for (var i = 0; i < len; ++i) {
        buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join('');
};

module.exports.consumeRememberMeToken = function (token, fn) {
    var uid = tokens[token];
    delete tokens[token];
    return fn(null, uid);
}
module.exports.issueToken = function (user, done) {
    var token = module.exports.randomString(64);
    saveRememberMeToken(token, user.id, function (err) {
        if (err) { return done(err); }
        return done(null, token);
    });
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function saveRememberMeToken (token, uid, fn) {
    tokens[token] = uid;
    return fn();
}

//form validations "ADD PAGE FORM"



