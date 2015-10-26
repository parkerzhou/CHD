<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>

<div id="areaTb"  style="padding: 5px; height: auto;">
			<div>

				<fieldset>
					<legend>所属区域</legend>
					<table>
						<tr>
							<td>国家</td>
							<td>省、直辖市、自治区</td>
							<td>市</td>
							<td>县、县级市</td>
						</tr>
						<tr>
							<td><input id="country" editable="false"></td>
							<td><input id="province" editable="false"></td>
							<td><input id="city" editable="false"></td>
							<td><input id="county" editable="false">
								<a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-ok'" onClick = "conAreaSel()">确定</a></td>
						</tr>
					</table>
				</fieldset>
			</div>
		</div>
      
				<table id="areaDataGrid" class="easyui-datagrid"
					data-options="height:442,singleSelect:true,border:0,rownumbers:true,fitColumns:true,fit:false,toolbar:'#areaTb',pagination:true,pageList:[10,15,20,30,50,100]">
					<thead>
						<tr>
							
							<th data-options="field:'zone_id',width:150">代号</th>
							<th data-options="field:'zone_name',width:250">名称</th>
							<th data-options="field:'zone_sname',width:250">简称</th>
							<th data-options="field:'owner_zone_name',width:250">上一行政级别</th>
							<th data-options="field:'level_name',width:150">城市级别</th>
						</tr>
					</thead>
				</table>

<script>

var area_Type = 1;

var meth;

var count = -1;

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

(function(){
	
	areaDataGrid = $('#areaDataGrid').datagrid({
		url:'commController.do?getAreaInfo',
		loadFilter:pagerFilter,
		onLoadSuccess:function(data){
		}
	});
	country = $("#country").combobox({
		url:'commController.do?getZoneComboInfos&zone_type=1',
		valueField:'id',
		textField:'text',
		onSelect:function(rec){
			//alert(rec.id);
			area_Type = 2;
			$("#province").combobox('reload','commController.do?getZoneComboInfos&owner_zone='+rec.id);
			$("#province").combobox('setValue','ALL[所有]');
			$("#province").combobox('enable');
			$("#city").combobox('setValue','');
			$("#city").combobox('disable');
			$("#county").combobox('setValue','');
			$("#county").combobox('disable');
			if(rec.id=='ALL[所有]'){
				area_Type=1;
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
	
})();

//确定按钮
function conAreaSel(){
	
	var rows = areaDataGrid.datagrid('getSelections');
	if(rows.length==0){
		/* $("#franDlg input[name='cmp_country']").val('');
		$("#franDlg input[name='cmp_province']").val('');
		$("#franDlg input[name='cmp_city']").val('');
		$("#franDlg input[name='cmp_county']").val('');
		$("#franDlg input[name='cmp_town']").val('');
		
		$("#franDlg input[id='cmp_country_name']").val('');
		$("#franDlg input[id='cmp_province_name']").val('');
		$("#franDlg input[id='cmp_city_name']").val('');
		$("#franDlg input[id='cmp_county_name']").val('');
		$("#franDlg input[id='cmp_town_name']").val(''); */
	}else{
		/* $("#franDlg input[name='cmp_country']").val('');
		$("#franDlg input[name='cmp_province']").val('');
		$("#franDlg input[name='cmp_city']").val('');
		$("#franDlg input[name='cmp_county']").val('');
		$("#franDlg input[name='cmp_town']").val('');
		
		$("#franDlg input[id='cmp_country_name']").val('');
		$("#franDlg input[id='cmp_province_name']").val('');
		$("#franDlg input[id='cmp_city_name']").val('');
		$("#franDlg input[id='cmp_county_name']").val('');
		$("#franDlg input[id='cmp_town_name']").val(''); */
		
		var zone_data = {"country":"","country_name":"","province":"","province_name":"","city":"","city_name":"","county":"","county_name":"","town":"","town_name":""};
		
		if(area_Type==1){
			zone_data.country=rows[0].zone_id;
			zone_data.country_name=rows[0].zone_name;
		}else if(area_Type==2){
			
			zone_data.country=country.combobox('getValue');
			zone_data.country_name=country.combobox('getText');
			
			zone_data.province=rows[0].zone_id;
			zone_data.province_name=rows[0].zone_name;
		}else if(area_Type==3){
			
			zone_data.country=country.combobox('getValue');
			zone_data.country_name=country.combobox('getText');
			
			zone_data.province=province.combobox('getValue');
			zone_data.province_name=province.combobox('getText');
			
			zone_data.city=rows[0].zone_id;
			zone_data.city_name=rows[0].zone_name;
		}else if(area_Type==4){
			
			zone_data.country=country.combobox('getValue');
			zone_data.country_name=country.combobox('getText');
			
			zone_data.province=province.combobox('getValue');
			zone_data.province_name=province.combobox('getText');
			
			zone_data.city=city.combobox('getValue');
			zone_data.city_name=city.combobox('getText');
			
			zone_data.county=rows[0].zone_id;
			zone_data.county_name=rows[0].zone_name;
		}else if(area_Type==5){
			
			zone_data.country=country.combobox('getValue');
			zone_data.country_name=country.combobox('getText');
			
			zone_data.province=province.combobox('getValue');
			zone_data.province_name=province.combobox('getText');
			
			zone_data.city=city.combobox('getValue');
			zone_data.city_name=city.combobox('getText');
			
			zone_data.county=county.combobox('getValue');
			zone_data.county_name=county.combobox('getText');
			
			zone_data.town=rows[0].zone_id;
			zone_data.town_name=rows[0].zone_name;
		}
		canAreaSel();
		meth(zone_data);
	}
}
//打开区域选择对话框
function openAreaSelDlg(data,method){
	meth = method;
	$("#dlg").dialog('open');
	//alert(data.country);
	if(data.country.trim()==''){
		return;
	}
	if(data.country.trim()!=''){
		country.combobox('setValue',data.country);
		area_Type = 2;
		$("#province").combobox('reload','commController.do?getZoneComboInfos&owner_zone='+data.country.trim());
		$("#province").combobox('setValue','ALL[所有]');
		$("#province").combobox('enable');
		$("#city").combobox('setValue','');
		$("#city").combobox('disable');
		$("#county").combobox('setValue','');
		$("#county").combobox('disable');
	}
	if(data.province.trim()!=''){
		province.combobox('setValue',data.province.trim());
		area_Type = 3;
		$("#city").combobox('reload','commController.do?getZoneComboInfos&owner_zone='+data.province);
		$("#city").combobox('setValue','ALL[所有]');
		$("#city").combobox('enable');
		$("#county").combobox('setValue','');
		$("#county").combobox('disable');
	}
	if(data.city.trim()!=''){
		city.combobox('setValue',data.city.trim());
		area_Type = 4;
		$("#county").combobox('reload','commController.do?getZoneComboInfos&owner_zone='+data.city);
		$("#county").combobox('setValue','ALL[所有]');
		$("#county").combobox('enable');
	}
	if(data.county.trim()!=''){
		county.combobox('setValue',data.county.trim());
		area_Type = 5;
	}
	if(area_Type==2){
		$("#areaDataGrid").datagrid({
			url:'commController.do?getAreaInfo',
			queryParams:{owner_zone:data.country,zone_type:1},
			loadFilter:pagerFilter
		});
	}else if(area_Type==3){
		$("#areaDataGrid").datagrid({
			url:'commController.do?getAreaInfo',
			queryParams:{owner_zone:data.province,zone_type:2},
			loadFilter:pagerFilter
		});
	}else if(area_Type==4){
		$("#areaDataGrid").datagrid({
			url:'commController.do?getAreaInfo',
			queryParams:{owner_zone:data.city,zone_type:3},
			loadFilter:pagerFilter
		});
	}else if(area_Type==5){
		$("#areaDataGrid").datagrid({
			url:'commController.do?getAreaInfo',
			queryParams:{owner_zone:data.county,zone_type:4},
			loadFilter:pagerFilter
		});
	}
}


//取消区域选择
function canAreaSel(){
  country.combobox('setValue','ALL[所有]');
  areaDataGrid.datagrid('reload',{owner_zone:'',zone_type:''});

	$("#province").combobox('setValue','');
	$("#province").combobox('disable');
	$("#city").combobox('setValue','');
	$("#city").combobox('disable');
	$("#county").combobox('setValue','');
	$("#county").combobox('disable');
  
  
}

</script>

</body>
</html>