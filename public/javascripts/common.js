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
});
