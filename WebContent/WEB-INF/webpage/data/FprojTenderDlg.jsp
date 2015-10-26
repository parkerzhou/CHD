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
	<div id="dlg"></div>
	<div id="tenderDlg" class="easyui-dialog" data-options="modal:true"
		style="width: 755px; height: 520px; padding: 0px 0 0px 0px"
		closed="true">

		<form id="tenderForm" method="POST">
			<div>


				<div>
					<table>
						<tr>
							<th align="left">预审编号</th>
							<td><input id="pre_regseq" type="hidden" name="pre_regseq" /><input
								type="text" id="pre_no" style="width: 150px" readonly><a
								id="tenderSelBtn" href="#" class="easyui-linkbutton"
								data-options="iconCls:'icon-search' " onclick="openTenderSel()"></a></td>

							<th  style="width: 55px" align="left">工程名称</th>
							<td><input type="text" id="proj_name" style="width: 80px"
								readonly></td>

							<th  align="right">简称</th>
							<td><input type="text" id="proj_sname" style="width: 100px"
								readonly></td>
						</tr>
                        <tr>
							<th  style="width: 50px" align="left">工程地址</th>
							<td colspan="5"><input type="text" style="width: 585px"
							id="proj_addr" readonly></td>
						</tr>                        
						<tr>
							<th  align="left">顾客公司</th>
							<td><input type="text" id="cust_cmp" style="width: 150px"readonly></td>
							<th  align="center" readonly>联系人</th>
							<td><input type="text" id="cust_contactor"
							style="width: 80px" readonly></td>
							<th  align="right">联系电话</th>
							<td><input type="text" id="cust_tel" style="width: 100px"readonly></td>
						</tr>
                        <tr>
							<th  align="left">加盟方</th>
							<td><input type="text" id="frans_id" style="width: 150px"
							readonly></td>
							<th  align="center">联系人</th>
							<td><input type="text" id="fran_contactor"
							style="width: 80px" readonly></td>
							<th  align="right">联系电话</th>
							<td><input type="text" id="fran_tel" style="width: 100px"
							readonly></td>
						</tr>
						<tr>
							<th  align="left">登记单位</th>
							<td><input type="text" id="reg_cmp" style="width: 150px"
							readonly></td>
							<th  align="center">部门</th>
							<td><input type="text" id="reg_dept" style="width: 80px"
							readonly></td>
							<th  align="right">业务负责人</th>
							<td><input type="text" id="charger" style="width: 100px"
							readonly></td>
						</tr>
						<input id="PZhengsAddArr" type="hidden" name="PZhengsAddArr">
						<input id="PContractsAddArr" type="hidden" name="PContractsAddArr">
						<input id="PInsuranceAddArr" type="hidden" name="PInsuranceAddArr">
						<input id="TContractsAddArr" type="hidden" name="TContractsAddArr">
						<input id="TInsuranceAddArr" type="hidden" name="TInsuranceAddArr">
						<input id="TZhengAddArr" type="hidden" name="TZhengAddArr">
						<input id="PCom" type="hidden" name="PCom">
						<input id="Tcom" type="hidden" name="Tcom">
					</table>
				</div>

				<div>
					<table style="width: 740px">
						<tr>
							<td>
								<div>
									<table>
										<tr>
											<th align="left">领取招标文件日期</th>
											<td><input type="text" id="file_date" name="file_date"
												class="easyui-datebox" required="ture" editable="false"></td>
										</tr>
									</table>
								</div>
							</td>
						</tr>
						<tr>
							<td style="width: 500px; height: 285px">
								<div id="fprojTenderTabs" class="easyui-tabs"
									data-options="fit:true,border:1"
									style="height: 260px; width: 500px">
									<div title="资格预审">
										<div>
											<table style="padding: 0px" >
												<tr>
													<th align="right">是否资格预审</th>
													<td style="width: 130px"><label><input
															name="pre_flag" type="radio" id="pre_flag" value="1"
															checked="checked" />是</label>
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><input
															name="pre_flag" type="radio" value="2" />否 </label></td>
													<th align="left">预审日期</th>
													<td style="width: 150px"><input type="text"
														id="pre_date" name="pre_date" class="easyui-datebox"
														required="ture" editable="false"></td>
													<th align="right">是否携带原件</th>
													<td style="width: 130px"><label><input
															name="pre_ori_flag" type="radio" id="pre_ori_flag"
															value="1" checked="checked" />是</label>
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><input
															name="pre_ori_flag" type="radio" value="2" />否 </label></td>
												</tr>
											</table>
										</div>
										<fieldset
											style="width: 700px; margin-left: 10px; margin-bottom: 5px">
											<legend>
												<b>预审原件</b>
											</legend>
											<table id="cmpIntelFileDg1">

											</table>
										</fieldset>
										<div id="" class="easyui-tabs"
											data-options="fit:true,border:1"
											style="height: auto; width: 700px">
											<div title="预审证书" data-options="closable:false"
												style="padding: 0px;">
												<fieldset
													style="width: 700px; margin-left: 10px; margin-bottom: 5px; height: 130px">
													<legend>
														<b>预审证书</b>
													</legend>
													<div id="sdfTb" style="padding: 0px;">
														<div id="asdftb" style="margin-bottom: 5px;">
															<a href="javascript:void(0)" class="easyui-linkbutton"
																iconCls="icon-add" onclick="addzheng(1,1)">新增</a> <a
																href="javascript:void(0)" class="easyui-linkbutton"
																iconCls="icon-edit" onclick="editZheng(1,0)">修改</a> <a
																href="javascript:void(0)" class="easyui-linkbutton"
																iconCls="icon-remove" onclick="deleteZheng()">删除</a>
														</div>
													</div>
													<div id="" class="easyui-layout" data-options="fit:true"
														style="width: 700px; height: auto;">
														<div data-options="region:'center'">
															<table id="zhengdatagrid" class="easyui-datagrid"
																style="width: 500px; height: 100px;"
																data-options="border:0,rownumbers:true,fitColumns:true,fit:true,pagination:true,pageList:[10,15,20,30,50,100]">
																<thead>
																	<tr>
																		<th data-options="field:'seq',width:100">证书</th>
																		<th data-options="field:'cmpqual_seq',width:100,"
																			hidden="ture"></th>
																		<th data-options="field:'staff1',width:100">人员1</th>
																		<th data-options="field:'staff2',width:100">人员2</th>
																		<th data-options="field:'staff3',width:100">人员3</th>
																		<th data-options="field:'staff4',width:100">人员4</th>
																		<th data-options="field:'staff5',width:100">人员5</th>
																		<th data-options="field:'staff6',width:100">人员6</th>
																		<th data-options="field:'staff7',width:100">人员7</th>
																		<th data-options="field:'staff8',width:100">人员8</th>
																		<th data-options="field:'staff9',width:100">人员9</th>
																		<th data-options="field:'staff10',width:100">人员10</th>

																	</tr>
																</thead>
															</table>

														</div>
													</div>

												</fieldset>
											</div>
											<div title="劳动合同/养老保险" data-options="closable:false"
												style="padding: 0px;">
												<table>
													<tr>
														<td>
															<fieldset
																style="width: 300px;  margin-bottom: 5px; height: 120px">
																<legend>
																	<b>劳动合同</b>
																</legend>
																<div id="sdfTb" style="padding: 0px;">

																	<a href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-add" onclick="openrent()">新增</a> <a
																		href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-edit" onclick="">修改</a> <a
																		href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-remove" onclick="delrent()">删除</a>
																</div>

																<div id="staffLayout" class="easyui-layout"
																	data-options="fit:true"
																	style="width: 280px; height: 100px;">
																	<div data-options="region:'center'">
																		<table id="staffDatagrid" class="easyui-datagrid"
																			style="width: 280px; height: 100px;"
																			data-options="border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#dfTb' ">
																			<thead>
																				<tr>
																					<th data-options="field:'STAFF_NAME',width:200">人员名称</th>

																				</tr>
																			</thead>
																		</table>

																	</div>
																</div>

															</fieldset>
														</td>

														<td>
															<fieldset
																style="width: 380px;  margin-bottom: 5px; height: 120px">
																<legend>
																	<b>养老保险</b>
																</legend>
																<div id="sdfTb1" style="padding: 0px;">

																	<a href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-add" onclick="openInst()">新增</a> <a
																		href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-edit" onclick="">修改</a> <a
																		href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-remove" onclick="delInst()">删除</a>
																</div>

																<div id="conLayout" class="easyui-layout"
																	data-options="fit:true"
																	style="width: 280px; height: 100px;">
																	<div data-options="region:'center'">
																		<table id="conDatagrid" class="easyui-datagrid"
																			style="width: 280px; height: 100px;"
																			data-options="border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#dfTb' ">
																			<thead>
																				<tr>
																					<th data-options="field:'STAFF_NAME',width:200">人员名称</th>

																				</tr>
																			</thead>
																		</table>

																	</div>
																</div>

															</fieldset>
														</td>
													</tr>
												</table>
											</div>
										</div>
									</div>
									<div title="投标" data-options="closable:false"
										style="padding: 0px">
										<div align="center">
											<table style="padding: 0px" >
												<tr>
													<th align="left">投标日期</th>
													<td style="width: 200px"><input type="text"
														id="tender_date" name="tender_date" class="easyui-datebox"
														required="ture" editable="false"></td>
													<th align="right">是否携带原件</th>
													<td style="width: 150px"><label><input
															name="ori_flag" type="radio" id="ori_flag" value="1"
															checked="checked" />是</label>
														&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<label><input
															name="ori_flag" type="radio" value="2" />否 </label></td>
												</tr>
											</table>
										</div>
										<fieldset
											style="width: 650px; margin-left: 10px; margin-bottom: 5px">
											<legend>
												<b>公司资质文件</b>
											</legend>
											<table id="cmpIntelFileDg">

											</table>
										</fieldset>
										<div id="" class="easyui-tabs" data-options="border:1"
											style="height: auto; width: 732px">
											<div title="投标证书" data-options="closable:false"
												style="padding: 0px;">
												<fieldset
													style="width: 700px; margin-left: 10px; margin-bottom: 5px; height: 130px">
													<legend>
														<b>投标证书</b>
													</legend>
													<div id="sdfTb" style="padding: 0px;">
														<div id="asdftb" style="margin-bottom: 5px;">
															<a href="javascript:void(0)" class="easyui-linkbutton"
																iconCls="icon-add" onclick="addzheng(0,1)">新增</a> <a
																href="javascript:void(0)" class="easyui-linkbutton"
																iconCls="icon-edit" onclick="editZheng(0,0)">修改</a> <a
																href="javascript:void(0)" class="easyui-linkbutton"
																iconCls="icon-remove" onclick="deleteTou()">删除</a>
														</div>
													</div>
													<div id="" class="easyui-layout" data-options="fit:true"
														style="width: 700px; height: auto;">
														<div data-options="region:'center'">

															<table id="toudatagrid" class="easyui-datagrid"
																style="width: 700px; height: 100px;"
																data-options="border:0,rownumbers:true,fitColumns:true,fit:true,pagination:true,pageList:[10,15,20,30,50,100]">
																<thead>
																	<tr>
																		<th data-options="field:'seq',width:100">证书</th>
																		<th data-options="field:'cmpqual_seq',width:100,"
																			hidden="ture"></th>
																		<th data-options="field:'staff1',width:100">人员1</th>
																		<th data-options="field:'staff2',width:100">人员2</th>
																		<th data-options="field:'staff3',width:100">人员3</th>
																		<th data-options="field:'staff4',width:100">人员4</th>
																		<th data-options="field:'staff5',width:100">人员5</th>
																		<th data-options="field:'staff6',width:100">人员6</th>
																		<th data-options="field:'staff7',width:100">人员7</th>
																		<th data-options="field:'staff8',width:100">人员8</th>
																		<th data-options="field:'staff9',width:100">人员9</th>
																		<th data-options="field:'staff10',width:100">人员10</th>
																	</tr>
																</thead>
															</table>

														</div>
													</div>

												</fieldset>
											</div>
											<div title="劳动合同/养老保险" data-options="closable:false"
												style="padding: 0px;">
												<table>
													<tr>
														<td>
															<fieldset
																style="width: 300px; margin-bottom: 5px; height: 120px">
																<legend>
																	<b>劳动合同</b>
																</legend>
																<div id="bidConTb" style="margin-bottom: 5px;">
																	<a href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-add" onclick="openren()">新增</a> <a
																		href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-edit" onclick="">修改</a> <a
																		href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-remove" onclick="deleteRen()">删除</a>
																</div>
																<div id="bidConLayout" class="easyui-layout"
																	data-options="fit:true"
																	style="width: 280px; height: auto">
																	<div data-options="region:'center'">
																		<table id="bidConDg" class="easyui-datagrid"
																			style="width: 280px; height: 100px;"
																			data-options="border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#bidConTb' ">
																			<thead>
																				<tr>
																					<th data-options="field:'STAFF_NAME',width:200">人员名称</th>
																				</tr>
																			</thead>
																		</table>

																	</div>
																</div>

															</fieldset>
														</td>

														<td>
															<fieldset
																style="width: 380px;  margin-bottom: 5px; height: 120px">
																<legend>
																	<b>养老保险</b>
																</legend>
																<div id="InsuranceTb" style="padding: 0px;">

																	<a href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-add" onclick="openIns()">新增</a> <a
																		href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-edit" onclick="">修改</a> <a
																		href="javascript:void(0)" class="easyui-linkbutton"
																		iconCls="icon-remove" onclick="deleteIns()">删除</a>
																</div>

																<div id="InsuranceLayout" class="easyui-layout"
																	data-options="fit:true"
																	style="width: 380px; height: auto">
																	<div data-options="region:'center'">

																		<table id="InsuranceDatagrid" class="easyui-datagrid"
																			style="width: 38px; height: 100px;"
																			data-options="border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#InsuranceTb' ">
																			<thead>
																				<tr>
																					<th data-options="field:'STAFF_NAME',width:300">人员名称</th>
																				</tr>
																			</thead>
																		</table>

																	</div>
																</div>

															</fieldset>
														</td>
													</tr>
												</table>
											</div>
										</div>
									</div>
									<div title="公司荣誉及业绩" data-options="closable:false"
										style="padding: 0px;">
										<table style="padding-left: 10px">
											<tr>
												<th align="right">公司荣誉</th>
												<td><textarea rows="10" cols="" name="comp_honor"
														style="width: 600px;height: 100px"></textarea></td>
											</tr>
											<tr>
												<th align="right">公司业绩</th>
												<td><textarea rows="10" cols="" id="comp_Performance" name="comp_performance"
														style="width: 600px;height: 100px"></textarea></td>
											</tr>
											<tr>
												<th align="right">备注</th>
												<td><input type="text" name="remarks"
													style="width: 600px" /></td>
											</tr>
										</table>
									</div>
								</div>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</form>

		<div id="dlg-buttons" style="padding-left: 550px">
			<a href="javascript:void(0)" id="fprojTenderBtn" class="easyui-linkbutton"
				data-options="iconCls:'icon-ok'" onclick="saveTendar()">提交</a> <a
				href="javascript:void(0)" class="easyui-linkbutton"
				data-options="iconCls:'icon-cancel'" onclick="cancelTender()">关闭</a>
		</div>
	</div>
	<jsp:include page="zhengDlg.jsp"></jsp:include>

</body>
</html>