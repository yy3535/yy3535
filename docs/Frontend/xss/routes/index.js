var express = require('express');
var router = express.Router();

var comments={};

function html_encode(str){
  var s='';
  if(str.length==0) return "";
  s=str.replace(/&/g,"&amp;");
  s=s.replace(/</g,"&lt;");
  s=s.replace(/>/g,"&gt;");
  s=s.replace(/\s/g,"&nbsp;");
  s=s.replace(/\'/g,"&#39;");
  s=s.replace(/\"/g,"&quot;");
  s=s.replace(/\n/g,"<br/>");
  return s;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express'});
});

router.get('/comment',function(req,res,next){
  comments.v=html_encode(req.query.coment);
})

router.get('/getComment',function(req,res,next){
  res.json({
    comment:comments.v
  })
})

module.exports = router;
