var roleGrpOptType=-1;//操作类型 0表示新增 1表示修改,默认值为-1
var userGrpCodeVali;

var fTimeBackup='';
var sTimeBackup='';
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

$(function() {
	userReplDataGrid = $('#userReplDataGrid').datagrid({
		
		columns : [[
					{field : 'ck', checkbox : true},
					{field : 'ur_id', title : 'ID', hidden : true}, 
				   	{field : 'ur_beRepl', title : '旧用户', width : 20}, 
				   	{field : 'oldNickName', title : '旧用户ID', hidden : true}, 
					{field : 'ur_replace', title : '新用户', width : 20},
					{field : 'newNickName', title : '新用户ID', hidden : true}, 
				   	{field : 'ur_replDate', title : '生效时间', width : 20}, 
				  	{field : 'ur_OperUserid', title : '操作人', width : 20},
				   	{field : 'ur_opDate', title : '操作时间', width : 20}
				]],
				rownumbers : true,
				checkOnSelect : true, 
				selectOnCheck : true, 
				singleSelect : false,
				method : 'get',
				toolbar : '#userReplTools',
				autoRowHeight : false,
				pagination : true,
				pageSize : 10,  
				fit : true, 
				fitColumns : true, 
				//data:initData,
				onDblClickRow:function(rowIndex, row){
					roleGrpOptType=1;	
					// 为新增/修改窗口的的新用户 载入数据
					$('#oldUser').combogrid({    
					    delay: 500,    
					    mode: 'remote',    
					    url: 'ummReplController.do?getuser',    
					    idField: 'us_nickName',   
					    textField: 'us_userName',    
					    columns: [[    
					        {field:'us_nickName',title:'登录ID',width:75,sortable:true},    
					        {field:'us_userName',title:'用户名称',width:75,sortable:true}    
					    ]]    
					});  
					
					$('#newUser').combogrid({    
					    delay: 500,    
					    mode: 'remote',    
					    url: 'ummReplController.do?getuser',    
					    idField: 'us_nickName',    
					    textField: 'us_userName',    
					    columns: [[    
					        {field:'us_nickName',title:'登录ID',width:75,sortable:true},    
					        {field:'us_userName',title:'用户名称',width:75,sortable:true}    
					    ]]    
					});  
								
					$('#ur_id').val(row.ur_id);
					$('#newUser').combogrid('setValue', row.newNickName);
					$('#oldUser').combogrid('setValue', row.oldNickName);
					$('#ur_replDate').datebox('setValue', row.ur_replDate);
					$('#ur_opDate').val(row.ur_opDate);				
					$("h3").html("用户替换管理_[修改]");
					$('#dlgAdd').dialog('open');
				}
	});
	
	// 点击查询按钮 进行查寻
	$('#Search').bind('click',function(){
		var fTime=$('#firsttime').combo('getValue');//客户
		var sTime=$('#secondtime').combo('getValue');//客户公司
		
		if(typeof fTime ==='undefined'){
			fTime='';
		}
		if(typeof sTime ==='undefined'){
			sTime='';
		}
		fTimeBackup=$('#firsttime').combo('getValue');//客户
		sTimeBackup=$('#secondtime').combo('getValue');//客户公司
		
		if(typeof fTimeBackup ==='undefined'){
			fTimeBackup='';
		}
		if(typeof sTimeBackup ==='undefined'){
			sTimeBackup='';
		}
		var roleGrpUrl='ummReplController.do?search&ftime='+fTime+'&stime='+sTime;
		userReplDataGrid.datagrid({
			url:roleGrpUrl,
			loadFilter:pagerFilter
		});
	});
	
	// 为新增/修改窗口的的新用户 载入数据
	$('#oldUser').combogrid({    
	    delay: 500,    
	    mode: 'remote',    
	    url: 'ummReplController.do?getuser',    
	    idField: 'us_nickName',    
	    textField: 'us_userName',    
	    columns: [[    
	        {field:'us_nickName',title:'登录ID',width:75,sortable:true},    
	        {field:'us_userName',title:'用户名称',width:75,sortable:true}    
	    ]]    
	});  

	$('#newUser').combogrid({    
	    delay: 500,    
	    mode: 'remote',    
	    url: 'ummReplController.do?getuser',    
	    idField: 'us_nickName',    
	    textField: 'us_userName',    
	    columns: [[    
	        {field:'us_nickName',title:'登录ID',width:75,sortable:true},    
	        {field:'us_userName',title:'用户名称',width:75,sortable:true}    
	    ]]    
	});  
	
	
	
	
});

//新增
function add(){
	roleGrpOptType=0;

	// 为新增/修改窗口的的新用户 载入数据
	$('#oldUser').combogrid({    
	    delay: 500,    
	    mode: 'remote',    
	    url: 'ummReplController.do?getuser',    
	    idField: 'us_nickName',   
	    textField: 'us_userName',    
	    columns: [[    
	        {field:'us_nickName',title:'登录ID',width:75,sortable:true},    
	        {field:'us_userName',title:'用户名称',width:75,sortable:true}    
	    ]]    
	});  
	
	$('#newUser').combogrid({    
	    delay: 500,    
	    mode: 'remote',    
	    url: 'ummReplController.do?getuser',    
	    idField: 'us_nickName',    
	    textField: 'us_userName',    
	    columns: [[    
	        {field:'us_nickName',title:'登录ID',width:75,sortable:true},    
	        {field:'us_userName',title:'用户名称',width:75,sortable:true}    
	    ]]    
	});  
	
	//$('#ur_id').val(rows[0].ur_id);
	$('#newUser').combogrid('setValue', "");
	$('#oldUser').combogrid('setValue', "");
	$('#ur_replDate').datebox('setValue',"");
	//$('#ur_opDate').val(rows[0].ur_opDate);

	$('#userRepl').form('clear');

	$('#dlgAdd').dialog('open');
}

// 修改 
function edit(){
	roleGrpOptType=1;	
	// 为新增/修改窗口的的新用户 载入数据
	$('#oldUser').combogrid({    
	    delay: 500,    
	    mode: 'remote',    
	    url: 'ummReplController.do?getuser',    
	    idField: 'us_nickName',   
	    textField: 'us_userName',    
	    columns: [[    
	        {field:'us_nickName',title:'登录ID',width:75,sortable:true},    
	        {field:'us_userName',title:'用户名称',width:75,sortable:true}    
	    ]]    
	});  
	
	$('#newUser').combogrid({    
	    delay: 500,    
	    mode: 'remote',    
	    url: 'ummReplController.do?getuser',    
	    idField: 'us_nickName',    
	    textField: 'us_userName',    
	    columns: [[    
	        {field:'us_nickName',title:'登录ID',width:75,sortable:true},    
	        {field:'us_userName',title:'用户名称',width:75,sortable:true}    
	    ]]    
	});  
	
	var rows=userReplDataGrid.datagrid('getSelections');
	if(rows.length<=0){
		$.messager.alert('提示','请选择要修改的记录!','info');
		return null;
	}
	
	if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改!','info');
		return null;
	}
	
	$('#ur_id').val(rows[0].ur_id);
	$('#newUser').combogrid('setValue', rows[0].newNickName);
	$('#oldUser').combogrid('setValue', rows[0].oldNickName);
	$('#ur_replDate').datebox('setValue', rows[0].ur_replDate);
	$('#ur_opDate').val(rows[0].ur_opDate);
	
	
	$("h3").html("用户替换管理_[修改]");

	$('#dlgAdd').dialog('open');
}


//表单提交
function submitRepl(){
	
	var olduser = $('#oldUserId').val();
	var newuser = $('#newUserId').val();
	

			//olduser == null || newuser == null || (olduser.us_nickName == newuser.us_nickName)
		  if( olduser == newuser)
			  {
				// 非法输入，进行提示。				  
			     $.messager.alert('提示', '新用户和旧用户重复，请修改！', 'error'); 
				//show();
				  
			  }else if(olduser == "" || newuser == "" ){
				  
				  $.messager.alert('提示', '用户名不允许为空', 'error'); 
			  }else{

							  
				  $('#userReplForm').form('submit',{
					 
				  url:'ummReplController.do?addOrEdit&OptType='+roleGrpOptType,
 				    onSubmit: function(){
						var isValid = $(this).form('validate');
						return isValid;	// 返回false将停止form提交 
					},
					   success:function(data){
						   var temp = data.split("!");
//						   console.info(temp[0]);
//						   console.info(temp[1]);
//						   console.info(temp[1].length);
						   //temp[1] = eval(temp[1]);
						   if(temp[1].length == 6)
							   {
							   $.messager.alert('提示',temp[0]+"!",'error'); 
							   }else if(temp[1].length == 5){
								   $.messager.alert('提示',temp[0]+"!",'info');
							   }
						
						refresh();
						//simpleDataGrid.datagrid('reload');
						$('#dlgAdd').dialog('close');
				    },
				    error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','提交失败!','error');
					}
				  
			  });
		
		
		
	}
	
}

//删除
function del(){
		
	var row = $('#userReplDataGrid').datagrid('getSelections');
	//console.info(row.length);
	if (row.length >=1) {
		$.messager.confirm('提示', '是否确定删除所选择的记录', function(r){
				  if(r){	
					  var j = 2;
					  for(var i = 0; i< row.length; i++) {
					    $.post("ummReplController.do?&deleteRepl", { ur_id : row[i].ur_id}, 
					   function(data) {
					    	var k = j++;
					    	//console.info(row.length);
					    	//console.info(k);
					    	if(data == "删除失败！")
					    		{
					    		$.messager.alert('提示', data, 'error');
					    		}else{
					    			if(k>row.length){
							    		//$('#dg').datagrid('reload');
					    				refresh();
										$.messager.alert('提示', data, 'info');
							    	}
					    		}
					    						    	
				});
			};
		};
	});
} else {
	$.messager.alert('提示', '请选择要删除的记录！', 'info');
};
	
}


//  导出文件 
function rejectRepl(){
	$('#rejectForm').form('clear');
	$('#rejectNameForm').form('clear');
	$('#format').combobox('setValue','excel');
	$('#rejectDialog').dialog('open');
}


$(function(){
	$('#oldUser').combogrid({
		onSelect: function(rowIndex, rowData){

			$('#oldUserId').val(rowData.us_id); // 给旧用户 赋ID 值 因为数据库 存的 是id 而不是名称 这样就不用在后台去转换， 直接在 这里传Id过去 
			olduser = rowData.us_id;
		}
	});
	
	
	$('#newUser').combogrid({
		onSelect: function(rowIndex, rowData){
		
			$('#newUserId').val(rowData.us_id);
			newuser = rowData.us_id;
		}
	});
	
	

	//  对旧用户和新用户是否重名的验证
    $.extend($.fn.validatebox.defaults.rules, { 	    	
            newUserName: {   
            validator: function(value){    

            	 var olduser = $('#oldUser').combogrid('grid').datagrid('getSelected');
            	 var newuser = $('#newUser').combogrid('grid').datagrid('getSelected');
            	 
            	 if(newuser != null)
            		 {
            		 	var newusertemp = null;
            		 	newusertemp = newuser.us_userName 
            		 }
            	 
            	 if(olduser != null)
        		 {
        		 	var oldusertemp = null;
        		 	oldusertemp = olduser.us_userName 
        		 }

                 if ( newusertemp == oldusertemp) {   
                    return false;  
                 }else {  
                    return true;  
                 }    
            },   
            	             
            message: '用户名重复'   
        },
        
         
    });   
    
    $('#reject').click(function() {
		//data = {"roleGrpCode":roleGrpCodeBackup,"roleGrpName":roleGrpNameBackup,"roleGrpRange":roleGrpRangeBackup};
		url = "ummReplController.do?rejectRepl&ftime=" + fTimeBackup + "&stime=" + sTimeBackup;
		openReportDialog(url);
	});
	
});


function refresh(){
	var fTime=$('#firsttime').val();//客户
	var sTime=$('#secondtime').val();//客户公司
	
	if(typeof fTime==='undefined'){
		fTime='';
	}
	if(typeof sTime==='undefined'){
		sTime='';
	}

	var roleGrpUrl='ummReplController.do?search&ftime='+fTime+'&stime='+sTime;
	userReplDataGrid.datagrid({
		url:roleGrpUrl,
		loadFilter:pagerFilter
	});
}













