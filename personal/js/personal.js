$(function () {
    let lis=$('.rezame').children('li');
    $('#dowebok').fullpage({
        sectionsColor: ['transparent', 'transparent',
            '#e4e4e4', 'rgba(255, 255, 255, .0)', 'transparent', 'transparent'],
        // 滚动速度
        scrollingSpeed: 700,
        // 默认的滚动元素数量
        normalScrollElementTouchThreshold: 5,
        // 左右滑块循环
        loopHorizontal: false,
        // 左右滑块颜色
        controlArrowColor:'#16BA9D',
        // 导航条显示
        navigation: true,
        // 内容超出后是否出现滚动条
        scrollOverflow: false,
        anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
        menu: '#menu',
        easing: 'easeInOut',


        // 页面渲染后回调
        afterRender: function () {
            //侧边导航事件
            var Tooltips = ['','简介', '个人技能', '项目经验', '自我评价'];
            $("#fp-nav ul li").each(function (index) {
                this.dataset['toggle'] = 'tooltip';
                this.dataset['placement'] = 'left';
                $(this).attr('title', Tooltips[index])
            })
            $('[data-toggle="tooltip"]').tooltip();
            $('.item1 .next-page').on('click', function () {
                $('#dowebok').fullpage.moveSectionDown();
            });
            setTimeout(function () {
                $('.content').show();
            }, 500);

            // banner
            let flag=true;
            setInterval(move,5000);
            function move() {
                if(flag){
                    flag=false;
                    let actives=$('.item1 .bg>ul>.active');
                    actives.addClass('left').delay(1000).queue(function(){
                        $(this).removeClass('left').removeClass('active').dequeue();
                        flag=true;
                    })

                    // 获取下一张图片
                    let next=actives.next();
                    if(next.length==0){
                        next=$('.item1 .bg>ul>li:first');
                    }
                    // 下一张就位
                    next.addClass('right');
                    //获取浏览器宽度，为了让图片移动时有过渡
                    next[0].offsetWidth;
                    next.removeClass('right').addClass('active')
                }
            }
        },
        // 滚动触发后结束前回调
        onLeave: function (index, nextIndex, direction) {
            if(nextIndex==5){
                $('.sky').hide();
            }else {
                $('.item5 .top').animate({'height': '50%'},400);
                $('.item5 .foot').animate({'height': '50%'},400);
            }
            switch (index) {
                case 1:
                    $('.content').hide();
                    break;
                case 2:
                    $('.item2 .controdution').animate({height:'0'},function(){
                        $('.kuai').animate({opacity:0});
                    })
                    break;
                case 3:
                    let pArr=$('.item3 .container>.content1>p');
                    pArr.css({'transform':'translate(-100%,0)'});
                    break;
                case 5:{

                }
            }
        },
        // 滚动结束后回调
        afterLoad: function (anchorLink, index) {
            // page2 2-->lis[0]
            if(index-2<0){
                index=2;
            }
            $(lis).removeClass('active');
            $(lis[index-2]).addClass('active');
            if(index==6)
                $('.pure').show();


            switch (anchorLink){
                case 'page1':
                    $('.content').show();
                    break;
                case 'page2':
                    $('.item2 .controdution').animate({height:'55%'},800,function(){
                        $('.kuai').animate({opacity:1});
                    });
                    break;
                case 'page3':
                    $('.item3 .container').css('opacity',1);
                    let pArr=$('.item3 .container>.content1>p');
                    pArr.css({'transform':'translate(-20px,0)'});
                    break;
                case 'page4':
                    $('.item4 .slide .container>.pic>li').css({display:'block'})
                        .animate({opacity:0.3},500,function(){
                            $(this).animate({opacity:1},500)
                        })
                    break;
                case 'page5':
                    setTimeout(function () {
                        $('.item5 .top').animate({'height': '18%'},400);
                        $('.item5 .foot').animate({'height': '18%'},400);
                    },500)
                    break;
            }

        },
        onSlideLeave: function (anchorLink,index,slideIndex,direction) {

        }
    });
})
