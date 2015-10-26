<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
	<!--导出格式界面，公共文件，在需要导出功能的地方include此文件，然后在js中提供fileNameSave()函数进行保存。
	窗口打开方式：$('#rejectDialog').dialog('open');
	-->
	<div id="rejectDialog" class="easyui-dialog"
		style="width: 400px; height: 400px; text-align: left;" closed="true"
		closable="false"  modal='true' title="导出文件">
		<div class="easyui-layout" data-options="fit:true">
			<div data-options="region:'north'" style="text-align: left; height: 80px; padding-left: 35px;"border="false"></div>
		
			<div data-options="region:'center'" style="height: 40px; width: 50px"
				border="false" align="center">
				<form id="rejectForm" method="post">
					<table>
						<tr>
						
							<td>文件类型 :</td>
							<td><select class="easyui-combobox" id="format" style="width: 152px" 
								name="format" panelHeight=auto editable=false required="true">
									<option value="excel">Excel文件</option>
									<option value="pdf">PDF文件</option>
							</select></td>
						</tr>
						<tr> <td>&nbsp;</td> </tr>
						<tr>
							<td>文件名称:</td>
							<td><input class="easyui-validatebox" id="fileName" name="fileName" style="width: 150px" 
								data-options="required:true, validType:['length[1,20]']"
								missingMessage="必填项" /></td>
						</tr>
					</table>
				</form>
			</div>


			<div data-options="region:'south'" border="true" style="height: 40px;text-align: right; background: #eee; padding:5px">	
				<a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="submitFile()">确认</a> 
				<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="closeDialog()">取消</a>
			</div>
		</div>
	</div>
	<script type="text/javascript">
	var baseUrl = null;

	
	function openReportDialog(url){
		$('#rejectDialog').dialog('open');
		baseUrl = url;
	}
		
	function submitFile(){
		var format = $('#format').combobox('getValue');
		var fileName = $('#fileName').val();
		
		if(fileName == ""){
			$.messager.alert('提示', "文件名不许为空", 'info');
		}else{
			reportUrl = baseUrl + "&format=" + format + "&fileName=" + fileName;
			window.location.href = reportUrl;
			closeDialog();
		}
	}
	function closeDialog(){
		$('#rejectDialog').dialog('close');
		$('#fileName').val('');
		$('#fileName').validatebox('validate');
	}
	</script>
</body>
</html>