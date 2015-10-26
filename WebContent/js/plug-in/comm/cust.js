	
	/*扩展easyui组件,增加验证规则*/
	$.extend($.fn.validatebox.defaults.rules, {
		businessCheck : {
			validator : function(value) {
				return /^[+-]?\d{1,9}(\.\d{1,2})?$/i.test(value);
			},
			message : '小数位不可超过2位，整数位不可超过9位'
		},
		/*检测号码是否符合正则表达式*/
		telCheck: {   
			validator: function(value,param){   
				return matchTel(value);
			},   
        	message: '请输入正确的电话号码!'  
		},
		
		/*检测客户代码是否已被使用*/
		custCodeCheck:{
			validator: function(value,param){
				var url='custController.do?checkCustCode';
				var data={ctOptType:custOptType,custId:$('#custId').val(),custCode:value};
				return custCheck(url,data);
			},   
        	message: '客户代码已被使用!'  
		},
		
		/*检测客户代码是否已被使用*/
		custNameCheck:{
			validator: function(value,param){   
				var url='custController.do?checkCustName';
				var data={ctOptType:custOptType,custId:$('#custId').val(),custName:value};
				return custCheck(url,data);
			},   
        	message: '客户名称已被使用!'  
		}
	}); 
	
	//验证一个号码是否符合正则表达式
	function matchTel(value) {
		return /^0?(13[0-9]|15[012356789]|18[0236789]|14[57])[0-9]{8}$/.test(value)||/^(\({0,1}\d{3,5})\){0,1}(-){0,1}(\d{7,8})$/.test(value);
    }

	//检测客户代码和名称是否已被使用
	function custCheck(url,data){
		var flag=false;
		$.ajax({
			async:false,
			url:url,
			data:data,
			dataType:'text',
			success:function(result){
				if(result=='true'){
					flag=false;
				}else if(result=='false'){
					flag=true;
				}
			}
		});
		return flag;
	}
	
	var custOptType=-1;//操作类型 0表示新增 1表示修改,默认值为-1
	var url_add='custController.do?addRegion';//添加路径
	var url_query='custController.do?queryRegion';//查询路径
	var url_del='custController.do?delRegion';//删除路径
	
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
	
	//查询客户资料
	function searCustInfo(){
		var s_custName=$('#s_custName').val();//客户名称
		var s_custType=$('#s_custType').combobox('getValue');//客户类别
		var s_entProp=$('#s_entProp').combobox('getValue');//企业性质  
		var s_custState=$('#s_custState').combobox('getValue');//客户状态
		if(s_custType==-100){
			s_custType='';
		}
		if(s_entProp==-100){
			s_entProp='';
		}
		if(typeof s_custState==='undefined'){
			s_custState='';
		}
		var custUrl='custController.do?searchCustInfo';
		$.ajax({
			url:custUrl,
			type:'POST',
			dataType:'JSON',
			data:{custName:s_custName,custType:s_custType,entProp:s_entProp,custState:s_custState},
			success:function(result){
				simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
	}
	
	//页面加载完成执行
	$(function(){
		//创建并初始化客户datagrid对象
		simpleDataGrid=$('#custDataGrid').datagrid({
			data:[],
			onDblClickRow:function(rowIndex, row){//datagrid行双击事件
				custOptType=1;
				$('#custForm').form('load','custController.do?loadCustInfo&ceId='+row.custId);
				$('#custInfoTab').tabs('enableTab',1);
				$('#custInfoTab').tabs('enableTab',2);		
				$('#custInfoTab').tabs('select',0);
				$('#custCode').attr('readonly','readonly'); 
				$('#custCode').css('background','#CFD1D5'); 
				simplecustDialog.dialog('setTitle','修改');
				simplecustDialog.dialog('open');
			}
		});
		
		//客户查询按钮单击事件	
		$('#custSearchBtn').bind('click',function(){
			searCustInfo();
		});
		
		
		//拦截对话关闭事件
		simplecustDialog=$('#custDialog').dialog({
			//  面板关闭前触发 
			onBeforeClose:function(){
				var custCode=$('#custCode').val();
				var custName=$('#custName').val();
				if((custCode==''&&custName=='')){
					clearPage();
					return true;
				}else{
					$.messager.confirm('提示','是否确定返回至主界面?',function(r){ 
						if(r){
							clearPage();
							simplecustDialog.dialog('close',true); 
						 } 
					});
				}
				return false;
			}
		});
		
		//行业代码选择按钮 （新增窗口）
		$('#tradecodeBtn').click(function(){
			$.chcrm.openCommDialog('tradeCode',false,function(val){
				var tcText=$('#custTradCodetext');
				var tcHidden=$('#custTradCodehidden');
				if(val.length>=1){
					tcText.val(val[0].tradeCode);
					tcText.focus();
					tcHidden.val(val[0].id);
				}else{
					tcText.val('');
					tcText.focus();
					tcHidden.val('');
				}
			});
		});
		
		//总部地址选择按钮 （新增窗口）
		$('#totalAdrrBtn').click(function(){
			$.chcrm.openCommDialog('area',false,function(val){
				var tcText=$('#totalAdrrtext');
				var tcHidden=$('#totalAdrrhidden');
				if(val.length>=1){
					var a_text=val[0].countryName;
					var a_hidden=val[0].countryId;
					if(val[0].provinceName!=null&&val[0].provinceId!=0){
						a_text+=','+val[0].provinceName;
						a_hidden+=','+val[0].provinceId;
					}
					if(val[0].cityName!=null&&val[0].cityId!=0){
						a_text+=','+val[0].cityName;
						a_hidden+=','+val[0].cityId;
					}
					if(val[0].zoneName!=null&&val[0].zoneId!=0){
						a_text+=','+val[0].zoneName;
						a_hidden+=','+val[0].zoneId;
					}
					tcText.val(a_text);
					tcHidden.val(a_hidden);
					tcText.focus();
				}else{
					tcText.val('');
					tcText.focus();
					tcHidden.val('');
				}
			});	
		});
		
		//客户负责人选择按钮 （新增窗口）
		$('#custManageBtn').click(function(){
			$.chcrm.openCommDialog('contacts',false,function(val){
				var tcText=$('#custManagertext');
				var tcHidden=$('#custManagerhidden');
				if(val.length>=1){
					tcText.val(val[0].contName);
					tcText.focus();
					tcHidden.val(val[0].ct_id);
				}else{
					tcText.val('');
					tcText.focus();
					tcHidden.val('');
				}
			});
			
		});
		
		//管理机构部门选择按钮  （新增窗口）
		$('#custManageDeptBtn').click(function(){
			$.chcrm.openCommDialog('dept',false,function(val){
				var tcText_comp=$('#custManageComptext');
				var tcHidden_comp=$('#custManageComphidden');
				
				var tcText_dept=$('#custManageDepttext');
				var tcHidden_dept=$('#custManageDepthidden');
				
				if(val.length>=1){
					tcText_comp.val(val[0].compName);
					tcHidden_comp.val(val[0].compId);
					tcText_dept.val(val[0].deptName);
					tcHidden_dept.val(val[0].deptId);
					tcText_dept.focus();
				}else{
					tcText_comp.val('');
					tcHidden_comp.val('');
					tcText_dept.val('');
					tcHidden_dept.val('');
					tcText_dept.focus();
				}
			});
		});	
		
		
		$('#custForm').form({
			onLoadSuccess:function(){
				if($('#custState').combobox('getValue')==1){
					$('#custInefDate').datebox('disable');
				}else if($('#custState').combobox('getValue')==2){
					$('#custInefDate').datebox('enable');
				}
			}
		});
		
		//'是否有大区管理'下拉列表框值改变时,做出响应
		$('#custRegion').combobox({
			onSelect:function(record){
				
				$('#custInfoTab').tabs('disableTab',1);
				/*if($('#custRegion').combobox('getValue')==0&&custOptType==1){
					$.messager.confirm('提示','将在提交客户资料时,删除客户所辖区域资料,是否继续?',function(r){
						if(r){
							$.ajax({
								url:'custController.do?isCompHaveRegion',
								dataType:'text',
								data:{custId:$('#custId').val()},
								success:function(result){
									if(result=='true'){
										$.messager.alert('提示','该客户属下客户公司存在大区资料,不允许更改为否!','info');
										$('#custRegion').combobox('setValue',1);
									}
								}
							});
							$('#custInfoTab').tabs('disableTab',1);
						}else{
							//$.post('custController.do?updateCustRegionState',{region:1,custId:$('#custId').val()});
							$('#custRegion').combobox('setValue',1);
						}
					});
				}else if($('#custRegion').combobox('getValue')==1&&custOptType==1){
					//$.post('custController.do?updateCustRegionState',{region:1,custId:$('#custId').val()});
					$('#custInfoTab').tabs('disableTab',1);
				}*/
				
				
			}
		});
		
		//展开整体区域结构
		$('#expandBtn').click(function(){
			$('#area_tree').tree('expandAll');
		});
		
		//收合整体区域结构
		$('#collapseBtn').click(function(){
			$('#area_tree').tree('collapseAll');
		});
		//刷新整体区域结构
		$('#refreshBtn').click(function(){
			$('#area_tree').tree({
				url:'custController.do?areaTree.json&custId='+$('#custId').val()
			});
			$('#area_tree').tree('reload');
		});
		
		$('#custState').combobox({
			onChange:function(newValue,oldValue){
				if(custOptType==1){
					if(newValue==2){
						$.messager.confirm('提示','将更改属下客户公司的状态,是否继续?',function(r){
							if(r){
								$('#custInefDate').datebox('setValue',new Date().toLocaleDateString());
								$('#custInefDate').datebox('enable');
								//$.post('custController.do?updateCustCompState',{state:2,custId:$('#custId').val()});
							}else{
								$('#custState').combobox('setValue',1);
							}
						});
					}else{
						$('#custInefDate').datebox('clear');
						$('#custInefDate').datebox('disable');
						//$.post('custController.do?updateCustCompState',{state:1,custId:$('#custId').val()});
					}
				}else{
					if(newValue==2){
						$('#custInefDate').datebox('setValue',new Date().toLocaleDateString());
						$('#custInefDate').datebox('enable');
					}else{
						$('#custInefDate').datebox('clear');
						$('#custInefDate').datebox('disable');
					}
				}
			}
		});
		
		
		$('#custInfoTab').tabs({
			onSelect:function(title,index){
				if(index==1){
					if($('#custRegion').combobox('getValue')==0){
						$('#regionTabs').tabs('disableTab',0);
						$('#regionTabs').tabs('disableTab',1);		
						$('#regionTabs').tabs('disableTab',2);
						$('#regionTabs').tabs('select',3);
						
						$('#area_regionOneName').val('');
						$('#area_regionTwoName').val('');
						$('#area_regionThreeName').val('');
						
						updateDataGrid(4,1,1,$('#custId').val(),2,'');
					}else if($('#custRegion').combobox('getValue')==1){
						$('#regionTabs').tabs('enableTab',0);
						$('#regionTabs').tabs('enableTab',1);
						$('#regionTabs').tabs('enableTab',2);
						$('#regionTabs').tabs('select',0);
					}
						
					$('#regionOneDg').datagrid({
						url:url_query+'&region=region_one'+'&custId='+$('#custId').val()
					});
					
					clearRegionCombobox();
				}else if(index==2){
					updateAnnex(1,$('#custId').val(),1);//调用附件
				}
			}
		});
		
		registerRegionTabsEven();
		
	});
	
	//此方法用于用户关闭新增或修改面板后的清除工作,使新增或修改对话回复最初状态
	function clearPage(){	
		//清除大区一级、二级、三级的文本框	
		$('#regionOneName').val('');
		$('#one_regionTwoName').val('');
		$('#regionTwoName').val('');
		$('#one_regionThreeName').val('');
		$('#two_regionThreeName').val('');
		$('#regionThreeName').val('');
		$('#area_regionOneName').val('');
		$('#area_regionTwoName').val('');
		$('#area_regionThreeName').val('');
		//使用tab面板回到第一个面板
		$('#custInfoTab').tabs('select',0);
		$('#regionTabs').tabs('select',0);
		//清除表单的数据
		$('#custForm').form('clear');
		$('#area_tree').tree({
			url:'custController.do?areaTree.json&custId=-100'
		});
	}
	
	//新增事件
	function addCust(){
		custOptType=0;
		$('#custForm').form('load','custController.do?loadCustMaxId');
		$('#custInfoTab').tabs('disableTab',1);
		$('#custInfoTab').tabs('disableTab',2);
		$('#custCode').removeAttr('readonly');
		$('#custCode').css('background','#FFFFFF'); 
		simplecustDialog.dialog('setTitle','新增');
		simplecustDialog.dialog('open');
	}
	
	//修改事件
	function editCust(){
		custOptType=1;
		var rows=simpleDataGrid.datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return null;
		}
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}
		var row=simpleDataGrid.datagrid('getSelected');
		$('#custForm').form('load','custController.do?loadCustInfo&ceId='+row.custId);
		$('#custInfoTab').tabs('enableTab',1);
		$('#custInfoTab').tabs('enableTab',2);		
		$('#custInfoTab').tabs('select',0);
		$('#custCode').attr('readonly','readonly'); 
		$('#custCode').css('background','#CFD1D5'); 
		simplecustDialog.dialog('setTitle','修改');
		simplecustDialog.dialog('open');
	}
	
	//删除事件
	function delCust(){
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
					idArray.push(rows[key].custId);
				}
				$.ajax({
					type:'POST',
					url:'custController.do?delCust&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						searCustInfo();
						$.messager.alert('提示',data+'!','info');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','info');
					}
				});
			}
		});
	}
	
	
	//表单提交事件
	function custDialogSave(){
		//当修改提交时
		if(custOptType==1){
			var custRegionData={custId:$('#custId').val(),custRegion:$('#custRegion').combobox('getValue')};
			var regionFlag=false;
			regionFlag=isCustCodeOrName('custController.do?isRegionStateChange',custRegionData);
			if(regionFlag){
				$.messager.confirm('提示','将清除[所辖区域]中所有资料，是否继续?',function(r){
					if(r){
						custFormSave();
					}
				});
			}else{
				custFormSave();
			}
		}else{
			custFormSave();
		}
	}
	
	function custFormSave(){
		var p_custId=$('#custId').val();
		var p_custCode=$('#custCode').val();
		var p_custName=$('#custName').val();
		
		$('#custForm').form('submit',{
			url:'custController.do?addorEditCust&ctOptType='+custOptType,
			onSubmit: function(){
				var checkCustCodeUrl='custController.do?checkCustCode';
				var checkCustCodeData={custId:p_custId,custCode:p_custCode,ctOptType:custOptType};
				var checkCustNameUrl='custController.do?checkCustName';
				var checkCustNameData={custId:p_custId,custName:p_custName,ctOptType:custOptType};
				if(isCustCodeOrName(checkCustCodeUrl,checkCustCodeData)){
					$.messager.alert('提示','客户代码已被使用,请重新输入!','error');
					return false;
				}
				
				if(isCustCodeOrName(checkCustNameUrl,checkCustNameData)){
					$.messager.alert('提示','客户名称已被使用,请重新输入!','error');
					return false;
				}
				
				var isValid = $(this).form('validate');
				if(!isValid){
					$.messager.alert('提示','资料不允许提交,请检查红色背景项内容!','info');
				}
				return isValid;	// 返回false将停止form提交 
			},
			success:function(data){
				if(data>=1){
					$('#custInfoTab').tabs('enableTab',1);
					if(custOptType==0){
						$('#custId').val(data);
						$('#custInfoTab').tabs('enableTab',2);	
						$('#custInfoTab').tabs('select',1);
						if($('#custRegion').combobox('getValue')==1){
							$('#regionTabs').tabs('select',0);
						}else{
							$('#regionTabs').tabs('select',3);
						}
					}
					custOptType=1;
					searCustInfo();
					$.messager.alert('提示','提交成功!','info'); 
				}else{
					$.messager.alert('提示','提交失败!','info'); 
				}
		    }
		});
	}
	
	
	
	function regionOneAdd(){
		var s_custId=$('#custId').val();
		var regionOneName=$('#regionOneName').val();
		if($.trim(regionOneName)==''){
			$.messager.alert('提示','请输入大区一级名称!','info');
			return;
		}	
		var checkData={custId:$('#custId').val(),region:'region_one',regionName:regionOneName};
		if(isRegionSameName(checkData)){
			$.messager.alert('提示','大区名称已被使用,请重新输入!','info');
		}else{
			var data={region:'region_one',custId:s_custId,regionOneName:regionOneName};
			sendData(url_add,data,function(){
				$('#regionOneName').val('');
				$('#regionOneDg').datagrid('reload');
				$.messager.alert('提示','新增成功!','info');
			});	
		}
	}

	function regionOneDelete(){
		var s_custId=$('#custId').val();
		var rows=$('#regionOneDg').datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择所要删除的记录!','info');
			return;
		}else{
			$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
				if(r){
					var idArray=[];
					for(var key in rows){
						idArray.push(rows[key].regionOneId);
					}
					var data={region:'region_one',custId:s_custId,idArray:idArray.join(',')};
					sendData(url_del,data,function(){
						$('#regionOneDg').datagrid('reload');
						$.messager.alert('提示','删除成功!','info');
					});
				}
			});
		}
	}
	
	
	function regionTwoAdd(){
		var row=$('#regionOneDg').datagrid('getSelected');
		var s_regionOneId=row.regionOneId;
		var s_regionTwoName=$('#regionTwoName').val();
		if($.trim(s_regionTwoName)==''){
			$.messager.alert('提示','请输入大区二级的名称!','info');
			return;
		}
			var checkData={custId:$('#custId').val(),region:'region_two',regionName:s_regionTwoName};
			if(isRegionSameName(checkData)){
				$.messager.alert('提示','大区名称已被使用,请重新输入!','info');
			}else{
				var data={region:'region_two',regionOneId:s_regionOneId,regionTwoName:s_regionTwoName};
				sendData(url_add,data,function(){
					$('#regionTwoName').val('');
					$('#regionTwoDg').datagrid('reload');
					$.messager.alert('提示','新增成功!','info');
				});	
			}
	}
	function regionTwoDelete(){
		var rows=$('#regionTwoDg').datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择所要删除的记录!','info');
			return;
		}else{
			$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
				if(r){
					var idArray=[];
					for(var key in rows){
						idArray.push(rows[key].regionTwoId);
					}
					var data={region:'region_two',idArray:idArray.join(',')};
					sendData(url_del,data,function(){
						$('#regionTwoDg').datagrid('reload');
						$.messager.alert('提示','删除成功!','info');
					});
				}
			});
		}
	}
	
	
	function regionThreeAdd(){
		var row_two=$('#regionTwoDg').datagrid('getSelected');
		var s_regionTwoId=row_two.regionTwoId;
		var s_region='region_three';
		var s_regionThreeName=$('#regionThreeName').val();
		if($.trim(s_regionThreeName)==''){
			$.messager.alert('提示','请输入大区三级的名称!','info');
			return;
		}
		var checkData={custId:$('#custId').val(),region:'region_three',regionName:s_regionThreeName};
		if(isRegionSameName(checkData)){
			$.messager.alert('提示','大区名称已被使用,请重新输入!','info');
		}else{
			var data={region:'region_three',regionTwoId:s_regionTwoId,regionThreeName:s_regionThreeName};
			sendData(url_add,data,function(){
				$('#regionThreeName').val('');
				$('#regionThreeDg').datagrid('reload');
				$.messager.alert('提示','新增成功!','info');
			});	
		}
	}
	function regionThreeDelete(){
		var rows=$('#regionThreeDg').datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择所要删除的记录!','info');
			return;
		}else{
			$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
				if(r){
					var idArray=[];
					for(var key in rows){
						idArray.push(rows[key].regionThreeId);
					}
					var data={region:'region_three',idArray:idArray.join(',')};
					sendData(url_del,data,function(){
						$('#regionThreeDg').datagrid('reload');
						$.messager.alert('提示','删除成功!','info');
					});
				}
			});
		}
	}

	
	
	
	function registerRegionTabsEven(){		
		$('#regionTabs').tabs({
				onSelect:function(title,index){
					if(index==1){
						var rows=$('#regionOneDg').datagrid('getSelections');
						if(rows.length>1){
							$('#regionTabs').tabs('select',0);
							$.messager.alert('提示','请选择一条大区一级记录!','info');
							return;
						}
						var row=$('#regionOneDg').datagrid('getSelected');
						if(!row){
							$('#regionTabs').tabs('select',0);
							$.messager.alert('提示','请选择大区一级记录!','info');
							return;
						}
						if($('#one_regionTwoName').val()==row.regionOneName){
							return;
						}
						$('#one_regionTwoName').val(row.regionOneName);
						$('#regionTwoDg').datagrid({
							url:url_query+'&region=region_two'+'&regionOneId='+row.regionOneId
						});	
					}else if(index==2){
						var rows_one=$('#regionOneDg').datagrid('getSelections');
						if(rows_one.length>1){
							$('#regionTabs').tabs('select',0);
							$.messager.alert('提示','请选择一条大区一级记录!','info');
							return;
						}
						var row_one=$('#regionOneDg').datagrid('getSelected');
						if(!row_one){
							$('#regionTabs').tabs('select',0);
							$.messager.alert('提示','请选大区一级记录!','info');
							return;
						}
						
						var rows_two=$('#regionTwoDg').datagrid('getSelections');
						if(rows_two.length>1){
							$('#regionTabs').tabs('select',1);
							$.messager.alert('提示','请选择一条大区二级记录!','info');
							return;
						}
						var row_two=$('#regionTwoDg').datagrid('getSelected');
						if(!row_two){
							$('#regionTabs').tabs('select',1);
							$.messager.alert('提示','请选大区二级记录!','info');
							return;
						}
						
						if($('#one_regionThreeName').val()==row_one.regionOneName&&$('#two_regionThreeName').val()==row_two.regionTwoName){
							return;
						}
						
						$('#one_regionThreeName').val(row_one.regionOneName);
						$('#two_regionThreeName').val(row_two.regionTwoName);
						$('#regionThreeDg').datagrid({
							url:url_query+'&region=region_three'+'&regionOneId='+row_one.regionOneId+'&regionTwoId='+row_two.regionTwoId
						});
					}else if(index==3){
						clearRegionCombobox();
						if($('#custRegion').combobox('getValue')==1){
							var row_one=$('#regionOneDg').datagrid('getSelected');
							if(!row_one){
								$('#regionTabs').tabs('select',0);
								$.messager.alert('提示','请选大区一级记录!','info');
								return;
							}
							
							var row_two=$('#regionTwoDg').datagrid('getSelected');
							if(!row_two){
								$('#regionTabs').tabs('select',1);
								$.messager.alert('提示','请选大区二级记录!','info');
								return;
							}
							
							var rows_three=$('#regionThreeDg').datagrid('getSelections');
							if(rows_three.length<=0){
								$('#regionTabs').tabs('select',2);
								$.messager.alert('提示','请选择大区三级记录!','info');
								return;
							}
							if(rows_three.length>1){
								$('#regionTabs').tabs('select',2);
								$.messager.alert('提示','请选择一条大区三级记录!','info');
								return;
							}
							var row_three=$('#regionThreeDg').datagrid('getSelected');
							$('#area_regionOneName').val(row_three.regionOneName);
							$('#area_regionTwoName').val(row_three.regionTwoName);
							$('#area_regionThreeName').val(row_three.regionThreeName);
							updateDataGrid(4,1,1,$('#custId').val(),2,row_three.regionThreeId);
						}else{
							$('#area_regionOneName').val('');
							$('#area_regionTwoName').val('');
							$('#area_regionThreeName').val('');
							updateDataGrid(4,1,1,$('#custId').val(),2,'');
						}
					}else if(index==4){
						
					}
				}
			});
	}
	
	//用于大区一级、二级、三级，发送数据到服务器端
	function sendData(url,data,callback){
		$.ajax({
			type:'POST',
			url:url,
			data:data,
			dataType:'text',
			success:function(result){
				callback();
			}
		});
	}
	
	
	//用于大区一级、二级、三级，发送数据到服务器端
	function isRegionSameName(data){
		var flag=false;
		$.ajax({
			type:'POST',
			async: false,
			url:'custController.do?isRegionSame',
			data:data,
			dataType:'text',
			success:function(result){
				if(result=='true'){
					flag=true;
				}else{
					flag=false;
				}
			}
		});
		return flag;
	}
	
	
	function isCustCodeOrName(url,data){
		var flag=false;
		$.ajax({
			type:'POST',
			async: false,
			url:url,
			data:data,
			dataType:'text',
			success:function(result){
				if(result=='true'){
					flag=true;
				}else{
					flag=false;
				}
			}
		});
		return flag;
	}