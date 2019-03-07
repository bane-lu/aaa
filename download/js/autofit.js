// 处理fullpage底部遮挡
var w = 0,
    h = 0;
var timer = setInterval(function(){
  var _w = document.documentElement.clientWidth || document.body.clientWidth;
  var _h = document.documentElement.clientHeight || document.body.clientHeight;
  if(_w != w || _h != h){
    w = _w;
    h = _h;
    // console.log(w+"/"+h)
  }
},100)
// clearInterval(timer)

var ua = navigator.userAgent.toLowerCase();
// console.log(typeof(ua))
var isAndroid = ua.indexOf('android') > -1 || ua.indexOf('adr') > -1; //android终端
// var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
// console.log("UA:"+ua)
if(isAndroid){
  if(ua.indexOf("huawei") > -1){
    if(ua.indexOf("mqqbrowser") > -1){
    }
  }
}


//计算div间距 

$(window).load(function(){
    var $win = $(window);
    $("<p class='temp' style='float:left;width: 100%;height: 0.8rem;'></p>").insertAfter(".des-txt");
    var titleY = $(".page2").find(".title").offset().top; 
    var desTxtY = $(".page2").find(".des-txt").offset().top; 
    var tempY = $(".page2").find(".temp").offset().top; 
    var bottomPicY = $(".page2").find(".center-pic").offset().top; 
    var winHeight = $win.height();
    
    var titleHeight = desTxtY - titleY;
    var desTxtHeight = tempY - desTxtY;
    var blackHeight = bottomPicY - tempY;

    // console.log(titleHeight+"/"+desTxtHeight+"/"+blackHeight)
    if(blackHeight > 0){
      $(".title").css('margin-top',blackHeight*0.4+'px')
    }else{
      $(".title").css('margin-top','0px');
    }
    $(".temp").remove();
    // $(".bg-dot").css('margin-top',blackHeight*0.3+'px')


    $win.scroll(function () {

    });
    
})

// console.log(str.indexOf("mqqbrowser") != -1)
// iphone6s 414/736=0.578
// iphoneX 375/812=0.462
// honor9自带  360/616= 0.58
// mozilla/5.0 (linux; u; android 8.0.0zh-cn; 
// stf-al00 build/huaweistf-al00) 
// applewebkit/537.36 
// (khtml, like gecko)version/4.0 
// chrome/57.0.2987.132 
// mqqbrowser/8.1 mobile safari/537.36

// honor9weixin  360/568= 0.58
// honor9  360/519 = 0.69

// --------兼容华为
// 

// BLA是Mate10 Pro的内部代号，全名是Blanc；
// AL指的是全网通，一般从00编号，一般都是AL00，荣耀系列还会有AL01、AL02的。
// 
// S8+型号是SM- G9550。它是三星galaxy S8+列里面的全网通，支持电信联通移动4G/3G/移动2G网络/联通2G网络。

// S8系列包含S8 4G版G9500（公开版），S8 4G+版G9508（移动优先版）和S8+ G9550三款。