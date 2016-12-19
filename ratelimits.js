function ratelimit(options){
  var db = {};
  var threshms = options.minutes*60*1000;
  var threshnum = options.threshold;
  var ret = {};
  ret.check = (k)=>{
        if(!db[k]) 
          db[k] = {expire: (+new Date() + threshms), count: 1};
        else
          db[k].count++;
        return db[k].count < threshnum;
  };
  setInterval(()=>{
     var time = +new Date();
     for(k in db){
       if(db[k].expire > time) return;
       delete db[k];
       if(ret.onalert) ret.onalert('Reset', k);
     }
  }, threshms);
  ret.db = db;
  return ret;
}

if(typeof module !== 'undefined')
  module.exports = ratelimit;
