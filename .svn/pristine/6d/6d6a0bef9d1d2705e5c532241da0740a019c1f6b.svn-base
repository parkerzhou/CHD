<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=EDGE">

<title>登录界面</title>
<link type="text/css" rel="stylesheet" href="js/plug-in/easyui1.36/themes/icon.css"></link>
<link type="text/css" rel="stylesheet" href="js/plug-in/easyui1.36/themes/default/easyui.css"></link> 
<link type="text/css" rel="stylesheet" href="js/plug-in/easyui1.36/demo/demo.css"></link>
<script type="text/javascript" src="js/plug-in/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/plug-in/easyui1.36/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/plug-in/easyui1.36/locale/easyui-lang-zh_CN.js"></script>

<style type="text/css">
	input{
		font-size:14px;
		font-weight: bold;
	}
	.ea_font{
		color:#FF9900;
		font-size:14px;
		margin-bottom:20px;
		font-weight: bold;
	}
	#versionBar {
	background-color: #B2CEFA;
	position: fixed;
	width: 100%;
	height: 35px;
	bottom: 0;
	left: 0;
	text-align: center;
	line-height: 35px;
	z-index: 11;
	-webkit-box-shadow: D1DEF4 0px 10px 10px -10px inset;
	-moz-box-shadow: D1DEF4 0px 10px 10px -10px inset;
	box-shadow: D1DEF4 0px 10px 10px -10px inset;
	
}
#user_msg{ clear:both;text-align: center;}
</style>
<script>
	$(function(){
		a_userName=$('#userName');
		a_passWord=$('#passWord');
		
		
		
	});
	
	function checkUser(){
		var userName=$.trim(a_userName.val());
		var passWord=$.trim(a_passWord.val());
		if(userName==''){
			$.messager.alert('提示','用户名不能为空!','info');
			return;
		}
		if(passWord==''){
			$.messager.alert('提示','密码不能为空!','info');
			return;
		}
		var loginSpeedDailog=$('#loginSpeedDailog').dialog('open');
		start();
		setTimeout('login()',2000);
	}
	
	function login(){
		var loginSpeedDailog=$('#loginSpeedDailog').dialog('open');
		var userName=$.trim(a_userName.val());
		var passWord=$.trim(a_passWord.val());
		var actionurl='loginController.do?login';//提交路径
		var checkurl='loginController.do?check';//验证路径
		var formData = new Object();
		formData.userName=userName;
		formData.password=passWord;
		$.ajax({
			async : false,
			cache : false,
			type : 'POST',
			dataType:'text',
			url : checkurl,// 请求的action路径
			data : formData,
			error : function() {// 请求失败处理函数
			},
			success : function(data) {
				var loginSpeedBarValue=$('#loginSpeedBar').progressbar('getValue');
				if(loginSpeedBarValue==100){
					$('#loginSpeedBar').progressbar('setValue',0);
					loginSpeedDailog.dialog('close');
				}
				if(data=='true'){
					setTimeout("window.location.href='"+actionurl+"'", 1000);
				}else if(data=='false'){
					$.messager.alert('提示','用户名或密码错误！','error');
				}
			}
		});
		
		
	}
	function resetLogin(){
		a_userName.val('');
		a_passWord.val('');
	}
	
	function start(loginSpeedBar){
		var value = $('#loginSpeedBar').progressbar('getValue');
		if (value < 100){
			value += Math.floor(Math.random() * 50);
			$('#loginSpeedBar').progressbar('setValue', value);
			setTimeout('start()', 200);
		}
	};
</script>
</head>
<body>
	<div class="easyui-dialog"
		style="text-align: center;background: #FFFFFF; width: 600px; height: 360px;"
		data-options="closable:false,draggable:false,title:'用户登录'">
		<img src="images/chcrm_top.gif">
		<div style="text-align: center;width:280px; height:150px;margin-left:155px;margin-top:40px;">
			<div class="ea_font">
				用&nbsp;&nbsp;户：<input id="userName" name="userName" value="test"><br>
				
			</div>
			<div class="ea_font">
				密&nbsp;&nbsp;码：<input id="passWord" name="passWord" type="password" value="888888">
			</div>
			<a id="subBtn" class="easyui-linkbutton"   style="width: 100px;" onclick="checkUser()">登录</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
			<a id="restBtn" class="easyui-linkbutton"  style="width: 100px;" onclick="resetLogin()">重置</a>	
			<ul style="color: red;" id="user_msg">			
			</ul>
		</div>
	</div>
	<div class="easyui-dialog" id="loginSpeedDailog" style="width:415px;height:58px;" data-options="closed:true,modal:true,border:false,title:'正在登录'">
		<div id="loginSpeedBar" class="easyui-progressbar" data-options="value:0" style="width:400px;"></div>
	</div>

<!-- 	<ul style="margin-top: 600px;color: red;" id="user_msg">			
	</ul> -->

	<!-- 	<div id="versionBar">
		<div class="copyright">
			&copy; 版权所有 <span><a href="#" title="常宏CRM系统">chcrm</a>
				技术支持:<a href="#" title="常宏CRM系统">chcrm</a></span>
		</div>
	</div> -->
</body>
</html>