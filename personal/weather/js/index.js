var provinces = [];
var citys = [];
var data = [];
$.ajax({
    url: "http://api.jisuapi.com/weather/city",
    data: {appkey: "868d9ecd39d452c2"},
    dataType: "jsonp",
    success: function (r) {
        data = r.result;
        provinces = $.grep(r.result, function (value, index) {
            if (value.parentid === "0") {
                return true;
            }
        });
        $.each(provinces, function (index, value) {
            $("<option>").html(value.city).val(value.cityid).appendTo("#provinces");
        });
    }
});
$("#provinces").on("change blur", function () {
    var id = $(this).val();
    citys = $.grep(data, function (value) {
        if (value.parentid === id) {
            return true;
        }
    });
    $("#citys").empty();
    $.each(citys, function (index, value) {
        $("<option>").html(value.city).val(value.city).appendTo("#citys");
    })
});
$("#citys").on("change blur", function () {
    var city = $(this).val();
    $.ajax({
        url: "http://api.jisuapi.com/weather/query",
        data: {appkey: "868d9ecd39d452c2", city: city},
        dataType: "jsonp",
        success: function (text) {
            var data = text.result;
            console.log(data)
            $("div.left p.date").html((data.date).slice(0, 4) + "年" + (data.date).slice(5, 7) + "月" + (data.date).slice(8, 10) + "日" + "&nbsp;" + data.week);
            $("div.left p.air span").html(data.aqi.aqi + data.aqi.quality);
            $("section.left p").html(data.temp);
            $("section.right p.state").html(data.weather + "（实时）");
            $("div.left .temputer span.templow").html(data.templow).parent().find("span.temphigh").html(data.temphigh);
            $("div.left div.img img").prop("src", "icon/天气图标/weathercn/" + data.img + ".png");
            $("div.left ul.info li.state").html(data.weather).parent().find("li.wind").html(data.winddirect + data.windpower + "风速" + data.windspeed);
            $.each($("ul.right>li"), function (index, v) {
                var value = index+1;
                $(this).find("p.week").html(data.daily[value].week).parent().find("p.date").html((data.daily[value].date).slice(5, 7) + "月" + (data.daily[value].date).slice(8, 10) + "日").parent().find("div.img img").prop("src", "icon/天气图标/weathercn/" + data.daily[value].day.img + ".png").parent().next().find(".temputer span.templow").html(data.daily[value].night.templow).parent().find("span.temphigh").html(data.daily[value].day.temphigh).parent().parent().find("li.state").html(data.daily[value].day.weather).parent().find(".wind").html(data.daily[value].day.winddirect + data.daily[value].day.windpower);
            });
            var canvas=document.querySelector("#canvas");
            var cobj=canvas.getContext("2d");
            cobj.beginPath();
            cobj.clearRect(0,0,900,200);
            cobj.strokeStyle="rgba(255,255,255,.3)";
            cobj.lineWidth=2;
            for(var i=5;i>0;i--){
                if(i==5){
                    cobj.moveTo(10,199);
                    cobj.lineTo(900,199);
                    cobj.stroke();
                }else {
                    cobj.moveTo(10, i * 40);
                    cobj.lineTo(900,i*40);
                    cobj.stroke();
                }
            }
            cobj.beginPath();
            cobj.strokeStyle="rgb(255,255,255)";
            cobj.fillStyle="rgb(255,255,255)";
            for(var i=0;i<24;i++){
                if(i%3===0){
                    if(i<21){
                        var y=getY(data.hourly[i].temp);
                        var x=i/3*100+50;
                        var y1=getY(data.hourly[i+3].temp);
                        var x1=(i+3)/3*100+50;
                    }
                    if(i==21){
                        var y=getY(data.hourly[i].temp);
                        var x=i/3*100+50;
                        var y1=getY(data.hourly[23].temp);
                        var x1=8*100+50;
                        cobj.fillText(data.hourly[23].temp+"℃",x1-15,y1-5);
                    }
                    cobj.moveTo(x,y);
                    cobj.lineTo(x1,y1);
                    cobj.font="16px 微软雅黑";
                    cobj.fillText(data.hourly[i].temp+"℃",x-15,y-5);
                    cobj.stroke();
                    cobj.fill();
                    $(".mgTime span").eq(i/3).html(data.hourly[i].time);
                    $(".mgTime span").eq(8).html(data.hourly[0].time);
                }
            }
            function getY(temp){
                temp=(43-temp)/6*40;
                return temp;
            }
        }
    })


});