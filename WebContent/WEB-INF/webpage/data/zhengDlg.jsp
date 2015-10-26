<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix = "gst" uri = "/gsui-tags" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
<style type="text/css">
    	.ftitle{
        font-size:14px;
        font-weight:bold;
        padding:5px 0;
        margin-bottom:10px;
        border-bottom:1px solid #ccc;
    }
</style>
<script type="text/javascript">
function ClosezhengDlg(){
	$("#zhengForm").form('clear');
	$('#zhengDlg').dialog('close');	

}

</script>
</head>
<body>
<div id = "zhengDlg" class = "easyui-dialog" data-options = "modal:true" style = "width:550px;height:420px;padding:0px 0 0px 0px" closed="true">
	
	<form id = "zhengForm" method = "POST">
	 <table style="padding-left: 50px;padding-top: 20px">
	   <tr>
	     <th>证件 </th>
	     <td><input name="cmpqual_seq" id="cmpqual_seq" class="easyui-combobox" data-options="valueField: 'id',    
        textField: 'text',    
        url: 'franController.do?getCertificates'
        " editable="false" style="width: 300px"/> 
	     <a id="" href="#" class="easyui-linkbutton" data-options="" onclick="openStaff()">...</a> 
	     </td>
	   </tr>
	   <tr>
	   
	   
	     <th>人员1 </th>
	     <td><input id="staff_id1" type="text" readonly="readonly"/><input id="staff1"   type="text" readonly="readonly"/> 
	     </td>
	   </tr>
	   <tr>
	     <th>人员2 </th>
	     <td><input id="staff_id2" type="text" readonly="readonly"/><input id="staff2"   type="text" readonly="readonly"/> 
	     </td>
	   </tr>
	   <tr>
	     <th>人员3 </th>
	     <td><input id="staff_id3" type="text" readonly="readonly"/><input id="staff3"   type="text" readonly="readonly"/> 
	     </td>
	   </tr>
	   <tr>
	     <th>人员4 </th>
	     <td><input id="staff_id4" type="text" readonly="readonly"/><input id="staff4"   type="text" readonly="readonly"/> 
	     </td>
	   </tr>
	   <tr>
	     <th>人员5 </th>
	     <td><input id="staff_id5" type="text" readonly="readonly"/><input id="staff5"   type="text" readonly="readonly"/> 
	     </td>
	   </tr>
	   <tr>
	     <th>人员6 </th>
	     <td><input id="staff_id6" type="text" readonly="readonly"/><input id="staff6"   type="text" readonly="readonly"/> 
	     </td>
	   </tr>
	   <tr>
	     <th>人员7 </th>
	     <td><input id="staff_id7" type="text" readonly="readonly"/><input id="staff7"   type="text" readonly="readonly"/> 
	     </td>
	   </tr>
	   <tr>
	     <th>人员8 </th>
	     <td><input id="staff_id8" type="text" readonly="readonly"/><input id="staff8"   type="text" readonly="readonly"/> 
	     </td>
	   </tr>
	   <tr>
	     <th>人员9 </th>
	     <td><input id="staff_id9" type="text" readonly="readonly"/><input id="staff9"   type="text" readonly="readonly"/> 
	     </td>
	   </tr>
	   <tr>
	     <th>人员10 </th>
	     <td><input id="staff_id10" type="text" readonly="readonly"/><input id="staff10"   type="text" readonly="readonly"/> 
	     </td>
	   </tr>
	   <input type="hidden" id="i_type" name="i_type" />
	   <input type="hidden" id="pre_regseq" name="pre_regseq"/>
	 </table>
	</form>
	
			<div id="dlg-buttons" style="padding-left: 300px">
				<a href = "javascript:void(0)" class = "easyui-linkbutton" data-options = "iconCls:'icon-ok'" onclick = "zhengDialogSave()">确定</a>
				<a href = "javascript:void(0)" class = "easyui-linkbutton" data-options = "iconCls:'icon-cancel'" onclick = "ClosezhengDlg()">关闭</a>
			</div>
		</div>
	
</body>
</html>