var custVisiPlobOptType = -1;
var rowIndex123 = -1;
var count123 = 0;
var pageNum123 = 1;
var idArray123 = [];
var editable = true; //是否具有修改权限
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
$(function(){
	$('#custVisiPlobTab #cb_procState').val('');
	$('#custVisiPlobTab #cb_state').val('');
	var objId = getUrlParam('objId');
	if(objId != null){
		$.ajax({
			url:'visiController.do?getCustCmpByCvId&cv_id=' + objId,
			dataType:'text',
			success:function(result){
				$('#cb_custCmpName').val(result);
//				simpleDataGrid.datagrid({
//					url:'visiController.do?searchCustVisiPlobByCv_id&cv_id='+objId,
//					loadFilter:pagerFilter
//				});
			}
		});
	}
	var initData = [];
	simpleDataGrid = $('#custVisiPlobDataGrid').datagrid({
		data:initData,
		onDblClickRow:function(rowIndex, rowData){
			if(editable == false){
				return;//无权限，直接返回。
			}
			custVisiPlobOptType = 1;
			var cb_id = rowData.cb_id;
			$('#custVisiPlobForm').form('clear');
			var seq = rowIndex+1;
			$('#custVisiPlobForm').form('load','visiController.do?loadCustVisiPlobInfo&cb_id='+cb_id+'&seq='+seq);
			$('#custVisiPlobInfoTab').tabs('enableTab',1);
			$('#custVisiPlobInfoTab').tabs('select',0);
			simpleCbDialog.dialog('setTitle','修改');
			simpleCbDialog.dialog('open');
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
//				alert(rowIndex123);
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
	$('#custVisiPlobSearchBtn').bind('click',function(){
		var cb_custCmpName = $('#custVisiPlobTab #cb_custCmpName').val();
		var cb_plob = $('#custVisiPlobTab #cb_plob').val();
		var cv_CreaDate = $('#custVisiPlobTab #cv_CreaDate').datebox('getValue');
		var cv_EndDate = $('#custVisiPlobTab #cv_EndDate').datebox('getValue');
		var cb_procState = $('#custVisiPlobTab #cb_procState').combobox('getValue');
		var cb_state = $('#custVisiPlobTab #cb_state').combobox('getValue');
		if(cb_custCmpName==='undefined'){
			cb_custCmpName = '';
		}
		if(cb_plob===undefined){
			cb_plob = '';
		}
		if(cv_CreaDate===undefined){
			cv_CreaDate = '';
		}
		if(cv_EndDate===undefined){
			cv_EndDate = '';
		}
		if(cb_procState===undefined){
			cb_procState = '';
		}
		if(cb_state===undefined){
			cb_state = '';
		}
		var custVisiPlobUrl = 'visiController.do?searchCustVisiPlob';
		simpleDataGrid.datagrid({
			queryParams:{cb_custCmpName:cb_custCmpName,cb_plob:cb_plob,cv_CreaDate:cv_CreaDate,cv_EndDate:cv_EndDate,cb_procState:cb_procState,cb_state:cb_state},
			url:custVisiPlobUrl,
			loadFilter:pagerFilter
		});
	});
	simpleCbDialog = $('#custVisiPlobDialog').dialog({
		onBeforeClose:function(){
			var cv_title = $('#custVisiPlobForm #cv_title').val();
			if(cv_title!=''){
				$.messager.confirm('提示','是否返回主界面？',function(r){
					if(r){
						$('#custVisiPlobDialog').dialog('close',true);
					}
				});
				return false;
			}
		}
	});
	$('#custVisiPlobForm #cb_procState').combobox({
		onSelect:function(record){
			if(record.id=='1'||record.id=='2'){
				if($('#custVisiPlobForm #cb_state').combobox('getValue')!=''){
					$('#custVisiPlobForm #cb_state').combobox('select','2');
				}
			}
		}
	});
	$('#custVisiPlobForm #cb_state').combobox({
		onSelect:function(record){
			if(record.id=='1'){
				if($('#custVisiPlobForm #cb_procState').combobox('getValue')=='1'||$('#custVisiPlobForm #cb_procState').combobox('getValue')=='2'){
					$(this).combobox('select','2');
					return null;
				}
				var myDate = new Date();
				var myDateStr = myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate();
				$('#custVisiPlobForm #cb_EndDate').datebox({
					disabled:false,
					value:myDateStr
				});
			}else{
				$('#custVisiPlobForm #cb_EndDate').datebox({
					disabled:true,
					value:''
				});
			}
		}
	});
	$('#custVisiPlobForm').form({
		onLoadSuccess:function(data){
			var cb_state = data.cb_state;
			if(cb_state==1){
				$('#custVisiPlobForm #cb_EndDate').datebox({
					disabled:false
				});
				$('#custVisiPlobForm #cb_EndDate').datebox('setValue',data.cb_EndDate);
			}else{
				$('#custVisiPlobForm #cb_EndDate').datebox({
					disabled:true
				});
			}
		}
	});
	$('#custVisiPlobInfoTab').tabs({
		onSelect:function(title,index){
			if(index==1){
				var cb_id = $('#custVisiPlobForm #cb_id').val();
				updateAnnex(19,cb_id,1);
			}
		}
	});
});
function getUrlParam(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return unescape(r[2]); return null;
}
function addCustVisiPlob(){
	custVisiPlobOptType = 0;
	$('#custVisiPlobForm').form('clear');
	$('#custVisiPlobForm #cb_seqtext').val(simpleDataGrid.datagrid('getData').total+1);
	$('#custVisiPlobInfoTab').tabs('enableTab',0);
	$('#custVisiPlobForm #cb_EndDate').datebox({
		disabled:true,
		value:''
	});
	$('#custVisiPlobInfoTab').tabs('disableTab',1);
	$('#custVisiPlobInfoTab').tabs('select',0);
	simpleCbDialog.dialog('setTitle','新增');
	simpleCbDialog.dialog('open');
}

function editCustVisiPlob(){
	custVisiPlobOptType = 1;
	var rows = simpleDataGrid.datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return null;
	}
	if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return null;
	}
	var row = simpleDataGrid.datagrid('getSelected');
	var cb_id = row.cb_id;
	$('#custVisiPlobForm').form('clear');
	var seq = simpleDataGrid.datagrid('getRowIndex',row)+1;
	$('#custVisiPlobForm').form('load','visiController.do?loadCustVisiPlobInfo&cb_id='+cb_id+'&seq='+seq);
	$('#custVisiPlobInfoTab').tabs('enableTab',1);
	$('#custVisiPlobInfoTab').tabs('select',0);
	simpleCbDialog.dialog('setTitle','修改');
	simpleCbDialog.dialog('open');
}

function delCustVisiPlob(){
	var rows = simpleDataGrid.datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要删除的记录！','info');
		return null;
	}
	$.messager.confirm('提示','是否确定删除所选择的记录？',function(r){
		if(r){
			var idArray = [];
			for(var Key in rows){
				idArray.push(rows[Key].cb_id);
			}
			$.ajax({
				type:'POST',
				url:'visiController.do?delCustVisiPlob&idArray='+idArray,
				dataType:'text',
				success:function(data,status,xml){
					simpleDataGrid.datagrid('reload');
					simpleDataGrid.datagrid('uncheckAll');
					$.messager.alert('提示',data+'!','info');
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.alert('提示','删除错误!','info');
				}
			});
		}
	});
}

function custVisiPlobSave(){
	if(simpleDataGrid.datagrid('options').url==null){
		$('#custVisiPlobSearchBtn').click();
	}
	$('#custVisiPlobForm').form('submit',{
		url:'visiController.do?addOrEditCustVisiPlob&custVisiPlobOptType='+custVisiPlobOptType,
		onSubmit:function(){
			var isValid = $(this).form('validate');
			return isValid;
		},
		success:function(result){
			result = eval('('+result+')');
			if(custVisiPlobOptType==0){
				$('#custVisiPlobForm #cb_id').val(result.cb_id);
				$('#custVisiPlobForm #cb_seq').val(result.cb_seq);
				var cb_id = $('#custVisiPlobForm #cb_id').val();
				$('#custVisiPlobInfoTab').tabs('enableTab',1);
				$('#custVisiPlobInfoTab').tabs('select',1);
				simpleCbDialog.dialog('setTitle','修改');
			}
			custVisiPlobOptType = 1;
			simpleDataGrid.datagrid('reload');
			
			var queryParams = simpleDataGrid.datagrid('options').queryParams;
			queryParams.cp_id = result.cb_id;
			queryParams.pageSize = simpleDataGrid.datagrid('getPager').pagination('options').pageSize;
			$.ajax({
				type:'POST',
				url:'visiController.do?getRowIndexAndPageNum',
				data:queryParams,
				dataType:'json',
				success:function(data,status,xml){
					rowIndex123 = data.rowIndex;
					pageNum123 = data.pageNum;
					simpleDataGrid.datagrid('getPager').pagination('select',data.pageNum);
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					
				}
			});
			
			$.messager.alert('提示','提交成功！','info');
		}
	});
}

function openVisiCommDialog(){
	$('#custVisiPlobForm #cv_title').focus();
	$('#custVisiPlobForm #cb_custCmp').focus();
	
	$.chcrm.openCommDialog('visit',false,function(val){
		if(val.length>=1){
			var cv_id = val[0].id;
			var cv_title = val[0].visitTitle;
			$('#custVisiPlobForm #cv_id').val(cv_id);
			$('#custVisiPlobForm #cv_title').val(cv_title);
			$('#custVisiPlobForm #cv_title').focus();
			$.ajax({
				type:'POST',
				url:'visiController.do?loadCustCmpAndContact&cv_id='+cv_id,
				dataType:'text',
				success:function(result){	
					result = eval('('+result+')');
					$('#custVisiPlobForm #cb_custCmp').val(result.cb_custCmp);
					$('#custVisiPlobForm #cb_contact').val(result.cb_contact);
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					
				}
			});
		}else{
			$('#custVisiPlobForm #cv_id').val('');
			$('#custVisiPlobForm #cv_title').val('');
			$('#custVisiPlobForm #cb_custCmp').val('');
			$('#custVisiPlobForm #cb_contact').val('');
		}
	});
}