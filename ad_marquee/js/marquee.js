
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
//判断是安卓还是ios
function getDevice() {
  var u = navigator.userAgent;
  var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isAndroid) {
    download_url = 'http://a.10086.cn/c/a/s.do?requestid=zndxzh&channelid=5410453499&cid=300011040393&gid=300011040393/';
  } else if (isiOS) {
    download_url = 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"'
  }
}

//返回参数值
function getUrlParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return r[2];
  return null; 
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

$(function () {
  // 埋点
  sensors.track('marqueeOutclient_view');

  activityStatus()

  getDevice();

  //点击下载
  $(".download_btn").on("click", function (e) {
    // 埋点
    sensors.track('marqueeOutclient_click');
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



