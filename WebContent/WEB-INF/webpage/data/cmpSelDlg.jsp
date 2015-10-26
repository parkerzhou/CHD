<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>
		<div id="comTb"  style="padding: 5px; height: auto;">
			<div>

				<fieldset>
					<legend><h1>公司资料列表</h1></legend>
					<table>
						<tr>
							<td>公司代号或公司名称</td>	
						</tr>
						<tr>
							<td><input id="cmp_id_name" style="width:250px"></td>
							<td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-search'" onClick = "checkCompany()">刷新</a></td>
							<td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-ok'" onClick = "chooseCompany()">选择</a></td>
						    <td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-cancel'" onClick = "cancelCompany()">放弃</a></td>							
						</tr>
					</table>
				</fieldset>
			</div>
		</div>
				<table id="companyDataGrid" class="easyui-datagrid"
					data-options="height:355,singleSelect:true,border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#comTb',pagination:true,pageList:[10,15,20,30,50,100]">
					<thead>
						<tr>
							<th data-options="field:'cmp_id',width:150">公司代号</th>
							<th data-options="field:'cmp_sname',width:250">公司名称</th>
							<th data-options="field:'cmp_parent_sname',width:250">所属公司</th>
						</tr>
					</thead>
				</table>
	<script type="text/javascript">
	
	//全局变量
	var preCmp='';
	var meth;
	
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
	
	
	function openCompanySelDlg(pre,method){
		preCmp=pre;
		simpleComDataGrid = $("#companyDataGrid").datagrid({
			queryParams:{companyCn:"",preCmp:preCmp},
			url:'franController.do?searchCompany',
			loadFilter:pagerFilter,
			
		});
		meth = method;
	}
	
	
	
	
function checkCompany(){	
		//获取文本框的值
		var companyCn = $('#cmp_id_name').val();	
		/* var companyUrl = 'franController.do?searchCompany'; */
		$("#companyDataGrid").datagrid('load',{companyCn:companyCn,preCmp:preCmp});	
		
	}
	
	
	
	function cancelCompany(){
		$("#cmp_id_name").val("");
		$("#companyDataGrid").datagrid('load',{companyCn:"",preCmp:preCmp});
		$("#dlg").dialog("close");
	}
	
	
	function chooseCompany(){
		var row = $("#companyDataGrid").datagrid('getSelected');
		meth(row);
		cancelCompany();
	}
	
	</script>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
</body>
</html>