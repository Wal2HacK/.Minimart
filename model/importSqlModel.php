<?php

include "connectModel.php";

$sql = $_POST['sql'];

$sql_a = str_replace('\\','',$sql);

$query = mysqli_query(connect_db(),$sql);

if($query){
    echo "Yes";
}else{
    echo "Error SQL - >".$sql;
}