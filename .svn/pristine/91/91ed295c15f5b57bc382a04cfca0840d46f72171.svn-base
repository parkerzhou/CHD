
var optType = -1;
var optTypeDtl = -1;
var agrPayDtlsData = {"add":{},"update":{},"del":[]};
//数据过滤器
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
			dg.datagrid('uncheckAll');
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

//创建并初始化退保证金资料维护基本信息加载
$(function(){
	//创建并初始化加盟方管理基本信息表格对象
	simpleAgrPayDataGrid = $('#agrPayDataGrid').datagrid({
		url:'franController.do?loadAgrPay',
		
		//双击事件
		onDblClickRow:function(rowIndex,rowData){
			
		/*	if(editable == false){
				return ;
			}
			alert(rowData.AGREE_SEQ);*/
			optType = 1;
			$("#btn").hide();
			
			$("#agrPayForm").form("clear");
			
			$("#agrPaydDataGrid").datagrid("loadData",{total:0,rows:[]});
			agrPayDtlsData = {"add":{},"update":{},"del":[]};
			
			
			$('#agrPayForm').form('load','franController.do?loadAgrPayById&AGREE_SEQ='+rowData.agree_seq);
			$("#agrPayDlg").dialog('setTitle','修改');
			$("#agrPayDlg").dialog('open');
		},
		loadFilter:pagerFilter,
	});
	
	//对话关闭事件
	simpleAgrPayDialog = $('#agrPayDlg').dialog({
		onBeforeClose:function(){
			var AGREE_SEQ = $('#agrPayForm #AGREE_SEQ').val();
			if(AGREE_SEQ!=''){
				//如果主要拜访人信息不为空，则提示信息，如果确定关闭对话框，则清空表单数据，选中拜访管理信息面板，并刷新拜访管理基本信息表格数据
				$.messager.confirm('提示','是否确定返回主界面？',function(r){
					if(r){
						$('#agrPayForm').form('clear');
						simpleAgrPayDialog.dialog('close',true);
					}
				});
				return false;
			}
		}
	});
	
	$('#agrPayForm').form({
		onLoadSuccess:function(data){
		
			if(data.returnbail_flag == 1){
				$('#agrPayForm #returnbail_flag').attr('checked','checked');//给checkbox赋值。
			}
			$("#agrPayForm #proj_no").val(data.projInfo.proj_id);
			$('#agrPayForm #work_sdate').datebox("setValue",data.projInfo.work_sdate);
			$('#agrPayForm #work_edate').datebox("setValue",data.projInfo.work_edate);
			$('#agrPayForm #proj_id').val(data.projInfo.proj_no);
			$('#agrPayForm #proj_name').val(data.projInfo.proj_no);
			$('#agrPayForm #proj_sname').val(data.projInfo.proj_sname);
			$('#agrPayForm #cmp_sname').val(data.projInfo.cmp_sname);
			$('#agrPayForm #compact_amt').val(data.projInfo.compact_amt);
			$('#agrPayForm #sd_money').val(data.projInfo.sd_money);
			
			
			 $("#agrPayForm input[id='sum_amt']").val(data.cost.sum_amt);
			 $("#agrPayForm input[id='debt_amt']").val(data.projInfo.compact_amt-data.cost.sum_amt);
			 $("#agrPayForm input[id='proj_sum']").val(data.cost.proj_sum);
			 $("#agrPayForm input[id='redcost']").val(data.cost.redcost);
			 $("#agrPayForm input[id='decost']").val(data.cost.decost);
			 $("#agrPayForm input[id='detcost']").val(data.cost.detcost);
			 $("#agrPayForm input[id='bail_cost']").val(data.cost.bail_cost);
			/* alert(JSON.stringify(data.dtl2.length));*/
			 $('#agrPaydDataGrid').datagrid('loadData',{total:data.dtl2.length,rows:data.dtl2});//加载本地数据。
			 sunAdd();
		}
	});
	
	$("#agrPayDalDlg").dialog({
		onBeforeClose:function(){
		  $('#agrPayDalForm').form('clear');
		}
	});
});

//首页  新增按钮
function addAgrPay(){
	optType = 0;
	$("#btn").show();
	$("#agrPayForm").form("clear");
	$("#agrPaydDataGrid").datagrid("loadData",{total:0,rows:[]});
	agrPayDtlsData = {"add":{},"update":{},"del":[]};
	simpleAgrPayDialog.dialog('setTitle','新增');
	simpleAgrPayDialog.dialog('open');
}

//首页 修改按钮
function editAgrPay(){
	optType = 1;
	$("#btn").hide();
	$("#agrPayForm").form("clear");
	$("#agrPaydDataGrid").datagrid("loadData",{total:0,rows:[]});
	var rows = $("#agrPayDataGrid").datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要修改的记录！','info');
		return false;
	}
	if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改！','info');
		return false;
	}
	var row = $("#agrPayDataGrid").datagrid("getSelected");
	$('#agrPayForm').form('load','franController.do?loadAgrPayById&AGREE_SEQ='+row.agree_seq);
	simpleAgrPayDialog.dialog('setTitle','修改');
	simpleAgrPayDialog.dialog('open');
}

//退保证金提交按钮
function sumbitAgrPayDal(){
	
	var isValid = $('#agrPayDalForm').form('validate');
	if(!isValid){
		return ;
	}
	var data = {};
	var index = $("#agrPaydDataGrid").datagrid("getData").rows.length-1;

	if(index==-1){
		data.PAY_SEQ = 1;
	}else if(optTypeDtl==0){
		if($("#agrPaydDataGrid").datagrid("getData").rows[index].PAY_SEQ==undefined){
			data.PAY_SEQ = $("#agrPaydDataGrid").datagrid("getData").rows.length+1;
		}else{
			data.PAY_SEQ = accAdd($("#agrPaydDataGrid").datagrid("getData").rows[index].PAY_SEQ,"1");
		}
		
	}else{
		data.PAY_SEQ = $("#PAY_SEQ").val();
	}

	data.AGREE_SEQ = $("#AGREE_SEQ").val();
	data.RETURE_DATE = $("#RETURE_DATE").datebox("getValue");
	data.RETURN_AMOUNT = $("#RETURN_AMOUNT").val();
	data.rowIndex = $("#rowIndex").val();
	data.flag = $("#agrPayDalForm #flag").val();
	
	var rowData = $("#agrPaydDataGrid").datagrid("getData").rows;
	var count = 0;
	if(optTypeDtl==0){
		for(var i=0;i<rowData.length;i++){
			if(rowData[i].RETURE_DATE==data.RETURE_DATE){
				$.messager.alert("提示","已存在日期为"+data.RETURE_DATE+"的记录，不允许新增！","error");
				return;
			}
			count=accAdd(count,rowData[i].RETURN_AMOUNT);
		}
		if(eval(accAdd(count,data.RETURN_AMOUNT))>eval($("#bail_cost").val())){
			$.messager.alert("提示","累计金额已超过实扣工程保证金，不允许新增！","error");
			return;
		}
		data.flag = "add";
		agrPayDtlsData.add[data.PAY_SEQ]=data;
		$("#agrPaydDataGrid").datagrid("appendRow",data);
		sunAdd();
		
	}else{
		for(var i=0;i<rowData.length;i++){
			if(rowData[i].RETURE_DATE==data.RETURE_DATE&&i!=data.rowIndex){
				$.messager.alert("提示","已存在日期为"+data.RETURE_DATE+"的记录，不允许修改！","error");
				return;
			}
			if(i==data.rowIndex){
				continue;
			}else{
				count=accAdd(count,data.RETURN_AMOUNT);
			}
		}
		if(eval(accAdd(count,data.RETURN_AMOUNT))>eval($("#bail_cost").val())){
			$.messager.alert("提示","累计金额已超过实扣工程保证金，不允许修改！","error");
			return;
		}
		if($("#agrPayDalForm #flag").val()=="add"){
			data.flag = "add";
			agrPayDtlsData.add[data.PAY_SEQ] = data;
		}else if($("#agrPayDalForm #flag").val()=="update"||$("#agrPayDalForm #flag").val()==""){
			data.flag = "update";
			agrPayDtlsData.update[data.PAY_SEQ] = data;
		}
		var rowIndex = $("#agrPayDalForm #rowIndex").val();
		$("#agrPaydDataGrid").datagrid("updateRow",{
			index:rowIndex,
			row:data
		});
		sunAdd();
	}	
	//alert(JSON.stringify(agrPayDtlsData));
	$("#agrPayDalDlg").dialog('close');
}

//首页 删除按钮
function delAgrPay(){
	var rows = simpleAgrPayDataGrid.datagrid("getSelections");
	if(rows.length<1){
		$.messager.confirm("提示","请选择要删除的记录！","info");
		return ;
	}
	var idArray = [];
	for(var key in rows){
		idArray.push(rows[key].agree_seq);
	}
	$.messager.confirm("提示","是否确定删除所要选择的记录？",function(r){
		if(r){
			$.ajax({
				type:'POST',
				url:'franController.do?delAgrPay2&AGREE_SEQS='+idArray,
				dataType:'text',
				success:function(data,status,xml){
					simpleAgrPayDataGrid .datagrid('reload');
					simpleAgrPayDataGrid .datagrid('uncheckAll');
					$.messager.confirm('提示',data+'!','info');
				},
				error:function (XMLHttpRequest,textStatus,errorThrown){
					
				}
			});
		}
	})
	
}
//退保证金新增初始化
  function addAgrPayd(){
	  
	  $("#agrPayDalForm").form("clear");
		optTypeDtl=0;

		  
		$("#agrPayDalDlg").dialog('setTitle','新增');
		$("#agrPayDalDlg").dialog('open');
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth()+1;
		var day = date.getDate();
		var date1 = year+"-"+month+"-"+day;
		$("#RETURE_DATE").datebox('setValue',date1);
		$("#agrPayDalForm #flag").val("add");
	
  }
 //退保证金修改按钮
function editAgrPayd(){
	
	$("#agrPayDalForm").form("clear");
	var rows = $("#agrPaydDataGrid").datagrid('getSelections');
	if(rows.length>1){
		$.messager.alert("提示","请选择一条记录进行修改！","info");
		return;
	}else if(rows.length==0){
		$.messager.alert("提示","请选择要修改的记录！","info");
		return ;
	}
	var data = $("#agrPaydDataGrid").datagrid('getSelected');
	var index = $("#agrPaydDataGrid").datagrid('getData').length-1;
	//delete data.flag;
	if(data.PAY_SEQ==undefined){
		data.PAY_SEQ = $("#agrPaydDataGrid").datagrid("getRowIndex",data)+1;
	}
	$("#agrPayDalForm #PAY_SEQ").val(data.PAY_SEQ);
	$("#agrPayDalForm #flag").val(data.flag);
	$("#agrPayDalForm #rowIndex").val($("#agrPaydDataGrid").datagrid("getRowIndex",data));
	$("#agrPayDalForm #AGREE_SEQ").val(data.AGREE_SEQ);
	$("#RETURN_AMOUNT").numberbox('setValue',data.RETURN_AMOUNT);
	$("#RETURE_DATE").datebox('setValue',data.RETURE_DATE);
	optTypeDtl=1;
	$("#agrPayDalDlg").dialog('setTitle','修改');
	$("#agrPayDalDlg").dialog('open');
}
//退保证金删除按钮
function delAgrPayd(){
	var rows = $("#agrPaydDataGrid").datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert("提示","请选择要删除的记录！","info");
		return;
	}
	$.messager.confirm('确认对话框', '您确定要删除记录吗？', function(r){
		if (r){
			for(var i=0;i<rows.length;i++){
				if(rows[i].flag=="add"){
					delete agrPayDtlsData.add[rows[i].PAY_SEQ];
					
				}else if(rows[i].flag=="update"){
					
					delete agrPayDtlsData.update[rows[i].PAY_SEQ];
					agrPayDtlsData.del.push(rows[i].RETURE_DATE);
				}else if(rows[i].flag==undefined){
					
					agrPayDtlsData.del.push(rows[i].RETURE_DATE);
				}
				$("#agrPaydDataGrid").datagrid("deleteRow",$("#agrPaydDataGrid").datagrid("getRowIndex",rows[i]));
				sunAdd();
				//alert(JSON.stringify(agrPayDtlsData));
			  
			}
		}
	});
}
function closeAgrPayDal(){
	$("#agrPayDalDlg").dialog("close");
}
//选择加盟工程和付款加载。
function openFranPro(){
    openCommDialog('选择加盟工程','franController.do?getCommPage&page=choiceFranPro',900,480,function(){
    	openFranProDlg('|agree_seq|jms_agreementpay_dtl',function(data){
			$("#agrPayForm #proj_no").val(data.proj_id);
			$("#agrPayForm #AGREE_SEQ").val(data.agree_seq);
			$("#agrPayForm #proj_name").val(data.proj_no);

			$("#proj_no").val(data.proj_id);
			$("#agrPayForm #proj_sname").val(data.proj_sname);
			$("#agrPayForm #cmp_sname").val(data.cmp_sname);
			$("#agrPayForm #work_sdate").datebox('setValue',data.WORK_SDATE);
			$("#agrPayForm #work_edate").datebox('setValue',data.WORK_EDATE);
			$("#agrPayForm #compact_amt").val(data.compact_amt);
			$("#agrPayForm #sd_money").val(data.sd_money);
			$("#pcomDataGrid").datagrid({
				url:"franController.do?loadPcoms",
				queryParams:{proj_id:data.proj_id},
				onLoadSuccess:function(data1){
					var result = 0;
					for(var i=0;i<data1.rows.length;i++){
						result = accAdd(result,data1.rows[i].GET_AMT);
					}
					$("#SUM_GET_AMT").val(result);
				//	alert(JSON.stringify(data));
					$("#PER_GET_AMT").val(Math.round(result/data.compact_amt*100*100)/100);
				}
			});
			
			 $.ajax({
				 type:'POST',
				 url:"franController.do?getAgrPercents&proj_id="+data.proj_id+"&agree_seq="+data.agree_seq+"&compact_amt="+data.compact_amt,
				 dataType:'json',
				 success:function(pata,status,xml){
					 $("#agrPayForm input[id='sum_amt']").val(pata.sum_amt);
					 $("#agrPayForm input[id='debt_amt']").val(data.compact_amt-pata.sum_amt);
					 $("#agrPayForm input[id='proj_sum']").val(pata.proj_sum);
					 $("#agrPayForm input[id='redcost']").val(pata.redcost);
					 $("#agrPayForm input[id='decost']").val(pata.proj_sum-pata.redcost);
					 $("#agrPayForm input[id='detcost']").val(pata.detcost);
					 $("#agrPayForm input[id='bail_cost']").val(pata.bail_cost);
				 },
				 error:function(XMLHttpRequest,textStatus,errorThrown){
					 
				 }
			 
			 });
			
			$("#dlg").dialog("close");
		},'jms_agreementpay_dtl2');
	});
}

function accAdd(arg1,arg2){ 
	var r1,r2,m; 
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0} 
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0} 
	m=Math.pow(10,Math.max(r1,r2)) 
	return (arg1*m+arg2*m)/m 
	} 

function sunAdd(){
	var sum=0;
    var rows = $('#agrPaydDataGrid').datagrid('getData').rows
    for(var i=0; i<=rows.length-1;i++){
    	sum = accAdd(rows[i].RETURN_AMOUNT ,sum);
    }
    $("#agrPayForm input[id='stcost']").val(sum);
}

//退保证金资料维护提交按钮
function sumbitAgrPayd(){
	var agrPayDtlsAddArr=[];
	var agrPayDtlsEditArr = [];
	var agrPayDtlsDelArr = [];
	for(var key in agrPayDtlsData.add){
		agrPayDtlsAddArr.push(agrPayDtlsData.add[key]);
	}
	for(var key in agrPayDtlsData.update){
		agrPayDtlsEditArr.push(agrPayDtlsData.update[key]);
	}
	for(var key in agrPayDtlsData.del){
		agrPayDtlsDelArr.push(agrPayDtlsData.del[key]);
	}
	//alert(JSON.stringify(agrPayDtlsAddArr));
	
	$("#agrPayDtlsAddArr").val(JSON.stringify(agrPayDtlsAddArr));
	$("#agrPayDtlsEditArr").val(JSON.stringify(agrPayDtlsEditArr));
	$("#agrPayDtlsDelArr").val(agrPayDtlsDelArr);
	$('#agrPayForm').form('submit',{
		url:'franController.do?saveOrEditAgrPayDelInfo&optType='+optType,
		onSubmit:function(){
				if($("#AGREE_SEQ").val()==''){
					return false;
				}
				var isValid = $('#agrPayForm').form('validate');
				$("#agrPaySubmitBtn").linkbutton("disable");
				return isValid;
		},
		success:function(data){
			//data = eval('('+data+')');
//			if(!data.success){
//				$.messager.alert('提示',data.msg,'error');
//				return null;
//			}
			$("#agrPaySubmitBtn").linkbutton("enable");
			$("#agrPayDlg").dialog('close',true);
			$("#agrPayDataGrid").datagrid('reload');
			$.messager.alert('提示','提交成功！','info');
		}
	});
}

