//适配div间距 
$(window).load(function(){

  var $win = $(window);
  if(ratio >0.56){
    fitMedium()
  }else{
    fitMax()
  }

  function fitMedium(){
    // 首屏
    var spaceLength = $(".page1").find(".bottom-pic").offset().top 
                      - $(".half-top").offset().top 
                      - $(".half-top").height()
                      - $(".des-pic").height()
    console.log(spaceLength)
    if(spaceLength < 0){
      var bottomDistance = $(".page1").find(".bottom-pic").height() + spaceLength*0.5 + 'px'
      $(".des-pic").css({
        'bottom': bottomDistance,
      })
    }else{
      var bottomDistance = $(".page1").find(".bottom-pic").height() + spaceLength*0.5 + 'px'
      $(".des-pic").css({
        'bottom': bottomDistance,
      })
    }
    

    $("<p class='temp' style='float:left;width: 100%;height: 0.8rem;'></p>").insertAfter(".des-txt");
    var titleY = $(".page2").find(".title").offset().top; 
    var desTxtY = $(".page2").find(".des-txt").offset().top; 
    var tempY = $(".page2").find(".temp").offset().top; 
    var bottomPicY = $(".page2").find(".center-pic").offset().top;
    
    var titleHeight = desTxtY - titleY;
    var desTxtHeight = tempY - desTxtY;
    var blackHeight = bottomPicY - tempY;

    if(blackHeight > 0){
      $(".title").css('margin-top',blackHeight*0.6+'px')
    }else{
      $(".title").css('margin-top','0px');
    }
    $(".temp").remove();    
  }

  // 兼容iphoneX等长屏手机
  function fitMax(){
    // 首屏
    // console.log($(".half-top").offset().top)
    // console.log($(".half-top").height())
    // console.log($(".des-pic").height())
    // console.log($(".page1").find(".bottom-pic").offset().top)
    var spaceLength = $(".page1").find(".bottom-pic").offset().top 
                      - $(".half-top").offset().top 
                      - $(".half-top").height()
                      - $(".des-pic").height()
    // console.log(spaceLength)
    var bottomDistance = $(".page1").find(".bottom-pic").height() + spaceLength*0.5 + 'px'
    $(".des-pic").css({
      'bottom': bottomDistance,
    })

    // 三张轮播图
    $(".center-pic").css({
      'bottom':$(".page2").find(".x-bottom-pic").height() + 'px',
    });

    var centerPicY = $(".page2").find(".center-pic").offset().top -$win.height();
    
    var distance = centerPicY - $(".page2").find(".title").height() - $(".page2").find(".des-txt").height()
    console.log(distance)

    if(distance <= 0){
      $(".center-pic").css({
        'bottom':$(".page2").find(".x-bottom-pic").height() -distance + 'px',
      });
      $(".title").css({
        'margin-top': '0px' ,
      });
    }else{
      $(".title").css({
        'margin-top': distance*0.75 +'px' ,
      });
    }
    $(".title").css({
      'margin-top': distance*0.75 +'px' ,
    });
    $(".temp").remove(); 

  }

})

