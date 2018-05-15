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
   // alert("basePath:"+basePath);

  // 客户端token的拿取 */
  function getToken(){
    var url = window.location.href; //获取url中"?"符后的字串
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
    // alert("token:"+token)
    if(!token){
      $(".wrapper").show();
      $(".phone").show();
      $(".loading").hide();
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
                console.log(res);
                $(".wrapper").show();
                $(".loading").hide();
            },
            error:function (res) {
                console.log(res);
                $(".wrapper").show();
                $(".loading").hide();
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
const Button = document.getElementsByClassName("get_btn")[0]
const clickEvent = (function() {
 if ('ontouchstart' in document.documentElement === true)
    return 'touchstart';
 else
    return 'click';
})();

var flag = true;
Button.addEventListener(clickEvent, e => {
  if(flag == true){
    $(".get_btn").addClass("get_btn_press");
    var number = $(".phone").val()
    var length = $(".phone").val().length
    if(!number || length < 11){
        tip("请输入正确的手机号");
    }else{
        flag = false;
        // 点击“点击领取8G”按钮，传递用户手机号码参数，等待接口结果返回；
        // 判断号码归属地是否为广东移动号码，
        // 当手机号码不为广东移动号码则弹出下方弹框提示“本活动仅限广东移动用户参加”，
        // 当该号码为广东移动号码则弹出右方的弹框提示。
        $.ajax({
            type:"get",
            contentType:"application/json",
            url:basePath + api.submitMobile + number,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            success:function (res) {
              if(res.code == 0){
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
              flag = true;
            }
        });
  }

    }
})
Button.addEventListener('touchend', e => {
    $(".get_btn").removeClass("get_btn_press");
})
