// 显示隐藏的地区
place();

// 搜索框清空
search($("#goods-search"));

// 封装显示和隐藏
function block(list, txt) {
    list.css("display", "block");
    txt.css("background-color", "#fff");
}
function none(list, txt) {
   list.css("display", "none");
    txt.css("background-color", "#f5f5f5");
}
function evChange(txt, list) {
    txt.on({
        "mouseover": function() {
            txt.children("i").removeClass("fa-angle-down").addClass("fa-angle-up");
            block(list, txt);
            list.mouseover(() => {
                block(list, txt);
                
            });
        },
        "mouseout": function() {
            none( list, txt);
            txt.children("i").removeClass("fa-angle-up").addClass("fa-angle-down");
            list.mouseout(() => {
                none( list, txt);
            });
        }
    });
}
evChange($(".order-time .time-txt"), $(".order-time .time-list"));
evChange($(".total-state .state-txt"), $(".total-state .state-list"));


$(".consignee").on({
    "mouseover": () => {
        $(".consignee .all-msg").css("display", "block");
    }
}); 

// 点击删除订单
$("#del").click(() => {
    let flag = confirm("确定要删除该订单吗？");
    if (flag) {
        $("#goods").remove();
        
    }
});

// 猜你喜欢
$("#small-btn a").hover(function() {
    // console.log($(this).index());
    let index = $(this).index();
    $(this).siblings($("#small-btn a")).removeClass("point");
    $(this).addClass("point");
    $("#goods-slide ul").eq(index).css("display","block").siblings($("#goods-slide ul")).css("display","none");
});

// 楼层导航
let min_height = $(".head-bottom").offset().top + $(".head-bottom").outerHeight();
let $scroll = 0;
$(".slidebar .back_to_top").hide();
// 触发滚动事件
$(window).on("scroll", function() {
    $scroll = $(this).scrollTop();
    // 返回顶部的显示
    if ($scroll > min_height) {
        $(".slidebar .back_to_top").show();
    } else {
        $(".slidebar .back_to_top").hide();
    }
});
$(".slidebar .back_to_top").click(function() {
    $("#head-top").velocity("scroll", {
        "duration": 500,
        "offset": -30
    });
});

