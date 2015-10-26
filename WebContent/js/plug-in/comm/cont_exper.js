	var contExperOptType = -1;// 操作类型 0表示新增 1表示修改,默认值为-1
	
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
	
	// 标识变量，用于保证事件只被注册一次
	var contExperTabsEven_First = false;
	// 注册事件
	function registercontExperInfoTabsEven() {
		if (!contExperTabsEven_First) {
			$('#contExperTabs').tabs({
				onSelect : function(title, index) {
					if (index == 1) {
						loadCustExpeContDlg();
					} else if (index == 2) {
						loadExpeDetDlg();
					} else if (index == 3) {
						loadAnnex();
					}
				}
			});
			contExperTabsEven_First = true;
		}
	}
	//加载体验联系人资料
	function loadCustExpeContDlg(){
		$('#custExpeContDateGrid').datagrid({
			url :'contactsController.do?loadcustExpeContInfo&ce_id='+ $('#custExpeCont #ce_id').val() 
		});
	}
	//加载体验资料明细
	function loadExpeDetDlg(){
		$('#expeDetDateGrid').datagrid({
			url :'contactsController.do?loadExpeDetInfo&ce_id='+ $('#custExpeCont #ce_id').val() 
		});
	}
	//加载附件
	function loadAnnex(){
		var ce_id = $('#ce_id').val();
		if (ce_id != null && ce_id != '') {
			updateAnnex(10, ce_id, 1);
		}
	}
	
	var editable = true;//是否具有编辑权限
	// 页面加载完成执行
	$(function(){
		registercontExperInfoTabsEven();
		var initData = [];
		// 创建并初始化客户datagrid对象
		$('#contExperDataGrid').datagrid({
			data : initData,
			onDblClickRow : function(rowIndex, row) {
				if(editable == false){
					return;//没有权限，直接返回
				}
				contExperOptType = 1;
				$('#contExperForm').form(
						'load','contactsController.do?loadcontExperInfo&ce_id='+ row.ce_id);
				//为体验联系人资料面板下的‘体验主题’加载数据
				$('#custExpeCont #ce_title').val(row.ce_title); 
				$('#custExpeCont #ce_id').val(row.ce_id); 
				
				//为体验资料明细新增or修改对话框的体验批次和体验主题加载数据
				$('#addOrEditexpeDetDialog #cp_batchid').val(row.cp_batchid);
				$('#addOrEditexpeDetDialog #ce_title').val(row.ce_title);
				$('#addOrEditexpeDetDialog #ce_id').val(row.ce_id);
				
				$('#contExperTabs').tabs('enableTab', 1);
				$('#contExperTabs').tabs('enableTab', 2);
				$('#contExperTabs').tabs('enableTab', 3);
				$('#contExperTabs').tabs('select', 0);
				$('#contExperDialog').dialog('open');
			}
		});
	
		// 拦截联系人体验对话框关闭事件
		$('#contExperDialog').dialog({
			onBeforeClose : function() {
				$.messager.confirm('提示', '是否确定返回至主界面?', function(r) {
					if (r) {
						// 清除表单的数据
						$('#contExperForm').form('clear');
						if(contExperOptType==1)
							$('#contExperDataGrid').datagrid('unselectAll');
						contExperSearch();
						$('#contExperDialog').dialog('close',true);
					}
				});
				return false;
			}
		});
		
		
		//体验联系人资料的选择新增按钮单击事件
		$('#contExperAddBtn').click(function() {
			$.chcrm.openCommDialog('contacts',true,function(val){
				if(val.length>=1){
				//	console.info(val);
					var rtArray=[];
					var RepeatNum=0;
					for(key in val){
						var rtObj={};
						rtObj.ce_id=$('#custExpeCont #ce_id').val();
						rtObj.ct_id=val[key].ct_id;
						rtObj.de_Id=val[key].deptId;
						var ct_name=val[key].contName;
						var dept=val[key].contTitle;
						var data=$('#custExpeContDateGrid').datagrid('getData');
						var isExist=false;
						for(var i=0;i<data.rows.length;i++){
							if(ct_name==data.rows[i].ct_name && 
									dept==data.rows[i].company_department_position.split('-')[2]){
								isExist=true;
								RepeatNum=RepeatNum+1;
								break;
							}
						}
						if(!isExist)
							rtArray.push(rtObj);
					}
					if(val.length==RepeatNum){
						$.messager.alert('提示','所选择的联系人已存在!','info');
						return false;
					}
					$.ajax({
						type:'POST',
						url:'contactsController.do?insertCustExpeCont&rtArray='+JSON.stringify(rtArray),
						dataType:'text',
						success:function(data,status,xml){
							loadCustExpeContDlg();
							$.messager.alert('提示',data+'!','info');
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							$.messager.alert('提示','新增错误!','info');
						}
					});
				}
			});
		});
		//体验联系人资料的删除按钮单击事件
		$('#contExperRemoveBtn').click(function(){
			var rows=$('#custExpeContDateGrid').datagrid('getSelections');
			if(rows.length<=0){
				$.messager.alert('提示','请选择要删除的记录!','info');
				return null;
			}
			
			$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
				if(r){
					var rows=$('#custExpeContDateGrid').datagrid('getSelections');
					var idArray=[];
					
					for(var key in rows){
						idArray.push(rows[key].cc_id);
					}
					
					$.ajax({
						type:'POST',
						url:'contactsController.do?delcustExpeCont&idArray='+idArray,
						dataType:'text',
						success:function(data,status,xml){
							$('#custExpeContDateGrid').datagrid('unselectAll');
						//	$('#custExpeContDateGrid').datagrid('reload');
							loadCustExpeContDlg();
							$('#contExperDataGrid').datagrid('reload');//主界面刷新
							$.messager.alert('提示',data+'!','info');
						},
						error:function(XMLHttpRequest, textStatus, errorThrown){
							$.messager.alert('提示','删除错误!','info');
						}
					});
				}
			});
		});

	});
	
	//主界面的查询按钮单击事件
	function contExperSearch(){
		var cp_batchid = $.trim($('#cp_batchid').val());
		var ce_title = $.trim($('#ce_title').val());
		var ct_name=$.trim($('#ct_name').val());
		var beginDate = $('#beginDate').datebox('getValue');
		var endDate = $('#endDate').datebox('getValue');
/*			var ContactsUrl = 'contactsController.do?searchContExperInfo&cp_batchid='
				+ cp_batchid + '&ce_title=' + ce_title
				+ '&ct_name=' + ct_name
				+ '&beginDate=' + beginDate
				+ '&endDate=' + endDate;*/
		var ContactsUrl = 'contactsController.do?searchContExperInfo';
		$.ajax({
			url:ContactsUrl,
			type:'POST',
			dataType:'JSON',
			data:{cp_batchid:cp_batchid,ce_title:ce_title,ct_name:ct_name,beginDate:beginDate,endDate:endDate},
			success:function(result){
				$('#contExperDataGrid').datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
	}
	
	//主界面的新增事件
	function contExperAdd(){
		contExperOptType=0;
		$('#contExperForm').form('load','contactsController.do?loadContExperMaxId');
		$('#contExperTabs').tabs('disableTab', 1);
		$('#contExperTabs').tabs('disableTab', 2);
		$('#contExperTabs').tabs('disableTab', 3);
		$('#contExperTabs').tabs('select', 0);
		$('#contExperDialog').dialog('open');
	}
	
	// 主界面修改事件
	function contExperEdit() {
		contExperOptType = 1;
		var rows = $('#contExperDataGrid').datagrid('getSelections');
		if (rows.length <= 0) {
			$.messager.alert('提示', '请选择要修改的记录!', 'info');
			return null;
		}

		if (rows.length > 1) {
			$.messager.alert('提示', '请选择一条记录进行修改!', 'info');
			return null;
		}

		var row = $('#contExperDataGrid').datagrid('getSelected');
		$('#contExperForm').form(
				'load','contactsController.do?loadcontExperInfo&ce_id='+ row.ce_id);
		
		$('#custExpeCont #ce_title').val(row.ce_title); //为体验联系人资料面板下的‘体验主题’加载数据
		$('#custExpeCont #ce_id').val(row.ce_id); 
		
		//为体验资料明细新增or修改对话框的体验批次、体验主题、批次id加载数据
		$('#addOrEditexpeDetDialog #cp_batchid').val(row.cp_batchid);
		$('#addOrEditexpeDetDialog #ce_title').val(row.ce_title);
		$('#addOrEditexpeDetDialog #ce_id').val(row.ce_id);
		
		$('#contExperTabs').tabs('enableTab', 1);
		$('#contExperTabs').tabs('enableTab', 2);
		$('#contExperTabs').tabs('enableTab', 3);
		$('#contExperTabs').tabs('select', 0);
		$('#contExperDialog').dialog('open');
	}
	
	// 主界面的删除事件
	function contExperRemove(){
		var rows=$('#contExperDataGrid').datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return null;
		}
		
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){
				var rows=$('#contExperDataGrid').datagrid('getSelections');
				var idArray=[];
				var indexs=[];//存放删除行的索引
				for(var key in rows){
					idArray.push(rows[key].ce_id);
					indexs.push($('#contExperDataGrid').datagrid('getRowIndex',rows[key]));
				}
				
				$.ajax({
					type:'POST',
					url:'contactsController.do?delcontExper&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						contExperSearch();
						for(var i in indexs){
							$('#contExperDataGrid').datagrid('deleteRow',indexs[i]);
						}
						$('#contExperDataGrid').datagrid('getPager').pagination('select',1); //跳到第一页
						$('#contExperDataGrid').datagrid('unselectAll');
						$.messager.alert('提示',data+'!','info');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','info');
					}
				});
			}
		});
	}
	//联系人体验信息的表单提交事件
	function contExperDialogSave(){
		$('#contExperForm').form('submit',{
			url:'contactsController.do?addorEditcontExper&contExperOptType='+contExperOptType,
			onSubmit: function(){
				var isValid = $(this).form('validate');
				return isValid;	// 返回false将停止form提交 
			},
			success:function(data){
				var jsdata = eval('(' + data + ')'); //change the JSON string to javascript object
				if(jsdata.state==-1)
					$.messager.alert('提示','体验批次已存在，请关闭当前窗口重试!','info'); 
				else{
					if(contExperOptType==0){
						$('#contExperTabs').tabs('enableTab',1);	
						$('#contExperTabs').tabs('enableTab',2);	
						$('#contExperTabs').tabs('enableTab',3);	
						$('#contExperTabs').tabs('select',1);
					}
					contExperOptType=1;
					$('#contExperDataGrid').datagrid('reload');
					$('#custExpeCont #ce_title').val(jsdata.ce_title);//为体验联系人资料面板下的‘体验主题’加载数据
					$('#custExpeCont #ce_id').val(jsdata.ce_id); 
					
					//为体验资料明细新增or修改对话框的体验批次、体验主题、批次id加载数据
					$('#addOrEditexpeDetDialog #cp_batchid').val(jsdata.cp_batchid);
					$('#addOrEditexpeDetDialog #ce_title').val(jsdata.ce_title);
					$('#addOrEditexpeDetDialog #ce_id').val(jsdata.ce_id);
					//获取选择的选项卡面板的索引
					var tab = $('#contExperTabs').tabs('getSelected');
					var index = $('#contExperTabs').tabs('getTabIndex',tab);
					if(index==1)
						loadCustExpeContDlg();
					contExperSearch();
					$.messager.alert('提示','提交成功!','info'); 
				}
		    },
		    error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.alert('提示','提交失败!','error');
			}
		});
	}
	
	//***************************************************************//
	//**					体验资料明细tab面板						   **//
	//***************************************************************//
	expeDetOptType = -1;// 操作类型 0表示新增 1表示修改,默认值为-1
	$(function(){
		$('#expeDetDateGrid').datagrid({
			onDblClickRow : function(rowIndex, row) {
				expeDetOptType = 1;
				$('#ed_contExpe').combobox('select', row.ed_contExpe);
				$('#ed_expeDesc').val(row.ed_expeDesc);
				$('#addOrEditexpeDetDialog #ed_id').val(row.ed_id);
				var ce_id=$('#addOrEditexpeDetDialog #ce_id').val();
				$('#expeContDataGrid').datagrid({
					url :'contactsController.do?loadExpeContInfo&ed_id='+ row.ed_id +'&ce_id='+ce_id
				});
				$('#addOrEditexpeDetDialog').dialog('setTitle','体验资料明细_修改');
				$('#addOrEditexpeDetDialog').dialog('open');
			}
		});
		//体验资料明细新增or修改的选择新增按钮的单击事件
		$('#expeDetAddBtn').click(function() {
			var ce_id=$('#addOrEditexpeDetDialog #ce_id').val();
			$.chcrm.openExperienceContacts(ce_id,true,function(val){//
				if(val.length>=1){
					var RepeatNum=0;
					for(var i=0;i<val.length;i++){
						var data=$('#expeContDataGrid').datagrid('getData');
						var exist=false;
						for(var j=0;j<data.rows.length;j++){
							if(val[i].contName==data.rows[j].ct_name && val[i].contDept==data.rows[j].de_name){
								exist=true;
								RepeatNum=RepeatNum+1;
								break;
							}
						}
						if(!exist){
							$('#expeContDataGrid').datagrid('appendRow',{
								ct_id:val[i].ct_id,
								de_Id:val[i].deptId,
								ct_name:val[i].contName,
								ce_name:val[i].contCust,
								cc_name:val[i].contCmp,
								de_name:val[i].contDept,
								dd_declareInfo:val[i].contTitle
							});			
						}
					}
					if(val.length==RepeatNum){
						$.messager.alert('提示','所选择的联系人已存在!','info');
					}
				}
			});
		});
		// 拦截体验资料明细_新增or修改对话框关闭事件
		$('#addOrEditexpeDetDialog').dialog({
			onBeforeClose : function() {
				clearPage();
			}
		});
	});
	//体验资料明细的新增事件
	function expeDetAdd(){
		expeDetOptType = 0;
		$('#addOrEditexpeDetDialog #ed_contExpe').combobox('validate');
		$('#addOrEditexpeDetDialog').dialog('setTitle','体验资料明细_新增');
		$('#addOrEditexpeDetDialog').dialog('open');
	}
	//体验资料明细的修改事件
	function expeDetEdit(){
		expeDetOptType = 1;
		var rows = $('#expeDetDateGrid').datagrid('getSelections');
		if (rows.length <= 0) {
			$.messager.alert('提示', '请选择要修改的记录!', 'info');
			return null;
		}

		if (rows.length > 1) {
			$.messager.alert('提示', '请选择一条记录进行修改!', 'info');
			return null;
		}
		
		var row = $('#expeDetDateGrid').datagrid('getSelected');
		
		
		$('#ed_expeDesc').val(row.ed_expeDesc);
		$('#addOrEditexpeDetDialog #ed_id').val(row.ed_id);
		$('#ed_contExpe').combobox('select', row.ed_contExpe);
	//	alert('ed_id='+row.ed_id);
		var ce_id=$('#addOrEditexpeDetDialog #ce_id').val();
		$('#expeContDataGrid').datagrid({
			url :'contactsController.do?loadExpeContInfo&ed_id='+ row.ed_id +'&ce_id='+ce_id
		});
		
		$('#addOrEditexpeDetDialog').dialog('setTitle','体验资料明细_修改');
		$('#addOrEditexpeDetDialog').dialog('open');
	}
	//体验资料明细的删除事件
	function expeDetRemove(){
		var rows=$('#expeDetDateGrid').datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return null;
		}
		
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){
				var rows=$('#expeDetDateGrid').datagrid('getSelections');
				var idArray=[];
				
				for(var key in rows){
					idArray.push(rows[key].ed_id);
				}
				$.ajax({
					type:'POST',
					url:'contactsController.do?delExpeDet&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						$('#expeDetDateGrid').datagrid('unselectAll');
					//	$('#expeDetDateGrid').datagrid('reload');
						loadExpeDetDlg();
						$('#contExperDataGrid').datagrid('reload');//主界面刷新
						$.messager.alert('提示',data+'!','info');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','info');
					}
				});
			}
		});
	}
	//体验资料明细_新增or修改的提交按钮事件
	function contExperDetSave(){
		var data=$('#expeContDataGrid').datagrid('getRows');
		$('#addOrEditexpeDetForm').form('submit',{
			url:'contactsController.do?addorEditexpeDet&expeDetOptType='+expeDetOptType
			+'&data='+JSON.stringify(data),
			//提交之前检查数据合法性
			onSubmit: function(){
				var data=$('#expeDetDateGrid').datagrid('getData');
				var ed_id=$('#addOrEditexpeDetDialog #ed_id').val();
				//获取体验记录分类
				var ed_contExpe=$('#addOrEditexpeDetDialog #ed_contExpe').combobox('getText');
				//查找是否重复 
				for(var i=0;i<data.rows.length;i++){
					if(ed_id==data.rows[i].ed_id && expeDetOptType==1){//修改操作时跳过它自己
						continue;
					}
					if(ed_contExpe==data.rows[i].ed_contExpe){
						$.messager.alert('提示','[ '+ed_contExpe+' ] 已存在!','info');
						return false;
					}
				}
	
				var isValid = $(this).form('validate');
				return isValid;	// 返回false将停止form提交 
			},
			success:function(data){
				if(data=='true'){
					$.messager.alert('提示','提交成功!','info'); 
				}else{
					$.messager.alert('提示','提交失败!','error');
				}
				clearPage();
			//	$('#expeDetDateGrid').datagrid('reload');
				loadExpeDetDlg();
				$('#contExperDataGrid').datagrid('reload');//主界面刷新
		    },
		    error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.alert('提示','提交失败!','error');
			}
		});
	}
	//体验资料明细_新增or修改的取消按钮事件
	function contExperDetcancel(){
		clearPage();
		$('#expeDetDateGrid').datagrid('unselectAll');
	}
	// 此方法用于用户关闭体验资料明细_新增or修改对话框后的清除工作,使新增或修改对话回复最初状态
	function clearPage(){
		$('#contExperTabs').tabs('select', 2);
		$('#ed_contExpe').combobox('clear');
		$('#ed_expeDesc').val('');
	    $('#expeContDataGrid').datagrid('loadData',{'total':0,'rows':[]});//清空datagrid数据  
	    $('#expeContDataGrid').datagrid({url:''});
	    $('#addOrEditexpeDetDialog').dialog('close',true);
	}