<?php
include "connectModel.php";

$arr = $_POST['format'];

$sql = $_POST['sql'];
$query = mysqli_query(connect_db(),$sql);

$i = 0;
$check = 0;
if($query->num_rows>0){
    while($rows = mysqli_fetch_assoc($query)){
        foreach($arr as $key => $val){
            $result[$i][$val] = $rows[$val];
        }
        $i++;
    }
    echo json_encode($result);
}else{
    echo "NoDATA";
}
