var oBox = document.getElementsByClassName("box")[1];
var oPassWord = oBox.querySelector("input");
var oLabel = document.querySelector("label");
var oImg = oLabel.querySelector("img");

oImg.onclick = function() {
    this.classList.toggle("change");
    if (this.classList.contains("change")) {
        this.src = "img/open.jpg";
        oPassWord.type = "text";
    } else {
        this.src = "img/close.jpg";
        oPassWord.type = "password";
    }
}
