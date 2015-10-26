//操作位（0为新增，1为修改）
var optType = -1;
var optTypeDtl = -1;
var agrPayDtlsData = {
	"add" : {},
	"update" : {},
	"del" : []
};
// 数据过滤器
function pagerFilter(data) {
	if (typeof data.length == 'number' && typeof data.splice == 'function') {
		data = {
			total : data.length,
			rows : data
		};
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage : function(pageNum, pageSize) {
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh', {
				pageNumber : pageNum,
				pageSize : pageSize
			});
			dg.datagrid('uncheckAll');
			dg.datagrid('loadData', data);
		},
		onBeforeRefresh : function() {
			dg.datagrid('load');
		}
	});
	if (!data.originalRows) {
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}

/*$.extend($.fn.validatebox.defaults.rules,{
	integer:{// 验证输入的大小
		validator:function(value){
			return  /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
		},
		message : '必须输入数值'
	},
});*/
//首页加载初始化
$(function(){
	
	simpleAgrPayDataGrid = $('#agrPayDataGrid').datagrid({
		url:'franController.do?loadAgreePay',
		
		//双击事件
		onDblClickRow:function(rowIndex,rowData){
			
//			if(editable == false){
//				return ;
//			}
//			alert(rowData.AGREE_SEQ);
			optType = 1;
			$("#agrPayForm").form("clear");
			$("#btn").hide();
			$("#agrPayDtlDataGrid").datagrid("loadData",{total:0,rows:[]});
			agrPayDtlsData = {"add":{},"update":{},"del":[]};
//			alert(JSON.stringify(agrPayDtlsData));
			
			
			$('#agrPayForm').form('load','franController.do?loadAgreePayById&AGREE_SEQ='+rowData.AGREE_SEQ);
			$("#agrPayDlg").dialog('setTitle','修改');
			$("#agrPayDlg").dialog('open');
		},
		loadFilter:pagerFilter,
	});
/*
 * $.extend($.fn.validatebox.defaults.rules,{ integer:{// 验证输入的大小
 * validator:function(value){ return
 * /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/; }, message : '必须输入数值' }, });
 */

	simpleAgrPayDataGrid = $('#agrPayDataGrid').datagrid(
			{
				url : 'franController.do?loadAgreePay',

				// 双击事件
				onDblClickRow : function(rowIndex, rowData) {

					// if(editable == false){
					// return ;
					// }
					// alert(rowData.AGREE_SEQ);
					optType = 1;

					$("#agrPayForm").form("clear");

					$("#agrPayDtlDataGrid").datagrid("loadData", {
						total : 0,
						rows : []
					});
					agrPayDtlsData = {
						"add" : {},
						"update" : {},
						"del" : []
					};
					// alert(JSON.stringify(agrPayDtlsData));

					$('#agrPayForm').form(
							'load',
							'franController.do?loadAgreePayById&AGREE_SEQ='
									+ rowData.AGREE_SEQ);
					$("#agrPayDlg").dialog('setTitle', '修改');
					$("#agrPayDlg").dialog('open');
				},
				loadFilter : pagerFilter,
			});
	simpleAgrPayDialog = $('#agrPayDlg').dialog({
		onBeforeClose : function() {
			var proj_id = $('#agrPayForm #proj_id').val();
			if (proj_id != '') {
				// 如果主要拜访人信息不为空，则提示信息，如果确定关闭对话框，则清空表单数据，选中拜访管理信息面板，并刷新拜访管理基本信息表格数据
				$.messager.confirm('提示', '是否确定返回主界面？', function(r) {
					if (r) {
						$('#agrPayForm').form('clear');
						simpleAgrPayDialog.dialog('close', true);
					}
				});
				return false;
			}
		}
	});
	
	/*$('#agrPayForm').form({
		onLoadSuccess:function(data){
			if(data.pay_flag==1){
				$('#agrPayForm #pay_flag').attr("checked","checked");
			}
			//alert(JSON.stringify(data));
			$('#agrPayForm #work_sdate').datebox("setValue",data.projInfo.work_sdate);
			$('#agrPayForm #work_edate').datebox("setValue",data.projInfo.work_edate);
			$('#agrPayForm #proj_id').val(data.projInfo.proj_no);
			$('#agrPayForm #proj_no').val(data.projInfo.proj_id);
			$('#agrPayForm #proj_name').val(data.projInfo.proj_name);
			$('#agrPayForm #proj_sname').val(data.projInfo.proj_sname);
			$('#agrPayForm #cmp_sname').val(data.projInfo.cmp_sname);
			$('#agrPayForm #compact_amt').val(data.projInfo.compact_amt);
			$('#agrPayForm #sd_money').val(data.projInfo.sd_money);
			
			$("#pcomDataGrid").datagrid("loadData",{total:data.pcomInfos.length,rows:data.pcomInfos});
			
			var result = 0;
			for(var i=0;i<data.pcomInfos.length;i++){
				result = accAdd(result,data.pcomInfos[i].GET_AMT);
			}
			$("#SUM_GET_AMT").val(result);
		//	alert(JSON.stringify(data));
			$("#PER_GET_AMT").val(Math.round(result/data.projInfo.compact_amt*100*100)/100);
			
			$("#agrPayDtlDataGrid").datagrid("loadData",{total:data.agrPayDtlInfos.length,rows:data.agrPayDtlInfos});
			
			result = 0;
			var sum_deduct = 0;
			var sum_bail = 0;
			for(var i=0;i<data.agrPayDtlInfos.length;i++){
				result = accAdd(result,data.agrPayDtlInfos[i].PAY_AMOUNT);
				var a = accAdd(data.agrPayDtlInfos[i].MANAGE_COST,data.agrPayDtlInfos[i].TAX_COST);
				var b = accAdd(a,data.agrPayDtlInfos[i].OTH_COST);
				sum_deduct = accAdd(sum_deduct,b);
				sum_bail = accAdd(sum_bail,data.agrPayDtlInfos[i].BAIL_COST);
			}
			
			$("#SUM_PAY_AMOUNT").val(result);
			$("#SUM_DEDUCT").val(Math.round(sum_deduct*100)/100);
			$("#SUM_BAIL").val(sum_bail);
		}
	});
	*/

	$('#agrPayForm').form(
			{
				onLoadSuccess : function(data) {
					if (data.pay_flag == 1) {
						$('#agrPayForm #pay_flag').attr("checked", "checked");
					}
					// alert(JSON.stringify(data));
					$('#agrPayForm #work_sdate').datebox("setValue",
							data.projInfo.work_sdate);
					$("#proj_no").val(data.projInfo.proj_id);
					$('#agrPayForm #work_edate').datebox("setValue",
							data.projInfo.work_edate);
					$('#agrPayForm #proj_id').val(data.projInfo.proj_no);
					$('#agrPayForm #proj_name').val(data.projInfo.proj_name);
					$('#agrPayForm #proj_sname').val(data.projInfo.proj_sname);
					$('#agrPayForm #cmp_sname').val(data.projInfo.cmp_sname);
					$('#agrPayForm #compact_amt')
							.val(data.projInfo.compact_amt);
					$('#agrPayForm #sd_money').val(data.projInfo.sd_money);

					$("#pcomDataGrid").datagrid("loadData", {
						total : data.pcomInfos.length,
						rows : data.pcomInfos
					});

					var result = 0;
					for ( var i = 0; i < data.pcomInfos.length; i++) {
						result = accAdd(result, data.pcomInfos[i].GET_AMT);
					}
					$("#SUM_GET_AMT").val(result);
					// alert(JSON.stringify(data));
					$("#PER_GET_AMT").val(
							Math.round(result / data.projInfo.compact_amt * 100
									* 100) / 100);

					$("#agrPayDtlDataGrid").datagrid("loadData", {
						total : data.agrPayDtlInfos.length,
						rows : data.agrPayDtlInfos
					});

					result = 0;
					var sum_deduct = 0;
					var sum_bail = 0;
					for ( var i = 0; i < data.agrPayDtlInfos.length; i++) {
						result = accAdd(result,
								data.agrPayDtlInfos[i].PAY_AMOUNT);
						var a = accAdd(data.agrPayDtlInfos[i].MANAGE_COST,
								data.agrPayDtlInfos[i].TAX_COST);
						var b = accAdd(a, data.agrPayDtlInfos[i].OTH_COST);
						sum_deduct = accAdd(sum_deduct, b);
						sum_bail = accAdd(sum_bail,
								data.agrPayDtlInfos[i].BAIL_COST);
					}

					$("#SUM_PAY_AMOUNT").val(result);
					$("#SUM_DEDUCT").val(Math.round(sum_deduct * 100) / 100);
					$("#SUM_BAIL").val(sum_bail);
				}
			});

	$("#agrPayDtlDataGrid").datagrid({
		onLoadSuccess : function(data) {

		}
	});

});

function calculateFill(data) {
	var result = 0;
	var sum_deduct = 0;
	var sum_bail = 0;
	for ( var i = 0; i < data.length; i++) {
		result = accAdd(result, data[i].PAY_AMOUNT);
		var a = accAdd(data[i].MANAGE_COST, data[i].TAX_COST);
		var b = accAdd(a, data[i].OTH_COST);
		sum_deduct = accAdd(sum_deduct, b);
		sum_bail = accAdd(sum_bail, data[i].BAIL_COST);
	}

	$("#SUM_PAY_AMOUNT").val(result);
	$("#SUM_DEDUCT").val(Math.round(sum_deduct * 100) / 100);
	$("#SUM_BAIL").val(sum_bail);
}

//选择加盟工程
/*function openFranPro(){
      openCommDialog('选择加盟工程','franController.do?getCommPage&page=choiceFranPro',1100,480,function(){
		openFranProDlg('',function(data){
			$("#agrPayForm #proj_no").val(data.proj_id);
			$("#agrPayForm #proj_id").val(data.proj_no);
			$("#agrPayForm #agree_seq").val(data.agree_seq);
			$("#agrPayForm #proj_name").val(data.proj_name);
			$("#agrPayForm #proj_sname").val(data.proj_sname);
			$("#agrPayForm #cmp_sname").val(data.cmp_sname);
			$("#agrPayForm #work_sdate").datebox('setValue',data.WORK_SDATE);
			$("#agrPayForm #work_edate").datebox('setValue',data.WORK_EDATE);
			$("#agrPayForm #compact_amt").val(data.compact_amt);
			$("#agrPayForm #sd_money").val(data.sd_money);
			$("#pcomDataGrid").datagrid({
				url:"franController.do?loadPcoms",
				queryParams:{proj_id:data.proj_id},
				onLoadSuccess:function(data1){
					var result = 0;
					for(var i=0;i<data1.rows.length;i++){
						result = accAdd(result,data1.rows[i].GET_AMT);
					}
					$("#SUM_GET_AMT").val(result);
				//	alert(JSON.stringify(data));
					$("#PER_GET_AMT").val(Math.round(result/data.compact_amt*100*100)/100);
				}*/
// 选择加盟工程
function openFranPro() {
	openCommDialog(
			'选择加盟工程',
			'franController.do?getCommPage&page=choiceFranPro',
			700,
			400,
			function() {
				openFranProDlg('|agree_seq',function(data) {
							$("#agrPayForm #proj_id").val(data.proj_no);
							$("#proj_no").val(data.proj_id);
							$("#agrPayForm #agree_seq").val(data.agree_seq);
							$("#agrPayForm #proj_name").val(data.proj_name);
							$("#agrPayForm #proj_sname").val(data.proj_sname);
							$("#agrPayForm #cmp_sname").val(data.cmp_sname);
							$("#agrPayForm #work_sdate").datebox('setValue',
									data.WORK_SDATE);
							$("#agrPayForm #work_edate").datebox('setValue',
									data.WORK_EDATE);
							$("#agrPayForm #compact_amt").val(data.compact_amt);
							$("#agrPayForm #sd_money").val(data.sd_money);
							$("#pcomDataGrid").datagrid(
											{
												url : "franController.do?loadPcoms",
												queryParams : {
													proj_id : data.proj_id
												},
												onLoadSuccess : function(data1) {
													var result = 0;
													for ( var i = 0; i < data1.rows.length; i++) {
														result = accAdd(
																result,
																data1.rows[i].GET_AMT);
													}
													$("#SUM_GET_AMT").val(
															result);
													// alert(JSON.stringify(data));
													$("#PER_GET_AMT")
															.val(
																	Math
																			.round(result
																					/ data.compact_amt
																					* 100
																					* 100) / 100);
												}
											});

							$("#agrPayDtlDataGrid").datagrid("loadData", {
								total : 0,
								rows : []
							});
							agrPayDtlsData = {
								"add" : {},
								"update" : {},
								"del" : []
							};

							$("#dlg").dialog("close");
						},'jms_agreementpay');
			});
}

function accAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length
	} catch (e) {
		r1 = 0
	}
	try {
		r2 = arg2.toString().split(".")[1].length
	} catch (e) {
		r2 = 0
	}
	m = Math.pow(10, Math.max(r1, r2))
	return (arg1 * m + arg2 * m) / m
}

// 首页 新增按钮
function addAgrPay() {
	optType = 0;
	$("#agrPayForm").form("clear");
	$("#pcomDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#agrPayDtlDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	agrPayDtlsData = {
		"add" : {},
		"update" : {},
		"del" : []
	};
	// alert(JSON.stringify(agrPayDtlsData));
	simpleAgrPayDialog.dialog('setTitle', '新增');
	simpleAgrPayDialog.dialog('open');
	$("#btn").show();
}

// 首页 修改按钮
function editAgrPay() {
	optType = 1;
	$("#btn").hide();
	$("#agrPayForm").form("clear");
	$("#agrPayDtlDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	agrPayDtlsData = {
		"add" : {},
		"update" : {},
		"del" : []
	};
	// alert(JSON.stringify(agrPayDtlsData));
	var rows = $("#agrPayDataGrid").datagrid('getSelections');
	if (rows.length == 0) {
		$.messager.alert('提示', '请选择要修改的记录！', 'info');
		return false;
	}
	if (rows.length > 1) {
		$.messager.alert('提示', '请选择一条记录进行修改！', 'info');
		return false;
	}
	var row = $("#agrPayDataGrid").datagrid("getSelected");
	$('#agrPayForm').form('load','franController.do?loadAgreePayById&AGREE_SEQ=' + row.AGREE_SEQ);
	simpleAgrPayDialog.dialog('setTitle', '修改');
	simpleAgrPayDialog.dialog('open');
	$("#btn").hide();
}

// 付款明细新增初始化
function addAgrDtl() {
	$("#agrPayDtlForm").form("clear");

	optTypeDtl=0;
	$("#agrDtlDlg #SIGN_STATUS").combobox("setValue",0);
	$("#agrDtlDlg").dialog('setTitle','新增');
	$("#agrDtlDlg").dialog('open');
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var day = date.getDate();
	var date1 = year + "-" + month + "-" + day;
	$("#PAY_DATE").datebox('setValue', date1);
	$("#agrPayDtlForm #flag").val("add");
}

// 付款明细 新增操作
function calcuatePay(txt) {
	var pay_amount = txt.value;
	var proj_no = $("#agrPayForm #proj_id").val();
	$.ajax({
		type : 'POST',
		url : "franController.do?getPercents&pay_amount=" + pay_amount
				+ "&proj_no=" + proj_no,
		dataType : 'json',
		success : function(data, status, xml) {
			$("#agrPayDtlForm #TAX_COST").val(data.TAX_COST);
			$("#agrPayDtlForm #MANAGER_COST").val(data.MANAGER_COST);
			$("#agrPayDtlForm #OTH_COST").val(data.OTH_COST);
			$("#agrPayDtlForm #BAIL_COST").val(data.BAIL_RATIO);
			$("#agrPayDtlForm #AGREE_SEQ").val(data.AGREE_SEQ);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

		}
	});
}

// 付款明细 提交按钮
function sumbitAgrPayDtl() {
	var isValid = $('#agrPayDtlForm').form('validate');
	if (!isValid) {
		return;
	}
	var data = {};
	data.AGREE_SEQ = $("#AGREE_SEQ").val();
	var index = $("#agrPayDtlDataGrid").datagrid("getData").rows.length - 1;
	
	if (index == -1) {
		data.PAY_SEQ = 1;
	} else if (optTypeDtl == 0) {
		data.PAY_SEQ = accAdd(
				$("#agrPayDtlDataGrid").datagrid("getData").rows[index].PAY_SEQ,
				"1");
	} else {
		data.PAY_SEQ = $("#PAY_SEQ").val();
	}
	data.PAY_DATE = $("#PAY_DATE").datebox('getValue');
	data.PAY_AMOUNT = $("#PAY_AMOUNT").numberbox('getValue');
	data.MANAGE_COST = $("#MANAGER_COST").val();
	data.TAX_COST = $("#TAX_COST").val();
	data.OTH_COST = $("#OTH_COST").val();
	data.BAIL_COST = $("#BAIL_COST").val();
	data.SIGN_STATUS = $("#SIGN_STATUS").combobox('getValue');
	data.SIGN_STATUSTEXT = $("#SIGN_STATUS").combobox('getText');
	// data.flag = $("#agrPayDtlForm #flag").val();
	if (optTypeDtl == 0) {
		data.flag = "add";
		agrPayDtlsData.add[data.PAY_SEQ] = data;
		$("#agrPayDtlDataGrid").datagrid("appendRow", data);
		calculateFill($("#agrPayDtlDataGrid").datagrid("getData").rows);
	} else {
		if ($("#agrPayDtlForm #flag").val() == "add") {
			data.flag = "add";
			agrPayDtlsData.add[data.PAY_SEQ] = data;
		} else if ($("#agrPayDtlForm #flag").val() == "update"
				|| $("#agrPayDtlForm #flag").val() == "") {
			data.flag = "update";
			agrPayDtlsData.update[data.PAY_SEQ] = data;
		}
		var rowIndex = $("#agrPayDtlForm #rowIndex").val();
		$("#agrPayDtlDataGrid").datagrid("updateRow", {
			index : rowIndex,
			row : data
		});
		calculateFill($("#agrPayDtlDataGrid").datagrid("getData").rows);
	}
	// alert(JSON.stringify(agrPayDtlsData));

	$("#agrDtlDlg").dialog('close');

}

// 修改按钮 付款明细
function editAgrDtl() {
	$("#agrPayDtlForm").form("clear");
	var rows = $("#agrPayDtlDataGrid").datagrid('getSelections');
	if (rows.length > 1) {
		$.messager.alert("提示", "请选择一条记录进行修改！", "info");
		return;
	} else if (rows.length == 0) {
		$.messager.alert("提示", "请选择要修改的记录！", "info");
		return;
	}
	var data = $("#agrPayDtlDataGrid").datagrid('getSelected');
	// delete data.flag;
	$("#agrPayDtlForm #PAY_SEQ").val(data.PAY_SEQ);
	$("#agrPayDtlForm #flag").val(data.flag);
	$("#agrPayDtlForm #rowIndex").val(
			$("#agrPayDtlDataGrid").datagrid("getRowIndex", data));
	$("#AGREE_SEQ").val(data.AGREE_SEQ);
	var rows = $("#agrPayDtlDataGrid").datagrid("getData");

	$("#PAY_DATE").datebox('setValue', data.PAY_DATE);
	$("#PAY_AMOUNT").numberbox('setValue', data.PAY_AMOUNT);
	$("#MANAGER_COST").val(data.MANAGE_COST);
	$("#TAX_COST").val(data.TAX_COST);
	$("#OTH_COST").val(data.OTH_COST);
	$("#BAIL_COST").val(data.BAIL_COST);
	$("#SIGN_STATUS").combobox('setValue', data.SIGN_STATUS);
	optTypeDtl = 1;
	$("#agrDtlDlg").dialog('setTitle', '修改');
	$("#agrDtlDlg").dialog('open');
}

// 删除付款明细信息
function delAgrDtl() {
	var rows = $("#agrPayDtlDataGrid").datagrid('getSelections');
	if (rows.length == 0) {
		$.messager.alert("提示", "请选择要删除的记录！", "info");
		return;
	}
	$.messager.confirm('确认对话框', '您确定要删除记录吗？',
			function(r) {
				if (r) {
					for ( var i = 0; i < rows.length; i++) {
						if (rows[i].flag == "add") {
							delete agrPayDtlsData.add[rows[i].PAY_SEQ];

						} else if (rows[i].flag == "update") {

							delete agrPayDtlsData.update[rows[i].PAY_SEQ];

							agrPayDtlsData.del.push(rows[i].AGREE_SEQ);
						} else if (rows[i].flag == undefined) {

							agrPayDtlsData.del.push(rows[i].PAY_SEQ);
						}
						$("#agrPayDtlDataGrid").datagrid(
								"deleteRow",
								$("#agrPayDtlDataGrid").datagrid("getRowIndex",
										rows[i]));
						calculateFill($("#agrPayDtlDataGrid").datagrid(
								"getData").rows);
					}
				}
			});
}
// 付款明细 关闭按钮
function cancelAgrPay() {

	$("#agrPayDtlForm").form('clear');
	/*
	 * var date = new Date(); var year = date.getFullYear(); var month =
	 * date.getMonth()+1; var day = date.getDate(); var date1 =
	 * year+"-"+month+"-"+day; $("#PAY_DATE").datebox('setValue',date1);
	 */
	$("#agrDtlDlg").dialog('close');
}

// 新增或修改 提交所有信息
function submitAgrPay() {
	var agrPayDtlsAddArr = [];
	var agrPayDtlsEditArr = [];
	var agrPayDtlsDelArr = [];
	// alert(JSON.stringify(agrPayDtlsData));
	for ( var key in agrPayDtlsData.add) {
		agrPayDtlsAddArr.push(agrPayDtlsData.add[key]);
	}
	for ( var key in agrPayDtlsData.update) {
		agrPayDtlsEditArr.push(agrPayDtlsData.update[key]);
	}
	for ( var key in agrPayDtlsData.del) {
		agrPayDtlsDelArr.push(agrPayDtlsData.del[key]);
	}
	$("#agrPayDtlsAddArr").val(JSON.stringify(agrPayDtlsAddArr));
	$("#agrPayDtlsEditArr").val(JSON.stringify(agrPayDtlsEditArr));
	$("#agrPayDtlsDelArr").val(JSON.stringify(agrPayDtlsDelArr));
	// alert(JSON.stringify(agrPayDtlsData));
	$('#agrPayForm').form('submit', {
		url : 'franController.do?saveOrEditAgrPayInfo&optType=' + optType,
		onSubmit : function() {
			var isValid = $('#agrPayForm').form('validate');
			$("#agrPaySubmitBtn").linkbutton("disable");
			return isValid;
		},
		success : function(data) {
			// data = eval('('+data+')');
			/*
			 * if(!data.success){ $.messager.alert('提示',data.msg,'error');
			 * return null; }
			 */
			$("#agrPaySubmitBtn").linkbutton("enable");
			$("#agrPayForm").form("clear");
			$("#pcomDataGrid").datagrid("loadData", {
				total : 0,
				rows : []
			});
			$("#agrPayDtlDataGrid").datagrid("loadData", {
				total : 0,
				rows : []
			});
			$("#agrPayDlg").dialog('close', true);
			$("#agrPayDataGrid").datagrid('reload');
			$.messager.alert('提示', '提交成功！', 'info');
		}
	});
}

// 首页 删除按钮
function delAgrPay() {
	var rows = simpleAgrPayDataGrid.datagrid("getSelections");
	if (rows.length < 1) {
		$.messager.confirm("提示", "请选择要删除的记录！", "info");
		return;
	}
	var idArray = [];
	for ( var key in rows) {
		idArray.push(rows[key].AGREE_SEQ);
	}
	$.messager.confirm("提示", "是否确定删除所要选择的记录？", function(r) {
		if (r) {
			$.ajax({
				type : 'POST',
				url : 'franController.do?delAgrPay&AGREE_SEQS=' + idArray,
				dataType : 'text',
				success : function(data, status, xml) {
					simpleAgrPayDataGrid.datagrid('reload');
					simpleAgrPayDataGrid.datagrid('uncheckAll');
					$.messager.confirm('提示', data + '!', 'info');
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {

				}
			});
		}
	});

}

// 首页关闭按钮
function cancelAgrPay() {
	var proj_id = $("#proj_id").val();
	if (proj_id.length == 0) {
		simpleAgrPayDialog.dialog('close');
	}
	$("#agrPayForm").form('clean');
	simpleAgrPayDialog.dialog('close');
}
