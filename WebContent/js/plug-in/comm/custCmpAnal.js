var custCmpAnalOptType = -1;
var rowIndex123 = -1;
var count123 = 0;
var pageNum123 = 1;
var editable = true; //是否具有修改权限

function pagerFilter(data){
	if(typeof data.length == 'number' && typeof data.splice == 'function'){
		data = {
				total:data.length,
				rows:data
		};
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage:function(pageNum,pageSize){
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh',{
				pageNumber : pageNum,
				pageSize : pageSize
			});
			dg.datagrid('uncheckAll');
			dg.datagrid('loadData',data);
		},
		onBeforeRefresh:function(){
			dg.datagrid('load');
		}
	});
	if(!data.originalRows){
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber-1)*parseInt(opts.pageSize);
	var end = start+parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start,end));
	return data;
}
$(function(){
	var objId = getUrlParam('objId');
	var initData = [];
	simpleDataGrid = $('#custCmpAnalDataGrid').datagrid({
		data:initData,
		onDblClickRow:function(rowIndex,row){
			if(editable == false){
				return;//无权限，直接返回。
			}
			$('#custCmpAnalInfoPanel').scrollTop(-1);
			custCmpAnalOptType = 1;
			$('#custCmpAnalForm').form('load','custController.do?loadCustCmpAnal&ca_id='+row.ca_id);
			simpleAnnoDataGrid.datagrid({url:'custController.do?searchCustCmpAnno&ca_id='+row.ca_id});
			$('#custCmpAnalInfoTab').tabs('enableTab',1);
			$('#custCmpAnalInfoTab').tabs('enableTab',2);
			$('#custCmpAnalInfoTab').tabs('select',0);
			$('#custCmpAnnoInfoTab').tabs('select',0);
			simpleDialog.dialog('setTitle','修改');
			simpleDialog.dialog('open');
		},
		onLoadSuccess:function(data){
			if(count123==1&&rowIndex123==-1){
				count123=2;
			}
			if(count123==0){
				count123++;
				return null;
			}else if(count123==1){
				count123=2;
				return null;
			}else if(count123==2){
				count123=1;
				if(rowIndex123==-1){
					return null;
				}
				$(this).datagrid('uncheckAll');
				$(this).datagrid('selectRow',rowIndex123);
				rowIndex123=-1;
			}
		},
		onSelect:function(rowIndex,rowData){
			if(pageNum123>$(this).datagrid('getPager').pagination('options').pageNumber&&rowIndex123!=-1){
				$(this).datagrid('getPager').pagination('select',pageNum123);
				$(this).datagrid('checkRow',rowIndex123);
			}
		}
	});
	
	if(objId != null){
		$.ajax({
			//该url返回客户名称、客户公司名称，用于填充搜索中的“客户”、“客户公司”项。
			url:'custController.do?getCustNameAndCustCmpNameByCcId&ccId=' + objId,
			dataType:'text',
			success:function(result){
				result = $.parseJSON(result);
				$('#bca_custName').val(result.ceName);
				$('#bca_custCmpName').val(result.ccName);
//				simpleDataGrid.datagrid({
//					url:'custController.do?searchCustCmpAnalByCc_id&cc_id='+objId,
//					loadFilter:pagerFilter
//				});
			}
		});
	}
		$('#custCmpAnalSearchBtn').bind('click',function(){
			var custName = $('#bca_custName').val();
			var custCmpName = $('#bca_custCmpName').val();
			var custCmpState = $('#bca_custCmpState').combobox('getValue');
			if(typeof custName === 'undefined'){
				custName = '';
			}
			if(typeof custCmpName === 'undefined'){
				custCmpName = '';
			}
			if(typeof custCmpState === 'undefined'){
				custCmpState = '';
			}
			var custCmpAnalUrl = 'custController.do?searchCustCmpAnalInfo';
			simpleDataGrid.datagrid({
				queryParams:{custName:custName,custCmpName:custCmpName,custCmpState:custCmpState},
				url:custCmpAnalUrl,
				loadFilter:pagerFilter
			});
		});
	simpleDialog = $('#custCmpAnalDialog').dialog({
		onBeforeClose:function(){
			var custEnttext = $('#custEnttext').val();
			var custCmptext = $('#custCmptext').val();
			if(custEnttext==''&&custCmptext==''){
				clearPage();
				return true;
			}else{
				$.messager.confirm('提示','是否确定返回至主界面？',function(r){
					if(r){
						clearPage();
						simpleDialog.dialog('close',true);
					}
				});
			}
			return false;
		}
	});
	
	var objId = getUrlParam('objId');
		$('#custCmpBtn').bind('click',function(){
			$.chcrm.openCommDialog('custComp',false,function(val){
				var custEnttext = $('#custEnttext');
				var custEnthidden = $('#custEnthidden');
				var custCmptext = $('#custCmptext');
				var custCmphidden = $('#custCmphidden');
				if(val.length>=1){
					custCmptext.val(val[0].custCompName);
					custCmptext.focus();
					custCmphidden.val(val[0].custCompId);
					var cc_id = val[0].custCompId;
					$.ajax({
						type:'POST',
						url:'contactsController.do?loadCustEntName&cc_id='+cc_id,
						dataType:'json',
						success:function(data){
							custEnthidden.val(data.ce_id);
							custEnttext.val(data.ce_name);
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							
						}
					});
				}else{
					custCmptext.val('');
					custCmptext.focus();
					custCmphidden.val('');
					custEnttext.val('');
					custEnthidden.val('');
				}
			});
		});
	$('#custCmpAnalInfoTab').tabs({
		onSelect:function(title,index){
			var row = $('#custCmpAnnoDataGrid').datagrid('getSelected');
			if(index==1){
				if(row!=null){
					$('#cannex_tb #cc_date').val(row.cc_date);
					$('#cannex_tb #cc_anno').val(row.cc_anno);
					var cc_id = row.cc_id;
					cupdateAnnex(12,cc_id,1);
					var rows = $('#custCmpAnnoDataGrid').datagrid('getSelections');
					if(rows.length>1){
						$('#cannex_tb #cc_date').val('');
						$('#cannex_tb #cc_anno').val('');
						cupdateAnnex('0','-100','-100');
					}
				}else{
					$('#cannex_tb #cc_date').val('');
					$('#cannex_tb #cc_anno').val('');
					cupdateAnnex('','','');
				}
				//var ca_id = $('#custCmpAnalForm #ca_id').val();
				//simpleAnnoDataGrid.datagrid({url:'custController.do?searchCustCmpAnno&ca_id='+ca_id});
			}
			if(index==2){
				updateAnnex(5,$('#custCmpAnalForm #ca_id').val(),1);
			}
		}
	});
});

function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return unescape(r[2]); return null;
}

function clearPage(){
	$('#custCmpAnalForm').form('clear');
	$('#custCmpAnalTab').tabs('select',0);
}

function addCustCmpAnal(){
	$('#custCmpAnalInfoPanel').scrollTop(-1);
	custCmpAnalOptType = 0;
	$('#custCmpAnalForm').form('load','custController.do?loadCustCmpAnalMaxId');
	$('#custCmpAnalInfoTab').tabs('disableTab',1);
	$('#custCmpAnalInfoTab').tabs('disableTab',2);
	$('#custCmpAnalInfoTab').tabs('select',0);
	$('#custCmpAnnoInfoTab').tabs('select',0);
	simpleDialog.dialog('setTitle','新增');
	simpleDialog.dialog('open');
}

function editCustCmpAnal(){
	$('#custCmpAnalInfoPanel').scrollTop(-1);
	custCmpAnalOptType = 1;
	rows = simpleDataGrid.datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return null;
	}else if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return null;
	}
	
	var row = simpleDataGrid.datagrid('getSelected');
	$('#custCmpAnalForm').form('load','custController.do?loadCustCmpAnal&ca_id='+row.ca_id);
	simpleAnnoDataGrid.datagrid({url:'custController.do?searchCustCmpAnno&ca_id='+row.ca_id});
	$('#custCmpAnalInfoTab').tabs('enableTab',1);
	$('#custCmpAnalInfoTab').tabs('enableTab',2);
	$('#custCmpAnalInfoTab').tabs('select',0);
	$('#custCmpAnnoInfoTab').tabs('select',0);
	simpleDialog.dialog('setTitle','修改');
	simpleDialog.dialog('open');
}

function custCmpAnalDlgSave(){
	if(simpleDataGrid.datagrid('options').url==null){
		$('#custCmpAnalSearchBtn').click();
	}
	var cc_id = $('#custCmphidden').val();
	var ca_accInfor = $('#ca_accInfor').combobox('getValue');
	var ca_loanInfo = $('#ca_loanInfo').combobox('getValue');
	var ca_credit = $('#ca_credit').combobox('getValue');
	$('#custCmpAnalForm').form('submit',{
		url:'custController.do?addOrEditCustCmpAnal&custCmpAnalOptType='+custCmpAnalOptType,
		onSubmit:function(){
			var isValid = $(this).form('validate');
			if(isValid){
				$('#custCmpAnalDlgSaveBtn').linkbutton({
					disabled:true
				});
			}
			return isValid;
		},
		success:function(result){
			result = eval('('+result+')');
			if(!result.success){
				$('#custCmpAnalDlgSaveBtn').linkbutton({
					disabled:false
				});
				$.messager.alert('提示',result.msg,'error');
				return null;
			}
			ca_id123 = result.ca_id;
			$('#custCmpAnalDlgSaveBtn').linkbutton({
				disabled:false
			});
			if(custCmpAnalOptType==0){
				$('#custCmpAnalForm #ca_id').val(result.ca_id);
				var ca_id = $('#custCmpAnalForm #ca_id').val();
				simpleAnnoDataGrid.datagrid({url:'custController.do?searchCustCmpAnno&ca_id='+ca_id});
				simpleDialog.dialog('setTitle','修改');
				$('#custCmpAnalInfoTab').tabs('enableTab',1);
				$('#custCmpAnalInfoTab').tabs('enableTab',2);
				$('#custCmpAnalInfoPanel').scrollTop(-1);
				$('#custCmpAnalInfoTab').tabs('select',1);
			}
			$('#custCmpAnalInfoPanel').scrollTop(-1);
			simpleDataGrid.datagrid('reload');
			var queryParams = simpleDataGrid.datagrid('options').queryParams;
			queryParams.cc_id = result.ca_id;
			queryParams.pageSize = simpleDataGrid.datagrid('getPager').pagination('options').pageSize;
			$.ajax({
				type:'POST',
				url:'custController.do?getRowIndexAndPageNum',
				data:queryParams,
				dataType:'json',
				success:function(data,status,xml){
//					alert(data.rowIndex+','+data.pageNum);
					rowIndex123 = data.rowIndex;
					pageNum123 = data.pageNum;
					simpleDataGrid.datagrid('getPager').pagination('select',data.pageNum);
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					
				}
			});
			custCmpAnalOptType = 1;
			$.messager.alert('提示','提交成功！','info');
		}
	});
}

function delCustCmpAnal(){
	var rows = simpleDataGrid.datagrid('getSelections');
	if(rows.length<=0){
		$.messager.alert('提示','请选择要删除的记录！','info');
		return null;
	}
	$.messager.confirm('提示','是否确定要删除记录？',function(r){
		if(r){
			var rows = simpleDataGrid.datagrid('getSelections');
			var idArray = [];
			for(var key in rows){
				idArray.push(rows[key].ca_id);
			}
			$.ajax({
				type:'POST',
				url:'custController.do?delCustCmpAnal&idArray='+idArray,
				dataType:'text',
				success:function(data,status,xml){
					simpleDataGrid.datagrid('reload');
					simpleDataGrid.datagrid('uncheckAll');
					$.messager.alert('提示',data+'!','info');
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					$.messager.alert('提示','删除错误！','error');
				}
			});
		}
	});
}
