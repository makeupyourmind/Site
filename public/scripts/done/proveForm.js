function proveForm()
{
  if(document.myForm.confirmEmail.value == '')
  {
    document.getElementById('errorCode').style.display = 'block';
    document.getElementById('errorCode').innerHTML = 'Error code';
    document.getElementById('code').style.border = '1px solid red';
    return false;
  }
}
