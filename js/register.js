function mySubmit () {
    var oUser = document.forms["registerForm"]["username"].value;
    var aPassword = document.forms["registerForm"]["password"];
    var oEmail = document.forms["registerForm"]["femail"].value;
    var oConfirm = document.forms["registerForm"]["confirm"].value;
    var atpos = oEmail.indexOf("@");
    var dotpos = oEmail.lastIndexOf(".");
    // 判断是否为空
    if (oUser == "" || aPassword[0].value == "" || aPassword[1].value == "" || oEmail == "" || oConfirm == "") {
        alert("不能为空！");
    }
    // 邮箱验证
    if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= oEmail.length) {
        alert("不是有效的邮箱！");
        return false;
    }
    // 两次密码输入是否一致
    if (aPassword[0].value != aPassword[1].value) {
        alert("两次密码输入不一致！");
        aPassword[1].value = "";
    }
}