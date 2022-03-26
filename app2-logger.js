
function log(req,res,next){
console.log('logging...logger');  
  next();
}

module.exports= log;