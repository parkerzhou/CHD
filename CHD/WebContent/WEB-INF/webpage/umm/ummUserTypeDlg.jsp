<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户类型管理</title>
</head>
<body>
		<!-- 修改功能响应窗口Star -->
		<div id="ut_window" class="easyui-window" title=""
			data-options="modal:true,
			              closed:true,
			              iconCls:'icon-save',
			              minimizable:false,
			              resizable:false,
			              maximizable:false,
			              closable:false"
			style="width: 320px; height: 210px;">
						<div class="easyui-layout" data-options="fit:true">
		    <div data-options="region:'north'" style="height:70px;padding-left:35px;" border="false">
				<br />
				<h3>用户类型管理_[<span id="ut_title"></span>]</h3>
				<hr />
			</div>
	
	      <div data-options="region:'west'" style="width:30px" border="false"></div>
		  <div data-options="region:'east'" style="width:30px" border="false"></div>
		  <div data-options="region:'center'" style="height:100px" border="false">
			<form id="ut_form" method="post" action="#">
			    
				<div style="text-align:center">
				    <input  type="hidden" name="ut_id" id="ut_id" value="-1"/>
					<label for="ut_type">用户类型:</label> 
					<input class="easyui-validatebox textbox"  type="text"  name="ut_type" id="ut_type"
					        data-options="required:true" style="width:152px"
					         validType="loginType[1,'ummUserTypeController.do?validateUserType',$('#ut_id').val(),40]"/>
				<br>
				<br>
					<label for="ut_range">适用范围:</label> 
					<select id="ut_range" name="ut_range" class="easyui-combobox" 
					     panelHeight="auto" style="width: 152px;" 
					     data-options="required:true,editable:false,valueField:'id',textField:'text'">
				    </select>
				</div>
			</form>
			</div>
				 <div data-options="region:'south'" id="add" style="text-align: right;height:40px;background:#eee;">
				  <a id="ut_submit" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a> 
			      <a id="ut_cancel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">取消</a>
			    </div>
			</div>
		</div>
		<!-- 修改功能响应窗口End -->
</body>
</html>