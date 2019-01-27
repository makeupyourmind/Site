module.exports = {

changePassword : function(req,res)
{

  const { Client } = require('pg');

  const client = new Client({
    connectionString: "postgres://bfgndswprvioth:9efc3e033a9a42be027efe777a917f5ff0f65dddca409513228f83749b3bedf2@ec2-46-137-170-51.eu-west-1.compute.amazonaws.com:5432/d2iggciii1ml7o",
    ssl: true,
  });

  client.connect();

  var name = req.body.name;

  client.query('select *from usersdata', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log("okay");
      console.log("select : " + JSON.stringify(row));

    }

      client.query("UPDATE usersdata SET password=$1 WHERE name = $2", [req.body.moreNewPassword, req.body.dataName] , (result) =>
      {
        console.log("okay");
        client.end();
      });

  });


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
