<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>

	<form id="DTLAForm" method="POST" style="padding: 40px">
		<table>
			<tr>
				<th>交款日期</th>
				<td><input type="text" id="rec_date" class="easyui-datebox"
					required="required" editable="false"></input> <input type="hidden"
					name="performance_seq"><input type="hidden" name="frans_id">
					<input type="hidden" id="rowIndex"></td>
			</tr>
			<tr>
				<th>交款金额</th>
				<td><input type="text" id="rec_money"
					class="easyui-numberbox" required="required"
					data-options="min:0,max:999999999999.99,precision:2"></input></td>
			</tr>
			<tr>
				<td colspan="3">

					<div id="" style="margin-top: 5px; margin-left: 170px">
						<a href="javascript:void(0)" class="easyui-linkbutton"
							data-options="iconCls:'icon-ok'" onclick="saveDLTA()">提交</a>
						<a href="javascript:void(0)" class="easyui-linkbutton"
							data-options="iconCls:'icon-cancel'" onclick="$('#dlg').dialog('close')">关闭</a>
					</div>
				</td>
			</tr>
		</table>
	</form>

	<script type="text/javascript">
		var DLTAOptType = -1;
		var DLTACallback;
		
		function openDLTADialog(DTLAData,callback){
			$("#DTLAForm #rec_date").datebox("setValue",DTLAData.row.rec_date);
			$("#DTLAForm #rec_money").numberbox("setValue",DTLAData.row.rec_money);
			$("#DTLAForm #rowIndex").val(DTLAData.rowIndex);
			$("#DTLAForm #rec_money").focus();
			DLTACallback = callback;
		}

		function saveDLTA() {
			if(!$("#DTLAForm").form("validate")){
				return;
			}
			var data = {};
			data.rec_date = $("#DTLAForm #rec_date").datebox("getValue");
			data.rec_money = $("#DTLAForm #rec_money").numberbox("getValue");
			data.rowIndex = $("#DTLAForm #rowIndex").val();
			DLTACallback(data);
		}
	</script>

</body>
</html>