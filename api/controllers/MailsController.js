/**
 * MailsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  /**
     * @method sendTestMail
     * @desc This function sends a test mail to given address by using the mail-sender helper 
     * and configured SMTP settings in .env file. Developers can refer this function for the usage of helper
     * and handling the exceptions
     * @param Request
     * @param Response
     * @returns Response JSON
     */  
  sendTestMail:async function(req, res){

    console.log("sendTestMail called");
      var status = await sails.helpers.mailSender.with({
          mailTo: 'partht@zignuts.com',
          mailSubject: 'Test Mail',
          mailBody: 'This is a test mail. Do not reply to this.'
      })
      .tolerate('mailError', (err) => {
          // Handle mail bounces and failures
          console.log("Mail count not be sent due to some errors.");
          //console.log(err);
          res.json({
            status: 400,
            message: 'failure',
            description: err.raw.response
        });
      });

      if(status){
          console.log("Mail sent");
          res.json({
              status: 200,
              message: 'success'
          });
      }

  }

};

