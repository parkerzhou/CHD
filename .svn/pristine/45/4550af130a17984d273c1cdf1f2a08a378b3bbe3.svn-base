<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>
		<div id="franProTb"  style="padding: 5px; height: auto;">
			<div>
					<table>
						<tr>
						    <td>加盟方</td>
							<td><input id="franProj" name="franPro" type="hidden" />
							<input id="frans_id" name="frans_id" type="text" style="width:250px">
							<input id="filterStr" name="filterStr" type="hidden" /></td>
							<td><a id="checkFranPro" href = "javascript:void(0)" class = "easyui-linkbutton" style="margin-left:20px" data-options = "iconCls:'icon-search'" onClick = "checkFranPro()">查詢</a></td>
						</tr>
					</table>
				
			</div>
		</div>
				<table id="franProDataGrid" class="easyui-datagrid" 
					data-options="singleSelect:true,border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#franProTb',pagination:true,pageList:[10,15,20,30,50,100]">
					<thead>
						<tr>
							<th data-options="field:'proj_no',width:50">工程編號</th>
							<th data-options="field:'proj_name',width:100">工程名稱</th>
							<th data-options="field:'proj_sname',width:100">簡稱</th>
							<th data-options="field:'cmp_sname',width:100">加盟方</th>
							<th data-options="field:'WORK_SDATE',width:100">開工日期</th>
							<th data-options="field:'WORK_EDATE',width:100">竣工日期</th>
							<th data-options="field:'compact_amt',width:100">合同價</th>
							<th data-options="field:'sd_money',width:100">買定價</th>
						</tr>
					</thead>
				</table>
	<script type="text/javascript">
	
	//全局变量
//	var franProj;
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
	var count = -1;
	function openFranProDlg(franProj,method,filterStr){
		$("#franProj").val(franProj);
		$("#filterStr").val(filterStr);
		simpleFranProDataGrid = $("#franProDataGrid").datagrid({
			url:'franController.do?searchFranPro',
			queryParams:{franPro:$("#franProj").val(),filterStr:$("#filterStr").val()},
			loadFilter:pagerFilter,
			onDblClickRow:function(rowIndex,rowData){
				method(rowData);
			},
			onLoadSuccess:function(data){
				if(count==0){
					checkFranPro();
					count=-1;
				}else{
					count++;
				}
			}
		});
		meth = method;
	}
	function checkFranPro(){	
		//获取文本框的值
		var frans_id = $('#frans_id').val();	
		//alert(franPro);
		/* var companyUrl = 'franController.do?searchCompany'; */
		$("#franProDataGrid").datagrid('reload',{frans_id:frans_id,franPro:$("#franProj").val(),filterStr:$("#filterStr").val()});	
		
	}
	
	
	
//	function cancelCompany(){
//		$("#cmp_id_name").val("");
//		$("#companyDataGrid").datagrid('load',{companyCn:"",preCmp:preCmp});
//	}
//	
//	
//	function chooseCompany(){
//		var row = $("#companyDataGrid").datagrid('getSelected');
//		meth(row);
//		cancelCompany();
//	} 
	
	</script>
	
	
	
	
	
	
	
	
	
	
</body>
</html>