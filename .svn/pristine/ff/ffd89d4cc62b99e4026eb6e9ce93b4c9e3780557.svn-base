
var BuyPlanOptType=-1;//操作类型 0表示新增 1表示修改,默认值为-1
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
	var initData=[];
	//创建并初始化客户datagrid对象
	simpleDataGrid=$('#BuyPlanDataGrid').datagrid({

		columns : [[
			{field : 'ck', checkbox : true},
			{field : 'BuyPlanId', title : 'ID', hidden : true}, 
		   	{field : 'custCmpInfo', title : '客户公司信息', width : 320}, 
			{field : 'custYear', title : '工作年度', width : 80},
		   	{field : 'custForYear', title : '预测年度', width : 80}, 
		  	{field : 'custImagTrend', title : '新形象变更趋势', width : 100}, 
		  	{field : 'custShopTrend', title : '开店趋势', width : 80}, 
		 	{field : 'custOldTrend', title : '旧店改造趋势', width : 100},
	 		{field : 'custBugeIncome', title : '收入(万元)', width : 100}
		]],
		rownumbers : true,
		pageList:[10,15,20,30,50,100],
		checkOnSelect : true, 
		selectOnCheck : true, 
		singleSelect : false,
		method : 'get',
		toolbar : '#BuyPlanTools',
		autoRowHeight : false,
		pagination : true,
		pageSize : 10,  
		fit : true, 
		fitColumns : true, 
		data:initData,
		onDblClickRow:function(rowIndex, row){
			if(editable == false){
				return;//无权限，直接返回。
			}
			BuyPlanOptType=1;
			$('#BuyPlanId').val(row.buyPlanId);
			registerBuyPlanTabsEven();
	
			$('#BuyPlanForm').form('load','custController.do?loadBuyPlan&BuyPlanId='+row.buyPlanId+'&custCmpId='+row.custCmpId);
			$('#BuyPlanTabs').tabs('enableTab',1);	
			$('#BuyPlanTabs').tabs('select',0);
			simpleBuyPlanDialog.dialog('setTitle','对我司贡献业绩');
			simpleBuyPlanDialog.dialog('open');
					
		}
	});
	
	//客户查询按钮单击事件	
	$('#BuyPlanSearchBtn').click(function(){

		var cust=$('#s_cust').val();//客户

		var custCmp=$('#s_custCmp').val();//客户公司

		var custYear = $('#s_custYear').numberspinner('getValue'); //工作年度     

		var custForYear = $('#s_custForYear').numberspinner('getValue'); //预测年度

		var custCmpState=$('#s_custCompanyState').combobox('getValue');//客户公司状态

		if(typeof cust==='undefined'){
			cust='';
		}
		if(typeof custCmp==='undefined'){
			custCmp='';
		}
		if(typeof custYear==='undefined'){
			custYear='';
		}
		if(typeof custForYear==='undefined'){
			custForYear='';
		}
		if(typeof custCmpState==='undefined'){
			custCmpState='';
		}
		
		var BuyPlanUrl='custController.do?searchBuyPlan';		
		$.ajax({
			url:BuyPlanUrl,
			type:'POST',
			dataType:'JSON',
			data:{s_cust:cust,s_custCmp:custCmp,s_custYear:custYear,s_custForYear:custForYear,s_custCmpState:custCmpState},
			success:function(result){
				simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
		
//		
//		var BuyPlanUrl='custController.do?searchBuyPlan&s_cust='+cust+'&s_custCmp='+custCmp+'&s_custYear='+custYear+'&s_custForYear='+custForYear+'&s_custCmpState='+custCmpState;
//
//		simpleDataGrid.datagrid({
//			url:BuyPlanUrl,
//			loadFilter:pagerFilter
//		});
	});
	
	//拦截对话关闭事件
	simpleBuyPlanDialog=$('#BuyPlanDialog').dialog({
		onBeforeClose:function(){
			var cust=$('#cust').val();
			var custCmp=$('#custCmp').val();
			if((cust==''&&custCmp=='')){
				clearPage();
				return true;
			}else{
				$.messager.confirm('提示','是否确定返回至主界面?',function(r){ 
					if(r){
						clearPage();
						simpleBuyPlanDialog.dialog('close',true); 
						$('#BuyPlanDataGrid').datagrid('reload');
					 } 
				});
			}
			return false;
		}
	});

	//客户公司选择按钮
	$('#totalCustCmp').click(function() {
		$.chcrm.openCommDialog('custComp',false,function(val){
			var custCmpName=$('#custCmp');
			var custCmpId=$('#custCmpId');
			var custName=$('#cust');
			var custId=$('#custId');
			if(val.length>=1){
				custCmpName.val(val[0].custCompName);
				custName.val(val[0].custName);
				custCmpName.focus();
				custCmpId.val(val[0].custCompId);
				custId.val(val[0].custId);
			}else{
				custCmpName.val('');
				custName.val('');
				custCmpName.focus();
				custCmpId.val('');
				custId.val('');
			}
		});	
	});
});
	function clearPage(){
		//使用tab面板回到第一个面板
		$('#BuyPlanTabs').tabs('select',0);
		
		//清除表单的数据
		$('#BuyPlanForm').form('clear');
	}
	
	//新增
	function addBuyPlan(){
		BuyPlanOptType=0;
		$('#BuyPlanTabs').tabs('disableTab',1);
		registerBuyPlanTabsEven();
		simpleBuyPlanDialog.dialog('setTitle','客户公司采购计划预测');
		simpleBuyPlanDialog.dialog('open');
	}
	
	//表单提交
	function BuyPlanDialogSave(){
		var id = $('#BuyPlanId').val();

		$('#BuyPlanForm').form('submit',{
			url:'custController.do?addorEditBuyPlan&cbOptType='+BuyPlanOptType,
			onSubmit: function(){
				var isValid = $(this).form('validate');
				return isValid;	// 返回false将停止form提交 
			},
			success:function(data){
				if(data.length>5)
					{
						
						var temp = data.split("!");
						$.messager.alert('提示',temp[0]+"!",'error'); 
					}else{
						$('#BuyPlanId').val(data);
						refresh();
						$.messager.alert('提示','提交成功!','info'); 
						
						if(BuyPlanOptType==0){ 
							$('#BuyPlanTabs').tabs('enableTab',1);	
							$('#BuyPlanTabs').tabs('select',1);
						}
						
						BuyPlanOptType=1;
					}
								
				
		    },
		    error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.alert('提示','提交失败!','error');
			}
		});
	}
	
	//修改事件
	function editBuyPlan(){
		BuyPlanOptType=1;
		var rows=simpleDataGrid.datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return null;
		}
		
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}
		registerBuyPlanTabsEven();
		
		var row=simpleDataGrid.datagrid('getSelected');
		
	
		$('#BuyPlanId').val(row.buyPlanId);
		$('#BuyPlanForm').form('load','custController.do?loadBuyPlan&BuyPlanId='+row.buyPlanId+'&custCmpId='+row.custCmpId);
		
		$('#custBugeIncome').val( row.custBugeIncome);
        $('#BuyPlanTabs').tabs('enableTab',1);		
		$('#BuyPlanTabs').tabs('select',0);
		simpleBuyPlanDialog.dialog('setTitle','客户公司采购计划预测');
		simpleBuyPlanDialog.dialog('open');
	}
	
	//删除
	function delBuyPlan(){
	 	var rows=simpleDataGrid.datagrid('getSelections');

		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return null;
		}
		
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){
				var rows=simpleDataGrid.datagrid('getSelections');

				var idArray=[];
				for(var key in rows){
					idArray.push(rows[key].buyPlanId);

				}
				
				$.ajax({
					type:'POST',
					url:'custController.do?delBuyPlan&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){

						refresh();
						$.messager.alert('提示',data+'!','info');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','info');
					}
				});
			}
		});
	}
	
	var BuyPlanTabsEven_First=false;
	function registerBuyPlanTabsEven(){
		/*$('#s_custForYear').numberspinner({    
		    min: custYear
		});*/
		if(!BuyPlanTabsEven_First){
			$('#BuyPlanTabs').tabs({
				onSelect:function(title,index){
					if(index==1){
						updateAnnex(4,$('#BuyPlanId').val(),1);//调用附件
					}
				}
			});
		}
	}
	
	 function refresh ()
	 {		 
			var cust=$('#s_cust').val();//客户

			var custCmp=$('#s_custCmp').val();//客户公司

			var custYear = $('#s_custYear').numberspinner('getValue'); //工作年度     
			
			var custForYear = $('#s_custForYear').numberspinner('getValue'); //预测年度  

			var custCmpState=$('#s_custCompanyState').combobox('getValue');//客户公司状态

			if(typeof cust==='undefined'){
				cust='';
			}
			if(typeof custCmp==='undefined'){
				custCmp='';
			}
			if(typeof custYear==='undefined'){
				custYear='';
			}
			if(typeof custForYear==='undefined'){
				custForYear='';
			}
			if(typeof custCmpState==='undefined'){
				custCmpState='';
			}
/*			var BuyPlanUrl='custController.do?searchBuyPlan&s_cust='+cust+'&s_custCmp='+custCmp+'&s_custYear='+custYear+'&s_custForYear='+custForYear+'&s_custCmpState='+custCmpState;
						

			simpleDataGrid.datagrid({
				url:BuyPlanUrl,
				loadFilter:pagerFilter
			});
			*/
			var BuyPlanUrl='custController.do?searchBuyPlan';		
			$.ajax({
				url:BuyPlanUrl,
				type:'POST',
				dataType:'JSON',
				data:{s_cust:cust,s_custCmp:custCmp,s_custYear:custYear,s_custForYear:custForYear,s_custCmpState:custCmpState},
				success:function(result){
					simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
				}
			});
	 }
	 

		
	 
	 $(function(){

			// 接收参数用来显示一开始的界面
			function getUrlParam(name){
				var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
				var r = window.location.search.substr(1).match(reg); 
				
				if (r!=null) return unescape(r[2]); return null;
			}
			
			var objId = getUrlParam('objId');//从客户公司的关联信息带过去的参数是objId，在此指客户公司ID。
			if(objId != null){
			$.ajax({
				//该url返回客户名称、客户公司名称，用于填充搜索中的“客户”、“客户公司”项。
				url:'custController.do?getCustNameAndCustCmpNameByCcId&ccId=' + objId,
				dataType:'text',
				success:function(result){
					result = $.parseJSON(result);

					
					$('#s_cust').val(result.ceName);
					$('#s_custCmp').val(result.ccName);
					//refresh();
					
				}
			   });
			}
			
						
			
		});