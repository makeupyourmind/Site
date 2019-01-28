module.exports = {

getData : function(req,res)
{

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
req.body.text = rand=Math.floor((Math.random() * 100) + 54);
var textCode = req.body.text;
res.render(__dirname + '/views/done', {data : req.body.text } );
const msg = {
  to: req.body.email,					//receiver's email
  from: 'marinanov04016776@gmail.com',			//sender's email
  subject: 'Verification code',//Subject
  text: "Your verification code : " + req.body.text + '\n\nMy email : ' + 'marinanov04016776@gmail.com'		//content		//HTML content
};
sgMail.send(msg);
//////////////////////////////////////////////////////////////////////////////////////////////////////
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
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
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

var password = req.body.password;
var nameBody = req.body.name;

if(nameBody == 'admin' && password == 'admin')
{
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
    res.render(__dirname + '/views/homePage', {data: result.rows[0]} );
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

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
  to: 'marinanov040167@gmail.com',					//receiver's email
  from: req.body.email,			//sender's email
  subject: req.body.subject,//Subject
  text: req.body.message + '\n\nMy name : ' + req.body.name,		//content		//HTML content
};
sgMail.send(msg);
},

getUsers : function(req,res)
{

/////////////////////////////////////////////////////////////////////
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
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
  connectionString: process.env.DATABASE_URL,
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

//Подтверждение регистации при регистрации нового пользователя путем отправки кода на его емаил
confirmEmail : function(req,res)
{

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
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

    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: result.rows[0].email,					//receiver's email
      from: 'marinanov04016776@gmail.com',			//sender's email
      subject: 'Welcome to our site',//Subject
      text: 'Thank you for registration on our site\n\nFrom support site My email : marinanov04016776@gmail.com'		//content		//HTML content
    };
    sgMail.send(msg);

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
