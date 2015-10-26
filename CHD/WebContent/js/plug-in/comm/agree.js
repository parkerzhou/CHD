//拜访管理信息操作位（0为新增，1为修改）



var optType = -1;
//数据过滤器
function pagerFilter(data){
	if (typeof data.length == 'number' && typeof data.splice == 'function'){
		data = {
			total: data.length,
			rows: data
		};
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage:function(pageNum, pageSize){
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh',{
				pageNumber:pageNum,
				pageSize:pageSize
			});
			dg.datagrid('uncheckAll');
			dg.datagrid('loadData',data);
		},
		onBeforeRefresh:function(){
			dg.datagrid('load');
		}
	});
	if (!data.originalRows){
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}
$.extend($.fn.validatebox.defaults.rules,{
	checkLength:{
		validator:function(value,param){
			var length = 0;
			for (var i = 0; i < value.length; i++) {
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
		message:'您输入的内容过长，请简要概述！'
	},
	 mone:{
         validator: function (value, param) {
          	return (/^(([1-9]\d*)|\d)(\.\d{1,2})?$/).test(value);
          },
          message:'请输入整数或小数'
       }
});
$(function(){
	simpleAgreeDataGrid = $('#agreeDataGrid').datagrid({
		url:'franController.do?loadAgree',
		onDblClickRow:function(rowIndex,rowData){
			if(editable == false){
				return ;
			}
			optType = 1;
			var AGREE_SEQ = rowData.AGREE_SEQ;
			$('#agreeForm').form('load','franController.do?loadAgreeById&AGREE_SEQ='+AGREE_SEQ);
			$('#agreeDlg').dialog('setTitle','修改');
			$('#agreeDlg').dialog('open');
		},
		loadFilter:pagerFilter
	});
	$("#agreeForm").form({
		onLoadSuccess:function(data){
			$("#proj_id").val(data.proj_id);
			$("#proj_name").val(data.proj_name);
			$("#proj_sname").val(data.proj_sname);
			$("#cmp_sname").val(data.cmp_sname);
			$("#work_sdate").val(data.work_sdate);
			$("#work_edate").val(data.work_edate);


			var CONTRACT_PRICE=$('#CONTRACT_PRICE').val();
			var MDEDUCT_RATIO=$('#MDEDUCT_RATIO').val();
			var TAX_RATIO=$('#TAX_RATIO').val();
			var OTH_RATIO=$('#OTH_RATIO').val();
			var BAIL_RATIO=$('#BAIL_RATIO').val();
			$('#MDEDUCT').val(CONTRACT_PRICE*MDEDUCT_RATIO*0.01);
			$('#TAX').val(CONTRACT_PRICE*TAX_RATIO*0.01);
			$('#OTH').val(CONTRACT_PRICE*OTH_RATIO*0.01);
			$('#BAIL').val(CONTRACT_PRICE*BAIL_RATIO*0.01);
			var total=CONTRACT_PRICE*MDEDUCT_RATIO*0.01+CONTRACT_PRICE*TAX_RATIO*0.01+CONTRACT_PRICE*OTH_RATIO*0.01
			$('#total').val(total);
		},
	});
	simpleAgreeDialog = $('#agreeDlg').dialog({
		onBeforeClose:function(){
			var PROJ_NO = $('#agreeForm #PROJ_NO').val();
			if(PROJ_NO!=''){
				//如果主要拜访人信息不为空，则提示信息，如果确定关闭对话框，则清空表单数据，选中拜访管理信息面板，并刷新拜访管理基本信息表格数据
				$.messager.confirm('提示','是否确定返回主界面？',function(r){
					if(r){
						$('#agreeForm').form('clear');
						simpleAgreeDialog.dialog('close',true);
					}
				});
				return false;
			}
		}
	});
});
function addAgree(){

	$('#agreeForm').form('clear');
	$('#MDEDUCT_RATIO').numberbox('setValue',3.5);
	$('#TAX_RATIO').numberbox('setValue',3.47);
	$('#OTH_RATIO').numberbox('setValue',0);
	$('#BAIL_RATIO').numberbox('setValue',5);
	
	$('#MDEDUCT_RATIO').focus();
	$('#TAX_RATIO').focus();
	$('#OTH_RATIO').focus();
	$('#BAIL_RATIO').focus();
	
	$('#QUALITY_GRADE').attr('checked','checked');
	optType = 0;
	//simpleAgreeDialog = $('#agreeDlg').dialog();
	simpleAgreeDialog.dialog('setTitle','新增');
	simpleAgreeDialog.dialog('open');
}
function agreeDlgSave(){
	$('#agreeForm').form('submit',{
		url:'franController.do?saveOrUpdateAgreeInfo&optType='+optType,
		onSubmit:function(){
				var isValid = $('#agreeForm').form('validate');
				return isValid;
		},
		success:function(data){
			data = eval('('+data+')');
			if(!data.success){
				$.messager.alert('提示',data.msg,'error');
				return null;
			}
			
			simpleAgreeDialog.dialog('close',true);
			simpleAgreeDataGrid.datagrid('reload');
			$.messager.alert('提示','提交成功！','info');
		}
	});
}
function openAgreeProjSel(){
	
	openCommDialog('工程资料选择','franController.do?getCommPage&page=projSel',1000,480,function(){
		openAgreesSelDlg(function(data){
			$("#agreeForm input[name='PROJ_NO']").val(data.proj_no);
			$("#agreeForm input[name='FRANS_ID']").val(data.frans_id);
			$("#agreeForm input[id='proj_id']").val(data.proj_id);
			$("#agreeForm input[id='proj_name']").val(data.proj_name);
			$("#agreeForm input[id='work_sdate']").val(data.work_sdate);
			$("#agreeForm input[id='work_edate']").val(data.work_edate);
			$("#agreeForm input[id='cmp_sname']").val(data.cmp_sname);
			$("#agreeForm input[id='proj_sname']").val(data.proj_sname);
			$("#dlg").dialog("close",true);
		});
	});
	
}
function editAgree(){
	optType = 1;
	var rows = simpleAgreeDataGrid.datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return false;
	}
	if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return false;
	}
	var row = simpleAgreeDataGrid.datagrid('getSelected');
	var AGREE_SEQ = row.AGREE_SEQ;
	$('#agreeForm').form('load','franController.do?loadAgreeById&AGREE_SEQ='+AGREE_SEQ);
	simpleAgreeDialog.dialog('setTitle','修改');
	simpleAgreeDialog.dialog('open');
}
function delAgree(){
	var rows = simpleAgreeDataGrid.datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要删除的记录！','info');
		return false;
	}
	//如果选中1条或1条以上拜访管理基本信息，则提醒用户是否确定删除信息
	if(rows.length>=1){
		//创建并构造拜访管理信息主键cv_id数组
		var idArray = [];
		for(var key in rows){
			idArray.push(rows[key].AGREE_SEQ);
		}
		//弹出删除操作选择对话框，如果确定删除拜访管理信息，则提交cv_id数组到后台进行删除操作
		$.messager.confirm('提示','是否确定删除所选择的记录？',function(r){
			if(r){
				$.ajax({
					type:'POST',
					url:'franController.do?delAgree&AGREE_SEQ='+idArray,
					dataType:'text',
					//将后台执行删除操作的结果反馈给用户
					success:function(data,status,xml){
						simpleAgreeDataGrid.datagrid('reload');
						simpleAgreeDataGrid.datagrid('uncheckAll');
						$.messager.alert('提示',data+'！','info');
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){
						
					}
				});
			}
		});
	}
}

