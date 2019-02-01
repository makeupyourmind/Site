$(function () {
  $("#myForm").submit(function (event) {
    if(document.getElementById('subject').value == '')
    {
      document.getElementById('subject').style.border = '1px solid red';
      return false;
    }
    if(document.getElementById('subject').value != '')
    {
      document.getElementById('subject').style.border = '1px solid grey';
    }
    event.preventDefault();
    $.post("/sendMessage", $(this).serialize());
    document.getElementById("result").innerHTML = "Message sent to user";
    setTimeout(function(){ $('#result').hide(); }, 5000);
    setTimeout(function(){ $('#result').show(); }, 2000);
  })

})
