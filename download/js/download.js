// var PDD = {};
// var DEVICE = phonetype();
// var CHANNEL = getUrlParam("channel");
// console.log(CHANNEL)
// setpoint("visitor");

//识别浏览器是否为微信
function isWeixin() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  } else {
    return false;
  }
}

// 判断插码页面
// function differPV(){
//   for(var i=0; i < pvData.length; i ++){
//     if(pvData[i].channel == CHANNEL){
//       PDD = pvData[i]
//       pv_set(PDD)
//     }
//   }
// }
// differPV()
window.download1 = function(obj) {
  // $(".pv_btn").remove();
  // $(".wrapper").append('<div class="pv_btn" style="visibility: hidden"></div>')
  // $(".wrapper").find(".pv_btn").html("<script type='text/javascript' src='"+pv_btn_set(PDD,0)+"' />")

  if (isWeixin()) {
    //是微信
    $(".popup").show();
    $(".popup,.mask").fadeIn();

  } else {

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    if (isiOS) {
      // setpoint("download");
      window.location.href = 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8'
    }else{
      // var url = 'http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-release/' + CHANNEL;
      window.location.href = 'http://a.10086.cn/c/a/s.do?requestid=zndxzh&channelid=5410453499&cid=300011040393&gid=300011040393/'
    }

  }
}
// 
$('.mask').on("click",function(){
  $(".popup").hide();
  $(".popup,.mask").fadeOut();
})



//埋点
// function setpoint(type) {
//   var device = DEVICE;
//   var channel = CHANNEL;
//   // var phone = getPhone();
//   var paramData = {
//     "systemType": device,
//     "channel": channel,
//     "operatorType": type,
//     // "mobileNumber": phone
//   };
//   // url:'http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-record',
//   $.ajax({
//     type: "get",
//     url: "http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-record",
//     // url: 'http://221.176.34.113:9000/versionmanager/download/meetyou-record',
//     data: $.param(paramData),
//     dataType: 'json',
//     success: function (res) {
//     },
//     error: function (res) {
//     }
//   });

// }
//获取手机号
// function getPhone() {
//   var phone = ''
//   $.ajax({
//     url: 'http://120.197.89.223/app/phoneget.do',
//     type: "get",
//     data: {},
//     async: false,
//     success: function (data) {
//       phone = data;
//     }
//   });
//   return phone;
// }
// /**
//  * getUrlParam   获取url传参
//  * @param name
//  * @return
//  */
// function getUrlParam(name) {
//   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//   var r = window.location.search.substr(1).match(reg);  //匹配目标参数
//   if (r != null) return r[2];
//   return null; //返回参数值
// }
/**
 * 判断手机类型
 */
// function phonetype() {
//   var ua = navigator.userAgent.toLowerCase();
//   var DEVICE = "";
//   if (/(iphone|ipod|ipad);?/i.test(ua)) {
//     DEVICE = "ios";
//   } else if (/android|adr/.test(ua) && !(/windows phone/.test(ua))) {
//     DEVICE = "android";
//   }
//   return DEVICE;
// }

// PV跟踪 插码
// function pv_set(pd){
//   var appid = pd.appid;
//   var label = pd.label;
//   var event = "AdExposed";
//   var src="http://120.197.233.121/udata/u.gif?h="+document.body.clientHeight+"&w="+document.body.clientWidth+"&ct="+new Date().getTime()+"&si="+appid+"&cu="+encodeURIComponent(window.location.host)+"&v=1.0&s=1500347894640218363&f=3&c=1428456744583&et="+event+"&lv="+ encodeURIComponent(label)+"&cp="+encodeURIComponent(window.location.href);

//   $("#PV").html("<script type='text/javascript' src='"+src+"' />");  
// }

// // 点击事件跟踪
// function pv_btn_set(pd,clickNum){
//   var appid = pd.appid;
//   var label = pd.label;
//   var event = pd.adEvent + clickNum;
//   var ru = pd.ru;
//   var src="http://120.197.233.121/udata/u.gif?h="+document.body.clientHeight+"&w="+document.body.clientWidth+"&ct="+new Date().getTime()+"&si="+appid+"&cu="+encodeURIComponent(window.location.host)+"&v=1.0&s=1500347894640218363&f=4&c=1428456744583&et="+event+"&lv="+ encodeURIComponent(label);
//   return src
// }
