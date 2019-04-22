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
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isWeixin()) {
      //是微信
      e.preventDefault();
      // $(".popup").show();
      // $(".popup,.mask").fadeIn();
      if(isiOS){
        window.location.href = "https://a.app.qq.com/o/simple.jsp?pkgname=com.cmic.college"; 
      }else{
        $(".popup").show();
        $(".popup,.mask").fadeIn();
      }
    } else {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

      if (isiOS) {
        window.location.href = 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8'
      } else {
        // var url = 'http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-release/' + CHANNEL;
        window.location.href = 'http://a.10086.cn/c/a/s.do?requestid=zndxzh&channelid=5410453499&cid=300011040393&gid=300011040393/'
      }
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
