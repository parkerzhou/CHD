<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<style type="text/css">
	#panel label{
		display: inline-block;
		width:75px;
		
	}
	#panel{
		margin-left:10px;
		margin-top:25px;
	} 
</style>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户信息</title>
	<%@ include file="../comm/comm_ui.jsp"%>
</head>
<body>
	<div id="ModiPwd_Panl" class="easyui-panel" title="" data-options="modal:true,
	   minimizable:false, resizable:false, maximizable:false, closable:false ,
	   draggable:false, collapsible:false"  style="width:180px; height:80px">
	   <div id="panel" >
		   <div>
			   <label>用户ID:</label><panel style="margin-left:2px">${user.userId}</panel>
		   </div>	   
		   <div>
			   <label>用户名:</label><panel style="margin-left:2px">${user.userName}</panel>
		   </div>			            
	   </div>			   

	 </div>

</body>
</html>