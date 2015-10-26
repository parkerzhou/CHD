var optType = -1;// 操作类型 0表示新增 1表示修改,默认值为-1
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

//新增按钮
function cvpAdd(){
	optType = 0;
	$('#custVisiPlanDialog').dialog('open');
	$('#cvpTab').tabs('disableTab', 1);
	//$('#custVisiPlanForm').form('load', 'url')
}

//修改按钮
function cvpEdit(){
	optType = 1;
	var rows = $('#cvp_dg').datagrid('getSelections');
	if (rows.length <= 0) {
		$.messager.alert('提示', '请选择要修改的记录!', 'info');
		return null;
	}

	if (rows.length > 1) {
		$.messager.alert('提示', '请选择一条记录进行修改!', 'info');
		return null;
	}

	var row = $('#cvp_dg').datagrid('getSelected');
	$('#custVisiPlanForm').form('load',
			'visiController.do?loadCpConfCont&cpId=' + row.cpId);

	
	$('#custVisiPlanDialog').dialog('open');
	$('#cvpTab').tabs('enableTab', 1);
}

//删除按钮
function cvpDel(){
	var rows = $('#cvp_dg').datagrid('getSelections');
	if (rows.length <= 0) {
		$.messager.alert('提示', '请选择要删除的记录!', 'info');
		return null;
	}
	$.messager.confirm('提示', '是否确定删除所选择的记录?', function(r) {
		if (r) {
			var rows = $('#cvp_dg').datagrid('getSelections');
			var idArray = [];
			for ( var key in rows) {
				idArray.push(rows[key].cpId);
			}
			$.ajax({
				type : 'POST',
				url : 'visiController.do?deleteConfPlan&idArray=' + idArray,
				dataType : 'text',
				success : function(data, status, xml) {
					searchCpConfCont();
					$.messager.alert('提示', data + '!', 'info');
					$('#cvp_dg').datagrid('unselectAll');
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$.messager.alert('提示', '删除错误!', 'info');
				}
			});
		}
	});
}

//查询按钮
function searchCpConfCont(){
	var sVisiCmp = $('#sVisiCmp').val();
	var sBegin = $('#sBegin').datebox('getValue');
	var sEnd = $('#sEnd').datebox('getValue');
	var sVisiPlanCont = $('#sVisiPlanCont').val();
	if(typeof sVisiCmp === 'undefined'){
		sVisiCmp = '';
	}
	if(typeof sBegin === 'undefined'){
		sBegin = '';
	}
	if(typeof sEnd === 'undefined'){
		sEnd = '';
	}
	if(typeof sVisiPlanCont === 'undefined'){
		sVisiPlanCont = '';
	}
	/*url = 'visiController.do?searchCpConfCont&sVisiCmp=' + sVisiCmp + 
	'&sVisiPlanCont=' + sVisiPlanCont + '&sBegin=' + sBegin + '&sEnd=' + sEnd;
	$('#cvp_dg').datagrid({
		url : url,
		loadFilter : pagerFilter
	});*/
	var url = 'visiController.do?searchCpConfCont';
	$.ajax({
		url:url,
		type:'POST',
		dataType:'JSON',
		data:{sVisiCmp:sVisiCmp, sVisiPlanCont:sVisiPlanCont, sBegin:sBegin, sEnd:sEnd},
		success:function(result){
			$('#cvp_dg').datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
		}
	});
}

//选择拜访记录标题按钮
function openVisiCommDialog(){
	$.chcrm.openCommDialog('visit', false, function(val) {
		if(val.length>0){
			//	console.info(val);
				var cv_id=$('#cvId');
				var cv_title=$('#cvTitle');
				var custCmp=$('#ccName');
				var ct_name=$('#ctName');
				cv_id.val(val[0].id);
				cv_title.val(val[0].visitTitle);
				cv_title.focus();
				$.ajax({
					type:'post',
					url:'visiController.do?loadCustCmpAndContact&cv_id='+cv_id.val(),
					dataType:'text'	,
					success:function(result){	
						result = eval('('+result+')');
						custCmp.val(result.cb_custCmp);
						ct_name.val(result.cb_contact);
					}
				});
			}else{
				cv_id.val('');
				cv_title.val('');
				custCmp.val('');
				ct_name.val('');
			}
	});
}

//提交按钮
function cvpSave(){
	if (optType == 0) {
		$.ajax({
			type : 'POST',
			url : 'visiController.do?getMaxCpId',
			dataType : 'text',
			async : false,
			success : function(data, status, xml) {
				$('#cpId').val(parseInt(data) + 1);
			}
		});
	}

	$('#custVisiPlanForm').form(
			'submit',
			{
				url : 'visiController.do?addOrEditCpConfCont&optType=' + optType,
				onSubmit : function() {
					var isValid = $(this).form('validate');
					return isValid; // 返回false将停止form提交
				},
				success : function(data) {
					data = data.toString();
					if(data == '提交成功！'){
						$.messager.alert('提示', data, 'info');
						if (optType == 0) {
							$('#cvpTab').tabs('enableTab', 1);
							$('#cvpTab').tabs('select', 1);
							$('#custVisiPlanDialog').dialog('setTitle', '修改');
							optType = 1;
						}
						searchCpConfCont();
					}else if(data == '提交失败！'){
						$.messager.alert('提示', data, 'error');
					}else{
						$.messager.alert('提示', data, 'info');
					}
				}
			});
}

function clearPage(){
	$('#custVisiPlanForm').form('clear');
	$('#cvpTab').tabs('select', 0);
	
}

$(function(){
	
	//绑定主表格的双击事件
	$('#cvp_dg').datagrid({
		onDblClickRow:function(rowIndex, row){
			if(editable == false){
				return;//无权限，直接返回。
			}
			optType = 1;
			$('#custVisiPlanForm').form('load',
					'visiController.do?loadCpConfCont&cpId=' + row.cpId);
			$('#custVisiPlanDialog').dialog('open');
		}
	});
	
	//绑定窗口关闭事件
	$('#custVisiPlanDialog').dialog({
		onBeforeClose : function() {
			$.messager.confirm('提示', '是否确定返回至主界面?', function(r) {
				if (r) {
					//清除表单，关闭窗口，重新加载主表格
					clearPage();
					$('#custVisiPlanDialog').dialog('close', true);
				}
			});
			return false;
		}
	});
	
	//绑定窗体中Tab的点击事件。
	$('#cvpTab').tabs({
		onSelect : function(title, index) {
			if (index == 1) {
				var cpId = $('#cpId').val();
				if (cpId != null && cpId != '') {
					updateAnnex(17, cpId, 1);
				}
			}
		}
	});
});