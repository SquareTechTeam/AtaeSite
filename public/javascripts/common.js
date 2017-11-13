$(document).ready(function () {
	/* Navi Animation */	
	$('.nav-block ul li a').click(function () {
		$('.nav-block ul li a').removeClass("active");
		$(this).addClass("active");
	});
	$('.nav-block > ul > li:nth-child(1) a').click(function () {
		$('.nav-block > ul > li:nth-child(1) > a').addClass("active");
	});
	$('.nav-block > ul > li:nth-child(2) a').click(function () {
		$('.nav-block > ul > li:nth-child(2) > a').addClass("active");
	});
	$('.nav-block > ul > li:nth-child(3) a').click(function () {
		$('.nav-block > ul > li:nth-child(3) > a').addClass("active");
	});
	$('.nav-block > ul > li:nth-child(4) a').click(function () {
		$('.nav-block > ul > li:nth-child(4) > a').addClass("active");
	});
	
	
	$("nav li").hover(function () {
		$(this).addClass("over");
		},
		function () {
		$(this).removeClass("over");
		}
	);

})
