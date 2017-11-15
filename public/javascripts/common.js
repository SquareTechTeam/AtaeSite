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

    $(".act-block .act_list img").each(function(i){
        var img = $(".act-block .act_list img:eq("+i+")"),
            imgW = img.prop('naturalWidth'),
            imgH = img.prop('naturalHeight');

        var style = (imgW > imgH) ? 'height: 100%; width: auto;' : 'width: 100%; height: auto;';

        $(".act-block .act_list img:eq("+i+")").attr("style", style);
    });
    
    $(".section-block_gallery ul li img").each(function(i){
        var img = $("section-block_gallery ul li img:eq("+i+")"),
            imgW = img.prop('naturalWidth'),
            imgH = img.prop('naturalHeight');

        var style = (imgW > imgH) ? 'height: 100%; width: auto;' : 'width: 100%; height: auto;';

        $("section-block_gallery ul li img:eq("+i+")").attr("style", style);
    });

    /* Background Wrap Show & Hide */
    $('.main-gallery a, .section-block_gallery ul li a').click(function(){
       $('.detail_photo').show();
        return false;
    });
    $('.detail_photo i, .detail_photo').click(function(){
        $('.detail_photo').hide();
        return false;
    });
});
