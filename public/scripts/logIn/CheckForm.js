function checkForm()
{
  if(document.getElementById('name').value == '')
  {
    document.getElementById('errorName').style.display = 'block';
    document.getElementById('errorName').innerHTML = 'Enter data';
    document.getElementById('name').style.border = '1px solid red';
    return false;
  }
  if(document.getElementById('password').value == '')
  {
    document.getElementById('errorPassword').style.display = 'block';
    document.getElementById('errorPassword').innerHTML = 'Enter data';
    document.getElementById('password').style.border = '1px solid red';
    return false;
  }
  if(document.getElementById('name').value != document.getElementById('hiddenName').value || document.getElementById('password').value != document.getElementById('hiddenPassword').value )
  {
    document.getElementById('result').style.display = "block";
    document.getElementById('result').innerHTML = "Incorrect nickname or password ";
    document.getElementById('name').style.border = '1px solid red';
    document.getElementById('password').style.border = '1px solid red';
    return false;
  }
  return true;
}
