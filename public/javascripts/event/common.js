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
});
