<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>.Minimart</title>
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/jquery-3.2.1.min.js"></script>
	<script type="text/javascript" src="js/ctrlLogin.js"></script>
</head>
<body style="background: #FF8C00">
	<div class="container">
		<div class="col-md-offset-4 col-md-4">
			<h1 style="text-align: center;">.Minimart</h1>
		</div>
		<div class="col-md-offset-4 col-md-4" style="margin-bottom: 4px;">
			<div class="input-group">
	      		<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
	      		<input type="text" class="form-control" placeholder="Username" id="i-username">
	    	</div>
    	</div>
    	<div class="col-md-offset-4 col-md-4" style="margin-bottom: 8px;">
    		<div class="input-group">
    			<span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
    			<input type="password" class="form-control" placeholder="Password" id="i-password">
    		</div>
    	</div>
    	<div class="col-md-offset-4 col-md-4">
    		<button class="btn btn-primary" style="width: 100%;" id="b-login">Login</button>
    	</div>
	</div>
</body>
</html>