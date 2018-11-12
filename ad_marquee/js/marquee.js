
var DEVICE = phonetype();
var CHANNEL = getUrlParam('channel')||'m30100066';
var download_url = '';
var basePath = 'http://221.176.34.113:8761'
// var basePath = 'http://117.136.240.58:8080'

// 活动暂停、下架
function activityStatus(){
  $.ajax({
    type: "get",
    url: basePath + "/cmic_adconfiguration/app/isStop/43",
    // url: basePath + "/cmic_adconfiguration/app/isStop/47",
    dataType: 'json',
    success: function (res) {
      if(res.isShow == 0){
        document.getElementsByClassName("stop")[0].style.transform="translateY(0)"
        document.getElementsByClassName("pause")[0].style.display="none"
      }else if(res.isShow == 2){
        document.getElementsByClassName("pause")[0].style.transform="translateY(0)"
        document.getElementsByClassName("stop")[0].style.display="none"
      }else{
        document.getElementsByClassName("pause")[0].style.display="none"
        document.getElementsByClassName("stop")[0].style.display="none"
      }
      // isShow  0/下架   1/正常   2/暂停
    },
    error: function (res) {
    }
  });
}
activityStatus()

$(function () {
  setpoint("visitor");
  // 下载包url
  getDevice();

  //点击下载
  $(".download_btn").on("click", function (e) {
    // e.preventDefault();
    if (isWeixin()) {
      //是微信
      e.preventDefault();
      $(".popup").show();
      $(".black").fadeIn();
    } else {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        setpoint("download");
      }
      window.location.href = download_url
    }
  })

});
//判断是安卓还是ios
function getDevice() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    download_url = 'http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-release/' + CHANNEL;
  } else if (isiOS) {
    download_url = 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"'
  }
}
//埋点
function setpoint(type) {
  var device = DEVICE;
  var channel = CHANNEL;
  var phone = getPhone();
  var paramData = {
    "systemType": device,
    "channel": channel,
    "operatorType": type,
    "mobileNumber": phone
  };
  $.ajax({
    type: "get",
    url: "http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-record",
    data: $.param(paramData),
    dataType: 'json',
    success: function (res) {
    },
    error: function (res) {
    }
  });

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

//识别浏览器是否为微信
function isWeixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}



