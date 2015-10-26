<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<title>对我司贡献业绩对话框</title>
	<style type="text/css">
    	.ftitle{
        font-size:14px;
        font-weight:bold;
        padding:5px 0;
        margin-bottom:10px;
        border-bottom:1px solid #ccc;
    }
    </style>
</head>
<body>
	<div id="roleGrpDialog" class="easyui-dialog" style="height:250px;width:650px"
		data-options="closed:'true',modal:true,noheader:true">
		<div class="easyui-layout"  data-options="fit:true">
			<div data-options="region:'north'" style="height:80px;padding-left:35px;" border="false">
				<br />
				<p align="left"><h3 id="title"></h3>
				<div class="ftitle"></div>
			</div>
			<div data-options="region:'west'" style="width:30px" border="false"></div>
			<div data-options="region:'east'" style="width:30px" border="false"></div>
			<div data-options="region:'center'" style="height:100px" border="false">
				<form id="roleGrpForm" method="post" class="form">
					<table cellspacing="5">
						<td><input type="hidden" name="userGrpId" id="userGrpId" ><td>
						<tr>
							<td>用户群组代码:</td>
							<td><input class="easyui-validatebox" style="width: 160px" data-options="required:true, validType:['length[0,5]']"
								 missingMessage="必填项" id="userGrpCode" name="userGrpCode"></td>
		
							<td>用户组名称:</td>
							<td><input class="easyui-validatebox" style="width: 160px" data-options="required:true, validType:['length[0,80]']" 
								missingMessage="必填项" id="userGrpName" name="userGrpName"></td>
						</tr>
		
						<tr>
							<td>适用范围:</td>
							<td>
							
							<select class="easyui-combobox" name="userGrpRange" id="userGrpRange" 
								panelHeight=auto style="width: 160px"  data-options="url:'ummRoleGrpController.do?getRange.json&search=0' ,valueField:'id',textField:'text',required:true" editable="false">
							</select> 
							
							</td>
							<td>排序:</td>
							<td><input class="easyui-numberbox" style="width: 160px" id="userGrpOrderseq" 
								name="userGrpOrderseq" data-options="min:0,max:32767" /></td>
						</tr>
					</table>
				</form>
			</div>
			<div data-options="region:'south'" id="roleGrpFunc" style="text-align: right;height:40px;background:#eee;">
				<a href="#" class="easyui-linkbutton"
					data-options="iconCls:'icon-ok'" onclick="roleGrpDialogSave()">提交</a> <a href="#"
					class="easyui-linkbutton" data-options="iconCls:'icon-cancel'"
					onclick="javascript:$('#roleGrpDialog').dialog('close')">取消</a>
			</div>
		</div>
	</div>
</body>
</html>