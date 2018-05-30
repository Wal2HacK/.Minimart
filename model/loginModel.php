<?php 

$username = $_POST['username'];
$password = $_POST['password'];

include "connectModel.php";
$sql = "SELECT * FROM user WHERE user_name = '".$username."' AND user_password = '".$password."'";
$rows = mysqli_fetch_array(mysqli_query(connect_db(),$sql));

if($rows>0){
	session_start();
	$_SESSION['name'] = $rows['user_loginname'];
	echo "Verified";
}else{
	echo "Denied";
}
?>