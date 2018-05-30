<?php

function connect_db(){
    $link = mysqli_connect('localhost','root','1915312907','minimart_db');
    if($link == false){
        die(" ! Don't Connect Database");
    }else{
        mysqli_query($link, 'SET NAMES UTF8');
        return $link;
    }
}