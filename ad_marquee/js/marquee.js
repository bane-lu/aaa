$(function () {
  //window.location.href = 'meetyou://'; 
  setpoint("visitor");

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

  var DEVICE = phonetype();
  var CHANNEL = 'm30100066';
  // 下载包url
  var url = ''
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
        console.log(res);
      },
      error: function (res) {
        console.log(res);
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

  // 禁止弹窗时背景图滚动
  $(".rule").click(function(){
    $(".black").show();
    $(".rulePop").animate({
      opacity:1
    },200).css("display","block")
    $("body").css("position","fixed");
  });
  $(document).on("click",".close",function(){
    $(".black").hide();
    $(".rulePop").animate({
      opacity:0
    },200).css("display","none")
    $("body").css("position","relative");
  });

  //点击下载
  $(".download_btn").on("click", function (e) {
    // e.preventDefault();
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


