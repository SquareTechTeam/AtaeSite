$(document).ready(function(){
    if($(".main .btn a").css("position") === "fixed"){
        $("#container").scroll(function(){
            if($(this).scrollTop() > 0){
                $(".main .btn a").show(300);
            }else{
                $(".main .btn a").hide(300);
            }
        });
    }else{
        $(document).scroll(function(){
            if ($(this).scrollTop() > $(".main-box").height()) {
                $('.header').addClass('open');
            } else {
                $('.header').removeClass('open');
            }
        });
    }
});
