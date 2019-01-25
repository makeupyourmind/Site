module.exports = {

sendMessage : function(req,res)
{

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
const msg = {
  to: req.body.addEmail,					//receiver's email
  from: 'marinanov04016776@gmail.com',			//sender's email
  subject: 'req.body.subject',//Subject
  text: req.body.text + '\n\nFrom support site My email : marinanov04016776@gmail.com'		//content		//HTML content
};
sgMail.send(msg);

}

} //end module
