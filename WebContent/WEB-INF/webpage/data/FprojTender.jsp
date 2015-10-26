<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>加盟工程项目管理协议</title>
<%@ include file = "../comm/comm_ui.jsp" %>
<script type="text/javascript" src="js/plug-in/comm/validtypeExtend.js"></script> 
<script type = "text/javascript" src = "js/plug-in/comm/fprojTender.js"></script>
<script type = "text/javascript" src = "js/plug-in/tools/json2.js"></script>
<script type="text/javascript" src="js/plug-in/comm/commDialog.js"></script>

<script>
		$(function(){

			$.ajax({
				url:'commController.do?checkFuncBtn&fuId=${currFunc.id}',
				dataType:'text',
				success:function(result){
					var tb=$('#tenderTb');
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

<div id = "tenderTb" style = "padding:5px;height:auto">
		<div id="tb" style = "margin-bottom:5px;">
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-add" onclick = "addTender()">新增</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-edit" onclick = "editTender()">修改</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-remove" onclick = "delTender()">删除</a>
		</div>
</div>
<div id="tenderLayout" class="easyui-layout" data-options = "fit:true" style="width:900px;height:450px;">     
    <div data-options="region:'center'">
    	<table id = "tenderDataGrid" class = "easyui-datagrid" style = "width:400px;height:250px;"
    			data-options = "border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#tenderTb',pagination:true,pageList:[10,15,20,30,50,100]">
	    	<thead>
		    	<tr>
		    	 <th data-options="field:'PRE_REGSEQ',width:100,hidden:true"></th>
		    	 <th data-options="field:'PRE_NO',width:120">预审编号</th>   
                 <th data-options="field:'REG_DATE',width:80">登记日期</th>   
                 <th data-options="field:'PROJ_NAME',width:80">工程名称</th>
                 <th data-options="field:'PROJ_SNAME',width:60">工程简称</th> 
                 <th data-options="field:'C_NAME',width:120">顾客公司</th> 
                 <th data-options="field:'J_NAME',width:80">加盟方</th> 
                 <th data-options="field:'FILE_DATE',width:120">领取招标文件日期</th> 
                 <th data-options="field:'TENDER_DATE',width:80">投标日期</th>
		    	</tr>
	    	</thead>
    	</table>
    	<jsp:include page = "FprojTenderDlg.jsp" ></jsp:include>
    
    </div>
</div>
</body>
</html>