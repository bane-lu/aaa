// ** Sensor AutoTrack Jacvscript  ** 
// ** Des 26th 2018 **

(function(para) {
  var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script',x = null,y = null;
  w['sensorsDataAnalytic201505'] = n;
  w[n] = w[n] || function(a) {return function() {(w[n]._q = w[n]._q || []).push([a, arguments]);}};
  var ifs = ['track','quick','register','registerPage','registerOnce','trackSignup', 'trackAbtest', 'setProfile','setOnceProfile','appendProfile', 'incrementProfile', 'deleteProfile', 'unsetProfile', 'identify','login','logout','trackLink','clearAllRegister','getAppStatus'];
  for (var i = 0; i < ifs.length; i++) {
    w[n][ifs[i]] = w[n].call(null, ifs[i]);
  }
  if (!w[n]._t) {
    x = d.createElement(s), y = d.getElementsByTagName(s)[0];
    x.async = 1;
    x.src = p;
    x.setAttribute('charset','UTF-8');
    y.parentNode.insertBefore(x, y);
    w[n].para = para;
  }
})({
  sdk_url: '//static.sensorsdata.cn/sdk/1.11.9/sensorsdata.min.js',
  heatmap_url: '//static.sensorsdata.cn/sdk/1.11.9/heatmap.min.js',
  name: 'sensors',
  web_url: '//cmsouth.cloud.sensorsdata.cn/',
  use_app_track: true,   // isConnect with app
  // server_url: 'http://cmsouth.datasink.sensorsdata.cn/sa?token=5709691ef0ee8ea8',  // test adress
  server_url: '//cmsouth.datasink.sensorsdata.cn/sa?project=production&token=5709691ef0ee8ea8', // product adress
  heatmap:{
    clickmap:'default',
    scroll_notice_map:'default'
  }
});
sensors.quick('autoTrack');