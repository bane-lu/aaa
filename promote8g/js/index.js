$(function () {
    $(".activity-rule").on("touchstart", function(){
        $(".rule").show();
        $(".mask").show();
        $(".main").addClass("hidden");
    });
    $(".rule img").on("touchstart", function () {
        $(".rule").hide();
        $(".mask").hide();
        $(".main").removeClass("hidden");
    })
})