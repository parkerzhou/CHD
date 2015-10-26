<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>
			<div id="projTb" style="padding: 5px; height: auto;">
			<div>

				<fieldset>
					<legend><h1>选择加盟工程</h1></legend>
					<table>
						<tr>
							<td>加盟方</td>
							<td><input id="frans_id" style="width:250px"><input type="hidden" id="filterStr" ></td>
							<td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-search'" onClick = "checkProj()">查询</a></td>
							<td><a href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-ok'" onClick = "chooseProj()">选择</a></td>
						</tr>
					</table>
				</fieldset>
			</div>
		</div>
				<table id="projDataGrid" class="easyui-datagrid"
					data-options="height:355,singleSelect:true,border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#projTb',pagination:true,pageList:[10,15,20,30,50,100]">
					<thead>
						<tr>
							<th data-options="field:'proj_id',width:150">工程编号</th>
							<th data-options="field:'proj_name',width:250">工程名称</th>
							<th data-options="field:'work_sdate',width:250">开工日期</th>
							<th data-options="field:'work_edate',width:250">竣工日期</th>
						</tr>
					</thead>
				</table>
	<script type="text/javascript">
 //全局变量
	var meth;
	function openAgreesSelDlg(method,param){
		meth = method;
		//alert(param);
		if(param!=undefined){
			$("#filterStr").val(param);
		}
		simpleComDataGrid = $("#projDataGrid").datagrid({
	        queryParams:{frans_id:"",filterStr:param},
			url:'franController.do?checkProj',
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
		simpleComDataGrid = $("#projDataGrid").datagrid({
	        queryParams:{frans_id:"",agreesScn:""},
			url:'franController.do?checkProj',
			loadFilter:pagerFilter,
			
		});
	}); */
	
	
 	
	function checkProj(){	
		//获取文本框的值
		
		var frans_id = $('#frans_id').val();
		//alert(frans_id);
		//alert(agreesScn);
		$("#projDataGrid").datagrid('load',{frans_id:frans_id,filterStr:$("#filterStr").val()});	
		
	}

	function cancelProj(){
		/* alert("hdhhfh "); */
		$("#frans_id").val("");
		$("#projDataGrid").datagrid('load',{frans_id:""});
	}
	

	function chooseProj(){
		var row = $("#projDataGrid").datagrid('getSelected');
		
		meth(row);
		cancelProj();
		
	} 
	
	</script>
	
</body>
</html>