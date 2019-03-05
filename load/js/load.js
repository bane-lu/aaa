// 滑动轮播实现
var aLi = document.querySelectorAll(".box li");
var box = document.querySelector('.box');
var wrap = document.querySelector('.wrap');
var aLiWidth = box.offsetWidth;
console.log('aLiWidth: ' + aLiWidth)
wrap.style.height = aLi[0].offsetHeight + 'px';
// 设置盒子的宽度
box.style.width = aLi.length*100 + '%';
for(var i=0;i<aLi.length;i++){
    aLi[i].style.width = 1/aLi.length * 100 + '%';
};
// 初始化手指坐标点
var startPoint = 0;
var startEle = 0;
//手指按下
wrap.addEventListener("touchstart",function(e){
    startPoint = e.changedTouches[0].pageX;
    startEle = box.offsetLeft;
});
//手指滑动
wrap.addEventListener("touchmove",function(e){
    var currPoint = e.changedTouches[0].pageX;
    var disX = currPoint - startPoint;
    var left = startEle + disX;
    box.style.left = left + 'px';
});
//当手指抬起的时候，判断图片滚动离左右的距离，当
wrap.addEventListener("touchend",function(e){
    var left = box.offsetLeft;
    // 判断正在滚动的图片距离左右图片的远近，以及是否为最后一张或者第一张
    var currNum = Math.round(-left/aLiWidth);
    currNum = currNum>=(aLi.length-1) ? aLi.length-1 : currNum;
    currNum = currNum<=0 ? 0 : currNum;
    box.style.left = -currNum*wrap.offsetWidth + 'px';
})