  // 获取服务器url
  function getBasePath(){
       var curWwwPath = window.document.location.href;
       var pathName = window.document.location.pathname;
       var pos = curWwwPath.indexOf(pathName);
       var localhostPath = curWwwPath.substring(0, pos);
       var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
       var basePath=localhostPath;
       return basePath;
  }
  var basePath = getBasePath()
  // basePath = '//221.176.34.113:8080'
  var api = {
    submitMobile: '/check_mobile/app/submitMobile/',
    checkMobile: '/check_mobile/app/checkMobile/'
  }
  // alert("version:16:41")

   //token状态
   var hasToken = 2;    // 0 拿到token 且为广东用户
   var channel = '';
  // 客户端token的拿取 */
  function getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
      var r = window.location.search.substr(1).match(reg); //匹配目标参数
      if (r != null) return r[2]; return null; //返回参数值
  }
  function getToken(){
    var token = getUrlParam("net_token")
    channel = getUrlParam("channel")
    if(channel == null){
        channel = '10086app'
    }

    if(!token){
      $(".loading").hide();
      $(".wrapper").show();
      $(".phone").show();
      $(".bottom").show();
    }else{
        var timeout_status = true;   //超时判断
        setTimeout(function(){
            if(timeout_status){
                window.location.href= "http://117.136.240.59:8080/miyoufm/error/error_timeout.html";
            }
        },10000)
        // 通过检验token测试是否为广东号码
        $.ajax({
            type:"get",
            contentType:"application/json",
            url:basePath + api.checkMobile + token,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success:function (res) {
                if(res.code == 0){
                    if(res.flag == 0){
                        //广东号码
                        hasToken = 0
                        $(".loading").hide();
                        $(".wrapper").show();
                        $(".bottom").show();
                    }else{
                        $(".loading").hide();
                        $(".wrapper").show();
                        $(".phone").show();
                        $(".bottom").show();
                    }
                }
                timeout_status = false;
            },
            error:function (res) {
                timeout_status = false;
                window.location.href= "http://117.136.240.59:8080/miyoufm/error/error_timeout.html";
            }
        });
    }
  }
  getToken();

// input获取焦点
$(".phone").focus(function(){
    $(this).attr('placeholder','');
}).blur(function(){
    if(!$(this).attr('placeholder')){
      $(this).attr('placeholder','请输入手机号');
    }
})
// 输入框限制
$('.phone').bind('input propertychange', function() {
    var that = $(this)
    if(/[^\d]/.test(that.val())){//替换非数字字符
          var temp_amount=that.val().replace(/[^\d]/g,'');
          that.val(temp_amount);
    }
    if(that.val().length > 11){
        that.val(that.val().substr(0,11));
    }
});

// 上方tip 弹窗提示
function tip(msg){
    $(".tip").find("i").text(msg);
    $(".tip").show();
    setTimeout(function(){
        $(".tip").hide();
    },1200)
}

// touchstart 点击事件
const clickEvent = (function() {
 if ('ontouchstart' in document.documentElement === true)
    return 'touchstart';
 else
    return 'click';
})();
//防多次点击

