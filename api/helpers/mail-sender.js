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
    nodemailer = require("nodemailer");
    var smtpTransport = nodemailer.createTransport( {
        host:  process.env.smtp_host,
        port:  process.env.smtp_port,
        auth:{        
          user:	 process.env.smtp_username,
          pass:	 process.env.smtp_password,
        }
    }); 
    //var smtpTransport = this.createTransports();
    var mailOptions = {
        to: inputs.mailTo,
        from:   process.env.smtp_sender_email,
        subject: inputs.mailSubject,
        html: inputs.mailBody
    };
        smtpTransport.sendMail(mailOptions, (err) => {
            if(err){
              return exits.mailError(err);
            } 
            // All done.
            return exits.success(true);
        });
  },


};

