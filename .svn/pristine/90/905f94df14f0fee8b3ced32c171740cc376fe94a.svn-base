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
function calculate(){
	var CONTRACT_PRICE=$('#CONTRACT_PRICE').val();
	var MDEDUCT_RATIO=$('#MDEDUCT_RATIO').val();
	var TAX_RATIO=$('#TAX_RATIO').val();
	var OTH_RATIO=$('#OTH_RATIO').val();
	var BAIL_RATIO=$('#BAIL_RATIO').val();
	$('#MDEDUCT').val(CONTRACT_PRICE*MDEDUCT_RATIO*0.01);
	$('#TAX').val(CONTRACT_PRICE*TAX_RATIO*0.01);
	$('#OTH').val(CONTRACT_PRICE*OTH_RATIO*0.01);
	$('#BAIL').val(CONTRACT_PRICE*BAIL_RATIO*0.01);
	var total=CONTRACT_PRICE*MDEDUCT_RATIO*0.01+CONTRACT_PRICE*TAX_RATIO*0.01+CONTRACT_PRICE*OTH_RATIO*0.01
	$('#total').val(total);
	var respon=CONTRACT_PRICE-total;
	$('#RESPON_COST').val(respon);
}
</script>
</head>
<body>
<div id = "agreeDlg" class = "easyui-dialog" data-options = "modal:true" style = "width:930px;height:620px;padding:0px 0 0px 0px" closed="true">
	
	<form id = "agreeForm" method = "POST">
	
	<table style="width: 910px; height: 75px; padding-left:5px">
	
	        <tr><td><input type="hidden" name="AGREE_SEQ"><input type="hidden" name="NICK"><input type="hidden" id="PROJ_NO" name="PROJ_NO"></td></tr>
	   		<tr>
	       		<th width="65px" align="right">工程编码</th>
	   		  	<td width="202px"><input type="text" style="width: 150px" readonly="readonly" id="proj_id" class="easyui-validatebox" missingMessage="工程编码为必填项" required=true validType='checkLength[32]'>
	   		  	</td>   
	       
	       		<th width="65px" align="right"> 工程名称</th>
	   		   	<td><input type="text" readonly="readonly" id="proj_name" style="width:200px"></td>
			  
			  	<th width="10px" align="right">简称</th>
	   		  	<td><input type="text" style="width: 150px" readonly="readonly" id="proj_sname">
	   		  	<a id="agreSel" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-search'"  onclick="openAgreeProjSel()"></a></td> 
			    
	   		</tr>
	   
	   		<tr>
	       		<th height="25px" align="right">加盟方</th>
	       		<td colspan="3"><input type="hidden" style="width: 150px" name="FRANS_ID">
	       		<input type="text" id="cmp_sname" style="width: 100px" readOnly="readonly">
	       		&nbsp;<b>剩余履约保证金</b>
	       		<input type="text"  style="width: 100px" name="REMAIN_DEPOSIT" class="easyui-numberbox" missingMessage="剩余履约保证金为必填项" required=true precision='2'></td> 
	       		
	   		</tr>
			
			<tr>
	       		<th height="30px" align="right">承包范围</th>
	       		<td colspan="6"><input name="CONTRACT_RANGE" type="text" style="width: 630px" siza="8" class="easyui-validatebox" missingMessage="承包范围为必填项" required=true validType='checkLength[100]'></td>   
			</tr>
			
			<tr>
	       		<th align="right">开工日期</th>
	       		<td colspan="3"><input type="text" style="width: 150px" readonly="readonly" id="work_sdate">
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>竣工日期</b><input type="text" style="width:150px" readonly="readonly" id="work_edate"></td
			><td width="28"></th>
			<tr>
			    <th align="right">质量等级</th>
				<td>
	   		   <label><input name="QUALITY_GRADE" type="radio" id="QUALITY_GRADE" value="1"  checked="checked" />1</label> 
				&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><input name="QUALITY_GRADE" type="radio" value="2" />2 </label></td>
			</tr>
				
			<tr>
	       		<th align="right" width="80px">完全控制目标</th>
	       		<td colspan="5"><input type="text" style="width: 500px" name="SAFE_CONTROL" class="easyui-validatebox" missingMessage="完全控制目标为必填项" required=true validType='checkLength[40]'></td>   
			</tr>
			
			<tr>
	       		<th align="right">合同价</th>
	       		<td colspan="3"><input type="text" style="width: 150px" name="CONTRACT_PRICE" id="CONTRACT_PRICE" onblur="calculate()" class="easyui-numberbox" missingMessage="合同价为必填项" required=true precision="2"></td>   
			</tr>
	</table>
	<hr>
   	<table>
	        <tr>
	       		<th width="120px" height="34"  align="right">管理费比例（%）</th>
	       		<td colspan="3"><input type="text" style="width: 100px" name="MDEDUCT_RATIO" id="MDEDUCT_RATIO" value="3.5" onblur="calculate()" class="easyui-numberbox" missingMessage="管理费比例为必填项" required=true  min="0" max="100" precision="2"></td>
				<th width="65px" align="right">金额</th>
			  <td width="395px"><input type="text" style="width: 100px" id="MDEDUCT" readonly="readonly"></td>   
				<td width="0px"></td>   
			</tr>
			
	        <tr>
	       		<th height="36px" align="right">税金比例（%）</th>
	       		<td colspan="3"><input type="text" style="width: 100px" name="TAX_RATIO" id="TAX_RATIO" value="3.47" onblur="calculate()" class="easyui-numberbox" missingMessage="税金比例为必填项" required=true  min="0" max="100" precision="2"></td>
				<th align="right">金额</th>
				<td><input type="text" style="width: 100px" id="TAX" readonly="readonly"></td>   
			</tr>
			
	         <tr>
	       		<th height="38" align="right">其他费用比例（%）</th>
	         	<td colspan="3"><input type="text" style="width: 100px" name="OTH_RATIO" id="OTH_RATIO" value="0" onblur="calculate()" class="easyui-numberbox" missingMessage="其他税金为必填项" required=true  min="0" max="100" precision="2"></td>
				<th align="right">金额</th>
				<td><input type="text" style="width: 100px" id="OTH" readonly="readonly"></td>    
			</tr>
        
	</table>
	   <hr>
	<table>
	     <tr>
       		<th width="120px" height="34px" align="right">费用合计</th>
       		<td colspan="3"><input type="text" style="width: 100px" id="total" readonly="readonly"></td>  
		</tr>
		
		 <tr>
       		<th height="29px" align="right">保证金比例（%）</th>
         	<td colspan="3"><input type="text" style="width: 100px" name="BAIL_RATIO" id="BAIL_RATIO" value="5" onblur="calculate()" class="easyui-numberbox" missingMessage="保证金比例为必填项" required=true  min="0" max="100" precision="2">
		     &nbsp;&nbsp; <b>金额</b> 
		     <input type="text" style="width: 100px" id="BAIL" readonly="readonly"></td>   
		</tr>
		
		 <tr>
       		<th height="29px" align="right">责任成本</th>
       		<td colspan="3"><input type="text" style="width: 100px" name="RESPON_COST" id="RESPON_COST" readonly="readonly"></td>  
		</tr>
		
		<tr>
       		<th height="52px" align="right">备注</th>
       		<td colspan="3"><input type="text" style="width: 550px" name="REMARKS" class="easyui-validatebox" missingMessage="备注为必填项" required=true validType='checkLength[300]'></td>  
		</tr>
	</table>
	</form>
	
	<hr>		
		<div id="tb" style= "margin-bottom:5px;margin-left: 700px">
				<a href = "javascript:void(0)" class = "easyui-linkbutton" data-options = "iconCls:'icon-ok'" onclick = "agreeDlgSave()">提交</a>
			</div>

		</div>
		
</body>
</html>