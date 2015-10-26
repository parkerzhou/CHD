<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>基础资料维护</title>
<%@ include file = "../comm/comm_ui.jsp" %>
<script type="text/javascript" src="js/plug-in/comm/validtypeExtend.js"></script> 
<script type = "text/javascript" src = "js/plug-in/comm/basicQua.js"></script>
<script type = "text/javascript" src = "js/plug-in/tools/json2.js"></script>
<script type = "text/javascript" src = "js/plug-in/comm/fran.js"></script>
<script>
		$(function(){
			checkPrivilege("basicQuaTb");
			checkPrivilege("basicCerTb");
			checkPrivilege("basicExcTb");
		});
		
		function checkPrivilege(tbID){
			$.ajax({
				url:'commController.do?checkFuncBtn&fuId=${currFunc.id}',
				dataType:'text',
				success:function(result){
					var tb=$('#'+tbID);
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
		}
		
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
<div id="basicTab" class="easyui-tabs"  style="width:500px;height:250px;" data-options="fit:true"> 
    <div title="公司资质资料">   
      <div id = "basicQuaTb" style = "padding:5px;height:auto">
		<div id="tb" style = "margin-bottom:5px;">
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-add" onclick = "addBasicQua()">新增</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-edit" onclick = "editBasicQua()">修改</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-remove" onclick = "delBasicQua()">删除</a>
		</div>
      </div>
    		<table id = "basicQuaDataGrid" class = "easyui-datagrid" style = "width:400px;height:250px;"
    			data-options = "border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#basicQuaTb',pagination:true,pageList:[10,15,20,30,50,100]">
	    		<thead>
		    	<tr>
		    	 <th data-options="field:'LINE_NO',width:100">序号</th>   
                 <th data-options="field:'D_NAME',width:100">资质名称</th>    
		    	</tr>
	    		</thead>
    		</table>	
	</div>        

<div title="证书资料" >   
       <div id = "basicCerTb" style = "padding:5px;height:auto">
		<div id="ctb" style = "margin-bottom:5px;">
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-add" onclick = "addBasicCer()">新增</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-edit" onclick = "editBasicCer()">修改</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-remove" onclick = "delBasicCer()">删除</a>
		</div>
      </div>
  	  
    		<table id = "basicCerDataGrid" class = "easyui-datagrid" style = "width:400px;height:250px;"
    			data-options = "border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#basicCerTb',pagination:true,pageList:[10,15,20,30,50,100]">
	    		<thead>
		    	<tr>
		    	 <th data-options="field:'LINE_NO',width:100">序号</th>   
                 <th data-options="field:'D_NAME',width:100">证件名称</th>    
		    	</tr>
	    		</thead>
    		</table>	
</div>   

<div title="扣除事项定义" >   
       <div id = "basicExcTb" style = "padding:5px;height:auto">
		<div id="etb" style = "margin-bottom:5px;">
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-add" onclick = "addBasicExc()">新增</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-edit" onclick = "editBasicExc()">修改</a>
			<a href = "javascript:void(0)" class = "easyui-linkbutton" iconCls = "icon-remove" onclick = "delBasicExc()">删除</a>
		</div>
      </div>
  	  
    		<table id = "basicExcDataGrid" class = "easyui-datagrid" style = "width:400px;height:250px;"
    			data-options = "border:0,rownumbers:true,fitColumns:true,fit:true,toolbar:'#basicExcTb',pagination:true,pageList:[10,15,20,30,50,100]">
	    		<thead>
		    	<tr>
		    	 <th data-options="field:'LINE_NO',width:100">序号</th>   
                 <th data-options="field:'D_NAME',width:100">扣除事项</th>    
		    	</tr>
	    		</thead>
    		</table>	
</div>   




    
</div>  

<jsp:include  page="basicQua.jsp"/>

<jsp:include  page="basicCer.jsp" />

<jsp:include  page="basicExc.jsp" />











</body>
</html>