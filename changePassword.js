module.exports = {

changePassword : function(req,res)
{

  const { Client } = require('pg');

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  client.connect();

  var name = req.body.name;

      client.query("UPDATE usersdata SET password=$1 WHERE name = $2", [req.body.moreNewPassword, req.body.dataName]);

      client.query("SELECT password from usersdata WHERE name = $1", [req.body.dataName], (err, result) => {
        if (err) throw err;
        for (let row of result.rows) {
          //console.log("select getUsers: " + JSON.stringify(row));
          //console.log(result);
        }
        res.send(result.rows[0].password);
        client.end();
      })

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: req.body.dataEmail,					//receiver's email
    from: 'marinanov04016776@gmail.com',			//sender's email
    subject: 'Change password',//Subject
    text: 'Your password was change on : ' + req.body.moreNewPassword + '\n\nFrom support site My email : marinanov04016776@gmail.com'		//content		//HTML content
  };
  sgMail.send(msg);

}

}
