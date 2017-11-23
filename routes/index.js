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


function isCallerMobile(req) {
  var ua = req.headers['user-agent'].toLowerCase(),
    isMobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(ua) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(ua.substr(0, 4));

  return !!isMobile;
}

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
							var isMobile = isCallerMobile(req);
							if(isMobile){
								res.render('index_m', { atActRows : atActRows, broadcastRows : broadcastRows, galleryRows: galleryRows });
							}else{
								res.render('index', { atActRows : atActRows, broadcastRows : broadcastRows, galleryRows: galleryRows });
							}
							
						});
				});
		});
});

router.get('/event/atae', function(req, res, next){
	res.render('event');
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
	res.render('m2_sealskull');
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
							cover : "main_img m3",
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
			res.render('detail', { 
				subtitle: subtitle, 
				cover : "main_img m3",
				results: results });
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
							cover : "main_img m3", 
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
			res.render('detail', { 
				subtitle: subtitle, 
				cover : "main_img m3",
				results: results });
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
						res.render('movie', { 
							title : head_title, 
							subtitle: subtitle, 
							page_count: page_count, 
							now_page: req.params.page, 
							results: results });
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
							cover : "main_img m4", 
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
			res.render('detail', { 
				subtitle: subtitle, 
				cover : "main_img m4",
				results: results });
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
							cover : "main_img m4", 
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
			res.render('detail', { 
				subtitle: subtitle,
				cover : "main_img m4", 
				results: results });
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