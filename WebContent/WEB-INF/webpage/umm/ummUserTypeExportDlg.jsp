<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>导出对话框</title>
</head>
<body>
		<!-- 导出文件格式选择窗口Star -->
		<div id="ut_exportWindow" class="easyui-window" title="" 
		    data-options="modal:true,
			              closed:true,
			              iconCls:'icon-save',
			              minimizable:false,
			              resizable:false,
			              maximizable:false,
			              closable:false"
			style="width: 460px; height: 360px;">
						<div class="easyui-layout" data-options="fit:true">
		    <div data-options="region:'north'" style="height:70px;padding-left:35px;" border="false">
				<br />
				<h3>导出文件格式选择</h3>
				<hr />
			</div>
	
	      <div data-options="region:'west'" style="width:30px" border="false"></div>
		  <div data-options="region:'east'" style="width:30px" border="false"></div>
		  <div data-options="region:'center'" style="height:100px" border="false">
		  	
		  	<form id="ut_exportForm" method="post" action="#" 
		  	      style="padding-left: 35px;margin-top:15px" >
		  	  <label for="exportModel">导出文件格式:</label>
		  	  <select id="ut_exportModel" name="exportModel" class="easyui-combobox" 
		  	          panelHeight="auto"  style="width: 152px;"
		  	          data-options="required:true,editable:false">
		  	               <option value="none"></option>
					       <option value="excel">Excel文件</option>
					       <option value="PDF">PDF文件</option>
			 </select>
		  	</form>
		  	</div>
		  			  	 <div data-options="region:'south'" id="add" style="text-align: right;height:40px;background:#eee;">
				<a id="ute_submit" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a> 
			    <a id="ute_cancel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">取消</a>
			</div>
		  	</div>

		</div>
	    <!-- 导出文件名输入窗 -->
		<div id="ut_fileNameWindow" class="easyui-window" title=""
			data-options="modal:true,
			              closed:true,
			              iconCls:'icon-save',
			              minimizable:false,
			              resizable:false,
			              maximizable:false,
			              closable:false"
			style="width: 350px; height: 210px;">
									<div class="easyui-layout" data-options="fit:true">
		    <div data-options="region:'north'" style="height:170px;padding-left:35px;" border="false">
						    <form id="ut_fileName" method="post" action="#" 
		  	      style="padding-left: 35px;margin-top:45px" >
		  	     <label for="filename">请输入文件名:</label>
		        <input type="text" id="ut_filename" name="filename" class="textbox easyui-validatebox"
		               data-options="required:true"/>
		    </form>
			</div>
	
	      <div data-options="region:'west'" style="width:30px" border="false"></div>
		  <div data-options="region:'east'" style="width:30px" border="false"></div>
		  <div data-options="region:'center'" style="height:100px" border="false">

		    </div>
		    	 <div data-options="region:'south'" id="add" style="text-align: right;height:40px;background:#eee;">
				<a id="utef_submit" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'">提交</a> 
			    <a id="utef_cancel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'">取消</a>
			</div>
			</div>
		</div>
		<!-- 导出文件格式选择窗口Star -->
</body>
</html>