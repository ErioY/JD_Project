// 显示和隐藏地区
place();

// 清空搜索框
search($("#key"));

$(".amount-sum i").on("click", function() {
    $(this).hasClass("fa-angle-up") ? $(this).removeClass("fa-angle-up").addClass("fa-angle-down") : $(this).removeClass("fa-angle-down").addClass("fa-angle-up");
});

// 商品增加减少
AddDeShop($("#jd-cart .increment"), $("#jd-cart .decrement"), $("#jd-cart .itxt"), $("#jd-cart .p-sum strong"), $("#jd-cart .plus-switch strong"), $(".amount-sum em"), "disabled", $(".sumPrice em"));

// 全选
$(".selectAll").on("click", function() {
    $("input[class='jd-checkbox']").prop("checked", this.checked);  
});
// 删除单件商品
$(".cart-remove").click(function() {
    if (confirm("确定要删除该商品吗？")) {
        ($(this).parent().parent().parent().parent()).remove();
    }
});
// 删除选中商品
$(".remove-batch").click(function() {
    if(confirm("确定要删除选中商品吗？")) {
        $("input[class='jd-checkbox']").each(function() {
            if ($(this).prop("checked")) {
                $(this).parent().parent().parent().parent().parent().remove();
            }
        });
    }
});

// 点击按钮切换图片
// for (let i = $(".goods-list").length - 1; i >= 0; i--) {
//     this.i = index;
//     $(".c-page .c-prev").on("click", function() {
//         // $(".goods-list").removeClass("now");
//         $(".goods-list").eq(this.index).addClass("now");
//     });
// }
$(".c-page .c-next").on("click", function() {
    for (let i = 0; i < $(".goods-list").length; i++) {
        // console.log($(".s-item"));
    }
});
// 触碰到豆豆切换图片 
$(".s-item").hover(function() {
    let index = $(this).index();
    $(this).addClass("curr").siblings($(this)).removeClass("curr");
    $(".goods-list").eq(index).addClass("now").siblings($(".goods-list")).removeClass("now");
    console.log(index);
});
