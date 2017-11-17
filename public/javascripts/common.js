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

    /* Main Slider */
    $('.slider').bxSlider({
        mode: 'fade',
        captions: true,
        captions: true,
        auto: true,
        speed: 300,
        pause: 4000
    });

    /* Scroll Button */
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.return-top').fadeIn();
        } else {
            $('.return-top').fadeOut();
        }
    });

    $('.return-top').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 50);
        return false;
    });

    /* Gallery Img Crop */
    $(".section-block_gallery ul li img").each(function(i){
        var img = $(".section-block_gallery ul li img:eq("+i+")"),
            imgW = img.prop('naturalWidth'),
            imgH = img.prop('naturalHeight');

        var style = (imgW > imgH) ? 'height: 100%; width: auto;' : 'width: 100%; height: auto;';

        $(".section-block_gallery ul li img:eq("+i+")").attr("style", style);
    });

    $(".board_wrap .board_data img").each(function(i){
        var img = $(".board_wrap .board_data img:eq("+i+")"),
            imgW = img.prop('naturalWidth'),
            imgH = img.prop('naturalHeight');

        var style = (imgW > imgH) ? 'height: 100%; width: auto;' : 'width: 100%; height: auto;';

        $(".board_wrap .board_data img:eq("+i+")").attr("style", style);
    });

    $(".section-block_gallery ul li img").each(function(i){
        var img = $("section-block_gallery ul li img:eq("+i+")"),
            imgW = img.prop('naturalWidth'),
            imgH = img.prop('naturalHeight');

        var style = (imgW > imgH) ? 'height: 100%; width: auto;' : 'width: 100%; height: auto;';

        $("section-block_gallery ul li img:eq("+i+")").attr("style", style);
    });

    /* Background Wrap Show & Hide */
    $('.main-gallery a').click(function(){
        var imgData = $(this).parent().css("background-image").split("\"")[1];
        $(".detail_photo img").attr("src", imgData);

       $('.detail_photo').show();
       var imgH = $(".main-gallery img")[0].height;
       if(imgH > 700){
           $(".photo_item").addClass("limit");
       }else{
           $(".photo_item").removeClass("limit");
       }
        return false;
    });
    $('.section-gallery ul li a').click(function(){
        var imgSrc = $(this).find("img").attr("src");
        var imgAlt = $(this).find("img").attr("alt");
        $(".detail_photo img").attr("src", imgSrc);
        $(".detail_photo img").attr("alt", imgAlt);

       $('.detail_photo').show();
       var imgH = $(".section-gallery ul li img")[0].height;
       if(imgH > 700){
           $(".photo_item").addClass("limit");
       }else{
           $(".photo_item").removeClass("limit");
       }
        return false;
    });
    $('.detail_photo i, .detail_photo').click(function(){
        $('.detail_photo').hide();
        return false;
    });

    /* Give Step Animation */
    $(".give-wrap .btn").click(function(){
        var thisStep = $(this).parent().parent().attr("class").split(" ")[1];
        var nextStep = "";
        if(thisStep=="step1"){
            nextStep = "step2";
        }else if(thisStep=="step2"){
            nextStep = "step3";
        }else{
            return false;
        }

        $("." + nextStep).show();
        var moveTop = $("." + nextStep).offset().top;
        var minusTop = $(".give-step-bar ol").height();
        $("html, body").animate({
            "scrollTop" : moveTop
        }, 500);
        $("." + thisStep + " .filter").show();
        $("." + thisStep + " .filter").animate({
            "opacity" : 0.6
        }, 500);

        return false;
    });
});
