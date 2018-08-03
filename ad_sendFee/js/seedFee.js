// 
// var basePath = 'http://192.168.185.250:' + '8385'
var basePath = getBasePath() + ':8385'
console.log(basePath)
function activityStatus(){
  $.ajax({
    type: "get",
    url: basePath + "/cmic_adconfiguration/app/isStop/20",
    dataType: 'json',
    success: function (res) {
      if(res.isShow == 0){
        document.getElementsByClassName("stop")[0].style.transform="translateY(0)"
      }else if(res.isShow == 2){
        document.getElementsByClassName("pause")[0].style.transform="translateY(0)"
      }else{

      }
      // isShow  0/下架   1/正常   2/暂停
    },
    error: function (res) {
      // console.log(res);
      // alert("error")
    }
  });
}
activityStatus()

// PV跟踪 插码
function pv_set(pd){
  var appid = pd.appid;
  var label = pd.label;
  var event = "AdExposed";
  var src="http://120.197.233.121/udata/u.gif?h="+document.body.clientHeight+"&w="+document.body.clientWidth+"&ct="+new Date().getTime()+"&si="+appid+"&cu="+encodeURIComponent(window.location.host)+"&v=1.0&s=1500347894640218363&f=3&c=1428456744583&et="+event+"&lv="+ encodeURIComponent(label)+"&cp="+encodeURIComponent(window.location.href);

  $("#PV").html("<script type='text/javascript' src='"+src+"' />");  
  // alert(src)
}

// 点击事件跟踪
function pv_btn_set(pd){
  var appid = pd.appid;
  var label = pd.label;
  var event = pd.adEvent;
  var ru = pd.ru;
  var src="http://120.197.233.121/udata/u.gif?h="+document.body.clientHeight+"&w="+document.body.clientWidth+"&ct="+new Date().getTime()+"&si="+appid+"&cu="+encodeURIComponent(window.location.host)+"&v=1.0&s=1500347894640218363&f=4&c=1428456744583&et="+event+"&lv="+ encodeURIComponent(label)+"&cp="+ encodeURIComponent(window.location.href)+"&ru="+ encodeURIComponent(ru); 
  // alert(src)
  return src
}

// 添加渠道号
function add_channel(){
  for(var i=0; i < channel_data.length; i ++){
    if(channel_data[i].activity == ACTIVITY){
      return channel_data[i].channel
    }
  }
}

var DEVICE = phonetype();
var PDD = {};
var ACTIVITY = getUrlParam('activity') || '';
var CHANNEL = add_channel()||'m30100087';

// 判断插码页面
function differPV(){
  for(var i=0; i < pv_data.length; i ++){
    if(pv_data[i].activity == ACTIVITY){
      PDD = pv_data[i]
      pv_set(PDD)
    }
  }
}
differPV()

$(function () {
  //window.location.href = 'meetyou://'; 
  setpoint("visitor");
  // 下载包url
  var url = '';
  getDevice();
  //点击下载
  $(".get_btn").on("click", function (e) {
    // console.log(pv_btn_set())
    $(".pv_btn").remove();
    $(this).parent().append('<div class="pv_btn" style="visibility: hidden"></div>')
    $(".wrapper").find(".pv_btn").html("<script type='text/javascript' src='"+pv_btn_set(PDD)+"' />")
    if (isWeixin()) {
      //是微信
      e.preventDefault();
      $(".popup").show();
      $(".popup,.mask").fadeIn();
    } else {
      var u = navigator.userAgent;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        setpoint("download");
      }
    }
  })

});
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
    url: "http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-record",
    // url: 'http://221.176.34.113:9000/versionmanager/download/meetyou-record',
    data: $.param(paramData),
    dataType: 'json',
    success: function (res) {
      // alert("success")
      // console.log(res);
    },
    error: function (res) {
      // console.log(res);
      // alert("error")
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
//判断是安卓还是ios
function getDevice() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    // var url = 'http://221.176.34.113:9000/versionmanager/download/meetyou-release/' + CHANNEL;
    var url = 'http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-release/' + CHANNEL;
    $(".get_btn").attr('href', url);
  } else if (isiOS) {
    $(".get_btn").attr("href", 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"');
    // setpoint("download");
  }
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

function getBasePath() {
  var curWwwPath = window.document.location.href;
  var pathName = window.document.location.pathname;
  var pos = curWwwPath.indexOf(pathName);
  var localhostPath = curWwwPath.substring(0, pos);
  var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
  var basePath=localhostPath;
  return basePath;
}