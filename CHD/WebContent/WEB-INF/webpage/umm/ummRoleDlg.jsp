<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>角色管理对话框</title>
</head>
<body>
     <!-- 新增功能响应窗口Star -->
		<div id="rl_window" class="easyui-window" title=""
			data-options="modal:true,
			              closed:true,
			              iconCls:'icon-save',
			              resizable:false,
			              minimizable:false,
			              maximizable:false,
			              closable:false" style="width: 530px; height: 220px;">
			
		  <div class="easyui-layout" data-options="fit:true">
		    <div data-options="region:'north'" style="height:70px;padding-left:35px;" border="false">
				<br />
				<p align="left"><h3>角色管理_[<span id="rl_title"></span>]</h3>
				<hr />
			</div>
	
	      <div data-options="region:'west'" style="width:30px" border="false"></div>
		  <div data-options="region:'east'" style="width:30px" border="false"></div>
		  <div data-options="region:'center'" style="height:100px" border="false">
			<form id="rl_form" method="post" action="#">
				<div>
				    <input  type="hidden" name="rl_id" id="rl_id"/>
					<label for="rl_code">角色代码:</label> 
					<input class="easyui-validatebox textbox" type="text" name="rl_code" id="rl_code" 
					       data-options="required:true" style="width: 152px;"
					       validType="loginCode[5,'ummRoleController.do?validataCode',$('#rl_id').val()]"/>
					
					<label for="rl_name">角色名称:</label>
					 <input class="easyui-validatebox textbox" style="width: 152px;"
						type="text" id="rl_name" name="rl_name" data-options="required:true" 
						validType="loginName[1,'ummRoleController.do?validateName',$('#rl_id').val(),30]"/>
				</div>
				<br>
				<div>
					<label for="rl_range">适用范围:</label> 
					<select id="rl_range" name="rl_range" class="easyui-combobox" 
					        panelHeight="auto"  style="width: 152px;"
					        data-options="required:true,editable:false,valueField:'id',textField:'text'">
				    </select>
					
					<label for="rl_orderSeq">排&nbsp;&nbsp;&nbsp;&nbsp;序&nbsp;&nbsp;&nbsp;&nbsp;:</label>
					 <input id="rl_orderSeq" name="rl_orderSeq" class="easyui-validatebox textbox" style="width: 152px;"
						type="text"  data-options="required:true"  validType  ="validateSort[1]"/>
				</div>
			</form>
		   </div> 
		   <div data-options="region:'south'"  style="text-align: right;background:#eee;height:32px">
				 <a id="rl_submit" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a> 
			     <a id="rl_cancel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">取消</a>
		   </div>
          </div>
		</div>
		<!-- 新增功能响应窗口End -->
</body>
</html>