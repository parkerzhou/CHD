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
	<div id="quaMarDialog" class="easyui-dialog" data-options="modal:true"
		style="width: 975px; height: 600px; padding: 0px" closed="true">
		<form id="quaMarForm" method="post">
			<table>
				<tr>
					<td colspan="2">
						<table>
							<tr>
								<th align="right">加盟方</th>
								<td><input type="text" id="frans_name" readonly="readonly"><input
									type="hidden" id="frans_id" name="frans_id"><input type="hidden"
									name="nick"> <input type="hidden"
									name="quality_seq"></td>

								<th align="right">简称</th>
								<td><input type="text" id="frans_sname" readonly="readonly"></td>

								<th align="right">法人代表</th>
								<td><input type="text" id="frans_charger" readonly="readonly"></td>

								<th align="right">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系人</th>
								<td><input type="text" id="frans_contactor" readonly="readonly">
									&nbsp;&nbsp;<a id="franSelBtn" href="#" class="easyui-linkbutton"
									data-options="iconCls:'icon-search'" onclick="openQuaFranSel()"></a></td>
							</tr>

							<tr>
								<th align="right">电话</th>
								<td colspan="1"><input type="text" style="" id="frans_tel" readonly="readonly"></td>

								<th align="right">手机</th>
								<td><input type="text" style="" id="frans_mobile" readonly="readonly"></td>

								<th align="right">联系地址</th>
								<td colspan="3"><input type="text"
									id="frans_address" readonly="readonly" style="width:500px"></td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td>
						<div id="agreeTb" style="padding: 5px; height: auto">
							<div id="tb" style="margin-bottom: 0px;">
								<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add'" 
									onclick="addDTLA()">新增</a> <a href="javascript:void(0)" data-options="iconCls:'icon-edit'" 
									class="easyui-linkbutton" onclick="editDLTA()">修改</a> <a
									href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" 
									onclick="delDTLA()">删除</a>
							</div>
						</div>
						<table id="DTLADataGrid" class="easyui-datagrid"
							style="width: 250px; height: 400px;"
							data-options="border:20,rownumbers:false,fitColumns:true,fit:false,toolbar:'#agreeTb'">
							<thead>
								<tr>
									<th data-options="field:'rec_date',width:100">补交保证金日期</th>
									<th data-options="field:'rec_money',width:100">补交金额</th>
								</tr>
							</thead>
						</table>
					</td>
					<td>
						<div id="quaDTLBTabs" class="easyui-tabs"
							data-options="fit:false,border:1,height:400,width:690">
							<div title="一级扣除事项" style="">
								<table>
									<tr>
										<td width="335" height="360">
											<table id="TotalDTLBDataGrid" class="easyui-datagrid"
												data-options="border:1,rownumbers:true,fitColumns:true,fit:true">
												<thead>
													<tr>
														<th data-options="field:'cmpqual_text',width:300">扣除事项</th>
														<th data-options="field:'deduct_money',width:150">扣除金额</th>
													</tr>
												</thead>
											</table>
										</td>
										<td width="335" height="360">
											<table id="TotalDTLBDataGrid2" class="easyui-datagrid"
												data-options="border:1,rownumbers:true,fitColumns:true,fit:true">
												<thead>
													<tr>
														<th data-options="field:'proj_no',width:300">到期工程</th>
														<th data-options="field:'return_amount',width:150">到期退保证金</th>
													</tr>
												</thead>
											</table>
										</td>
									</tr>
								</table>
							</div>

							<div title="工程扣款明细" data-options="closable:false"
								style="padding: 0px;">
								<table>
									<tr>
										<td height="180" width="670">
											<table id="quaProjDataGrid" class="easyui-datagrid"
												data-options="border:0,rownumbers:true,fitColumns:false,fit:true,toolbar:'',singleSelect:true">
												<thead data-options="frozen:true">
													<tr>
														<th data-options="field:'PROJ_ID',width:200,formatter:quaProjFormatter">工程编号</th>
														<th data-options="field:'compact_id',width:210">合同编号</th>
													</tr>
												</thead>
												<thead>
													<tr>
														<th data-options="field:'compact_amt',width:100,formatter:quaProjFormatter1">合同价</th>
														<th data-options="field:'WORK_SDATE',width:100">开工日期</th>
														<th data-options="field:'WORK_EDATE',width:100">竣工日期</th>
														<th data-options="field:'maint_period',width:100">质保到期日</th>
														<th data-options="field:'business_charger',width:100">项目负责人</th>
														<th data-options="field:'dept_manager',width:100">部门负责人</th>
														<th data-options="field:'handle_people',width:100">经手人</th>
														<th data-options="field:'CW_MANAGER',width:100">财务负责人</th>
													</tr>
												</thead>
											</table>
										</td>
									</tr>
									<tr>
										<td height="150" width="678">
											<div id="ysb2" style="padding: 5px; height: auto">
												<a href="javascript:void(0)" class="easyui-linkbutton"data-options="iconCls:'icon-add'" 
													onclick="addDTLB()">新增</a> <a href="javascript:void(0)" data-options="iconCls:'icon-edit'" 
													class="easyui-linkbutton" onclick="editDTLB()">修改</a> <a
													href="javascript:void(0)" class="easyui-linkbutton"  data-options="iconCls:'icon-remove'" 
													onclick="delDTLB()">删除</a> <input type="hidden"
													id="proj_id">
											</div>
											<table id="DTLBDataGrid" class="easyui-datagrid"
												style="width: 400px; height: 250px;"
												data-options="border:0,rownumbers:false,fitColumns:true,fit:true,toolbar:'#ysb2'">
												<thead>
													<tr>
														<th data-options="field:'compact_id',width:100">工程编码</th>
														<th data-options="field:'cmpqual_text',width:100">扣除事项</th>
														<th data-options="field:'deduct_money',width:100">扣除押金</th>

													</tr>
												</thead>
											</table>
										</td>
									</tr>
								</table>
							</div>
							<div title="其他扣款" data-options="closable:false"
								style="padding: 0px;">
								<div id="ysb3" style="padding: 5px; height: auto">
									<div id="" style="margin-bottom: 0px;">
										<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-add'" 
											onclick="addDTLC()">新增</a> <a href="javascript:void(0)"  data-options="iconCls:'icon-edit'" 
											class="easyui-linkbutton" onclick="editDTLC()">修改</a> <a
											href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" 
											onclick="delDTLC()">删除</a>
									</div>
								</div>
								<table id="DTLCDataGrid" class="easyui-datagrid"
									style="width: 400px; height: 250px;"
									data-options="border:0,rownumbers:false,fitColumns:true,fit:true,toolbar:'#ysb3'">
									<thead>
										<tr>
											<th data-options="field:'line_no',width:50">序号</th>
											<th data-options="field:'cmpqual_desc',width:200">扣除事项</th>
											<th data-options="field:'deduct_money',width:80">扣除金额</th>

										</tr>
									</thead>
								</table>
							</div>
						</div>
					</td>
				</tr>
				<tr>
					<td colspan="2">
						<table>
							<tr>
								<th align="right" width="70px">保证金总额</th>
								<td><input type="text" id="totalRecMoney" readonly="readonly"><input type="hidden" id="payam"></td>

								<th width="60px" align="right">扣除总额</th>
								<td><input type="text" id="totalDeMoney" readonly="readonly"></td>

								<th width="60px" align="right">退还总额</th>
								<td><input type="text" id="totalReturn" readonly="readonly"></td>
								
								<th width="50px" align="right">余额</th>
								<td><input type="text" id="YE"><input type="hidden"
									id="DTLBJsonData" name="DTLBJsonData" readonly="readonly"> <input
									type="hidden" id="DTLCJsonData" name="DTLCJsonData"></td>
							</tr>
							<tr>
								<td colspan="13">

									<div id="" style="margin-top: 5px; margin-left: 800px">
										<a href="javascript:void(0)" class="easyui-linkbutton"
											data-options="iconCls:'icon-ok'" onclick="saveQua()">提交</a>
										<a href="javascript:void(0)" class="easyui-linkbutton"
											data-options="iconCls:'icon-cancel'" onclick="$('#quaMarDialog').dialog('close')">关闭</a>
									</div>
								</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>