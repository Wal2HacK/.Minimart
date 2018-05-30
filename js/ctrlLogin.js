$(function(){
	$('#i-password').keypress(function(e){
		if(e.which==13){
			Login();
		}
	})
	$('#b-login').click(function(){
		Login();
	})
	function Login(){

		var username = $('#i-username').val();
		var password = $('#i-password').val();

		if(username!=""&&password!=""){
			$.ajax({
				url:"model/loginModel.php",type:"POST",
				data:{
					username:username,
					password:password
				},success:function(data){
					if(data=="Verified"){
						location = "index.php";
					}else{
						alert(data)
					}
				}
			})
		}else{

		}
	}
});