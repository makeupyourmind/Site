$(function () {
$("#myForm").submit(function (event) {
  /////////////проверка формы
  var subject = document.getElementById('subject').value;
  if(subject == '')
  {
    document.getElementById('subject').style.border = '1px solid red';
    return false;
  }
  var name = document.getElementById('name').value;
  if(name == '')
  {
    document.getElementById('name').style.border = '1px solid red';
    return false;
  }
  var email = document.getElementById('email').value;
  if(email == '')
  {
    document.getElementById('email').style.border = '1px solid red';
    return false;
  }

  var y = document.getElementById('email').value;
  at = y.indexOf("@");
  dot = y.indexOf(".");

  if( at < 1 || dot < 1 )
  {
    document.getElementById('email').style.border = '1px solid red';
    return false;
  }

  var message = document.getElementById('message').value;
  if(message == '')
  {
    document.getElementById('message').style.border = '1px solid red';
    return false;
  }
  ///////////////////////////
  event.preventDefault();
  $.post("/email", $(this).serialize());
  document.getElementById("result").innerHTML = "Message sent to admin";
  setTimeout(function(){ $('#result').hide(); }, 5000);
  setTimeout(function(){ $('#result').show(); }, 2000);
})

})
