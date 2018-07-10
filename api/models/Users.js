/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    
    name:{
      type:'string'
    },
    email:{
      type:'string', 
      isEmail:true,
    },
    phone:{
      type:'string',
      // unique:true,
      allowNull:true
    },
    country_code:{
        type:'number'
    },
    last_login_time:{
      type:'number'   
    }, 
    password:{
        type:'string',
        maxLength:256
    },
    facebook_id:{
        type:'string',
        allowNull:true
    },
    instagram_id:{
        type:'string',
        allowNull:true
    },
    status:{
        type:'number',
        required:true,
        min:0,
        max:20
    }, 
    /*
      Following status can be possible
      1-Register, 
      2-Email/Phone Verified, 
      3-KYC Application Submitted and Pending Approval, 
      4-KYC Application Rejected, 
      5-KYC Application Approved - Verified User, 
      6-Account Deleted, 
      9-Account Blocked  
    */
    account_delete_reason :{
      type:'string'   //  ddelete Account reason , why account is deleted?
    },
    createdBy : {
      type:'string'
    },
    updatedBy : {
      type:'string'
    }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },

  customToJSON: function() {
    return _.omit(this, ['password'])
  },

  beforeCreate: function(values, next) {
    // Hash password

    bcrypt.genSalt(5, function(err, salt) {
        if (err) return next(err);
    
        bcrypt.hash(values.password, salt,null, function(err, hash) {
          if (err) return next(err);
          values.password = hash;

          //calling next() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
          next();
        });
    });
  },


  validateOnCreate: async function(values){

    var errors = this.validateData(values)
    console.log(errors);

    if(!errors){
      Users.isEmailExists(values.email)
        .then(function(error1){
                console.log('isEmailExists called');
                console.log(error1);
                if(error1)
                  return error1;
        });
    }/*else
      return errors;*/
  },

  validateData: function(values){
    console.log('Users.validateData called');
    
    if(values.email === "")
      return {
        code: '01',
        msg: 'Email is required'
      }


    if(values.password === "")
      return {
        code: '01',
        msg: 'Password is required'
      } 

    // Checking for email format  
    if(!this.validateEmail(values.email))  
      return {
        code: '02',
        msg: 'Provided email is invalid. Please provide correct email.'
      }
  },

  isEmailExists: async function(values){
    console.log('Users.isEmailExists called');
    var result;
    await Users.findOne({ email : values }).then(function(user){
      
      if(user){
        result = {
          code: '03',
          msg: 'The given email already exists. Please enter another email.' 
        };
      }  
    }).catch(function (err){
      console.log('Error: '+err);
      result = {
          code: '99',
          msg: 'Some error occurred. Please try again later.' 
        };
    });

    return result;
  },

  isPhoneExists: async function(vCountryCode, vPhone){
    console.log('Users.isPhoneExists called');
    var result;
    await Users.findOne({ country_code : vCountryCode, phone: vPhone }).then(function(user){
      
      if(user){
        result = {
          code: '03',
          msg: 'The given phone number already exists. Please enter another phone number.' 
        };
      }  
    }).catch(function (err){
      console.log('Error: '+err);
      result = {
          code: '99',
          msg: 'Some error occurred. Please try again later.' 
        };
    });

    return result;
  },

  validateEmail: function(inputText){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat))
      return true;
    else
      return false;
  },

  createUser: async function(values){
    var user = await Users.create(values).fetch();
    return user;
  },

};

