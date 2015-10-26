<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>
		<div id="fprojFranSelTb" style="padding: 5px; height: auto;">
			<div>

				<fieldset>
					<legend><h1>加盟方资料列表</h1></legend>
					<table>
						<tr>
							<td>加盟方代号或加盟方名称</td>
						</tr>
						<tr>
							<td><input name="fran_id_name" id="fran_id_name" style="width:250px"></td>
							<td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-search'" onClick = "checkFran()">刷新</a></td>
							<td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-ok'" onClick = "chooseFran()">选择</a></td>
						    <td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-cancel'" onClick = "cancelFran()">放弃</a></td>							
						</tr>
					</table>
				</fieldset>
			</div>
		</div>
				<table id="fprojFranDataGrid" class="easyui-datagrid"
					data-options="height:355,singleSelect:true,border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#fprojFranSelTb',pagination:true,pageList:[10,15,20,30,50,100]">
					<thead>
						<tr>
							<th data-options="field:'cmp_id',width:150">加盟方编号</th>
							<th data-options="field:'cmp_sname',width:250">加盟方名称</th>
							<th data-options="field:'cmp_contactor1',width:250">联系人</th>
							<th data-options="field:'cmp_tel1',width:250">联系电话</th>
							<th data-options="field:'cmp_address',width:250">单位地址</th>
						</tr>
					</thead>
				</table>
	</div>
<script type="text/javascript">
	//全局变量
	var meth ;
	function openFprojFranSelDlg(method){
		meth = method;
			
			simpleFranDataGrid = $('#fprojFranDataGrid').datagrid({
				queryParams:{fran_id_name:''},
				url:'franController.do?searchFprojFran',
				loadFilter:pagerFilter
			});
	}

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
/* 
	$(function(){
		simpleComDataGrid = $("#deptDataGrid").datagrid({
	        queryParams:{cmp_id_name:"",dept_id_name:""},
			url:'franController.do?searchDept',
			loadFilter:pagerFilter,
			
		});
	}); */
	
     function checkFran(){	
		//获取文本框的值
		var fran_id_name=$('#fran_id_name').val();
		    //$("#deptDataGrid").datagrid('reload',{cmp_id_name:cmp_id_name,dept_id_name:dept_id_name});	
			 simpleFranDataGrid = $('#fprojFranDataGrid').datagrid('reload',{fran_id_name:fran_id_name});	
		
	}
	
	
	
	function cancelFran(){
		$("#fran_id_name").val("");
		/* $("#deptDataGrid").datagrid('load',{cmp_id_name:"",dept_id_name:""}); */
		simpleFranDataGrid = $('#fprojFranDataGrid').datagrid('reload',{fran_id_name:''});
	}
	
	
	function chooseFran(){
		var row = $("#fprojFranDataGrid").datagrid('getSelected');
		meth(row);
		cancelFran();
	}
	
	</script>
</body>
</html>