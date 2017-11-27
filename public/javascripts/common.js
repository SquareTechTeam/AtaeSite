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
            $('.return-top, #m_header').fadeIn();
        } else {
            $('.return-top, #m_header').fadeOut();
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

        var step1 = $(this).parent().parent().parent().hasClass("step1");
        var pass_check = true;
        if(step1){
            pass_check = false;

            //정규식
            var checked_name = /^[A-Za-z가-힣]{2,}$/;
            var checked_birth = /^[0-9]{6}$/;
            var checked_phone1 = /^\d{3,4}$/;
            var checked_phone2 = /^\d{4}$/;
            var checked_email1 = /^[A-Za-z0-9_\.\-]+/;
            var checked_email2 = /^[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
            var checked_addr = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{1,20}$/;
            var checked_jumin = /^[0-9]{7}$/;
            var checked_coperator = /^[0-9]{1,}$/;

            var checked = $("input[name='supporter']:checked").val();
            if(checked=="man"){
                var arr = new Array("man_name", "man_birth", "man_tel2", "man_tel3", "man_email", "man_email2", "man_address1", "man_address2");
                var arr_checked = new Array(checked_name, checked_birth, checked_phone1, checked_phone2, checked_email1, checked_email2, checked_addr, checked_addr);
                var arr_text = new Array("이름을", "생년월일을", "핸드폰 번호를", "핸드폰 번호를", "이메일을", "이메일을", "우편번호를", "주소를");

                if($("input[name='receipt']:checked").val() == "yes"){
                    arr.push("man_num", "man_num2");
                    arr_checked.push(checked_birth, checked_jumin);
                    arr_text.push("주민등록번호 앞자리를", "주민등록번호 뒷자리를");
                }

                for(i=0; i<arr.length; i++){
                    var arg = $("#" + arr[i]);
                    if(arr_checked[i].test(arg.val()) != true){
                        alert(arr_text[i] + " 다시 입력해주세요.");
                        arg.focus();
                        return false;
                    }
                }

                pass_check = true;
            }else{
                var arr = new Array("group_name", "group_num", "group_person", "group_tel2", "group_tel3", "group_email", "group_email2", "group_address1", "group_address2");
                var arr_checked = new Array(checked_name, checked_coperator, checked_name, checked_phone1, checked_phone2, checked_email1, checked_email2, checked_addr, checked_addr);
                var arr_text = new Array("기업명을", "사업자등록번호를", "이름을", "핸드폰 번호를", "핸드폰 번호를", "이메일을", "이메일을", "우편번호를", "주소를");

                for(i=0; i<arr.length; i++){
                    var arg = $("#" + arr[i]);
                    if(arr_checked[i].test(arg.val()) != true){
                        alert(arr_text[i] + " 다시 입력해주세요.");
                        arg.focus();
                        return false;
                    }
                }

                pass_check = true;
            }
        }

        if(pass_check){
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
        }

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

        $("." + thisStep).hide();
        var moveTop = $("." + nextStep).offset().top;
        var minusTop = $(".give-step-bar ol").height();
        $("html, body").animate({
            "scrollTop": moveTop
        }, 500);
        $("." + nextStep + " .filter").hide();
        $("." + thisStep + " .filter").animate({
            "opacity": 0
        }, 500);
        return false;
    });


    /* 후원 email form */
    $('.email_select').change(function () {
        var email = $(this).val();
        $(this).parent().find('.email_back').val(email);
        if(email.length !== 0){
            $('.email_back').attr('readonly',true);
        }else{
             $('.email_back').attr('readonly',false);
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
    $('.m_mask').on('scroll touchmove mousewheel',function(event){
        event.preventDefault();
        event.stopPropagation();
    });
    $('.m_close').click(function(){
        $('.m_mask, .m_close').hide();
        $('.m_menu').show();
        $('.m_mask > ul > li > ul').removeClass('open');
    });
    $('.m_mask > ul > li a').click(function(){
        $('.m_mask > ul > li > ul').removeClass('open');
        $(this).parent().find('ul').addClass('open');
    });

    /* 서브페이지 메뉴 */
    $('.nav-block').after().click(function(){
        var check = $(this).hasClass("close");
        if(!check){
            $('.m_mask').show();
            $(this).addClass("close");
        }else{
            $('.m_mask').hide();
            $(this).removeClass("close");
        }
    });

    /* a 태그 스크립트 문제 해결 */
    $("a[href='#'], a[href='javascript:;']").click(function(){
        return false;
    });

    /* 주소 검색 API */
    $(".add_btn").click(function(){
        daum.postcode.load(function(){
            new daum.Postcode({
                oncomplete: function(data) {
                    var checked = $("input[name='supporter']:checked").val();
                    $("#"+ checked +"_address1").val(data.zonecode);
                    $("#"+ checked +"_address2").val(data.roadAddress);
                }
            }).open();
        });
    });
});
