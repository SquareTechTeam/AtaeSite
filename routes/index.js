var express = require('express');
var router = express.Router();
var config = require('../config.json');
var multer = require('multer');
var fs = require("fs");
var bodyParser = require("body-parser");
var path = require('path');

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
	res.render('m1_greeting');
});

router.get('/introduce/history', function(req, res, next){
	res.render('m1_history');
});

router.get('/introduce/purpose', function(req, res, next){
	res.render('m1_goal');
});

router.get('/introduce/map', function(req, res, next){
	res.render('m1_organization');
});

router.get('/introduce/company-certification', function(req, res, next){
	res.render('m1_license');
});

router.get('/introduce/donate-certification', function(req, res, next){
	res.render('m1_last');
});

/* Atae People Return */
router.get('/people-return/process', function(req, res, next){
	res.render('error');
});

router.get('/people-return/first', function(req, res, next){
	res.redirect('/people-return/first/1');
});

router.get('/people-return/first/:page', function(req, res, next){
	knex('ATReturn')
		.where('process', 1)
		.count('num as count')
		.then(function(results, err){
			if(req.params.page > 0){
				var offset = (req.params.page -1) * 9;

				var page_count = Math.ceil(results[0].count / 9);
				knex('ATReturn')
					.where('process', 1)
					.select('num', 'img', 'desc', 'createdAt')
					.orderBy('num', 'desc')
					.limit(9).offset(offset)
					.then(function(results, err){
						var subtitle = "1차 유골봉환";
						res.render('return', { title : head_title, subtitle: subtitle, page_count: page_count, now_page: req.params.page, results : results });
					});
			}else{
				res.render('error');
			}
		});
});

router.get('/people-return/second', function(req, res, next){
	res.redirect('/people-return/second/1');
});

router.get('/people-return/second/:page', function(req, res, next){
	knex('ATReturn')
		.where('process', 2)
		.count('num as count')
		.then(function(results, err){
			if(req.params.page > 0){
				var offset = (req.params.page -1) * 9;

				var page_count = Math.ceil(results[0].count / 9);
				knex('ATReturn')
					.where('process', 2)
					.select('num', 'img', 'desc', 'createdAt')
					.orderBy('num', 'desc')
					.limit(9).offset(offset)
					.then(function(results, err){
						var subtitle = "2차 유골봉환";
						res.render('return', { title : head_title, subtitle: subtitle, page_count: page_count, now_page: req.params.page, results : results });
					});
			}else{
				res.render('error');
			}
		});
});

router.get('/people-return/third', function(req, res, next){
	res.redirect('/people-return/third/1');
});

router.get('/people-return/third/:page', function(req, res, next){
	knex('ATReturn')
		.where('process', 3)
		.count('num as count')
		.then(function(results, err){
			if(req.params.page > 0){
				var offset = (req.params.page -1) * 9;

				var page_count = Math.ceil(results[0].count / 9);
				knex('ATReturn')
					.where('process', 3)
					.select('num', 'img', 'desc', 'createdAt')
					.orderBy('num', 'desc')
					.limit(9).offset(offset)
					.then(function(results, err){
						var subtitle = "3차 유골봉환";
						res.render('return', { title : head_title, subtitle: subtitle, page_count: page_count, now_page: req.params.page, results : results });
					});
			}else{
				res.render('error');
			}
		});
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
						res.render('board', { 
							title : head_title, 
							subtitle: subtitle, 
							page_count: page_count, 
							now_page: req.params.page,
							detail_path: "/promote-house/biz-activity/detail/", 
							results : results 
						});
					});
				}else{
					res.render('error');
				}
			
		});
});

router.get('/promote-house/biz-activity/detail/:num', function(req, res, next){
	
	knex('ATBizActivity')
		.where('num', req.params.num)
		.select('num', 'title', 'content', 'createdAt')
		.then(function(results, err){
			var subtitle = "사업활동";
			console.log(results);
			res.render('detail', { subtitle: subtitle, results: results });
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
						res.render('board', { 
							title : head_title, 
							subtitle: subtitle, 
							page_count: page_count, 
							now_page: req.params.page,
							detail_path: "/promote-house/company-activity/detail/", 
							results : results });
					});
				}else{
					res.render('error');
				}	
		});
});

router.get('/promote-house/company-activity/detail/:num', function(req, res, next){
	knex('ATActivity')
		.where('num', req.params.num)
		.select('num', 'title', 'content', 'createdAt')
		.then(function(results, err){
			var subtitle = "협회활동";
			console.log(results);
			res.render('detail', { subtitle: subtitle, results: results });
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

router.get('/promote-house/movie', function(req, res, next){
	res.redirect('/promote-house/movie/1');
});

router.get('/promote-house/movie/:page', function(req, res, next){
	knex('ATVideo')
		.count('num as count')
		.then(function(results, err){
			if(req.params.page > 0){
				var offset = (req.params.page -1) * 3;
				var page_count = Math.ceil(results[0].count / 3);
				knex('ATVideo')
					.select('num', 'video_id', 'desc', 'createdAt')
					.orderBy('num', 'desc')
					.limit(3).offset(offset)
					.then(function(results, err){
						var subtitle = "동영상";
						res.render('movie', { title : head_title, subtitle: subtitle, page_count: page_count, now_page: req.params.page, results: results });
					});
			}else{
				res.render('error');
			}
		});
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
						res.render('board', { 
							title : head_title, 
							subtitle: subtitle, 
							page_count: page_count, 
							now_page: req.params.page, 
							detail_path: "/data/company-data/detail/",
							results : results 
						});
					});
				}else{
					res.render('error');
				}
			
		});
});

router.get('/data/company-data/detail/:num', function(req, res, next){
	knex('ATRefer')
		.where('num', req.params.num)
		.select('num', 'title', 'content', 'createdAt')
		.then(function(results, err){
			var subtitle = "관련자료";
			console.log(results);
			res.render('detail', { subtitle: subtitle, results: results });
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
						res.render('board', { 
							title : head_title, 
							subtitle: subtitle, 
							page_count: page_count, 
							now_page: req.params.page,
							detail_path: "/data/broadcast-data/detail/", 
							results : results 
						});
					});
				}else{
					res.render('error');
				}
		});
});

router.get('/data/broadcast-data/detail/:num', function(req, res, next){
	knex('ATBroadCastRefer')
		.where('num', req.params.num)
		.select('num', 'title', 'content', 'createdAt')
		.then(function(results, err){
			var subtitle = "보도자료";
			console.log(results);
			res.render('detail', { subtitle: subtitle, results: results });
		});
});

router.get('/donation', function(req, res, next){
	res.render('m5_give');
});

/* admin */
router.get('/admin/write', function(req, res, next){
	res.render('write_content');
})

router.post('/upload_thumb', multer({ dest: '/home/ubuntu/www/public/images/board/thumb_img' }).single("thumb_img"), 
	function(req, res){
		console.log(req.body);
		console.log(req.file);
		
		if(req.file.mimetype == "image/jpeg" || req.file.mimetype == "image/png"){
			var filename = req.file.filename;
			var fullpath = "/home/ubuntu/www/public/images/board/thumb_img/" + filename;
			var thumb_path = "/images/board/thumb_img/";
			var endname;
			if(req.file.mimetype == "image/jpeg"){
				endname = ".jpg";
			}else if(req.file.mimetype == "image/png"){
				endname = ".png";
			}

			fs.rename(fullpath, fullpath+endname, function(err){
				if(err){
					res.send("err");
				}else{
					res.send(thumb_path+filename+endname);
				}
			});
		}else{
			res.send("err");
		}
	});

router.post('/upload_board', multer({ dest: '/home/ubuntu/www/public/images/board/content_img' }).single("content_img"), 
	function(req, res){
		console.log(req.body);
		console.log(req.file);
		
		if(req.file.mimetype == "image/jpeg" || req.file.mimetype == "image/png"){
			var filename = req.file.filename;
			var fullpath = "/home/ubuntu/www/public/images/board/content_img/" + filename;
			var thumb_path = "/images/board/content_img/";
			var endname;
			if(req.file.mimetype == "image/jpeg"){
				endname = ".jpg";
			}else if(req.file.mimetype == "image/png"){
				endname = ".png";
			}

			fs.rename(fullpath, fullpath+endname, function(err){
				if(err){
					res.send("err");
				}else{
					res.send(thumb_path+filename+endname);
				}
			});
		}else{
			res.send("err");
		}
	});

router.post('/regist_content', function(req, res, next){
	
	knex(req.body.category)
		.insert({
			title : req.body.title,
			thumb_img: req.body.thumbnail,
			content: req.body.content,
			createdAt: knex.fn.now(),
			updatedAt: knex.fn.now()
		}).then(function(results, err){
			console.log(results);
		});
});


module.exports = router;