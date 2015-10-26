var contFeedbackOptType = -1;//联系人反馈主界面 操作类型 0表示新增 1表示修改,默认值为-1
var contFeedbackDetOptType = -1;//反馈资料明细界面 操作类型 0表示新增 1表示修改,默认值为-1
var detOptType = -1;//所属机构-地区界面 操作类型 0表示新增 1表示修改,默认值为-1
var isInsert = -1;//判断所属机构-地区是属于插入后修改还是新增时修改，新增时修改置0，插入后修改置1.默认值为-1
var i = 1; //所属机构-地区序号
var editable = true; //是否具有修改权限
function pagerFilter(data) {
	if (typeof data.length == 'number' && typeof data.splice == 'function') {
		data = {
			total : data.length,
			rows : data
		};
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage : function(pageNum, pageSize) {
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh', {
				pageNumber : pageNum,
				pageSize : pageSize
			});
			dg.datagrid('loadData', data);
		},
		onBeforeRefresh : function() {
			dg.datagrid('load');
		}
	});
	if (!data.originalRows) {
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}

//日期设置

/*$('#sBegin').datebox({
    onSelect: function(date){
        alert(date.getFullYear()+":"+(date.getMonth()+1)+":"+date.getDate());
    }
});*/


//标识变量，用于保证事件只被注册一次
var contFeedbackTabsEven_First = false;
//注册事件
function registerContFeedbackInfoTabsEven() {
	if (!contFeedbackTabsEven_First) {
		$('#contFeedbackTabs').tabs({
			onSelect : function(title, index) {
				if (index == 1) {
					$('#contFeedbackDetDataGrid').datagrid({
						url:'contactsController.do?getContFeedbackDet&contFeedbackId=' + $('#contFeedbackId').val()
					});
				}else if (index == 2) {
					updateAnnex(11,$('#contFeedbackId').val(),1);//11为联系人反馈记录附件代码
				} 
 
			}
		});
		contFeedbackTabsEven_First = true;

	}
}
/* =====================contFeedback界面  起始===================================*/

// 联系人反馈主界面新增
function contFeedbackAdd(){
	contFeedbackOptType=0;
	$('#contFeedbackForm').form('load','contactsController.do?loadContFeedbackDataAndBatch');
	$('#contFeedbackTabs').tabs('disableTab',1);
	$('#contFeedbackTabs').tabs('disableTab',2);	
	registerContFeedbackInfoTabsEven();
	$('#contFeedbackDialog').dialog('setTitle','联系人反馈');
	$('#contFeedbackDialog').dialog('open'); //打开联系人反馈dialog窗口
}

//联系人反馈主界面修改
function contFeedbackEdit(){
	contFeedbackOptType=1;
	var rows=$('#contFeedbackDataGrid').datagrid('getSelections');
	if(rows.length<=0){
		$.messager.alert('提示','请选择要修改的记录!','info');
		return null;
	}
	if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改!','info');
		return null;
	}
	registerContFeedbackInfoTabsEven();
	//console.info(rows);
	$('#contFeedbackTabs').tabs('enableTab', 1);
	$('#contFeedbackTabs').tabs('enableTab', 2);
	$('#contFeedbackTabs').tabs('select', 0);
	$('#contFeedbackForm').form('load', 'contactsController.do?loadContFeedback&contFeedbackId=' + rows[0].contFeedbackId);
	$('#contFeedbackDialog').dialog('open');
}

//联系人反馈主界面 删除
function contFeedbackRemove() {
	var rows=$('#contFeedbackDataGrid').datagrid('getSelections');
	if(rows.length<=0){
		$.messager.alert('提示','请选择要删除的记录!','info');
		return null;
	}
	
	$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
		if(r){
			var rows=$('#contFeedbackDataGrid').datagrid('getSelections');
			var idArray=[];
			for(var key in rows){
				idArray.push(rows[key].contFeedbackId);
			}
			//console.info(idArray);
			$.ajax({
				type:'POST',
				url:'contactsController.do?deleteContFeedback&idArray='+idArray,
				dataType:'text',
				success:function(data,status,xml){
					$('#contFeedbackDataGrid').datagrid('unselectAll');
					contFeedbackSearch();
					$.messager.alert('提示',data+'!','info');
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.alert('提示','删除错误!','info');
				}
			});
		}
	});
}

//表单提交
function contFeedbackDialogSave(){
	//console.info(contFeedbackOptType);
	$('#contFeedbackForm').form('submit',{
		url:'contactsController.do?addOrEditContFeedback&contFeedbackOptType='+contFeedbackOptType+'&isHaveId='+$('#contFeedbackId').val(),
		onSubmit: function(){
			var isValid = $(this).form('validate');
			return isValid;	// 返回false将停止form提交 
		},
		success:function(data){
			if(contFeedbackOptType == 0) {
				$.ajax({
					 url : 'contactsController.do?loadMaxId&Type=contFeedback',
					 async : false,
					 type : 'get',
					 success : function(msg) {
						 $('#contFeedbackId').val(msg);
					 }
				 });
			}
			var temp = data.split("!");
			if (temp[1].length == 6) {
				$.messager.alert('提示', temp[0] + "!", 'error');
			} else if (temp[1].length == 5) {
				$.messager.alert('提示', temp[0] + "!", 'info');
				if(contFeedbackOptType==0){
					$('#contFeedbackTabs').tabs('enableTab',1);	
					$('#contFeedbackTabs').tabs('enableTab',2);	
					$('#contFeedbackTabs').tabs('select',1);
				}
				contFeedbackOptType=1;
			}
			contFeedbackSearch();
	    },
	    error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.alert('提示','提交失败!','error');
		}
	});
	
}

// 清除状态
function clearPage(){
	//使用tab面板回到第一个面板
	$('#contFeedbackTabs').tabs('select',0);
	//清除表单的数据
	$('#contFeedbackForm').form('clear');
}


// 绑定搜索按钮
function contFeedbackSearch(){
	var sCustName = $('#sCustName').val();
	var sCustCmpName = $('#sCustCmpName').val();
	var sTopic = $('#sTopic').val();
	var sUserName = $('#sUserName').val();
	var sBegin = $('#sBegin').datebox('getValue');
	var sEnd = $('#sEnd').datebox('getValue');
	/*$('#contFeedbackDataGrid').datagrid({
		url:'contactsController.do?searchContFeedback&sCustName=' + sCustName +
				'&sCustCmpName=' + sCustCmpName +　'&sTopic=' + sTopic +　
				'&sUserName=' + sUserName +　'&sBegin=' + sBegin +　
				'&sEnd=' + sEnd
	});*/
	var contFeedbackUrl='contactsController.do?searchContFeedback';
	$.ajax({
		url:contFeedbackUrl,
		type:'POST',
		dataType:'JSON',
		data:{sCustName:sCustName,sCustCmpName:sCustCmpName,sTopic:sTopic,sUserName:sUserName,sBegin:sBegin,sEnd:sEnd},
		success:function(result){
			$('#contFeedbackDataGrid').datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
		}
	});
}

$(function(){
	//registerContFeedbackInfoTabsEven()
	var initData=[];
	//创建并初始化客户datagrid对象
	$('#contFeedbackDataGrid').datagrid({
		onDblClickRow : function(rowIndex, row){
			if(editable == false){
				return;//无权限，直接返回。
			}
			contFeedbackOptType=1;
			registerContFeedbackInfoTabsEven();
			$('#contFeedbackTabs').tabs('enableTab', 1);
			$('#contFeedbackTabs').tabs('enableTab', 2);
			$('#contFeedbackForm').form('load', 'contactsController.do?loadContFeedback&contFeedbackId=' + row.contFeedbackId);
			$('#contFeedbackTabs').tabs('select', 0);
			$('#contFeedbackDialog').dialog('open');
		}
	});
	
	$('#contFeedbackDialog').dialog({
		onBeforeClose:function(){
			var cpUserName=$('#cpUserName').val();
			if(cpUserName==''){
				clearPage();
				return true;
			}else{
				$.messager.confirm('提示','是否确定返回至主界面?',function(r){ 
					if(r){
						clearPage();
						$('#contFeedbackDialog').dialog('close',true); 
					 } 
				});
			}
			return false;
		}
	});	
	$('#state').combobox({
		onChange : function(newValue,oldValue){
			if(newValue==2){
				//console.info(newValue);
				$("#closeDate").datebox({
		            disabled: true
		        });
			}else if(newValue==1){
				$("#closeDate").datebox({
		            disabled: false
		        });
			}
		}
	});
});


/* ================================== contFeedback界面  结束================================*/

/*================================== contFeedbackDet界面 起始==============================*/

function contFeedbackDetAdd() {
	contFeedbackDetOptType=0;
	$('#detRegionTabs').tabs('disableTab',0);
	$('#contFeedbackDetRegionAdd').linkbutton('disable');
	$('#contFeedbackDetRegionEdit').linkbutton('disable');
	$('#contFeedbackDetRegionRemove').linkbutton('disable');
	$("#closeDate").datebox({
        disabled: false
    });
	$('#contFeedbackDetForm').form('clear');
	$('#detRegionDataGrid').datagrid('loadData',{"total":0,"rows":[]});
	$('#detRegionDataGrid').datagrid({url:''});
	$('#contFeedbackDetDialog').dialog('open');
	$('#contFeedbackDetDialog :input#custCmpName').val($('#contFeedbackDialog :input#ccName').val());
	$('#contFeedbackDetDialog :input#custCmpId').val($('#contFeedbackDialog :input#custCmpId').val());
	$('#contFeedbackDetDialog :input#batchid').val($('#contFeedbackDialog :input#batchid').val());
	$('#contFeedbackDetDialog :input#topic').val($('#contFeedbackDialog :input#topic').val());
}

function contFeedbackDetEdit() {
	$('#detRegionTabs').tabs('enableTab',0);
	$('#contFeedbackDetRegionAdd').linkbutton('enable');
	$('#contFeedbackDetRegionEdit').linkbutton('enable');
	$('#contFeedbackDetRegionRemove').linkbutton('enable');
	contFeedbackDetOptType=1;
	var rows=$('#contFeedbackDetDataGrid').datagrid('getSelections');
	//console.info(rows);
	if(rows[0].state=='未处理'){
		$("#closeDate").datebox({
            disabled: true
        });
	}else {
		$("#closeDate").datebox({
            disabled: false
        });
	}
	if(rows.length<=0){
		$.messager.alert('提示','请选择要修改的记录!','info');
		return null;
	}
	if(rows.length>1){
		$.messager.alert('提示','请选择一条记录进行修改!','info');
		return null;
	}
	$('#detRegionDataGrid').datagrid({url:'contactsController.do?getDet&contFeedbackDetId=' + rows[0].contFeedbackDetId});
	$('#contFeedbackDetForm').form('load', 'contactsController.do?loadContFeedbackDetDlg&contFeedbackDetId=' + rows[0].contFeedbackDetId);
	$('#contFeedbackDetDialog').dialog('open');
}

function contFeedbackDetRemove() {
	var rows=$('#contFeedbackDetDataGrid').datagrid('getSelections');
	if(rows.length<=0){
		$.messager.alert('提示','请选择要删除的记录!','info');
		return null;
	}
	
	$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
		if(r){
			var rows=$('#contFeedbackDetDataGrid').datagrid('getSelections');
			var idArray=[];
			for(var key in rows){
				idArray.push(rows[key].contFeedbackDetId);
			}
			$.ajax({
				type:'POST',
				url:'contactsController.do?deleteContFeedbackDet&idArray='+idArray,
				dataType:'text',
				success:function(data,status,xml){
					$('#contFeedbackDetDataGrid').datagrid('reload');
					contFeedbackSearch();
					$('#contFeedbackDetDataGrid').datagrid('unselectAll');
					$.messager.alert('提示',data+'!','info');
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.alert('提示','删除错误!','info');
				}
			});
		}
	});
}

$(function(){
	$('#contFeedbackDetDataGrid').datagrid({
		onDblClickRow : function(rowIndex, row){
			//console.info(row.state);
			if(row.state=='未处理'){
				$("#closeDate").datebox({
		            disabled: true
		        });
			}else {
				$("#closeDate").datebox({
		            disabled: false
		        });
			}
			contFeedbackDetOptType=1;
			$('#detRegionTabs').tabs('enableTab',0);
			$('#contFeedbackDetRegionAdd').linkbutton('enable');
			$('#contFeedbackDetRegionEdit').linkbutton('enable');
			$('#contFeedbackDetRegionRemove').linkbutton('enable');
			$('#contFeedbackDetForm').form('clear');
			$('#detRegionDataGrid').datagrid({url:'contactsController.do?getDet&contFeedbackDetId=' + row.contFeedbackDetId});
			$('#contFeedbackDetForm').form('load', 'contactsController.do?loadContFeedbackDetDlg&contFeedbackDetId=' + row.contFeedbackDetId);
			$('#contFeedbackDetDialog').dialog('open');
		}
	});
});

function contFeedbackDetDialogSave() {
	//console.info($('#contFeedbackDetId').val());
	$('#contFeedbackDetForm').form('submit',{
		url:'contactsController.do?addOrEditContFeedbackDet&contFeedbackDetOptType='+contFeedbackDetOptType+'&contFeedbackId='+$('#contFeedbackId').val(),
		onSubmit: function(){
			//alert($('entProp').combobox('getValue'));
			var isValid = $(this).form('validate');
			return isValid;	// 返回false将停止form提交 
		},
		success:function(data){
			$('#detRegionTabs').tabs('enableTab',0);
			$('#contFeedbackDetRegionAdd').linkbutton('enable');
			$('#contFeedbackDetRegionEdit').linkbutton('enable');
			$('#contFeedbackDetRegionRemove').linkbutton('enable');
			$('#contFeedbackDetDataGrid').datagrid('reload');
			contFeedbackSearch();
			if(contFeedbackDetOptType == 0) {
				 $.ajax({
				 url : 'contactsController.do?loadMaxId&Type=contFeedbackDet',
				 async : false,
				 type : 'get',
				 success : function(msg) {
					 //console.info(msg);
					 $('#contFeedbackDetId').val(msg);
					// console.info($('#contFeedbackDetId').val());
				 }
			 });
			}
			contFeedbackDetOptType=1;
			$.messager.alert('提示','提交成功!','info'); 
	    },
	    error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.alert('提示','提交失败!','error');
	    }
	});
}

/* ==============================contFbDet界面 结束==================================*/

/* ================================det界面 起始====================================*/

function contFeedbackDetRegionAdd() {
	detOptType = 0;
	$('#detForm').form('clear');
	$('#detDialog').dialog('open');
	regComChange();
}

function contFeedbackDetRegionEdit() {
	detOptType = 1;
	regComChange();
	$('#detForm').form('clear');
	var row = $('#detRegionDataGrid').datagrid('getSelections');
	if(row.length<=0){
		$.messager.alert('提示','请选择要修改的记录!','info');
		return null;
	}
	if(row.length>1){
		$.messager.alert('提示','请选择一条记录进行修改!','info');
		return null;
	}
	//console.info(row);
	var compCmpId = row[0].compCmpId;
	var custCmpRegionName = row[0].custCmpRegionName;
	var deptRegionName = row[0].deptRegionName;
	var countryName = row[0].countryName;
	var provinceName = row[0].provinceName;
	var cityName = row[0].cityName;
	var zoneName = row[0].zoneName;
	var custCmpRegionId = row[0].custCmpRegionId;
	var deptRegionId = row[0].deptRegionId;
	var countryId = row[0].countryId;;
	var provinceId = row[0].provinceId;
	var cityId = row[0].cityId;
	var zoneId = row[0].zoneId;
	
	$.ajax({
		url:'contactsController.do?comboxboxdata&level=opt_2&id=' + countryId,
		dataType:'json',
		async : false,
		success:function(result){
			provinceCob.combobox('loadData',result);
		}
	});

	$.ajax({
		url:'contactsController.do?comboxboxdata&level=opt_3&id=' + provinceId,
		dataType:'json',
		async : false,
		success:function(result){
			cityCob.combobox('loadData',result);
		}
	});
	//console.info(zoneId)
	if(zoneId != "" || zoneId != null) {
		//console.info("enter");
		$.ajax({
			url:'contactsController.do?comboxboxdata&level=opt_4&id=' + cityId,
			dataType:'json',
			async : false,
			success:function(result){
				zoneCob.combobox('loadData',result);
			}
		});
	}
	if(deptRegionId != "" || deptRegionId != null) {
		$.ajax({
			url:'contactsController.do?comboxboxdata&level=opt_6&id=' + custCmpRegionId,
			dataType:'json',
			async : false,
			success:function(result){
				deptCob.combobox('loadData',result);
			}
		});
	}
	//console.info(country);
	$('#detForm').form('load', 'contactsController.do?loadDetDlg&compCmpId=' + row[0].compCmpId);
	
	
	/*$('#compCmpId').val(compCmpId);
	
	$('#custCmpRegionName').val(custCmpRegionName);
	$('#deptRegionName').val( deptRegionName);
	$('#countryName').val(countryName);
	$('#provinceName').val(provinceName);
	$('#cityName').val(cityName);
	$('#zoneName').val(zoneName);
	console.info(provinceId);
	$('#custCmpRegionId').combobox('setValue', custCmpRegionId);
	$('#deptRegionId').combobox('setValue', deptRegionId);
	$('#countryId').combobox('setValue', countryId);
	$('#provinceId').combobox('setValue', provinceId);
	if($('#cityId').combobox('getValue') != 0) {
		$('#cityId').combobox('setValue', cityId);
	}
	if($('#zoneId').combobox('getValue') != 0) {
		$('#zoneId').combobox('setValue', zoneId);
	}*/

	$('#detDialog').dialog('open');
	//
}

function detDialogSave() {
	//console.info("ccid"+$('#compCmpId').val());
	$('#detForm').form('submit',{
		url:'contactsController.do?addorEditDet&detOptType='+detOptType+'&contFeedbackDetOptType='+contFeedbackDetOptType+'&contFeedbackDetId='+$('#contFeedbackDetId').val(),//插入数据库
		onSubmit: function(){
			var isValid = $(this).form('validate');
			return isValid;	// 返回false将停止form提交 
		},
		success:function(data){
			var temp = data.split("!");
			if (temp[1].length == 6) {
				$.messager.alert('提示', temp[0] + "!", 'error');
			} else if (temp[1].length == 5) {
				$.messager.alert('提示', temp[0] + "!", 'info');
			}
			$('#detDialog').dialog('close');
			$('#detRegionDataGrid').datagrid({url:'contactsController.do?getDet&contFeedbackDetId=' + $('#contFeedbackDetId').val()});
	    },
	    error:function(XMLHttpRequest, textStatus, errorThrown){
			$.messager.alert('提示','提交失败!','error');
			$('#detDialog').dialog('close');
			$('#detRegionDataGrid').datagrid({url:'contactsController.do?getDet&contFeedbackDetId=' + $('#contFeedbackDetId').val()});
		}
	});
	//$('#detRegionDataGrid').datagrid('reload');
	
	//contFeedbackDetOptType = 1;
}

function contFeedbackDetRegionRemove() {
	var rows=$('#detRegionDataGrid').datagrid('getSelections');
	if(rows.length<=0){
		$.messager.alert('提示','请选择要删除的记录!','info');
		return null;
	}
	//console.info(rows[0].compCmpId);
	$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
		if(r){
			var rows=$('#detRegionDataGrid').datagrid('getSelections');
			var idArray=[];
			//console.info(rows);
			for(var key in rows){
				idArray.push(rows[key].compCmpId);
			}
			$.ajax({
				type:'POST',
				url:'contactsController.do?deleteDet&idArray='+idArray,
				dataType:'text',
				success:function(data,status,xml){
					$('#detRegionDataGrid').datagrid('reload');
					$('#detRegionDataGrid').datagrid('unselectAll');
					$.messager.alert('提示',data+'!','info');
				},
				error:function(XMLHttpRequest, textStatus, errorThrown){
					$.messager.alert('提示','删除错误!','info');
				}
			});
		}
	});
}

$(function() {
	countryCob=$('#countryId').combobox();
	provinceCob=$('#provinceId').combobox();
	cityCob=$('#cityId').combobox();
	zoneCob=$('#zoneId').combobox();
	
	custCmpCob=$('#custCmpRegionId').combobox();
	//console.info($('#custCmpId').val());
	deptCob=$('#deptRegionId').combobox();
});

//注册选择框change事件
function regComChange(){
	//console.info("enter");
	countryCob.combobox({//选择国家下拉框
		url:'contactsController.do?comboxboxdata&level=opt_1',
		onSelect : function(record) {
			//console.info($('#countryId').combobox('getText'));
			$.ajax({
				url:'contactsController.do?comboxboxdata&level=opt_2&id=' + record.id,
				dataType:'json',
				success:function(result){
					clearCombox(provinceCob);
					provinceCob.combobox('loadData',result);
				}
			});
			clearCombox(cityCob);
			clearCombox(zoneCob);
		}
	});
	provinceCob.combobox({//选择省份下拉框
		onSelect : function(record) {
			$.ajax({
				url:'contactsController.do?comboxboxdata&level=opt_3&id=' + record.id,
				dataType:'json',
				success:function(result){
					clearCombox(cityCob);
					cityCob.combobox('loadData',result);
					cityCob.combobox('setText',"");
				}
			});
			clearCombox(zoneCob);
		}
	});
	cityCob.combobox({//选择市下拉框
		onSelect : function(record) {
			$.ajax({
				url:'contactsController.do?comboxboxdata&level=opt_4&id=' + record.id,
				dataType:'json',
				success:function(result){
					clearCombox(zoneCob);
					zoneCob.combobox('loadData',result);
					zoneCob.combobox('setText',"");
				}
			});
			//console.info(cityCob.combobox('getValue'));
			if(cityCob.combobox('getValue') == 0) {
				cityCob.combobox('clear');
			}
		}
	});
	zoneCob.combobox({
		onSelect : function(record) {
			if(zoneCob.combobox('getValue') == 0) {
				zoneCob.combobox('clear');
			}
		}
	});
	//console.info("enter");
	custCmpCob.combobox({
		url:'contactsController.do?comboxboxdata&level=opt_5',
		onSelect : function(record) {
			//console.info(record);
			$.ajax({
				url:'contactsController.do?comboxboxdata&level=opt_6&id=' + record.id,
				dataType:'json',
				success:function(result){
					clearCombox(deptCob);
					deptCob.combobox('loadData',result);
					deptCob.combobox('setText',"");
				}
			});
		}
	});
	deptCob.combobox({
		onSelect : function(record) {
			if(deptCob.combobox('getValue') == 0) {
				deptCob.combobox('clear');
			}
		}
	})
}




function clearCombox(cb){
	cb.combobox({data:[]}).combobox('clear');
}

/* det界面 结束*/


$(function(){
	
	regComChange();
	$('#detForm').form({
		onLoadSuccess : function(){
			if(cityCob.combobox('getValue') == "") {
				//console.info('enter'+cityCob.combobox('getValue'));
				cityCob.combobox('setText',"");
				zoneCob.combobox('setText',"");
			}
			if(zoneCob.combobox('getValue') == "") {
				zoneCob.combobox('setText',"");
			}
			if(deptCob.combobox('getValue') == "") {
				deptCob.combobox('setText',"");
			}
		}
	});
	$('#detRegionDataGrid').datagrid({
		onDblClickRow : function(rowIndex, row){
			$('#detForm').form('clear');
			detOptType=1;
			var compCmpId = row.compCmpId;
			var custCmpRegionName = row.custCmpRegionName;
			var deptRegionName = row.deptRegionName;
			var countryName = row.countryName;
			var provinceName = row.provinceName;
			var cityName = row.cityName;
			var zoneName = row.zoneName;
			var custCmpRegionId = row.custCmpRegionId;
			var deptRegionId = row.deptRegionId;
			var countryId = row.countryId;;
			var provinceId = row.provinceId;
			var cityId = row.cityId;
			var zoneId = row.zoneId;
			
			$.ajax({
				url:'contactsController.do?comboxboxdata&level=opt_2&id=' + countryId,
				dataType:'json',
				async : false,
				success:function(result){
					provinceCob.combobox('loadData',result);
				}
			});
			$.ajax({
				url:'contactsController.do?comboxboxdata&level=opt_3&id=' + provinceId,
				dataType:'json',
				async : false,
				success:function(result){
					cityCob.combobox('loadData',result);
					//cityCob.combobox('setText',"");
				}
			});
			//console.info(zoneId)
			if(zoneId != "" || zoneId != null) {
				//console.info("enter");
				$.ajax({
					url:'contactsController.do?comboxboxdata&level=opt_4&id=' + cityId,
					dataType:'json',
					async : false,
					success:function(result){
						zoneCob.combobox('loadData',result);
						//zoneCob.combobox('setText',"");
					}
				});
			}
			//console.info(cityCob.combobox('getValue'));
			
			if(deptRegionId != "" || deptRegionId != null) {
				$.ajax({
					url:'contactsController.do?comboxboxdata&level=opt_6&id=' + custCmpRegionId,
					dataType:'json',
					async : false,
					success:function(result){
						deptCob.combobox('loadData',result);
						//deptCob.combobox('setText',"");
					}
				});
			}
			
			$('#detForm').form('load', 'contactsController.do?loadDetDlg&compCmpId=' + row.compCmpId);
			
			/**/
			//deptCob.combobox('setText',"");

			//console.info(country);
			/*$('#compCmpId').val(compCmpId);
			
			$('#custCmpRegionName').val(custCmpRegionName);
			$('#deptRegionName').val( deptRegionName);
			$('#countryName').val(countryName);
			$('#provinceName').val(provinceName);
			$('#cityName').val(cityName);
			$('#zoneName').val(zoneName);
			//console.info(custCmpRegionId);
			$('#custCmpRegionId').combobox('setValue', custCmpRegionId);
			$('#deptRegionId').combobox('setValue', deptRegionId);
			$('#countryId').combobox('setValue', countryId);
			$('#provinceId').combobox('setValue', provinceId);
			if($('#cityId').combobox('getValue') != 0) {
				$('#cityId').combobox('setValue', cityId);
			}
			if($('#zoneId').combobox('getValue') != 0) {
				$('#zoneId').combobox('setValue', zoneId);
			}
*/
			$('#detDialog').dialog('open');
			deptCob.combobox('setText',"");
		}
	});
	
	//Dialog中的相关控件绑定
	$('#cpUserSelBtn').click(function(){
		$.chcrm.openCommDialog('contacts',false,function(val){
			var ceName = $('#ceName');
			var custId = $('#custId');
			var ccName = $('#ccName');
			var custCmpId = $('#custCmpId');
			var contactsName = $('#userName');
			var contactsId = $('#userId');
			var deName = $('#deName');
			var DeptId = $('#deptId');
			var OfficName = $('#postName');
			var OfficId = $('#postId');
			if(val.length>=1){
				//contactsName.validate('validate');
				ceName.val(val[0].contCust);
				custId.val(val[0].custId);
				ccName.val(val[0].contCmp);
				custCmpId.val(val[0].custCompId);
				contactsName.val(val[0].contName);
				contactsId.val(val[0].ct_id);
				deName.val(val[0].contDept);
				DeptId.val(val[0].deptId);
				OfficName.val(val[0].contTitle);
				OfficId.val(val[0].stateId);
				contactsName.focus();
				//contactsName.validate('validate');
			}else{
				//contactsName.validate('validate');
				ceName.val('');
				custId.val('');
				ccName.val('');
				custCmpId.val('');
				contactsName.val('');
				contactsId.val('');
				DeptName.val('');
				deName.val('');
				OfficName.val('');
				OfficId.val('');
				
				//contactsName.validate('validate');
			}
		});
	});	

	/*var buttons = $.extend([], $.fn.datebox.defaults.buttons);
	buttons.splice(1, 0, {
		text: 'MyBtn',
		handler: function(target){
			alert('click MyBtn');
		}
	});
	$('#sBegin').datebox({
		buttons: buttons
	});*/

});