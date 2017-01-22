# ratelimit
Set rates on any action occuring. Use a string as the id of the thing to be limited. 

````
var ipaddress = ratelimits({threshold: 5, minutes: 1})
````
###.check(id)
Check an id and increment its count
###.onlimited(id, count)
Fires when threshold has been reached
###.onreset(id)
Fires when threshold is reset by the timer

You can set time-bounded limits for instance IP addresses on a server (to deny access):
````
// set a threshold and number of minutes to reset
var ipaddress = ratelimits({threshold: 5, minutes: 1})

app.get('/', function(req, res){
  var okToEnter = ipaddress.check(req.ip)  // true|false
  if(!okToEnter) res.sendStatus(429)  // Too many requests
})

ipaddress.db  // shows info, ie.. { '1.1.1.1': { expire: 1485105971142, count: 5 } }
````

or user actions like clicking a button in a browser:
https://jsfiddle.net/digplan/ztmc4y3v/
````
<button id=mybutton onclick='this.disabled = this.innerText = !window.clicker.check(this.id)'>
Click me 6 times!</button>

var clicker = ratelimits({threshold: 5, minutes: 1/10})

// when limited
clicker.onlimited = (id, count) => {
  console.log(`${id} has count ${count} and has been limited`)
}
// when reset
clicker.onreset = id => {
  console.log(`${id} has been reset`)
}
````
