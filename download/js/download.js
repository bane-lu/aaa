window.download1 = function(obj) {
  if (isWeixin()) {
    //是微信
    $(".popup").show();
    $(".popup,.mask").fadeIn();

  } else {

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isiOS) {
      window.location.href = 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8'
    }else{
      // var url = 'http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-release/' + CHANNEL;
      window.location.href = 'http://a.10086.cn/c/a/s.do?requestid=zndxzh&channelid=5410453499&cid=300011040393&gid=300011040393/'
    }

  }
}

$('.mask').on("click",function(){
  $(".popup").hide();
  $(".popup,.mask").fadeOut();
})

//识别浏览器是否为微信
function isWeixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

