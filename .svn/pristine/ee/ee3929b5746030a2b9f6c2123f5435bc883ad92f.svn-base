<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%	String basePath = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<title>角色授权管理</title>
	<%@ include file="../comm/comm_ui.jsp"%>
</head>
<body>
	<div style="margin: 10px 0;"></div>
	<div class="easyui-layout" style="width: 800px; height: 380px;">
			<div data-options="region:'west',split:true" title="用户群组列表" style="width: 240px;">
				<table id="usergrp_dg">
				</table>
			</div>
			<div data-options="region:'center',title:'角色授权列表',iconCls:'icon-ok'">
				<table id="role_dg">
				</table>
			</div>
	</div>

	<div id="tb" style="height: auto">
		<a id="accept" class="easyui-linkbutton"
			data-options="iconCls:'icon-save',plain:true">提交</a>
	</div>

	<script type="text/javascript">
		$(function() {

			//用户群组表定义
			$('#usergrp_dg').datagrid({
				remoteSort:false,
				sortName: 'ug_orderSeq',
				singleSelect : true,
				border : false,
				fit : true,
				fitColumns : true,
				url : '<%=basePath%>/ummRoleAuthController.do?getUserGrp',
				method : 'POST',
				columns : [ [ {
					field : 'ug_orderSeq',
					title : '排序',
					hidden: true
				},{
					field : 'ug_code',
					title : '用户群组代码',
					width : 120
				}, {
					field : 'ug_name',
					title : '用户群组名称',
					width : 150
				} ] ],
				//行点击事件绑定，当点击时，获取该行的用户群组ID和适用范围，并向后台获取角色信息，更新至#role_dg表。
				onClickRow : function(rowIndex, rowData) {
					$('#role_dg').datagrid('load', {
						ug_id : rowData.ug_id,
						ug_range : rowData.ug_range
					});
				}
			});
			//用户群组表定义结束

			//角色授权表定义
			$('#role_dg').datagrid({
				singleSelect : false,
				selectOnCheck : true,
				checkOnSelect : true,
				remoteSort:false,
				sortName:'rl_orderSeq',
				border : false,
				fit : true,
				fitColumns : true,
				iconCls : 'icon-ok',
				url : '<%=basePath%>/ummRoleAuthController.do?getRoleInRange',
				toolbar : '#tb',
				method : 'POST',
				columns : [ [ {
					field : 'rl_orderSeq',
					title : '排序',
					hidden : true
				},{
					field : 'rl_code',
					title : '角色代码',
					width : 180
				}, {
					field : 'rl_name',
					title : '角色名称',
					width : 180
				}, {
					field : 'status',
					title : '选择',
					width : 160,
					align : 'center',
					formatter : function(value, row, index) {
						return '<div class="datagrid-cell-check" style="margin: auto"><input type="checkbox" name="status"></div>';
					}
				} ] ],
		
				//加载之前，如果#usergrp_dg表没有选中行，则不加载。
				onBeforeLoad : function() {
					if ($('#usergrp_dg').datagrid('getSelected') == null) {
						return false;
					}
				},
		
				//格式化数据，如果status为true，则勾选该行。
				onLoadSuccess : function(data) {
					if (data) {
						$.each(data.rows, function(index, item) {
							if (item.status) {
								$('#role_dg').datagrid( 'checkRow', index);
							}
						});
					}
				}
			});
			//角色授权表定义结束

			//提交按钮定义
			$('#accept').click(
					function() {
						var checked_roles = $('#role_dg')
								.datagrid('getChecked');
						var selected_usergrp = $('#usergrp_dg').datagrid(
								'getSelected');
						var rl_id_array = $.map(checked_roles, function(value) {
							return value.rl_id;
						});
						rl_id_array.unshift(0);
						$.post('<%=basePath%>/ummRoleAuthController.do?roleAuthCommit', {
							ug_id : selected_usergrp.ug_id,
							rl_id_array : rl_id_array
						}, function(data) {
							if (data == 'commit succeed!') {
								$.messager.alert('提示', '提交成功!', 'info');
								$('#role_dg').datagrid('load', {
									ug_id : selected_usergrp.ug_id,
									ug_range : selected_usergrp.ug_range
								});
							} else if (data == 'commit failed!') {
								$.messager.alert('提示',
										'提交失败', 'error');
							}

						});
					});
			//提交按钮定义结束

		});
	</script>
</body>
</html>