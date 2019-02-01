var d = new Date();

var day = new Array("Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");

var month=new Array("January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December");

 document.getElementById('clock').value = day[d.getDay()] + " " + d.getDate() + " " + month[d.getMonth()] + " " + d.getFullYear();
