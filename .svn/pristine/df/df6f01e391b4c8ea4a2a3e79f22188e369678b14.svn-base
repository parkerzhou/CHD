<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>加盟工程项目登记</title>
<%@ include file = "../comm/comm_ui.jsp" %>
<script type="text/javascript" src="js/plug-in/comm/validtypeExtend.js"></script> 
<script type = "text/javascript" src = "js/plug-in/comm/fproj.js"></script>
<script type = "text/javascript" src = "js/plug-in/tools/json2.js"></script>
<script type="text/javascript" src="js/plug-in/comm/commDialog.js"></script>
	<script>
		$(function(){

			$.ajax({
				url:'commController.do?checkFuncBtn&fuId=${currFunc.id}',
				dataType:'text',
				success:function(result){
					var tb=$('#fprojTb');
					var v=result.split(',');
					setButton(tb.find('.easyui-linkbutton').first(),v[0]);
					setButton(tb.find('.easyui-linkbutton').eq(1),v[1]);
					setButton(tb.find('.easyui-linkbutton').eq(2),v[2]);
					if(v[1] == 0){
						editable = false;
					}else{
						editable = true;
					}
				}
			});
		});
		
		function setButton(btn,opt){
			if(opt==1){
				btn.linkbutton('enable');
			}else if(opt==0){
				btn.linkbutton('disable');
			}
		}
		function form(formtype){
			window.location.href = 'franController.do?GetPDForEXCEL&formtype='+formtype+'&name=franchisee';
		}
	</script>
</head>
<body>
<div id="dlg"></div>
<div id = "fprojTb" style = "padding:5px;height:auto">
		<div id="tb" style = "margin-bottom:5px;">
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-add" onclick = "addFproj()">新增</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-edit" onclick = "editFproj()">修改</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-remove" onclick = "delFproj()">删除</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-print" onclick = "formFproj(0)">报表</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-print" onclick = "formFproj(1)">输出至EXCEL</a>
			
			
			
		</div>
</div>
<div id="fprojLayout" class="easyui-layout" data-options = "fit:true" style="width:900px;height:450px;">     
    <div data-options="region:'center'">
    	<table id = "fprojDataGrid" class = "easyui-datagrid" style = "width:400px;height:250px;"
    			data-options = "border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#fprojTb',pagination:true,pageList:[10,15,20,30,50,100]">
	    	<thead>
		    	<tr>
		    	 <th data-options="field:'pre_regseq',hidden:true"></th>  
		    	 <th data-options="field:'pre_no',width:100">预审编号</th>   
                 <th data-options="field:'reg_date',width:100">登记日期</th>   
                 <th data-options="field:'proj_name',width:100">工程名称</th>
                 <th data-options="field:'proj_sname',width:100">工程简称</th> 
                 <th data-options="field:'cust_cmp_name',width:100">顾客公司</th> 
                 <th data-options="field:'frans_id_name',width:100">加盟方</th>
                 <th data-options="field:'proj_type',width:100">项目类型</th>      
		    	</tr>
	    	</thead>
    	</table>
    	
    	
    	<%@ include file = "fprojDlg.jsp" %>
   
    	
    </div>
</div>



</body>
</html>