$(document).ready(function(){
    /* Navi Animation */
    $("nav li").hover(
        function () {
            $(this).addClass("over");
        }, function () {
            $(this).removeClass("over");
        }
    );

})
