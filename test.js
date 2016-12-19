var ipaddress = ratelimit({threshold: 3, minutes: 1/10});
console.log(ipaddress.check());
console.log(ipaddress.check());
console.log(ipaddress.check());
console.log(ipaddress.check());
console.log(ipaddress.check());
