<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>导出对话框</title>
</head>
<body>
	    <!-- 导出文件名输入窗 -->
		<div id="rl_fileNameWindow" class="easyui-dialog" title="导出文件"
			data-options="modal:true,
			              closed:true,
			              closable:true"
			style="width: 400px; height: 360px; ">
		<div class="easyui-layout" data-options="fit:true">
		    <div data-options="region:'north'" style="height:170px;padding-left:35px;" border="false">
                <form id="rl_fileName" method="post" action="#" 
		  	      style="padding-left: 25px;margin-top:45px" >
		  	      <table>
		  	      	<tr>
		  	      		<td><label for="rl_exportModel">导出文件格式:</label></td>
		  	      		<td> <select id="rl_exportModel" name="rl_exportModel" class="easyui-combobox" 
		  	         			panelHeight="auto"  style="width: 152px;"
		  	          			data-options="required:true,editable:false">
		  	               		<option value="none"></option>
					       		<option value="excel">Excel文件</option>
					       		<option value="PDF">PDF文件</option>
			 			</select></td>
		  	      	</tr>
		  	      	<tr>
		  	      		<td><label for="filename">请输入文件名:</label></td>
		  	      		<td><input type="text" id="filename" name="filename" class="textbox easyui-validatebox"
		              			data-options="required:true" style="width: 150px"/></td>
		  	      	</tr>
		  	      </table>
		        </form>
			</div>
	
	      <div data-options="region:'west'" style="width:10px" border="false"></div>
		  <div data-options="region:'east'" style="width:40px" border="false"></div>
		  <div data-options="region:'center'" style="height:100px" border="false"></div>
			<div data-options="region:'south'" id="add" style="text-align: right;height:40px;background:#eee; padding:5px">
				<a id="redf_submit" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a> 
			    <a id="redf_cancel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">取消</a>
			</div>
			</div>
		</div>
		<!-- 导出文件格式选择窗口Star -->
</body>
</html>