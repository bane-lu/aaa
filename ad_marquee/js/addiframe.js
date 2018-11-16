//获取url参数值
function getUrlParamString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
    var r = window.location.search.substr(1).match(reg); 
    if (r != null) return unescape(r[2]); 
    return null;
}

//添加iframe
function iframeShow(src) {
	$(document.body).append('<iframe width="0" height="0" frameborder=0 src="'+ src +'" style="position: absolute; top:0; left: 0; width: 0; height: 0; display: none; opacity: 0;"></iframe>');
}

/*function iframeShow(src) {
    $(document.body).eq(0).append('<div style="position: relative; background-color: #fff; height: 50px; overflow: hidden"><iframe width="0" height="0" frameborder=0 src="'+ src +'" id="iframeBox" style="width: 100%; height: 100px; display: block;"></iframe><div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 10"></div></div>');
    var iframeObj = document.getElementById('iframeBox');
    $('html, body').scrollTop(0);
    iframeObj.onload = function(){ 
        $('html, body').scrollTop(0);
    };            
}*/

//获取参数值,必须要在授权之前调用
initIframeParam();

/**
 * 初始化参数值<br/>
 * 需要在活动授权之前调用<br/>
 * 也就是登录之前调用一次
 */
function initIframeParam(){
	console.log('initIframeParam');
	var iframetype = getUrlParamString('jkcode');
	if(iframetype){
		sessionStorage.iframetype = iframetype;
	}
}

/***
 * 微信端添加iframe
 */
function webcatAddiframeUrl(){
	if(sessionStorage.iframetype&&sessionStorage.iframetype.indexOf('e')!=-1){
		return;
	}
	var addiframeTimeout = setTimeout(function(){//延迟添加iframe
		try{
			console.log(sessionStorage.iframetype);
			if(sessionStorage.iframetype){
				// console.log('setTimeout webcatAddiframeUrl add');
				// if(sessionStorage.iframetype.indexOf('a')!=-1){
				// 	iframeShow('http://wx.10086.cn/website/alreadyService/index/new');
				// 	console.log("webcat-addiframe-a:true");
				// }
				// if(sessionStorage.iframetype.indexOf('b')!=-1){
				// 	iframeShow('http://wx.10086.cn/website/fareBalance/index/new');
				// 	console.log("webcat-addiframe-b:true");
				// }
				if(sessionStorage.iframetype.indexOf('c')!=-1){
					iframeShow('http://wx.10086.cn/website/serviceMargin/index/new');
					console.log("webcat-addiframe-c:true");
				}
				if(sessionStorage.iframetype.indexOf('d')!=-1){
					iframeShow('http://wx.10086.cn/website/personalHome/new/index');
					console.log("webcat-addiframe-d:true");
				}
			}else{//默认已订购
				iframeShow('http://wx.10086.cn/website/alreadyService/index/new');
				console.log("webcat-addiframe-a:true");
			}
		}catch(e){
			console.log(e);
		}
		window.clearTimeout(addiframeTimeout);
	}, 1000);
}

/***
 * app端添加iframe
 * @param iframedataUrl 获取鉴权数据的接口地址
 */
function appAddiframeUrl(iframedataUrl){
	if(sessionStorage.iframetype&&sessionStorage.iframetype.indexOf('e')!=-1){
		return;
	}
	var addiframeTimeout = setTimeout(function(){//延迟添加iframe
		try{
			console.log('setTimeout appAddiframeUrl');
			if(sessionStorage.iframetype){
				console.log('setTimeout appAddiframeUrl add');
				$.getJSON(iframedataUrl, function (data) {
					if(data && data.mobileEncode && data.signEncode && data.timestamp && data.sourceCode){
						if(sessionStorage.iframetype.indexOf('a')!=-1){
							iframeShow('http://wx.10086.cn/website/alreadyService/index/new?sourceCode='+data.sourceCode+'&mobile='+data.mobileEncode+'&sign='+data.signEncode+'&timestamp='+data.timestamp);
							console.log("app-addiframe-a:true");
						}
						if(sessionStorage.iframetype.indexOf('b')!=-1){
							iframeShow('http://wx.10086.cn/website/fareBalance/index/new?sourceCode='+data.sourceCode+'&mobile='+data.mobileEncode+'&sign='+data.signEncode+'&timestamp='+data.timestamp);
							console.log("app-addiframe-b:true");
						}
						if(sessionStorage.iframetype.indexOf('c')!=-1){
							iframeShow('http://wx.10086.cn/website/serviceMargin/index/new?sourceCode='+data.sourceCode+'&mobile='+data.mobileEncode+'&sign='+data.signEncode+'&timestamp='+data.timestamp);
							console.log("app-addiframe-c:true");
						}
						if(sessionStorage.iframetype.indexOf('d')!=-1){
							iframeShow('http://wx.10086.cn/website/personalHome/new/index?sourceCode='+data.sourceCode+'&mobile='+data.mobileEncode+'&sign='+data.signEncode+'&timestamp='+data.timestamp);
							console.log("app-addiframe-d:true");
						}
					}
				});
			}else{//默认已订购
				$.getJSON(iframedataUrl, function (data) {
					if(data && data.mobileEncode && data.signEncode && data.timestamp && data.sourceCode){
						iframeShow('http://wx.10086.cn/website/alreadyService/index/new?sourceCode='+data.sourceCode+'&mobile='+data.mobileEncode+'&sign='+data.signEncode+'&timestamp='+data.timestamp);
						console.log("app-addiframe-a:true");
					}
				});
			}
		}catch(e){
			console.log(e);
		}
		window.clearTimeout(addiframeTimeout);
	}, 1000);
}