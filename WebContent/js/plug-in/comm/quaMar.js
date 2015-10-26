var optType = -1;

var perbDTLBArr = [];
var perbDTLBDatas = {};
var perbDTLCDatas = [];
var perbDTLBDatas1 = {};

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

$(function() {
	quaMarDg = $("#quaMarDataGrid").datagrid({
		url : 'franController.do?loadQuaInfos',
		onDblClickRow : function(rowIndex, rowData) {

			$("#franSelBtn").hide();
			perbDTLBArr = [];
			perbDTLBDatas = {};
			perbDTLBDatas1 = {};
			perbDTLCDatas = [];
			$("#quaMarForm").form("clear");
			$("#DTLADataGrid").datagrid("loadData", {
				total : 0,
				rows : []
			});
			$("#TotalDTLBDataGrid").datagrid("loadData", {
				total : 0,
				rows : []
			});
			$("#TotalDTLBDataGrid2").datagrid("loadData", {
				total : 0,
				rows : []
			});
			$("#quaProjDataGrid").datagrid("loadData", {
				total : 0,
				rows : []
			});
			$("#DTLBDataGrid").datagrid("loadData", {
				total : 0,
				rows : []
			});
			$("#DTLCDataGrid").datagrid("loadData", {
				total : 0,
				rows : []
			});
			$("#quaDTLBTabs").tabs("select", 0);
			optType = 1;
			var row = rowData;
			$.ajax({
				type : 'POST',
				url : 'franController.do?getPayamByFranID&frans_id=' + row.frans_id,
				dataType : 'json',
				// 将后台执行删除操作的结果反馈给用户
				success : function(data1, status, xml) {
					$("#payam").val(data1.payam);
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {

				}
			});
			var quality_seq = row.quality_seq;
			quaMarForm.form('load', 'franController.do?loadQuaById&quality_seq='
					+ quality_seq);
			quaMarDlg.dialog('setTitle', '修改');
			quaMarDlg.dialog('open');
		},
		loadFilter : pagerFilter
	});

	quaMarDlg = $("#quaMarDialog").dialog({
		onBeforeClose : function() {

			if ($("#frans_id").val() != '') {
				$.messager.confirm('提示', '是否确定返回主界面？', function(r) {
					if (r) {
						$("#quaMarDialog").dialog("close", true);
					}
				});
				return false;
			}

		}
	});

	quaMarForm = $("#quaMarForm").form(
			{
				onLoadSuccess : function(data) {
					$("#frans_name").val(data.cmp_name);
					$("#frans_sname").val(data.cmp_sname);
					$("#frans_charger").val(data.cmp_charger);
					$("#frans_contactor").val(data.cmp_contactor1);
					$("#frans_tel").val(data.cmp_tel1);
					$("#frans_mobile").val(data.cmp_mobile1);
					$("#frans_address").val(data.cmp_address);
					$("#DTLADataGrid").datagrid("loadData", {
						rows : data.DTLADatas,
						total : data.DTLADatas.length
					});
					calculateTotalRecMoney();
					quaProjDg.datagrid({
						queryParams : {
							frans_id : data.frans_id
						},
						url : 'franController.do?loadPerbProjs'
					});
					for ( var i = 0; i < data.DTLBDatas1.length; i++) {
						if (data.DTLBDatas1[i].cmpqual_seq != null) {
							perbDTLBDatas1[data.DTLBDatas1[i].cmpqual_seq] = data.DTLBDatas1[i];
						} else {
							perbDTLBDatas1[data.DTLBDatas1[i].cmpqual_text] = data.DTLBDatas1[i];
						}
						$("#TotalDTLBDataGrid").datagrid("appendRow",
								data.DTLBDatas1[i]);
					}
					totalDTLBDg2.datagrid({
						queryParams : {
							frans_id : data.frans_id
						},
						url : 'franController.do?loadPerbProjs2'
					});
//					$("#TotalDTLBDataGrid").datagrid("loadData", {
//						rows : data.DTLBDatas,
//						total : data.DTLBDatas.length
//					});

					for ( var i = 0; i < data.DTLBDatas.length; i++) {
						if ($
								.inArray(data.DTLBDatas[i].compact_id,
										perbDTLBArr) < 0) {
							// alert(data.DTLBDatas[i].compact_id);
							perbDTLBArr.push(data.DTLBDatas[i].compact_id);
						}
					}
					for ( var i = 0; i < perbDTLBArr.length; i++) {
						perbDTLBDatas[perbDTLBArr[i]] = [];
					}
					for ( var i = 0; i < data.DTLBDatas.length; i++) {
						perbDTLBDatas[data.DTLBDatas[i].compact_id]
								.push(data.DTLBDatas[i]);
					}
					perbDTLCDatas = data.DTLCDatas;
					// console.info(perbDTLBDatas);
					calculateTotalDeductMoney();
					calculateYE();
//					for ( var i = 0; i < data.DTLCDatas.length; i++) {
//						$("#TotalDTLBDataGrid").datagrid("appendRow", {
//							cmpqual_text : data.DTLCDatas[i].cmpqual_desc,
//							deduct_money : data.DTLCDatas[i].deduct_money
//						});
//					}

					$("#DTLCDataGrid").datagrid("loadData", {
						rows : data.DTLCDatas,
						total : data.DTLCDatas.length
					});

					$("#perbDTLBTabs").tabs("select", "一级扣除事项");
				}
			});

	dtlaDg = $("#DTLADataGrid").datagrid();

	quaDTLBTabs = $("#quaDTLBTabs").tabs(
			{
				onSelect : function(title, index) {
					if (index == 0) {

						/*
						 * var frans_id = $("#perbForm
						 * input[name='FRANS_ID']").val();
						 * $("#perbProjDataGrid").datagrid({
						 * queryParams:{frans_id:frans_id},
						 * url:'franController.do?loadPerbProjs' });
						 */
						// console.info(perbDTLCDatas);
						$("#TotalDTLBDataGrid").datagrid('loadData', {
							total : 0,
							rows : []
						});
//						alert(JSON.stringify(perbDTLBDatas1));
						for ( var key in perbDTLBDatas1) {
							if (perbDTLBDatas1[key].deduct_money == 0) {
								continue;
							}
							$("#TotalDTLBDataGrid").datagrid(
									"appendRow", perbDTLBDatas1[key]);
						}

						/*for ( var i = 0; i < perbDTLBArr.length; i++) {
							var datas = perbDTLBDatas[perbDTLBArr[i]];
							for ( var j = 0; j < datas.length; j++) {
								$("#TotalDTLBDataGrid").datagrid("appendRow",
										datas[j]);
							}
						}

						for ( var i = 0; i < perbDTLCDatas.length; i++) {
							$("#TotalDTLBDataGrid").datagrid("appendRow", {
								cmpqual_text : perbDTLCDatas[i].cmpqual_desc,
								deduct_money : perbDTLCDatas[i].deduct_money
							});
						}*/

					}
				}
			});

	totalDTLBDg = $("#TotalDTLBDataGrid").datagrid();

	totalDTLBDg2 = $("#TotalDTLBDataGrid2").datagrid({
		onLoadSuccess : function(data) {
			var result = 0;
			for ( var i = 0; i < data.rows.length; i++) {
				// alert(data.rows[i].return_amount);
				result = FloatAdd(result, data.rows[i].return_amount);
			}
			$("#totalReturn").val(result);
			calculateYE();
		}
	});

	quaProjDg = $("#quaProjDataGrid")
			.datagrid(
					{

						onLoadSuccess : function(data) {
							// console.info(data);
							perbDTLBArr = [];
							if (optType == 0) {
								perbDTLBDatas = {};
							}
							var rows = data.rows;
							for ( var i = 0; i < rows.length; i++) {
								// perbDTLBArr = [];
								perbDTLBArr.push(rows[i].PROJ_ID);
								// perbDTLBDatas = {};
								if (optType == 1
										&& perbDTLBDatas[rows[i].PROJ_ID] != undefined) {
									continue;
								}
								perbDTLBDatas[rows[i].PROJ_ID] = [];
							}
						},

						onSelect : function(rowIndex, rowData) {
							// alert($("#TotalDTLBDataGrid").datagrid("getData").total);
							$("#ysb2 #proj_id").val(rowData['PROJ_ID']);
							var rows = [];
							for ( var i = 0; i < perbDTLBDatas[rowData.PROJ_ID].length; i++) {
								rows.push(perbDTLBDatas[rowData.PROJ_ID][i]);
							}
							$("#DTLBDataGrid").datagrid("loadData", {
								rows : rows,
								total : perbDTLBDatas[rowData.PROJ_ID].length
							});
							$("#DTLBDataGrid").datagrid("loadData", {
								rows : perbDTLBDatas[rowData.PROJ_ID],
								total : 0
							});
						}
					});

	dtlbDg = $("#DTLBDataGrid").datagrid();

});

function addQua() {
	$("#franSelBtn").show();
	perbDTLBArr = [];
	perbDTLBDatas = {};
	perbDTLBDatas1 = {};
	perbDTLCDatas = [];
	$("#quaMarForm").form("clear");
	$("#DTLADataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#TotalDTLBDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#TotalDTLBDataGrid2").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#quaProjDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#DTLBDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#DTLCDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#quaDTLBTabs").tabs("select", 0);
	optType = 0;
	quaMarDlg.dialog('setTitle', '新增');
	quaMarDlg.dialog('open');
}

function editQua() {
	$("#franSelBtn").hide();
	perbDTLBArr = [];
	perbDTLBDatas = {};
	perbDTLBDatas1 = {};
	perbDTLCDatas = [];
	$("#quaMarForm").form("clear");
	$("#DTLADataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#TotalDTLBDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#TotalDTLBDataGrid2").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#quaProjDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#DTLBDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#DTLCDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#quaDTLBTabs").tabs("select", 0);
	optType = 1;
	var rows = quaMarDg.datagrid('getSelections');
	if (rows.length == 0) {
		$.messager.alert('提示', '请选择要修改的记录！', 'info');
		return false;
	}
	if (rows.length > 1) {
		$.messager.alert('提示', '请选择一条记录进行修改！', 'info');
		return false;
	}
	var row = quaMarDg.datagrid('getSelected');
	$.ajax({
		type : 'POST',
		url : 'franController.do?getPayamByFranID&frans_id=' + row.frans_id,
		dataType : 'json',
		// 将后台执行删除操作的结果反馈给用户
		success : function(data1, status, xml) {
			$("#payam").val(data1.payam);
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

		}
	});
	var quality_seq = row.quality_seq;
	quaMarForm.form('load', 'franController.do?loadQuaById&quality_seq='
			+ quality_seq);
	quaMarDlg.dialog('setTitle', '修改');
	quaMarDlg.dialog('open');
}

function delQua() {
	var rows = quaMarDg.datagrid('getSelections');
	// 如果未选中拜访管理基本信息，提示用户相关信息
	if (rows.length == 0) {
		$.messager.alert('提示', '请选择要删除的记录！', 'info');
		return false;
	}
	// 如果选中1条或1条以上拜访管理基本信息，则提醒用户是否确定删除信息
	if (rows.length >= 1) {
		// 创建并构造拜访管理信息主键cv_id数组
		var idArray = [];
		for ( var key in rows) {
			idArray.push(rows[key].quality_seq);
		}
		// 弹出删除操作选择对话框，如果确定删除拜访管理信息，则提交cv_id数组到后台进行删除操作
		$.messager.confirm('提示', '是否确定删除所选择的记录？', function(r) {
			if (r) {
				$.ajax({
					type : 'POST',
					url : 'franController.do?delQua&quality_seqs=' + idArray,
					dataType : 'text',
					// 将后台执行删除操作的结果反馈给用户
					success : function(data, status, xml) {
						quaMarDg.datagrid('reload');
						quaMarDg.datagrid('uncheckAll');
						$.messager.alert('提示', data + '！', 'info');
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {

					}
				});
			}
		});
	}
}

function saveQua() {
	var DTLAJsonData = JSON.stringify($("#DTLADataGrid").datagrid("getRows"));
	var DTLCJsonData = JSON.stringify($("#DTLCDataGrid").datagrid("getRows"));
	// alert(jQuery.parseJSON($("#DTLADataGrid").datagrid("getRows")));

	var DTLBArr = [];

	for ( var i = 0; i < perbDTLBArr.length; i++) {
		for ( var j = 0; j < perbDTLBDatas[perbDTLBArr[i]].length; j++) {
			// alert(perbDTLBDatas[perbDTLBArr[i]][j].deduct_money);
			DTLBArr.push(perbDTLBDatas[perbDTLBArr[i]][j]);
		}
	}

	var DTLBJsonData = JSON.stringify(DTLBArr);

	$("#DTLBJsonData").val(DTLBJsonData);
	$("#DTLCJsonData").val(DTLCJsonData);
	var submitURL = 'franController.do?addOrEditQuaInfo&optType=' + optType
			+ '&DTLAJsonData=' + DTLAJsonData;

	quaMarForm.form('submit', {
		url : submitURL,

		onSubmit : function() {
			if ($("#frans_id").val() == '') {
				return false;
			}
			var isValid = quaMarForm.form('validate');
			return isValid;
		},
		success : function(data) {

			// data = eval('(' + data + ')');
			// if (!data.success) {
			// $.messager.alert('提示', data.msg, 'error');
			// return null;
			// }

			quaMarDlg.dialog('close', true);
			quaMarDg.datagrid('reload');
			$.messager.alert('提示', '提交成功！', 'info');
		}
	});
}

function openQuaFranSel() {
	openCommDialog('加盟方资料选择', 'franController.do?getCommPage&page=franSel',
			1000, 500, function() {
				openFprojFranSelDlg(function(data) {
					$("#quaMarForm input[name='frans_id']").val(data.cmp_id);
					$("#frans_sname").val(data.cmp_sname);
					$("#frans_contactor").val(data.cmp_contactor1);
					$("#frans_tel").val(data.cmp_tel1);
					$("#frans_address").val(data.cmp_address);
					$("#frans_charger").val(data.cmp_charger);
					$("#frans_name").val(data.cmp_name);
					$("#frans_mobile").val(data.cmp_mobile1);

					$.ajax({
						type : 'POST',
						url : 'franController.do?getPayamByFranID&frans_id='
								+ data.cmp_id,
						dataType : 'json',
						// 将后台执行删除操作的结果反馈给用户
						success : function(data, status, xml) {
							$("#payam").val(data.payam);
							$("#totalRecMoney").val(data.payam);
						},
						error : function(XMLHttpRequest, textStatus,
								errorThrown) {

						}
					});

					var frans_id = data.cmp_id
					quaProjDg.datagrid({
						queryParams : {
							frans_id : frans_id
						},
						url : 'franController.do?loadPerbProjs'
					});

					totalDTLBDg2.datagrid({
						queryParams : {
							frans_id : frans_id
						},
						url : 'franController.do?loadPerbProjs2'
					});

					$("#totalDeMoney").val(0);
					
					if(optType==1){
						perbDTLBArr = [];
						perbDTLBDatas = {};
						perbDTLCDatas = [];
						$("#DTLADataGrid").datagrid("loadData",{total:0,rows:[]});
						quaDTLBTabs.tabs("select",0);
						$("#TotalDTLBDataGrid").datagrid("loadData",{total:0,rows:[]});
						
						$("#DTLBDataGrid").datagrid("loadData",{total:0,rows:[]});
						$("#DTLCDataGrid").datagrid("loadData",{total:0,rows:[]});
						optType = 0;
						quaMarDlg.dialog('setTitle', '新增');
					}

					// console.info(data);
					$("#dlg").dialog("close", true);
				},'jms_qualitymargin');
			});
}

function addDTLA() {
	var frans_id = $("#quaMarForm input[name='frans_id']").val();
	if (frans_id == '') {
		$.messager.alert('提示', '请先选择加盟方！', 'info');
		return;
	}
	openCommDialog('收保证金', 'franController.do?getCommPage&page=DLTA', 400, 220,
			function() {
				DLTAOptType = 0;
				$("#DTLAForm input[name='frans_id']").val(frans_id);
				openDLTADialog({
					row : {
						"rec_date" : "",
						"rec_money" : ""
					},
					rowIndex : -1
				}, function(data) {
					$("#dlg").dialog("close", true);
					dtlaDg.datagrid("appendRow", data);

					// console.info($("#DTLADataGrid").datagrid("getData"));
					calculateTotalRecMoney();
					calculateYE();
				});
			});
}
function delDTLA() {
	var rows = dtlaDg.datagrid("getSelections");
	if (rows.length == 0) {
		$.messager.alert("提示", "请选择要删除的记录！", "info");
		return;
	} else {
		$.messager.confirm("提示", "是否确定删除所选择的记录?", function(r) {
			if (r) {
				for ( var i = 0; i < rows.length; i++) {
					var Index = dtlaDg.datagrid("getRowIndex", rows[i]);
					dtlaDg.datagrid("deleteRow", Index);
				}

				calculateTotalRecMoney();
				calculateYE();
			}
		});
	}
}
function editDLTA() {
	var rows = dtlaDg.datagrid("getSelections");
	if (rows.length == 0) {
		$.messager.alert("提示", "请选择所要修改的记录！", "info");
		return;
	}
	if (rows.length > 1) {
		$.messager.alert("提示", "请选择一条记录进行修改！", "info");
		return;
	}
	var row = dtlaDg.datagrid("getSelected");
	var rowIndex = dtlaDg.datagrid("getRowIndex", row);
	var rowData = {};
	rowData.row = row;
	rowData.rowIndex = rowIndex;
	openCommDialog('收保证金', 'franController.do?getCommPage&page=DLTA', 400, 220,
			function() {
				var frans_id = $("#quaMarForm input[name='frans_id']").val();
				DLTAOptType = 1;
				openDLTADialog(rowData, function(data) {
					$("#dlg").dialog("close", true);
					// $("#DTLADataGrid").datagrid("appendRow",data);
					dtlaDg.datagrid("updateRow", {
						index : data.rowIndex,
						row : {
							rec_date : data.rec_date,
							rec_money : data.rec_money
						}
					});

					calculateTotalRecMoney();
					calculateYE();
				});
			});
}

function addDTLB() {
	var proj_id = $("#ysb2 #proj_id").val();
	if (proj_id == '') {
		$.messager.alert("提示", "请先选择工程！", "info");
		return;
	}

	var data = {};
	data.cmpqual_seq = "";
	data.compact_id = proj_id;
	data.deduct_money = "";
	data.rowIndex = -1;
	openCommDialog('扣保证金', 'franController.do?getCommPage&page=DLTB', 400, 220,
			function() {
				openDTLBDialog(data, function(backData) {
					if (perbDTLBDatas1[backData.cmpqual_seq] != undefined) {
						var a = perbDTLBDatas1[backData.cmpqual_seq].deduct_money;
						var b = backData.deduct_money;
						perbDTLBDatas1[backData.cmpqual_seq].deduct_money = FloatAdd(
								a, b);
					} else {
						perbDTLBDatas1[backData.cmpqual_seq] = backData;
					}
					dtlbDg.datagrid("appendRow", backData);
					var compact_id = backData.compact_id + '';
					var rowIndex = dtlbDg.datagrid("getData").total + '';
					
					var row = $("#quaProjDataGrid").datagrid("getSelected");
					var index = $("#quaProjDataGrid").datagrid("getRowIndex",row);
					$("#quaProjDataGrid").datagrid("refreshRow",index);

					$("#dlg").dialog("close", true);

					calculateTotalDeductMoney();
					calculateYE();
				});
			});
}

function editDTLB() {
	var rows = $("#DTLBDataGrid").datagrid("getSelections");
	if (rows.length == 0) {
		$.messager.alert("提示", "请选择所要修改的记录！", "info");
		return;
	}
	if (rows.length > 1) {
		$.messager.alert("提示", "请选择一条记录进行修改！", "info");
		return;
	}
	var row = $("#DTLBDataGrid").datagrid("getSelected");
	var rowIndex = $("#DTLBDataGrid").datagrid("getRowIndex", row);
	var rowData = {};
	rowData.cmpqual_seq = row.cmpqual_seq;
	rowData.compact_id = row.compact_id;
	rowData.deduct_money = row.deduct_money;
	rowData.rowIndex = rowIndex;
	openCommDialog(
			'扣保证金',
			'franController.do?getCommPage&page=DLTB',
			400,
			220,
			function() {
				openDTLBDialog(
						rowData,
						function(backData) {
							
							// console.info(backData);
							// $("#DTLBDataGrid").datagrid("appendRow",backData);

							perbDTLBDatas[backData.compact_id][backData.rowIndex] = backData;



							var a = perbDTLBDatas1[$("#DTLBDataGrid").datagrid("getData").rows[backData.rowIndex].cmpqual_seq].deduct_money;
							var b = row.deduct_money;
							perbDTLBDatas1[$("#DTLBDataGrid").datagrid("getData").rows[backData.rowIndex].cmpqual_seq].deduct_money = FloatSub(a, b);
							if (perbDTLBDatas1[backData.cmpqual_seq] != undefined) {
								a = perbDTLBDatas1[backData.cmpqual_seq].deduct_money;
								b = backData.deduct_money;
								perbDTLBDatas1[backData.cmpqual_seq].deduct_money = FloatAdd(
										a, b);
							} else {
								perbDTLBDatas1[backData.cmpqual_seq] = backData;
							}
							
							$("#DTLBDataGrid").datagrid("updateRow", {
								index : backData.rowIndex,
								row : {
									cmpqual_seq : backData.cmpqual_seq,
									cmpqual_text : backData.cmpqual_text,
									compact_id : backData.compact_id,
									deduct_money : backData.deduct_money
								}
							});
							$("#dlg").dialog("close", true);

							calculateTotalDeductMoney();
							calculateYE();
						});
			});
}

function delDTLB() {
	var rows = $("#DTLBDataGrid").datagrid("getSelections");
	if (rows.length == 0) {
		$.messager.alert("提示", "请选择要删除的记录！", "info");
		return;
	} else {
		$.messager.confirm("提示", "是否确定删除所选择的记录?", function(r) {
			if (r) {
				for ( var i = 0; i < rows.length; i++) {
					var Index = $("#DTLBDataGrid").datagrid("getRowIndex",
							rows[i]);
					var a = perbDTLBDatas1[rows[i].cmpqual_seq].deduct_money;
					var b = rows[i].deduct_money;
					perbDTLBDatas1[rows[i].cmpqual_seq].deduct_money = FloatSub(
							a, b);
					$("#DTLBDataGrid").datagrid("deleteRow", Index);
				}
				perbDTLBDatas[rows[0].compact_id] = $("#DTLBDataGrid")
						.datagrid("getData").rows;
				// alert(perbDTLBDatas[rows[0].compact_id].length);
				
				var row = $("#quaProjDataGrid").datagrid("getSelected");
				var index = $("#quaProjDataGrid").datagrid("getRowIndex",row);
				$("#quaProjDataGrid").datagrid("refreshRow",index);
				calculateTotalDeductMoney();
				calculateYE();
			}
		});
	}
}

function addDTLC() {
	var frans_id = $("#quaMarForm input[name='frans_id']").val();
	if (frans_id == '') {
		$.messager.alert('提示', '请先选择加盟方！', 'info');
		return;
	}
	var data = {};
	data.line_no = "";
	data.cmpqual_desc = "";
	data.deduct_money = "";
	data.line_no = $("#DTLCDataGrid").datagrid("getData").total + 1;
	data.rowIndex = -1;
	openCommDialog('扣保证金---其他', 'franController.do?getCommPage&page=DTLC', 400,
			220, function() {
				openDTLCDialog(data, function(backData) {
					var count = 0;
					for ( var key in perbDTLBDatas1) {
						if (backData.cmpqual_desc == perbDTLBDatas1[key].cmpqual_text) {
							var a = perbDTLBDatas1[key].deduct_money;
							var b = backData.deduct_money;
							perbDTLBDatas1[key].deduct_money = FloatAdd(
									a, b);
							break;
						}
						if (backData.cmpqual_desc == key) {
							var a = perbDTLBDatas1[key].deduct_money;
							var b = backData.deduct_money;
							perbDTLBDatas1[key].deduct_money = FloatAdd(
									a, b);
							break;
						}
						count++;
					}
					if (count == calculateJSONLength(perbDTLBDatas1)) {
						if (backData.cmpqual_seq != "") {
							perbDTLBDatas1[backData.cmpqual_seq] = {
								cmpqual_seq : backData.cmpqual_seq,
								cmpqual_text : backData.cmpqual_desc,
								deduct_money : backData.deduct_money
							};
						}else{
							perbDTLBDatas1[backData.cmpqual_desc] = {
									cmpqual_text : backData.cmpqual_desc,
									deduct_money : backData.deduct_money
								};
						}

						
					}
					// console.info(backData);
					$("#DTLCDataGrid").datagrid("appendRow", backData);

					var rowIndex = $("#DTLCDataGrid").datagrid("getData").total
							+ '';
					if (optType == 0) {
						perbDTLCDatas.push({
							cmpqual_desc : backData.cmpqual_desc,
							deduct_money : backData.deduct_money,
							line_no : rowIndex
						});
					}

					$("#dlg").dialog("close", true);

					calculateTotalDeductMoney();
					calculateYE();
				});
			});
}

function calculateJSONLength(obj) {
	var sum = 0;
	for ( var key in obj) {
		sum++;
	}
	return sum;
}

function editDTLC() {
	var rows = $("#DTLCDataGrid").datagrid("getSelections");
	if (rows.length == 0) {
		$.messager.alert("提示", "请选择所要修改的记录！", "info");
		return;
	}
	if (rows.length > 1) {
		$.messager.alert("提示", "请选择一条记录进行修改！", "info");
		return;
	}
	var row = $("#DTLCDataGrid").datagrid("getSelected");
	var rowIndex = $("#DTLCDataGrid").datagrid("getRowIndex", row);
	var rowData = {};
	rowData.deduct_money = row.deduct_money;
	rowData.line_no = row.line_no;
	rowData.performance_seq = row.performance_seq;
	rowData.cmpqual_desc = row.cmpqual_desc;
	rowData.rowIndex = rowIndex;
	var cmpqualText = $("#DTLCDataGrid").datagrid("getData").rows[rowIndex].cmpqual_desc;
	var deductMoney = $("#DTLCDataGrid").datagrid("getData").rows[rowIndex].deduct_money;
	openCommDialog('扣保证金', 'franController.do?getCommPage&page=DTLC', 400, 220,
			function() {
				openDTLCDialog(rowData, function(backData) {
					for ( var key in perbDTLBDatas1) {
						if (cmpqualText == perbDTLBDatas1[key].cmpqual_text) {
							var a = perbDTLBDatas1[key].deduct_money;
							var b = deductMoney;
							perbDTLBDatas1[key].deduct_money = FloatSub(
									a, b);
							break;
						}
						if (cmpqualText == key) {
							var a = perbDTLBDatas[cmpqualText].deduct_money;
							var b = deductMoney;
							perbDTLBDatas1[cmpqualText].deduct_money = FloatSub(
									a, b);
							break;
						}
					}
					var count = 0;
					for ( var key in perbDTLBDatas1) {
						if (backData.cmpqual_desc == perbDTLBDatas1[key].cmpqual_text) {
							var a = perbDTLBDatas1[key].deduct_money;
							var b = backData.deduct_money;
							perbDTLBDatas1[key].deduct_money = FloatAdd(
									a, b);
							break;
						}
						if (backData.cmpqual_desc == key) {
							var a = perbDTLBDatas1[key].deduct_money;
							var b = backData.deduct_money;
							perbDTLBDatas1[key].deduct_money = FloatAdd(
									a, b);
							break;
						}
						count++;
					}
					if (count == calculateJSONLength(perbDTLBDatas1)) {
						if (backData.cmpqual_seq != "") {
							perbDTLBDatas1[backData.cmpqual_seq] = {
								cmpqual_seq : backData.cmpqual_seq,
								cmpqual_text : backData.cmpqual_desc,
								deduct_money : backData.deduct_money
							};
						}else{
							perbDTLBDatas1[backData.cmpqual_desc] = {
									cmpqual_text : backData.cmpqual_desc,
									deduct_money : backData.deduct_money
								};
						}
					}
					perbDTLCDatas[backData.rowIndex] = backData;

					$("#DTLCDataGrid").datagrid("updateRow", {
						index : backData.rowIndex,
						row : {
							cmpqual_desc : backData.cmpqual_desc,
							deduct_money : backData.deduct_money,
							line_no : backData.line_no,
							rowIndex : backData.rowIndex
						}
					});
					$("#dlg").dialog("close", true);

					calculateTotalDeductMoney();
					calculateYE();
				});
			});
}

function delDTLC() {
	var rows = $("#DTLCDataGrid").datagrid("getSelections");
	if (rows.length == 0) {
		$.messager.alert("提示", "请选择要删除的记录！", "info");
		return;
	} else {
		$.messager.confirm("提示", "是否确定删除所选择的记录?", function(r) {
			if (r) {
				for ( var i = 0; i < rows.length; i++) {
					if(rows[i].cmpqual_seq==null||rows[i].cmpqual_seq==""){
						var a = perbDTLBDatas1[rows[i].cmpqual_desc].deduct_money;
						var b = rows[i].deduct_money;
						perbDTLBDatas1[rows[i].cmpqual_desc].deduct_money = FloatSub(a,b);
					}else{
						var a = perbDTLBDatas1[rows[i].cmpqual_seq].deduct_money;
						var b = rows[i].deduct_money;
						perbDTLBDatas1[rows[i].cmpqual_seq].deduct_money = FloatSub(a,b);
					}
					var Index = $("#DTLCDataGrid").datagrid("getRowIndex",
							rows[i]);
					$("#DTLCDataGrid").datagrid("deleteRow", Index);
				}
				perbDTLCDatas = $("#DTLCDataGrid").datagrid("getData").rows;
				// alert(perbDTLBDatas[rows[0].compact_id].length);
				calculateTotalDeductMoney();
				calculateYE();
			}
		});
	}
}

function calculateTotalRecMoney(param) {
	var rowDatas = dtlaDg.datagrid("getData");
	var totalMoney = 0;
	for ( var i = 0; i < rowDatas.total; i++) {
		// alert(rowDatas.rows[i].rec_money);
		totalMoney = FloatAdd(totalMoney, rowDatas.rows[i].rec_money);
	}
	if (param == undefined) {
		totalMoney = FloatAdd(totalMoney, $("#payam").val());
	} else {
		totalMoney = FloatAdd(totalMoney, param);
	}
	$("#quaMarForm #totalRecMoney").val(totalMoney);
}

function calculateTotalDeductMoney() {
	var deductMoney = 0;
	for ( var i = 0; i < perbDTLBArr.length; i++) {
		for ( var j = 0; j < perbDTLBDatas[perbDTLBArr[i]].length; j++) {
			// alert(perbDTLBDatas[perbDTLBArr[i]][j].deduct_money);
			deductMoney = FloatAdd(deductMoney,
					perbDTLBDatas[perbDTLBArr[i]][j].deduct_money);
		}
	}
	for ( var i = 0; i < perbDTLCDatas.length; i++) {
		deductMoney = FloatAdd(deductMoney, perbDTLCDatas[i].deduct_money);
	}
	$("#quaMarForm #totalDeMoney").val(deductMoney);
}

function calculateYE() {
	

	/*alert($("#quaMarForm #totalRecMoney").val());
	alert($("#quaMarForm #totalDeMoney").val());
	alert($("#quaMarForm #totalReturn").val());*/
	
	var ye = FloatSub($("#totalRecMoney").val(), $("#totalDeMoney").val());
	ye = FloatSub(ye, $("#totalReturn").val());
	// var ye = FloatSub(362,0);
	$("#YE").val(ye);
}

function FloatSub(arg1, arg2) {
	var r1, r2, m, n;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	// 动态控制精度长度
	n = (r1 >= r2) ? r1 : r2;
	return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

function FloatAdd(arg1, arg2) {
	var r1, r2, m;
	try {
		r1 = arg1.toString().split(".")[1].length;
	} catch (e) {
		r1 = 0;
	}
	try {
		r2 = arg2.toString().split(".")[1].length;
	} catch (e) {
		r2 = 0;
	}
	m = Math.pow(10, Math.max(r1, r2));
	return (arg1 * m + arg2 * m) / m;
}

function quaProjFormatter(value,row,index){
	for(var key in perbDTLBDatas){
		if(row.PROJ_ID==key&&perbDTLBDatas[key].length>0){
			return "*&nbsp;&nbsp;"+value;
		}
	}
	return value;
}

function quaProjFormatter1(value,row,index){
	var htmlStr = "<div style='text-align:right'>"+value+"</div>";
	return htmlStr;
}