
var area_Type = 1;

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
	//创建并初始化拜访管理基本信息表格对象
	areaDataGrid = $('#areaDataGrid').datagrid({
		url:'commController.do?getAreaInfo',
		queryParams:{owner_zone:'',zone_type:''},
		loadFilter:pagerFilter
	});
	
	areaDialog = $('#areaDlg').dialog({
		onBeforeClose:function(){
			areaDataGrid.datagrid('reload',{owner_zone:'',zone_type:''});
			$("#country").combobox('setValue','');
			$("#country").combobox('setValue','');
			$("#country").combobox('setValue','');
			$("#country").combobox('setValue','');
		}
	});
	
	country = $("#country").combobox({
		url:'commController.do?getZoneComboInfos&zone_type=1',
		valueField:'id',
		textField:'text',
		onSelect:function(rec){
			alert("nihao");
			area_Type = 2;
			$("#province").combobox('reload','commController.do?getZoneComboInfos&owner_zone='+rec.id);
			$("#province").combobox('setValue','ALL[所有]');
			$("#province").combobox('enable');
			$("#city").combobox('setValue','');
			$("#city").combobox('disable');
			$("#county").combobox('setValue','');
			$("#county").combobox('disable');
			if(rec.id=='ALL[所有]'){
				area_Type=1
				areaDataGrid.datagrid('reload',{owner_zone:'',zone_type:''});
				$("#province").combobox('setValue','');
				$("#province").combobox('disable');
				return;
			}
			areaDataGrid.datagrid('reload',{owner_zone:rec.id,zone_type:1});
		},
		width:160
	});
	
	province = $("#province").combobox({
		url:'commController.do?getZoneComboInfos&zone_type=2',
		valueField:'id',
		textField:'text',
		disabled:true,
		onSelect:function(rec){
			//alert(rec.id);
			area_Type = 3;
			$("#city").combobox('reload','commController.do?getZoneComboInfos&owner_zone='+rec.id);
			$("#city").combobox('setValue','ALL[所有]');
			$("#city").combobox('enable');
			$("#county").combobox('setValue','');
			$("#county").combobox('disable');
			if(rec.id=='ALL[所有]'){
				area_Type=2;
				areaDataGrid.datagrid('reload',{owner_zone:$("#country").combobox('getValue'),zone_type:1});
				$("#city").combobox('setValue','');
				$("#city").combobox('disable');
				$("#county").combobox('setValue','');
				$("#county").combobox('disable');
				return;
			}
			areaDataGrid.datagrid('reload',{owner_zone:rec.id,zone_type:2});
		},
		width:160
	});
	
	city = $("#city").combobox({
		url:'commController.do?getZoneComboInfos&zone_type=3',
		valueField:'id',
		textField:'text',
		disabled:true,
		onSelect:function(rec){
			//alert(rec.id);
			area_Type = 4;
			$("#county").combobox('reload','commController.do?getZoneComboInfos&owner_zone='+rec.id);
			$("#county").combobox('setValue','ALL[所有]');
			$("#county").combobox('enable');
			if(rec.id=='ALL[所有]'){
				area_Type=3;
				areaDataGrid.datagrid('reload',{owner_zone:$("#province").combobox('getValue'),zone_type:1});
				$("#county").combobox('setValue','');
				$("#county").combobox('disable');
				return;
			}
			areaDataGrid.datagrid('reload',{owner_zone:rec.id,zone_type:3});
		},
		width:160
	});
	
	county = $("#county").combobox({
		url:'commController.do?getZoneComboInfos&zone_type=4',
		valueField:'id',
		textField:'text',
		disabled:true,
		onSelect:function(rec){
			area_Type = 5;
			if(rec.id=='ALL[所有]'){
				area_Type=4;
				areaDataGrid.datagrid('reload',{owner_zone:$("#city").combobox('getValue'),zone_type:1});
				return;
			}
			areaDataGrid.datagrid('reload',{owner_zone:rec.id,zone_type:4});
		},
		width:160
	});
});

function conAreaSel(){
	var rows = areaDataGrid.datagrid('getSelections');
	if(rows.length==0){
		
	}else{
		if(area_Type==1){
			$("#franDlg input[name='cmp_country']").val(rows[0].zone_id);
			$("#franDlg input[name='cmp_country_name']").val(rows[0].zone_name);
		}else if(area_Type==2){
			$("#franDlg input[name='cmp_province']").val(rows[0].zone_id);
			$("#franDlg input[name='cmp_province_name']").val(rows[0].zone_name);
		}else if(area_Type==3){
			$("#franDlg input[name='cmp_city']").val(rows[0].zone_id);
			$("#franDlg input[name='cmp_city_name']").val(rows[0].zone_name);
		}else if(area_Type==4){
			$("#franDlg input[name='cmp_county']").val(rows[0].zone_id);
			$("#franDlg input[name='cmp_county_name']").val(rows[0].zone_name);
		}else if(area_Type==5){
			$("#franDlg input[name='cmp_town']").val(rows[0].zone_id);
			$("#franDlg input[name='cmp_town_name']").val(rows[0].zone_name);
		}
		areaDialog.dialog('close',true);
	}
}

function openAreaSelDlg(data){
	alert(data.province_name);
	$("#franDlg").dialog('open');
}