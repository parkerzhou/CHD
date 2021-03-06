<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>
		<div id="deptSelTb"  style="padding: 5px; height: auto;">
			<div>

				<fieldset>
					<legend><h1>部门资料列表</h1></legend>
					<table>
						<tr>
							<td>公司代号或公司名称</td><td>部门代号或部门名称</td>	
						</tr>
						<tr>
							<td><input name="cmp_id_name" id="cmp_id_name" style="width:250px" readonly="readonly"></td><td><input id="dept_id_name" name="dept_id_name" style="width:250px"></td>
							<td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-search'" onClick = "checkDept()">刷新</a></td>
							<td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-ok'" onClick = "chooseDept()">选择</a></td>
						    <td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-cancel'" onClick = "cancelDept()">放弃</a></td>							
						</tr>
					</table>
				</fieldset>
			</div>
		</div>
				<table id="deptDataGrid" class="easyui-datagrid"
					data-options="height:355,singleSelect:true,border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#deptSelTb',pagination:true,pageList:[10,15,20,30,50,100]">
					<thead>
						<tr>
							<th data-options="field:'dept_id',width:150">部门编号</th>
							<th data-options="field:'dept_name',width:250">部门名称</th>
							<th data-options="field:'dept_staff_name',width:250">部门经理</th>
							<th data-options="field:'cmp_id',width:250">公司代码</th>
							<th data-options="field:'dept_cmp_sname',width:250">公司名称</th>
						</tr>
					</thead>
				</table>
<script type="text/javascript">
	//全局变量
	var meth ;
	function openDeptSelDlg(cmp_id,method){
		
		$("#deptSelTb #cmp_id_name").val(cmp_id);
		meth = method;
			simpleFranDataGrid = $('#deptDataGrid').datagrid({
				queryParams:{cmp_id_name:cmp_id,dept_id_name:''},
				url:'franController.do?searchDept',
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
	
     function checkDept(){	
		//获取文本框的值
		var cmp_id_name=$('#cmp_id_name').val();
		var dept_id_name= $('#deptSelTb #dept_id_name').val();
		
		
		    //$("#deptDataGrid").datagrid('reload',{cmp_id_name:cmp_id_name,dept_id_name:dept_id_name});	
			 simpleFranDataGrid = $('#deptDataGrid').datagrid('reload',{cmp_id_name:cmp_id_name,dept_id_name:dept_id_name});	
		
	}
	
	
	
	function cancelDept(){
		$("#cmp_id_name").val("");
		$("#deptSelTb #dept_id_name").val("");
		/* $("#deptDataGrid").datagrid('load',{cmp_id_name:"",dept_id_name:""}); */
		simpleFranDataGrid = $('#deptDataGrid').datagrid('reload',{cmp_id_name:'',dept_id_name:''});
		$("#dlg").dialog("close");
	}
	
	
	function chooseDept(){
		var row = $("#deptDataGrid").datagrid('getSelected');
		meth(row);
		cancelDept();
	}
	
	</script>
</body>
</html>