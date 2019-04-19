$(function () {

  //识别浏览器是否为微信
  function isWeixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
      return true;
    } else {
      return false;
    }
  }

  //点击下载
  $(".download-btn").on("click", function (e) {

    if (isWeixin()) {
      //是微信
      e.preventDefault();
      $(".popup").show();
      $(".popup,.mask").fadeIn();

    } else {
      // setpoint("download");
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      // if (isiOS) {
      // }
    }
  })

});



/**
 * 图片进行预加载
 * **/
// var images = new Array();
// function preload() {
//   for (var i = 0; i < preload.arguments.length; i++) {
//     images[i] = new Image()
//     images[i].src = preload.arguments[i]
//   }
// }
//    preload(
//      'img/pic_1@2x.png',
//      'img/pic_2@2x.png',
//      'img/pic_3@2x.png'
//    )
