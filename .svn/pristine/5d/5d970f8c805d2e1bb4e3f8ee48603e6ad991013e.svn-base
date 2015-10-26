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

$(function(){
	/*var initData = [];*/
	//创建并初始化加盟方管理基本信息表格对象
	simpleFranDataGrid = $('#franDataGrid').datagrid({
		url:'franController.do?loadFran',
		onDblClickRow:function(rowIndex,rowData){
	
			if(editable == false){
				return ;
			}
			optType = 1;
			var cmp_id = rowData.cmp_id;
			$('#custVisiForm').form('load','franController.do?loadFranById&cmp_id='+cmp_id);
			
			$('#franDlg').dialog('setTitle','修改');
			$('#franDlg').dialog('open');
		},
		loadFilter:pagerFilter,
		
		
	});
	$("#custVisiForm").form({
		onLoadSuccess:function(data){
			$("#belong_cmp_name").val(data.belong_cmp_name);
			$("#cmp_country_name").val(data.cmp_country_name);
			$("#cmp_province_name").val(data.cmp_province_name);
			$("#cmp_city_name").val(data.cmp_city_name);
			$("#cmp_county_name").val(data.cmp_county_name);
			$("#cmp_town_name").val(data.cmp_town_name);
			
		},
	});
	
	//对话关闭事件
	simpleFranDialog = $('#franDlg').dialog({
		onBeforeClose:function(){
			var cmp_id = $('#custVisiForm #cmp_id').val();
			
			if(cmp_id!=''){
				//如果主要拜访人信息不为空，则提示信息，如果确定关闭对话框，则清空表单数据，选中拜访管理信息面板，并刷新拜访管理基本信息表格数据
				$.messager.confirm('提示','是否确定返回主界面？',function(r){
					if(r){
						$('#custVisiForm').form('clear');
						simpleFranDialog.dialog('close',true);
					}
				});
				return false;
			}
		}
	});
});

//新增加盟方管理信息按钮的单击事件
function addFran(){
	//将拜访管理信息操作位置零
	optType = 0;
	simpleFranDialog.dialog('setTitle','新增');
	simpleFranDialog.dialog('open');
}




//修改加盟方管理信息按钮的单击事件
function editFran(){
	//将拜访管理信息操作位置1
	optType = 1;
	var rows = simpleFranDataGrid.datagrid('getSelections');
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
	var row = simpleFranDataGrid.datagrid('getSelected');
	var cmp_id = row.cmp_id;
	//根据拜访人管理基本信息主键cv_id从后台加载拜访人管理信息
	$('#custVisiForm').form('load','franController.do?loadFranById&cmp_id='+cmp_id);
	//更改拜访管理信息对话框的标题为修改，并打开对话框
	simpleFranDialog.dialog('setTitle','修改');
	simpleFranDialog.dialog('open');
}

//删除加盟方信息
function delFran(){
	var rows = simpleFranDataGrid.datagrid('getSelections');
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
			idArray.push(rows[key].cmp_id);
		}
		//弹出删除操作选择对话框，如果确定删除拜访管理信息，则提交cv_id数组到后台进行删除操作
		$.messager.confirm('提示','是否确定删除所选择的记录？',function(r){
			if(r){
				$.ajax({
					type:'POST',
					url:'franController.do?delFran&cmp_ids='+idArray,
					dataType:'text',
					//将后台执行删除操作的结果反馈给用户
					success:function(data,status,xml){
						simpleFranDataGrid.datagrid('reload');
						simpleFranDataGrid.datagrid('uncheckAll');
						$.messager.alert('提示',data+'！','info');
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){
						
					}
				});
			}
		});
	}
}

function franDialogSave(){

	$('#custVisiForm').form('submit',{
		url:'franController.do?addOrEditFranInfo&optType='+optType,
	
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
			
			simpleFranDialog.dialog('close',true);
			simpleFranDataGrid.datagrid('reload');
			$.messager.alert('提示','提交成功！','info');
		}
	});
}

function loadFranInfo(){
	var cmp_id=$('#cmp_id').val();
	$.ajax({
		type:'POST',
		url:'franController.do?loadFranInfo&cmp_id='+cmp_id,
		dataType:'json',
		success:function(data,status,xml){
			if(data.exist==true){
				$('#custVisiForm').form('load',data.msg);
				simpleFranDialog.dialog('setTitle','修改');
				optType = 1;
				
			}else{
				var cmp_id = $('#custVisiForm input[name="cmp_id"]').val();
				simpleFranDialog.dialog('setTitle','新增');
				$('#custVisiForm input').val('');
				$('#custVisiForm input[name="cmp_id"]').val(cmp_id);
				optType = 0;
			}
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			
		}
	});
}

function openAreaDlg(){
	
	openCommDialog('区域资料选择','franController.do?getCommPage&page=areaSel',1000,480,function(){
		data={};
		data.country=$("#custVisiForm input[name='cmp_country']").val();
		data.province=$("#franDlg input[name='cmp_province']").val();
		data.city=$("#franDlg input[name='cmp_city']").val();
		data.county=$("#franDlg input[name='cmp_county']").val();
		data.town=$("#franDlg input[name='cmp_town']").val();
		openAreaSelDlg(data,function(zone_data){
			
			$("#franDlg input[name='cmp_country']").val('');
			$("#franDlg input[name='cmp_province']").val('');
			$("#franDlg input[name='cmp_city']").val('');
			$("#franDlg input[name='cmp_county']").val('');
			$("#franDlg input[name='cmp_town']").val('');
			
			$("#franDlg input[id='cmp_country_name']").val('');
			$("#franDlg input[id='cmp_province_name']").val('');
			$("#franDlg input[id='cmp_city_name']").val('');
			$("#franDlg input[id='cmp_county_name']").val('');
			$("#franDlg input[id='cmp_town_name']").val('');
			
			$("#franDlg input[name='cmp_country']").val(zone_data.country);
			$("#franDlg input[name='cmp_country']").focus();
			$("#franDlg input[name='cmp_province']").val(zone_data.province);
			$("#franDlg input[name='cmp_city']").val(zone_data.city);
			$("#franDlg input[name='cmp_county']").val(zone_data.county);
			$("#franDlg input[name='cmp_town']").val(zone_data.town);
			
			$("#franDlg input[id='cmp_country_name']").val(zone_data.country_name);
			$("#franDlg input[id='cmp_province_name']").val(zone_data.province_name);
			$("#franDlg input[id='cmp_city_name']").val(zone_data.city_name);
			$("#franDlg input[id='cmp_county_name']").val(zone_data.county_name);
			$("#franDlg input[id='cmp_town_name']").val(zone_data.cmp_town_name);
			$("#dlg").dialog("close",true);
		});
	});
	
	
}

function openCompanySel(){
	
	openCommDialog('公司资料选择','franController.do?getCommPage&page=cmpSel',1000,480,function(){
		openCompanySelDlg('',function(data){
			$("#franDlg input[name='belong_cmp']").val(data.cmp_id);
			$("#belong_cmp_name").val(data.cmp_sname);
			$("#dlg").dialog("close");
		});
	});
	
	
	
}










