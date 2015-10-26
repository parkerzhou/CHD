<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>加盟方信息维护</title>
<%@ include file = "../comm/comm_ui.jsp" %>
<script type="text/javascript" src="js/plug-in/comm/validtypeExtend.js"></script> 
<script type = "text/javascript" src = "js/plug-in/comm/fran.js"></script>
<script type = "text/javascript" src = "js/plug-in/tools/json2.js"></script>
<script type="text/javascript" src="js/plug-in/comm/commDialog.js"></script>
	<script>
		$(function(){

			$.ajax({
				url:'commController.do?checkFuncBtn&fuId=${currFunc.id}',
				dataType:'text',
				success:function(result){
					var tb=$('#franTb');
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
	</script>
</head>
<body>
<div id="dlg" ></div>
<div id = "franTb" style = "padding:5px;height:auto">
		<div id="tb" style = "margin-bottom:5px;">
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-add" onclick = "addFran()">新增</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-edit" onclick = "editFran()">修改</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-remove" onclick = "delFran()">删除</a>
		</div>
</div>
<div id="franLayout" class="easyui-layout" data-options = "fit:true" style="width:900px;height:450px;">     
    <div data-options="region:'center'">
    	<table id = "franDataGrid" class = "easyui-datagrid" style = "width:400px;height:250px;"
    			data-options = "border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#franTb',pagination:true,pageList:[10,15,20,30,50,100]">
	    	<thead>
		    	<tr>
		    	 <th data-options="field:'cmp_id',width:100">加盟商代号</th>   
                 <th data-options="field:'cmp_sname',width:100">简称</th>   
                 <th data-options="field:'cmp_name',width:100">全称</th>
                 <th data-options="field:'cmp_craft_name',width:100">公司行业</th> 
                 <th data-options="field:'cmp_charger',width:100">法人代表</th> 
                 <th data-options="field:'cmp_address',width:100">地址</th>   
		    	</tr>
	    	</thead>
    	</table>
    	
    	<%@ include file = "franDlg.jsp" %>
    	
    </div>
</div>




</body>
</html>