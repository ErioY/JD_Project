// 显示地区
place();

// 清空搜索框
search($("#key"));

toggleI($(".area-common-wrap .area-title i"), "click", "fa-angle-down", "fa-angle-up", $(".area-select-wrap .area-select-main-wrap"));
toggleI($(".area-select-wrap .area-title i"), "click", "fa-angle-down", "fa-angle-up", $(".area-select-wrap .area-select-main-wrap"));

// 地区tab栏切换
$(".area-tab .area-item").on("click", function() {
    let index = $(this).index();
    $(".area-content-list .panel").eq(index).css("display", "block").siblings($(".area-content-list .panel")).css("display", "none");
    $(this).addClass("curr").siblings($(".area-select-wrap .area-select-main-wrap .area-tab .area-item")).removeClass("curr");
});

// 商品数量增加或减少
$(".btn-add").click(function() {
    $(".btn-reduce").removeClass("disabled");
    $("#buy-num").val( parseInt($("#buy-num").val())+1);
});
$(".btn-reduce").click(function() {
    if ($("#buy-num").val() > 1) {
        $("#buy-num").val( parseInt($("#buy-num").val())-1);
    }
    if ($("#buy-num").val() == 1) {
        $(".btn-reduce").addClass("disabled");
    }
});