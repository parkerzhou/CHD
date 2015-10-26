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
		style="width:750px; height:520px; padding: 0px 0 0px 0px"
		closed="true">

		<form id="agrPayForm" method="POST">

			<table style="height: 75px" style="margin-left:100px">
				<input id="AGREE_SEQ"  name="agree_seq" type="hidden">
				<tr>
					<th width="110" align="right">工程编号</th>
					<td ><input type="hidden"  id="proj_name" style="width:150px" >
					<input type="text" id="proj_no" style="width:150px" readOnly>&nbsp;&nbsp;&nbsp;<a
								id="btn" href="javascript:void(0)" class="easyui-linkbutton"  data-options="width:120,iconCls:'icon-search' "
								onclick="openFranPro()"></a> </td>
					<th  width="110" align="right">工程名称</th><td colspan="3"><input type="text" readOnly
						style="width: 350px" id="proj_sname"class="easyui-validatebox" required="true"  ></td>
				</tr>

				<tr>
					<th  align="right">加盟方</th>
					<td ><input type="text" id="cmp_sname"  readOnly  style="width:200px"
						></td>

					<th align="right">开工日期</th>
					<td ><input id="work_sdate" type="text" readOnly
						class="easyui-datebox"  ></input>
					</td>

					<th width="80" align="right">竣工日期</th>
					<td  colspan="3"><input id="work_edate" readOnly  type="text"
						class="easyui-datebox" ></input>
					</td>

				</tr>

				<tr>
					<th align="right">合同价</th>
					<td ><input type="text"  readOnly style="width:200px"
						id="compact_amt"></td>

					<th align="right">审定价</th>
					<td><input type="text" readOnly id="sd_money" ></td>

					<th align="right"></th>
					<td colspan="3"><label> <input type="checkbox" name="returnbail_flag" id="returnbail_flag"
							 value="checkbox" /> 已退齐保证金
					</label></td>

				</tr>
			</table>
			<table style="margin-left: 20px">
				<tr>

					<td width="300">
						<fieldset style="margin-left: 0px">
							<legend>
								<b>甲方付款</b>
							</legend>
							<table height="84" style="margin-left: 18px">
								<tr>
									<th  align="right">已付款</th>
									<td ><input type="text" id = "sum_amt"  readOnly style="width: 100px"
										></td>
								</tr>

								<tr>
									<th  align="right">尚欠款</th>
									<td ><input type="text" id="debt_amt"  readOnly style="width: 100px"
										></td>
								</tr>

							</table>
						</fieldset>
					</td>

					<td width="350">
						<fieldset style="margin-left: 20px">
							<legend>
								<b>费用扣除</b>
							</legend>
							<table height="84">
								<tr>
									<th  align="right">工程应扣费用</th>
									<td><input type="text" id="proj_sum" readOnly  style="width: 100px"
										></td>
								</tr>

								<tr>
									<th align="right">已扣费用</th>
									<td><input type="text" id="redcost" readOnly  style="width: 100px" ></td>
								<tr>
									<th align="right">尚欠费用</th>
									<td><input type="text" id="decost" readOnly  style="width: 100px" ></td>
								</tr>

							</table>
						</fieldset>
					</td>

					<td width="350">
						<fieldset style="margin-left: 20px">
							<legend>
								<b>保证金</b>
							</legend>
							<table  height="84">
								<tr>
									<th  align="right">应扣工程保证金</th>
									<td ><input type="text" id="detcost" readOnly style="width: 100px"></td>
								</tr>

								<tr>
									<th align="right">实扣工程保证金</th>
									<td><input type="text"  id ="bail_cost" readOnly style="width: 100px"></td>
								<tr>
									<th align="right">已退工程保证金</th>
									<td><input type="text" id="stcost" readOnly  style="width: 100px"></td>
								</tr>

							</table>
						</fieldset>
					</td>
				</tr>
				<tr>
                         <td><input id="agree_seq" type="hidden" name="agree_seq">
                         <input id="agrPayDtlsAddArr" type="hidden" name="agrPayDtlsAddArr" >
                         <input id="agrPayDtlsEditArr" type="hidden" name="agrPayDtlsEditArr" >
                         <input id="agrPayDtlsDelArr" type="hidden" name="agrPayDtlsDelArr" >
                         <input id="nick" type="hidden" name="nick" ></td>
                        </tr>
			</table>
			<table>
			<tr><td>
			<fieldset style="height:240px;margin-left:20px">
				<legend style="padding-top:3px">
					<b>退保证金</b>
				</legend>
				<div id="agrPaydTb" style="padding: 5px; height: auto">
					<div id="tb" style="margin-bottom: 5px; width: 680px">
						<a href="javascript:void(0)" class="easyui-linkbutton"
							iconCls="icon-add" onclick="addAgrPayd()">新增</a> <a href="javascript:void(0)"
							class="easyui-linkbutton" iconCls="icon-edit" onclick="editAgrPayd()">修改</a> <a
							href="javascript:void(0)" class="easyui-linkbutton"
							iconCls="icon-remove" onclick="delAgrPayd()">删除</a>
					</div>
				</div>
						<table id="agrPaydDataGrid" class="easyui-datagrid"
							data-options="border:0,rownumbers:false,fit:true,fitColumns:true,toolbar:'#agrPaydTb',pageList:[10,15,20,30,50,100]">
							<thead>
								<tr>
									<th data-options="field:'RETURE_DATE',width:100">退保日期</th>
									<th data-options="field:'RETURN_AMOUNT',width:100">退保金额</th>
								</tr>
							</thead>
						</table>
			</fieldset>
			</td></tr>
			</table>
		</form>

		<div id="dlg-buttons" style="padding-left:605px">
			<a href="javascript:void(0)" class="easyui-linkbutton"
				data-options="iconCls:'icon-ok'" id= "agrPaySubmitBtn" onclick="sumbitAgrPayd()">提交</a>
			<a href="javascript:void(0)" class="easyui-linkbutton"
				data-options="iconCls:'icon-no'" onclick="$('#agrPayDlg').dialog('close')">关闭</a>
		</div>
	</div>
</body>
</html>