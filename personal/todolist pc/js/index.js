/**
 * Created by Administrator on 2017/8/11.
 */
$("#text").on("keydown keyup", function () {
    console.log($("#text"));
    var l = $(this).val().length;
    if (l > 40) {
        l = 40;
        alert("字数已经超过限制");
        $("this").val(function () {
            return $(this).val.slice(0, 40);
        })
    }
    $(".notice span:first-child").text(function () {
        return l < 10 ? "0" + l : l;
    })
});
$("#submit").click(function () {
    var val=$("#text").val();
    console.log($("#text"));
    if(val===""){
        alert("请输入内容之后在再提交");
        return;
    }
    var data = getData();
    var date=new Date();
    var time=date.getTime();//毫秒
    data.push({text:val,time,isDone:false,isStar:false,isDelete:false});
    saveData(data);
    $("#text").val("");
    $(".notice span:first-child").text("00");
});
//关闭添加界面
$(".cancle").click(function () {
    $(".add").slideUp(500);
    $(".wait").delay(500).slideDown(1000);
});
//获取信息的函数
function getData() {
    if (localStorage.todo) {
        return JSON.parse(localStorage.todo);
    } else {
        return [];
    }
}
//保存信息的函数
function saveData(data) {
    localStorage.todo = JSON.stringify(data);
}
//重绘页面
function reWrite() {
    $(".item ul").empty();
    var data = getData();
    var str1 = "",str2 = "";
    $.each(data, function (index, value) {
        if (value.isDone === false) {
            str1 += `<li id="${index}">
                    <input type="checkbox">
                    <p>${value.text}</p><time>${time(value.time)}</time>`
                    ;
            if(value.isStar){
                str1+="<i class='active'>&#xe602;</i></li>"
            }else{
                str1+="<i>&#xe602;</i></li>"
            }
        } else {
            str2 += `<li id="${index}">
                    <input type="checkbox">
                    <p>${value.text}</p>
                    <time>${time(value.time)}</time>`;
            if(value.isStar){
                str2+="<i class='active'>&#xe602;</i></li>"
            }else{
                str2+="<i>&#xe602;</i></li>"
            }
        }
    })
    $(".wait ul").html(str1);
    $(".done ul").html(str2);
}
reWrite();
//处理时间格式的函数
function time(ms) {
    var date = new Date();
    date.setTime(ms);
    var year = date.getFullYear();
    var month = addZero(date.getMonth() + 1);
    var day = addZero(date.getDate());
    var hour = addZero(date.getHours());
    var min = addZero(date.getMinutes());
    var sec = addZero(date.getSeconds());
    return year + "/" + month + "/" + day + "/" + hour + "/" + min+"/"+sec;
}
time();
function addZero(num) {
    return num < 10 ? "0" + num : num;
}
//选项卡
$(".leftbar ul li").click(function(){
    $(".add").hide();
    var index=$(this).index();
    $(".item").hide().eq(index).show();
})
//移动到已完成
$(".movebtn").click(function(){
    var data=getData();
    $(".wait ul li").each(function(index,ele){
        if($(this).find("input").prop("checked")){

            var index=$(this).attr("id");
            data[index].isDone=true;
        }
    })
    saveData(data);
    reWrite();
})
//删除已完成事件
$(".clearbtn").click(function(){
    $(".done ul li").each(function(index,ele){
        if($(this).find("input").prop("checked")){
            var data=getData();
            var index=$(this).attr("id");
            data[index].isDelete=true;
        }

    })
    data=data.filter(function(ele) {
        return !ele.isDelete;
    })
    saveData(data);
    reWrite();
})
//跳转到添加页面
$(".addbtn").click(function(){
    $(".item").hide().siblings(".add").slideDown();
})
$(".wait ul").on("click","i",function(){
    var data=getData();
    var index=$(this).parent().attr("id");
    data[index].isStar=!data[index].isStar;
    saveData(data);
    reWrite();
})