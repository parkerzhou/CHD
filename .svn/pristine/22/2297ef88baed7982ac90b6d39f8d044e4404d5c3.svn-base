<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title></title>
</head>
<body>
	<div id="fprojTb" style="padding: 5px; height: auto;">
	<div>

			<fieldset>
				<legend>
					<h1>选择加盟工程</h1>
				</legend>
				<table>
					<tr>
						<td>加盟方</td>
						<td><input id="frans_id" style="width: 250px"><input
							type="hidden" id="filterStr"></td>
						<td><a id="tenderSelBtn" href="javascript:void(0)" class="easyui-linkbutton"
							style="margin-left: 20px" data-options="iconCls:'icon-search'"
							onClick="checkFProj()">查询</a></td>
						<td><a href="javascript:void(0)" class="easyui-linkbutton"
							style="margin-left: 20px" data-options="iconCls:'icon-ok'"
							onClick="chooseFProj()">选择</a></td>
					</tr>
				</table>
			</fieldset>
		</div>	
	</div>
	<table id="fprojDataGrid" class="easyui-datagrid"
		data-options="singleSelect:true,border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#fprojTb',pagination:true,pageList:[10,15,20,30,50,100]">
		<thead>
			<tr>
				<th data-options="field:'pre_no',width:120">预审编号</th>
				<th data-options="field:'reg_date',width:80">登记日期</th>
				<th data-options="field:'proj_name',width:80">工程名称</th>
				<th data-options="field:'proj_sname',width:60">工程简称</th>
				<th data-options="field:'cust_cmp',width:120">顾客公司</th>
				<th data-options="field:'fran_sname',width:80">加盟方</th>
				<th data-options="field:'proj_type',width:60">项目类型</th>
			</tr>
		</thead>
	</table>
	<script>
		var meth;
		function openFprojSelDlg(callback, filterStr) {
			if (filterStr != undefined) {
				$("#filterStr").val(filterStr);
			}
			meth = callback;
			/* var rows = $("#tenderDataGrid").datagrid('getData');
			var pre_regseq = rows.pre_regseq;
			 
			
			alert(pre_regseq);
			 */
			
			$("#fprojDataGrid").datagrid({
				queryParams : {
					cmp_id : $("#frans_id").val(),
					filterStr : filterStr
				},
				url : "franController.do?searchFproj",
				loadFilter : pagerFilter
			});
		}

		//数据过滤器
		function pagerFilter(data) {
			if (typeof data.length == 'number'
					&& typeof data.splice == 'function') {
				data = {
					total : data.length,
					rows : data
				};
			}
			var dg = $(this);
			var opts = dg.datagrid('options');
			var pager = dg.datagrid('getPager');
			pager.pagination({
				onSelectPage : function(pageNum, pageSize) {
					opts.pageNumber = pageNum;
					opts.pageSize = pageSize;
					pager.pagination('refresh', {
						pageNumber : pageNum,
						pageSize : pageSize
					});
					dg.datagrid('uncheckAll');
					dg.datagrid('loadData', data);
				},
				onBeforeRefresh : function() {
					dg.datagrid('load');
				}
			});
			if (!data.originalRows) {
				data.originalRows = (data.rows);
			}
			var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
			var end = start + parseInt(opts.pageSize);
			data.rows = (data.originalRows.slice(start, end));
			return data;
		}

		function checkFProj() {
			//获取文本框的值
			$('#fprojDataGrid').datagrid('reload', {
				cmp_id : $('#fprojTb #frans_id').val(),
				filterStr : $("#filterStr").val()
			});

		}

		function chooseFProj() {
			meth($('#fprojDataGrid').datagrid("getSelected"));
		}
	</script>

</body>
</html>