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
        if (isAndroid) {
            var url = 'http://a.10086.cn/c/a/s.do?requestid=zndxzh&channelid=5410453499&cid=300011040393&gid=300011040393/';
            $(".head-wrapper a").attr('href', url);
            $(".bottom-wrapper a").attr('href', url);
        } else if (isiOS) {
            if(isWeixin()){
                $(".head-wrapper a").attr("href", 'https://a.app.qq.com/o/simple.jsp?pkgname=com.cmic.college');
                $(".bottom-wrapper a").attr("href", 'https://a.app.qq.com/o/simple.jsp?pkgname=com.cmic.college');
            }else{
                $(".head-wrapper a").attr("href", 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"');
                $(".bottom-wrapper a").attr("href", 'itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"');
            }
        }
    }
    getDevice();

    //点击下载
    $(".head-button,.bottom-button").on("click", function (e) {
        if (isWeixin()) {
            //是微信
            e.preventDefault();
            $(".popup").show();
            $(".popup,.mask").fadeIn();

        }
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