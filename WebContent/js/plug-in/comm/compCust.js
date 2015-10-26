var CompCustOptType=-1;//操作类型 0表示新增 1表示修改,默认值为-1
var originalSelfCust = -1;//标志修改时，是否原先就是我方客户。1为是，2为否。
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
	$.ajax({
		url:'commController.do?checkFuncBtn&fuId=${currFunc.id}',
		dataType:'text',
		success:function(result){
			var tb=$('#tb');
			var v=result.split(',');
			setButton(tb.find('.easyui-linkbutton').first(),v[0]);
			setButton(tb.find('.easyui-linkbutton').eq(1),v[1]);
			setButton(tb.find('.easyui-linkbutton').eq(2),v[2]);
			if(v[1] == 0){
				editable = false;//如果没权限，则不可编辑
			}
		}
	});
});

$(function(){
	
	$('#cmpName').validatebox('disableValidation');
	
	$('#CompCustForm').form({
		onLoadSuccess:function(data){
			var custCmpName=$('#cmpName');//客户公司名称
			var custCmpN = $('#CompCustForm').find('#custName');//客户名称
            var cmpCode=$('#cmpCode');//客户公司代码
			var custCmpId=$('#custCmpId'); 
			var custCode = $('#custCode');//客户代码
			var custName = $('#CompCustForm #custName');
			if(data.isSelfCust==1){
				custCmpName.attr('readOnly',true);
				$('#totalCustCmp').show();
			}else if(data.isSelfCust==2){
				custCmpName.attr('readOnly',false);
				cmpCode.focus();
				$('#totalCustCmp').hide();
			}
		}
	});
	
	
	var initData=[];
	//创建并初始化客户datagrid对象
	simpleDataGrid=$('#CompCustDataGrid').datagrid({

		columns : [[
               {filed : 'ck',checkbox : true},
	           {field :'CompCustId',title :'ID', hidden :true},
	           {field :'name',title :'竞争对手' ,width :150},
	           {field :'cpCust',title:'服务客户',width:220},
	           {field : 'cpCustCmp',title :'服务客户公司',width:220},
	           {field :'isSelfCust',title:'是否我们客户',width:80},
	           {field :'orderSeq',title:'序号',width:80},
	           //{field :'seq',title:'序号',width:80,hidden:true}
	           {field :'product',title:'有无产品',width:80}
	           
		]],
		rownumbers : true,
		pageList:[10,15,20,30,50,100],
		checkOnSelect : true, 
		selectOnCheck : true, 
		singleSelect : false,
		method : 'get',
		toolbar : '#CompCustTools',
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
			CompCustOptType=1;
			$('#CompCustId').val(row.compCustId);
			registerCompCustTabsEven();
	
			$('#CompCustForm').form('load','competitorController.do?loadCompCust&CompCustId='+row.compCustId+'&nameId='+row.nameId);
			$('#CompCustTabs').tabs('enableTab',1);	
			$('#CompCustTabs').tabs('select',0);
			simpleCompCustDialog.dialog('setTitle','竞争对手主要服务客户');
			simpleCompCustDialog.dialog('open');
					
		}
	});
	
	//客户查询按钮单击事件	
	$('#CompCustSearchBtn').click(function(){
		var competitor=$('#s_competitor').val();//竞争对手
		var cpCust=$('#s_cpCust').val();//服务客户
		var product=$('#product').combobox('getValue');
		if(typeof competitor==='undefined'){
			competitor='';
		}
		if(typeof cpCust==='undefined'){
			cpCust==='';
		}
		if(typeof product==='undefined'){
			product==='';
		}
		var CompCustUrl='competitorController.do?searchCompCust';		
		$.ajax({
			url:CompCustUrl,
			type:'POST',
			dataType:'JSON',
			data:{s_competitor:competitor,s_cpCust:cpCust,product:product},
			success:function(result){
				simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
		
/*		var CompCustUrl='competitorController.do?searchCompCust&s_competitor='+competitor+'&s_cpCust='+cpCust;
            simpleDataGrid.datagrid({
			url:CompCustUrl,
			loadFilter:pagerFilter
		});*/
	});
	
	//拦截对话关闭事件
	simpleCompCustDialog=$('#CompCustDialog').dialog({
		onBeforeClose:function(){
			var competitor=$('#competitor').val();
			var cpCust=$('#cpCust').val();
		   if((competitor==''&&cpCust=='')){
				clearPage();
				return true;

			
			}else{
				$.messager.confirm('提示','是否确定返回至主界面?',function(r){ 
					if(r){
						clearPage();
						$('#CompCustForm').form('clear');
						simpleCompCustDialog.dialog('close',true); 
					 } 
				});
			}
			return false;
		}
	});
	//竞争对手选择按钮
		$('#totalCompetitor').click(function() {

			$.chcrm.openCommDialog('competitor',false,function(val){

				var competitorName=$('#name');
				var competitorId=$('#nameId');
                if(val.length>=1){
					competitorName.val(val[0].competitorCode+'-'+val[0].competitorName);
					competitorId.val(val[0].id);
					competitorName.focus();
					competitorId.focus();
					
					
				}else{
					competitorName.val('');
					competitorId.val('');
					competitorName.focus();
					competitorId.focus();
				}
			});	
		});
	/*	//客户公司选择按钮
		$('#totalCustCmp').click(function() {
			$.chcrm.openCommDialog('custComp',false,function(val){
	        	var cmpCode=$('#cmpCode');
				var custCmpId=$('#custCmpId');
				var custName=$('#cust');
				var custId=$('#custId');
				if(val.length>=1){
					cmpCode.val(val[0].custCompName);
					//custName.val(val[0].custName);
					custCmpName.focus();
					custCmpId.val(val[0].custCompId);
					//custId.val(val[0].custId);
				}else{
					custCmpName.val('');
					//custName.val('');
					custCmpName.focus();
					custCmpId.val('');
					//custId.val('');
				}
			});	
		});
	});*/
/*		//客户公司代码选择按钮
		$('#totalCustCmp').click(function() {
			$.chcrm.openCommDialog('custComp',false,function(val){

*/
		//客户公司代码选择按钮
	$('#totalCustCmp').click(function() {
		var i = $('#isSelfCust').combobox('getValue');
		if(i === ''){
			$.messager.alert('提示','请先选择是否是我们的客户！','info');
			return;
		}
		$.chcrm.openCommDialog('custComp',false,function(val){
			/*var custName=$('#cust');
			  var custId=$('#custId');*/
			var custCmpName=$('#cmpName');//客户公司名称
			var cmpCode=$('#cmpCode');//客户公司代码
			var custCmpId=$('#custCmpId'); 
			var custCode = $('#custCode');//客户代码
			var custName = $('#CompCustForm #custName');
			
        	if(val.length>=1){
				var strArray = val[0].custCompName.split('-');
				var strArray1 = val[0].custName.split('-');
				
				custCmpName.val(strArray[2]);
				custCmpId.val(val[0].custCompId);
				custCode.val(strArray1[0]);
				custName.val(strArray1[1]);
				cmpCode.val(strArray[0]+'-'+strArray[1]);
				cmpCode.validatebox('validate');
			}else{
				custCmpName.val('');
				cmpCode.val('');
				custCmpId.val('');
				custCode.val('');
				custName.val('');
			}
		});	
	});
	
	$('#isSelfCust').combobox({
		onSelect:function(record){
			var custCmpName=$('#cmpName');//客户公司名称
			//var cmpName=$('#cmpName');//客户公司名称
			var cmpCode=$('#cmpCode');//客户公司代码
			var custCode = $('#custCode');//客户代码
			var custName = $('#CompCustForm #custName');//客户名称
			var custCmpId=$('#custCmpId'); //客户公司id
			if(record.id==1){
				custCmpName.val('');
				cmpCode.val('');
				custCmpId.val('');
				custCode.val('');
				custName.val('');
				$('#totalCustCmp').show();
				cmpCode.css('background-color', 'transparent');
				custCmpName.attr('readOnly', true);
				cmpCode.validatebox('enableValidation');
				custCmpName.validatebox('disableValidation');
				cmpCode.focus();
			}else{
				custCmpName.val('');
				custCmpName.focus();
				custCmpId.val('');
				
				//- -- -----
				if(CompCustOptType == 0){
					custCode.val("自动引用");
					custName.val("自动引用");
					cmpCode.val("自动引用");
				}else{
					$.ajax({
						type:'POST',
						url:'competitorController.do?getCustAndCmpCodeByCcId&ccId=' + parseInt($('#compCustId').val()),
						dataType:'JSON',
						async: false,
						success:function(data,status,xml){
							originalSelfCust = parseInt(data.original);
							if(originalSelfCust == 1){
								custCode.val("自动引用");
								custName.val("自动引用");
								cmpCode.val("自动引用");
							}else{
								custCode.val(data.custCode);
								custName.val(data.custName);
								cmpCode.val(data.cmpCode);
								custCmpName.val(data.cmpName);
							}
							
						}
						
					});
				}
			
				
				
				cmpCode.css('background-color', '#EFEFEF');
				custCmpName.attr('readOnly', false);
				cmpCode.validatebox('disableValidation');
				custCmpName.validatebox('enableValidation');
				custCmpName.focus();

				$('#totalCustCmp').hide();
			}
		}
	});
			
					

});
function clearPage(){
	//使用tab面板回到第一个面板
	$('#CompCustTabs').tabs('select',0);
	//清除表单的数据
	$('#CompCustForm').form('clear');
	$('#totalCustCmp').show();
	var custCmpName=$('#cmpName');//客户公司名称
	var cmpCode=$('#cmpCode');//客户公司代码
	var custCode = $('#custCode');//客户代码
	var custName = $('#CompCustForm #custName');
	cmpCode.css('background-color', 'transparent');
	custCmpName.attr('readOnly', true);
	cmpCode.validatebox('enableValidation');
	custCmpName.validatebox('disableValidation');
	
	originalSelfCust = -1;
}
	
	//新增
function addCompCust(){
	CompCustOptType=0;
	$('#CompCustTabs').tabs('disableTab',1);
	$('#CompCustForm').form('load','competitorController.do?getOrder')
	registerCompCustTabsEven();
	simpleCompCustDialog.dialog('setTitle','竞争对手主要服务客户');
	simpleCompCustDialog.dialog('open');
	
}

//表单提交
function CompCustDialogSave(){
	var id = $('#CompCustId').val();
	if($('#isSelfCust').combobox('getValue') == '2'){
		$('#custName').val($('#cmpName').val());
		if(CompCustOptType == 0){
			$.ajax({
				type:'POST',
				url:'competitorController.do?getMaxCustCmpCode',
				dataType:'text',
				async: false,
				success:function(data,status,xml){
					$('#custCode').val(data);
					$('#cmpCode').val(data);
				}
				
			});
		}else if(originalSelfCust == 1){
			$.ajax({
				type:'POST',
				url:'competitorController.do?getMaxCustCmpCode',
				dataType:'text',
				async: false,
				success:function(data,status,xml){
					$('#custCode').val(data);
					$('#cmpCode').val(data);
				}
				
			});
		}
	}
	$('#CompCustForm').form('submit',{
		url:'competitorController.do?addorEditCompCust&cbOptType='+CompCustOptType,
		onSubmit: function(){
			var isValid = $(this).form('validate');
			return isValid;	// 返回false将停止form提交 
		},
		success:function(data){
			
			var temp = data.split("-")
			if(temp[2] == "info")
			{
			 $('#compCustId').val(temp[0]);
			 $.messager.alert('提示',temp[1],'info'); 
			
				if(CompCustOptType==0){ 
					$('#CompCustTabs').tabs('enableTab',1);	
					$('#CompCustTabs').tabs('select',1);
				}
				
				CompCustOptType=1;
				refresh();
			}
			
			if(temp[2] == "error")
			{
				 $.messager.alert('提示',temp[1],'error'); 
			}
			//refresh();
		/*$('#compCustId').val(data);
			if(CompCustOptType==0){ 
				$('#CompCustTabs').tabs('enableTab',1);	
				$('#CompCustTabs').tabs('select',1);
			}
			CompCustOptType=1;
			$.messager.alert('提示','提交成功!','info'); 
			$('#CompCustDataGrid').datagrid('reload');
	    },
	    error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.alert('提示','提交失败!','error');
		}
	});
}*/
			
						
		
    }
//    error:function(XMLHttpRequest, textStatus, errorThrown){
//		$.messager.alert('提示','提交失败!','error');
//	}
});
}
	//修改事件
function editCompCust(){
	CompCustOptType=1;
	var rows=simpleDataGrid.datagrid('getSelections');
	if(rows.length<=0){
		$.messager.alert('提示','请选择要修改的记录!','info');
		return null;
	}
	
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}
		registerCompCustTabsEven();
		
		var row=simpleDataGrid.datagrid('getSelected');
		$('#CompCustId').val(row.CompCustId);
		$('#CompCustForm').form('load','competitorController.do?loadCompCust&CompCustId='+row.compCustId+'&nameId='+row.nameId);
		
		
		$('#CompCustTabs').tabs('enableTab',1);		
		$('#CompCustTabs').tabs('select',0);
		simpleCompCustDialog.dialog('setTitle','竞争对手主要服务客户');
		simpleCompCustDialog.dialog('open');
	}
	//删除
function delCompCust(){
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
				idArray.push(rows[key].compCustId);
			}
			
			$.ajax({
				type:'POST',
				url:'competitorController.do?delCompCust&idArray='+idArray,
				dataType:'text',
				success:function(data,status,xml){
					if(data == "删除成功！"){
						$.messager.alert('提示',data,'info');
						refresh();	
					}else{
						$.messager.alert('提示',data,'error');
					}
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.alert('提示','删除错误!','info');
				}
			});
		}
	});
}
	
var CompCustTabsEven_First=false;
function registerCompCustTabsEven(){
	if(!CompCustTabsEven_First){
		$('#CompCustTabs').tabs({
			onSelect:function(title,index){
				if(index==1){
					updateAnnex(14,$('#compCustId').val(),1);//调用附件
				}
			}
		});
	}
}
	
function refresh (){		 
	var competitor=$('#s_competitor').val();//竞争对手
	var cpCust=$('#s_cpCust').val();//服务客户
	var product=$('#product').combobox('getValue');
	if(typeof competitor==='undefined'){
		competitor='';
	}
	if(typeof cpCust==='undefined'){
		cpCust==='';
	}
	if(typeof product==='undefined'){
		product==='';
	}
	var CompCustUrl='competitorController.do?searchCompCust';		
	$.ajax({
		url:CompCustUrl,
		type:'POST',
		dataType:'JSON',
		data:{s_competitor:competitor,s_cpCust:cpCust,product:product},
		success:function(result){
			simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
		}
	});
	
/*		var CompCustUrl='competitorController.do?searchCompCust&s_competitor='+competitor+'&s_cpCust='+cpCust;
        simpleDataGrid.datagrid({
		url:CompCustUrl,
		loadFilter:pagerFilter
	});*/
}
	
	 
$(function(){

	// 接收参数用来显示一开始的界面
	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
		var r = window.location.search.substr(1).match(reg); 
		
		if (r!=null) return unescape(r[2]); return null;
	}
	
	var objId = getUrlParam('objId');//从竞争对手的关联信息带过去的参数是objId，在此指竞争对手ID。
	if(objId != null){
		$.ajax({
			//该url返回竞争对手名称、竞争对手服务客户名称，用于填充搜索中的“竞争对手”、“服务客户”项。
			url:'competitorController.do?getCompetitorByCpId&cpId=' + objId,
			dataType:'text',
			success:function(result){
				result = $.parseJSON(result);
				$('#s_competitor').val(result.cpName);
				//refresh();
			}
		});
	}
});
	
	
	
	
          
