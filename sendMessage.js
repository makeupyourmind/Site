module.exports = {

sendMessage : function(req,res)
{

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'marinanov04016776@gmail.com',
      pass: 'marinanov'
    }
  });
  console.log("Email sent ");
  var mailOptions =
  {
    name: req.body.name,
    from: 'marinanov04016776@gmail.com',
    to: req.body.addEmail,
    subject: req.body.subject,
    text: req.body.text + '\n\nFrom support site My email : marinanov04016776@gmail.com'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error)
    {
      console.log(error);
    } else
    {
      console.log('Email sent: ' + info.response);
      console.log(mailOptions);
      transporter.end();
    }



  });

}

/*
linkUser : function(req, res)
{
        var pg = require('pg');
        var conString =
        {
            user: 'postgres',
            database: 'postgres',
            password: 'AZ69295',
            port: 5432
        };

      const pool = new pg.Pool(conString);

      pool.connect(function (err,client,done) {
          if(err)
          {
            console.log("Error");
          }
          client.query('SELECT email from usersdata Where id ='+ req.query.id, function (err,result){
            //console.log("result.rows : " + result.rows[0].email);
            done();
            if(err)
            {
              console.log(err);
            }
            //console.log("result.rows : " + result.rows[0]);
            res.status(200).send(result.rows[0].email);
          })
      })
}
*/

} //end module
