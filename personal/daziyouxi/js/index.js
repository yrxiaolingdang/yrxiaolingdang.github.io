/**
 * Created by Administrator on 2017/7/28.
 */
window.onload=function(){
    let start=document.querySelector("#start");
    let left=document.querySelector(".left");
    let scor=document.querySelector("#score");
    let state=document.querySelector("#state");
    let life=document.querySelector("#life");
    let stop=document.querySelector("#stop");
    let phb=document.querySelectorAll(".phb span");
    class Game{
        constructor(left,scor,state,life,phb){
            this.left=left;
            this.scor=scor;
            this.state=state;
            this.life=life;
            this.flag=true;
            this.height=window.innerHeight;
            this.bestScor=localStorage.scor? JSON.parse(localStorage.scor):[];
            this.phb=phb;
            this.updatephb();
        }
        _int(){
            this.lifenum=5;
            this.num=3;
            this.obj={};
            this.scornum=0;
            this.speed=5;
            this.statenum=1;
            this.st=null;
            this.scor.innerHTML=0;
            this.state.innerHTML=1;
            this.life.innerHTML=5;
            this.left.innerHTML="";
        }
        start(){
            this._int();
            for(var i=0;i<this.num;i++){
                this._creatLetter();
            }
            this._move();
            this._keydown();
        }
        _creatLetter(){
            let newdiv=document.createElement("div");
            newdiv.className="letter";
            do {
                let randomNum = Math.floor(Math.random() * 26 + 65);
                var randomLetter = String.fromCharCode(randomNum);
            }while(this.obj[randomLetter]);
            do {
                var randomLeft = Math.random() * 720;
                var randomTop=-Math.random()*50;
            }while (this._checkLetter(randomLeft,randomTop));
            this.obj[randomLetter]={left:randomLeft,ele:newdiv,top:randomTop};
            newdiv.style.left=randomLeft+"px";
            newdiv.style.top=randomTop+"px";
            // newdiv.innerHTML=randomLetter;
            newdiv.style.backgroundImage=`url(img/${randomLetter}.png)`;
            this.left.appendChild(newdiv);
        }
        _checkLetter(left,top){
            for(let i in this.obj){
                if(left>this.obj[i].left-80&&left<this.obj[i].left+80&&top>this.obj[i].top-100&&top<this.obj[i].top+100){
                    return true;
                }
            }
        }
        _move(){
            this.st=setInterval(function () {
                for(let i in this.obj){
                    let top=this.obj[i].ele.offsetTop;
                    top+=this.speed;
                    this.obj[i].ele.style.top=top+"px";
                    if(top>(this.height-110)){
                        this.lifenum--;
                        this.life.innerHTML=this.lifenum;
                        this.left.removeChild(this.obj[i].ele);
                        delete this.obj[i];
                        this._creatLetter();
                        if(this.lifenum==-1){
                            clearInterval(this.st);
                            return this._gameover();
                        }
                    }
                }
            }.bind(this),60);
        }
        _keydown(){
            this.keydownHandler=function(e){
                let kc=e.keyCode;
                let letter=String.fromCharCode(kc);
                if(this.obj[letter]){
                    this.left.removeChild(this.obj[letter].ele);
                    delete this.obj[letter];
                    this._creatLetter();
                    this.scornum++;
                    this.scor.innerHTML=this.scornum;
                    if(this.scornum%10===0){
                        this._upstate();
                    }
                }
            }.bind(this);
            document.addEventListener("keydown",this.keydownHandler);
        }
        _upstate(){
            this.statenum++;
            this.state.innerHTML=this.statenum;
            if(this.statenum<=3){
                this._creatLetter();
            }else {
                this.speed++;
            }
        }
        _gameover(){
            alert(`游戏结束，得分${this.scornum}`);
            if(this.bestScor.length<3 || this.scornum>this.bestScor[2].scor){
                let name;
                do{
                    name=prompt("请输入姓名");
                }while(name==="");
                this.bestScor.push({name,scor:this.scornum});
                this.bestScor.sort(function(a,b){
                    if(a.scor>b.scor){
                        return -1;
                    }else{
                        return 1;
                    }
                })
                if(this.bestScor.length>3){
                    this.bestScor.pop();
                }
                this.updatephb();
                localStorage.scor=JSON.stringify(this.bestScor);
            }
            this._int();
            clearInterval(this.st);
            this.flag=true;
        }
        updatephb(){
            this.bestScor.forEach(function(v,i){
                this.phb[i].innerHTML=v.name+"-"+v.scor;
            }.bind(this))
        }
        pause(){
            clearInterval(this.st);
            document.removeEventListener("keydown",this.keydownHandler);
        }
        run(){
            this._move();
            document.addEventListener("keydown",this.keydownHandler);
        }
    }
    let game=new Game(left,scor,state,life,phb);
    start.onclick=function () {
        if(game.flag){
            game.flag=false;
            game.start();
        }
    }
    let flag=true;
    stop.onclick=function () {
        if(flag){
            game.pause();
            this.innerHTML="继续";

        }else {
            game.run();
            this.innerHTML="暂停";
        }
        flag=!flag;
    }
}
