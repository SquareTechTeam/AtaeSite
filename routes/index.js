var express = require('express');
var router = express.Router();
var config = require('../config.json');

var head_title = "아태평화교류협회 홈페이지에 오신 것을 환영합니다.";

const knex = require('knex')({
	client: 'mysql',
	connection: {
		host : config.host,
		user : config.user,
		password : config.password,
		database : config.database
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: head_title });
});


/* Atae Introduction */
router.get('/introduce/greeting', function(req, res, next){
	res.render('error');
});

router.get('/introduce/history', function(req, res, next){
	res.render('error');
});

router.get('/introduce/purpose', function(req, res, next){
	res.render('error');
});

router.get('/introduce/map', function(req, res, next){
	res.render('error');
});

router.get('/introduce/company-certification', function(req, res, next){
	res.render('error');
});

router.get('/introduce/donate-certification', function(req, res, next){
	res.render('error');
});

/* Atae People Return */
router.get('/people-return/process', function(req, res, next){
	res.render('error');
});

router.get('/people-return/first', function(req, res, next){
	res.render('error');
});

router.get('/people-return/second', function(req, res, next){
	res.render('error');
});

router.get('/people-return/third', function(req, res, next){
	res.render('error');
});

/* Atae Promote House */
router.get('/promote-house/biz-activity', function(req, res, next){
	res.redirect('/promote-house/biz-activity/1');

	
});

router.get('/promote-house/biz-activity/:page', function(req, res, next){
	knex('ATBizActivity')
		.count('num as count')
		.then(function(results, err){
			if(req.params.page > 0){
				var offset = (req.params.page -1) * 9;

				var page_count = Math.ceil(results[0].count / 9);
				console.log(page_count);
				knex('ATBizActivity')
					.select('thumb_img', 'title', 'content', 'createdAt')
					.orderBy('num', 'desc')
					.limit(9).offset(offset)
					.then(function(results, err){
						var subtitle = "사업활동";
						res.render('board', { title : head_title, subtitle: subtitle, page_count: page_count, now_page: req.params.page, results : results });
					});
				}else{
					//TODO: 404 error
				}
			
		});

});

router.get('/promote-house/company-activity', function(req, res, next){
	res.render('error');
});

router.get('/promote-house/gallery', function(req, res, next){
	res.render('error');
});

router.get('/promote-house/videos', function(req, res, next){
	res.render('error');
});

/* Atae Data */
router.get('/data/company-data', function(req, res, next){
	res.render('error');
});

router.get('/data/broadcast-data', function(req, res, next){
	res.render('error');
});

module.exports = router;
