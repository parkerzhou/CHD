<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="../base/basePath.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<style type="text/css">
body{
	padding:0px;
	margin:0px;
}
</style>
<script type="text/javascript" src="js/plug-in/jquery/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="js/plug-in/easyui/jquery.easyui.min.js"></script>
<link type="text/css" rel="stylesheet" href="js/plug-in/easyui/themes/icon.css"></link>
<link type="text/css" rel="stylesheet" href="js/plug-in/easyui/themes/default/easyui.css"></link> 
<link type="text/css" rel="stylesheet" href="js/plug-in/easyui/demo/demo.css"></link> 

<script type="text/javascript">

	var myData;//全局变量，用于保存datagrid标题信息
	
	$(function(){
		$('#tb').hide();//在datagrid未显示时,隐藏datagrid表格的按钮栏
	});
	
	//注册参照新增按钮
	$(function(){
		$('#referBtn').bind('click',function(){
			var g = $('#cc').combogrid('grid');	
			var r = g.datagrid('getSelected');
			
			if(r===null){
				alert('你没有选择！');
			}else{
				alert(r.id);
			}
		});
	});

	//注册并处理提交按钮的单击事件
	$(function(){
		$('#submitBtn').bind('click',function(){
			
			var params={};//创建一个空数组，用于存放传递到后台进行处理的参数
			
			var rr=$('#dg').datagrid('getRows');//获取datagrid的所有行
			
			/*
				组织数据思路:获取datagrid的Id(Id为功能在数据库的Id)
				从myData数组第四个对象开始，获取Id(Id为按钮在数据库表的Id)以及datagrid的第一行一列的值
				数据格式为{f_id:[{b_id:value},...],...}
			*/
			//遍历datagrid表格数据及其列数据,组织成后台所需要的数据
			$.each(rr,function(row_index,row_item){
				var funcParam=[];
				 $.each(eval(myData),function(data_index,data_item){
					if(data_index>=3){
						var btnParam={};
						btnParam[data_item.f_butid]=row_item[data_item.f_butMapName];
						funcParam.push(btnParam);
					}		
				});
				params[row_item.fu_id]=funcParam;
				
			});
			
			//将数据发送到后台
			$.post('roleManagerController.do?role_submit',{'data':JSON.stringify(params)});
			
		});
	});

	
	$(function() {
		$('#dgr').datagrid({
			onClickRow : function(rowIndex, rowData) {
				var options={}; 
				$(function(){
				    var myNj = 9;//初始化 
				    $("#dg").datagrid({ 
				        type: 'POST', 
				        nowrap: false, 
				        striped: true, 
				        fit:true, 
				        width:1024, 
				        height:500, 
				        url:'', 
				        pageSize:30,
				        remoteSort: false,
				        rownumbers:true, 
				        singleSelect:true, 
				        queryParams:{ 
				            nj:myNj, 
				            unitType:1 
				        } 
				    });
				    fetchData(rowData.id);
				}); 
			}
		});
	});
</script>


<script type="text/javascript">
	function fetchData(roleId) {
		var s = ""; 
		var d="";
		s = "[["; 
		var b;
		$.get('roleManagerController.do?datagrid_title&roleId='+roleId,function(data){
			myData=data;
			b=eval(data);
			$.each(b,function(index,content){
				d+="{field:'"+content.f_butMapName+"',title:'"+content.f_gridTitle+"',width:"+content.f_wdith+",align:'"+content.f_align+"',hidden:"+content.f_hidden+","+content.f_editor+"},";
			});
			s=s+d;
			s = s + "]]"; 
			options={}; 
			options.url = 'roleManagerController.do?datagrid_data&roleId='+roleId; 
			options.columns = eval(s);
			      
			$('#dg').datagrid(options); 
			$('#dg').datagrid('reload');    
		});	     
	} 
</script>



</head>
<body>
	<div class="easyui-layout" style="width: auto; height: 600px;">
		<div region="west" split="true" title="角色列表" style="width: 200px;">
			<table id="dgr" class="easyui-datagrid" style="height: 600px;"
				data-options="singleSelect:true,collapsible:true,fit:true,url:'roleManagerController.do?role_left'">
				<thead>
					<tr>
						<th data-options="field:'id',align:'center',hidden:true"></th>
						<th data-options="field:'roleCode',align:'center',width:96,editor:{type:'checkbox',options:{on:'v',off:'x'}}">角色代码</th>
						<th data-options="field:'roleName',align:'center',width:96">角色名称</th>
					</tr>
				</thead>
			</table>
		</div>
		<div id="content" region="center" style="padding: 0px;" title="功能权限">
			<div id="pl" class="easyui-panel" data-options="fit:true">
					<table id="dg" toolbar="#tb" data-options="singleSelect:true,onClickCell:onClickCell"></table>
					<div id="tb" style="padding: 5px; height: auto">
						<div>
							参照新增源角色: <select id="cc" class="easyui-combogrid" name="dept"
								style="width: 250px;"
								data-options="
            						idField:'id',   
            						textField:'roleName',   
            						url:'roleManagerController.do?role_left',   
            						columns:[[   
                						{field:'id',title:'id',width:60,hidden:true},   
                						{field:'roleCode',title:'角色代码',width:100},   
                						{field:'roleName',title:'角色名称',width:120},   
            						]]">
							</select> <a id="referBtn" class="easyui-linkbutton" iconCls="icon-search">参照新增</a>
							<a id="submitBtn" class="easyui-linkbutton" iconCls="icon-search">提交</a>
						</div>
					</div>
			</div>
		</div>
	</div>
	
	<script type="text/javascript">
	var l_val = undefined;
    $.extend($.fn.datagrid.methods, {
	    editCell: function(jq,param){
		    return jq.each(function(){
			    var opts = $(this).datagrid('options');
			    var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));

			    for(var i=0; i<fields.length; i++){
				    var col = $(this).datagrid('getColumnOption', fields[i]);
				    col.editor1 = col.editor;
				    if (fields[i] != param.field){
					    	col.editor = null;
			   	 }
				    else {
				    if (l_val == ""){
					    	col.editor = null;
			   	 }
			   	 }
			    }

		    $(this).datagrid('beginEdit', param.index);

		    for(var i=0; i<fields.length; i++){
			    var col = $(this).datagrid('getColumnOption', fields[i]);
			    col.editor = col.editor1;
		    }
	    });
	    }
    });

    var editIndex = undefined;
    function endEditing(){
	    if (editIndex == undefined){return true}

	    if ($('#dg').datagrid('validateRow', editIndex)){
		    $('#dg').datagrid('endEdit', editIndex);
		    editIndex = undefined;
		    return true;
	    } else {
		    return false;
		    }
	    }

    /*单元格单击事件*/
    function onClickCell(index, field , value){
		l_val  = value;
	    if (endEditing()){
		    $('#dg').datagrid('selectRow', index)
		    .datagrid('editCell', {index:index,field:field});
		    editIndex = index;
	    }
    }
		
	</script>
</body>
</html>