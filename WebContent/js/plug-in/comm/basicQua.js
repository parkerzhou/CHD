//定义操作符
var basType = -1;
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


$(function(){
		$("#basicTab").tabs({
		onSelect:function(title,index){
			//选择证书资料，并进行初始化加载数据
			if(title=='证书资料'){
				simpleBasicCerDataGrid = $('#basicCerDataGrid').datagrid({
					url:'basicController.do?loadBasicInfo&D_TYPE=2',
					onDblClickRow:function(rowIndex,rowData){
						basType = 1;
						var CMPQUAL_SEQ = rowData.CMPQUAL_SEQ;
						$('#basicCerForm').form('load','basicController.do?loadBasicById&CMPQUAL_SEQ='+CMPQUAL_SEQ);
						$('#cerSelDlg').dialog('setTitle','修改');
						$('#cerSelDlg').dialog('open',true);
					},
					loadFilter:pagerFilter,
				});
				simpleCerDialog = $('#cerSelDlg').dialog({
					onBeforeClose:function(){
						var CMPQUAL_SEQ = $('#basicCerForm #CMPQUAL_SEQ').val();
						if(CMPQUAL_SEQ!=''){
							$.messager.confirm('提示','是否确定返回主界面？',function(r){
								if(r){
									$('#basicCerForm').form('clear');
									simpleCerDialog.dialog("close",true);
								}
							});
							return false;
						}
					}
				});
			}else if(title == '扣除事项定义'){
				//选择扣除事项定义，并进行初始化加载数据
				simpleBasicExcDataGrid = $('#basicExcDataGrid').datagrid({
					url:'basicController.do?loadBasicInfo&D_TYPE=3',
					onDblClickRow:function(rowIndex,rowData){
						basType = 1;
						var CMPQUAL_SEQ = rowData.CMPQUAL_SEQ;
						$('#basicExcForm').form('load','basicController.do?loadBasicById&CMPQUAL_SEQ='+CMPQUAL_SEQ);
						$('#excSelDlg').dialog('setTitle','修改');
						$('#excSelDlg').dialog('open',true);
					},
					loadFilter:pagerFilter,
				});
				simpleExcDialog = $('#excSelDlg').dialog({
					onBeforeClose:function(){
						var CMPQUAL_SEQ = $('#basicExcForm #CMPQUAL_SEQ').val();
						if(CMPQUAL_SEQ!=''){
							$.messager.confirm('提示','是否确定返回主界面？',function(r){
								if(r){
									$('#basicExcForm').form('clear');
									simpleExcDialog.dialog("close",true);
								}
							});
							return false;
						}
					}
				});
			}   
		}
	
	});

	//选择公司资质资料，并进行初始化加载数据
	simpleBasicQuaDataGrid = $('#basicQuaDataGrid').datagrid({
		url:'basicController.do?loadBasicInfo&D_TYPE=1',
		onDblClickRow:function(rowIndex,rowData){
			/*if(editable == false){
				return ;
			}*/
			basType = 1;
			var CMPQUAL_SEQ = rowData.CMPQUAL_SEQ;
			$('#basicQuaForm').form('load','basicController.do?loadBasicById&CMPQUAL_SEQ='+CMPQUAL_SEQ);
			
			$('#quaSelDlg').dialog('setTitle','修改');
			
			$('#quaSelDlg').dialog('open',true);
		},
		loadFilter:pagerFilter,
	});
		simpleBasicDialog = $('#quaSelDlg').dialog({
			onBeforeClose:function(){
				var CMPQUAL_SEQ = $('#basicQuaForm #CMPQUAL_SEQ').val();
				if(CMPQUAL_SEQ!=''){
					$.messager.confirm('提示','是否确定返回主界面？',function(r){
						if(r){
							$('#basicQuaForm').form('clear');
							simpleBasicDialog.dialog("close",true);
						}
					});
					return false;
				}
				
			}
		});
	});


	
	
	
	
	
	
	
	
//公司资质资料-新增功能
function addBasicQua(){
	basType = 0;
	$("#basicQuaForm").form('clear');
	$("#basicQuaForm input[name='D_TYPE']").val(1);
	simpleBasicDialog.dialog('setTitle','新增');
	simpleBasicDialog.dialog('open',true);
}

//证书资料-新增功能
function addBasicCer(){
	basType = 0;
	$("#basicCerForm").form('clear');
	$("#basicCerForm input[name='D_TYPE']").val(2);
	$("#cerSelDlg").dialog('setTitle','新增');
	$("#cerSelDlg").dialog("open",true);
}

//扣除事项-新增功能
function addBasicExc(){
	basType = 0;
	$("#basicExcForm").form('clear');
	$("#basicExcForm input[name='D_TYPE']").val(3);
	$("#excSelDlg").dialog('setTitle','新增');
	$("#excSelDlg").dialog("open",true);
}


//公司资质资料-新增或修改的提交按钮
function quaSumbit(){
$('#basicQuaForm').form('submit', {    
    url:'basicController.do?addOrEditBasic&basType='+basType,    
    onSubmit: function(){    
    	var isValid = $('#basicQuaForm').form('validate');
		return isValid;
    },    
    success:function(data){
		data = eval('('+data+')');
		if(!data.success){
			$.messager.alert('提示',data.msg,'error');
			return null;
		}	
		simpleBasicDialog.dialog('close',true);
		simpleBasicQuaDataGrid.datagrid('reload');
		$.messager.alert('提示','提交成功！','info');
	}
});
}

//证书资料-新增或修改的提交按钮
function cerSumbit(){
	$('#basicCerForm').form('submit', {    
	    url:'basicController.do?addOrEditBasic&basType='+basType,    
	    onSubmit: function(){    
	    	var isValid = $('#basicCerForm').form('validate');
			return isValid;
	    },    
	    success:function(data){
			data = eval('('+data+')');
			if(!data.success){
				$.messager.alert('提示',data.msg,'error');
				return null;
			}	
			$("#cerSelDlg").dialog('close',true);
			simpleBasicCerDataGrid.datagrid('reload');
			$.messager.alert('提示','提交成功！','info');
		}
	});
}


//扣除事项-新增或修改的提交按钮
function excSumbit(){
	$('#basicExcForm').form('submit', {    
	    url:'basicController.do?addOrEditBasic&basType='+basType,    
	    onSubmit: function(){    
	    	var isValid = $('#basicExcForm').form('validate');
			return isValid;
	    },    
	    success:function(data){
			data = eval('('+data+')');
			if(!data.success){
				$.messager.alert('提示',data.msg,'error');
				return null;
			}	
			$("#excSelDlg").dialog('close',true);
			simpleBasicExcDataGrid.datagrid('reload');
			$.messager.alert('提示','提交成功！','info');
		}
	});
}


//公司资质资料-修改按钮
function editBasicQua(){
	basType = 1;
	var rows = simpleBasicQuaDataGrid.datagrid("getSelections");
	if(rows.length == 0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return ;
	}
	if(rows.length > 1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return ;
	}
	var row = simpleBasicQuaDataGrid.datagrid('getSelected');
	var CMPQUAL_SEQ = row.CMPQUAL_SEQ;
	$("#basicQuaForm").form('load','basicController.do?loadBasicById&CMPQUAL_SEQ='+CMPQUAL_SEQ);
	simpleBasicDialog.dialog("setTitle",'修改');
	simpleBasicDialog.dialog('open');
}


//证书资料-修改按钮
function editBasicCer(){
	basType = 1;
	var rows = simpleBasicCerDataGrid.datagrid("getSelections");
	if(rows.length == 0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return;
	}
	if(rows.length > 1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return;
	}
	var row = simpleBasicCerDataGrid.datagrid('getSelected');
	var CMPQUAL_SEQ = row.CMPQUAL_SEQ;
	$("#basicCerForm").form('load','basicController.do?loadBasicById&CMPQUAL_SEQ='+CMPQUAL_SEQ);
	simpleCerDialog.dialog("setTitle",'修改');
	simpleCerDialog.dialog('open');
}

//扣除事项-修改按钮
function editBasicExc(){
	basType = 1;
	var rows = simpleBasicExcDataGrid.datagrid("getSelections");
	if(rows.length == 0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return;
	}
	if(rows.length > 1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return;
	}
	var row = simpleBasicExcDataGrid.datagrid('getSelected');
	var CMPQUAL_SEQ = row.CMPQUAL_SEQ;
	$("#basicExcForm").form('load','basicController.do?loadBasicById&CMPQUAL_SEQ='+CMPQUAL_SEQ);
	simpleExcDialog.dialog("setTitle",'修改');
	simpleExcDialog.dialog('open');
}



//公司资质资料-删除按钮
function delBasicQua(){
	var idArray=[];
	var rows = simpleBasicQuaDataGrid.datagrid('getSelections');
	if(rows.length == 0){
		$.messager.alert('提示','请选择要删除的数据！','info');
		return;
	}
		for(var key in rows){
			idArray.push(rows[key].CMPQUAL_SEQ);
		}
		$.messager.confirm('提示','是否确定删除所选择的记录！',function(r){
			if(r){
				$.ajax({
					type:"post",
					url:'basicController.do?delBasic&cmpqual_seqs='+idArray,
					dataType:'text',
					success:function (data,status,xml){
						simpleBasicQuaDataGrid.datagrid('reload');
						simpleBasicQuaDataGrid.datagrid('uncheckAll');
						$.messager.alert('提示',data+'!','info');
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){}
				});
			}
		});
}

//证书资料-删除按钮
function delBasicCer(){
	var idArray=[];
	var rows = simpleBasicCerDataGrid.datagrid('getSelections');
	if(rows.length == 0){
		$.messager.alert('提示','请选择要删除的数据！','info');
		return;
	}
	
		for(var key in rows){
			idArray.push(rows[key].CMPQUAL_SEQ);
		}
		$.messager.confirm('提示','是否确定删除所选择的记录！',function(r){
			if(r){
				$.ajax({
					type:"post",
					url:'basicController.do?delBasic&cmpqual_seqs='+idArray,
					dataType:'text',
					success:function (data,status,xml){
						simpleBasicCerDataGrid.datagrid('reload');
						simpleBasicCerDataGrid.datagrid('uncheckAll');
						$.messager.alert('提示',data+'!','info');
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){}
				});
			}
		});
}


//扣除事项-删除按钮
function delBasicExc(){
	var idArray=[];
	var rows = simpleBasicExcDataGrid.datagrid('getSelections');
	if(rows.length == 0){
		$.messager.alert('提示','请选择要删除的数据！','info');
		return;
	}
	
		for(var key in rows){
			idArray.push(rows[key].CMPQUAL_SEQ);
		}
		$.messager.confirm('提示','是否确定删除所选择的记录！',function(r){
			if(r){
				$.ajax({
					type:"post",
					url:'basicController.do?delBasic&cmpqual_seqs='+idArray,
					dataType:'text',
					success:function (data,status,xml){
						simpleBasicExcDataGrid.datagrid('reload');
						simpleBasicExcDataGrid.datagrid('uncheckAll');
						$.messager.alert('提示',data+'!','info');
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){}
				});
			}
		});
}
 
//公司资质资料 新增或修改的关闭按钮
function cancelQua(){
	var CMPQUAL_SEQ = $("#CMPQUAL_SEQ").val();
	if(CMPQUAL_SEQ.length==0){
		simpleBasicDialog.dialog('close',true);
	}
	$("#basicQuaForm").form('clear');
	simpleBasicDialog.dialog('close',true);
}

//证书资料 新增或修改的关闭按钮
function cancelCer(){
	var CMPQUAL_SEQ = $("#CMPQUAL_SEQ").val();
	if(CMPQUAL_SEQ.length==0){
		simpleCerDialog.dialog('close',true);
	}
	$("basicCerForm").form('clean');
	simpleCerDialog.dialog('close',true);
}

//扣除事项 新增或修改的关闭按钮
function cancelExc(){
	var CMPQUAL_SEQ = $("#CMPQUAL_SEQ").val();
	if(CMPQUAL_SEQ.length==0){
		simpleExcDialog.dialog('close',true);
	}
	$("basicExcForm").form('clean');
	simpleExcDialog.dialog('close',true);
}

