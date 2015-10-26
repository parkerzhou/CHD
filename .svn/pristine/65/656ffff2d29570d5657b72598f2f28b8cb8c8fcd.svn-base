<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>分包项目月报表</title>
<%@ include file = "../comm/comm_ui.jsp" %>
<script type="text/javascript" src="js/plug-in/comm/validtypeExtend.js"></script>
<script type = "text/javascript" src = "js/plug-in/tools/json2.js"></script>
<script type="text/javascript" src="js/plug-in/comm/commDialog.js"></script>
<script type="text/javascript" src="js/plug-in/comm/exportProj.js"></script>
</head>
<body>
<form id = "reportForm" method = "POST">
<table style="margin-left:80px">
	<tr>
		<td width="200" align="right">选择</td>
		<td><fieldset style="margin-left:30px">
						<legend>
							
						</legend>
						<table id="exportTb">
							<tr><td><label><input type="radio" name="type" value="1" checked />正在施工工程</label></td></tr>
							<tr><td><label><input type="radio" name="type" value="2" />已完工尚需跟进款项的工程</label></td></tr>
							<tr><td><label><input type="radio" name="type" value="3" />正在接洽工程</label></td></tr>
							<tr><td><label><input type="radio" name="type" value="4" />取消的工程</label></td></tr>
						</table>
					</fieldset></td>
	</tr>
	<tr>
		<td></td>
		<td> 
		<div style="margin-left:30px;margin-top:50px">
				<a id="rl_export" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-undo'" onclick="exportPdf()">报表</a>
				 
				<a id="rl_export" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-undo'" onclick="exportExcel()">导出至Excel</a></div></td>
		
	</tr>
</table>
</form>
</body>
</html>