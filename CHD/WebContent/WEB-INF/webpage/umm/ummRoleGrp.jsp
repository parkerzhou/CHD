<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>用户群组管理</title>
<!-- 引入相关文件 -->
	<%@ include file="../comm/comm_ui.jsp"%>
	<script type="text/javascript" src="js/plug-in/comm/ummRoleGrp.js"></script>	
	<script type="text/javascript" src="js/plug-in/comm/validtypeExtend.js"></script>
	<script>
		$(function(){
			$.ajax({
				url:'commController.do?checkFuncBtn&fuId=${currFunc.id}',
				dataType:'text',
				success:function(result){
					var tb=$('#roleGrpTools');
					var v=result.split(',');
					setButton(tb.find('.easyui-linkbutton').first(),v[0]);
					setButton(tb.find('.easyui-linkbutton').eq(1),v[1]);
					setButton(tb.find('.easyui-linkbutton').eq(2),v[2]);
					setButton(tb.find('.easyui-linkbutton').eq(3),v[3]);
					if(v[1] == 0){
						editable = false;//如果没权限，则不可编辑
					}
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
	<div id="sy_roleGrp" class="easyui-layout" data-options="fit:true" style="width:900px;height:450px;">
		<div data-options="region:'center'">
			<table id="roleGrpDataGrid" class="easyui-datagrid" style = "width:300px;height:250px"></table>
		</div>
	</div>
	
	<div id="roleGrpTools" style = "padding:5px;height:auto">
		<div style = "margin-bottom:5px;">
			<a href="#" id="add" class="easyui-linkbutton" iconCls="icon-add" onclick="addRoleGrp()">新增</a> <a
				href="#" id="edit" class="easyui-linkbutton" iconCls="icon-edit" onclick="editRoleGrp()">修改</a> <a
				href="#" id="remove" class="easyui-linkbutton" iconCls="icon-remove" onclick="delRoleGrp()">删除</a> <a
				href="#" id="reject" class="easyui-linkbutton" iconCls="icon-undo" onclick="rejectRoleGrp()">导出</a>
		</div>
		<div>
			用户组代码：<input style="width: 220px;background-color:#d0f6ca" id="sRoleGrpCode" />&nbsp;&nbsp;&nbsp;&nbsp;
			用户群组名称：<input style="width: 350px;background-color:#d0f6ca" id="sRoleGrpName"/>&nbsp;&nbsp;&nbsp;&nbsp;
			适用范围：
			<select class="easyui-combobox" panelHeight="auto"	style="width: 110px" id="sRoleGrpRange" data-options="url:'ummRoleGrpController.do?getRange.json&search=1' ,valueField:'id',textField:'text',required:true,value:'-1'" editable="false">
			</select>&nbsp;&nbsp;&nbsp;&nbsp;
			<a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="roleGrpSearch()">查询</a>
		</div>
	</div>
	
	<jsp:include page="rgDlg.jsp"></jsp:include>
	<jsp:include page="report.jsp"></jsp:include>
</body>
</html>