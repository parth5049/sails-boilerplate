/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
module.exports = {

login: function(req, res) {
    passport.authenticate('local', function(err, user, info){
      if((err) || (!user)) {
        return res.json({
            status: 200,
            message: info.message,
            data: user
        });
      }

    req.logIn(user, function(err) {
            if(err) res.json({
                status: 400,
                error: err
            });
            
            return res.json({
                status: 200,
                message: info.message,
                data: user
            });
        });
        })(req, res);
    },

    logout: function(req, res) {
        req.logout();
        res.json({
            status: 200,
            message: 'success'
        });
    }
};

