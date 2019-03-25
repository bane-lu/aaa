$(function () {
    //判断是安卓还是ios
    function getDevice() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            var url = 'http://a.10086.cn/c/a/s.do?requestid=zndxzh&channelid=5410453499&cid=300011040393&gid=300011040393/';
            $(".head-wrapper a").attr('href', url);
            $(".bottom-wrapper a").attr('href', url);
        } else if (isiOS) {
            $(".head-wrapper a").attr("href", 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"');
            $(".bottom-wrapper a").attr("href", 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"');
        }
    }

    getDevice();


    //识别浏览器是否为微信
    function isWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    // 点击效果
    $('.btn-wrapper').on('touchstart',function(){
        $('.btn-wrapper a').css('opacity','0.7')
    })
    $('.btn-wrapper').on('touchend',function(){
        $('.btn-wrapper a').css('opacity','1')
    })
    $('.buoy-wrapper').on('touchstart',function(){
        $('.buoy-wrapper a').css('opacity','0.7')
    })
    $('.buoy-wrapper').on('touchend',function(){
        $('.buoy-wrapper a').css('opacity','1')
    })
    //点击下载
    $(".head-button,.bottom-button").on("click", function (e) {
        if (isWeixin()) {
            //是微信
            e.preventDefault();
            $(".popup").show();
            $(".popup,.mask").fadeIn();

        }
    })    

});

// // 浮标显示与隐藏
// $(window).load(function(){
//     var $win = $(window);
//     var itemOffsetTop = $(".btn-wrapper").offset().top;
//     var itemOuterHeight = $(".btn-wrapper").outerHeight();
//     var winHeight = $win.height();
//     $win.scroll(function () {
//         var winScrollTop = $win.scrollTop();
//         if(!(winScrollTop > itemOffsetTop+itemOuterHeight)&&!(winScrollTop < itemOffsetTop-winHeight)) {
//             $(".buoy").hide();
//         } else{
//             $(".buoy").show();
//         }
//     });
// })

// 遮罩层点击消失
$('.mask').on("click",function(){
    $('.popup,.mask').fadeOut();
})