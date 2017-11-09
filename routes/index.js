var express = require('express');
var router = express.Router();
var config = require('../config.json');

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
  res.render('index', { title: 'Express' });
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
	knex('ATBizActivity')
		.select('*')
		.then(function(results, err){
			console.log(err);
			res.json(results);
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
