var express = require('express'),
http = require('http'),
bodyParser = require('body-parser'),
request = require('request'),
app = express();

var dbConnect = require('./dbConnect.js');
var sendMessage = require('./sendMessage.js');
var changePassword = require('./changePassword.js');

var port = process.env.PORT || 3000


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));
app.use(express.static( "public" ) );

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
} );

app.get('/about', function(req,res)
{
  res.sendFile(__dirname + '/about.html');
})

app.get('/contact', function(req,res)
{
  res.sendFile(__dirname + '/contact.html');
})

app.get('/logUser', function(req,res)
{
  res.sendFile(__dirname + '/logIn.html');
  //res.render(__dirname + '/views/logIn');
})

app.get('/addUser', function(req,res)
{
  res.render(__dirname + '/views/register');
})

app.post('/getData', function(req,res)
{
    dbConnect.getData(req,res);
})

app.post('/homePage',function(req,res)
{
    dbConnect.logIn(req,res);
})

app.post( '/email', function(req,res)
{
    dbConnect.email(req,res);
})

app.get( '/logIn', function(req,res)
{
    res.sendFile(__dirname + '/logIn.html');
})


app.get('/getDb', function(req,res){
  dbConnect.getUsers(req,res);
})


app.get('/getDb/delUser', function(req,res){
  console.log("Del server function Ok");
  dbConnect.delUser(req,res);
})

app.post('/confirmEmail', function(req,res){
  dbConnect.confirmEmail(req,res);
})


app.post( '/sendMessage', function(req,res)
{
    sendMessage.sendMessage(req,res);
})

app.post( '/changePassword', function(req,res)
{
    changePassword.changePassword(req,res);
})


app.listen(port, function(){
  console.log("Мы отслеживаем порт : " + port );
});
