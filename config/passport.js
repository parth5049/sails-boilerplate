const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy,
      bcrypt = require('bcrypt-nodejs');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb){
  Users.findOne({id}, function(err, user) {
    cb(err, user);
  });
});

const localStrategyWithEmail = new LocalStrategy({
    usernameField: 'email',
    passportField: 'password'
}, 
function(email, password, cb){

    Users.findOne({email: email}, function(err, user){
        if(err) return cb(err);
        if(!user) return cb(null, false, {message: 'Username not found'});

        bcrypt.compare(password, user.password, function(err, res){
            if(!res) return cb(null, false, { message: 'Invalid Password' });

            let userDetails = {
                    email: user.email,
                    name: user.name,
                    id: user.id
                };

            return cb(null, userDetails, { message: 'Login Succesful'});
        });
    });
});

const localStrategyWithPhone = new LocalStrategy({
    usernameField: 'phone',
    passportField: 'password'
}, 
function(phone, password, cb){

    Users.findOne({phone: phone}, function(err, user){
        if(err) return cb(err);
        if(!user) return cb(null, false, {message: 'Phone number not found'});

        bcrypt.compare(password, user.password, function(err, res){
            if(!res) return cb(null, false, { message: 'Invalid Password' });

            let userDetails = {
                    email: user.email,
                    phone: user.phone,
                    country_code: user.country_code,
                    name: user.name,
                    id: user.id,
                    last_login: user.last_login_time
                };

            return cb(null, userDetails, { message: 'Login Succesful'});
        });
    });
});



passport.use('local.email', localStrategyWithEmail);
passport.use('local.phone', localStrategyWithPhone);

/* passport.use(new LocalStrategy({
        usernameField: 'email',
        passportField: 'password'
    }, 
    function(email, password, cb){

        Users.findOne({email: email}, function(err, user){
            if(err) return cb(err);
            if(!user) return cb(null, false, {message: 'Username not found'});

            bcrypt.compare(password, user.password, function(err, res){
                if(!res) return cb(null, false, { message: 'Invalid Password' });

                let userDetails = {
                        email: user.email,
                        name: user.name,
                        id: user.id
                    };

                return cb(null, userDetails, { message: 'Login Succesful'});
            });
        });
    })
); */