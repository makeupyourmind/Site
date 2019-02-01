function checkForm()
{
  if(document.myForm.name.value == '')
  {
    document.getElementById('errorName').style.display = 'block';
    document.getElementById('errorName').innerHTML = 'Enter data';
    document.getElementById('name').style.border = '1px solid red';
    return false;
  }
  if(document.myForm.password.value == '')
  {
    document.getElementById('errorPassword').style.display = 'block';
    document.getElementById('errorPassword').innerHTML = 'Enter data';
    document.getElementById('password').style.border = '1px solid red';
    return false;
  }

  var y = document.getElementById('email').value;
  at = y.indexOf("@");
  dot = y.indexOf(".");

  if( at < 1 || dot < 1 )
  {
    document.getElementById('errorEmail').style.display = 'block';
    document.getElementById('errorEmail').innerHTML = 'Enter data';
    document.getElementById('email').style.border = '1px solid red';
    return false;
  }

  if(document.getElementById('name').value == document.getElementById('item').innerHTML)
  {
    document.getElementById('name').style.border = '1px solid red';
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

  return true;
}
