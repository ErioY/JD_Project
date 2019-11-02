<?php
     header("Content-type:text/html;charset=utf-8");
    //1、接收前端的数据

    $username = $_GET['username'];

    //2、处理
     //1)、链接数据库(搭桥)
    
     $conn = mysql_connect("localhost","root","root");

    if(!$conn){
        echo("数据库出错".mysql_error());
    }else{
        //2)、选择库（选择目的地）
        mysql_select_db("xkdb",$conn);

        //3)、执行SQL语句（数据传输）
        //3.1)
        $sqlstr="select * from vip where username='$username'";//查询该用户名在数据库中有没有。 
        $result = mysql_query($sqlstr,$conn);
        $rows = mysql_num_rows($result);//获得结果的行数
        //4)、关闭数据库
        mysql_close($conn);

        if($rows>0){
            echo "1";
        }else{
            echo "0";
        }
    }
?>