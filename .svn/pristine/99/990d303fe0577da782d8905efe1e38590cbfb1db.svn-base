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
function franDlgClose(){
	$.messager.confirm('提示','是否确定返回主界面？',function(r){
		if(r){
			$('#custVisiForm').form('clear');
			simpleFranDialog.dialog('close',true);
		}
	});
}
</script>
</head>
<body>
<div id = "franDlg" class = "easyui-dialog" data-options = "modal:true" style = "width:800px;height:530px;padding:0px 0 0px 0px" closed="true">
	<form id = "custVisiForm" method = "POST">
		<table>
   		<tr>
       		<th align="right">加盟方代码<input type="hidden" name="nick"><input type="hidden" name="cmp_seq"></th>

       		<td><input id="cmp_id" onblur="loadFranInfo()" type="text" style="width: 120px" name="cmp_id" class="easyui-validatebox" missingMessage="加盟方代码必须填写" required="true" validType="checkLength[10]"></td>   
 
   
       		<th align="right">全称</th>
       		<td><input type="text" style="width: 280px" name="cmp_name" class="easyui-validatebox" missingMessage="全称必须填写" required="true" validType="checkLength[60]"></td>   
       
       		<th align="right">简称</th>
       		<td><input type="text" name="cmp_sname" class="easyui-validatebox" missingMessage="简称必须填写" required="true" validType="checkLength[20]"></td>  
   		</tr>
   
   		<tr>
       		<th align="right">英文名称</th>
       		<td colspan="3"><input type="text" style="width: 290px" name="cmp_engname" class="easyui-validatebox" validType="checkLength[60]">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>所属公司</b></td>   
       
       		

       		<td colspan="3"><input type="text"  style="width: 80px"  name="belong_cmp" readonly>&nbsp;&nbsp;<input type="text"  style="width: 120px" id="belong_cmp_name" class="easyui-validatebox" readonly >
       		&nbsp;&nbsp;<a id="cmpSel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="openCompanySel()"></a>  </td>


       		<th align="right"></th>
       		<td></td>     
   		</tr>
		</table>
		
		<fieldset style="width:750px;">
    		<legend><b>行政区域</b></legend>
   			<table>
   				<tr>
       		<th align="right">国家代号</th>

       		<td><input type="text" name="cmp_country" class="easyui-validatebox" missingMessage="国家代号必须填写" required="true" readonly="readonly" >&nbsp;&nbsp;<input type="text" id="cmp_country_name" style="width: 150px" readonly="readonly"></td>


       		<th align="right">省份代号</th>

       		<td><input type="text" name="cmp_province" class="easyui-validatebox" missingMessage="省份代号必须填写" required="true" readonly="readonly" >&nbsp;&nbsp;<input type="text" id="cmp_province_name"  style="width: 150px" readonly="readonly" ></td>

   				</tr>
   				
   				<tr>
       		<th align="right">城市代号</th>

       		<td><input type="text" name="cmp_city" class="easyui-validatebox" missingMessage="城市代号必须填写" required="true" readonly="readonly">&nbsp;&nbsp;<input type="text" id="cmp_city_name"  style="width: 150px" readonly="readonly"></td>


       		<th align="right">县城代号</th>

       		<td><input type="text" name="cmp_county" readonly="readonly">&nbsp;&nbsp;<input type="text" id="cmp_county_name"  style="width: 150px" readonly="readonly"></td>

   				</tr>
   				
   				<tr>
       		<th align="right">城镇代号</th>

       		<td><input type="text"  style="width: 100px" name="cmp_town" class="easyui-validatebox" readonly="readonly">&nbsp;&nbsp;<input type="text" id="cmp_town_name" style="width: 180px" readonly="readonly"></td>

   				<th align="right">
   					<a href = "javascript:void(0)" class = "easyui-linkbutton" data-options="iconCls:'icon-search'" onClick = "openAreaDlg()"></a>
   				</th>
   				</tr>
   				
   				<tr>
       		<th align="right">详细地址</th>
       		<td colspan="5"><input type="text" style="width: 650px" name="cmp_address" class="easyui-validatebox" validType="checkLength[100]"></td>   
       			</tr>
   			</table>
  		</fieldset>
		<table>
	   <tr>
	    <td style="width: 300px" align="center"><b>公司行业：</b><input id="cmp_craft" name="cmp_craft" class="easyui-combobox"  data-options="    
        missingMessage:'公司行业必须填写',
        valueField: 'id',    
        textField: 'text',    
        url: 'franController.do?CmpComboInfo&cmp=1'  

        " missingMessage="公司行业必须填写" required="true" editable="false" />  

	    </td>
	   
	    <td  style="width: 300px" align="center"><b>公司类别：</b><input id="cmp_type" name="cmp_type" class="easyui-combobox" data-options="    
        valueField: 'id',    
        textField: 'text',    
        url: 'franController.do?CmpComboInfo&cmp=2'  

        " editable="false" />  

	    </td>
	   
	    <td style="width: 300px" align="center"><b>公司级别：</b><input id="cmp_level" name="cmp_level" class="easyui-combobox" data-options="    
        valueField: 'id',    
        textField: 'text',    
        url: 'franController.do?CmpComboInfo&cmp=level'  

        " editable="false" />  

	    </td>
	   </tr>
	</table>
	<table style="">
   		<tr>
       		<th align="right">邮政编码</th>
       		<td><input type="text" name="cmp_postcode" class="easyui-validatebox" validType="zip"></td>   
       
       		<th align="right">法定代表人</th>
       		<td><input type="text" name="cmp_charger" class="easyui-validatebox" missingMessage="法定代表人必须填写" required="true" validType="checkLength[20]"></td>   
   
       		<th align="right">营业执照</th>
       		<td><input type="text"  style="width:240px" name="business_license" class="easyui-validatebox" validType="checkLength[30]" required="true"></td>   
   		</tr>
   		
   		<tr>
       		<th align="right">联系人1</th>
       		<td><input type="text" name="cmp_contactor1" class="easyui-validatebox" missingMessage="联系人1必须填写" required="true" validType="checkLength[10]"></td>   
       
       		<th align="right">电话</th>
       		<td><input type="text" name="cmp_tel1" class="easyui-validatebox" missingMessage="电话必须填写" required="true" validType="phone"></td>   
   
       		<th align="right">手机</th>

       		<td><input type="text"  style="width:240px"  name="cmp_mobile1" class="easyui-validatebox" missingMessage="手机必须填写" required="true" validType="mobile"></td>   

   		</tr>
   		
   		<tr>
   			<th align="right"></th>
       		<td></td>   
       		<th align="right">邮件地址</th>

       		<td><input type="text" name="cmp_email1" class="easyui-validatebox" validType="email" invalidMessage="邮箱格式不正确" required="true" missingMessage="邮箱为必填项" style="width:140px"></td>   

       
       		<th align="right">通讯地址</th>

       		<td><input type="text" style="width: 290px" name="cmp_addr1" validType="checkLength[50]" class="easyui-validatebox" required="true" missingMessage="通讯地址必须填写"></td>    

   		</tr>
   		
   		<tr>
       		<th align="right">联系人2</th>
       		<td><input type="text" name="cmp_contactor2" class="easyui-validatebox" missingMessage="联系人2必须填写" validType="checkLength[10]" ></td>   

       
       		<th align="right">电话</th>
       		<td><input type="text" name="cmp_tel2" class="easyui-validatebox" missingMessage="电话必须填写" validType="phone" ></td>   

   
       		<th align="right">手机</th>

       		<td><input type="text" style="width: 240px" name="cmp_mobile2" class="easyui-validatebox" validType="mobile" ></td>   

   		</tr>
   		
   		<tr>
   			<th align="right"></th>
       		<td></td>
       		<th align="right">邮件地址</th>
       		<td><input type="text" name="cmp_email2" class="easyui-validatebox" validType="email" invalidMessage="邮箱格式不正确" style="width:140px"></td>   
       
       		<th align="right">通讯地址</th>
       		<td><input type="text" style="width: 290px" name="cmp_addr2" validType="checkLength[50]"></td>    
   		</tr>
   		
   		<tr>
       		<th align="right">开户银行</th>
       		<td><input type="text" name="bank_name1" validType="checkLength[30]"></td>   
       
       		<th align="right">银行电话</th>
       		<td><input type="text" name="bank_tel1" class="easyui-validatebox" validType="phone"></td>   
   
       		<th align="right">银行账号</th>
       		<td><input type="text" style="width: 240px" name="bank_accno1" validType="checkLength[30]"></td>   
   		</tr>
   		
   		<tr>
       		<th align="right">开户银行2</th>
       		<td><input type="text" name="bank_name2" validType="checkLength[30]"></td>   
       
       		<th align="right">银行电话</th>
       		<td><input type="text" name="bank_tel2" class="easyui-validatebox" validType="phone"></td>   
   
       		<th align="right">银行账号</th>
       		<td><input type="text" style="width: 240px" name="bank_accno2" validType="checkLength[30]"></td>   
   		</tr>
   		
   		<tr>
       		<th align="right">经营范围</th>
       		<td colspan="5"><input class="easyui-validatebox" type="text" style="width: 690px" name="business_area" validType="checkLength[200]"></td>   
       </tr>
       
       <tr>
       		<th align="right">备注</th>
       		<td colspan="5"><input class="easyui-validatebox" type="text" style="width: 690px" name="cmp_desc" validType="checkLength[100]"></td>    
   		</tr>
   		
	</table>			
	</form>
	<div id="dlg-buttons" style="padding-left: 630px">
				<a href = "javascript:void(0)" class = "easyui-linkbutton" data-options = "iconCls:'icon-ok'" onclick = "franDialogSave()">提交</a>
				<a href = "javascript:void(0)" class = "easyui-linkbutton" data-options = "iconCls:'icon-cancel'" onclick = "$('#franDlg').dialog('close')">关闭</a>
			</div>
		</div>
</body>
</html>