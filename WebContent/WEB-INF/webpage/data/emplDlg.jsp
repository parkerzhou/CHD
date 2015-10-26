<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>
		<div id="emplTb" style="padding: 5px; height: auto;">
			<div>

				<fieldset>
					<legend><h1>雇员资料列表</h1></legend>
					<table>
						<tr>
							<td>部门代号或部门名称</td>	
							<td>雇员编号或雇员名称</td>
						</tr>
						<tr>
							<td><input id="dept_id_name" style="width:250px"></td>
							<td><input id="staff_id_name"  style="width:250px"></td>
							<td><input type="checkbox" name="" >只抽取在职工人</td>
							<td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-search'" onclick = "checkEmployees()">刷新</a></td>
							<td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-ok'" onclick = "chooseEmployees()">选择</a></td>
						    <td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-cancel'" onclick = "cancelEmployees()">放弃</a></td>							
						</tr>
					</table>
				</fieldset>
			</div>
		</div>
				<table id="employeesDataGrid" class="easyui-datagrid"
					data-options="height:355,singleSelect:true,border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#emplTb',pagination:true,pageList:[10,15,20,30,50,100]">
					<thead>
						<tr>
							<th data-options="field:'staff_id',width:150">雇员编号</th>
							<th data-options="field:'staff_name',width:250">雇员姓名</th>
							<th data-options="field:'staff_dept_name',width:250">所在部门</th>
						</tr>
					</thead>
				</table>
	
	
	
	<script type="text/javascript">
	
 //全局变量
	var meth;
	function openEmployeesSelDlg(dept_id,method){
	    $("#dept_id_name").val(dept_id);
		meth = method;
		simpleComDataGrid = $("#employeesDataGrid").datagrid({
	        queryParams:{employeesDcn:dept_id,employeesScn:""},
			url:'franController.do?checkEmployees',
			loadFilter:pagerFilter,
			
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

	/* $(function(){
		simpleComDataGrid = $("#employeesDataGrid").datagrid({
	        queryParams:{employeesDcn:"",employeesScn:""},
			url:'franController.do?checkEmployees',
			loadFilter:pagerFilter,
			
		});
	}); */
	
	
 	
	function checkEmployees(){	
		//获取文本框的值
		
		var employeesDcn = $('#dept_id_name').val();
		//alert(employeesDcn);
		var employeesScn = $('#staff_id_name').val();
		//alert(employeesScn);
		$("#employeesDataGrid").datagrid('load',{employeesDcn:employeesDcn,employeesScn:employeesScn});	
		
	}

	function cancelEmployees(){
		/* alert("hdhhfh "); */
		$("#dept_id_name").val("");
		$("#staff_id_name").val("");
		$("#employeesDataGrid").datagrid('load',{employeesDcn:"",employeesScn:""});
		$("#dlg").dialog("close");
	}
	

	function chooseEmployees(){
		var row = $("#employeesDataGrid").datagrid('getSelected');
		
		meth(row);
		cancelEmployees();
		
	} 
	
	</script>	
	
</body>
</html>