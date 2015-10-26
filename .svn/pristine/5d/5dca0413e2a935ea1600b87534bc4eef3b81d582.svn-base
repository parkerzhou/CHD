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
	$("#fprojForm").form({
		onLoadSuccess:function(data){
			$("#proj_country_name").val(data.proj_country_name);
			$("#proj_province_name").val(data.proj_province_name);
			$("#proj_city_name").val(data.proj_city_name);
			$("#proj_county_name").val(data.proj_county_name);
			$("#proj_town_name").val(data.proj_town_name);
			$("#cmp_name").val(data.cmp_id_name); //注意
			$("#dept_name").val(data.dept_id_name);
			$("#charger_name").val(data.charger_name);
			$("#cust_cmp_name").val(data.cust_cmp_name);
			$("#cust_cmp_contactor").val(data.cust_cmp_contactor);
			$("#cust_cmp_tel1").val(data.cust_cmp_tel1);
			$("#frans_name").val(data.frans_name);
			$("#frans_contactor").val(data.frans_contactor);
			$("#frans_tel").val(data.frans_tel);
			$("#frans_address").val(data.frans_address);
		}
	});
	
	simpleFprojDataGrid = $('#fprojDataGrid').datagrid({
		url:'franController.do?loadFproj',
		onDblClickRow:function(rowIndex,rowData){
			optType = 1;
			var pre_regseq = rowData.pre_regseq;
			$('#fprojForm').form('load','franController.do?loadFprojById&pre_regseq='+pre_regseq);
			
		    $('#fprojDlg').dialog('setTitle','修改');
		    $('#fprojDlg').dialog('open');
		},
		loadFilter:pagerFilter
		
		
	});
	
	
	//对话关闭事件
	simpleFprojDialog = $('#fprojDlg').dialog({
		onBeforeClose:function(){
			var pre_regseq = $('#fprojForm #pre_regseq').val();
			
			if(pre_regseq!=''){
				//如果主要拜访人信息不为空，则提示信息，如果确定关闭对话框，则清空表单数据，选中拜访管理信息面板，并刷新拜访管理基本信息表格数据
				$.messager.confirm('提示','是否确定返回主界面？',function(r){
					if(r){
						$('#fprojForm').form('clear');
						simpleFprojDialog.dialog('close',true);
					}
				});
				return false;
			}
		}
	});
	
});

function addFproj(){
	optType = 0;
	$.ajax({
		type:'POST',
		url:'franController.do?loadYearSeq',
		dataType:'json',
		//将后台执行删除操作的结果反馈给用户
		success:function(data,status,xml){
			//alert(data.year+'JMYS'+data.seq);
			$("#fprojForm input[name='pre_year']").val(data.year);
			$("#fprojForm input[name='pre_seq']").val(data.seq);
		},
		error:function(XMLHttpRequest,textStatus,errorThrown){
			
		}
	});
	
	
	
	$("#fprojForm input[name='pre_year']").focus();
	$("#fprojForm input[name='pre_seq']").focus();
	var date = new Date();
	var dateStr = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
	$("#reg_date").datebox('setValue',dateStr);
	$("#proj_type").attr("checked","checked");
	simpleFprojDialog.dialog('setTitle','新增');
	simpleFprojDialog.dialog('open');
}

function delFproj(){
	var rows = simpleFprojDataGrid.datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要删除的记录！','info');
		return false;
	}
	//如果选中1条或1条以上拜访管理基本信息，则提醒用户是否确定删除信息
	if(rows.length>=1){
		//创建并构造拜访管理信息主键cv_id数组
		var idArray = [];
		for(var key in rows){
			idArray.push(rows[key].pre_regseq);
		}
		//弹出删除操作选择对话框，如果确定删除拜访管理信息，则提交cv_id数组到后台进行删除操作
		$.messager.confirm('提示','是否确定删除所选择的记录？',function(r){
			if(r){
				$.ajax({
					type:'POST',
					url:'franController.do?delFproj&pre_regseqs='+idArray,
					dataType:'text',
					//将后台执行删除操作的结果反馈给用户
					success:function(data,status,xml){
						simpleFprojDataGrid.datagrid('reload');
						simpleFprojDataGrid.datagrid('uncheckAll');
						$.messager.alert('提示',data+'！','info');
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){
						
					}
				});
			}
		});
	}
}

function fprojDialogSave(){
	$('#fprojForm').form('submit',{
		url:'franController.do?addOrEditFprojInfo&optType='+optType,
	
		onSubmit:function(){
				var isValid = $('#fprojForm').form('validate');
				return isValid;
		},
		success:function(data){
			
			data = eval('('+data+')');
			if(!data.success){
				$.messager.alert('提示',data.msg,'error');
				return null;
			}
			
			simpleFprojDialog.dialog('close',true);
			simpleFprojDataGrid.datagrid('reload');
			$.messager.alert('提示','提交成功！','info');
		}
	});
}

function openFprojAreaDlg(){
	openCommDialog('区域选择','franController.do?getCommPage&page=areaSel',1000,500,function(){
				data={};
				data.country=$("#fprojForm input[name='proj_country']").val();
				data.province=$("#fprojForm input[name='proj_province']").val();
				data.city=$("#fprojForm input[name='proj_city']").val();
				data.county=$("#fprojForm input[name='proj_county']").val();
				data.town=$("#fprojForm input[name='proj_town']").val();
				openAreaSelDlg(data,function(zone_data){
					
					$("#fprojForm input[name='proj_country']").val('');
					$("#fprojForm input[name='proj_province']").val('');
					$("#fprojForm input[name='proj_city']").val('');
					$("#fprojForm input[name='proj_county']").val('');
					$("#fprojForm input[name='proj_town']").val('');
					
					$("#fprojForm input[id='proj_country_name']").val('');
					$("#fprojForm input[id='proj_province_name']").val('');
					$("#fprojForm input[id='proj_city_name']").val('');
					$("#fprojForm input[id='proj_county_name']").val('');
					$("#fprojForm input[id='proj_town_name']").val('');
					
					$("#fprojForm input[name='proj_country']").val(zone_data.country);
					$("#fprojForm input[name='proj_province']").val(zone_data.province);
					$("#fprojForm input[name='proj_city']").val(zone_data.city);
					$("#fprojForm input[name='proj_county']").val(zone_data.county);
					$("#fprojForm input[name='proj_town']").val(zone_data.town);
					
					$("#fprojForm input[id='proj_country_name']").val(zone_data.country_name);
					$("#fprojForm input[id='proj_province_name']").val(zone_data.province_name);
					$("#fprojForm input[id='proj_city_name']").val(zone_data.city_name);
					$("#fprojForm input[id='proj_county_name']").val(zone_data.county_name);
					$("#fprojForm input[id='proj_town_name']").val(zone_data.cmp_town_name);
					
					$("#dlg").dialog('close',true);
				});
			});
	
}

function openFprojCompanySel(){
	
	openCommDialog('公司资料选择','franController.do?getCommPage&page=cmpSel',1000,500,function(){
		openCompanySelDlg('D',function(data){
			$("#fprojForm input[name='cmp_id']").val(data.cmp_id);
			$("#fprojForm input[name='cmp_id']").focus();
			$("#fprojForm input[id='cmp_name']").val(data.cmp_sname);

			$("#fprojDlg input[name='dept_id']").val("");
			$("#dept_name").val("");
			
			$("#fprojForm input[name='charger']").val("");
			$("#fprojForm input[id='charger_name']").val("");
			
			
			$("#dlg").dialog("close",true);
		});
	});
	
	
}

function openFprojEmployeeSel(){
	
	
	openEmployeesSelDlg(function(data){
		$("#fprojForm input[name='charger']").val(data.staff_id);
		$("#fprojForm input[id='charger_name']").val(data.staff_name);
		
	});
}

//打开部门通用查询模块
function openFprojDeptSel(){
	var cmp_id = $("#fprojForm input[name='cmp_id']").val();
	if(cmp_id.trim()==''){
		alert('请先选择公司!');
		return;
	}
	
	openCommDialog('部门资料选择','franController.do?getCommPage&page=deptSel',1000,500,function(){
		openDeptSelDlg(cmp_id,function(data){
			$("#fprojDlg input[name='dept_id']").val(data.dept_id);
			$("#fprojDlg input[name='dept_id']").focus();
			$("#dept_name").val(data.dept_name);
			
			$("#fprojForm input[name='charger']").val("");
			$("#fprojForm input[id='charger_name']").val("");
			
			$("#dlg").dialog("close",true);
		});
	});
			
}
//打开加盟方通用查询模块
function openFprojFranSel(){
	openCommDialog('加盟方资料选择','franController.do?getCommPage&page=fprojFranSel',1000,500,function(){
		openFprojFranSelDlg(function(data){
			$("#fprojDlg input[name='frans_id']").val(data.cmp_id);
			$("#fprojDlg input[name='frans_id']").focus();
			$("#frans_name").val(data.cmp_sname);
			$("#frans_contactor").val(data.cmp_contactor1);
			$("#frans_tel").val(data.cmp_tel1);
			$("#frans_address").val(data.cmp_address);
			$("#dlg").dialog("close",true);
		});
	});
	
}




function openFproj2CompanySel(){
	

	
	openCommDialog('公司资料选择','franController.do?getCommPage&page=cmpSel',1000,500,function(){
		openCompanySelDlg('C',function(data){
			$("#fprojForm input[name='cust_cmp']").val(data.cmp_id);
			$("#fprojForm input[name='cust_cmp']").focus();
			$("#fprojForm input[id='cust_cmp_name']").val(data.cmp_sname);
			$("#fprojForm input[id='cust_cmp_contactor']").val(data.cmp_contactor1);
			$("#fprojForm input[id='cust_cmp_tel1']").val(data.cmp_tel1);
			$("#dlg").dialog("close",true);
		});
	});
	
	
}

function editFproj(){
	optType = 1;
	var rows = simpleFprojDataGrid.datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return false;
	}
	if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return false;
	}
	var row = simpleFprojDataGrid.datagrid('getSelected');
	var pre_regseq = row.pre_regseq;
	$('#fprojForm').form('load','franController.do?loadFprojById&pre_regseq='+pre_regseq);
	simpleFprojDialog.dialog('setTitle','修改');
	simpleFprojDialog.dialog('open');
}

function openEmployeeDeptSel(){
	var dept_id = $('#fprojForm input[name="dept_id"]').val();
	if(dept_id.trim()==''){
		alert("请先选择部门！");
		return;
	}
	
	openCommDialog('雇员资料选择','franController.do?getCommPage&page=empl',1000,500,function(){
		openEmployeesSelDlg(dept_id,function(data){
			$("#fprojForm input[name='charger']").val(data.staff_id);
			$("#fprojForm input[name='charger']").focus();
			$("#charger_name").val(data.staff_name);
			$("#dlg").dialog("close",true);
		});
	});
	
}
