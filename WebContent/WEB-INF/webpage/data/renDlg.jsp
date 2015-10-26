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
	<div>

		<table id="renDataGrid" class="easyui-datagrid"
			data-options="border:0,rownumbers:true,fitColumns:true,fit:false,height:430">
			<thead>
				<tr>
					<th data-options="field:'STAFF_ID',width:100">雇员编号</th>
					<th data-options="field:'STAFF_NAME',width:100">姓名</th>
				</tr>
			</thead>
		</table>




		<div id="dlg-buttons" align="right">
			<a href="javascript:void(0)" class="easyui-linkbutton"
				data-options="iconCls:'icon-ok'" onclick="tenderDialogSave()">确定</a>

			<a href="javascript:void(0)" class="easyui-linkbutton"
				data-options="iconCls:'icon-cancel'"
				onclick="$('#dlg').dialog('close');">关闭</a>
		</div>


	</div>


	<script type="text/javascript">
		var meth1;
		var meth2;
		var meth3;
		function openRenSelDlg(method1) {
			$("#dlg #renDataGrid").datagrid({
				url : "franController.do?loadRen",
			});
			meth1 = method1;
		}

		function openInsSelDlg(method2) {
			$("#dlg #renDataGrid").datagrid({
				url : "franController.do?loadIns",
			});
			meth2 = method2;
		}

		function tenderDialogSave() {
			var rows = $("#dlg #renDataGrid").datagrid('getSelections');
			if (rows[0].LD_FLAG == 1) {
				meth1(rows);
			}
			if (rows[0].YL_FLAG == 1) {
				meth2(rows);
			}
			meth3(rows);

		}
		function openStaffSelDlg(method, seq) {
			$("#dlg #renDataGrid").datagrid({
				url : "franController.do?loadStaff&cmpqual_seq=" + seq,
			});
			meth3 = method;
		}
	</script>



</body>
</html>