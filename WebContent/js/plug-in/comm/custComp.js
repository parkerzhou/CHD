var custCmpOptType = -1;// 操作类型 0表示新增 1表示修改,默认值为-1
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

// 标识变量，用于保证事件只被注册一次
var custTabsEven_First = false;
var hasLoadAcc = false;
var hasLoadAreaList = false;
var hasLoadDepts = false;
var hasLoadAnnex = false;
var hasLoadRelation = false;

// 注册事件
function registerCustCmpInfoTabsEven() {
	if (!custTabsEven_First) {
		$('#custCmpInfoTab').tabs({
			onSelect : function(title, index) {
				if (index == 1) {
					if(!hasLoadAcc){
						loadAcc();
						hasLoadAcc = true;
					}
				} else if (index == 2) {
					if(!hasLoadAreaList){
						loadAreaList();
						hasLoadAreaList = true;
					}
				} else if (index == 3) {
					if(!hasLoadDepts){
						loadDepts();
						hasLoadDepts = true;
					}
				} else if (index == 4) {
					if(!hasLoadAnnex){
						loadAnnex();
						hasLoadAnnex = true;
					}
				} else if (index == 5) {
					loadRelation();
				}
			}
		});
		custTabsEven_First = true;

	}
}

// 加载开户银行数据
function loadAcc() {
	var ccId = $('#ccId').val();
	if (ccId != null && ccId != '') {
		$('#openAccDatagrid').datagrid({
			url : 'custController.do?getAcc&ccId=' + ccId
		});
	}
}

// 加载销售地区分布数据
function loadAreaList() {
	var ccId = $('#ccId').val();
	var ceId = $('#ceId').val();
	if (ccId != null && ccId != '') {
		updateArea(4, 1, 2, ccId, 2, ceId);
	}
}

// 加载附件
function loadAnnex() {
	var ccId = $('#ccId').val();
	if (ccId != null && ccId != '') {
		updateAnnex(2, parseInt(ccId), 1);
	}
}

// 加载关联信息
function loadRelation() {
	var ccId = $('#ccId').val();
	if (ccId != null && ccId != '') {
		updateRelation(2, ccId);
	}
}

// 加载部门数据
function loadDepts() {
	var ccId = $('#ccId').val();
	if (ccId != null && ccId != '') {
		$('#deptsDatagrid').datagrid({
			url : 'custController.do?getDeptsByCcId&ccId=' + ccId
		});
	}

}


//查询
function searchCustCmp() {
	var custName = $('#s_custName').val();// 客户名称
	var custCmpName = $('#s_custCmpName').val();// 客户公司名称
	var custCmpState = $('#s_custCmpState').combobox('getValue');// 客户公司状态
	if (typeof custName === 'undefined') {
		custName = '';
	}
	if (typeof custCmpName === 'undefined') {
		custCmpName = '';
	}
	if (typeof custCmpState === 'undefined') {
		custCmpState = '';
	}
	/*var custCmpUrl = 'custController.do?searchCustCmpInfo&custName=' + custName
			+ '&custCmpName=' + custCmpName + '&custCmpState=' + custCmpState;
	simpleDataGrid.datagrid({
		url : custCmpUrl,
		loadFilter : pagerFilter
	});*/
	var custCmpUrl = 'custController.do?searchCustCmpInfo';
	$.ajax({
		url:custCmpUrl,
		type:'POST',
		dataType:'JSON',
		data:{custName:custName,custCmpName:custCmpName,custCmpState:custCmpState},
		success:function(result){
			simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
		}
	});
}

// 新增事件
function addCustCmp() {
	custCmpOptType = 0;

	archModelSel.combobox('reload');
	// $('#custCmpForm').form('load', 'custController.do?getMaxCustCmpId');
	$('#custCmpInfoTab').tabs('disableTab', 1);
	$('#custCmpInfoTab').tabs('disableTab', 2);
	$('#custCmpInfoTab').tabs('disableTab', 3);
	$('#custCmpInfoTab').tabs('disableTab', 4);
	$('#custCmpInfoTab').tabs('disableTab', 5);
	simplecustCmpDialog.dialog('setTitle', '新增');
	simplecustCmpDialog.dialog('open');
}

// 修改事件
function editCustCmp() {
	custCmpOptType = 1;
	var rows = simpleDataGrid.datagrid('getSelections');
	if (rows.length <= 0) {
		$.messager.alert('提示', '请选择要修改的记录!', 'info');
		return null;
	}

	if (rows.length > 1) {
		$.messager.alert('提示', '请选择一条记录进行修改!', 'info');
		return null;
	}

	var row = simpleDataGrid.datagrid('getSelected');
	$('#custCmpForm').form('load',
			'custController.do?loadCustCmpInfo&ccId=' + row.ccId);

	
}

// 删除事件
function delCustCmp() {
	var rows = simpleDataGrid.datagrid('getSelections');
	if (rows.length <= 0) {
		$.messager.alert('提示', '请选择要删除的记录!', 'info');
		return null;
	}

	$.messager.confirm('提示', '是否确定删除所选择的记录?', function(r) {
		if (r) {
			var rows = simpleDataGrid.datagrid('getSelections');
			var idArray = [];
			for ( var key in rows) {
				idArray.push(rows[key].ccId);
			}
			$.ajax({
				type : 'POST',
				url : 'custController.do?delCustCmp&idArray=' + idArray,
				dataType : 'text',
				success : function(data, status, xml) {
					searchCustCmp();
					simpleDataGrid.datagrid('unselectAll');
					$.messager.alert('提示', data + '!', 'info');
				},
				error : function(XMLHttpRequest, textStatus, errorThrown) {
					$.messager.alert('提示', '删除错误!', 'info');
				}
			});
		}
	});
}

//验证大区并提交
function checkCeRegionAndSubmit(){
	var isHaveCeRegion;
	$.ajax({
		type : 'POST',
		url : 'custController.do?isHaveCeRegion&ceId=' + $('#ceId').val(),
		dataType : 'text',
		async : false,
		success : function(data, status, xml) {
			if(data == 1){
				isHaveCeRegion = true;
			}else{
				isHaveCeRegion = false;
			}
		}
	});
	if(!isHaveCeRegion){
		if($('#ccRegionOneName').val() != '' || $('#ccArea').combobox('getValues').length != 0){
			$.messager.confirm('提示', '客户公司对应的客户不存在大区管理，将清除所属区域、管理区域再提交，是否继续?', function(r) {
				if (r) {
					clearRegion();
					$('#ccArea').combobox('clear');
					$('#ccArea').combobox('disable');
					submit();
				}
			});
		}else{
			submit();
		}
	}else {
		submit();
	}
}


// 提交客户公司信息表单
function submit() {
	var ccId;
	if (custCmpOptType == 0) {
		$.ajax({
			type : 'POST',
			url : 'custController.do?getMaxCustCmpId',
			dataType : 'text',
			async : false,
			success : function(data, status, xml) {
				ccId = parseInt(data) + 1;
				$('#ccId').val(ccId);
			}
		});
	}

	$('#custCmpForm').form(
			'submit',
			{
				url : 'custController.do?addOrEditCustCmp&custCmpOptType='
						+ custCmpOptType,
				onSubmit : function() {
					var isValid = $(this).form('validate');
					return isValid; // 返回false将停止form提交
				},
				success : function(data) {
					var arr = data.split('_');
					if (custCmpOptType == 0) {
						if(arr[1] == '提交成功！'){
							$('#ccCreateDate').val(arr[0]);
							$('#custCmpInfoTab').tabs('enableTab', 1);
							$('#custCmpInfoTab').tabs('enableTab', 2);
							$('#custCmpInfoTab').tabs('enableTab', 3);
							$('#custCmpInfoTab').tabs('enableTab', 4);
							$('#custCmpInfoTab').tabs('enableTab', 5);
							$('#custCmpInfoTab').tabs('select', 1);
							simplecustCmpDialog.dialog('setTitle', '修改');
							custCmpOptType = 1;
							$.messager.alert('提示', arr[1], 'info');
							searchCustCmp();
						}else{
							$.messager.alert('提示', "提交失败！", 'error');
						}
					}else{
						$.messager.alert('提示', arr[1], 'info');
						searchCustCmp();
					}

				}
			});
}

// 此方法用于用户关闭新增或修改面板后的清除工作,使新增或修改对话回复最初状态
function clearPage() {
	// 使用tab面板回到第一个面板
	$('#custCmpInfoTab').tabs('select', 0);
	// 清除表单的数据
	$('#custCmpForm').form('clear');
	$('#ccCodePreSpan').html('');
	
	//恢复初始状态
	$('#ccIsPotential').combobox('setValue', 1);
	$('#ccState').combobox('setValue', 1);
	$('#ccActiDate').datebox('disableValidation');
	$('#ccActiDate').datebox('disable');
	$('#ccInefDate').datebox('disable');
	$('#ccInefDate').datebox('disable');
	
	//$('#ccCodeSuf').css('background-color', '#FFF');
	//$('#ceName').css('background-color', '#FFF');
	$('#ccCodeSuf').attr('readonly', false);
	$('#ceSelBtn').linkbutton('enable');
	
	//启用所属区域
	enableRegion();
	
	//标签加载状态重置
	hasLoadAcc = false;
	hasLoadAreaList = false;
	hasLoadDepts = false;
	hasLoadAnnex = false;
	hasLoadRelation = false;
	
	
	//清空开户银行
	$('#oaBank').val('');
	$('#oaAccName').val('');
	$('#oaAccNo').val('');
	$('#oaBank').validatebox('validate');
	$('#oaAccName').validatebox('validate');
	$('#oaAccNo').validatebox('validate');
	//清空部门
	$('#deName').val('');
	$('#deCode').val('');
	$('#deName').validatebox('validate');
	
}

// 禁用所属区域
function disableRegion() {
	$('#ccRegionOneName').attr('disabled', 'disabled');
	$('#ccRegionTwoName').attr('disabled', 'disabled');
	$('#ccRegionThreeName').attr('disabled', 'disabled');
	$('#ccRegionOneId').attr('disabled', 'disabled');
	$('#ccRegionTwoId').attr('disabled', 'disabled');
	$('#ccRegionThreeId').attr('disabled', 'disabled');
	$('#ccRegionSelBtn').linkbutton('disable');
}

// 清空所属区域
function clearRegion() {
	$('#ccRegionOneName').val('');
	$('#ccRegionTwoName').val('');
	$('#ccRegionThreeName').val('');
	$('#ccRegionOneId').val('');
	$('#ccRegionTwoId').val('');
	$('#ccRegionThreeId').val('');
}

// 启用所属区域
function enableRegion() {
	$('#ccRegionOneName').attr('disabled', false);
	$('#ccRegionTwoName').attr('disabled', false);
	$('#ccRegionThreeName').attr('disabled', false);
	$('#ccRegionOneId').attr('disabled', false);
	$('#ccRegionTwoId').attr('disabled', false);
	$('#ccRegionThreeId').attr('disabled', false);
	$('#ccRegionSelBtn').linkbutton('enable');
}

function printState(){
	//console.info($('#ccArea'));
}

function enableee(){
	$('#ccArea').combobox('enable');
}

// 页面加载完成执行
$(function() {

	registerCustCmpInfoTabsEven();
	
	var initData = [];
	// 创建并初始化客户datagrid对象
	simpleDataGrid = $('#custCompDataGrid').datagrid(
			{
				data : initData,
				onDblClickRow : function(rowIndex, row) {
					if(editable == false){
						return;//无权限，直接返回。
					}
					custCmpOptType = 1;
					$('#custCmpForm').form(
							'load',
							'custController.do?loadCustCmpInfo&ccId='
									+ row.ccId);
				}
			});
	// 客户公司查询按钮单击事件
	$('#custCmpSearchBtn').bind('click', searchCustCmp);

	/**
	 * **********↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Dialog
	 * ↓↓↓↓↓↓↓↓↓↓↓↓↓*****************************
	 */
	var custCmpId = $('#ccId').val();
	
	//绑定客户公司代码验证
	$('#ccCodeSuf').validatebox({
		validType: "[custCmpCode[$('#ccCodePre').val(), $('#ccId').val()]"
	});
	
	//绑定客户公司名称验证
	$('#ccName').validatebox({
		validType: "custCmpName[$('#ccId').val()]"
	});
	
	//绑定部门名称验证
	$('#deName').validatebox({
		validType: "deptName[$('#ccId').val()]"
	});
	
	// 拦截对话关闭事件
	simplecustCmpDialog = $('#custCmpDialog').dialog({
		onBeforeClose : function() {
			$.messager.confirm('提示', '是否确定返回至主界面?', function(r) {
				if (r) {
					clearPage();
					simplecustCmpDialog.dialog('close', true);
				}
			});
			return false;
		}
	});

	// 加载完custCmpForm时执行。
	$('#custCmpForm').form(
			{
				onLoadSuccess : function(data) {
					$('#ccCodePreSpan').html(data.ccCodePre);
					archLevelSel.combobox('reload',
							'custController.do?getArchLevel&igId='
									+ data.ccArchModel);
					//将管理区域的String字符串转换成int型数组
					if(data.ccArea != ''){
						var arr = [];
						$(data.ccArea.split(',')).each(function(){
							arr.push(parseInt(this));
						});
						data.ccArea = arr;
					}
					
					//设置是否潜在
					if ($('#ccIsPotential').combobox('getValue') == 2) {
						$('#ccActiDate').datebox('enable');
						$('#ccActiDate').datebox('enableValidation');
					} else if ($('#ccIsPotential').combobox('getValue') == 1) {
						$('#ccActiDate').datebox('disableValidation');
						$('#ccActiDate').datebox('disable');
						$('#ccActiDate').datebox('clear');
					}

					//设置状态
					if ($('#ccState').combobox('getValue') == 2) {
						$('#ccInefDate').datebox('enable');
					} else if ($('#ccState').combobox('getValue') == 1) {
						$('#ccInefDate').datebox('disable');
					}
					
					// 如果没有大区管理，禁用所属区域和管理区域
					if (data.ceRegion == false) {
						//console.info("custCmpForm加载完成！禁用所属区域、管理区域");
						disableRegion();
						clearRegion();
						
						$('#ccArea').combobox('disable');
						$('#ccArea').combobox('clear');
					} else if (data.ccArchLevelCode == 1) {
						// 如果存在大区管理且架构级别为1，则禁用清空所属区域，启用管理区域。并加载大区一级为管理区域
						//console.info("custCmpForm加载完成！禁用所属区域");
						disableRegion();
						clearRegion();
						$('#ccArea').combobox('enable');
						$('#ccArea').combobox('options');
						$('#ccArea').combobox({
							url : 'custController.do?getManaArea&regionLevel=0&ceId=' + $('#ceId').val()
						});
						$('#ccArea').combobox('setValues', data.ccArea);
					} else {// 如果存在大区管理且架构级别不为1，则启用所属区域和管理区域
						enableRegion();
						$('#ccArea').combobox('enable');
						$('#ccArea').combobox('options');
						
						if($('#ccRegionOneName').val() == ''){//如果大区一级为空
							
							$('#ccArea').combobox({
								url : 'custController.do?getManaArea&regionLevel=0&ceId=' + $('#ceId').val()
							});
							$('#ccArea').combobox('setValues', data.ccArea);
						}else if($('#ccRegionTwoName').val() == ''){//如果大区二级为空
							$('#ccArea').combobox({
								url : 'custController.do?getManaArea&regionLevel=1&regionId=' + data.ccRegionOneId + '&ceId=' + $('#ceId').val()
							});
							$('#ccArea').combobox('setValues', data.ccArea);
						}else if($('#ccRegionThreeName').val() == ''){//如果大区三级为空
							$('#ccArea').combobox({
								url : 'custController.do?getManaArea&regionLevel=2&regionId=' + data.ccRegionTwoId + '&ceId=' + $('#ceId').val()
							});
							$('#ccArea').combobox('setValues', data.ccArea);
						}else{//如果大区三级都有
							$('#ccArea').combobox('disable');
							$('#ccArea').combobox('clear');
						}
						
					}

					$('#custCmpInfoTab').tabs('enableTab', 1);
					$('#custCmpInfoTab').tabs('enableTab', 2);
					$('#custCmpInfoTab').tabs('enableTab', 3);
					$('#custCmpInfoTab').tabs('enableTab', 4);
					$('#custCmpInfoTab').tabs('enableTab', 5);
					$('#custCmpInfoTab').tabs('select', 0);
					simplecustCmpDialog.dialog('setTitle', '修改');
					simplecustCmpDialog.dialog('open');
					custCmpOptType = 1;
					
					//$('#ccCodeSuf').css('background-color', '#EEE');
					//$('#ceName').css('background-color', '#EEE');
					$('#ccCodeSuf').attr('readonly', true);
					$('#ceSelBtn').linkbutton('disable');
				}
			});

	// 客户选择按钮
	$('#ceSelBtn').click(function() {
		$.chcrm.openCommDialog('cust', false, function(val) {
			if (val.length >= 1) {
				if(val[0].custName == $('#ceName').val()){
					//如果选择的客户和之前的一样，跳出
					return;
				}
				
				if (val[0].custState != 1) {
					$.messager.alert('提示', '请选择状态为“有效”的客户!', 'info');
					return;
				}
				
				var arr = val[0].custName.split('-');
				$('#ccCodePre').val(arr[0]);
				$('#ccCodePreSpan').html(arr[0]);
				$('#ceName').val(val[0].custName);
				$('#ceId').val(val[0].custId);
				$('#ceStateName').val('有效');
				$('#ceState').val(val[0].custState);
				$('#ceRegion').val(val[0].custRegion);

				//清空所属公司、所属区域、管理区域
				clearRegion();
				$('#ccOwnName').val('');
				$('#ccArea').combobox('clear');
				
				// 如果没有大区管理，清空并禁用所属区域、管理区域
				if ($('#ceRegion').val() == 'false') {
					//console.info("客户选择完成，不存在大区管理。");
					disableRegion();
					clearRegion();
					
					$('#ccArea').combobox('disable');
					$('#ccArea').combobox('clear');
				} else if (parseInt($('#ccArchLevelCode').val()) == 1) {// 否则如果架构级别为1，禁用所属区域，启用管理区域并加载大区一级为管理区域
					disableRegion();
					clearRegion();
					$('#ccArea').combobox('enable');
					$('#ccArea').combobox({
						url : 'custController.do?getManaArea&regionLevel=0&ceId=' + $('#ceId').val()
					});
				} else {// 如果存在大区管理且架构级别不为1，则启用所属区域和管理区域
					enableRegion();
					$('#ccArea').combobox('enable');
					$('#ccArea').combobox({
						url : 'custController.do?getManaArea&regionLevel=0&ceId=' + $('#ceId').val()
					});
				}

			} else {
				$('#ccCodePre').html('');
				$('#ceName').val('');
				$('#ceId').val('');
				$('#ceStateName').val('');
				$('#ceState').val('');
				//清空所属公司、所属区域、管理区域
				clearRegion();
				$('#ccOwnName').val();
				$('#ccArea').combobox('clear');
			}
			$('#ceName').validatebox('validate');
			$('#ccCodeSuf').validatebox('validate');

			
			
		});
	});

	// 架构模式下拉框
	archModelSel = $('#ccArchModel').combobox(
			{
				url : 'custController.do?getArchModel',
				valueField : 'igId',
				textField : 'igName',
				onChange : function(newValue, oldValue) {
					if(newValue != oldValue){
						//清空所属公司、所属区域、管理区域
						clearRegion();
						$('#ccOwnName').val('');
						$('#ccArea').combobox('clear');
						console.info(newValue)
						if (!(typeof newValue === 'undefined')) {
							archLevelSel.combobox('clear');
							archLevelSel.combobox('reload',
									'custController.do?getArchLevel&igId='
											+ newValue);
						}
					}
				}
			});

	// 架构级别下拉框-
	archLevelSel = $('#ccArchLevel').combobox({
		valueField : 'idId',
		textField : 'idName',
		onSelect : function(record) {
			if (record.idCode == null) {
				return;
			}
			$('#ccArchLevelCode').val(record.idCode);

			// 如果没有大区管理，则跳出。
			if ($('#ceRegion').val() == 'false') {
				//console.info("没有大区管理，跳出onSelect");
				return;
			}

			// 有大区管理
			// 如果级别为1，禁用所属区域
			if (parseInt(record.idCode) == 1) {
				//console.info('有大区管理，且级别为1');
				// 禁用所属区域
				disableRegion();

				// 清空所属区域
				clearRegion();
				
				$('#ccArea').combobox('enable');
				$('#ccArea').combobox('clear');
				$('#ccArea').combobox({
					url : 'custController.do?getManaArea&regionLevel=0&ceId=' + $('#ceId').val()
				});
			} else {
				//console.info('有大区管理，且级别不为1');
				// 启用所属区域
				enableRegion();
				$('#ccArea').combobox('enable');
				$('#ccArea').combobox('clear');
			}
		}
	});

	$('#ccArea').combobox({
		onLoadSuccess:function(){
					if($('#ccArchLevelCode').val() == 1){
						areas = $('#ccArea').combobox('getData');
						var all = [];
						for(var j = 0; j < areas.length; j++){
							all.push(areas[j].manaAreaId);
						}
						$('#ccArea').combobox('setValues', all);
					}
		}
	});
	
	// 所属公司选择按钮
	$('#ccOwnSelBtn').click(function() {
		if($('#ceName').val() == ''){
			$.messager.alert('提示', '请先选择客户!', 'info');
			return;
		}
		$.chcrm.openCommDialog('custComp', false, function(val) {
			if (val.length >= 1) {
				$('#ccOwnName').val(val[0].custCompName);
				$('#ccOwnid').val(parseInt(val[0].custCompId));
				// $('#ccOwnid').combobox('setValue', val[0].custCompId);
			} else {
				$('#ccOwnName').val('');
				$('#ccOwnId').val('');
			}

		}, $('#ceName').val().split('-')[1]);
		clearRegion();
		$('#ccArea').combobox('clear');
	});

	// 所属区域选择按钮
	$('#ccRegionSelBtn').click(function() {
		if($('#ceId').val() == ''){
			$.messager.alert('提示', '请先选择客户!', 'info');
			return;
		}
		$.chcrm.openCommDialog('region', false, function(val) {
			var regionLevel = 0;// 大区级数
			var regionId = '';
			if (val.length >= 1) {
				// 清空原先的值
				clearRegion();
				// 赋值
				$('#ccRegionOneName').val(val[0].regionOneName);
				$('#ccRegionOneId').val(val[0].regionOneId);
				regionId = val[0].regionOneId;
				regionLevel++;
				if (val[0].regionTwoName != null) {// 如果大区二级存在
					$('#ccRegionTwoName').val(val[0].regionTwoName);
					$('#ccRegionTwoId').val(val[0].regionTwoId);
					regionId = val[0].regionTwoId;
					regionLevel++;
					if (val[0].regionThreeName != null) {// 如果大区三级存在
						$('#ccRegionThreeName').val(val[0].regionThreeName);
						$('#ccRegionThreeId').val(val[0].regionThreeId);
						regionId = val[0].regionThreeId;
						regionLevel++;
					
						$('#ccArea').combobox('disable');
						$('#ccArea').combobox('clear');
					}
				}
			} else {
				// 清空
				$('#ccRegionOneName').val('');
				$('#ccRegionTwoName').val('');
				$('#ccRegionThreeName').val('');
				$('#ccRegionOneId').val('');
				$('#ccRegionTwoId').val('');
				$('#ccRegionThreeId').val('');
			}
			if (regionLevel < 3) {
				$('#ccArea').combobox('enable');
				$('#ccArea').combobox('clear');
				$('#ccArea').combobox({
					url : 'custController.do?getManaArea&regionLevel=' 
						+ regionLevel + '&regionId=' + regionId + '&ceId=' + $('#ceId').val()});
			}
		}, parseInt($('#ceId').val()));

	});

	// 负责人选择按钮
	$('#ccManagerSelBtn').click(function() {
		$.chcrm.openCommDialog('contacts', false, function(val) {
			if (val.length >= 1) {
				$('#ccManagerName').val(val[0].contName);
				$('#ccManager').val(val[0].ct_id);
			} else {
				$('#ccManagerName').val('');
				$('#ccManager').val('');
			}
			$('#ccManagerName').focus();
		});
	});

	// 管理机构选择按钮
	$('#ccManaSelBtn').click(function() {
		$.chcrm.openCommDialog('dept', false, function(val) {
			if (val.length >= 1) {
				$('#ccManaCmpName').val(val[0].compName);
				$('#ccManaCmp').val(val[0].compId);
				$('#ccManaDeptName').val(val[0].deptName);
				$('#ccManaDept').val(val[0].deptId);
			} else {
				$('#ccManaCmpName').val('');
				$('#ccManaCmp').val('');
				$('#ccManaDeptName').val('');
				$('#ccManaDept').val('');
			}
			// $('#ccManaCmpName').focus();
			$('#ccManaDeptName').focus();
		});
	});

	// 潜在/正式
	isPotentialSel = $('#ccIsPotential').combobox(
			{
				data : [ {
					text : '潜在',
					value : 1,
					selected : true
				}, {
					text : '正式',
					value : 2
				} ],
				onSelect : function(record) {
					if (record.value == 1) {
						$('#ccActiDate').datebox('clear');
						$('#ccActiDate').datebox('disable');
					} else {
						$('#ccActiDate').datebox('enable');
						$('#ccActiDate').datebox('enableValidation');
						$('#ccActiDate').datebox('setValue',
								new Date().toLocaleDateString());
					}
				}
			});

	// 状态
	$('#ccState').combobox(
			{
				required : true,
				data : [ {
					text : '有效',
					value : 1,
					selected : true
				}, {
					text : '无效',
					value : 2
				} ],
				onChange : function(newValue, oldValue) {
					if (newValue == 2) {
						$('#ccInefDate').datebox('setValue',
								new Date().toLocaleDateString());
						$('#ccInefDate').datebox('enable');
						$('#ccInefDate').datebox('enableValidation');
						
					} else {
						$('#ccInefDate').datebox('clear');
						$('#ccInefDate').datebox('disable');
						$('#ccInefDate').datebox('disableValidation');
					}
				}
			});
	/** **********↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Tabs ↓↓↓↓↓↓↓↓↓↓↓↓↓***************************** */
	
	// 新增开户银行
	$('#addAcc').click(function() {
		var ccId = $('#ccId').val();
		if (ccId != null && ccId != "") {
			
			$('#oaForm').form('submit', {
				url : 'custController.do?addAcc&ccId=' + ccId,
				onSubmit : function() {
					var isValid = $(this).form('validate');
					if(!isValid) return false; //如果有必填项没填，直接返回。
					
					//验证开户银行是否可用
					var available = false;
					var bank = $('#oaBank').val();
					var accNo = $('#oaAccNo').val();
					$.ajax({
						type : 'POST',
						url : 'custController.do?validateAcc',
						dataType : 'text',
						data:{oaBank:bank, oaAccNo:accNo},
						async : false,
						success : function(data, status, xml) {
							if(data.toString() == 'true'){
								available = true;
							}
						}
					});
					
					if(!available) {
						$.messager.alert('提示', '该开户银行数据已存在!', 'info');
						return false;
					}
					return isValid;
				},
				success : function(data) {
					$('#oaForm').form('clear');
					loadAcc();
					$.messager.alert('提示', '提交成功!', 'info');
				}
			});
		}
	});
	
	$('#delAcc').click(function() {
		var rows = $('#openAccDatagrid').datagrid('getSelections');
		if (rows.length <= 0) {
			$.messager.alert('提示', '请选择要删除的记录!', 'info');
			return null;
		}

		$.messager.confirm('提示', '是否确定删除所选择的记录?', function(r) {
			if (r) {
				var rows = $('#openAccDatagrid').datagrid('getSelections');
				var idArray = [];
				for ( var key in rows) {
					idArray.push(rows[key].oaId);
				}
				$.ajax({
					type : 'POST',
					url : 'custController.do?delAcc&idArray=' + idArray,
					dataType : 'text',
					success : function(data, status, xml) {
						$('#openAccDatagrid').datagrid('reload');
						$.messager.alert('提示', data + '!', 'info');
						$('#openAccDatagrid').datagrid('unselectAll');
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.alert('提示', '删除错误!', 'info');
					}
				});
			}
		});
	});

	// 添加部门
	$('#addDept').click(
			function() {
				var ccId = $('#ccId').val();
				if (ccId != null && ccId != "") {
					$.ajax({
						type : 'POST',
						url : 'custController.do?getMaxDeptNumByCcId&ccId='
								+ ccId,
						dataType : 'text',
						async : false,
						success : function(data, status, xml) {
							var maxDeptNum = parseInt(data) + 1;
							var tempCode;
							if (maxDeptNum < 10) {
								tempCode = '00' + maxDeptNum;
							} else if (maxDeptNum < 100) {
								tempCode = '0' + maxDeptNum;
							} else if (maxDeptNum < 1000) {
								tempCode = maxDeptNum;
							}
							var deptCode = $('#ccCodePre').val() + '-'
									+ $('#ccCodeSuf').val() + '-' + tempCode;
							$('#deCode').val(deptCode);
						}
					});

					//console.info(123);
					
					isValid = $('#deName').validatebox('isValid');
					if(isValid){
						var deName = $('#deName').val();
						var deCode = $('#deCode').val();
						
						$.ajax({
							type : 'POST',
							url : 'custController.do?addDept&ccId=' + ccId,
							data:{deName:deName, deCode:deCode},
							success : function(data, status, xml) {
								$('#deName').val('');
								$('#deCode').val('');
								$.messager.alert('提示', '提交成功!', 'info');
								loadDepts();
							}
						});
					}else{
						$('#deName').focus();
					}
					
					
					
					/*$('#deptForm').form('submit', {
						url : 'custController.do?addDept&ccId=' + ccId,
						onSubmit : function() {
							var isValid = $(this).form('validate');
							return isValid; // 返回false将停止form提交
						},
						success : function(data) {
							$('#deptForm').form('clear');
							$.messager.alert('提示', '提交成功!', 'info');
							loadDepts();
						}
					});*/
				}
			});

	// 删除部门
	$('#delDept').click(function() {
		var rows = $('#deptsDatagrid').datagrid('getSelections');
		if (rows.length <= 0) {
			$.messager.alert('提示', '请选择要删除的记录!', 'info');
			return null;
		}

		$.messager.confirm('提示', '是否确定删除所选择的记录?', function(r) {
			if (r) {
				var rows = $('#deptsDatagrid').datagrid('getSelections');
				var idArray = [];
				for ( var key in rows) {
					idArray.push(rows[key].deId);
				}
				$.ajax({
					type : 'POST',
					url : 'custController.do?delDept&idArray=' + idArray,
					dataType : 'text',
					success : function(data, status, xml) {
						$('#deptsDatagrid').datagrid('reload');
						$('#deptsDatagrid').datagrid('unselectAll');
						$.messager.alert('提示', data + '!', 'info');
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.alert('提示', '删除错误!', 'error');
					}
				});
			}
		});
	});

});
