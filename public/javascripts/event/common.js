$(document).ready(function(){
    if($(".main .btn a").css("position") === "fixed"){
        $("#container").scroll(function(){
            if($(this).scrollTop() > 0){
                $(".main .btn a").show(300);
            }else{
                $(".main .btn a").hide(300);
            }
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
});
