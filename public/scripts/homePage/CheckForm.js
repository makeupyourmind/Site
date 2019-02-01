$('#myForm').submit(function(e) {

  if(document.getElementById('oldPassword').value != document.getElementById('dataPassword').value || document.getElementById('oldPassword').value == '')
  {
    document.getElementById('oldPassword').style.border = '1px solid red';
    return false;
  }

  if(document.getElementById('newPassword').value == '')
  {
    document.getElementById('newPassword').style.border = '1px solid red';
    return false;
  }

  if(document.getElementById('moreNewPassword').value == '' || document.getElementById('newPassword').value != document.getElementById('moreNewPassword').value)
  {
    document.getElementById('moreNewPassword').style.border = '1px solid red';
    document.getElementById('newPassword').style.border = '1px solid grey';
    return false;
  }

  if(document.getElementById('newPassword').value == document.getElementById('moreNewPassword').value)
  {
    document.getElementById('moreNewPassword').style.border = '1px solid grey';
  }

   e.preventDefault();
  $.ajax({
    url : '/changePassword',
    type : 'POST',
    dataType : 'text',
    data : $(this).serialize(),
    success: function(data){
         $("#server").html('Your Password : ' + data);
    },
    error: function()
    {
         $("#server").html('error');
    }

  });

  document.getElementById("result").innerHTML = "Your password was changed";
  setTimeout(function(){ $('#result').hide(); }, 5000);
  setTimeout(function(){ $('#result').show(); }, 2000);

});
