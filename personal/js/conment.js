$(function(){
    let lisA=$('.item4 .slide .container>.pic>li>a');
    lisA.hover(function(){
        $(this).children('.mask').css({opacity:1});
    },function(){
        $(this).find('.mask').css({opacity:0});
    })

});
