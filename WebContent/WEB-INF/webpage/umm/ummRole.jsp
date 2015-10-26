<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>角色管理</title>
<style type="text/css">
.textbox {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  border-color: #92B8E7;
  border-width: 1px;
  height:20px;
  border-style: solid;
  overflow: hidden;
  vertical-align: middle;
}
</style>
<%@ include file = "../comm/comm_ui.jsp" %>
<!-- js文件Star -->
<script type = "text/javascript" src = "js/plug-in/comm/CommComponent.js"></script>
<script type="text/javascript" src="js/plug-in/comm/validate.js"></script>
<script type="text/javascript" src="js/plug-in/comm/role.function.js"></script>
<!-- js文件End -->
<script>

$.ajax({
	url:'commController.do?checkFuncBtn&fuId=${currFunc.id}',
	dataType:'text',
	success:function(result){
		var tb=$('#rl_tb');
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
       <div id="rl_tb" style="padding: 5px; height: auto">
			<!-- 功能按键Star -->
			<div style="padding: 5px;">
				<a id="rl_add" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-add'">新增</a> 
			    <a id="rl_alter" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-edit'">修改</a>
				<a id="rl_delete" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-remove'">删除</a> 
				<a id="rl_export" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-undo'">导出</a>
			</div>
			<!-- 功能按键End -->

			<!-- 筛选框Star -->
			<div id="rl_fb" style="border: 5px soild red">
				角色代码: <input id="roleCode" class="textbox" style="width: 80px; height: 19px" value="">&nbsp;&nbsp;
				角色名称: <input id="roleName"class="textbox" style="width: 80px; height: 19px" value="">&nbsp;&nbsp;
				适用范围: <select id="Range" class="easyui-combobox" panelHeight="auto" 
				               style="width: 100px;"  data-options="editable:false,valueField:'id', textField:'text'">
				        </select>&nbsp;&nbsp; 
				<a href="#" id="rl_search" data-options="iconCls:'icon-search'" class="easyui-linkbutton" style="vertical-align: middle;">查询</a>
			</div>
			<!-- 筛选框End -->
 	</div>
	
	<table id="rl_dg"  title="" style="width: 600px; height: 420px"
		   data-options=" sortName:'rl_orderSeq',
                          sortOrder:'asc',
				          rownumbers:true,
				          autoRowHeight:false,
				          pagination:true,
				          pageSize:10,
				          CheckOnSelect:true,
				          selectOnCheck:true,
				          remoteSort:false,
				          toolbar:'#rl_tb',
				          fit:true">
			<thead>
				<tr>
					<th data-options="width:'30',field:'inv',checkbox:true">a</th>
					<th data-options="field:'rl_id',width:'120',hidden:true">角色id</th>
					<th data-options="field:'rl_code',width:'120'">角色代码</th>
					<th data-options="field:'rl_name',width:'200',align:'left'">角色名称</th>
					<th data-options="field:'rl_range',width:'100',align:'left'">适用范围</th>
					<th data-options="field:'rl_orderSeq',width:'50',align:'right',sortable:'true'">排序</th>
				</tr>
			</thead>
	</table>
	
	<jsp:include page="ummRoleDlg.jsp"></jsp:include>
	<jsp:include page="report.jsp"></jsp:include>
</body>
</html>