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
function fproDlgClose(){
	$.messager.confirm('提示','是否确定返回主界面？',function(r){
		if(r){
			$('#fprojForm').form('clear');
			simpleFprojDialog.dialog('close',true);
		}
	});
}
</script>
</head>
<body>
<div id = "fprojDlg" class = "easyui-dialog" data-options = "modal:true" style = "width:800px;height:600px;padding:0px 0 0px 0px" closed="true">
	
	<form id = "fprojForm" method = "POST">
		<table>
	
        <input id="pre_regseq" name="pre_regseq" type="hidden">	
   		<tr>
       		<th align="right">预审编号</th>
       	<td><input type="text" name="pre_year" readonly="readonly"/> +&nbsp;JMYS&nbsp;+<input type="text"  style="width: 180px" name="pre_seq"  readonly="readonly">
       	
       	</td>  
       
       		<th align="right">登记日期</th>
       		<td><input type="text" id="reg_date" name="reg_date" class="easyui-datebox" required="ture" editable="false" ></td>   
   		<tr>
       		<th align="right">工程名称</th>
       		<td><input type="text" style="width: 395px" name="proj_name" class="easyui-validatebox" missingMessage="工程名称必须填写"  required="true" validType="checkLength[80]"></td>   
       
       		<th align="right">简称</th>
       		<td><input type="text"  style="width: 100px" name="proj_sname" class="easyui-validatebox" missingMessage="简称必须填写" required="true" validType="checkLength[20]"></td>
       		
       		<th align="right"></th>
       		<td></td>     
   		</tr>
   		</table>
   		
   		<fieldset>
    		<legend><b>工程地址</b></legend>
   			<table>
   				<tr>
       		<th align="right">国家代号</th>
       		<td><input type="text"  style="width: 100px" name="proj_country" class="easyui-validatebox" missingMessage="国家代号为必填项" required="true" readonly="readonly" >&nbsp;&nbsp;<input type="text" id="proj_country_name" style="width: 180px" readonly="readonly"></td>

       		<th align="right">省份代号</th>
       		<td><input type="text"  style="width: 100px" name="proj_province" class="easyui-validatebox" missingMessage="省份代号为必填项" required="true" readonly="readonly">&nbsp;&nbsp;<input type="text" id="proj_province_name" style="width: 180px" readonly="readonly"></td>
   				</tr>
   				
   				<tr>
       		<th align="right">城市代号</th>
       		<td><input type="text"  style="width: 100px" name="proj_city" readonly="readonly">&nbsp;&nbsp;<input type="text" id="proj_city_name" style="width: 180px" readonly="readonly"></td>

       		<th align="right">县城代号</th>
       		<td><input type="text"  style="width: 100px" name="proj_county" readonly="readonly">&nbsp;&nbsp;<input type="text" id="proj_county_name" style="width: 180px" readonly="readonly"></td>
   				</tr>
   				
   				<tr>
       		<th align="right">城镇代号</th>
       		<td><input type="text"  style="width: 100px" name="proj_town" readonly="readonly">&nbsp;&nbsp;<input type="text" id="proj_town_name" style="width: 180px" readonly="readonly"></td>
       		<th align="right">
   					<a href = "javascript:void(0)" class = "easyui-linkbutton" data-options="iconCls:'icon-search'" onClick = "openFprojAreaDlg()"></a>
   				</th>
   				</tr>
   				
   				<tr>
       		<th align="right">详细地址</th>
       		<td colspan="5"><input  type="text"  class="easyui-validatebox" missingMessage="详细地址必填项" required="true" validType="checkLength[100]" style="width: 650px" name="proj_addr"></td>   
       			</tr>
   			</table>
  		</fieldset>
  		
  		<fieldset>
    		<legend><b>项目登记单位</b></legend>
   			<table>
   				<tr>
       		<th align="right">公司代号</th>
       		<td><input type="text"  style="width: 100px" name="cmp_id" class="easyui-validatebox" missingMessage="公司代码必填项" required="true" readonly="readonly" >&nbsp;&nbsp;<input type="text" id="cmp_name" style="width: 400px" readonly="readonly">
       		&nbsp;&nbsp;<a id="cmpSel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="openFprojCompanySel()"></a> </td>
   				</tr>
   				
   				<tr>
       		<th align="right">部门代号</th>
       		<td><input type="text"  style="width: 100px" name="dept_id" class="easyui-validatebox" missingMessage="部门代码必填项" required="true" readonly="readonly">&nbsp;&nbsp;<input id="dept_name" type="text"  style="width: 400px" readonly="readonly">
       		&nbsp;&nbsp;<a id="deptSel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="openFprojDeptSel()"></a></td>
   				</tr>
   				
   				<tr>
       		<th align="right">业务负责人</th>
       		<td><input type="text"  style="width: 100px" name="charger" class="easyui-validatebox" missingMessage="业务负责人" required="true" readonly="readonly">&nbsp;&nbsp;<input type="text" id="charger_name" style="width: 400px" readonly="readonly">
       		&nbsp;&nbsp;<a  href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="openEmployeeDeptSel()"></a></td>
   				</tr>
   			</table>
  		</fieldset>
  		
   		
   		<fieldset>
    		<legend><b>顾客公司</b></legend>
   			<table>
   				<tr>
       		<th align="right">公司代号</th>
       		<td><input type="text" name="cust_cmp" class="easyui-validatebox" missingMessage="公司代号必填项" required="true" readonly="readonly" ></td><td colspan="2">&nbsp;&nbsp;<input type="text" id="cust_cmp_name" style="width:300px" readonly="readonly">
       		&nbsp;&nbsp;<a  href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="openFproj2CompanySel()"></a>
       		</td>
   				</tr>
   				
   				<tr>
       		<th align="right">联系人</th>
       		<td><input type="text" id ="cust_cmp_contactor" readonly="readonly"></td>
       		<th align="right">联系电话</th>
       		<td><input type="text" id ="cust_cmp_tel1" readonly="readonly"></td>
   				</tr>
   				
   			</table>
  		</fieldset>
  		
  		<fieldset>
    		<legend><b>加盟方</b></legend>
   			<table>
   				<tr>
       		<th align="right">代号</th>
       		<td><input type="text"  style="width: 210px" name="frans_id" class="easyui-validatebox" missingMessage="代号必填项" required="true" readonly="readonly"></td><td colspan="2">&nbsp;&nbsp;<input type="text"  id="frans_name" style="width: 400px" readonly="readonly">
       		&nbsp;&nbsp;<a id="" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="openFprojFranSel()"></a></td>
   				</tr>
   				
   				<tr>
       		<th align="right">联系人</th>
       		<td><input type="text"  id="frans_contactor" style="width: 210px" readonly="readonly"></td>

       		<th align="right">联系电话</th>

       		<td><input type="text" style="width:360px"  id="frans_tel" readonly="readonly"></td>

   				</tr>
   				
   				<tr>
       		<th align="right">单位地址</th>

       		<td colspan="3"><input type="text" id="frans_address" style="width: 660px" readonly="readonly"></td>


   				</tr>
   			</table>
   			
   			<table>
   		<tr>
   			<th align="right">项目类型</th>
   			<td colspan="5"><label><input id="proj_type" name="proj_type" type="radio" value="1"  checked="checked" />1</label> 
			<label><input name="proj_type" type="radio" value="2" />2 </label> 
  			</td>
  			
  			<th align="right">批签状态</th>
   			<td colspan="5"><select id="sign_state" class="easyui-combobox" name="sign_state" " editable="false" class="easyui-validatebox" required="true" style="width:200px ">   
    			<option value="0">制作中</option>   
				<option value="1">批签中</option>   
				<option value="2">批签完成</option> 
			</select>  
			</td>
   		</tr>
       <tr>
       		<th align="right">备注</th>
       		<!-- <input type="text" style="width: 395px" name="proj_name" class="easyui-validatebox" missingMessage="工程名称必须填写"  required="true" validType="checkLength[80]"> -->
       		<td colspan="7"><input type="text" style="width: 650px" name="remarks" class="easyui-validatebox" required="true" validType="checkLength[100]">
       		<!-- <input type="text" class="easyui-validatebox" vilidType="checkLength[100]" required="true" style="width: 750px" name="remarks"> --></td>    
   		</tr>
   		
	</table>	
   			
  		</fieldset>
   		
	</form>
	
			<div id="dlg-buttons" style="padding-left: 600px;margin-bottom:20px">
				<a href = "javascript:void(0)" class = "easyui-linkbutton" data-options = "iconCls:'icon-ok'" onclick = "fprojDialogSave()">提交</a>
				<a href = "javascript:void(0)" class = "easyui-linkbutton" data-options = "iconCls:'icon-cancel'" onclick = "$('#fprojDlg').dialog('close');">关闭</a>
			</div>
		</div>
	
</body>
</html>