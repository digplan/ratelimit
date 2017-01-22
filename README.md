# ratelimits
Set rates on any action occuring.
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
<!-- Im a button that can only be clicked 5 times -->
<!-- Each click will check the threshold and disable when its been met -->
<button id=mybutton onclick='this.disabled = !window.clicker.check(this.id)'>Click me 6 times!</button>

<!-- info returned by the .onalert() event -->
<pre id=messages></pre>

<!-- Show the internal info about rate limited items -->
<button onclick='db.innerText = JSON.stringify(clicker.db)'>Show DB</button>
<pre id=db></pre>
````
````
window.clicker = ratelimits({threshold: 5, minutes: 1/10});

// when limited
clicker.onlimited = function(id) {
  messages.innerText = 'This id has been limited: ' + id
  messages.innerText += '. Will reset in 6 seconds'
}
// when reset
clicker.onreset = function(id) {
  messages.innerText = ['RESET', id, 'at', new Date()].join(' ')
  mybutton.disabled = false
  mybutton.innerText = 'Click me 6 times!'
}
````
