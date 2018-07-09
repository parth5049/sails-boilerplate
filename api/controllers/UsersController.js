/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    registerUserWithEmail : function(req, res){
        console.log('UsersController.registerUser called');
      // Validating data 
      var errors = Users.validateData(req.body)

      if(errors)
        return res.json({
                status: 400,
                errors: errors 
              });

      // Validating email
      Users.isEmailExists(req.body.email).then(function(result){
        if(result)
            return res.json({
                status: 400,
                errors: result 
            });

        console.log('Creating new user');

        userdata ={
            name: req.body.name,
            email : req.body.email,
            password : req.body.password,
            createdBy : req.body.createdBy,
            status : 1
        }

        Users.createUser(userdata).then((user)=>{

            // Send Email or OTP for Verification
            
            return res.json({
                status:200,
                data:user
            });
        });
      });  
    }

};

