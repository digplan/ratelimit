# ratelimits
Set rates on any action occuring.

```` javascript
var ipaddress = ratelimits({threshold: 5, minutes: 1})
````

#### .check(id)
Check an id and increment its count

#### .onlimited(id, count)
Fires when threshold has been reached

#### .onreset(id)
Fires when threshold is reset by the timer

## Example

You can set time-bounded limits, for example: IP addresses on a server (denying access):
```` javascript
// set a threshold and number of minutes to reset
var ipaddress = ratelimits({threshold: 5, minutes: 1})

app.get('/', function(req, res) {
  var okToEnter = ipaddress.check(req.ip)  // true|false
  if(!okToEnter) res.sendStatus(429)  // Too many requests
})

ipaddress.db // returns { '1.1.1.1': { expire: 1485105971142, count: 5 } }
````

Or user actions like clicking a button in a browser:
https://jsfiddle.net/digplan/ztmc4y3v/
