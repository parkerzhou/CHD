var contributionOptType = -1;// 操作类型 0表示新增 1表示修改,默认值为-1
var editable = true; //是否具有修改权限
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
	var initData = [];
	// 创建并初始化贡献业绩datagrid对象
	$('#contributionDataGrid').datagrid(
			{
				// url : 'custController.do?getContribution',
				columns : [ [ {
					field : 'ck',
					checkbox : true
				}, {
					field : 'contributionId',
					title : 'ID',
					hidden : true
				}, {
					field : 'custCmp',
					title : '客户公司信息',
					width : 320
				}, {
					field : 'year',
					title : '年度',
					width : 60
				}, {
					field : 'contRatio',
					title : '营业额贡献占比(%)',
					width : 110
				}, {
					field : 'turnover',
					title : '营业额(万元)',
					width : 100
				}, {
					field : 'profit',
					title : '利润(万元)',
					width : 80
				}, {
					field : 'newShop',
					title : '新开店数量',
					width : 80
				}, {
					field : 'reform',
					title : '改造店数量',
					width : 100
				} ] ],
				rownumbers : true,
				checkOnSelect : true,
				selectOnCheck : true,
				singleSelect : false,
				method : 'get',
				toolbar : '#contributionTools',
				autoRowHeight : false,
				pagination : true,
				pageSize : 10,
				pageList:[10,15,20,30,50,100],
				fit : true,
				fitColumns : true,
				data : initData,
				onDblClickRow : function(rowIndex, row) {
					if(editable == false){
						return;//无权限，直接返回。
					}
					contributionOptType = 1;
					// console.info(row);
					//$('#contributionId').val(row.contributionId);
					registerContributionTabsEven();
					$('#contributionForm').form(
							'load',
							'custController.do?loadContribution&contributionId='
									+ row.contributionId + '&custCmpId='
									+ row.custCmpId);
					$('#contributionTabs').tabs('enableTab', 1);
					$('#contributionTabs').tabs('select', 0);
					simplecontributionDialog.dialog('setTitle', '对我司贡献业绩');
					simplecontributionDialog.dialog('open');
				}
			});

	// 拦截对话关闭事件
	simplecontributionDialog = $('#contributionDialog').dialog({
		onBeforeClose : function() {
			var cust = $('#cust').val();
			var custCmp = $('#custCmp').val();
			if ((cust == '' && custCmp == '')) {
				clearPage();
				return true;
			} else {
				$.messager.confirm('提示', '是否确定返回至主界面?', function(r) {
					if (r) {
						clearPage();
						simplecontributionDialog.dialog('close', true);
					}
				});
			}
			return false;
		}
	});

	/*
	 * //客户选择按钮 $('#totalCust').click(function() {
	 * $.chcrm.openCommDialog('cust',false,function(val){ var
	 * custName=$('#cust'); var custId=$('#custId'); var cust if(val.length>=1){
	 * custName.val(val[0].custName); custName.focus();
	 * custId.val(val[0].custId); }else{ custName.val(''); custName.focus();
	 * custId.val(''); } }); });
	 */

	// 客户公司选择按钮
	$('#totalCustCmp').click(function() {
		$.chcrm.openCommDialog('custComp', false, function(val) {
			// console.info(val[0].custName);
			var custCmpName = $('#custCmp');
			var custCmpId = $('#custCmpId');
			var custName = $('#cust');
			var custId = $('#custId');
			if (val.length >= 1) {
				custCmpName.val(val[0].custCompName);
				custName.val(val[0].custName);
				custCmpName.focus();
				custCmpId.val(val[0].custCompId);
				custId.val(val[0].custId);
			} else {
				custCmpName.val('');
				custName.val('');
				custCmpName.focus();
				custCmpId.val('');
				custId.val('');
			}
		});
	});
});


// 贡献业绩查询按钮单击事件
function searchContribution() {
		var cust = $('#sCust').val();// 客户
		var custCmp = $('#sCustCmp').val();// 客户公司
		var custCmpState = $('#sCustCmpState').combobox(
				'getValue');// 客户公司状态
		if (typeof cust === 'undefined') {
			cust = '';
		}
		if (typeof custCmp === 'undefined') {
			custCmp = '';
		}
		if (typeof custCmpState === 'undefined') {
			custCmpState = '';
		}
		var contributionUrl = 'custController.do?searchContribution';
		/*simpleDataGrid.datagrid({
			url : contributionUrl,
			loadFilter : pagerFilter
		});*/
		$.ajax({
			url:contributionUrl,
			type:'POST',
			dataType:'JSON',
			data:{cust:cust,custCmp:custCmp,custCmpState:custCmpState},
			success:function(result){
				$('#contributionDataGrid').datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
}

function clearPage() {
	// 使用tab面板回到第一个面板
	$('#contributionTabs').tabs('select', 0);

	// 清除表单的数据
	$('#contributionForm').form('clear');
}

// 新增
function addContribution() {
	contributionOptType = 0;
	var myDate = new Date();
	$('#year').numberspinner('setValue',myDate.getFullYear());
	$('#year').focus();
	// $('#contributionForm').form('load','custController.do?loadContributionMaxId');
	$('#contributionTabs').tabs('disableTab', 1);
	registerContributionTabsEven();
	simplecontributionDialog.dialog('setTitle', '对我司贡献业绩');
	simplecontributionDialog.dialog('open');
}

// 表单提交
function contributionDialogSave() {
	$('#contributionForm').form(
			'submit',
			{
				url : 'custController.do?addorEditContribution&cbOptType='
						+ contributionOptType + '&isHaveId=' + $('#contributionId').val(),
				onSubmit : function() {
					var isValid = $(this).form('validate');
					return isValid; // 返回false将停止form提交
				},
				success : function(data) {
					if(contributionOptType==0){
						$.ajax({
							 url : 'custController.do?loadMaxCBId',
							 async : false,
							 type : 'get',
							 success : function(msg) {
								 //console.info('msg='+msg);
								 $('#contributionId').val(msg);
							 }
						 });
						//console.info($('#contYearPlanId').val());
					}
					//console.info($('#contributionId').val());
					searchContribution();
					var temp = data.split("!");
					if (temp[1].length == 6) {
						$.messager.alert('提示', temp[0] + "!", 'error');
					} else if (temp[1].length == 5) {
						$.messager.alert('提示', temp[0] + "!", 'info');
						if (contributionOptType == 0) {
							$('#contributionTabs').tabs('enableTab', 1);
							$('#contributionTabs').tabs('select', 1);
						}
						contributionOptType = 1;
					}
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$.messager.alert('提示', '提交失败!', 'error');
				}
			});
}

// 修改事件
function editContribution() {
	contributionOptType = 1;
	var rows = $('#contributionDataGrid').datagrid('getSelections');
	if (rows.length <= 0) {
		$.messager.alert('提示', '请选择要修改的记录!', 'info');
		return null;
	}

	if (rows.length > 1) {
		$.messager.alert('提示', '请选择一条记录进行修改!', 'info');
		return null;
	}
	registerContributionTabsEven();

	var row = $('#contributionDataGrid').datagrid('getSelected');
	$('#contributionForm').form(
			'load',
			'custController.do?loadContribution&contributionId='
					+ row.contributionId);
	$('#contributionTabs').tabs('enableTab', 1);
	$('#contributionTabs').tabs('select', 0);
	simplecontributionDialog.dialog('setTitle', '对我司贡献业绩');
	simplecontributionDialog.dialog('open');
}

// 删除
function delContribution() {
	var rows = $('#contributionDataGrid').datagrid('getSelections');
	// console.info(rows);
	if (rows.length <= 0) {
		$.messager.alert('提示', '请选择要删除的记录!', 'info');
		return null;
	}

	$.messager.confirm('提示', '是否确定删除所选择的记录?', function(r) {
		if (r) {
			var rows = $('#contributionDataGrid').datagrid('getSelections');
			var idArray = [];
			for ( var key in rows) {
				idArray.push(rows[key].contributionId);
			}

			$.ajax({
				type : 'POST',
				url : 'custController.do?delContribution&idArray=' + idArray,
				dataType : 'text',
				success : function(data, status, xml) {
					$('#contributionDataGrid').datagrid('unselectAll');
					searchContribution();
					$.messager.alert('提示', data + '!', 'info');
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$.messager.alert('提示', '删除错误!', 'info');
				}
			});
		}
	});
}

var contributionTabsEven_First = false;
function registerContributionTabsEven() {
	if (!contributionTabsEven_First) {
		$('#contributionTabs').tabs({
			onSelect : function(title, index) {
				if (index == 1) {
					//console.info($('#contributionId').val());
					updateAnnex(6, $('#contributionId').val(), 1);// 调用附件
				}
			}
		});
	}
}
