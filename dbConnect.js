module.exports = {

getData : function(req,res)
{

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'marinanov04016776@gmail.com',
      pass: 'marinanov'
    }
  });

  req.body.text = rand=Math.floor((Math.random() * 100) + 54);
  res.render(__dirname + '/views/done', {data : req.body.text } );
  var textCode = req.body.text;

  var mailOptions =
  {
    name: req.body.name,
    from: req.body.email,
    to: req.body.email,
    subject: req.body.subject,
    text: "Ваш код подтверждения : " + req.body.text + '\n\nMy email : ' + req.body.email
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      console.log(mailOptions);
    }
  });

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
    console.log("select getData: " + JSON.stringify(row));

  }

    client.query("INSERT INTO usersdatatemp (name, password, email, code, time) values($1, $2, $3, $4, $5) ", [req.body.name, req.body.password, req.body.email, textCode, req.body.clock], (result) =>
    {
      console.log("okay");
      client.end();
    });

});

},

//Пользователь входит на свое страницу
logIn : function(req,res)
{

const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://bfgndswprvioth:9efc3e033a9a42be027efe777a917f5ff0f65dddca409513228f83749b3bedf2@ec2-46-137-170-51.eu-west-1.compute.amazonaws.com:5432/d2iggciii1ml7o",
  ssl: true,
});

var password = req.body.password;
var nameBody = req.body.name;

if(nameBody == 'admin' && password == 'admin')
{
  //res.sendFile(__dirname + '/doneEnter.html');
  res.render(__dirname + '/views/doneEnter');//попадает на страницу где видны все зарегистрированные пользователи
}

client.connect();

client.query('select name, password, email from usersdata WHERE name = $1', [nameBody], (err, result) => {
  if (err) throw err;
  for (let row of result.rows) {
    console.log("select login : " + JSON.stringify(row));
  }

  if(result.rows.length > 0 && nameBody == result.rows[0].name && password == result.rows[0].password )
  {
    //res.render(__dirname + '/views/doneEnter', {data: req.body});
    //console.log("data : " + result.rows[0]);
    res.render(__dirname + '/views/homePage', {data: result.rows[0]});
  }
  else
  {
   res.render(__dirname + '/views/ErrorLogIn');
  }

  client.end();
});

},

//Отправка писем со страницы контакты на почту админа
email : function(req,res)
{

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'marinanov04016776@gmail.com',
      pass: 'marinanov'
    }
  });

  var mailOptions =
  {
    name: req.body.name,
    from: req.body.email,
    to: 'marinanov040167@gmail.com',
    subject: req.body.subject,
    text: req.body.message + '\n\nMy email : ' + req.body.email
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      console.log(mailOptions);
      transporter.end();
    }
  });

},

getUsers : function(req,res)
{

/////////////////////////////////////////////////////////////////////
const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://bfgndswprvioth:9efc3e033a9a42be027efe777a917f5ff0f65dddca409513228f83749b3bedf2@ec2-46-137-170-51.eu-west-1.compute.amazonaws.com:5432/d2iggciii1ml7o",
  ssl: true,
});

client.connect();

client.query('SELECT *from usersdata', (err, result) =>
{
  if (err) throw err;
  for (let row of result.rows) {

    console.log("select getUsers: " + JSON.stringify(row));
  }
  res.send(result.rows);
  client.end();
});

},
//end getUsers
//Удаление пользователей из базы данных со страницы админа
delUser : function(req, res)
{
const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://bfgndswprvioth:9efc3e033a9a42be027efe777a917f5ff0f65dddca409513228f83749b3bedf2@ec2-46-137-170-51.eu-west-1.compute.amazonaws.com:5432/d2iggciii1ml7o",
  ssl: true,
});

client.connect();

client.query('Delete from usersdata Where id =' + req.query.id, function (err,result){
  if(err)
  {
    console.log(err);
  }
  res.status(200).send(result.rows);
  console.log(result.rows);
})

},

//Подтверждение регистации при рекгистрации нового пользователя путем отправки кода на его емаил
confirmEmail : function(req,res)
{

const { Client } = require('pg');

const client = new Client({
  connectionString: "postgres://bfgndswprvioth:9efc3e033a9a42be027efe777a917f5ff0f65dddca409513228f83749b3bedf2@ec2-46-137-170-51.eu-west-1.compute.amazonaws.com:5432/d2iggciii1ml7o",
  ssl: true,
});

client.connect();

client.query('select *from usersdatatemp', (err, result) =>
{
  if (err) throw err;
  for (let row of result.rows)
  {
    console.log(JSON.stringify(row));
  }

  if(result.rows[0].code == req.body.confirmEmail)
  {
    client.query("INSERT INTO usersdata (name,password,email,time) select name,password,email,time from usersdatatemp", function(req,res)
    {
    })
    //res.sendFile(__dirname + "/homePage.html");
    res.render(__dirname + '/views/homePage', {data: result.rows[0]});
  }
  else
  {
    res.sendFile(__dirname + "/register.html");
  }
  console.log("code : " + result.rows[0].code);
  client.query("DELETE FROM usersdatatemp Where code = $1", [result.rows[0].code], (err, res) => {
    client.end();
  });


});



}

}//end module
