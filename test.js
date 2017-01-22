try {
 var ratelimits = require('ratelimits');
} catch(e) {
 var ratelimits = require('.');
}

var ipaddress = ratelimits({threshold: 3, minutes: 1/10});
console.log('ratelimit object', ipaddress, !!ipaddress)

console.log('threshold 1 < 3', ipaddress.check('1.1.1.1'));
console.log('threshold 2 < 3', ipaddress.check('1.1.1.1'));
console.log('threshold 3 < 3', ipaddress.check('1.1.1.1'));
console.log('threshold 4 > 3', !ipaddress.check('1.1.1.1'));
console.log('threshold 5 > 3', !ipaddress.check('1.1.1.1'));

console.log('info', ipaddress.db, !!ipaddress.db);

ipaddress.onalert = function(msg, id){
  console.log('alert', msg, id);
};

process.exit(0)