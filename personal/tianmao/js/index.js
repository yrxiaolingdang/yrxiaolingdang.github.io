/**
 * Created by Administrator on 2017/7/17.
 */
//    品牌
{
    // 选项卡
    const big = document.querySelectorAll(".pic img");
    const small = document.querySelectorAll(".sbLz1 .tuchu");
    const masks = document.querySelectorAll(".sbLz1 .mask");
    const wenzis = document.querySelector(".wenzi");
    const bl = document.querySelector(".ces img");
    const br = document.querySelector(".ce img");
    const inner = document.querySelector(".wenzi-inner");
    small.forEach(function (ele, index) {
        big[0].style.zIndex = 2;
        masks[index].style.display = "none";
        masks[0].style.display = "block";
        ele.onmouseover = function () {
            big.forEach(function (ele, index) {
                ele.style.zIndex = 1;
                ele.style.display = "none";
                masks[index].style.display = "none";

                wenzis.style.marginTop = 0;
            })
            big[index].style.zIndex = 2;
            big[index].style.display = "block";
            masks[index].style.display = "block";
            wenzis.style.marginTop = `${-index * 33}px`;
        }
    })
    br.onclick = function () {
        inner.style.marginLeft = -486 + "px";
        br.style.display = "none";
        bl.style.display = "block";
    }
    bl.onclick = function () {
        inner.style.marginLeft = 486 + "px";
        br.style.display = "block";
        bl.style.display = "none";
    }
}
//    上下
{
    const imgs = document.querySelector(".zbygnr");
    let num = 0;
    setInterval(function () {
        num++;
        if (num == 4) {
            num = 0;
        }
        imgs.style.marginTop = `${-num * 40}px`;//-num*1200+"px"
        // imgs.style.marginTop=`${-num*535}px`;//-num*535+"px"

    }, 3000)
}
//    商标
{
    const items = document.querySelectorAll(".border-r li");
    const mask = document.querySelectorAll(".zhezhao");
    items.forEach(function (ele, index) {
        ele.onmousemove = function () {
            mask[index].style.opacity = "1";
        }
        ele.onmouseout = function () {
            mask[index].style.opacity = "0";
        }
    })
}
//    轮播图
{
    const items = document.querySelectorAll(".banner-inner .item ");
    const btns = document.querySelectorAll(".btn li");
    const banner = document.querySelector(".banner");
    const colorarr = ["#FECEE3", "#930BF5", "#84CEF1", "#E8E8E8", "#E8E8E8"];
    let st;
    btns.forEach(function (ele, index) {
        clearTimeout(st);
        ele.onmousemove = function () {
            st = setTimeout(function () {
                items.forEach(function (ele, index) {
                    btns[index].classList.remove("hot");
                    items[index].classList.remove("active");
                })
                btns[index].classList.add("hot");
                items[index].classList.add("active");
                banner.style.background = colorarr[index];
                num = index;
            }, 300)
        }
    })
    let num = 0;
    let move = function () {
        num++;
        if (num == btns.length) {
            num = 0;
        }
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.remove("hot");
            items[i].classList.remove("active");
        }
        btns[num].classList.add("hot");
        items[num].classList.add("active");
        banner.style.background = colorarr[num];
    }
    let t = setInterval(move, 3000);
    banner.onmousemove = function () {
        clearInterval(t);
    }
    banner.onmouseout = function () {
        t = setInterval(move, 3000);
    }


}
//    猫头
{
    const nav = document.querySelectorAll(".nav-r li");
    const cat = document.querySelectorAll(".nav-r .head");
    nav.forEach(function (ele, index) {
        ele.onmousemove = function () {
            cat[index].style.opacity = "1";
        }
        ele.onmouseout = function () {
            cat[index].style.opacity = "0";
        }
    })
}
//    返回顶部
{
    let top = document.querySelector('.guding .t');
    let tops = document.querySelector('.bot .ding div');
    console.log(tops);
    top.onclick = function () {
        var obj = document.body.scrollTop == 0 ? document.documentElement : document.body;
        var scrollt = obj.scrollTop;
        var time = 500;
        speed = scrollt / time * 50;
        let t = setInterval(function () {
            scrollt -= speed;
            obj.scrollTop = scrollt;
            if (scrollt <= 0) {
                obj.scrollTop = 0;
                clearInterval(t);
            }
        }, 50)
    }
    tops.onclick = function () {
        var obj = document.body.scrollTop == 0 ? document.documentElement : document.body;
        var scrollt = obj.scrollTop;
        var time = 500;
        speed = scrollt / time * 50;
        let t = setInterval(function () {
            scrollt -= speed;
            obj.scrollTop = scrollt;
            if (scrollt <= 0) {
                obj.scrollTop = 0;
                clearInterval(t);
            }
        }, 50)
    }

}
//滚动事件
{
    const topbar = document.querySelector("nav");
    window.onscroll = function () {
        const obj = document.body.scrollTop == 0 ? document.documentElement :
            document.body;
        if (obj.scrollTop > 500) {
            topbar.style.top = 0;
        } else {
            topbar.style.top = "-46px";
        }
    }
}
// 跳转事件
{
    let leftbar = document.querySelector(".zuo");
    let btns = document.querySelectorAll(".bot a");
    let floors = document.querySelectorAll(".floor");
    let obj;
    let st;
    window.addEventListener("scroll", function () {
        let obj1 = document.body.scrollTop == 0 ? document.documentElement : document.body;
        if (obj1.scrollTop > 500) {
            animate(leftbar, {width: 36, height: 296}, 200);
        } else {
            animate(leftbar, {width: 0, height: 0}, 200);

        }
    })

    btns.forEach(function (value, index) {
        value.onclick = function () {
            obj = document.body.scrollTop == 0 ? document.documentElement : document.body;
            st = floors[index].offsetTop - 100;
            animate(obj, {scrollTop: st});
        }
    })

    window.addEventListener("scroll", function () {
        var colorarr = ["#EA5F8D", "#0AA6E8", "#64C333", "#F15453", "#19C8A9", "#000"];
        btns.forEach(function () {
            let obj = document.body.scrollTop == 0 ? document.documentElement : document.body;
            let st = obj.scrollTop;
            for (var i = 0; i < floors.length; i++) {
                if (st >= floors[i].offsetTop - 500) {
                    btns.forEach(function (ele) {
                        ele.style.background = "";
                    });
                    btns[i].style.background = colorarr[i];
                }
            }
        });
    })
}
// 右侧固定栏
{
    const items = document.querySelectorAll(".guding .item");
    console.log(items);
    const tips = document.querySelectorAll(".dong");
    console.log(tips);
    let st;
    items.forEach(function (ele, index) {
        hover(ele, function () {
            clearTimeout(st);
            st = setTimeout(function () {
                tips[index].classList.add("flyIn");
            }, 1000);
        }, function () {
            clearTimeout(st);
            if (tips[index].classList.contains("flyIn")) {
                tips[index].classList.add("flyOut");
            }
        })
    })
    tips.forEach(function (ele) {
        ele.addEventListener("animationend", function () {
            if (ele.classList.contains("flyOut")) {
                ele.classList.remove("flyIn");
                ele.classList.remove("flyOut");
            }
        })
    })
}
// 按序加载
(function () {
    var imgs = $("img");
    imgs.each(function (index, ele) {
        if ($(this).offset().top < $(window).height()) {
            $(this).attr("src", function () {
                return $(this).attr("data-src");
            })
        }
    });
    $(window).on("scroll", function () {
        var st = $(this).scrollTop();
        imgs.filter(function () {
            var r = $(this).attr("src");
            return !r;
        }).each(function (index, ele) {
            if ($(this).offset().top < st + $(window).height()) {
                $(this).attr("src", function () {
                    return $(this).attr("data-src");
                })
            }
        })
    })
})();
// 左侧栏
{
    lefts = document.querySelectorAll(".banner-l li");
    clk = document.querySelector(".banner-l ul .clk")
    console.log(clk)
    lefts.forEach(function (ele, index) {
        ele.onmousemove = function () {
            lefts[index].style.background = "#fff";
            clk.style.display = "block";
        }
        clk.onmousemove = function () {
            clk.style.display = "block";
        }
        ele.onmouseout = function () {
            lefts[index].style.background = "#EEE";
            clk.style.display = "none";
        }
        clk.onmouseout = function () {
            clk.style.display = "none";
        }
    })
}

















