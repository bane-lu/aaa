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
            // ios8或者8以上
            isIOS9 = true
        }
        else {
            isIOS = true
        }
    }
    console.log(isAndroid,isIOS,isIOS9)
    return { isAndroid, isIOS, isIOS9 }
}
// 判断手机上是否安装了app，如果安装直接打开url，如果没安装，执行callback
var timeout;
function openApp(url, callback) {
    let { isAndroid, isIOS, isIOS9 } = detectVersion()
    if (isAndroid || isIOS) {
        var t = 3000, hasApp = true;
        var openScript = setTimeout(function () {
            if (!hasApp) {
                callback && callback()
            }
            document.body.removeChild(ifr);
        }, 3000)

        var t1 = Date.now();
        var ifr = document.createElement("iframe");
        ifr.setAttribute('src', url);
        ifr.setAttribute('style', 'display:none');
        document.body.appendChild(ifr);

        timeout = setTimeout(function () {
            var t2 = Date.now();
            if (t2 - t1 < t + 100) {
                if(isIOS){
                    window.location.href='itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"'
                }
                hasApp = false;
            }
        }, t);
    }

    if (isIOS9) {
        window.location.href = url;
        timeout = setTimeout(function () {
            callback && callback();
            window.location.href='itms-apps://itunes.apple.com/cn/app/%E5%AF%86%E5%8F%8B%E5%9C%88/id1266608463?mt=8"'
        }, 3000);
        // setTimeout(function () {
        //     // location.reload();
        // }, 1000);


    }

}


function stopTime () {

    document.addEventListener('visibilitychange', function () {
        var isHidden = document.hidden;
        if (isHidden) {
            //document.title = '当焦点不在当前窗口时的网页标题';
            clearTimeout(timeout);
        } else {
            //document.title = '再变回来或者做点其他的';
        }
    });
};
stopTime();

function getParams(param) {
    var sHref = window.location.href;
    var args = sHref.split("?");
    var retval = "";
    if (args[0] == sHref) {
    return retval;
    }
    var str = args[1];
    args = str.split("&");
    for (var i = 0; i < args.length; i++) {
    str = args[i];
    var arg = str.split("=");
    if (arg.length <= 1) continue;
    if (arg[0] == param) retval = arg[1];
    }
    return retval;
};
var type = getParams('type');
var appInterface = getParams('appInterface')
console.log(type);
console.log(appInterface);
var appEncode = {};
if(type){
    if(appInterface){
        appEncode = JSON.stringify({t:type,link:appInterface});
    }else{
        appEncode = JSON.stringify({t:type});
    }
}else{
    appEncode = '';
};
var base = new Base64();
appEncode = base.encode(appEncode);
var appUrl = "meetyou://" + appEncode;
try{
    openApp(appUrl)
}catch(err){
    console.log('拉起失败')
}

