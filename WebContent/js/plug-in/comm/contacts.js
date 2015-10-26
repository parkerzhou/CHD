//标志变量，用于保证事件只被注册一次
var contactsOptType = -1;
var confirm = false;
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

$.extend(
		$.fn.validatebox.defaults.rules,{
			ct_nameLength:{
				validator:function(value){
					var length = 0;
					for(i=0;i<value.length;i++){
						iCode = value.charCodeAt(i);
						if((iCode >= 0 && iCode <= 255) || (iCode >= 0xff61 && iCode <= 0xff9f)) { 
							length += 1; 
						} else { 
							length += 2; 
						}
					}
					if(length<=20){
						return true;
					}else{
						return false;
					}
				},
				message:'联系人姓名过长'
			},
			ct_nickNameLength:{
				validator:function(value){
					var length = 0;
					for(i=0;i<value.length;i++){
						iCode = value.charCodeAt(i);
						if((iCode >= 0 && iCode <= 255) || (iCode >= 0xff61 && iCode <= 0xff9f)) { 
							length += 1; 
						} else { 
							length += 2; 
						}
					}
					if(length<=40){
						return true;
					}else{
						return false;
					}
				},
				message:'联系人昵称过长'
			},
			ct_emailLength:{
				validator:function(value){
					var length = 0;
					for(i=0;i<value.length;i++){
						iCode = value.charCodeAt(i);
						if((iCode >= 0 && iCode <= 255) || (iCode >= 0xff61 && iCode <= 0xff9f)) { 
							length += 1; 
						} else { 
							length += 2; 
						}
					}
					var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/i.test(value);
					if(length<=40&&pattern){
						return true;
					}else{
						return false;
					}
				},
				message:'邮箱格式不正确'
			}
		}
);

$(function(){
	var initData = []
	//创建并初始化联系人datagrid
	simpleContDataGrid = $('#ctDataGrid').datagrid({
		data:initData,
		onDblClickRow:function(rowIndex,row){
			if(editable == false){
				return;//无权限，直接返回。
			}
			contactsOptType = 1;
			$('#contForm').form('load','contactsController.do?loadContact&ct_id='+row.ct_id);
			$('#contInfoTab').tabs('enableTab',1);
			$('#contInfoTab').tabs('enableTab',2);
			$('#contInfoTab').tabs('enableTab',3);
			$('#contInfoTab').tabs('select',0);
			simpleContDialog.dialog('setTitle','修改');
			simpleContDialog.dialog('open');
		},
		loadFilter:pagerFilter
	});
	
	//创建并初始化联系人对话框
	simpleContDialog = $('#contDialog').dialog({
		onBeforeClose:function(){
			var ct_name = $('#contForm #ct_name').val();
			if(ct_name==''){
				clearPage();
				return true;
			}
			$.messager.confirm('提示','是否确定返回主界面？',function(r){
				if(r){
					clearPage();
					simpleContDialog.dialog('close',true);
				}
			});
			return false;
		}
	});
	
	//为联系人信息查找按钮绑定单击事件
	$('#searchContacts').bind('click',function(){
		var custName = $('#ct_custName').val();
		var custCmpName = $('#ct_custCmpName').val();
		var ct_name = $('#ct_name').val();
		simpleContDataGrid.datagrid({
			url:'contactsController.do?searchContacts',
			queryParams:{custName:custName,custCmpName:custCmpName,ct_name:ct_name},
			loadFilter:pagerFilter
		});
	});
	
	//创建并初始化联系人信息对话框的选择面板
	$('#contInfoTab').tabs({
		onSelect:function(title,index){
			var ct_id = $('#contForm #ct_id').val();
			if(index==1){
				//刷新联系人所属公司datagrid
				$('#contCmpDataGrid').datagrid({
					url:'contactsController.do?searchContCmp&ct_id='+ct_id
				});
			}
			if(index==2){
				//刷新联系人所属公司附件
				updateAnnex(8,ct_id,1);
			}
			if(index==3){
				//刷新联系人关联信息
				updateRelation(8,ct_id);
			}
		}
	});
});
//校验0至20之间的整数
$.extend($.fn.validatebox.defaults.rules, {
	num: {
        validator: function (value) {
        	 if(value>=0&&value<=20&&/^\d+$/i.test(value))return true;
        	 return false;
        },
        message: '数量必须是0到20之间的整数'
    }
});

//新怎联系人信息
function addContacts(){
	contactsOptType = 0;
	$('#contForm').form('load','contactsController.do?loadMaxContactsId');
	$('#contInfoTab').tabs('disableTab',1);
	$('#contInfoTab').tabs('disableTab',2);
	$('#contInfoTab').tabs('disableTab',3);
	simpleContDialog.dialog('setTitle','新增');
	simpleContDialog.dialog('open');
}

//修改联系人信息
function editContacts(){
	contactsOptType = 1;
	var rows = simpleContDataGrid.datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return null;
	}
	else if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return null;
	}
	var row = simpleContDataGrid.datagrid('getSelected');
	$('#contCmpDataGrid').datagrid({
		url:'contactsController.do?searchContCmp&ct_id='+row.ct_id
	});
	$('#contForm').form('load','contactsController.do?loadContact&ct_id='+row.ct_id);
	$('#contInfoTab').tabs('enableTab',1);
	$('#contInfoTab').tabs('enableTab',2);
	$('#contInfoTab').tabs('enableTab',3);
	$('#contInfoTab').tabs('select',0);
	simpleContDialog.dialog('setTitle','修改');
	simpleContDialog.dialog('open');
}

//删除联系人信息
function delContacts(){
	var rows = simpleContDataGrid.datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要删除的记录！','info');
		return null;
	}
	$.messager.confirm('提示','是否确定删除所选择的记录？',function(r){
		if(r){
			var rows = simpleContDataGrid.datagrid('getSelections');
			var idArray = [];
			for(var Key in rows){
				idArray.push(rows[Key].ct_id);
			}
			$.ajax({
				type:'POST',
				url:'contactsController.do?delContacts&idArray='+idArray,
				dataType:'text',
				success:function(data,status,xml){
					simpleContDataGrid.datagrid('reload');
					simpleContDataGrid.datagrid('uncheckAll');
					$.messager.alert('提示',data,'info');
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					$.messager.alert('提示','删除错误！','error');
				}
			});
		}
	});
}

//联系人信息表单中提交按钮的单击事件
function contDialogSave(){
	$.ajax({
		type:'POST',
		url:'contactsController.do?checkConn',
		dataType:'text',
		success:function(data,status,xml){
			$('#contForm').form('submit',{
				url:'contactsController.do?addOrEditContacts&contOptType='+contactsOptType,
				onSubmit:function(){
					var isValid = $(this).form('validate');
					//if(!isValid){
						//$.messager.alert('提示','资料不允许提交,请检查红色背景项内容!','info');
					//}
					return isValid;
				},
				success:function(data){
					data = eval('('+data+')');
					if(contactsOptType==0){
						$('#contInfoPanel').scrollTop(-1);
						simpleContDialog.dialog('setTitle','修改');
						$('#contInfoTab').tabs('enableTab',1);
						$('#contInfoTab').tabs('enableTab',2);
						$('#contInfoTab').tabs('enableTab',3);
						$('#contInfoTab').tabs('select',1);
						$('#contForm #ct_id').val(data.ct_id);
						$('#contForm #ct_code').val(data.ct_code);
						var ct_id = $('#contForm #ct_id').val();
						$('#contCmpDataGrid').datagrid({
							url:'contactsController.do?searchContCmp&ct_id='+ct_id
						});
					}
					contactsOptType = 1;
					simpleContDataGrid.datagrid('reload');
					$('#contInfoPanel').scrollTop(-1);
					$.messager.alert('提示','提交成功！','info');
				}
			});
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			$.messager.alert('提示','提交失败！<br/><br/><br/><br/>失败原因：网络连接中断！','error');
		}
	});
}

function checkSameName(){
	var ct_name = $('#contForm #ct_name');
	var ct_id = $('#contForm #ct_id');
	if(ct_id==undefined){
		ct_id = '';
	}
	$.ajax({
		type:'POST',
		url:'contactsController.do?checkSameName',
		dataType:'text',
		data:{ct_name:ct_name.val(),contactsOptType:contactsOptType,ct_id:ct_id.val()},
		success:function(data,status,xml){
			data = eval('('+data+')');
			if(!data.success){
				$.messager.confirm('提示','系统中已存在同名联系人，是否确定增加同名联系人？',function(r){
					if(!r){
						ct_name.val('');
						ct_name.focus();
					}
				});
			}
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			
		}
	});
}

//清空联系人信息表单数据的函数
function clearPage(){
	$('#contInfoTab').tabs('select',0);
	$('#contForm').form('clear');
}