function offHide()
{
  document.getElementById("message").style.display = "none";
  document.getElementById("hide").style.display = "none";
  document.getElementById("result").style.display = "none";
}
function sendEmail()
{
  document.getElementById("message").style.display = 'block';
  document.getElementById("hide").style.display = 'block';
  document.getElementById("hide").value = '';
  document.getElementById("subject").value = '';
}
