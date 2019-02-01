function newForm()
{
   document.getElementById("close").style.display = 'block';
   document.getElementById("oldPassword").style.display = 'block';
   document.getElementById("newPassword").style.display = 'block';
   document.getElementById("moreNewPassword").style.display = 'block';
   document.getElementById("oldPassword").value = '';
   document.getElementById("newPassword").value = '';
   document.getElementById("moreNewPassword").value = '';
   document.getElementById("submit").style.display = 'block';
}
