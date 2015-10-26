<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>

	<form id="DTLBForm" method="POST" style="padding: 40px">
		<table>
			<tr>
				<th>扣款事项</th>
				<td><input id="cmpqual_seq" class="easyui-combobox"   
    data-options="valueField:'id',textField:'text',url:'franController.do?getCmpqualInfos',panelHeight:'auto',editable:false,required:true,width:230" />
    				<input type="hidden" id="compact_id">
					<input type="hidden" id="rowIndex"></td>
			</tr>
			<tr>
				<th>扣款金额</th>
				<td><input type="text" id="deduct_money"
					class="easyui-numberbox" required="required"
					data-options="min:0,max:999999999999.99,precision:2"></input></td>
			</tr>
			<tr>
				<td colspan="3">

					<div id="" style="margin-top: 5px; margin-left: 170px">
						<a href="javascript:void(0)" class="easyui-linkbutton"
							data-options="iconCls:'icon-ok'" onclick="saveDTLB()">提交</a>
						<a href="javascript:void(0)" class="easyui-linkbutton"
							data-options="iconCls:'icon-cancel'" onclick="$('#dlg').dialog('close')">关闭</a>
					</div>
				</td>
			</tr>
		</table>
	</form>

	<script type="text/javascript">
		var DTLBOptType = -1;
		var DTLBCallback;
		
		function openDTLBDialog(DTLBData,callback){
			/* $("#DTLBForm #rec_date").datebox("setValue",DTLBData.row.rec_date);
			$("#DTLBForm #rec_money").numberbox("setValue",DTLBData.row.rec_money);
			$("#DTLBForm #rowIndex").val(DTLBData.rowIndex);
			$("#DTLBForm #rec_money").focus(); */
			$("#DTLBForm #cmpqual_seq").combobox("setValue",DTLBData.cmpqual_seq);
			$("#DTLBForm #compact_id").val(DTLBData.compact_id);
			$("#DTLBForm #deduct_money").numberbox("setValue",DTLBData.deduct_money);
			$("#DTLBForm #rowIndex").val(DTLBData.rowIndex);
			//alert(DTLBData.rowIndex);
			DTLBCallback = callback;
		}

		function saveDTLB() {
			if(!$("#DTLBForm").form("validate")){
				return;
			}
			var data = {};
			data.cmpqual_seq = $("#DTLBForm #cmpqual_seq").combobox("getValue");
			data.cmpqual_text = $("#DTLBForm #cmpqual_seq").combobox("getText");
			data.compact_id = $("#DTLBForm #compact_id").val();
			data.deduct_money = $("#DTLBForm #deduct_money").numberbox("getValue");
			data.rowIndex = $("#DTLBForm #rowIndex").val();
			DTLBCallback(data);
		}
	</script>

</body>
</html>