$.ajaxSetup({ cache: false });

var tmp="";
var up="";
var cn=0;
var client = new XMLHttpRequest();

lng=navigator.language||navigator.userLanguage;
if (lng = 'it-IT') lng='it';
if (lng != 'it') lng='en';


$.ajax({ url: "https://ssl.gkolozof.xyz/0/cls.php"});
  function chk() 
   {
    up=client.responseText; 
    if (up && up != tmp) {$("#countdown").html(up); tmp=up;}
    if (up.indexOf("LOAD") != -1 && cn == 0) 
     {
      cn=1;
      $.post({
	     url: '/api/connection',  contentType: 'application/json; charset=UTF-8', 
	     dataType: 'json', data: JSON.stringify({"command": "connect" }),
	     async: false
            });
     }
    if (up.indexOf("COMPILATION FIRMWARE SUCCESSFUL") != -1 && cn == 1) 
     {
      $.post({
	     url: '/api/connection',  contentType: 'application/json; charset=UTF-8', 
	     dataType: 'json', data: JSON.stringify({"command": "disconnect" }),
	     async: false,
	     success: function(){$.get({ url: "https://ssl.gkolozof.xyz/0/dw.php?dw=500" });cn=2},
	     error: function(){cn=0} 
            });
     }

    if (up.indexOf("local") != -1 && cn == 2) { cn++;$.ajax({ url: "/plugin/ZERO/fw"+UI_API_KEY})}

    if (up.indexOf("Proccess faults") != -1)
     {
      cn=0;
      start=false;
      $.ajax({ url: "/plugin/ZERO/static/error-"+lng+".html" }).done(function(msg){$("#countdown").html(up+msg)});
     }

    if (up.indexOf("PROCESS COMPLETED SUCCESSFULL") != -1) 
     {
      cn=0;
      start=false;
      $.ajax({ url: "/plugin/ZERO/static/success-"+lng+".html" }).done(function(msg){$("#countdown").html(up+msg)});
      //clearInterval(stop);
     }
   }

var stop = setInterval(function()
{
 if (start)
  {
   client.open('GET', "https://ssl.gkolozof.xyz/0/up.php",true);
   client.send();
   client.onreadystatechange = chk;
  }
}, 400);
