$(function () {
    $(".activity-rule").on("touchstart", function(){
        $(".rule").show();
        $(".mask").show();
        $(".main").addClass("hidden");
        
        $(".main").height($(".main").height() + 1);
        window.scrollTo(0, 1);
    });
    $(".rule img").on("touchstart", function () {
        $(".rule").hide();
        $(".mask").hide();
        $(".main").removeClass("hidden");
        $(".main").height($(".main").height() - 1);
        window.scrollTo(0, 0);
    })
    $("..rule .details").on("touchstart",function(){
        window.scrollTo(0, 1);
    })
})