<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="gst" uri="/gsui-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<style type="text/css">
.ftitle {
	font-size: 14px;
	font-weight: bold;
	padding: 5px 0;
	margin-bottom: 10px;
	border-bottom: 1px solid #ccc;
}
</style>
</head>
<body>
	<div id="agrDtlDlg" class="easyui-dialog" data-options="modal:true"
		style="width: 400px; height: 300px; padding: 15px" closed="true">
		<form id="agrPayDtlForm" method="post">
			<table>
				<tr>
					<th>申請付款日期</th>
					<td><input id="PAY_DATE" class="easyui-datebox"
						 style="width: 200px" editable="false"></td>
				</tr>
				<tr>
					<th>申請付款金額</th>
					<td><input id="PAY_AMOUNT" type="text" style="width: 200px"
						 class="easyui-numberbox"
						 required=true precision='2'
						onblur="calcuatePay(this)" valiType="integer" ></td>
				</tr>
				<tr>
					<th>管理費</th>
					<td><input id="MANAGER_COST" type="text" 
						style="width: 200px" readOnly></td>
				</tr>
				<tr>
					<th>稅金</th>
					<td><input id="TAX_COST" type="text" 
						style="width: 200px" readOnly></td>
				</tr>
				<tr>
					<th>其他費</th>
					<td><input id="OTH_COST" type="text" 
						style="width: 200px" readOnly></td>
				</tr>
				<tr>
					<th>扣工程保證金</th>
					<td><input id="BAIL_COST" type="text" 
						style="width: 200px" readOnly></td>
				</tr>
				<tr>
				 <th>批签状态</th>
					<td><select id="SIGN_STATUS" class="easyui-combobox" 
						style="width: 200px;" required=true editable="false" valiType="integer">
							<option value="0">制作中</option>
							<option value="1">送出批签</option>
							<option value="2">批签完成</option>
					</select></td>
				</tr>
				<tr>
					<td><input id="AGREE_SEQ" type="hidden" >
					<input id="PAY_SEQ" type="hidden">
					<input id="rowIndex" type="hidden">
					<input id="flag" type="hidden"></td>
				</tr>
			</table>
			<div align="right">
				<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="sumbitAgrPayDtl()">提交</a>
				<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="$('#agrDtlDlg').dialog('close')">关闭</a>
				
			</div>
		</form>
	</div>
</body>
</html>