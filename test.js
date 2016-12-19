try {
 var ratelimits = require('ratelimits');
} catch(e) {
 var ratelimits = require('.');
}

var ipaddress = ratelimits({threshold: 3, minutes: 1/10});

console.log(ipaddress.check('1.1.1.1'));
console.log(ipaddress.check('1.1.1.1'));
console.log(ipaddress.check('1.1.1.1'));
console.log(ipaddress.check('1.1.1.1'));
console.log(ipaddress.check('1.1.1.1'));

console.log(ipaddress.check('2.1.1.1'));
console.log(ipaddress.check('2.1.1.1'));

console.log(ipaddress.db);

ipaddress.onalert = function(msg, id){
  console.log(msg, id);
  console.log(ipaddress.db);
};