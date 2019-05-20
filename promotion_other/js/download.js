$(function () {
    //识别浏览器是否为微信
    function isWeixin() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
            return true;
        } else {
            return false;
        }
    }

    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //判断是安卓还是ios
    function getDevice() {
        if (isiOS){
            document.getElementById('url-copy').innerHTML = 'itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"'
            if (isWeixin()) {
                $(".head-wrapper a").attr("href", 'https://a.app.qq.com/o/simple.jsp?pkgname=com.cmic.college');
                $(".bottom-wrapper a").attr("href", 'https://a.app.qq.com/o/simple.jsp?pkgname=com.cmic.college');
            } else {
                $(".head-wrapper a").attr("href", 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"');
                $(".bottom-wrapper a").attr("href", 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"');
            }
        }else{
            // var url = 'http://a.10086.cn/c/a/s.do?requestid=zndxzh&channelid=5410453499&cid=300011040393&gid=300011040393/';
            var url = 'http://117.136.240.99/apk/meetyou_V3.4.0_official_2019-05-05_340_jiagu_sign.apk';
            $(".head-wrapper a").attr('href', url);
            $(".bottom-wrapper a").attr('href', url);
            document.getElementById('url-copy').innerHTML = 'http://117.136.240.99/apk/meetyou_V3.4.0_official_2019-05-05_340_jiagu_sign.apk'
        }

    }
    getDevice();
    function Toast(params){
        var argus = params
        /**
         * @param message 文本内容
         * @param duration 持续时间
         */
        // 确保上一次的 TimeOut 已被清空
        var toastNode = document.getElementById('toastWaka');
        if (toastNode) {
            // console.error('上次toast未清除干净!');
            return;
        }
    
        var toastNode = document.createElement('section');
        var divNode = document.createElement('div');
        var textNode = document.createElement('span');
    
        textNode.setAttribute("class","text")
        textNode.style.borderRadius = "0.2rem";
        textNode.style.verticalAlign = "center";
        textNode.style.color = "#fff";
        divNode.style.verticalAlign = "middle";
        textNode.style.fontSize="0.32rem";
        textNode.style.wordWrap ="break-word";
    
        divNode.style.display = "inline-block";
        divNode.style.padding = "0 0.25rem";
        divNode.style.height = "0.8rem";
        divNode.style.lineHeight = "0.8rem";
        divNode.style.borderRadius = "0.5rem";
        divNode.style.textAlign = "center";
        divNode.style.backgroundColor="rgba(0, 0, 0, 0.5)";
    
        toastNode.id = 'toastWaka'; // 设置id，一个页面有且仅有一个Toast
        // toastNode.style.display = 'none';   
        toastNode.style.position = 'fixed';   
        toastNode.style.width = '90%';   
        toastNode.style.left = "50%";   
        toastNode.style.transform = "translateX(-50%)";   
        toastNode.style.webkitTransform = "translateX(-50%)";   
        toastNode.style.textAlign = "center";   
        toastNode.style.bottom = "1.8rem";
        toastNode.style.fontSize = "0px";      
        toastNode.style.zIndex = 99999;   
    
        divNode.appendChild(textNode);
        toastNode.appendChild(divNode);
        document.body.appendChild(toastNode);
        
        if (!params.message) {
            console.error('message 不能为空!');
            return;
        }
    
        textNode.innerHTML = params.message || '';
    
        // 不传的话默认1.8s
        
        var hideTimeOut = setTimeout(function () {
            toastNode.style.display = 'none';
            toastNode.parentNode.removeChild(toastNode)
            hideTimeOut = null
        }, params.duration || 1800);
     
    };

    //点击下载
    $(".head-button,.bottom-button").on("click", function (e) {
        // if (isWeixin()) {
        //     if(!isiOS){
        //         //是微信
        //         e.preventDefault();
        //         $(".popup").show();
        //         $(".popup,.mask").fadeIn();
        //     }
        // }
        e.preventDefault();
        // var urlObject = document.getElementById('url-copy')
        // console.log(urlObject);
        // urlObject.select()
        var range = document.createRange();
        range.selectNode(document.getElementById('url-copy'));
        var selection = window.getSelection();
        if (selection.rangeCount > 0) selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');
        Toast({
            message: "复制成功！"
        });
    })
    
    function detectVersion() {
        let isAndroid, isIOS, isIOS9, version,
            u = navigator.userAgent,
            ua = u.toLowerCase();
        console.log(ua);
        if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {   //android终端或者uc浏览器
            //Android系统
            isAndroid = true
        }
    
        if (ua.indexOf("like mac os x") > 0) {
            //ios
            var regStr_saf = /os [\d._]*/gi;
            var verinfo = ua.match(regStr_saf);
            version = (verinfo + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
        }
        var version_str = version + "";
        console.log(version);
        if (version_str != "undefined" && version_str.length > 0) {
            version = parseInt(version)
            console.log(version);
            if (version >= 8) {
                // ios9以上
                isIOS9 = true
            }
            else {
                isIOS = true
            }
        }
        return { isAndroid, isIOS, isIOS9 }
    }
    // 判断手机上是否安装了app，如果安装直接打开url，如果没安装，执行callback
    function openApp(url, callback) {
        let { isAndroid, isIOS, isIOS9 } = detectVersion()
        if (isAndroid || isIOS) {
            var timeout, t = 4000, hasApp = true;
            var openScript = setTimeout(function () {
                if (!hasApp) {
                    callback && callback()
                }
                document.body.removeChild(ifr);
            }, 5000)
    
            var t1 = Date.now();
            var ifr = document.createElement("iframe");
            ifr.setAttribute('src', url);
            ifr.setAttribute('style', 'display:none');
            document.body.appendChild(ifr);
    
            timeout = setTimeout(function () {
                var t2 = Date.now();
                if (t2 - t1 < t + 100) {
                    hasApp = false;
                }
            }, t);
        }
    
        if (isIOS9) {
            location.href = url;
            setTimeout(function () {
                callback && callback()
            }, 250);
            // setTimeout(function () {
            //     // location.reload();
            // }, 1000);
    
    
        }
    }
    openApp("meetyou://")
    
});

// 遮罩层点击消失
$('.mask').on("click",function(){
    $('.popup,.mask').fadeOut();
})