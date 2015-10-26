var optType = -1;

var perbDTLBArr = [];
var perbDTLBDatas = {};
var perbDTLBDatas1 = {};
var perbDTLCDatas = [];

Array.prototype.del = function(n) {
	if (n < 0) {
		return this;
	} else {
		return this.slice(0, n).concat(this.slice(n + 1, this.length));
	}
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
$
		.extend(
				$.fn.validatebox.defaults.rules,
				{
					checkLength : {
						validator : function(value, param) {
							var length = 0;
							for ( var i = 0; i < value.length; i++) {
								var iCode = value.charCodeAt(i);
								if ((iCode >= 0 && iCode <= 255)
										|| (iCode >= 0xff61 && iCode <= 0xff9f)) {
									length += 1;
								} else {
									length += 2;
								}
							}
							if (length <= param[0]) {
								return true;
							} else {
								return false;
							}
						},
						message : '您输入的内容过长，请简要概述！'
					},
					phone : {// 验证电话号码
						validator : function(value) {
							return /^((\d{3,5}-)?\d{3,5}-\d{7,8}(-\d{1,5})?|(13|14|15|17|18)\d{9})$/i
									.test(value);
						},
						message : "格式不正确,请使用下面格式:020-88888888"
					},
					mobile : {// 验证手机号码
						validator : function(value) {
							return /^(13|15|17|18)\d{9}$/i.test(value);
						},
						message : "手机号码格式不正确"
					},
					zip : {// 验证邮政编码
						validator : function(value) {
							return /^[1-9]\d{5}$/i.test(value);
						},
						message : '邮政编码格式不正确'
					}
				});

$(function() {

	/*
	 * var arr = ["1","2","3","4"]; alert($.inArray("0",arr));
	 */

	$("#perbForm")
			.form(
					{
						onLoadSuccess : function(data) {
							$("#perbForm #frans_name").val(data.cmp_name);
							$("#perbForm #frans_sname").val(data.cmp_sname);
							$("#perbForm #frans_charger").val(data.cmp_charger);
							$("#perbForm #frans_contactor").val(
									data.cmp_contactor1);
							$("#perbForm #frans_tel").val(data.cmp_tel1);
							$("#perbForm #frans_mobile").val(data.cmp_mobile1);
							$("#perbForm #frans_address").val(data.cmp_address);
							$("#DTLADataGrid").datagrid("loadData", {
								rows : data.DTLADatas,
								total : data.DTLADatas.length
							});
							calculateTotalRecMoney();
							$("#perbProjDataGrid").datagrid({
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

							for ( var i = 0; i < data.DTLBDatas.length; i++) {
								if ($.inArray(data.DTLBDatas[i].compact_id,
										perbDTLBArr) < 0) {
									// alert(data.DTLBDatas[i].compact_id);
									perbDTLBArr
											.push(data.DTLBDatas[i].compact_id);
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
							/*
							 * for ( var i = 0; i < data.DTLCDatas.length; i++) {
							 * $("#TotalDTLBDataGrid") .datagrid( "appendRow", {
							 * cmpqual_text : data.DTLCDatas[i].cmpqual_desc,
							 * deduct_money : data.DTLCDatas[i].deduct_money }); }
							 */

							$("#DTLCDataGrid").datagrid("loadData", {
								rows : data.DTLCDatas,
								total : data.DTLCDatas.length
							});

							$("#perbDTLBTabs").tabs("select", "一级扣除事项");
						}
					});

	$("#perbProjDataGrid")
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
						}
					});

	$("#perbDTLBTabs").tabs(
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
						$("#perbDTLBTabs #TotalDTLBDataGrid").datagrid(
								'loadData', {
									total : 0,
									rows : []
								});

						for ( var key in perbDTLBDatas1) {
							if (perbDTLBDatas1[key].deduct_money == 0) {
								continue;
							}
							$("#perbDTLBTabs #TotalDTLBDataGrid").datagrid(
									"appendRow", perbDTLBDatas1[key]);
						}
						/*
						 * for ( var i = 0; i < perbDTLBArr.length; i++) { var
						 * datas = perbDTLBDatas[perbDTLBArr[i]]; for ( var j =
						 * 0; j < datas.length; j++) { $("#perbDTLBTabs
						 * #TotalDTLBDataGrid").datagrid( "appendRow",
						 * datas[j]); } for(var j = 0; j<datas.length; j++){
						 * $("#perbDTLBTabs #TotalDTLBDataGrid").datagrid(
						 * "appendRow",
						 * {cmpqual_text:datas[j].cmpqual_desc,deduct_money:datas[j].deduct_money}); } }
						 */

						// for(var i=0;i<perbDTLCDatas.length;i++){
						// $("#perbDTLBTabs #TotalDTLBDataGrid").datagrid(
						// "appendRow",
						// {cmpqual_text:perbDTLCDatas[i].cmpqual_desc,deduct_money:perbDTLCDatas[i].deduct_money});
						// }
						// console.info(perbDTLBDatas);
					}
				}
			});

	/* var initData = []; */
	// 创建并初始化加盟方管理基本信息表格对象
	simplePerbDataGrid = $('#perbDataGrid').datagrid(
			{
				url : 'franController.do?loadPerb',
				onDblClickRow : function(rowIndex, rowData) {
					$("#franSelBtn").hide();

					perbDTLBArr = [];
					perbDTLBDatas = {};
					perbDTLBDatas1 = {};
					perbDTLCDatas = [];
					$('#perbForm').form('clear');
					$("#DTLADataGrid").datagrid("loadData", {
						total : 0,
						rows : []
					});
					$("#perbDTLBTabs").tabs("select", 0);
					$("#TotalDTLBDataGrid").datagrid("loadData", {
						total : 0,
						rows : []
					});
					$("#perbProjDataGrid").datagrid("loadData", {
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
					optType = 1;

					var row = rowData;
					var performance_seq = row.performance_seq;
					$('#perbForm').form(
							'load',
							'franController.do?loadPerbById&performance_seq='
									+ performance_seq);
					$("#perbDlg").dialog('setTitle', '修改');
					$("#perbDlg").dialog('open');
				},
				loadFilter : pagerFilter,

			});
	$("#perbForm").form({
		onLoadSuccess : function(data) {
			$("#belong_cmp_name").val(data.belong_cmp_name);
			$("#cmp_country_name").val(data.cmp_country_name);
			$("#cmp_province_name").val(data.cmp_province_name);
			$("#cmp_city_name").val(data.cmp_city_name);
			$("#cmp_county_name").val(data.cmp_county_name);
			$("#cmp_town_name").val(data.cmp_town_name);

		},
	});

	// 对话关闭事件
	simplePerbDialog = $('#perbDlg').dialog({
		onBeforeClose : function() {
			var cmp_id = $('#perbForm #cmp_id').val();

			if (cmp_id != '') {
				// 如果主要拜访人信息不为空，则提示信息，如果确定关闭对话框，则清空表单数据，选中拜访管理信息面板，并刷新拜访管理基本信息表格数据
				$.messager.confirm('提示', '是否确定返回主界面？', function(r) {
					if (r) {
						simplePerbDialog.dialog('close', true);
					}
				});
				return false;
			}
		}
	});

	$("#perbProjDataGrid").datagrid({
		onSelect : function(rowIndex, rowData) {
			// alert($("#TotalDTLBDataGrid").datagrid("getData").total);
			$("#proj_id").val(rowData['PROJ_ID']);
			// $("#DTLBDataGrid").datagrid("loadData",{rows:[],total:0});
			// console.info(perbDTLBDatas[rowData.PROJ_ID]);
			var rows = [];
			for ( var i = 0; i < perbDTLBDatas[rowData.PROJ_ID].length; i++) {
				rows.push(perbDTLBDatas[rowData.PROJ_ID][i]);
			}
			$("#DTLBDataGrid").datagrid("loadData", {
				rows : rows,
				total : perbDTLBDatas[rowData.PROJ_ID].length
			});
			// $("#DTLBDataGrid").datagrid("loadData",{rows:perbDTLBDatas[rowData.PROJ_ID],total:0});
		}
	});

});

function addPerb() {
	$("#franSelBtn").show();
	// 将拜访管理信息操作位置零
	perbDTLBArr = [];
	perbDTLBDatas = {};
	perbDTLBDatas1 = {};
	perbDTLCDatas = [];
	$('#perbForm').form('clear');
	$("#DTLADataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#perbDTLBTabs").tabs("select", 0);
	$("#TotalDTLBDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#perbProjDataGrid").datagrid("loadData", {
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
	optType = 0;
	simplePerbDialog.dialog('setTitle', '新增');
	$("#perbForm #totalRecMoney").val(0);
	$("#perbForm #totalDeMoney").val(0);
	simplePerbDialog.dialog('open');
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
	openCommDialog(
			'扣保证金',
			'franController.do?getCommPage&page=DLTB',
			400,
			220,
			function() {
				openDTLBDialog(
						data,
						function(backData) {
							if (perbDTLBDatas1[backData.cmpqual_seq] != undefined) {
								var a = perbDTLBDatas1[backData.cmpqual_seq].deduct_money;
								var b = backData.deduct_money;
								perbDTLBDatas1[backData.cmpqual_seq].deduct_money = FloatAdd(
										a, b);
							} else {
								perbDTLBDatas1[backData.cmpqual_seq] = backData;
							}
							$("#DTLBDataGrid").datagrid("appendRow", backData);
							var compact_id = backData.compact_id + '';
							var rowIndex = $("#DTLBDataGrid").datagrid(
									"getData").total
									+ '';
							perbDTLBDatas[compact_id].push({
								compact_id : backData.compact_id,
								cmpqual_text : backData.cmpqual_text,
								cmpqual_seq : backData.cmpqual_seq,
								deduct_money : backData.deduct_money,
								rowIndex : rowIndex
							});
							
							var row = $("#perbProjDataGrid").datagrid("getSelected");
							var index = $("#perbProjDataGrid").datagrid("getRowIndex",row);
							$("#perbProjDataGrid").datagrid("refreshRow",index);
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

							var a = perbDTLBDatas1[$("#DTLBDataGrid").datagrid(
									"getData").rows[backData.rowIndex].cmpqual_seq].deduct_money;
							var b = $("#DTLBDataGrid").datagrid("getData").rows[backData.rowIndex].deduct_money;
							perbDTLBDatas1[$("#DTLBDataGrid").datagrid(
									"getData").rows[backData.rowIndex].cmpqual_seq].deduct_money = FloatSub(
									a, b);
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

function addDTLA() {
	var frans_id = $("#perbForm input[name='frans_id']").val();
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
					$("#DTLADataGrid").datagrid("appendRow", data);

					// console.info($("#DTLADataGrid").datagrid("getData"));
					calculateTotalRecMoney();
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
		$.messager
				.confirm(
						"提示",
						"是否确定删除所选择的记录?",
						function(r) {
							if (r) {

								for ( var i = 0; i < rows.length; i++) {
									var Index = $("#DTLBDataGrid").datagrid(
											"getRowIndex", rows[i]);
									var a = perbDTLBDatas1[rows[i].cmpqual_seq].deduct_money;
									var b = rows[i].deduct_money;
									perbDTLBDatas1[rows[i].cmpqual_seq].deduct_money = FloatSub(
											a, b);
									$("#DTLBDataGrid").datagrid("deleteRow",
											Index);
								}
								perbDTLBDatas[rows[0].compact_id] = $(
										"#DTLBDataGrid").datagrid("getData").rows;
								// alert(perbDTLBDatas[rows[0].compact_id].length);
								var row = $("#perbProjDataGrid").datagrid("getSelected");
								var index = $("#perbProjDataGrid").datagrid("getRowIndex",row);
								$("#perbProjDataGrid").datagrid("refreshRow",index);
								calculateTotalDeductMoney();
								calculateYE();
							}
						});
	}
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

function calculateYE() {
	var ye = FloatSub($("#perbForm #totalRecMoney").val(), $(
			"#perbForm #totalDeMoney").val());
	// var ye = FloatSub(362,0);
	$("#perbForm #YE").val(ye);
	$("#perbForm #return_money").val(ye);
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

function editDLTA() {
	var rows = $("#DTLADataGrid").datagrid("getSelections");
	if (rows.length == 0) {
		$.messager.alert("提示", "请选择所要修改的记录！", "info");
		return;
	}
	if (rows.length > 1) {
		$.messager.alert("提示", "请选择一条记录进行修改！", "info");
		return;
	}
	var row = $("#DTLADataGrid").datagrid("getSelected");
	var rowIndex = $("#DTLADataGrid").datagrid("getRowIndex", row);
	var rowData = {};
	rowData.row = row;
	rowData.rowIndex = rowIndex;
	openCommDialog('收保证金', 'franController.do?getCommPage&page=DLTA', 400, 220,
			function() {
				var frans_id = $("#perbForm input[name='frans_id']").val();
				DLTAOptType = 1;
				openDLTADialog(rowData, function(data) {
					$("#dlg").dialog("close", true);
					// $("#DTLADataGrid").datagrid("appendRow",data);
					$("#DTLADataGrid").datagrid("updateRow", {
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

function delDTLA() {
	var rows = $("#DTLADataGrid").datagrid("getSelections");
	if (rows.length == 0) {
		$.messager.alert("提示", "请选择要删除的记录！", "info");
		return;
	} else {
		$.messager.confirm("提示", "是否确定删除所选择的记录?", function(r) {
			if (r) {
				for ( var i = 0; i < rows.length; i++) {
					var Index = $("#DTLADataGrid").datagrid("getRowIndex",
							rows[i]);
					$("#DTLADataGrid").datagrid("deleteRow", Index);
				}

				calculateTotalRecMoney();
				calculateYE();
			}
		});
	}
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
	$("#perbForm #totalDeMoney").val(deductMoney);
}

function calculateTotalRecMoney() {
	var rowDatas = $("#DTLADataGrid").datagrid("getData");
	var totalMoney = 0;
	for ( var i = 0; i < rowDatas.total; i++) {
		// alert(rowDatas.rows[i].rec_money);
		totalMoney = FloatAdd(totalMoney, rowDatas.rows[i].rec_money);
	}
	$("#perbForm #totalRecMoney").val(totalMoney);
}

function openPerbFranSel() {

	openCommDialog('加盟方资料选择', 'franController.do?getCommPage&page=franSel',
			1000, 500, function() {
				openFprojFranSelDlg(function(data) {
					$("#perbForm input[name='frans_id']").val(data.cmp_id);
					$("#frans_sname").val(data.cmp_sname);
					$("#frans_contactor").val(data.cmp_contactor1);
					$("#frans_tel").val(data.cmp_tel1);
					$("#frans_address").val(data.cmp_address);
					$("#frans_charger").val(data.cmp_charger);
					$("#frans_name").val(data.cmp_name);
					$("#frans_mobile").val(data.cmp_mobile1);

					var frans_id = $("#perbForm input[name='frans_id']").val();
					$("#perbProjDataGrid").datagrid({
						queryParams : {
							frans_id : frans_id
						},
						url : 'franController.do?loadPerbProjs'
					});

					if (optType == 1) {
						perbDTLBArr = [];
						perbDTLBDatas = {};
						perbDTLCDatas = [];
						$("#DTLADataGrid").datagrid("loadData", {
							total : 0,
							rows : []
						});
						$("#perbDTLBTabs").tabs("select", 0);
						$("#TotalDTLBDataGrid").datagrid("loadData", {
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
						optType = 0;
						simplePerbDialog.dialog('setTitle', '新增');
						$("#perbForm #totalRecMoney").val(0);
						$("#perbForm #totalDeMoney").val(0);
						$("#perbForm #return_money").val(0);
						$("#perbForm #YE").val(0);
					}

					// console.info(data);
					$("#dlg").dialog("close", true);
				}, 'jms_performancebond');
			});
}

function savePerb() {
	var DTLAJsonData = JSON.stringify($("#DTLADataGrid").datagrid("getRows"));
	var rows = $("#DTLCDataGrid").datagrid("getRows");
	for ( var i = 0; i < rows.length; i++) {
		delete rows[i].cmpqual_seq;
	}
	var DTLCJsonData = JSON.stringify(rows);
	// alert(jQuery.parseJSON($("#DTLADataGrid").datagrid("getRows")));

	var DTLBArr = [];

	for ( var i = 0; i < perbDTLBArr.length; i++) {
		for ( var j = 0; j < perbDTLBDatas[perbDTLBArr[i]].length; j++) {
			// alert(perbDTLBDatas[perbDTLBArr[i]][j].deduct_money);
			DTLBArr.push(perbDTLBDatas[perbDTLBArr[i]][j]);
		}
	}

	var DTLBJsonData = JSON.stringify(DTLBArr);

	$("#perbForm #DTLBJsonData").val(DTLBJsonData);
	$("#perbForm #DTLCJsonData").val(DTLCJsonData);
	var submitURL = 'franController.do?addOrEditPerbInfo&optType=' + optType
			+ '&DTLAJsonData=' + DTLAJsonData;

	$('#perbForm').form('submit', {
		url : submitURL,

		onSubmit : function() {
			var isValid = $('#perbForm').form('validate');
			return isValid;
		},
		success : function(data) {

			data = eval('(' + data + ')');
			if (!data.success) {
				$.messager.alert('提示', data.msg, 'error');
				return null;
			}
			perbDTLBArr = [];
			perbDTLBDatas = {};
			perbDTLCDatas = [];
			$('#perbForm').form('clear');
			$("#DTLADataGrid").datagrid("loadData", {
				total : 0,
				rows : []
			});
			$("#perbDTLBTabs").tabs("select", 0);
			$("#TotalDTLBDataGrid").datagrid("loadData", {
				total : 0,
				rows : []
			});
			$("#perbProjDataGrid").datagrid("loadData", {
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

			$("#perbDlg").dialog('close', true);
			$("#perbDataGrid").datagrid('reload');
			$.messager.alert('提示', '提交成功！', 'info');
		}
	});
}

function perbProjFormatter(value,row,index){
	for(var key in perbDTLBDatas){
		if(row.PROJ_ID==key&&perbDTLBDatas[key].length>0){
			return "*&nbsp;&nbsp;"+value;
		}
	}
	return value;
	
}
function perbProjFormatter1(value,row,index){
	value = Math.round(value*100)/100;
	var htmlStr = "<div style='text-align:right'>"+value+"</div>";
	return htmlStr;
}

function editPerb() {
	$("#franSelBtn").hide();
	perbDTLBArr = [];
	perbDTLBDatas = {};
	perbDTLBDatas1 = {};
	perbDTLCDatas = [];
	$('#perbForm').form('clear');
	$("#DTLADataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#perbDTLBTabs").tabs("select", 0);
	$("#TotalDTLBDataGrid").datagrid("loadData", {
		total : 0,
		rows : []
	});
	$("#perbProjDataGrid").datagrid("loadData", {
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
	optType = 1;
	var rows = $("#perbDataGrid").datagrid('getSelections');
	if (rows.length == 0) {
		$.messager.alert('提示', '请选择要修改的记录！', 'info');
		return false;
	}
	if (rows.length > 1) {
		$.messager.alert('提示', '请选择一条记录进行修改！', 'info');
		return false;
	}
	var row = $("#perbDataGrid").datagrid('getSelected');
	var performance_seq = row.performance_seq;
	$('#perbForm')
			.form(
					'load',
					'franController.do?loadPerbById&performance_seq='
							+ performance_seq);
	$("#perbDlg").dialog('setTitle', '修改');
	$("#perbDlg").dialog('open');
}

function addDTLC() {
	if ($("#frans_name").val() == '') {
		$.messager.alert("提示", "请先选择加盟方!", "info");
		return;
	}
	var data = {};
	data.line_no = "";
	data.cmpqual_desc = "";
	data.deduct_money = "";
	data.line_no = $("#DTLCDataGrid").datagrid("getData").total + 1;
	data.rowIndex = -1;
	openCommDialog(
			'扣保证金---其他',
			'franController.do?getCommPage&page=DTLC',
			400,
			220,
			function() {
				openDTLCDialog(
						data,
						function(backData) {
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

							$("#DTLCDataGrid").datagrid("appendRow", backData);

							var rowIndex = $("#DTLCDataGrid").datagrid(
									"getData").total
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
	openCommDialog(
			'扣保证金',
			'franController.do?getCommPage&page=DTLC',
			400,
			220,
			function() {
				openDTLCDialog(
						rowData,
						function(backData) {
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

function delPerb() {
	var rows = $("#perbDataGrid").datagrid('getSelections');
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
			idArray.push(rows[key].performance_seq);
		}
		// 弹出删除操作选择对话框，如果确定删除拜访管理信息，则提交cv_id数组到后台进行删除操作
		$.messager.confirm('提示', '是否确定删除所选择的记录？', function(r) {
			if (r) {
				$.ajax({
					type : 'POST',
					url : 'franController.do?delPerb&performance_seqs='
							+ idArray,
					dataType : 'text',
					// 将后台执行删除操作的结果反馈给用户
					success : function(data, status, xml) {
						$("#perbDataGrid").datagrid('reload');
						$("#perbDataGrid").datagrid('uncheckAll');
						$.messager.alert('提示', data + '！', 'info');
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {

					}
				});
			}
		});
	}
}
