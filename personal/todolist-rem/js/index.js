$(function(){
    //判断和限制字数
    $("#text").on("keydown keyup",function(){
        var l=$(this).val().length;
        if(l>40){
            l=40;
            $(this).val(function(i,val){
                alert("字数超过限制");
                return val.slice(0,40);

            })
        }
        $(".notice span").text(function(){
            return l<10?"0"+l:l;
        });
    })
//点击提交
    $("#submit").click(function(){
        var val=$("#text").val();
        if(val==""){
            alert("请输入内容");
            return;
        }
        var data=getData();
        var date=new Date();
        var time=date.getTime();
        data.push({text:val,time,isDone:false,isStar:false});
        saveDate(data);
        alert("添加成功")
        $("#text").val("");
        $(".notice span").text("00");
        reWrite();

    })
//获取信息的函数
    function getData(){
        if(localStorage.todo){
            return JSON.parse(localStorage.todo);
        }else{
            return [];
        }
    }
//保存信息的函数
    function saveDate(data){
        localStorage.todo=JSON.stringify(data);
    }
//重绘页面的部分
    function reWrite(){
        $(".item ul").empty();
        var data=getData();
        var str1="",str2="";
        $.each(data,function(index,val){
            if(val.isDone==false){
                str1+=`<li id="${index}">
                    <input type="checkbox">
                    <p>${val.text}</p>
                    <time><i>&#xe602;</i>${time(val.time)}</time>
                `;
                if(val.isStar){
                    str1+=`<i class="active">&#xe601</i></li>`;
                }else{
                    str1+=`<i>&#xe601</i></li>`;
                }
            }else{
                str2+=`<li id="${index}">
                    <input type="checkbox">
                    <p>${val.text}</p>
                    <time><i>&#xe602;</i>${time(val.time)}</time>
                    `;
                if(val.isStar){
                    str2+=`<i class="active">&#xe601</i></li>`;
                }else{
                    str2+=`<i>&#xe601</i></li>`;
                }
            }
        })
        $(".wait ul").html(str1);
        $(".done ul").html(str2);
    }
    reWrite();
//处理时间格式的函数
    function time(ms){
        var date=new Date();
        date.setTime(ms);
        var year=date.getFullYear();
        var month=addZero(date.getMonth()+1)
        var day=addZero(date.getDate());
        var hour=addZero(date.getHours());
        var min=addZero(date.getMinutes());
        var sec=addZero(date.getSeconds());
        return year+"/"+month+"/"+day;
    }
//
    function addZero(num){
        return num<10?"0"+num:num;
    }
//关闭添加界面
    $(".close").click(function(){
        $(".add").slideUp(300);
        $(".wait").delay(200).slideDown(300);
    })
//选项卡
    $(".leftbar ul li").click(function(){
        var index=$(this).index();
        $(".item").hide().eq(index+1).show();
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
        saveDate(data);
        reWrite();
    })
//跳转到添加页面
    $(".addbtn").click(function(){
        $(".item").hide().siblings(".add").slideDown(500);
    })
//删除完成事项
    $(".clearbtn").click(function(){
        var data=getData();
        $(".done ul li").each(function(index,ele){
            if($(this).find("input").prop("checked")){
                var index=$(this).attr("id");
                data[index].isDelete=true;
            }
        })
        data=data.filter(function(ele){
            return !ele.isDelete;
        })
        saveDate(data);
        reWrite();
    })
//事件委派
    $(".wait ul").on("click","i",function(){
        var data=getData();
        var index=$(this).parent().attr("id");
        data[index].isStar=!data[index].isStar;
        saveDate(data);
        reWrite();
    })
    $(".item ul").on("click","p",function(){
        alert($(this).html());
    })
    console.log($("#text"));
})