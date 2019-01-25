module.exports = {

getData : function(req,res)
{

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
req.body.text = rand=Math.floor((Math.random() * 100) + 54);
var textCode = req.body.text;
res.render(__dirname + '/views/done', {data : req.body.text } );
const msg = {
  to: req.body.email,					//receiver's email
  from: 'marinanov04016776@gmail.com',			//sender's email
  subject: 'req.body.subject',//Subject
  text: "Ваш код подтверждения : " + req.body.text + '\n\nMy email : ' + req.body.email		//content		//HTML content
};
sgMail.send(msg);

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

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");
const msg = {
  to: 'marinanov040167@gmail.com',					//receiver's email
  from: req.body.email,			//sender's email
  subject: req.body.subject,//Subject
  text: req.body.message + '\n\nMy name is ' + req.body.name + ', my email : ' + req.body.email,		//content		//HTML content
};
sgMail.send(msg);

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
