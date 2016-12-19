# ratelimit
Let's you set rates on any action occuring (variable).  
You can set time-bounded limits for instance IP addresses on a server (to deny access), or user actions like clicking a button in a browser.

IP addresses on a server
````
var ipaddress = ratelimit({threshold: 5, minutes: 1});
app.get('/', function(req, res){
  var okToEnter = ipaddress.check(req.ip);  // true|false
});
ipaddress.db;  // shows the database
````

Clicking buttons in a browser
https://jsfiddle.net/digplan/ztmc4y3v/
````
var clicker = ratelimit({threshold: 5, minutes: 1/10});

clicker.onalert = function(msg, id){
  messages.innerText = [msg, id, 'at', new Date()].join(' ');
  document.querySelector('#'+id).disabled = false;
}
window.check = function(e){
  e.disabled = !clicker.check(e.id);
}
window.showdb = function(){
  db.innerText = JSON.stringify(clicker.db);
}
````
