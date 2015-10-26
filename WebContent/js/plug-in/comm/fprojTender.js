//操作符
var optType = -1;

var zheng = 1;
var add = 1;
var cmpqual_seq = 0;

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

	tenderDlg = $("#tenderDlg").dialog({
		onBeforeClose:function(){
			$("#tenderForm").form("clear");

			$("#bidConDg").datagrid("loadData", {
				total : 0,
				rows : []
			});

			$("#InsuranceDatagrid").datagrid("loadData", {
				total : 0,
				rows : []
			});

			$("#staffDatagrid").datagrid("loadData", {
				total : 0,
				rows : []
			});

			$("#conDatagrid").datagrid("loadData", {
				total : 0,
				rows : []
			});

			$("#zhengdatagrid").datagrid("loadData", {
				total : 0,
				rows : []
			});
		}
	});
	zhengDlg = $("#zhengDlg").dialog();
	tenderform=$("#tenderForm").form({
		onLoadSuccess:function(data){
			for(var i=0;i<data.dtla1.length;i++){
				$("#cmpIntelFileDg1 #"+data.dtla1[i].cmpqual_seq).attr("checked","checked");
			}
			for(var i=0;i<data.dtla2.length;i++){
				$("#cmpIntelFileDg #"+data.dtla2[i].cmpqual_seq).attr("checked","checked");
			}
			$("#comp_Performance").val(data.comp_Performance);
			$("#pre_regseq").val(data.yu.pre_regseq);
			$("#pre_no").val(data.yu.pre_no);
			$("#proj_name").val(data.yu.proj_name);
			$("#proj_sname").val(data.yu.proj_sname);
			$("#proj_addr").val(data.yu.proj_addr);
			$("#cust_cmp").val(data.yu.cust_cmp);
			$("#tenderForm #cust_contactor").val(data.yu.cust_contactor);
			$("#tenderForm #cust_tel").val(data.yu.cust_tel);
			$("#frans_id").val(data.yu.frans_id);
			$("#fran_contactor").val(data.yu.fran_contactor);
			$("#fran_tel").val(data.yu.fran_tel);
			$("#reg_cmp").val(data.yu.reg_cmp);
			$("#reg_dept").val(data.yu.reg_dept);
			$("#charger").val(data.yu.charger);
			$("#zhengdatagrid").datagrid("loadData", {
				total : data.zheng1.length,
				rows : data.zheng1
			});
			$("#toudatagrid").datagrid("loadData", {
				total : data.zheng2.length,
				rows : data.zheng2
			});
			$("#staffDatagrid").datagrid("loadData", {
				total : data.yushenglaodong.length,
				rows : data.yushenglaodong
			});
			$("#conDatagrid").datagrid("loadData", {
				total : data.yushengyanlao.length,
				rows : data.yushengyanlao
			});
			$("#bidConDg").datagrid("loadData", {
				total : data.toubiaolaodong.length,
				rows : data.toubiaolaodong
			});
			$("#InsuranceDatagrid").datagrid("loadData", {
				total : data.toubiaoyanlao.length,
				rows : data.toubiaoyanlao
			});
		}
	});
	// renDlg =$("#renDlg").dialog();
	// 加载首页方法
		$('#tenderDataGrid').datagrid({
			url : 'franController.do?loadTender',
			onDblClickRow:function(rowIndex,rowData){
				$("#tenderSelBtn").hide();
				optType = 1;
				var PRE_REGSEQ = rowData.PRE_REGSEQ;
				$('#tenderForm').form('load','franController.do?loadTenderById&PRE_REGSEQ='+PRE_REGSEQ);
				tenderDlg.dialog('setTitle','修改');
				tenderDlg.dialog('open');
			},
			loadFilter : pagerFilter
		});

});

function zhengDialogSave() {

	if ($('#cmpqual_seq').combobox('getText') == "") {
		$.messager.alert('提示', '证件不能为空！', 'info');
	} else {
		var data = {};

		
		data.pre_regseq = $("#pre_regseq").val();
		data.i_type = $("#i_type").val();

		data.cmpqual_seq = $('#cmpqual_seq').combobox('getValue');

		data.seq = $('#cmpqual_seq').combobox('getText');
		data.staff_id1 = $('#staff_id1').val();
		data.staff1 = $('#staff1').val();
		data.staff_id2 = $('#staff_id2').val();
		data.staff2 = $('#staff2').val();
		data.staff_id3 = $('#staff_id3').val();
		data.staff3 = $('#staff3').val();
		data.staff_id4 = $('#staff_id4').val();
		data.staff4 = $('#staff4').val();
		data.staff_id5 = $('#staff_id5').val();
		data.staff5 = $('#staff5').val();
		data.staff_id6 = $('#staff_id6').val();
		data.staff6 = $('#staff6').val();
		data.staff_id7 = $('#staff_id7').val();
		data.staff7 = $('#staff7').val();
		data.staff_id8 = $('#staff_id8').val();
		data.staff8 = $('#staff8').val();
		data.staff_id9 = $('#staff_id9').val();
		data.staff9 = $('#staff9').val();
		data.staff_id10 = $('#staff_id10').val();
		data.staff10 = $('#staff10').val();
		// 预审新增
		if (zheng == 1 && add == 1)
			$("#zhengdatagrid").datagrid('appendRow', data);
		// 投标新增
		else if (zheng == 0 && add == 1)
			$("#toudatagrid").datagrid('appendRow', data);
		// 预审修改
		else if (zheng == 1 && add == 0) {
			if (cmpqual_seq == $('#cmpqual_seq').combobox('getValue')) {
				var rows = $("#zhengdatagrid").datagrid('getRows');
				for ( var i in rows) {
					if ($('#cmpqual_seq').combobox('getValue') == rows[i].cmpqual_seq) {
						var rowIndex = $("#zhengdatagrid").datagrid(
								"getRowIndex", rows[i]);
						$("#zhengdatagrid").datagrid('deleteRow', rowIndex);
						$("#zhengdatagrid").datagrid('appendRow', data);
					}

				}

			} else {
				$.messager.alert('提示', '证书不能修改！', 'info');
			}

		}
		// 投标修改
		else if (zheng == 0 && add == 0) {
			if (cmpqual_seq == $('#cmpqual_seq').combobox('getValue')) {
				var rows = $("#toudatagrid").datagrid('getRows');
				for ( var i in rows) {
					if ($('#cmpqual_seq').combobox('getValue') == rows[i].cmpqual_seq) {
						var rowIndex = $("#toudatagrid").datagrid(
								"getRowIndex", rows[i]);
						$("#toudatagrid").datagrid('deleteRow', rowIndex);
						$("#toudatagrid").datagrid('appendRow', data);
					}
				}

			} else {
				$.messager.alert('提示', '证件不能修改！', 'info');
			}

		}
		
	}
	$("#zhengForm").form('clear');
	$('#zhengDlg').dialog('close');
}
function editZheng(zhengtype, addtype) {
	zheng = zhengtype;
	add = addtype;

	if (zheng == 1){
		var rows = $("#zhengdatagrid").datagrid('getSelections');
	}
	else{
		var rows = $("#toudatagrid").datagrid('getSelections');
	}
	if (rows.length == 0) {
		$.messager.alert('提示', '请选择要修改的记录！', 'info');
		return false;
	}
	if (rows.length > 1) {
		$.messager.alert('提示', '请选择一条记录进行修改！', 'info');
		return false;
	}

	if (zheng == 1){
		$("#i_type").val(0);
		var row = $("#zhengdatagrid").datagrid('getSelections');
	}
	else{
		$("#i_type").val(1);
		var row = $("#toudatagrid").datagrid('getSelections');
	}
	zhengDlg.dialog("setTitle", "修改");
	zhengDlg.dialog("open");

	cmpqual_seq = row[0].cmpqual_seq

	$('#pre_regseq').val(row[0].pre_regseq);

	$('#cmpqual_seq').combobox('setValue', row[0].cmpqual_seq);
	$('#cmpqual_seq').combobox('setText', row[0].seq);

	$('#staff_id1').val(row[0].staff_id1);
	$('#staff1').val(row[0].staff1);
	$('#staff_id2').val(row[0].staff_id2);
	$('#staff2').val(row[0].staff2);
	$('#staff_id3').val(row[0].staff_id3);
	$('#staff3').val(row[0].staff3);
	$('#staff_id4').val(row[0].staff_id4);
	$('#staff4').val(row[0].staff4);
	$('#staff_id5').val(row[0].staff_id5);
	$('#staff5').val(row[0].staff5);
	$('#staff_id6').val(row[0].staff_id6);
	$('#staff6').val(row[0].staff6);
	$('#staff_id7').val(row[0].staff_id7);
	$('#staff7').val(row[0].staff7);
	$('#staff_id8').val(row[0].staff_id8);
	$('#staff8').val(row[0].staff8);
	$('#staff_id9').val(row[0].staff_id9);
	$('#staff9').val(row[0].staff9);
	$('#staff_id10').val(row[0].staff_id10);
	$('#staff10').val(row[0].staff10);
}
function addTender() {
	$("#tenderSelBtn").show();
	optType = 0;
	$.ajax({
		type : 'POST',
		url : 'franController.do?loadCmpIntelFiles',
		dataType : 'json',
		success : function(data, status, xml) {
			fillCmpIntelFileTb(data, "cmpIntelFileDg1");
			fillCmpIntelFileTb(data, "cmpIntelFileDg");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

		}
	});
	tenderDlg.dialog("setTitle", "新增");
	tenderDlg.dialog("open");
}

function fillCmpIntelFileTb(data, id) {
	var tb = document.getElementById(id);
	tb.innerHTML = "";
	var tr;
	for ( var key in data) {
		if (key % 5 == 0) {
			tr = tb.insertRow();
		}
		var td = tr.insertCell();
		td.width = 150;
		td.innerHTML = "<label><input id='" + data[key].cmpqual_seq
				+ "' type='checkbox' />" + data[key].d_name + "</label>";
	}
}

function addzheng(zhengtype, addtype) {
	$("#zhengForm").form('clear');
	zheng = zhengtype;
	add = addtype;
	if(zheng==1){
	$("#i_type").val(0);
	}
	else{
		$("#i_type").val(1);
	}
	zhengDlg.dialog("setTitle", "证书及人员资料维护");
	zhengDlg.dialog("open");
}

function openTenderSel() {
	openCommDialog('加盟预审编号选取', 'franController.do?getCommPage&page=tenderSel',
			650, 480, function() {
				openFprojSelDlg(function(data) {
					// alert(JSON.stringify(data));
					$("#pre_regseq").val(data.pre_regseq);
					$("#pre_no").val(data.pre_no);
					$("#proj_name").val(data.proj_name);
					$("#proj_sname").val(data.proj_sname);
					$("#proj_addr").val(data.proj_addr);
					$("#cust_cmp").val(data.cust_cmp);
					$("#tenderForm #cust_contactor").val(data.cust_contactor);
					$("#tenderForm #cust_tel").val(data.cust_tel);
					$("#frans_id").val(data.frans_id);
					$("#fran_contactor").val(data.fran_contactor);
					$("#fran_tel").val(data.fran_tel);
					$("#reg_cmp").val(data.reg_cmp);
					$("#reg_dept").val(data.reg_dept);
					$("#charger").val(data.charger);
					$("#dlg").dialog("close");
				}, 'jms_fproj_tender');

			}, 'jms_fproj_tender');
}

// 劳动合同
function openren() {
	
	  var pre_regseq = $("#pre_regseq").val(); if (pre_regseq == "") {
	  $.messager.alert("提示", "请选择预审序号", "info"); return; }
	 
	openCommDialog('人员维护', 'franController.do?getCommPage&page=ren', 400, 500,
			function() {
				openRenSelDlg(function(datas) {
					for ( var key in datas) {
						var name = datas[key].STAFF_NAME;
						var rows = $("#bidConDg").datagrid('getRows');
						for ( var i in rows) {
							if (name == rows[i].STAFF_NAME) {
								var rowIndex = $("#bidConDg").datagrid(
										"getRowIndex", rows[i]);
								$("#bidConDg").datagrid('deleteRow', rowIndex);

							}
						}
						var row = datas[key];
						row.i_type = 1;
						row.p_type = 0;
						row.pre_regseq = $("#pre_regseq").val();
						$("#bidConDg").datagrid('appendRow', row);
					}
					$('#dlg').dialog('close');
				});
			});
}

function openStaff() {
	if ($('#cmpqual_seq').combobox('getText') == "")
		$.messager.alert('提示', '证件不能为空！', 'info');
	else {
		openCommDialog('人员维护', 'franController.do?getCommPage&page=ren', 400,
				500, function() {
					openStaffSelDlg(function(datas) {
						$('#staff_id1').val("");
						$('#staff1').val("");
						$('#staff_id2').val("");
						$('#staff2').val("");
						$('#staff_id3').val("");
						$('#staff3').val("");
						$('#staff_id4').val("");
						$('#staff4').val("");
						$('#staff_id5').val("");
						$('#staff5').val("");
						$('#staff_id6').val("");
						$('#staff6').val("");
						$('#staff_id7').val("");
						$('#staff7').val("");
						$('#staff_id8').val("");
						$('#staff8').val("");
						$('#staff_id9').val("");
						$('#staff9').val("");
						$('#staff_id10').val("");
						$('#staff10').val("");
						if (datas.length > 10) {
							$.messager.alert('提示', '选择人数不超过10个', 'info');
						} else if (datas.length == 0) {
							$.messager.alert('提示', '请选择人员', 'info');
						} else {
							if (datas.length >= 1) {
								$('#staff_id1').val(datas[0].STAFF_ID);
								$('#staff1').val(datas[0].STAFF_NAME);

							}
							if (datas.length >= 2) {

								$('#staff_id2').val(datas[0].STAFF_ID);
								$('#staff2').val(datas[1].STAFF_NAME);

							}
							if (datas.length >= 3) {

								$('#staff_id3').val(datas[0].STAFF_ID);
								$('#staff3').val(datas[2].STAFF_NAME);

							}
							if (datas.length >= 4) {

								$('#staff_id4').val(datas[0].STAFF_ID);
								$('#staff4').val(datas[3].STAFF_NAME);

							}
							if (datas.length >= 5) {

								$('#staff_id5').val(datas[0].STAFF_ID);
								$('#staff5').val(datas[4].STAFF_NAME);

							}
							if (datas.length >= 6) {

								$('#staff_id6').val(datas[0].STAFF_ID);
								$('#staff6').val(datas[5].STAFF_NAME);

							}
							if (datas.length >= 7) {

								$('#staff_id7').val(datas[0].STAFF_ID);
								$('#staff7').val(datas[6].STAFF_NAME);

							}
							if (datas.length >= 8) {

								$('#staff_id8').val(datas[0].STAFF_ID);
								$('#staff8').val(datas[7].STAFF_NAME);

							}
							if (datas.length >= 9) {

								$('#staff_id9').val(datas[0].STAFF_ID);
								$('#staff9').val(datas[8].STAFF_NAME);

							}
							if (datas.length >= 10) {

								$('#staff_id10').val(datas[0].STAFF_ID);
								$('#staff10').val(datas[9].STAFF_NAME);

							}
							
							$('#dlg').dialog('close');
						}
					}, $('#cmpqual_seq').combobox("getValue"));
				});

	}
}

// 养老保险
function openIns() {
	
	  var pre_regseq = $("#pre_regseq").val(); if (pre_regseq == "") {
	  $.messager.alert("提示", "请选择预审序号", "info"); return; }
	
	openCommDialog('人员维护', 'franController.do?getCommPage&page=ren', 400, 500,
			function() {
				openInsSelDlg(function(datas) {
					for ( var key in datas) {
						var name = datas[key].STAFF_NAME;
						var rows = $("#InsuranceDatagrid").datagrid('getRows');
						for ( var i in rows) {
							if (name == rows[i].STAFF_NAME) {
								var rowIndex = $("#InsuranceDatagrid")
										.datagrid("getRowIndex", rows[i]);
								$("#InsuranceDatagrid").datagrid('deleteRow',
										rowIndex);
							}
						}
						var row = datas[key];
						console.info(JSON.stringify(row));
						row.i_type = 1;
						row.p_type = 1;
						row.pre_regseq = $("#pre_regseq").val();
						$("#InsuranceDatagrid").datagrid('appendRow', row);

					}
					$('#dlg').dialog('close');
				});
			});
}

function deleteIns() {
	var datas = $("#InsuranceDatagrid").datagrid("getSelections");
	if (datas.length == 0) {
		$.messager.alert('提示', '请选择一条记录进行删除', 'info');
	}
	for ( var key in datas) {
		var rowIndex = $("#InsuranceDatagrid").datagrid("getRowIndex",
				datas[key]);
		$("#InsuranceDatagrid").datagrid('deleteRow', rowIndex);
	}
}

// 删除
function deleteRen() {
	var datas = $("#bidConDg").datagrid("getSelections");
	if (datas.length == 0) {
		$.messager.alert('提示', '请选择一条记录进行删除', 'info');
	}
	for ( var key in datas) {
		var rowIndex = $("#bidConDg").datagrid("getRowIndex", datas[key]);
		$("#bidConDg").datagrid('deleteRow', rowIndex);
	}
}

function deleteZheng() {

	var datas = $("#zhengdatagrid").datagrid("getSelections");
	if (datas.length == 0) {
		$.messager.alert('提示', '请选择一条记录进行删除', 'info');
	}
	for ( var key in datas) {
		var rowIndex = $("#zhengdatagrid").datagrid("getRowIndex", datas[key]);
		$("#zhengdatagrid").datagrid('deleteRow', rowIndex);
	}
}

function deleteTou() {
	var datas = $("#toudatagrid").datagrid("getSelections");
	if (datas.length == 0) {
		$.messager.alert('提示', '请选择一条记录进行删除', 'info');
	}
	for ( var key in datas) {
		var rowIndex = $("#toudatagrid").datagrid("getRowIndex", datas[key]);
		$("#toudatagrid").datagrid('deleteRow', rowIndex);
	}
}
// 新增和修改的提交按钮
function saveTendar() {
	var pre_regseq = $("#pre_regseq").val();
	if (pre_regseq == "") {
		$.messager.alert("提示", "请选择预审序号", "info");
		return;
	}
	var fprojDtlas1 = [];
	$("#cmpIntelFileDg1 input:checked").each(function() {
		var data = {};
		data.pre_regseq = $("#pre_regseq").val();
		data.i_type = 0;
		data.cmpqual_seq = $(this).attr("id");
		fprojDtlas1.push(data);
	});
	var fprojDtlas2 = [];
	$("#cmpIntelFileDg input:checked").each(function() {
		var data = {};
		data.pre_regseq = $("#pre_regseq").val();
		data.i_type = 1;
		data.cmpqual_seq = $(this).attr("id");
		fprojDtlas2.push(data);
	});
	var PZhengsAddArr = [];
	for(var i=0;i<$("#zhengdatagrid").datagrid('getData').rows.length;i++){
		delete $("#zhengdatagrid").datagrid('getData').rows[i].staff1;
		delete $("#zhengdatagrid").datagrid('getData').rows[i].staff2;
		delete $("#zhengdatagrid").datagrid('getData').rows[i].staff3;
		delete $("#zhengdatagrid").datagrid('getData').rows[i].staff4;
		delete $("#zhengdatagrid").datagrid('getData').rows[i].staff5;
		delete $("#zhengdatagrid").datagrid('getData').rows[i].staff6;
		delete $("#zhengdatagrid").datagrid('getData').rows[i].staff7;
		delete $("#zhengdatagrid").datagrid('getData').rows[i].staff8;
		delete $("#zhengdatagrid").datagrid('getData').rows[i].staff9;
		delete $("#zhengdatagrid").datagrid('getData').rows[i].staff10;
		delete $("#zhengdatagrid").datagrid("getData").rows[i].seq;
		PZhengsAddArr.push($("#zhengdatagrid").datagrid('getData').rows[i]);
		
	}
//	alert($("#conDatagrid").datagrid('getData').rows[0].staff_id);
	var PContractsAddArr = $("#staffDatagrid").datagrid('getData').rows;
	var PInsuranceAddArr = $("#conDatagrid").datagrid('getData').rows;
	var TContractsAddArr = $("#bidConDg").datagrid('getData').rows;
	var TInsuranceAddArr = $("#InsuranceDatagrid").datagrid('getData').rows;
	var toudatagrid = [];
	for(var i=0;i<$("#toudatagrid").datagrid('getData').rows.length;i++){
		delete $("#toudatagrid").datagrid('getData').rows[i].staff1;
		delete $("#toudatagrid").datagrid('getData').rows[i].staff2;
		delete $("#toudatagrid").datagrid('getData').rows[i].staff3;
		delete $("#toudatagrid").datagrid('getData').rows[i].staff4;
		delete $("#toudatagrid").datagrid('getData').rows[i].staff5;
		delete $("#toudatagrid").datagrid('getData').rows[i].staff6;
		delete $("#toudatagrid").datagrid('getData').rows[i].staff7;
		delete $("#toudatagrid").datagrid('getData').rows[i].staff8;
		delete $("#toudatagrid").datagrid('getData').rows[i].staff9;
		delete $("#toudatagrid").datagrid('getData').rows[i].staff10;
		delete $("#toudatagrid").datagrid('getData').rows[i].seq;
		toudatagrid.push($("#toudatagrid").datagrid('getData').rows[i]);
	}
	$("#PZhengsAddArr").val(JSON.stringify(PZhengsAddArr));
	$("#PContractsAddArr").val(JSON.stringify(PContractsAddArr));
	$("#PInsuranceAddArr").val(JSON.stringify(PInsuranceAddArr));
	$("#TContractsAddArr").val(JSON.stringify(TContractsAddArr));
	$("#TInsuranceAddArr").val(JSON.stringify(TInsuranceAddArr));
	$("#TZhengAddArr").val(JSON.stringify(toudatagrid));
	$("#PCom").val(JSON.stringify(fprojDtlas1));
	$("#Tcom").val(JSON.stringify(fprojDtlas2));
	$("#tenderForm").form('submit', {
		url : 'franController.do?saveOrEditFprojTender&optType=' + optType,
		onSubmit : function() {
			var isValid = $('#tenderForm').form('validate');
			$("#fprojTenderBtn").linkbutton("disable");
			return isValid;
		},
		success : function(data) {
			$("#fprojTenderBtn").linkbutton("enable");

			$("#tenderForm").form("clear");

			$("#bidConDg").datagrid("loadData", {
				total : 0,
				rows : []
			});

			$("#InsuranceDatagrid").datagrid("loadData", {
				total : 0,
				rows : []
			});

			$("#staffDatagrid").datagrid("loadData", {
				total : 0,
				rows : []
			});

			$("#conDatagrid").datagrid("loadData", {
				total : 0,
				rows : []
			});

			$("#zhengdatagrid").datagrid("loadData", {
				total : 0,
				rows : []
			});

			$("#toudatagrid").datagrid("loadData", {
				total : 0,
				rows : []
			});

			$("#tenderDlg").dialog('close', true);

			$("#tenderDataGrid").datagrid('reload');

			$.messager.alert('提示', '提交成功！', 'info');
		},
	});
}

// 关闭按钮
function cancelTender() {
	$("#tenderForm").form("clear");

	$("#bidConDg").datagrid("loadData", {
		total : 0,
		rows : []
	});

	$("#InsuranceDatagrid").datagrid("loadData", {
		total : 0,
		rows : []
	});

	$("#staffDatagrid").datagrid("loadData", {
		total : 0,
		rows : []
	});

	$("#conDatagrid").datagrid("loadData", {
		total : 0,
		rows : []
	});

	$("#zhengdatagrid").datagrid("loadData", {
		total : 0,
		rows : []
	});

	$("#toudatagrid").datagrid("loadData", {
		total : 0,
		rows : []
	});

	$("#tenderDlg").dialog('close', true);
}




//首页删除
function delTender(){
	
	var rows = $("#tenderDataGrid").datagrid('getSelections');
	if(rows.length == 0){
		$.messager.alert('提示','请选择一条记录进行删除!','info');
		return;
	}
	var idArray=[];
	for(var key in rows){
		idArray.push(rows[key].PRE_REGSEQ);
	}
	$.messager.confirm('提示','是否确定删除所要选择的记录？',function(r){
		if(r){
			$.ajax({
				type : 'POST',
				url :'franController.do?delTender&PRE_REGSEGS='+idArray,
				dataType : 'text',
				success : function(data,status,xml){
					$('#tenderDataGrid').datagrid('reload');
					$('#tenderDataGrid').datagrid('uncheckAll');
					$.messager.alert('提示',data + '!','info');
				},
				error : function (XMLHttpRequest,textStatus,errorThrown){
					$.messager.alert('提示', '删除失败!','error');
				}
			});
		}
	});
}





function openrent() {
	
	  var pre_regseq = $("#pre_regseq").val(); if (pre_regseq == "") {
	  $.messager.alert("提示", "请选择预审序号", "info"); return; }
	 
	openCommDialog('人员维护', 'franController.do?getCommPage&page=ren', 400, 500,
			function() {
				openRenSelDlg(function(datas) {
					for ( var key in datas) {
						var name = datas[key].STAFF_NAME;
						var rows = $("#staffDatagrid").datagrid('getRows');
						for ( var i in rows) {
							if (name == rows[i].STAFF_NAME) {
								var rowIndex = $("#staffDatagrid").datagrid(
										"getRowIndex", rows[i]);
								$("#staffDatagrid").datagrid('deleteRow',
										rowIndex);
							}
						}
						var row = datas[key];
						row.i_type = 0;
						row.p_type = 0;
						row.pre_regseq = $("#pre_regseq").val();
						$("#staffDatagrid").datagrid('appendRow', row);
					}
					$('#dlg').dialog('close');
				});
			});
}

function openInst() {
	
	  var pre_regseq = $("#pre_regseq").val(); if (pre_regseq == "") {
	  $.messager.alert("提示", "请选择预审序号", "info"); return; }
	 
	openCommDialog('人员维护', 'franController.do?getCommPage&page=ren', 400, 500,
			function() {
				openInsSelDlg(function(datas) {

					for ( var key in datas) {
						var name = datas[key].STAFF_NAME;

						var rows = $("#conDatagrid").datagrid('getRows');

						for ( var i in rows) {
							if (name == rows[i].STAFF_NAME) {
								var rowIndex = $("#conDatagrid").datagrid(
										"getRowIndex", rows[i]);
								$("#conDatagrid").datagrid('deleteRow',
										rowIndex);

							}
						}

						var row = datas[key];
						row.i_type = 0;
						row.p_type = 1;
						row.pre_regseq = $("#pre_regseq").val();
						$("#conDatagrid").datagrid('appendRow', row);
					}
					$('#dlg').dialog('close');
				});
			});
}

function delrent() {
	var datas = $("#staffDatagrid").datagrid("getSelections");
	if (datas.length == 0) {
		$.messager.alert('提示', '请选择一条记录进行删除', 'info');
	}
	for ( var key in datas) {
		var rowIndex = $("#staffDatagrid").datagrid("getRowIndex", datas[key]);
		$("#staffDatagrid").datagrid('deleteRow', rowIndex);
	}
}

function delInst() {
	var datas = $("#conDatagrid").datagrid("getSelections");
	if (datas.length == 0) {
		$.messager.alert('提示', '请选择一条记录进行删除', 'info');
	}
	for ( var key in datas) {
		var rowIndex = $("#conDatagrid").datagrid("getRowIndex", datas[key]);
		$("#conDatagrid").datagrid('deleteRow', rowIndex);
	}
}
//修改工程投标
function editTender(){
	$("#tenderSelBtn").hide();
	optType = 1;$.ajax({
		type : 'POST',
		url : 'franController.do?loadCmpIntelFiles',
		dataType : 'json',
		success : function(data, status, xml) {
			fillCmpIntelFileTb(data, "cmpIntelFileDg1");
			fillCmpIntelFileTb(data, "cmpIntelFileDg");
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {

		}
	});
	var rows = $('#tenderDataGrid').datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return false;
	}
	if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return false;
	}
	var row = $('#tenderDataGrid').datagrid('getSelected');
	var PRE_REGSEQ = row.PRE_REGSEQ;
	$('#tenderForm').form('load','franController.do?loadTenderById&PRE_REGSEQ='+PRE_REGSEQ);
	tenderDlg.dialog('setTitle','修改');
	tenderDlg.dialog('open');
}

