function ratelimits(options){
  var db = {};
  var threshms = options.minutes*60*1000;
  var threshnum = options.threshold;
  var ret = {};
  ret.check = (k)=>{
        if(!db[k]) 
          db[k] = {expire: (+new Date() + threshms), count: 1};
        else
          db[k].count++;
        var ok = db[k].count <= threshnum;
        if(!ok) ret.onlimited(k, db[k].count);
        return ok
  };
  setInterval(()=>{
     var time = +new Date();
     for(k in db){
       if(db[k].expire > time) return;
       delete db[k];
       if(ret.onreset) ret.onreset(k);
     }
  }, threshms);
  ret.db = db;
  return ret;
}

if(typeof module !== 'undefined')
  module.exports = ratelimits;
