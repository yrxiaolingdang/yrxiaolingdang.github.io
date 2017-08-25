/**
 * Created by Administrator on 2017/7/19.
 */
//    选项卡
{
    const items = document.querySelectorAll(".item li");
    const btns = document.querySelectorAll(".btn li");
    const banner = document.querySelector(".banner");
    const left = document.querySelector(".bl");
    const right = document.querySelector(".br");
    btns.forEach(function (ele, index) {
        ele.onmousemove = function () {
            items.forEach(function (ele, index) {
                btns[index].classList.remove("hots");
                items[index].classList.remove("active");
            })
            btns[index].classList.add("hots");
            items[index].classList.add("active");
        }
    })

//    自动
    let num = 0;
    let move = function () {
        num++;
        if (num == btns.length) {
            num = 0;
        }
        if (num == -1) {
            num = btns.length - 1;
        }
        for (var i = 0; i < btns.length; i++) {
            btns[i].classList.remove("hots");
            items[i].classList.remove("active");
        }
        btns[num].classList.add("hots");
        items[num].classList.add("active");
    }
    let t = setInterval(move, 3000);
//    暂停

    banner.onmousemove = function () {
        clearInterval(t);
    }
    banner.onmouseout = function () {
        t = setInterval(move, 3000);
    }

//    左右

    right.onclick = function () {
        move();
    }
    left.onclick = function () {
        num -= 2;
        move();
    }
}
//    无缝轮播
{
    const imgs = document.querySelector(".star-box");
    const bl = document.querySelector(".explain-inner .bl");
    const br = document.querySelector(".explain-inner .br");
    let num = 0;
    let kaiguan = 1;
    let dir = "right";
    let move = function () {
        imgs.style.transition = "all 2s ease";
        if (kaiguan == true) {
            imgs.style.marginLeft = -kaiguan * 1240 + "px";
        } else {
            imgs.style.marginLeft = kaiguan * 1240 + "px";
        }
    }
    let t = setInterval(move, 3000);
    imgs.addEventListener("transitionend", function () {
        kaiguan = !kaiguan;

    })
    br.onclick = function () {
        kaiguan = true;
        imgs.style.marginLeft = -kaiguan * 1240 + "px";
    }
    bl.onclick = function () {
        kaiguan = false;
        imgs.style.marginLeft = kaiguan * 1240 + "px";
    }
}
//    无缝轮播
{
    const imgs = document.querySelector(".commend .star-inner .star-box");
    console.log(imgs);
    const bl = document.querySelector(".your .explain-inner .bl");
    console.log(bl);
    const br = document.querySelector(".your .explain-inner .br");
    console.log(br);
    let num = 0;
    let kaiguan = 1;
    let dir = "right";
    let move = function () {
        imgs.style.transition = "all 2s ease";
        if (kaiguan == true) {
            imgs.style.marginLeft = -kaiguan * 1240 + "px";
        } else {
            imgs.style.marginLeft = kaiguan * 1240 + "px";
        }
    }
    let t = setInterval(move, 3000);
    imgs.addEventListener("transitionend", function () {
        kaiguan = !kaiguan;

    })
    br.onclick = function () {
        kaiguan = true;
        imgs.style.marginLeft = -kaiguan * 1240 + "px";
    }
    bl.onclick = function () {
        kaiguan = false;
        imgs.style.marginLeft = kaiguan * 1240 + "px";
    }
}
//    选项卡
{
    let bannerbox = document.querySelectorAll(".content .content-inner .contents");
    bannerbox.forEach(function (e) {
        xiaomibanner(e);//调用封装函数
    })
    function xiaomibanner(bannerbox) {
        let prev = bannerbox.querySelector(".bl");
        let next = bannerbox.querySelector(".br");
        let now = 0;
        let banner = bannerbox.querySelector(".content .content-inner .content-box");
        let dians = bannerbox.querySelectorAll(".btns li");
        dians[0].style.cssText = "background:#fff;border-color: #ff6700";
        //点击圆点的时候图片的切换
        dians.forEach(function (ele, index) {
            ele.onclick = function () {
                let left = -index * 296;
                banner.style.left = left + "px";
                dians[now].style.cssText = "background:#b0b0b0;border-color: #fff";
                this.style.cssText = "background:#fff;border-color: #ff6700";
                now = index;
            }
        })
        next.onclick = function () {
            if (now === dians.length - 1) {
                return;
            }
            dians[now].style.cssText = "background:#b0b0b0;border-color: #fff";
            now++;
            banner.style.left = -now * 296 + "px";
            dians[now].style.cssText = "background:#fff;border-color: #ff6700";
        }
        prev.onclick = function () {
            if (now === 0) {
                return;
            }
            dians[now].style.cssText = "background:#b0b0b0;border-color: #fff";
            now--;
            banner.style.left = -now * 296 + "px";
            dians[now].style.cssText = "background:#fff;border-color: #ff6700";
        }
    }
}
//    按序加载
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
//    购物车
{
    let shop = document.querySelector(".top-r a");
    let shops = document.querySelector(".car");

    shop.onmouseover = function () {
        animate(shops, {height: 100}, 300);
        shops.style.boxShadow = "0 0 10px #ccc";
    }
    shop.onmouseout = function () {
        animate(shops, {height: 0}, 300);
    }
}
//    导航
{
    let wenziju = document.querySelectorAll('.nav-m ul li');
    console.log(wenziju)
    let chucu = document.querySelector('.chucu')
    console.log(chucu)
    wenziju.forEach(function (ele, index) {
        ele.onmouseover = function () {
            chucu.style.height = '248px';
            chucu.style.background = '#fff';
        }
        ele.onmouseout = function () {
            chucu.style.height = '0px';
        }
    })
}
//选项卡
{
    let jiadian = document.querySelectorAll(".jd ul li");
    let remen = document.querySelectorAll(".conducts .conduct-inner ul li");
    console.log(remen);
    let content = document.querySelectorAll(".electric-r ul");
    jiadian.forEach(function (ele, index) {
        ele.onmousemove = function () {
            content.forEach(function (ele, index) {
                content[index].style.zIndex = "0";
                jiadian[index].classList.remove("active");
            })
            content[index].style.zIndex = "999";
            jiadian[index].classList.add("active");
        }
    })
    remen.forEach(function (ele, index) {

    ele.onmousemove = function () {
        remen[index].classList.remove("active");
        remen[index].classList.add("active");
    }
    ele.onmouseout = function () {
        remen[index].classList.remove("active");
    }
    })
}
//banner左边
{
    lefts = document.querySelectorAll(".banner .banner-inner .banner-l ul .items");
    clk = document.querySelector(".banner-l ul .whk");
    console.log(clk)
    lefts.forEach(function (ele, index) {
        ele.onmousemove = function () {
            clk.style.display = "block";
            lefts[index].style.background = "#FF6709"
        }
        clk.onmousemove = function () {
            clk.style.display = "block";
        }
        ele.onmouseout = function () {
            clk.style.display = "none";
            lefts[index].style.background = "#000"
        }
        clk.onmouseout = function () {
            clk.style.display = "none";
            lefts[index].style.background = "#000"
        }
    })
}

