<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>用户群组管理</title>
<!-- 引入相关文件 -->
	<%@ include file="../comm/comm_ui.jsp"%>
	<script type="text/javascript" src="js/plug-in/comm/ummUserRepl.js"></script>	
	<script type="text/javascript" src="js/plug-in/comm/validtypeExtend.js"></script>
	
	<script>
		$(function(){
			$.ajax({
				url:'commController.do?checkFuncBtn&fuId=${currFunc.id}',
				dataType:'text',
				success:function(result){
					var tb=$('#userReplTools');
					var v=result.split(',');
					setButton(tb.find('.easyui-linkbutton').first(),v[0]);
					setButton(tb.find('.easyui-linkbutton').eq(1),v[1]);
					setButton(tb.find('.easyui-linkbutton').eq(2),v[2]);
					setButton(tb.find('.easyui-linkbutton').eq(3),v[3]);
				}
			});
		});
		function setButton(btn,opt){
			if(opt==1){
				btn.linkbutton('enable');
			}else if(opt==0){
				btn.linkbutton('disable');
			}
		}
	</script>
</head>
<body>
	<div id="userRepl" class="easyui-layout" data-options="fit:true" style="width:900px;height:450px;">
		<div data-options="region:'center'">
			<table id="userReplDataGrid" class="easyui-datagrid" style = "width:100px;height:250px"></table>
		</div>
	</div>
	
	<div id="userReplTools" style = "padding:5px;height:auto">
		<div style = "margin-bottom:5px;">
			<a href="#" id="add" class="easyui-linkbutton" iconCls="icon-add" onclick="add()">新增</a> <a
				href="#" id="edit" class="easyui-linkbutton" iconCls="icon-edit" onclick="edit()">修改</a> <a
				href="#" id="remove" class="easyui-linkbutton" iconCls="icon-remove" onclick="del()">删除</a> <a
				href="#" id="reject" class="easyui-linkbutton" iconCls="icon-undo" onclick="rejectRepl()">导出</a>
		</div>
		<div>
			生效时间：由<input id="firsttime"  name="firsttime" class="easyui-datebox" style="width: 120px;background-color:#d0f6ca">
			至：<input  id="secondtime" name="secondtime" class="easyui-datebox" style="width: 120px;background-color:#d0f6ca">
			
			<a href="#" class="easyui-linkbutton" iconCls="icon-search" id="Search">查询</a>
		</div>
	</div>
	
	<jsp:include page="replDlg.jsp"></jsp:include>
	<jsp:include page="report.jsp"></jsp:include>
</body>
</html>