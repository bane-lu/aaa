
var download_url = '';
var CHANNEL = getUrlParam('channel') || ''

// var basePath = 'http://221.176.34.113:8761'
var basePath = 'http://117.136.240.58:8080'

// 活动暂停、下架
function activityStatus(){
  $.ajax({
    type: "get",
    // url: basePath + "/cmic_adconfiguration/app/isStop/43",    //预发布
    url: basePath + "/cmic_adconfiguration/app/isStop/91",      //正式
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
    download_url = 'http://rcsoa-nopay.zone139.com/versionmanager/download/meetyou-release/' + CHANNEL;
    // download_url = 'http://a.10086.cn/c/a/s.do?requestid=zndxzh&channelid=5410453499&cid=300011040393&gid=300011040393/';
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

  // 页面访问 插码
  function pv_set(pd){
    var appid = pd.appid;
    var label = pd.label;
    var event = "AdExposed";
    var src="http://120.197.233.121/udata/u.gif?h="+document.body.clientHeight+"&w="+document.body.clientWidth+"&ct="+new Date().getTime()+"&si="+appid+"&cu="+encodeURIComponent(window.location.host)+"&v=1.0&s=1500347894640218363&f=3&c=1428456744583&et="+event+"&lv="+ encodeURIComponent(label)+"&cp="+encodeURIComponent(window.location.href);
    // alert(src)
    $("#PV").html("<script type='text/javascript' src='"+src+"' />");  
  }

  // 点击事件 插码
  function pv_btn_set(pd){
    var appid = pd.appid;
    var label = pd.label;
    var event = pd.adEvent;
    var ru = pd.ru;
    var src="http://120.197.233.121/udata/u.gif?h="+document.body.clientHeight+"&w="+document.body.clientWidth+"&ct="+new Date().getTime()+"&si="+appid+"&cu="+encodeURIComponent(window.location.host)+"&v=1.0&s=1500347894640218363&f=4&c=1428456744583&et="+event+"&lv="+ encodeURIComponent(label)+"&cp="+ encodeURIComponent(window.location.href)+"&ru="+ encodeURIComponent(ru); 
    // alert(src)
    return src
  }

  var PDD = {};
  // 识别对应插码
  function differPV(){
    for(var i=0; i < pv_data.length; i ++){
      if(pv_data[i].channel == CHANNEL){
        PDD = pv_data[i]
        pv_set(PDD)
      }
    }
  }
  differPV()

  // 埋点
  sensors.track('marqueeOutclient_view');

  activityStatus()

  getDevice();

  //点击下载
  $(".download_btn").on("click", function (e) {

    // 点击插码
    $(".pv_btn").remove();
    $(this).parent().append('<div class="pv_btn" style="visibility: hidden"></div>')
    $(".content").find(".pv_btn").html("<script type='text/javascript' src='"+pv_btn_set(PDD)+"' />")

    // 埋点
    sensors.track('marqueeOutclient_click');
    if (isWeixin()) {
      //是微信
      e.preventDefault();
      $(".popup").show();
      $(".black").fadeIn();
    } else {
      window.location.href = download_url
    }
  })

});



