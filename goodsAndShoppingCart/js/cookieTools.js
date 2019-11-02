//添加cookie
//参数：
//键
//值
//有效期（单位：天）
//返回值：无

function addCookie(key,value,dayCount,path,domain) {
    //
    let d = new Date();
    d.setDate(d.getDate()+dayCount);
    let str =  `${key}=${value};expires=${d.toGMTString()};`
    if(path!=undefined){
        str += `path=${path};`
    }
    if(domain!=undefined){
        str += `domain=${domain};`
    }
    document.cookie = str;
}

//获取cookie
//参数：
//键
//返回值：值
function  getCookie(key) {//username=zsf; uname=张四疯; upass=123
    let str = document.cookie;
    //1、
    let  arr = str.split("; ");
    for(let i in arr){
        if(arr[i].startsWith(key+"=")){
            return arr[i].substring(key.length+1);
        }
    }
    return null;
}

//删除cookie(设置时间为过期，则完成了删除)
//参数：
//键
//返回值：无
function removeCookie(key) {
    addCookie(key,"0",-1);
}

//修改cookie(不用做了)
//添加cookie时，如果键时存在的，那么就是修改。

// addCookie("username","sss",10);