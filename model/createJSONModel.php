<?php
include "connectModel.php";

$sql = $_POST['sql'];
$fileset = $_POST['fileset'];
$arr = $_POST['format'];
$fileJSON = fopen("../JSON/".$fileset,"w")or die("Unable to open file!");

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

    fwrite($fileJSON, json_encode($result));

    // echo "setFileJSON OK..";
    echo json_encode($result);
}else{
    echo "NoDATA";
}
fclose($fileJSON);