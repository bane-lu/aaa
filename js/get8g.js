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
   var hasToken = 2;    // 0 拿到token 且为广东用户     1  拿到token 非广东用户        2没拿到token
  // 客户端token的拿取 */
  function getToken(){
    var url = window.location.href; //获取url中"?"符后的字串
    alert(url)
    var theRequest = new Object();
    var n = url.indexOf("?")
    if (n != -1) {
        var str = url.substr(n+1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=strs[i].split("=")[1];
        }
    }
    var token = theRequest.token;
    if(!token || token == undefined){
      $(".loading").hide();
      $(".wrapper").show();
      $(".phone").show();
      $(".bottom").show();
    }else{
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
                if(res.flag == true){
                    hasToken = 0
                }else if(res.flag == false){
                    hasToken = 1
                }
                $(".loading").hide();
                $(".wrapper").show();
                $(".bottom").show();
            },
            error:function (res) {
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
var flag = true;
const get_btn = document.getElementsByClassName("get_btn")[0]

// 验证号码领8G
get_btn.addEventListener(clickEvent, e => {
  $(".get_btn").addClass("get_btn_press");
  if(!navigator.onLine){
      tip("无网络链接，请检查网络设置");
  }else if(hasToken == 0){
      $(".success").show();
      $(".success").find(".content").animate({
          transform : 'translate(-50%,-50%) scale(0.8,0.8)'
      },1000);
  }else if(hasToken == 1){
      tip("本活动仅限广东移动用户参加");
  }else if(flag == true){
      var number = $(".phone").val()
      var length = $(".phone").val().length
      if(!number || length < 11){
          tip("请输入正确的手机号");
      }else{
          flag = false;
          $.ajax({
              type:"get",
              contentType:"application/json",
              url:basePath + api.submitMobile + number,
              xhrFields: {
                  withCredentials: true
              },
              crossDomain: true,
              success:function (res) {
                if(res.flag == true){
                  $(".success").show();
                  $(".success").find(".content").animate({
                      transform : 'translate(-50%,-50%) scale(0.8,0.8)'
                  },1000);
                }else{
                  tip("本活动仅限广东移动用户参加");
                }
                flag = true;
              },
              error:function (res) {
                // 跳异常页面
                alert(res)
                flag = true;
                window.location.href= "http://117.136.240.59:8080/miyoufm/error/error_timeout.html";
              }
          });
      }

  }
})
get_btn.addEventListener('touchend', e => {
    $(".get_btn").removeClass("get_btn_press");
})

// 前往
const goto = document.getElementsByClassName("goto")[0]
goto.addEventListener(clickEvent, e => {
    // document.location = '../download/index.html'
    window.location.href= basePath + "/advertises/download/index.html"
})
// 取消
const cancel = document.getElementsByClassName("cancel")[0]
cancel.addEventListener(clickEvent, e => {
    $(".success").hide();
})
