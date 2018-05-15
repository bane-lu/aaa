$(function () {
  // var DEVICE = phonetype();
  // var CHANNEL = getUrlParam("channel");

  //window.location.href = 'meetyou://'; 
  setpoint("visitor");

  //判断是安卓还是ios
  function getDevice() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isAndroid) {
      console.log("sdf");
      var url = 'http://221.176.34.113:9000/versionmanager/download/meetyou-release/channel=downloadTest';
      // var url = 'http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-release/' + CHANNEL;
      $(".download-btn a").attr('href', url);
    } else if (isiOS) {
      $(".download-btn a").attr("href", 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8');
      // setpoint("download");
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

  if (isWeixin()) {
    //是微信
    $('.pg_bg').css({
      top: 0.6 + 'rem'
    })
  }
  //点击下载
  $(".download-btn").on("click", function (e) {
    // e.preventDefault();
    $(".download-btn").addClass('btn-press');
    if (isWeixin()) {
      //是微信
      e.preventDefault();
      $(".popup").show();
      $(".popup,.mask").fadeIn();
      document.addEventListener('touchmove', function (event) {

        event.preventDefault();

      })
    } else {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        setpoint("download");
      }
    }

  })

});
var DEVICE = phonetype();
var CHANNEL = getUrlParam("channel");
//埋点
function setpoint(type) {
  var device = DEVICE;
  var channel = CHANNEL;
  var phone = getPhone();
  // alert(phone);
  var paramData = {
    "systemType": device,
    "channel": channel,
    "operatorType": type,
    "mobileNumber": phone
  };
  // url:'http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-record',
  $.ajax({
    type: "get",
    // url: "http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-record",
    url: 'http://221.176.34.113:9000/versionmanager/download/meetyou-record',
    data: $.param(paramData),
    dataType: 'json',
    success: function (res) {
      // alert("success")
      console.log(res);
    },
    error: function (res) {
      console.log(res);
      // alert("error")
    }
  });

}
//获取手机号
function getPhone() {
  var phone = ''
  $.ajax({
    url: 'http://120.197.89.223/app/phoneget.do',
    type: "get",
    data: {},
    async: false,
    success: function (data) {
      phone = data;
    }
  });
  return phone;
}
/**
 * getUrlParam   获取url传参
 * @param name
 * @return
 */
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return r[2];
  return null; //返回参数值
}
/**
 * 判断手机类型
 */
function phonetype() {
  var ua = navigator.userAgent.toLowerCase();
  var DEVICE = "";
  if (/(iphone|ipod|ipad);?/i.test(ua)) {
    DEVICE = "ios";
  } else if (/android|adr/.test(ua) && !(/windows phone/.test(ua))) {
    DEVICE = "android";
  }
  return DEVICE;
}
