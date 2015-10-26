<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户信息管理</title>
	<!-- 引入相关文件 -->
	<%@ include file="../comm/comm_ui.jsp"%>
	<script type="text/javascript" src="js/plug-in/comm/ummUserInfo.js"></script>
	<script>
	$(function(){
		$.ajax({
			url:'commController.do?checkFuncBtn&fuId=${currFunc.id}',
			dataType:'text',
			success:function(result){
				var tb=$('#toolbar');
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
	<style type="text/css">
		label{
			margin-left:35px;
		}
		#searchForm label{
			margin-left:8px;
		}
	</style>
</head>
<body>   
	<table id="datagrid" style="width: 600px; height: 420px" data-options="autoRowHeight:false,fitColumns:true,fit:true"></table>
	<!-- 工具栏 -->
	<div id="toolbar" style = "padding:5px;height:auto">
		<div style="padding-left: 5px;">
			<a href="#" id="addButton"  class="easyui-linkbutton" iconCls="icon-add" >新增</a>
			<a href="#" id="editButton" class="easyui-linkbutton" iconCls="icon-edit" >修改</a>
			<a href="#" id="removeButton" class="easyui-linkbutton" iconCls="icon-remove" >删除</a>
			<a href="#" id="undoButton" class="easyui-linkbutton" iconCls="icon-undo" >导出</a>
		</div>
		<div style="padding: 8px;padding-left: 0px;">
		 	<form id="searchForm" method="post" action="#"> 
				<label for="ug_name">用户群组:</label>
				<select id="ug_name" name="ug_name" class="easyui-combobox" panelHeight="auto" style="width:70px" data-options="editable:false">
				</select>
				<label for="userId">用户ID:</label>
				<input name="userId" type="text" style="width:70px"/>
				<label for="userName">用户名称:</label>
				<input name="userName" type="text" style="width:70px"/>
				<label for="nickName">登陆ID:</label>
				<input name="nickName" type="text" style="width:70px"/>
				<label for="ut_type">用户类型:</label>
				<select id="ut_type" name="ut_type" class="easyui-combobox" panelHeight="auto" style="width:70px" data-options="editable:false">
				</select>
				<label for="state">状态:</label>
				<select id="state" name="state" class="easyui-combobox" panelHeight="auto" style="width:70px" data-options="editable:false">
				</select>
				<a href="#" id="searchButton" class="easyui-linkbutton" style="vertical-align: middle;margin-left:8px;" iconCls="icon-search" onclick="searchButton()">查询</a>
		 	</form> 
		</div>
	</div>
	<!--  -->
	<!-- 新增用户信息窗口 -->
	<div id="addWindow"  title="" class="easyui-window" style="width:550px; height:390px; left:35px;top:35px" 
	data-options="modal:true,closed:true,resizable:false,minimizable:false,maximizable:false,closable:false">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north'" style="padding:20px 20px 0px 20px;height:80px" border="false"> 
				<h2>用户管理_[新增]</h2>
				<hr/>
			</div>
			<div data-options="region:'center'" border="false">
				<form id="addForm" method="post" action="#">
					<div>
						<label for="userId">用户ID：</label>
						<input id="userId" name="userId" missingMessage="必填项" class="easyui-validatebox" data-options="required:true" style="margin-left:12px"/>
						<label for="userName" >用户名称：</label>
						<input id="userName" name="userName" missingMessage="必填项" class="easyui-validatebox" data-options="required:true" style="margin-left:12px"/>
					</div>
					<br />
					<div>
						<label for="nickName">登陆ID：</label>
						<input id="nickName" name="nickName"  class="easyui-validatebox" style="margin-left:12px"/>
						<label for="email">邮箱：</label>
						<input id="email" name="email"  class="easyui-validatebox" data-options="validType:'email'" style="margin-left:36px"/>
					</div>
					<br />
					<div>
						<label for="mobileNo">手机号码：</label>
						<input id="mobileNo" name="mobileNo"  class="easyui-numberbox" data-options="validType:'mobileNo',required:true"/>
						<label for="telNo">联系电话：</label>
						<input name="telNo" class="easyui-validatebox" data-options="validType:'phone'" style="margin-left:12px"/>
					</div>
					<br />
					<div>
						<label for="faxNo">传真号码：</label>
						<input name="faxNo" class="easyui-validatebox" data-options="validType:'faxNo'"/>
						<label for="ug_name">所属用户组：</label>	
						<span id="name">	
							<input id="ug_name" name="ug_name" missingMessage="必填项" class="easyui-combobox" panelHeight="auto"  data-options="required:true,editable:false"/>
						</span>	
					</div>
					<br />
					<div>
						<label for="ut_type">用户类型：</label>			
						<input id="ut_type" name="ut_type" missingMessage="必填项" class="easyui-combobox" panelHeight="auto" data-options="required:true,editable:false"/>				
						<label for="state" style="margin-right:36px">状态：</label>
						<input id="state" name="state" missingMessage="必填项" class="easyui-combobox" panelHeight="auto"  data-options="required:true,editable:false"/>
					</div>
					<br />
					<div>
						<label for="addr">联系地址：</label>
						<input name="addr" class="easyui-validatebox" style="width:376px"/>
					</div>
					<br /><br />
				</form>
			</div>
			<div  data-options="region:'south'" style="text-align:right;height:30px;background:#eee;">
				<a id="submit" href="#" class="easyui-linkbutton" iconcls="icon-ok">提交</a>
				<a id="cancel" href="#" class="easyui-linkbutton" iconcls="icon-cancel">取消</a>					
			</div>
		</div>
	</div>
	
	<!-- 修改用户信息窗口 -->
	<div id="editWindow"  title="" class="easyui-window" style="width:550px; height:390px; left:35px; top:35px" 
	data-options="modal:true,closed:true,resizable:false,minimizable:false,maximizable:false,closable:false">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north'" style="padding:20px 20px 0px 20px;height:80px" border="false">
				<h2>用户管理_[修改]</h2>
				<hr/>
			</div>
			<div data-options="region:'center'" border="false">
				<form id="editForm" method="post">
					<input type="hidden" name="id"><!-- 用户主键ID -->
					<div>
						<label for="userId">用户ID：</label>
						<input id="userId" name="userId" missingMessage="必填项" class="easyui-validatebox" data-options="required:true" style="margin-left:12px"/>
						<label for="userName" >用户名称：</label>
						<input id="userName" name="userName" missingMessage="必填项" class="easyui-validatebox" data-options="required:true" style="margin-left:12px"/>
					</div>
					<br />
					<div>
						<label for="nickName">登陆ID：</label>
						<input id="nickName" name="nickName" class="easyui-validatebox"  style="margin-left:12px"/>
						<label for="email">邮箱：</label>
						<input id="email" name="email" class="easyui-validatebox" data-options="validType:'email'" style="margin-left:36px"/>
					</div>
					<br />
					<div>
						<label for="mobileNo">手机号码：</label>
						<input id="mobileNo" name="mobileNo" missingMessage="必填项" class="easyui-numberbox" data-options="required:true,validType:'mobileNo'"/>
						<label for="telNo">联系电话：</label>
						<input name="telNo" class="easyui-validatebox" data-options="validType:'phone'" style="margin-left:12px"/>
					</div>
					<br />
					<div>
						<label for="faxNo">传真号码：</label>
						<input name="faxNo" class="easyui-validatebox" data-options="validType:'faxNo'"/>
						<label for="ug_name">所属用户组：</label>			
						<input id="ug_name" name="ug_name" class="easyui-combobox" panelHeight="auto"  data-options="required:true,editable:false">
					</div> 
					<br />
					<div>
						<label for="ut_type">用户类型：</label>			
						<input id="ut_type" name="ut_type" class="easyui-combobox" panelHeight="auto"  data-options="required:true,editable:false">				
						<label for="state" style="margin-right:36px">状态：</label>
						<input id="state" name="state" class="easyui-combobox" panelHeight="auto"  data-options="required:true,editable:false">
					</div>
					<br />
					<div>
						<label for="addr">联系地址：</label>
						<input name="addr" class="easyui-validatebox" style="width:376px;"/>
					</div>
					<br /><br />
				</form>
			</div>
			<div data-options="region:'south'" style="text-align:right;height:30px;background:#eee;">
				<a id="submit" href="#" class="easyui-linkbutton" iconcls="icon-ok">提交</a>
				<a id="cancel" href="#" class="easyui-linkbutton" iconcls="icon-cancel">取消</a>					
			</div>

		</div>
	</div>
	
	<!-- 导出文件窗口 --> 
	<div id="exportWindow" title="导出文件" class="easyui-dialog" style="width:350px; height:330px; left:35px; top:30px" 
	data-options="modal:true,closed:true,closable:true">
		<div class="easyui-layout" data-options="fit:true">	
			<div data-options="region:'north'" style="padding:20px 20px 0px 20px;height:50px" border="false"></div>
			<div data-options="region:'center'" border="false">
				<form id="exportForm" method="post" action="#" >
					<div style="padding:10px;">
						<label for="exportModel">导出文件格式：</label>			
						<select id="exportModel" name="exportModel" missingMessage="必填项" class="easyui-combobox" panelHeight="155px;" style="width:120px;" data-options="required:true,editable:false">
							<option value="none"></option>
							<option value="Excel">Excel文件</option>
							<option value="PDF">PDF文件</option>
						</select>
					</div>
					<div style="padding:10px;">
					<label for="filename" >请输入文件名：</label>
		        	<input id="filename" name="filename" class="easyui-validatebox" style="width:115px;" data-options="required:true"/>
					</div>
					<br /><br /><br /><br />
					<br /><br /><br /><br />
				</form>
			</div>
			<div data-options="region:'south'" style="text-align:right;height:30px;background:#eee;">
				<a id="submit" href="#" class="easyui-linkbutton" iconcls="icon-ok">导出</a>
				<a id="cancel" href="#" class="easyui-linkbutton" iconcls="icon-cancel">取消</a>					
			</div>
		</div>
	</div>
</body>  
</html>