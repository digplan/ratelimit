# ratelimit
Let's you set rates on any action occuring (variable).

IP addresses on a server
````
var ipaddress = ratelimit({threshold: 5, minutes: 1});
app.get('/', function(req, res){
  var okToEnter = ipaddress.check(req.ip);  // true|false
});
ipaddress.db;  // shows the database
````

Clicking buttons in a browser
<script async src="//jsfiddle.net/digplan/ztmc4y3v/embed/js,html,result/"></script>
