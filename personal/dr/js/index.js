//变色
{
let colors=document.querySelectorAll("a");
colors.forEach(function(ele,index){
    ele.onmousemove=function(){
        colors[index].style.color="#c57d5c"
    }
    ele.onmouseout=function(){
        colors[index].style.color="#8d8d8d"
    }
})
}
//全国店铺
{
    let shopbtn=document.querySelector("a.drmember_shopBtn");
    let shops=document.querySelector(".dr_member-ipxl");
    shopbtn.onmouseover=function(){
        shops.style.display="block";
    }
    shopbtn.onmouseout=function(){
        shops.style.display="none";
    }
}
//轮播图
{
    //选项卡
    const items=document.querySelectorAll(".dr_bannerul li");
    const btns= document.querySelectorAll(".drbanner_xd li");
    const banner=document.querySelector(".dr_banner");
    const left=document.querySelector("#drbanPrev");
    const right=document.querySelector("#drbanNext");
    console.log(left,right)
    btns.forEach(function(ele,index){
        ele.onmousemove=function(){
            items.forEach(function(ele,index){
                btns[index].classList.remove("hot");
                items[index].classList.remove("active");
            })
            btns[index].classList.add("hot");
            items[index].classList.add("active");
        }
    })
//    自动
    let num=0;
    let move=function(){
        num++;
        if(num==btns.length){
            num=0;
        }
        if(num==-1){
            num=btns.length-1;
        }
        for(var i=0;i<btns.length;i++){
            btns[i].classList.remove("hot");
            items[i].classList.remove("active");
        }
        btns[num].classList.add("hot");
        items[num].classList.add("active");
    }
    let t=setInterval(move,3000);
//    暂停
    banner.onmousemove=function(){
        clearInterval(t);
    }
    banner.onmouseout=function(){
        t=setInterval(move,3000);
    }
   // 左右
    right.onclick=function(){
        move();
    }
    left.onclick=function(){
        num-=2;
        move();
    }
}

