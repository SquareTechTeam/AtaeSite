$(document).ready(function(){
    if($(".main .btn").css("position") === "fixed"){
        $("#container").scroll(function(){
            if($(this).scrollTop() > 0){
                $(".main .btn").show(300);
            }else{
                $(".main .btn").hide(300);
            }
        });
    }
});
