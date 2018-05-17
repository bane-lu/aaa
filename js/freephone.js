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
// 上方tip 弹窗提示
// alert("version:15:26")
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

// 立即参与
const get_btn = document.getElementsByClassName("get_btn")[0]
get_btn.addEventListener(clickEvent, e => {
  $(".get_btn").hide();
  $(".get_btn_press").show();
  // document.location = '../download/index.html'
})
get_btn.addEventListener('touchend', e => {
    $(".get_btn_press").hide();
    $(".get_btn").show();
    window.location.href= basePath + "/advertises/download/index.html?channel"+ channel
    // window.location.href= "http://feixin.10086.cn/miyou?channel"+ channel
})
