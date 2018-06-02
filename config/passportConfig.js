var LocalStrategy = require('passport-local').Strategy;
var RememberMeStrategy = require('passport-remember-me').Strategy;
var User = require('../routes/user/userModel');
var functions = require('../middleware/functions');
var consumeRememberMeToken = functions.consumeRememberMeToken;
var issueToken = functions.issueToken;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
        function (username, password, done) {
            process.nextTick(function () {
                User.getUserByEmail(username, function (err, user) {
                    if (err) { return done(err); };
                    if (!user) {
                        return done(null, false, { message: 'Unknown user' });
                    }
                    User.comparePassword(password, user.password, function (err, isMatch) {
                        if (err) { return done(err); };
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Invalid password' });
                        }
                    });
                });
            });
        }
    ));
    passport.use(new RememberMeStrategy(
        function (token, done) {
            consumeRememberMeToken(token, function (err, uid) {
                if (err) { return done(err); }
                if (!uid) { return done(null, false); }

                User.getUserById(uid, function (err, user) {
                    if (err) { return done(err); }
                    if (!user) { return done(null, false); }
                    return done(null, user);
                });
            });
        },
        issueToken
    ));

};