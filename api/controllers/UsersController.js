/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    /**
     * @method registerUserWithEmail
     * @desc This function validates data and creates a new User. 
     * The email has to be unique and the form should have valid data. 
     * The user will be created with status=1 (Pending Email Verification)
     * @param Request name-M, email-M, password-M, country_code, phone and createdBy (M-Mandatory)
     * @param Response
     * @returns Response JSON
     */
    registerUserWithEmail : function(req, res){
        console.log('UsersController.registerUserWithEmail called');
        
        // Validating mandatory data 
        var errors = Users.validateData(req.body)

        if(errors)
            return res.json({
                    status: 400,
                    errors: errors 
                });

        // Validating if email already exists
        Users.isEmailExists(req.body.email).then(function(result){
            if(result)
                return res.json({
                    status: 400,
                    errors: result 
                });

            // Creating user object

            userdata = {
                name: req.body.name,
                email : req.body.email,
                country_code: req.body.country_code,
                phone: req.body.phone,
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
    },

    /**
     * @method registerUserWithPhone
     * @desc This function validates data and creates a new User. 
     * The phone number has to be unique and the form should have valid data. 
     * The user will be created with status=1 (Pending Phone Number Verification)
     * @param Request name-M, email, password-M, country_code-M, phone-M and createdBy where M=Mandatory
     * @param Response
     * @returns Response JSON
     */
    registerUserWithPhone : function(req, res){
        console.log('UsersController.registerUserWithPhone called');
        
        // Validating mandatory data 
        var errors = Users.validateData(req.body)

        if(errors)
            return res.json({
                    status: 400,
                    errors: errors 
                });

        // Validating if phone number already exists
        Users.isPhoneExists(req.body.phone).then(function(result){
            if(result)
                return res.json({
                    status: 400,
                    errors: result 
                });

            // Creating user object

            userdata = {
                name: req.body.name,
                country_code: req.body.country_code,
                phone: req.body.phone,
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

