window.onload = function() {
    // 显示隐藏的地区
    function display(ele, show) {
        $(ele).css("display", show);
    }
    function placeCss(ele, bgc, border) {
        $(ele).css({
            "background": bgc,
            "border-top": border
        });
    }
    $("#head-top .place").mouseover(() => {
        display("#hidden-area", "block");
        placeCss("#head-top .place", "#fff");
        placeCss("#hidden-area", "", "none");
        $("#hidden-area").mouseover(() => { 
            display("#hidden-area", "block");
            placeCss("#head-top .place", "#fff");
            placeCss("#hidden-area", "", "none");
        });
    });
    $("#head-top .place").mouseout(() => {
        display("#hidden-area", "none");
        placeCss("#head-top .place", "#e3e4e5");
        $("#hidden-area").mouseout(() => { 
            display("#hidden-area", "none");
            placeCss("#head-top .place", "#e3e4e5");
        });
    });
    // class ShowHidden {
    //     constructor(boxDom, obj) {
    //         // 默认值
    //         let defaultObj = {
    //             events: "mouseover",
    //             ele: boxDom
    //         }
    //         this.boxDom = boxDom;
    //         for(let key in defaultObj){
    //             this[key] = (obj[key] == undefined ? defaultObj[key] : obj[key]) ;
    //         }
    //         this.addEvent();
    //     }
    //     // 事件处理函数
    //     addEvent() {
    //         this.boxDom.mouseover(() => { 
    //             this.ele.display = "block";
    //         });
    //         this.boxDom.mouseout(() => {
    //             this.ele.display = "none";
    //         });
    //     }
    // }
    // $(function() {
    //     new ShowHidden($("#head-top .place"), {
    //         events: "mouseover",
    //         ele: $("#hidden-area")
    //     });
    // })

    let banner1 = new Banner(
        document.getElementById("slide1"),
        {
            width: 590,
            height: 470,
            timeSpace: 4000,
            imgs:["img/banner1/1.jpg", "img/banner1/2.jpg", "img/banner1/3.jpg", "img/banner1/4.jpg", "img/banner1/5.jpg", "img/banner1/6.jpg", "img/banner1/7.jpg", "img/banner1/8.jpg"],
            douSize: 8,
            douColor: "rgb(217,217,217,0.5)",
            douHighColor: "rgb(255,255,255,0.8)"
        } 
    );
    let banner2 = new Banner(
        document.getElementById("slide2"),
        {
            width: 200,
            height: 260,
            timeSpace: 2000,
            type:"slide",
            imgs:["img/banner2/banner2-1.jpg", "img/banner2/banner2-2.jpg"],
            douSize: 6,
            douColor: "#999999",
            douHighColor: "#e1251b"
        } 
    );
    let banner3 = new Banner(
        document.getElementById("slide3"),
        {
            width: 270,
            height: 260,
            type:"slide",
            timeSpace: 3000,
            imgs:["img/core2/banner_discover-1.jpg", "img/core2/banner_discover-2.jpg", "img/core2/banner_discover-3.jpg"],
            douSize: 6,
            douColor: "#999999",
            douHighColor: "#e1251b"
        } 
    );
    let imgW = $("#good-bannerlist ul img").outerWidth();
    $("#good-bannerlist ul").html($("#good-bannerlist ul").html() + $("#good-bannerlist ul").html()).css("width", imgW * $("#good-bannerlist ul img").length);
    var timer = setInterval(scrollImg, 1500);
    function scrollImg() {
        $("#good-bannerlist ul").velocity({
            "left": "-=" + imgW
        }, {
            "duration": 700,
            "complete": function() {
                if ($("#good-bannerlist ul").position().left <= -$("#good-bannerlist ul").outerWidth() / 2) {
                    $("#good-bannerlist ul").css("left", 0); 
                }
            }
        });
    }
    $("#good").hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(scrollImg, 1500);
    });

}
/*
*  淘宝商品搜索关键字接口
*  1. 请求方式：get
*  2. 请求地址：https://suggest.taobao.com/sug?code=utf-8&q=' + sVal + '&_ksTS=1515120676355_323&callback=t&area=c2c&bucketid=15; 
*  请求参数：q:搜索的关键字；callback：回调函数
* 4. 返回数据的格式：
*/
let queryStr = $("#searchTxt");
let $ul = $("#search-list");
queryStr.keyup(function() {
    let scriptDom = document.createElement("script");
    scriptDom.src = 'https://suggest.taobao.com/sug?code=utf-8&q=' + this.value + '&_ksTS=1515120676355_323&callback=fn&area=c2c&bucketid=15';
    document.body.appendChild(scriptDom);
    scriptDom.remove();
});
// callback:回调函数
function fn(data) {
    // console.log(data);
    let htmlStr = "";
    data.result.forEach(item => {
        htmlStr += `<li><a href="">${item[0]}</a></li>`;
    });
    $ul.html(htmlStr);

}

/** 
 * 楼层导航
*/
let min_height = $("#section-bottom").offset().top;
let $scroll = 0;
// 触发滚动事件
$(window).on("scroll", function () {
    $scroll = $(this).scrollTop();
    // 楼层导航的显示
    if ($scroll >= min_height) {
        $("#nav").show();
    } else {
        $("#nav").hide();
    }  
});
function click_ev(click_ele, to_ele) {
    click_ele.click(function() {
        // $(document).scrollTop();
        to_ele.velocity("scroll", {
            'duration': 500,
            'offset': -30
        });
    });
}
// 1. 双11会场 nav_1
click_ev($("#nav_1"), $("#third"));
// 2. 特色优选 nav_2
click_ev($("#nav_2"), $("#core1"));
// 3. 频道广场 nav_3
click_ev($("#nav_3"), $("#fifth"));
// 4. 为你推荐 nav_4
click_ev($("#nav_4"), $("#sixth"));
// 5. 返回顶部
click_ev($("#back_top"), $("#head-top"));

