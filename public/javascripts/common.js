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
    if($(".slider").hasClass("slider") === true){
        $('.slider').bxSlider({
            mode: 'fade',
            captions: true,
            captions: true,
            auto: true,
            speed: 300,
            pause: 4000
        });
    }

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
    $(".section-block_gallery ul li img").each(function (i) {
        var img = $(".section-block_gallery ul li img:eq(" + i + ")"),
            imgW = img.prop('naturalWidth'),
            imgH = img.prop('naturalHeight');

        var style = (imgW > imgH) ? 'height: 100%; width: auto;' : 'width: 100%; height: auto;';

        $(".section-block_gallery ul li img:eq(" + i + ")").attr("style", style);
    });

    $(".board_wrap .board_data img").each(function (i) {
        var img = $(".board_wrap .board_data img:eq(" + i + ")"),
            imgW = img.prop('naturalWidth'),
            imgH = img.prop('naturalHeight');

        var style = (imgW > imgH) ? 'height: 100%; width: auto;' : 'width: 100%; height: auto;';

        $(".board_wrap .board_data img:eq(" + i + ")").attr("style", style);
    });

    $(".section-block_gallery ul li img").each(function (i) {
        var img = $("section-block_gallery ul li img:eq(" + i + ")"),
            imgW = img.prop('naturalWidth'),
            imgH = img.prop('naturalHeight');

        var style = (imgW > imgH) ? 'height: 100%; width: auto;' : 'width: 100%; height: auto;';

        $("section-block_gallery ul li img:eq(" + i + ")").attr("style", style);
    });

    /* Background Wrap Show & Hide */
    $('.main-gallery a').click(function(){
        var imgData = $(this).parent().css("background-image").split("\"")[1];
        $(".detail_photo img").attr("src", imgData);

        $('.detail_photo').show();
        var imgH = $(".main-gallery img")[0].height;
        if (imgH > 700) {
            $(".photo_item").addClass("limit");
        } else {
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
    $(".give-wrap .next_btn").click(function () {
        var thisStep = $(this).parent().parent().parent().attr("class").split(" ")[1];
        var nextStep = "";
        if (thisStep == "step1") {
            nextStep = "step2";
        } else if (thisStep == "step2") {
            nextStep = "step3";
        } else {
            return false;
        }

        $("." + nextStep).show();
        var moveTop = $("." + nextStep).offset().top;
        var minusTop = $(".give-step-bar ol").height();
        $("html, body").animate({
            "scrollTop": moveTop
        }, 500);
        $("." + thisStep + " .filter").show();
        $("." + thisStep + " .filter").animate({
            "opacity": 0.6
        }, 500);
        return false;
    });
    
    
    $(".give-wrap .cancel_btn").click(function () {
        var thisStep = $(this).parent().parent().parent().attr("class").split(" ")[1];
        var nextStep = "";
        if (thisStep == "step3") {
            nextStep = "step2";
        } else if (thisStep == "step2") {
            nextStep = "step1";
        } else {
            return false;
        }

        $("." + nextStep).show();
        var moveTop = $("." + nextStep).offset().top;
        var minusTop = $(".give-step-bar ol").height();
        $("html, body").animate({
            "scrollTop": moveTop
        }, 500);
        $("." + thisStep + " .filter").show();
        $("." + thisStep + " .filter").animate({
            "opacity": 0.6
        }, 500);
        return false;
    });


    /* 후원 email form */
    $('.email_select').change(function () {
        var email = $(this).val();
        $(this).parent().find('.email_back').val(email);
        console.log("현재 선택된 값은 : " + email);
        console.log("현재 선택된 값의 길이는 : " + email.length);
        if(email.length !== 0){
            $('.email_back').attr('readonly',true);
            console.log('맞을경우');
        }else{
             $('.email_back').attr('readonly',false);
            console.log('아닐경우');
        }

    });

    /* 후원하기 구분 radio 클릭 */
    $('#group').click(function(){
        $('.sup_kind1').hide();
        $('.sup_kind2').show();
    });
    $('#man').click(function(){
        $('.sup_kind2').hide();
        $('.sup_kind1').show();
    });
    $('#man_receipt_yes').click(function(){
        $('.man_num').show();
    });
    $('#man_receipt_no').click(function(){
        $('.man_num').hide();
    });
    
    /* 후원하기 페이지 Slider */
    if($(".give-slider_main").hasClass("give-slider_main") === true){
        $('.give-slider_main').bxSlider({
            mode: 'fade',
            captions: true,
            captions: true,
            auto: true,
            speed: 300,
            pause: 4000,
            pagerCustom: '#bx-pager'
        });
        $('.m_nav_menu > div').click(function(){
            $('.m_nav_menu > ul').show();
        });
    }

    /* ================= 모바일 페이지 ================= */
    $('.m_menu').click(function(){
        $('.m_mask').slideDown();
        $('.m_menu').hide();
        $('.m_mask, .m_close').show();
    });
    $('.m_close').click(function(){
        $('.m_mask, .m_close').hide();
        $('.m_menu').show();
    });
    $('.m_mask > ul > li a').click(function(){
        $('.m_mask > ul > li > ul').removeClass('open');
       $(this).parent().find('ul').addClass('open');
        
    });
    
});


    