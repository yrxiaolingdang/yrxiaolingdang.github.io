$(function(){
    let a=$('.mokuai').children('li');
    let nn=[90,90,80,80];
    a.hover(function(){
        $(this).find('p').hide();
        $(this).find('canvas').css('opacity',1);
        let canvas=$(this).find('canvas');
        let pan=canvas[0].getContext('2d');
        percentage(canvas[0],pan,nn[$(this).index()]);
    },function(){
        $(this).find('p').show();
        $(this).find('canvas').css('opacity',0);
    })

    function percentage(c,ctx,number){
        let n=0,num=number;
        let t;
        ctx.lineWidth=c.width*0.05;
        ctx.lineCap='round';
//    设置字体
        ctx.font=`bold ${c.width/8}px sans-serif`;
        ctx.textAlign='center';
        ctx.textBaseline='middle';
//    创建线性渐变
        let gradient=ctx.createLinearGradient(0,0,c.width,0);
        gradient.addColorStop('0','#ffffff');
        gradient.addColorStop('0.5','#49C9DE');
        gradient.addColorStop('1','#ffffff');

        function fn(){
            n++;
            if(n==num){
                cancelAnimationFrame(fn);
            }else{
                t=requestAnimationFrame(fn);
            }
            // 清除画布
            ctx.clearRect(0,0,500,500);
            //给文本设置渐变样式
            ctx.fillStyle=gradient;
            ctx.fillText(`${n}%`,c.width/2,c.width/2);
            //开始绘画
            ctx.beginPath();
            let hudu=(n*360/100-90)*Math.PI/180;
            ctx.arc(c.width/2,c.width/2,c.width/3,-Math.PI/2,hudu,false);
            //给弧线设置渐变样式
            ctx.strokeStyle=gradient;
            ctx.stroke();
        }
        fn();
    }
});
