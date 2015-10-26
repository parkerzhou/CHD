
var contYearPlanOptType=-1;//操作类型 0表示新增 1表示修改,默认值为-1
var editable = true; //是否具有修改权限
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
	$('#sBeginYear').spinner('clear'); 
	$('#sEndYear').spinner('clear'); 
	var initData=[];
	//创建并初始化年度发展计划datagrid对象
	$('#contYearPlanDataGrid').datagrid({
		//url : 'contactsController.do?getContYearPlan', 
		columns : [[
			{field : 'ck', checkbox : true},
			{field : 'contYearPlanId', title : 'ID', hidden : true},
			{field : 'contactsName', title : '联系人', width : 120},
			{field : 'contYearPlanYear', title : '年度', width : 60},
			{field : 'custName', title : '客户', width : 220},
		   	{field : 'custCmpName', title : '客户公司', width : 220}, 
		   	{field : 'deptName', title : '部门', width : 200}, 
		  	{field : 'contactsOffic', title : '职务', width : 200}, 
		  	{field : 'contYearPlanWorkTarg', title : '工作目标', width : 300}
		]],
		rownumbers : true,
		checkOnSelect : true, 
		selectOnCheck : true, 
		singleSelect : false,
		method : 'get',
		toolbar : '#contYearPlanTools',
		autoRowHeight : false,
		pagination : true,
		pageSize : 10,  
		pageList:[10,15,20,30,50,100],
		fit : true, 
		fitColumns : true, 
		data:initData,
		onDblClickRow:function(rowIndex, row){
			if(editable == false){
				return;//无权限，直接返回。
			}
			contYearPlanOptType=1;
			//console.info(row);
			registerContYearPlanTabsEven();
			$('#contYearPlanForm').form('load','contactsController.do?loadContYearPlan&contYearPlanId='+row.contYearPlanId);
			$('#contYearPlanTabs').tabs('enableTab',1);	
			$('#contYearPlanTabs').tabs('select',0);
			simplecontYearPlanDialog.dialog('setTitle','修改');
			simplecontYearPlanDialog.dialog('open');
		}
	});
	
	//拦截对话关闭事件
	simplecontYearPlanDialog=$('#contYearPlanDialog').dialog({
		onBeforeClose:function(){
			var contacts=$('#contactsName').val();
			if(contacts==''){
				clearPage();
				return true;
			}else{
				$.messager.confirm('提示','是否确定返回至主界面?',function(r){ 
					if(r){
						clearPage();
						simplecontYearPlanDialog.dialog('close',true); 
					 } 
				});
			}
			return false;
		}
	});
	
	//客户选择按钮
	$('#totalContacts').click(function() {
		$.chcrm.openCommDialog('contacts',false,function(val){
			
			//console.info(val);
			var ceName=$('#ceName');
			var ccName=$('#ccName');
			var contactsName=$('#contactsName');
			var contactsId=$('#contactsId');
			var contactsOffic=$('#contactsOffic');
			var deName=$('#deName');
			var contCmpId=$('#contCmpId');
			//contactsName.val('as');
			if(val.length>=1){
				//$('#contYearPlanForm').form('load','contactsController.do?loadCustAndCustCmpAndMaxContYearPlanId&contactsId=' + val[0].id + '&contactsOffic=' + val[0].contTitle + '&deptName=' + val[0].contDept);
				ceName.val(val[0].contCust);
				ccName.val(val[0].contCmp);
				contactsName.val(val[0].contName);
				contactsName.validatebox('validate');
				contactsId.val(val[0].ct_id); //
				contCmpId.val(val[0].id);
				contactsOffic.val(val[0].contTitle);
				deName.val(val[0].contDept);
			}else{
				contactsName.val('');
				contactsOffic.val('');
				deptName.val('');
				contactsName.focus();
				contactsOffic.focus();
				deptName.focus();
				contactsId.val('');//
				contCmpId.val('');
			}
		});	
	});
	
});


	//年度发展计划查询按钮单击事件	
	function contYearPlanSearch(){
		var custName=$('#sCustName').val();//客户
		var custCmpName=$('#sCustCmpName').val();//客户公司
		var contactsName=$('#sContactsName').val();//客户公司状态
		var beginYear=$('#sBeginYear').numberspinner('getValue');
		var endYear=$('#sEndYear').numberspinner('getValue');
		if(typeof custName==='undefined'){
			cust='';
		}
		if(typeof custCmpName==='undefined'){
			custCmp='';
		}
		if(typeof contactsName==='undefined'){
			contactsName='';
		}
		if(typeof beginYear==='undefined'){
			beginYear='';
		}
		if(typeof endYear==='undefined'){
			endYear='';
		}
		var contYearPlanUrl='contactsController.do?searchContYearPlanInfo';
		$.ajax({
			url:contYearPlanUrl,
			type:'POST',
			dataType:'JSON',
			data:{custName:custName,custCmpName:custCmpName,contactsName:contactsName,beginYear:beginYear,endYear:endYear},
			success:function(result){
				$('#contYearPlanDataGrid').datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
		/*simpleDataGrid.datagrid({
			url:contYearPlanUrl,
			loadFilter:pagerFilter
		});*/
	}

	function clearPage(){
		//使用tab面板回到第一个面板
		$('#contYearPlanTabs').tabs('select',0);
		
		//清除表单的数据
		$('#contYearPlanForm').form('clear');
	}
	
	//新增
	function addContYearPlan(){
		contYearPlanOptType=0;
		var myDate = new Date();
		$('#contYearPlanYear').numberspinner('setValue',myDate.getFullYear());
		$('#contYearPlanYear').focus();
		//$('#contYearPlanForm').form('clear');
		$('#contYearPlanTabs').tabs('disableTab',1);
		registerContYearPlanTabsEven();
		simplecontYearPlanDialog.dialog('setTitle','年度发展计划信息');
		simplecontYearPlanDialog.dialog('open');
	}
	
	//表单提交
	function contYearPlanDialogSave(){
		//console.info(contYearPlanOptType);
		$('#contYearPlanForm').form('submit',{
			url:'contactsController.do?addorEditContYearPlan&OptType='+contYearPlanOptType+'&isHaveId='+$('#contYearPlanId').val(),
			onSubmit: function(){
				var isValid = $(this).form('validate');
				return isValid;	// 返回false将停止form提交 
			},
			success:function(data){
				if(contYearPlanOptType==0){
					$.ajax({
						 url : 'contactsController.do?loadMaxCYPId',
						 async : false,
						 type : 'get',
						 success : function(msg) {
							 $('#contYearPlanId').val(msg);
						 }
					 });
				}
				var temp = data.split("!");
				if (temp[1].length == 6) {
					$.messager.alert('提示', temp[0] + "!", 'error');
				} else if (temp[1].length == 5) {
					$.messager.alert('提示', temp[0] + "!", 'info');
					if(contYearPlanOptType==0){
						$('#contYearPlanTabs').tabs('enableTab',1);	
						$('#contYearPlanTabs').tabs('select',1);
					}
					contYearPlanOptType=1;
				}
				contYearPlanSearch();
		    },
		    error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.alert('提示','提交失败!','error');
			}
		});
	}
	
	//修改事件
	function editContYearPlan(){
		contYearPlanOptType=1;
		var rows=$('#contYearPlanDataGrid').datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return null;
		}
		
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}
		registerContYearPlanTabsEven();
		
		var row=$('#contYearPlanDataGrid').datagrid('getSelected');
		$('#contYearPlanForm').form('load','contactsController.do?loadContYearPlan&contYearPlanId='+row.contYearPlanId);
		$('#contYearPlanTabs').tabs('enableTab',1);		
		$('#contYearPlanTabs').tabs('select',0);
		simplecontYearPlanDialog.dialog('setTitle','年度发展计划信息');
		simplecontYearPlanDialog.dialog('open');
	}
	
	//删除
	function delContYearPlan(){
	 	var rows=$('#contYearPlanDataGrid').datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return null;
		}
		
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){
				var rows=$('#contYearPlanDataGrid').datagrid('getSelections');
				var idArray=[];
				for(var key in rows){
					idArray.push(rows[key].contYearPlanId);
				}
				
				$.ajax({
					type:'POST',
					url:'contactsController.do?delContYearPlan&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						$('#contYearPlanDataGrid').datagrid('unselectAll');
						contYearPlanSearch();
						$.messager.alert('提示',data+'!','info');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','info');
					}
				});
			}
		});
	}
	
	var contYearPlanTabsEven_First=false;
	function registerContYearPlanTabsEven(){
		if(!contYearPlanTabsEven_First){
			$('#contYearPlanTabs').tabs({
				onSelect:function(title,index){
					if(index==1){
						updateAnnex(9,$('#contYearPlanId').val(),1);//调用附件
						contYearPlanTabsEven_First=true;
					}
				}
			});
		}
	}
