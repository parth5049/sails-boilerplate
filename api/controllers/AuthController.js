/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');
module.exports = {

    /**
     * @method login
     * @desc This function authenticates a user by validating email and password using passport.js
     * @param Request email, password
     * @param Response 200 | 400
     * @returns Response JSON
     */
    login: function(req, res) {
        passport.authenticate('local.email', function(err, user, info){
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

    /**
     * @method loginWithPhone
     * @desc This function authenticates a user by validating phone number and password using passport.js
     * @param Request phone, password
     * @param Response 200 | 400
     * @returns Response JSON
     */
    loginWithPhone: function(req, res){
        passport.authenticate('local.phone', function(err, user, info){
            if((err) || (!user)) {
                return res.json({
                    status: 200,
                    message: info.message,
                    data: user
                });
            }

            // TODO Need to generate auth-token using jwt and store in the database. This token will be used in 
            // subsequent API calls
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

        // TODO Need to remove auth-token in the database so that user cannot call any further APIs
        req.logout();
        res.json({
            status: 200,
            message: 'success'
        });
    }
};

