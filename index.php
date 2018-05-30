<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>.Minimart</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/MainControl.js"></script>
</head>

<body>
	<?php 
	session_start();
	!isset($_SESSION['name'])?header("location:loginPage.php"):'';
	?>
	<nav class="navbar navbar-default" style="border-bottom: 4px solid #ff8c00">
		<div class="container-fluid">
			<div class="navbar-header">
				<a href="index.php" class="navbar-brand">.Minimart</a>
			</div>
			<ul class="nav navbar-nav">
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">ใบเสร็จ <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="index.php?p=page-Recipt.php">ออกใบเสร็จ</a></li>
						<li><a href="#">ค้นหาใบเสร็จ</a></li>
					</ul>
				</li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">สินค้า <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="index.php?p=page-productAdd.html">เพิ่มข้อมูลสินค้า</a></li>
						<li><a href="index.php?p=page-productPricetag.html">Price Tag</a></li>
					</ul>
				</li>
				<li><a href="#">ลูกค้า</a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown">อื่น <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="#">Log Detail</a></li>
						<li><a href="index.php?p=test-subpage.html">Test#1</a></li>
					</ul>
				</li>
			</ul>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#"><?=$_SESSION['name']?></a></li>
				<button onclick="Logout();" class="btn btn-danger navbar-btn" style="margin-right: 25px;">Logout<span style="padding-left: 8px;" class="glyphicon glyphicon-log-out"></span></button>
			</ul>
		</div>
	</nav>
	<div class="container">
		<?php
            if(isset($_GET['p'])){
                @require($_GET['p']);
            }else{
                @require("analytics.php");
            }
        ?>
	</div>
</body>
</html>