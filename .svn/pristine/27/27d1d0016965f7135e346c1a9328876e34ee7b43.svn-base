<%@ page language="java" contentType="text/html; charset=utf-8"
pageEncoding="utf-8"%>
<% String basePath = request.getContextPath(); %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<meta charset="UTF-8">
	<title>角色功能管理</title>
	<%@ include file="../comm/comm_ui.jsp"%>
</head>

<body>
	<div class="easyui-layout" style="width: 800px; height: 380px;" data-options="fit:true">
			<div data-options="region:'west',split:true" title="角色列表" style="width: 230px;">
				<table id="roles_dg">
				</table>
			</div>
			<div data-options="region:'center',iconCls:'icon-ok'" title="功能权限" style="width: 600px;">
				<table id="funcs_dg">
				</table>
			</div>
	</div>
	<div id="tb" style="height: 32px">
		<table style="float: left;"><tr>
			<td>参照新增源角色：</td>
			<td><select id="source_sel" class="easyui-combogrid" name="dept" style="width:180px;"
			></select></td>
			<td style="width:5px"></td>
			<td><a id="copy" class="easyui-linkbutton" data-options="iconCls:'icon-mini-add'">参照新增</a></td>
			<td style="width:10px"></td>
			<td><a id="accept" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a></td>
		</tr></table>
		<table style="float: right;"><tr>
			<td><a id="selectAll" class="easyui-linkbutton">全选</a></td>
			<td><a id="unselectAll" class="easyui-linkbutton">全不选</a></td>
			<td><a id="antiAll" class="easyui-linkbutton">反选</a></td>
		</tr></table>
	</div>
	<div id="ss"></div>
	<script type="text/javascript">
		$(function() {
			var isFromSource = false;//用来判断功能表加载数据时参数是从roles_dg表获取还是从source_sel表获取
			var isCopied = false;

			//角色列表定义
			$('#roles_dg').datagrid({
				remoteSort:false,
				sortName:'rl_orderSeq',
				singleSelect : true,
				border : false,
				fit : true,
				fitColumns : true,
				url : '<%=basePath%>/ummRoleFuncController.do?getSourceRoles',
				method : 'POST',
				columns : [ [ {
					field : 'rl_orderSeq',
					title : '排序',
					hidden: true
				},{
					field : 'rl_code',
					title : '角色代码',
					width : 100
				}, {
					field : 'rl_name',
					title : '角色名称',
					width : 130
				} ] ],
				//行点击事件绑定，当点击时，获取该行的用户群组ID和适用范围，并向后台获取角色信息，更新至#role_dg表。
				onClickRow : function(rowIndex, rowData) {
					var rlRange = getRlRangeByRlId(rowData.rl_id);
					$('#source_sel').combogrid('clear');
					var g = $('#source_sel').combogrid('grid');	// 获取数据表格对象
					g.datagrid('load', {q:''});
					var cols = getFuncColumns(rlRange);
					$('#funcs_dg').datagrid({  
			            columns:[cols],
			            queryParams: { rl_range : rlRange }
			        });
					isFromSource = false;
					isCopied = false;
				}
			});
			//角色表定义结束

			//参照新增源角色列表。
			$('#source_sel').combogrid({
				panelWidth:180,
        		remoteSort:false,
        		sortName:'rl_orderSeq',
        		mode:'remote',
            	idField:'rl_code',
	        	textField:'rl_name',
       			url:'<%=basePath%>/ummRoleFuncController.do?getSourceRolesByRange',
        		columns:[[
        			{field:'rl_orderSeq',title:'角排序',hidden:true},
            		{field:'rl_code',title:'角色代码',width:60},    
            		{field:'rl_name',title:'角色名称',width:95}
        		]], 
				onBeforeLoad : function(param) {
					if ($('#roles_dg').datagrid('getSelected') != null) {
						param.rl_id = $('#roles_dg').datagrid('getSelected').rl_id;
						param.rl_range = getRlRangeByRlId(param.rl_id);
					}else{
						return false;
					}
				}
			});
			
			
			//功能权限表定义
			$('#funcs_dg').datagrid({
				singleSelect : false,
				selectOnCheck : false,
				checkOnSelect : false,
				//remoteSort:false,
				//sortName:'fu_orderSeq',
				border : false,
				fit : true,
				fitColumns : true,
				iconCls : 'icon-ok',
				url : '<%=basePath%>/ummRoleFuncController.do?getFuncsInRange',
				toolbar : '#tb',
				method : 'POST',
				//加载之前，如果#roles_dg表没有选中行，则不加载。
				onBeforeLoad : function() {
					if ($('#roles_dg').datagrid('getSelected') == null) {
						return false;
					}
				},
				
				//加载完成之后，对有授权的操作打勾
				onLoadSuccess : function(data) {
					var rl_id = null;
					if(isFromSource){
						rl_id = $('#source_sel').combogrid('grid').datagrid('getSelected').rl_id
					}else{
						rl_id =  $('#roles_dg').datagrid('getSelected').rl_id;
					}
					
					$.post("<%=basePath%>/ummRoleFuncController.do?getAuthedOper", {rl_id: rl_id}, function(data){
						$.each($.parseJSON(data), function(i,row){
							var selecter = 'input[id=' + row.fu_id + '][name=' + row.ot_id + ']';
							$(selecter).attr("checked", 'true');
						});
					 });
				}
			});
			//功能权限表定义结束
			
			
			//参照新增按钮定义
			$('#copy').click(function(){
				if($('#roles_dg').datagrid('getSelected') == null){
					$.messager.alert('提示', '请选择参照新增的目标角色！', 'info');
					return false;
				}
				
				if($('#source_sel').combogrid('getValue') == ''){
					$.messager.alert('提示', '请选择参照新增的源角色！', 'info');
					return false;
				}
				
				var aimRoleName = $('#roles_dg').datagrid('getSelected').rl_name;
				var sourceRoleName = $('#source_sel').combogrid('getText');
				var message = '是否确定将[' + sourceRoleName + ']的权限参照到[' + aimRoleName + ']中？';
				$.messager.confirm('询问', message,function(r){    
				    if (r){
						/*重新加载功能列表，如果加载的话，会将整个功能列表变成源角色的列表 
						var rlId = $('#source_sel').combogrid('grid').datagrid('getSelected').rl_id;
						var rlRange = getRlRangeByRlId(rlId);
						var cols = getFuncColumns(rlRange);
						$('#funcs_dg').datagrid({  
			                columns:[cols],
			                queryParams: { rl_range : rlRange }
			            }); */
			            isFromSource = true;
						isCopied = true;
			            $('#funcs_dg').datagrid('reload');
						
				    }    
				});
			});
			//参照新增按钮定义结束
			
			
			//提交按钮定义
			$('#accept').click(function() {
				if($('#roles_dg').datagrid('getSelected') == null){
					return false;
				}
				if(isCopied && ($('#source_sel').combogrid('getValue') == '')){
					return false;
				}

				var aim_role_id = $('#roles_dg').datagrid('getSelected').rl_id;
				var source_role_id = null;
				if(isCopied){
					source_role_id = $('#source_sel').combogrid('grid').datagrid('getSelected').rl_id;
				}else{
					source_role_id = aim_role_id;
				}
				//source_role_range = getRlRangeByRlId(source_role_id);
				

				var all = '{';
				all = all + 'aim_role_id:' + aim_role_id + ',';
				all = all + 'source_role_id:' + source_role_id + ',';
				//all = all + 'source_role_range:' + source_role_range + ',';

				var func_auths = '[';
				var checked_checkboxes = $('input:checked');
				$.each(checked_checkboxes, function(i,r){
					var func_auth = '{';
					func_auth = func_auth + 'fu_id:' + $(r).attr('id') + ',';
					func_auth = func_auth + 'ot_id:' + $(r).attr('name') + ',';
					func_auth = func_auth + '}';
					func_auths = func_auths + func_auth + ',';
				});
				func_auths = func_auths + ']';
				
				all = all + "func_auths:" + func_auths + '}';
				
				all.func_auths = func_auths;
				
				$.ajax({
					url:'<%=basePath%>/ummRoleFuncController.do?updateFuncAuth',
					data: {all:all.toString()},
					type: 'POST',
					async:true,
					beforeSend: function(){
						startMask();
					},
					success: function(data,status,xml) {
						endMask();
						if (xml.responseText == '提交成功！'){
							$.messager.alert('提示', xml.responseText, 'info');
						} else{
							$.messager.alert('提示', xml.responseText, 'error');
						}
					}
				});
				
					
			});
			
			//全选按钮定义
			$('#selectAll').click(function() {
				$('input[type="checkbox"]').each(function(){
					$(this).attr('checked', true);
				});
			});
			//全不选按钮定义
			$('#unselectAll').click(function() {
				$('input[type="checkbox"]').each(function(){
					$(this).attr('checked', false);
				});
			});
			//反选按钮定义
			$('#antiAll').click(function() {
				$('input[type="checkbox"]').each(function(){
					$(this).attr('checked', !this.checked);
				});
			});

		});
		
		//通过角色id获取角色适用范围，如果失败，返回0.
		function getRlRangeByRlId(role_id){
			var a = null;
			$.ajax({
				url:'<%=basePath%>/ummRoleFuncController.do?getRlRangeById',
				data: {rl_id:role_id},
				async:false,
			    success: function(data,status,xml) {
					if (xml.responseText != null) {
						a =  parseInt(xml.responseText);
				 	}
				}
			 }
			);
			return a;
		}
		
		//通过角色适用范围获取功能表项。
		function getFuncColumns(rlRange){
			var cols = new Array();
			$.ajax({
				url:'<%=basePath%>/ummRoleFuncController.do?getColumnsByRange',
				data: {rl_range:rlRange},
				async:false,
			    success: function(data,status,xml) {
					if (xml.responseText != null) {
						res = $.parseJSON(xml.responseText);
						$.each(res,function(){
			                colData = new Object();
			                colData.field = this.field;
			                colData.title = this.title;
			                colData.width = this.width;
			                colData.align = this.align;
			                colData.hidden = this.hidden;
			              //colData.sortable = this.sortable;
			                if(this.format == 1){
			                	colData.formatter = function (value, row, index) {
			            			if(value==1){
			            				return '<input type="checkbox" id="' + row.fu_id + '" name="' + this.field + '"/>';
			            			}
			            		}
			                }
			                cols.push(colData);
			            });
				 	}
				}
			});
			return cols;
			
		}
		
		
		
		/**  
		*  页面加载等待页面
		*/  
		var height = window.screen.height-180;   
		var width = window.screen.width;   
		 var leftW = 300;   
		 if(width>1200){   
		    leftW = 500;   
		 }else if(width>1000){   
		    leftW = 350;   
		 }else {   
		    leftW = 100;   
		 }   
		    
		 var _m = '<div id="customMask" class="window-mask" style="width: ' + width 
		 	+ 'px; height: ' + height + 'px; display: block; z-index: 9003;"></div><div id="customMessage" class="panel window messager-window" style="display: block; width: 288px; left: 376px; top: 222px; z-index: 9005;"><div class="messager-body panel-body panel-body-noborder window-body" title="" style="width: 266px; height: auto;"><div>数据量较大，请稍等......</div><div style="clear:both;"></div></div></div>';
		 function startMask(){
			$("#ss").html(_m);
		 }
		 
		 function endMask(){
			var _mask = document.getElementById('customMask');
			var _message = document.getElementById('customMessage');
		    if(_mask!=null){
		    	_mask.parentNode.removeChild(_mask);
		    	_message.parentNode.removeChild(_message);
		    }   
		 }

	</script>
</body>
</html>