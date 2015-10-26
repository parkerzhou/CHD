var roleGrpOptType=-1;//操作类型 0表示新增 1表示修改,默认值为-1
var userGrpCodeVali;
var editable = true;//是否具有编辑权限
var roleGrpCodeBackup;//客户
var roleGrpNameBackup;//客户公司
var roleGrpRangeBackup=-1;//客户公司状态
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

$(function(){
	var initData=[];
	//创建并初始化贡献业绩datagrid对象
	simpleDataGrid=$('#roleGrpDataGrid').datagrid({
		//url : 'custController.do?getContribution', 
		columns : [[
			{field : 'ck', checkbox : true},
			{field : 'userGrpId', title : 'ID', hidden : true}, 
		   	{field : 'userGrpCode', title : '用户群组代码', width : 150}, 
			{field : 'userGrpName', title : '用户群组名称', width : 300},
		   	{field : 'userGrpRange', title : '适用范围', width : 100}, 
		  	{field : 'userGrpOrderseq', title : '排序', width : 50}
		]],
		rownumbers : true,
		checkOnSelect : true, 
		selectOnCheck : true, 
		singleSelect : false,
		method : 'get',
		toolbar : '#roleGrpTools',
		autoRowHeight : false,
		pagination : true,
		pageSize : 10,  
		fit : true, 
		fitColumns : true, 
		data:initData,
		onDblClickRow:function(rowIndex, row){
			if(editable == false){
				return;//没有权限，直接返回
			}
			roleGrpOptType=1;
			//console.info(row);
			$('#roleGrpForm').form('load','ummRoleGrpController.do?loadForm&roleGrpOptType='+roleGrpOptType+'&userGrpId='+row.userGrpId);
			userGrpCodeVali=row.userGrpCode;
			$('#userGrpCode').validatebox({
				validType: "userGrpCode[5,'ummRoleGrpController.do?validateUmmRoleGrpData.json',roleGrpOptType,userGrpCodeVali]"
			});
			document.getElementById('title').innerText="用户群组管理_[修改]";
			$('#roleGrpDialog').dialog('open');
		}
	});
});


	//贡献业绩查询按钮单击事件	
	function roleGrpSearch(){
		var roleGrpCode=$('#sRoleGrpCode').val();//客户
		var roleGrpName=$('#sRoleGrpName').val();//客户公司
		var roleGrpRange=$('#sRoleGrpRange').combobox('getValue');//客户公司状态
		if(typeof roleGrpCode==='undefined'){
			roleGrpCode='';
		}
		if(typeof roleGrpName==='undefined'){
			roleGrpName='';
		}
		if(typeof roleGrpRange==='undefined' ||  roleGrpRange===''){
			roleGrpRange=-1;
		}
		roleGrpCodeBackup=$('#sRoleGrpCode').val();//客户
		roleGrpNameBackup=$('#sRoleGrpName').val();//客户公司
		roleGrpRangeBackup=$('#sRoleGrpRange').combobox('getValue');//客户公司状态
		if(typeof roleGrpCodeBackup==='undefined'){
			roleGrpCodeBackup='';
		}
		if(typeof roleGrpNameBackup==='undefined'){
			roleGrpNameBackup='';
		}
		if(typeof roleGrpRangeBackup==='undefined' ||  roleGrpRangeBackup===''){
			roleGrpRangeBackup=-1;
		}
		var roleGrpUrl = 'ummRoleGrpController.do?searchRoleGrp';
		$.ajax({
			url:roleGrpUrl,
			type:'POST',
			dataType:'JSON',
			data:{roleGrpCode:roleGrpCode,roleGrpName:roleGrpName,roleGrpRange:roleGrpRange},
			success:function(result){
				simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
	}
	
	//新增
	function addRoleGrp(){
		roleGrpOptType=0;
		$('#roleGrpForm').form('clear');
		$('#userGrpCode').validatebox({
			validType: "userGrpCode[5,'ummRoleGrpController.do?validateUmmRoleGrpData.json',roleGrpOptType]"
		});
		$('#roleGrpForm').form('load','ummRoleGrpController.do?loadForm&roleGrpOptType='+roleGrpOptType+'&userGrpId=""');
		document.getElementById('title').innerText="用户群组管理_[新增]";
		$('#roleGrpDialog').dialog('open');
	}
	
	//表单提交
	function roleGrpDialogSave(){
		$('#roleGrpForm').form('submit',{
			url:'ummRoleGrpController.do?addorEditRoleGrp&roleGrpOptType='+roleGrpOptType,
			onSubmit: function(){
				var isValid = $(this).form('validate');
				return isValid;	// 返回false将停止form提交 
			},
			success:function(data){
				//$.messager.alert('提示','提交成功!','info'); 
				//console.info(data);
				var temp = data.split("!");
				if(temp[1].length == 6) {
				   $.messager.alert('提示',temp[0]+"!",'error'); 
				   }else if(temp[1].length == 5){
					   $.messager.alert('提示',temp[0]+"!",'info');
				   }
				roleGrpSearch();
				$('#roleGrpDialog').dialog('close');
		    },
		    error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.alert('提示','提交失败!','error');
			}
		});
	}
	
	//修改事件
	function editRoleGrp(){
		roleGrpOptType=1;
		var rows=simpleDataGrid.datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return null;
		}
		
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}
		//console.info(rows[0].userGrpCode);
		userGrpCodeVali=rows[0].userGrpCode;
		$('#userGrpCode').validatebox({
			validType: "userGrpCode[5,'ummRoleGrpController.do?validateUmmRoleGrpData.json',roleGrpOptType,userGrpCodeVali]"
		});
		var row=simpleDataGrid.datagrid('getSelected');
		$('#roleGrpForm').form('load','ummRoleGrpController.do?loadForm&roleGrpOptType='+roleGrpOptType+'&userGrpId='+rows[0].userGrpId);
		document.getElementById('title').innerText="用户群组管理_[修改]";
		$('#roleGrpDialog').dialog('open');
	}
	
	//删除
	function delRoleGrp(){
	 	var rows=simpleDataGrid.datagrid('getSelections');
	 	//console.info(rows);
		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return null;
		}
		
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){
				var rows=simpleDataGrid.datagrid('getSelections');
				var idArray=[];
				for(var key in rows){
					idArray.push(rows[key].userGrpId);
				}
				
				$.ajax({
					type:'POST',
					url:'ummRoleGrpController.do?delRoleGrp&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						roleGrpSearch();
						$.messager.alert('提示',data+'!','info');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','info');
					}
				});
			}
		});
	}
	
	function rejectRoleGrp(){
		$('#rejectForm').form('clear');
		$('#rejectNameForm').form('clear');
		$('#format').combobox('setValue','excel');
		$('#rejectDialog').dialog('open');
	}
	
$(function() {
	$('#reject').click(function() {
		//data = {"roleGrpCode":roleGrpCodeBackup,"roleGrpName":roleGrpNameBackup,"roleGrpRange":roleGrpRangeBackup};
		url = "ummRoleGrpController.do?rejectData&roleGrpCode=" + roleGrpCodeBackup + "&roleGrpName=" + roleGrpNameBackup + "&roleGrpRange=" + roleGrpRangeBackup;
		openReportDialog(url);
	});
});