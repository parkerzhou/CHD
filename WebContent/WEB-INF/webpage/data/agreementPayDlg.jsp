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
	<div id="agrPayDlg" class="easyui-dialog" data-options="modal:true"
		style="width: 700px; height: 500px; padding: 0px 0 0px 0px"
		closed="true">
		<form id="agrPayForm" method="post">
			
				<div style="padding-left:0px">
					<table>
						<tr>
							<th align="right">工程编号</th>
							<td><input type="hidden" id="proj_id" style="width:150px" readOnly>
							
							<input type="text" id="proj_no" style="width:150px" readOnly> &nbsp;&nbsp;<a
								id="btn" href="javascript:void(0)" class="easyui-linkbutton" data-options="width:50,iconCls:'icon-search'"
								onclick="openFranPro()"></a></td>

							<th  align="right">工程名称</th>
							<td><input type="text" id="proj_name" style="width:150px" readOnly></td>

							<th  align="right">简称</th>
							<td><input type="text" id="proj_sname" style="width:100px" readOnly></td>


						</tr>

						<tr>
							<th align="right">加盟方</th>
							<td><input type="text" style="width:150px" id="cmp_sname" readOnly></td>

							<th align="right">开工日期</th>
							<td><input id="work_sdate" type="text" class="easyui-datebox" style="width:100px" readOnly></input></div> </td>

							<th align="right">竣工日期</th>
							<td ><input id="work_edate" type="text" class="easyui-datebox" style="width:100px" readOnly></input></div> </td>
						</tr>

						<tr>
							<th align="right">合同价</th>
							<td><input type="text" id="compact_amt" style="width:150px" readOnly></td>
							<th align="right">審定价</th>
							<td><input type="text" id="sd_money" style="width:100px" readOnly></td>
						</tr>
					</table>
				</div>
				
				
				
				
				
				
				
				
			 <table>
				<tr>
				<td>
					<fieldset style="width:400px;height:150px">
						<legend>
							<b>收款明细</b>
						</legend>
						<table id="pcomDataGrid" class="easyui-datagrid"
							data-options="border:0,rownumbers:false,fitColumns:true,fit:true">
							<thead>
								<tr>
									<th data-options="field:'COMPACT_ID',width:100">合同编码</th>
									<th data-options="field:'GET_SEQ',width:100">收款序号</th>
									<th data-options="field:'GET_DATE',width:100">客户付款日期</th>
									<th data-options="field:'GET_AMT',width:100">收款金额</th>
								</tr>
							</thead>
						</table>
					</fieldset>
				</td>
				
				  <td>
				   <div style="border:solid 1px #EEEEEE;height:150px" padding="0px">
					<table style="padding:10px" >
						<tr>
							<th align="left" width="80px">累计收款</th>
							<td><input type="text" id="SUM_GET_AMT" readOnly></td>
						</tr>

						<tr>
							<th width="80px" align="left">收款比例</th>
							<td><input type="text" id="PER_GET_AMT" readOnly></td>
						</tr>

						<tr>
							<th width="80px" align="left">累计付款</th>
							<td><input type="text" id="SUM_PAY_AMOUNT" readOnly></td>
						</tr>

						<tr>
							<th width="80px" align="left">累计扣费用</th>
							<td><input type="text" id="SUM_DEDUCT" readOnly></td>
						</tr>

						<tr>
							<th width="80px" align="left">累计扣保证金</th>
							<td><input type="text" id="SUM_BAIL" readOnly></td>
						</tr>

						<tr>
							<td></td><td><input type="checkbox" id="pay_flag" name="pay_flag" readOnly>完成付款</td>
						</tr>
                        <tr>
                         <td><input id="agree_seq" type="hidden" name="agree_seq">
                         <input id="agrPayDtlsAddArr" type="hidden" name="agrPayDtlsAddArr" >
                         <input id="agrPayDtlsEditArr" type="hidden" name="agrPayDtlsEditArr" >
                         <input id="agrPayDtlsDelArr" type="hidden" name="agrPayDtlsDelArr" >
                         <input id="nick" type="hidden" name="nick" ></td>
                        </tr>
					</table>
					</div>
					</td>
				</tr>	
	         </table>














				<div >
				 <fieldset style="height:170px">
    		         <legend><b>付款明细</b></legend>
					<div id="agreeTb" style="padding: 5px; height: auto">
						<div id="tb" style="margin-bottom: 0px;">
							<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add'"
								onclick="addAgrDtl()">新增</a> <a href="javascript:void(0)"
								class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="editAgrDtl()">修改</a> <a
								href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove'"
								onclick="delAgrDtl()">删除</a>
						</div>
					</div>
					
						
							<table id="agrPayDtlDataGrid" class="easyui-datagrid"
								style="width: 200px; height: 180px;"
								data-options="border:0,rownumbers:false,fitColumns:true,fit:true,toolbar:'#agreeTb'">
								<thead>
									<tr>
										<th data-options="field:'PAY_SEQ',width:50">序号</th>
									    <th data-options="field:'PAY_DATE',width:100">申请付款日期</th>
										<th data-options="field:'PAY_AMOUNT',width:100">申请付款金额</th>
										<th data-options="field:'MANAGE_COST',width:100">管理费</th>
										<th data-options="field:'TAX_COST',width:100">税金</th>
										<th data-options="field:'OTH_COST',width:100">其他费</th>
										<th data-options="field:'BAIL_COST',width:100">扣保证金</th>
										<th data-options="field:'SIGN_STATUSTEXT',width:100">批签状态</th>
									</tr>
								</thead>
							</table>

						
					
					</fieldset>
				</div>
				
				
				

			
			<div style="margin-top:5px;padding-left:570px">
				<a href="#" id="agrPaySubmitBtn" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="submitAgrPay()">提交</a> 
				<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'"  onclick="$('#agrPayDlg').dialog('close')">关闭</a>
			</div>
		</form>
	</div>
</body>
</html>