var router = require('express').Router();

router.get('/', function(req, res){
	res.render(__dirname + 'routes/modules/post/postView', {text: "Those are posts"});
});

module.exports = router;