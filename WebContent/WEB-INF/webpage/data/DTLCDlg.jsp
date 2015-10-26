<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>

	<form id="DTLCForm" method="POST" style="padding: 40px">
		<table>
			<tr>
				<th>扣款事项</th>
				<td><input id="cmpqual_desc" class="easyui-combobox"   
    data-options="valueField:'id',textField:'text',url:'franController.do?getCmpqualInfosC',panelHeight:'auto',editable:true,required:true,width:230" />
    				<input type="hidden" id="line_no">
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
							data-options="iconCls:'icon-ok'" onclick="saveDTLC()">提交</a>
						<a href="javascript:void(0)" class="easyui-linkbutton"
							data-options="iconCls:'icon-cancel'" onclick="$('#dlg').dialog('close')">关闭</a>
					</div>
				</td>
			</tr>
		</table>
	</form>

	<script type="text/javascript">
		var DTLCOptType = -1;
		var DTLCCallback;
		
		function openDTLCDialog(DTLCData,callback){
			/* $("#DTLCForm #rec_date").datebox("setValue",DTLCData.row.rec_date);
			$("#DTLCForm #rec_money").numberbox("setValue",DTLCData.row.rec_money);
			$("#DTLCForm #rowIndex").val(DTLCData.rowIndex);
			$("#DTLCForm #rec_money").focus(); */
			$("#DTLCForm #cmpqual_desc").combobox("setValue",DTLCData.cmpqual_desc);
			$("#DTLCForm #deduct_money").numberbox("setValue",DTLCData.deduct_money);
			$("#DTLCForm #rowIndex").val(DTLCData.rowIndex);
			$("#DTLCForm #line_no").val(DTLCData.line_no);
			//alert(DTLCData.rowIndex);
			DTLCCallback = callback;
		}

		function saveDTLC() {
			if(!$("#DTLCForm").form("validate")){
				return;
			}
			var data = {};
			
			data.cmpqual_desc = $("#DTLCForm #cmpqual_desc").combobox("getText");
			data.deduct_money = $("#DTLCForm #deduct_money").numberbox("getValue");
			data.line_no = $("#DTLCForm #line_no").val();
			data.rowIndex = $("#DTLCForm #rowIndex").val();
			if($("#DTLCForm #cmpqual_desc").combobox("getValue")!=undefined){
				data.cmpqual_seq = $("#DTLCForm #cmpqual_desc").combobox("getValue").split("|")[0];
			}else{
				data.cmpqual_seq = "";
			}
			//data.cmpqualDescs = $("#DTLCForm #cmpqual_desc").combobox("getData");
			DTLCCallback(data);
		}
	</script>

</body>
</html>