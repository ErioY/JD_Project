// 轮播图封装

//滑入滑出（花多长时间，让某个元素出，某个元素进）
//参数:
// outDom：出去的dom
// inDom:进来的dom
// endLeft：终点
// timeLong:时长
//返回值：无

function slide(outDom,inDom,endLeft,timeLong){
    //计算时间 间隔 和 步长
    // 已知  总时长  总距离，
    //希望平滑一下，频率就高一些，时间间隔就短一些
    let timerSpace = 5;
    let step = outDom.offsetWidth/(timeLong/timerSpace);  // 400/步数

    let currLeft = 0;
    let myTimer = setInterval(()=>{
        //一、处理数据
        //1、计算
        currLeft = currLeft-step;
        //2、边界处理
        if(currLeft<endLeft){
            currLeft = endLeft;
            clearInterval(myTimer);
        }
        //二、改变外观
        outDom.style.left = currLeft+"px";
        inDom.style.left = currLeft+outDom.offsetWidth +"px";
    },timerSpace);

}

//淡入淡出（花多长时间，让某个元素出，某个元素进）
//参数:
// outDom：出去的dom
// inDom:进来的dom
// timeLong:时长
//返回值：无

function fadeInOut(outDom,inDom,timeLong){
    //计算时间 间隔 和 步长
    // 已知  总时长  总距离，
    //希望平滑一下，频率就高一些，时间间隔就短一些
    let timerSpace = 5;
    let step = 1/(timeLong/timerSpace); 

    let currOpacity = 0;
    let myTimer = setInterval(()=>{
        //一、处理数据
        //1、计算
        currOpacity = currOpacity+step;
        //2、边界处理
        if(currOpacity>1){
            currOpacity = 1;
            clearInterval(myTimer);
        }
        //二、改变外观
        outDom.style.opacity = 1-currOpacity;
        inDom.style.opacity = currOpacity;
    },timerSpace);

}
//1、项目中有哪些类？轮播图

class Banner{
    //构造函数
    //boxDom：轮播图的容器
    constructor(boxDom,obj){
        //默认值
        let defaultObj = {
            //dom相关属性:
            imgDoms:[],//存放动态创建的img标签
            liDoms:[],//存放动态创建的li标签
            //图片属性
            width:400,
            height:300,
            imgs:["img/big-menu/1.jpg","img/big-menu/2.jpg"],
            type:"fade", //"fade,slide"
            //豆豆相关
            douColor:"rgb(217,217,217,0.5)",
            douHighColor:"rgb(255,255,255,0.8)",
            douSize:20,
            isCircle:true,
            //动态
            currIndex :0,//当前图片的下标
            timeSpace:2000,
            myTimer:null
        }
        this.boxDom = boxDom;
        for(let key in defaultObj){

            this[key] = (obj[key]==undefined?defaultObj[key]:obj[key]) ;
        }
        this.render();
        this.addEvent();
        this.autoPlay();
    }
    //方法：
    //创建dom元素的
    render(){
        //一、改变容器的样式
        this.boxDom.style.position = "relative";
        this.boxDom.style.overflow = "hidden";
        //1、创建图片的盒子及其图片
        // 1）、图片容器
        let divDom = document.createElement("div");
        divDom.style.cssText = `
            position: absolute;
            left: 0;
            top:0;
            width: 100%;
            height: 100%;
        `;
        this.boxDom.appendChild(divDom);
        //2）、图片
        for(let i in this.imgs){
            let imgDom = document.createElement("img");
            imgDom.src = this.imgs[i];
            imgDom.style.cssText = `
                position: absolute;
                left: 0;
                top:0;
                width: 100%;
                height: 100%;
            `;
            switch(this.type){
               case  "fade" : imgDom.style.opacity = 0;break;
               case  "slide" :imgDom.style.left = this.width+"px";break;
            }
            if(i=="0"){
                switch(this.type){
                    case  "fade" : imgDom.style.opacity = 1;break;
                    case  "slide" :imgDom.style.left = "0";break;
                }
            }
            divDom.appendChild(imgDom);
            this.imgDoms.push(imgDom);
        }

        //2、创建豆豆
        //1）、ul
        let ulDom = document.createElement("ul");
        ulDom.style.cssText =`
            list-style: none;
            position: absolute;
            left: ${(this.width-this.douSize*this.imgs.length*2)/2}px;
            top: ${this.height-this.douSize*2}px;
            width: 100%;
            height: 100%;
        `;
        this.boxDom.appendChild(ulDom);
        //2)、li
        for(let i in this.imgs){
            let liDom = document.createElement("li");
            liDom.style.cssText = `
                float: left;
                margin-right: ${this.douSize}px;
                width: ${this.douSize}px;
                height: ${this.douSize}px;
                background-color: ${this.douColor};
            `;
            if(this.isCircle){
                liDom.style.borderRadius="50%";
            }
            if(i=="0"){
                liDom.style.backgroundColor = this.douHighColor;
            }
            ulDom.appendChild(liDom);
            this.liDoms.push(liDom);
        }
    }

    autoPlay(){
        this.myTimer =  setInterval(()=>{
            this.goImg(this.currIndex+1);
        },this.timeSpace);
    }

    stopPlay(){
        clearInterval(this.myTimer);
    }

    goImg(index){
        //一、处理数据
        //1、计算数据
        //outIndex：离开图片的下标
        let outIndex = this.currIndex;
        this.currIndex = index;
        //2、边界处理
        if(this.currIndex>this.imgs.length-1){
            this.currIndex = 0;
        }

        //二、处理外观
        //改变图片
        switch(this.type){
            case  "fade" : fadeInOut(this.imgDoms[outIndex],this.imgDoms[this.currIndex],this.timeSpace/3);break;
            case  "slide" :slide(this.imgDoms[outIndex],this.imgDoms[this.currIndex],-1*this.width,this.timeSpace/3);break;
        }   
        //改变豆豆
        this.liDoms[outIndex].style.backgroundColor = this.douColor;
        this.liDoms[this.currIndex].style.backgroundColor = this.douHighColor;
    }

    //添加事件
    addEvent(){
        this.boxDom.onmouseover = ()=>{
            this.stopPlay();
        }

        this.boxDom.onmouseout = ()=>{
            this.autoPlay();
        }

        for(let i=0;i<this.liDoms.length;i++){
            this.liDoms[i].onclick = ()=>{
               this.goImg(i);
            }
        }
    }
}
/* ajax封装
* 功能：与后端交互
* 参数：
* 请求方式
* 请求地址
* 请求参数（前端发给后端）
* 是否异步
* 回调函数
* 返回值：无
* 
*/
function ajax_xk(obj) {
    let defaultObj = {
        method:"get",
        url:"#",
        params:"",
        isAsync:true,
        func:null
    }

    for(let key in defaultObj){
        if(obj[key]!=undefined){
            defaultObj[key] = obj[key];
        }
    }

    //1、创建对象
    let xhr = new XMLHttpRequest();

    //2、设置请求参数
    let urlAndParams = defaultObj.url;
    if(defaultObj.method.toLowerCase()=="get"){
        urlAndParams += "?"+defaultObj.params
    }

    xhr.open(defaultObj.method,urlAndParams,defaultObj.isAsync);

    //3、设置回调函数
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4 && xhr.status==200){
            defaultObj.func&&defaultObj.func(xhr.responseText);
        }
    }

    if(defaultObj.method.toLowerCase()=="post"){
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(defaultObj.params);
    }else{
        xhr.send();
    }
}
