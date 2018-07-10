module.exports = {

  friendlyName: 'Mail sender',


  description: 'Sends an email using the credentials specified in the .env file',


  inputs: {
    mailTo: {
      friendlyName: 'Email address of recipient',
      description: 'The email address of recipient to send the email to.',
      type: 'string'
    },
    mailSubject: {
      friendlyName: 'Email Subject',
      description: 'The subject of the email.',
      type: 'string'
    },
    mailBody: {
      friendlyName: 'Email body',
      description: 'The HTML or plain-text body of the email.',
      type: 'string'
    },
  },


  exits: {
    success: {
      outputFriendlyName: 'Mail is sent',
      outputDescription: 'Mail has been sent successfully.',
    },

    mailError: {
      description: 'Mail could not be sent due to some errors. Please check the logs for more details.'
    }
  },


  fn: async function (inputs, exits) {
    // Initializing nodemailer
    
    nodemailer = require("nodemailer");

    // Creating transport using the credentials specified in the .env file
    // TODO need to find ways to make this transport globally accessible to avoid initializing the transport each time
    // and to improve mail send performance
    
    var smtpTransport = nodemailer.createTransport( {
        host:  process.env.smtp_host,
        port:  process.env.smtp_port,
        auth:{        
          user:	 process.env.smtp_username,
          pass:	 process.env.smtp_password,
        }
    }); 
    
    // Setting up mail options for sending mail. 
    var mailOptions = {
        to: inputs.mailTo,
        from:   process.env.smtp_sender_email,
        subject: inputs.mailSubject,
        html: inputs.mailBody
    };

    // Sends email asynchronously and capturing the response

    smtpTransport.sendMail(mailOptions, (err) => {
        
        // Handle the error if any and return the mailError exit route
        if(err){
          return exits.mailError(err);
        } 

        // Mail has been sent successfully.
        return exits.success(true);
    });
  },


};

