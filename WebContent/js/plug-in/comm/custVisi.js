//拜访管理信息操作位（0为新增，1为修改）
var custVisiOptType = -1;

var editable = true; //是否具有修改权限

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

var buttons = $.extend([], $.fn.datebox.defaults.buttons);
buttons.splice(1, 0, {
    text: '清空',
    handler: function(target){
        $(target).datebox('clear');
    }
});

$.extend(
	$.fn.validatebox.defaults.rules,{
		cv_titleLength:{
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
				if(length<=80){
					return true;
				}else{
					return false;
				}
			},
			message:'拜访标题过长,请简要概述'
		},
		cv_addrLength:{
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
				if(length<=120){
					return true;
				}else{
					return false;
				}
			},
			message:'拜访地址过长'
		}
	}
);

$(function(){
	var initData = [];
	//创建并初始化拜访管理基本信息表格对象
	simpleVisiDataGrid = $('#custVisiDataGrid').datagrid({
		data:initData,
		//双击表格行数据事件
		onDblClickRow:function(rowIndex,rowData){
			if(editable == false){
				return;//无权限，直接返回。
			}
			custVisiOptType = 1;
			var cv_id = rowData.cv_id;
			//将主要拜访人职务与部门文本框设置为可用状态
			$('#ct_offitext').attr('disabled',false);
			$('#contDept').attr('disabled',false);
			//根据cv_id从后台加载拜访管理信息
			$('#custVisiForm').form('load','visiController.do?loadCustVisi&cv_id='+cv_id);
			//启用拜访管理信息选择面板下的同行人、其他拜访人、附件以及关联信息面板
			$('#visiInfoTb').tabs('enableTab',1);
			$('#visiInfoTb').tabs('enableTab',2);
			$('#visiInfoTb').tabs('enableTab',3);
			$('#visiInfoTb').tabs('enableTab',4);
			$('#visiInfoTb').tabs('select',0);
			//设置拜访管理对话框的标题为修改，并打开对话框
			simpleVisiDialog.dialog('setTitle','修改');
			simpleVisiDialog.dialog('open');
		},
		loadFilter:pagerFilter
	});
	
	simpleVisiDialog = $('#custVisiDlg').dialog({
		onBeforeClose:function(){
			var ct_id = $('#custVisiForm #ct_id').val();
			if(ct_id==''){
				$('#visiInfoTb').tabs('select',0);
				$('#custVisiForm').form('clear');
				return true;
			}
			if(ct_id!=''){
				//如果主要拜访人信息不为空，则提示信息，如果确定关闭对话框，则清空表单数据，选中拜访管理信息面板，并刷新拜访管理基本信息表格数据
				$.messager.confirm('提示','是否确定返回主界面？',function(r){
					if(r){
						$('#visiInfoTb').tabs('select',0);
						$('#custVisiForm').form('clear');
						simpleVisiDialog.dialog('close',true);
					}
				});
				return false;
			}
		}
	});
	
	$('#visiInfoTb').tabs({
		//为拜访管理信息选择面板注册选择事件
		onSelect:function(title,index){
			//从拜访管理信息表单中获取拜访管理信息的主键cv_id
			var cv_id = $('#custVisiForm #cv_id').val();
			//选中同行人面板
			if(index==1){
				var cvtitle = $('#othVisiEmpCvTitle #cvtitle');
				//从后台获取拜访管理信息的拜访记录标题
				$.ajax({
					type:'POST',
					url:'visiController.do?getCvTitle&cv_id='+cv_id,
					dataType:'text',
					success:function(data,status,xml){
						cvtitle.val(data);
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){
						
					}
				});
				//根据cv_id刷新同行人基本信息表格数据
				$('#othVisiEmpDg').datagrid({
					url:'visiController.do?searchOthVisiEmp&cv_id='+cv_id
				});
			}
			//选中其他拜访人面板
			if(index==2){
				var cvtitle = $('#othVisiContCvTitle #cvtitle');
				//从后台获取拜访管理信息的拜访记录标题
				$.ajax({
					type:'POST',
					url:'visiController.do?getCvTitle&cv_id='+cv_id,
					dataType:'text',
					success:function(data,status,xml){
						cvtitle.val(data);
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){
						
					}
				});
				//根据cv_id刷新其他拜访人基本信息表格
				$('#othVisiContDg').datagrid({
					url:'visiController.do?searchOthVisiCont&cv_id='+cv_id
				});
			}
			//选中附件面板
			if(index==3){
				//调用附件公共模块
				updateAnnex(16,cv_id,1);
			}
			//选中关联信息面板
			if(index==4){
				//调用关联信息公共模块
				updateRelation(16,cv_id);
			}
		}
	});
	
	//为拜访管理信息表单的客户公司选择按钮注册单击事件
	$('#custCmpBtn').click(function(){
		//打开客户公司选择对话框
		$.chcrm.openCommDialog('custComp',false,function(val){
			

			var contName = $('#contName');
			var ct_id = $('#ct_id');
			var ct_offitext = $('#ct_offitext');
			var contDept = $('#contDept');
			var de_id = $('#de_id');
			
			var custCmptext = $('#custCmptext');
			var custName = $('#custVisiForm #custName');
			var cc_idU = $('#cc_idU');
			var cc_idV = $('#cc_idV');
			var cv_code = $('#cv_code');
			custCmptext.focus();
			//如果选中客户公司数据
			if(val.length>=1){
				//根据所选择的客户公司信息填充客户公司文本框内容
				custCmptext.val(val[0].custCompName);
				custName.val(val[0].custName.split('-')[1]);
				//记录客户公司信息的主键cc_id为cc_idU
				cc_idU.val(val[0].custCompId);
				//如果cc_idV不为空,则比较cc_idV与cc_idU
				if(cc_idV.val()!=''){
					//如果cc_idU与cc_idV不相同，则清空客户公司文本框、拜访记录代码文本框以及cc_idU隐藏域内容，并提示用户相关信息
					if(cc_idV.val()!=cc_idU.val()){
//						cc_idU.val('');
//						cv_code.val('');
//						custCmptext.val('');
//						custName.val('');
//						$.messager.alert('提示','请选择相应联系人所属客户公司信息！','info');
						
						contName.val('');
						ct_id.val('');
						ct_offitext.val('');
						contDept.val('');
						de_id.val('');
						cc_idV.val('');
						ct_offitext.attr('disabled',true);
						contDept.attr('disabled',true);
						contName.focus();
						
						return null;
					}
				}
				//根据客户公司信息主键cc_idU从后台加载拜访记录代码
				$.ajax({
					type:'POST',
					url:'visiController.do?getMaxCvCode&cc_id='+cc_idU.val(),
					dataType:'text',
					success:function(data,status,xml){
						cv_code.val(data);
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){
						
					}
				});
			}else{
				//如果未选择客户公司信息，则清空客户公司文本框、拜访记录代码文本框以及cc_idU隐藏域内容
				cc_idU.val('');
				custCmptext.val('');
				custName.val('');
				cv_code.val('');
				custCmptext.focus();
			}
		});
	});
	
	//为带队人选择按钮注册单击事件
	$('#staffSelBtn').click(function(){
		//打开带队人选择对话框
		$.chcrm.openCommDialog('personal',false,function(val){
			var staffName = $('#custVisiForm #staffName');
			var cv_empId = $('#cv_empId');
			staffName.focus();
			if(val.length>=1){
				//如果选择了带队人信息，则填充带队人文本框和带队人隐藏域内容
				staffName.val(val[0].staffName);
				cv_empId.val(val[0].id);
			}else{
				//如果未选择带队人信息，则清空带队人文本框和带队人隐藏域内容
				staffName.val('');
				cv_empId.val('');
			}
		});
	});
	
	//为主要拜访人选择按钮注册单击事件
	$('#contSelBtn').click(function(){
		var cc_idU = $('#cc_idU');
		//打开主要拜访人选择对话框
		if(cc_idU.val()!=''){
			var custCmptext = $('#custCmptext').val().split('-')[2];
			var custName = $('#custVisiForm #custName');
			$.chcrm.openCommDialog('contacts',false,function(val){
				var contName = $('#contName');
				var ct_id = $('#ct_id');
				var ct_offitext = $('#ct_offitext');
				var contDept = $('#contDept');
				var de_id = $('#de_id');
				var cc_idV = $('#cc_idV');
				contName.focus();
				if(val.length>=1){
					cc_idV.val(val[0].custCompId);
					//根据所选择主要拜访人信息填充主要拜访人文本框、主要拜访人职务文本框、部门文本框、联系人ID隐藏域以及部门ID隐藏域内容
					ct_id.val(val[0].ct_id);
					ct_offitext.attr('disabled',false);
					contDept.attr('disabled',false);
					contName.val(val[0].contName);
					ct_offitext.val(val[0].contTitle);
					contDept.val(val[0].contDept);
					de_id.val(val[0].deptId);
				}else{
					//如果未选择主要拜访人信息，则清空主要拜访人文本框、主要拜访人职务文本框、部门文本框、联系人ID隐藏域、部门ID隐藏域以及cc_idV隐藏域内容，并禁用主要拜访人文本框和部门文本框
					contName.val('');
					ct_id.val('');
					ct_offitext.val('');
					contDept.val('');
					de_id.val('');
					cc_idV.val('');
					ct_offitext.attr('disabled',true);
					contDept.attr('disabled',true);
					contName.focus();
				}
			},custName.val(),custCmptext);
		}else{
			$.messager.alert('提示','请先选择所拜访的客户公司！','info');
		}
	});
	
	//为查询拜访管理基本信息按钮注册单击事件
	$('#searchCustVisi').bind('click',function(){
		var custVisiCmp = $('#visiTb #custVisiCmp').val();
		var cv_StartDate = $('#visiTb #cv_StartDate').datebox('getValue');
		var cv_EndDate = $('#visiTb #cv_EndDate').datebox('getValue');
		var cv_state = $('#visiTb #cv_state').combobox('getValue');
		if(custVisiCmp==undefined){
			custVisiCmp = '';
		}
		if(cv_StartDate==undefined){
			cv_StartDate = '';
		}
		if(cv_EndDate==undefined){
			cv_EndDate = '';
		}
		if(cv_state==undefined){
			cv_state = '';
		}
		var custVisiUrl = 'visiController.do?searchCustVisiInfo';
		//根据用户输入的查询条件对拜访管理基本信息进行模糊查询，并刷新拜访管理基本信息表格数据
		simpleVisiDataGrid.datagrid({
			url:custVisiUrl,
			queryParams:{custVisiCmp:custVisiCmp,cv_StartDate:cv_StartDate,cv_EndDate:cv_EndDate,cv_state:cv_state},
			loadFilter:pagerFilter
		});
	});
});

//新增拜访管理信息按钮的单击事件
function addCustVisi(){
	//将拜访管理信息操作位置零
	custVisiOptType = 0;
	//禁用主要拜访人文本框、部门文本框，禁用拜访管理信息选择面板下的同行人、其他拜访人、附件以及关联信息面板
	$('#ct_offitext').attr('disabled',true);
	$('#contDept').attr('disabled',true);
	$('#visiInfoTb').tabs('disableTab',1);
	$('#visiInfoTb').tabs('disableTab',2);
	$('#visiInfoTb').tabs('disableTab',3);
	$('#visiInfoTb').tabs('disableTab',4);
	//从后台加载拜访管理信息表单中的建档时间
	$('#custVisiForm').form('load','visiController.do?getCurrentTime');
	//更改拜访管理信息对话框的标题为新增，并打开对话框
	simpleVisiDialog.dialog('setTitle','新增');
	simpleVisiDialog.dialog('open');
}

//修改拜访管理信息按钮的单击事件
function editCustVisi(){
	//将拜访管理信息操作位置1
	custVisiOptType = 1;
	var rows = simpleVisiDataGrid.datagrid('getSelections');
	//如果未选中拜访管理基本信息，则提示用户相关信息
	if(rows.length==0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return false;
	}
	//如果选中1条以上拜访管理基本信息，则提示用户相关信息
	if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return false;
	}
	var row = simpleVisiDataGrid.datagrid('getSelected');
	var cv_id = row.cv_id;
	//启用主要拜访人文本框、部门文本框
	$('#ct_offitext').attr('disabled',false);
	$('#contDept').attr('disabled',false);
	//根据拜访人管理基本信息主键cv_id从后台加载拜访人管理信息
	$('#custVisiForm').form('load','visiController.do?loadCustVisi&cv_id='+cv_id);
	//启用拜访管理信息选择面板下的同行人、其他拜访人、附件以及关联信息面板，并选中拜访管理信息面板
	$('#visiInfoTb').tabs('enableTab',1);
	$('#visiInfoTb').tabs('enableTab',2);
	$('#visiInfoTb').tabs('enableTab',3);
	$('#visiInfoTb').tabs('enableTab',4);
	$('#visiInfoTb').tabs('select',0);
	//更改拜访管理信息对话框的标题为修改，并打开对话框
	simpleVisiDialog.dialog('setTitle','修改');
	simpleVisiDialog.dialog('open');
}

//删除拜访管理信息
function delCustVisi(){
	var rows = simpleVisiDataGrid.datagrid('getSelections');
	//如果未选中拜访管理基本信息，提示用户相关信息
	if(rows.length==0){
		$.messager.alert('提示','请选择要删除的记录！','info');
		return false;
	}
	//如果选中1条或1条以上拜访管理基本信息，则提醒用户是否确定删除信息
	if(rows.length>=1){
		//创建并构造拜访管理信息主键cv_id数组
		var idArray = [];
		for(var key in rows){
			idArray.push(rows[key].cv_id);
		}
		//弹出删除操作选择对话框，如果确定删除拜访管理信息，则提交cv_id数组到后台进行删除操作
		$.messager.confirm('提示','是否确定删除所选择的记录？',function(r){
			if(r){
				$.ajax({
					type:'POST',
					url:'visiController.do?delCustVisi&cv_ids='+idArray,
					dataType:'text',
					//将后台执行删除操作的结果反馈给用户
					success:function(data,status,xml){
						simpleVisiDataGrid.datagrid('reload');
						simpleVisiDataGrid.datagrid('uncheckAll');
						$.messager.alert('提示',data+'！','info');
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){
						
					}
				});
			}
		});
	}
}

//拜访管理信息表单中提交按钮的单击事件
function custVisiDialogSave(){
	$('#custVisiForm').form('submit',{
		url:'visiController.do?addOrEditCustVisi&custVisiOptType='+custVisiOptType,
		onSubmit:function(){
			var isValid = $('#custVisiForm').form('validate');
			return isValid;
		},
		success:function(data){
			data = eval('('+data+')');
			
			if(!data.success){
				$.messager.alert('提示',data.msg,'error');
				return null;
			}
			
			//如果是在新增拜访管理信息时提交表单数据，则在提交成功后进行如下操作
			if(custVisiOptType==0){
				$('#visiInfoPanel').scrollTop(-1);
				//启用拜访管理信息选择面板下的同行人、其他拜访人、附件以及关联信息面板
				$('#visiInfoTb').tabs('enableTab',1);
				$('#visiInfoTb').tabs('enableTab',2);
				$('#visiInfoTb').tabs('enableTab',3);
				$('#visiInfoTb').tabs('enableTab',4);
				//将后台生成的拜访管理信息主键cv_id填充到cv_id隐藏域
				$('#custVisiForm #cv_id').val(data.cv_id);
				//选中同行人面板，并将拜访管理信息对话框的标题更改为修改
				$('#visiInfoTb').tabs('select',1);
				simpleVisiDialog.dialog('setTitle','修改');
			}
			//将后台重新生成的拜访记录代码填充到cv_code隐藏域
			$('#custVisiForm #cv_code').val(data.cv_code);
			//将拜访管理信息操作位置1
			custVisiOptType=1;
			//刷新拜访管理基本信息表格数据，并提示用户相关信息
			simpleVisiDataGrid.datagrid('reload');
			$('#visiInfoPanel').scrollTop(-1);
			$.messager.alert('提示','提交成功！','info');
		}
	});
}