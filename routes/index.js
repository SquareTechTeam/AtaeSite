var express = require('express');
var router = express.Router();
var config = require('../config.json');
var multer = require('multer');

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
	knex('ATActivity')
		.select('num', 'thumb_img', 'title', 'content', 'createdAt')
		.orderBy('num', 'desc')
		.limit(3)
		.then(function(atActRows, err){
			knex('ATBroadCastRefer')
				.select('num', 'thumb_img', 'title', 'content', 'createdAt')
				.orderBy('num', 'desc')
				.limit(3)
				.then(function(broadcastRows, err){
					knex('ATGallery')
						.select('num', 'img')
						.orderBy('num', 'desc')
						.limit(8)
						.then(function(galleryRows, err){
							res.render('index', { atActRows : atActRows, broadcastRows : broadcastRows, galleryRows: galleryRows });
						});
				});
		});
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
					.select('num', 'thumb_img', 'title', 'content', 'createdAt')
					.orderBy('num', 'desc')
					.limit(9).offset(offset)
					.then(function(results, err){
						var subtitle = "사업활동";
						res.render('board', { title : head_title, subtitle: subtitle, page_count: page_count, now_page: req.params.page, results : results });
					});
				}else{
					res.render('error');
				}
			
		});
});

router.get('/promote-house/company-activity', function(req, res, next){
	res.redirect('/promote-house/company-activity/1');
});

router.get('/promote-house/company-activity/:page', function(req, res, next){
	knex('ATActivity')
		.count('num as count')
		.then(function(results, err){
			if(req.params.page > 0){
				var offset = (req.params.page -1) * 9;

				var page_count = Math.ceil(results[0].count / 9);
				console.log(page_count);
				knex('ATActivity')
					.select('num', 'thumb_img', 'title', 'content', 'createdAt')
					.orderBy('num', 'desc')
					.limit(9).offset(offset)
					.then(function(results, err){
						var subtitle = "협회활동";
						res.render('board', { title : head_title, subtitle: subtitle, page_count: page_count, now_page: req.params.page, results : results });
					});
				}else{
					res.render('error');
				}
			
		});
});

router.get('/promote-house/gallery', function(req, res, next){
	res.redirect('/promote-house/gallery/1');
});

router.get('/promote-house/gallery/:page', function(req, res, next){
	knex('ATGallery')
		.count('num as count')
		.then(function(results, err){
			if(req.params.page > 0){
				var offset = (req.params.page -1) * 9;

				var page_count = Math.ceil(results[0].count / 9);
				knex('ATGallery')
					.select('num', 'img', 'desc', 'createdAt')
					.orderBy('num', 'desc')
					.limit(9).offset(offset)
					.then(function(results, err){
						var subtitle = "갤러리";
						res.render('gallery', { title : head_title, subtitle: subtitle, page_count: page_count, now_page: req.params.page, results : results });
					});
			}else{
				res.render('error');
			}
		});
});

router.get('/promote-house/videos', function(req, res, next){
	res.render('error');
});

/* Atae Data */
router.get('/data/company-data', function(req, res, next){
	res.redirect('/data/company-data/1');
});

router.get('/data/company-data/:page', function(req, res, next){
	knex('ATRefer')
		.count('num as count')
		.then(function(results, err){
			if(req.params.page > 0){
				var offset = (req.params.page -1) * 9;

				var page_count = Math.ceil(results[0].count / 9);
				console.log(page_count);
				knex('ATRefer')
					.select('num', 'thumb_img', 'title', 'content', 'createdAt')
					.orderBy('num', 'desc')
					.limit(9).offset(offset)
					.then(function(results, err){
						var subtitle = "관련자료";
						res.render('board', { title : head_title, subtitle: subtitle, page_count: page_count, now_page: req.params.page, results : results });
					});
				}else{
					res.render('error');
				}
			
		});
});


router.get('/data/broadcast-data', function(req, res, next){
	res.redirect('/data/broadcast-data/1');
});

router.get('/data/broadcast-data/:page', function(req, res, next){
	knex('ATBroadCastRefer')
		.count('num as count')
		.then(function(results, err){
			if(req.params.page > 0){
				var offset = (req.params.page -1) * 9;

				var page_count = Math.ceil(results[0].count / 9);
				console.log(page_count);
				knex('ATBroadCastRefer')
					.select('num', 'thumb_img', 'title', 'content', 'createdAt')
					.orderBy('num', 'desc')
					.limit(9).offset(offset)
					.then(function(results, err){
						var subtitle = "보도자료";
						res.render('board', { title : head_title, subtitle: subtitle, page_count: page_count, now_page: req.params.page, results : results });
					});
				}else{
					res.render('error');
				}
		});
});

/* admin */
router.get('/admin/write', function(req, res, next){
	res.render('write_content');
})

router.post('/upload_thumb', multer({ dest: '/home/ubuntu/www/public/images/board/thumb_img' }).single('thumb_img'), function(req, res){
	console.log(req.body);
	console.log(req.file);
	res.send(req.file);
});

router.post('/upload_board', function(req, res, next){

});


module.exports = router;
