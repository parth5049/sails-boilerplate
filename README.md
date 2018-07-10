# SailsJS Boilerplate Application

This is a boilerplate application using SailsJS and NodeJS with basic features and base to start your project. The project contains following features and the development work is still ongoing. 

### Version Info
- Version 0.0.1
- NodeJS 8.11.3
- SailsJS 1.0.2
- For further details, kindly refer to package.json file


This boilerplate application contains following features:

## Models

Users - Contains basic user related attributes and validators

## Controllers

UsersController - User related methods and CRUD 
AuthController - User Authentication using passport.js 
MailsController - Sending Mails using Mail helper 
S3Controller - File upload to Amazon S3

## Helpers

mail-sender.js - Boilerplate for sending emails using SMTP and nodemailer

# Installation Steps

### Prerequisites

1. Make sure NodeJS (version >=8.11.3 recommended) and NPM are installed
2. This app does not use any database but instead uses sails-disk, an embedded database provided by sails for development purpose only. Feel free to change the database config as per your requirements
3. Excecute following commands 
```sh
$ npm install -g sails
$ git clone <this repo>
$ cd <repo>
$ npm install
$ npm installl -g nodemon
$ sails lift
```


# Contributors
- [Zignuts Technolab](http://www.zignuts.com) Development Team

For any inquiries, please feel free to reach me or write an email to hello(at)zignuts(dot)com. 
