<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="gst" uri="/gsui-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>退工程保证金</title>
</head>
<body>
	<div id="agrPayDalDlg" class="easyui-dialog" title="退工程保证金"
		style="width: 400px; height: 200px;"
		data-options="resizable:false,modal:true,closed:true">
		<form id="agrPayDalForm" method="post" style="padding: 35px">
			<table>
				<tr>
					<td><label for="RETURE_DATE">退款日期</label></td>
					<td>:</td>

					<td><input id="RETURE_DATE" type="text" class="easyui-datebox"
						required="required" editable="false"></td>
				</tr>
				<tr>
					<td><label for="RETURN_AMOUNT">退款金额</label></td>
					<td>:</td>
					<td><input type="text" id="RETURN_AMOUNT"
						class="easyui-numberbox" required="true" precision='2' missingMessage="必填项"
						/></td>
				</tr>
				<tr>
					<td><input id="AGREE_SEQ" type="hidden" >
					<input id="rowIndex" type="hidden">
					<input id="flag" type="hidden">
					<input id="PAY_SEQ" type="hidden"></td>
			</table>
		</form>
		<div id="dlg-buttons" align="right">
						<a href="#" class="easyui-linkbutton" iconCls='icon-ok' onclick="sumbitAgrPayDal()">提交</a>
						<a href="#" class="easyui-linkbutton" iconCls='icon-cancel' onclick="closeAgrPayDal()">关闭</a>
					</div>
	</div>
</body>
</html>