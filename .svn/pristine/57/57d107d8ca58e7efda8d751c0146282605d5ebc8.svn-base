
//相关信息进入
$(function(){
	var editable = true;
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	}

	var objId = getUrlParam('objId');//从客户公司的关联信息带过去的参数是objId，在此指客户公司ID。
	if(objId != null){
		$.ajax({
			//该url返回客户名称、客户公司名称，用于填充搜索中的“客户”、“客户公司”项。
			url:'custController.do?getCustNameAndCustCmpNameByCcId&ccId=' + objId,
			dataType:'text',
			async:false,
			success:function(result){
				result = $.parseJSON(result);
				$('#pm_cust').val(result.ceName);

				$('#pm_custComp').val(result.ccName);

			}
		});
	}

	function loadPaymentInfo()
	{
		//加载表单数据
		var cust=$('#pm_cust').val();//客户名称或客户代码
		var custComp=$('#pm_custComp').val();//客户公司 
		var custCompState=$('#pm_custCompState').combobox('getValue');//客户公司状态

		if(typeof cust==='undefined'){
			cust='';
		}
		if(typeof custComp==='undefined'){
			custComp='';
		}
		if(typeof custCompState==='undefined'){
			custCompState='';
		}
		var pmUrl='custController.do?searchPaymentInfo';
		$.ajax({
			url:pmUrl,
			type:'POST',
			dataType:'JSON',
			data:{cust:cust,custComp:custComp,custCompState:custCompState},
			success:function(result){
				simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
	}
	
	
	var pmOptType=-1;//操作类型 0表示新增 1表示修改,默认值为-1

	//数据过滤器
	function pagerFilter(data){
		if (typeof data.length == 'number' && typeof data.splice == 'function'){
			data = {
					total:data.length,
					rows:data
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


	//标识变量，用于保证事件只被注册一次
	var paymentTabsEven_First=false;
	//注册事件
	function registerPaymentInfoTabsEven(){
		if(!paymentTabsEven_First){
			$('#pm_tabs').tabs({
				onSelect:function(title,index){
					if(index==1){
						//付款方式明细数据加载
						loadPaymentDescDG();	
						loadPaymentAppoint();
					}else if(index==2){
						//调用附件
						var id = $('#pmMode_id').val();

						updateAnnex(3, id, 1);
					}
				}
			});
		}
		paymentTabsEven_First=true;
	}


	//加载付款方式明细datagrid数据
	function loadPaymentDescDG()
	{
		//获得付款方式id
		var pmMode_id = $('#pmMode_id').val();

		//根据付款方式id加载该付款方式明细信息
		var pmUrl='custController.do?loadPaymentDesc&pm_id=' + pmMode_id;
		$('#pmMode_datagrid').datagrid({
			url:pmUrl,
			loadFilter:pagerFilter    //  即获取数据源 
		});

	}

	var initData=[];
	//创建并初始化付款方式datagrid对象
	var simpleDataGrid=$('#pm_dg').datagrid({
		data:initData,
		onDblClickRow:function(rowIndex, row){
			if(editable == false){
				return;//没有权限，直接返回
			}
			//修改标识
			pmOptType=1;

			registerPaymentInfoTabsEven();
			loadPaymentMode();
			$('#pmMode_Mode').val(row.pm_Mode);

			$.ajax({
				url:'custController.do?loadPaymentInfo&pm_id='+row.pm_id,
				type:'POST',
				async:false,
				success:function(data,status,xhr){
					var json = $.parseJSON(xhr.responseText);
					//设置弹出窗口tab1付款方式信息的序号
					$('#pm_seq').val(json.pm_seq);

					//设置tab2中的新增功能的付款方式id
					$('#pmMode_id').val(json.pm_id);

					//装载表单数据
					$('#pm_Form').form('load',json);

					//$('#pmMode_Mode').val($('#pm_Mode').combobox('getText'));
				},
				error:function(){}
			});

			$('#pm_tabs').tabs('enableTab',1);
			$('#pm_tabs').tabs('enableTab',2);		
			$('#pm_tabs').tabs('select',0);
			simplepayDialog.dialog('setTitle','修改');
			simplepayDialog.dialog('open');

		}
	});



	//付款方式新增按钮响应事件
	$('#pm_add').click(function(){
		addPayment();
	});


	//新增事件
	function addPayment(){
		pmOptType=0;

		$('#pm_tabs').tabs('disableTab',1);
		$('#pm_tabs').tabs('disableTab',2);

		$('#pm_seq').val("");
		registerPaymentInfoTabsEven();

		simplepayDialog.dialog('setTitle','新增');
		simplepayDialog.dialog('open');
	}


	//付款方式主菜单删除按钮响应事件
	$('#pm_delete').click(function(){
		deletePayment();
	});

	//付款方式删除事件
	function deletePayment()
	{
		var pmDataGrid = $("#pm_dg");

		//获取选中的行
		var rows=pmDataGrid.datagrid('getSelections');

		//没有选中行提示选择要删除的记录
		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return false;
		}

		//至少选择一行
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){

				//删除记录的id数组
				var idArray=[];
				for(var key in rows){
					idArray.push(rows[key].pm_id);
				}

				$.ajax({
					type:'POST',
					url:'custController.do?delPayment&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						loadPaymentInfo();
						$.messager.alert('提示',data+'!','info');
						pmDataGrid.datagrid('unselectAll');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','error');
					}
				});
			}
		});
	}


	//付款方式修改按钮响应事件
	$('#pm_alter').click(function(){
		editPayment();
	});

	//修改事件
	function editPayment()
	{
		//修改标识
		pmOptType=1;

		var rows=$('#pm_dg').datagrid('getSelections');

		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return false;
		}

		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return false;
		}

		loadPaymentMode();
		registerPaymentInfoTabsEven();
		$('#pmMode_Mode').val(rows[0].pm_Mode);

		$.ajax({
			url:'custController.do?loadPaymentInfo&pm_id='+rows[0].pm_id,
			type:'POST',
			async:false,
			success:function(data,status,xhr){
				var json  = $.parseJSON(xhr.responseText);

				//设置弹出窗口tab1付款方式信息的序号
				$('#pm_seq').val(json.pm_seq);

				//设置tab2中的新增功能的付款方式id
				$('#pmMode_id').val(json.pm_id);

				//装载表单数据
				$('#pm_Form').form('load',json);

				//	$('#pmMode_Mode').val($('#pm_Mode').combobox('getText'));
			},
			error:function(){}
		});
		//$('#pm_seq').text(text);

		$('#pm_tabs').tabs('enableTab',1);
		$('#pm_tabs').tabs('enableTab',2);		
		$('#pm_tabs').tabs('select',0);
		simplepayDialog.dialog('setTitle','修改');
		simplepayDialog.dialog('open');
	}



	//拦截对话关闭事件
	var simplepayDialog=$('#pm_FuncWindow').window({
		//  面板关闭前触发 
		onBeforeClose:function(){

			//获取客户公司元素
			var cc_name=$('#cc_name').val();

			if((cc_name=='')){
				//清除页面数据
				clearPage();
				clearPayDesc();
				return true;
			}else{
				$.messager.confirm('提示','是否确定返回至主界面?',function(r){ 
					if(r){
						//确定关闭窗口后清除页面数据并关闭窗口
						clearPage();
						clearPayDesc();
						simplepayDialog.window('close',true); 
					} 
				});
			}

			return false;
		}
	});

	//此方法用于用户关闭新增或修改面板后的清除工作,使新增或修改对话回复最初状态
	function clearPage(){	

		//使用tab面板回到第一个面板
		$('#pm_tabs').tabs('select',0);

		//清除表单的数据
		$('#pm_Form').form('clear');

	}


	//付款方式查询按钮单击事件	
	$('#pm_search').bind('click',function(){

		loadPaymentInfo();
	});


	//弹出窗口客户公司选择按钮单击响应事件
	$('#cc_select').click(function(){

		$.chcrm.openCommDialog('custComp',false,function(val){


			var cc_name = $('#cc_name');
			var cc_id = $('#cc_id');
			var ce_name = $('#ce_name');
			var ce_id = $('#ce_id');

			if(val.length>=1){
				//设置客户名称
				ce_name.val(val[0].custName);
				ce_id.val(val[0].custId);
				//ce_name.validatebox("validate");

				//设置选择的客户公司
				cc_name.val(val[0].custCompName);
				//设置选择的客户公司
				cc_name.focus();
				cc_id.val(val[0].custCompId);

				
				//获取序号
				$.ajax({
					url:'custController.do?getPaymentSeq&custCompId='+val[0].custCompId,
					success:function(data,status,xml){
						//保存序号
						var seq = xml.responseText;
						//设置序号
						$('#pm_seq').val(seq);
					},
					error:function(){}
				});

			}else{

				//设置为空
				cc_name.val('');
				//设置客户公司text控件获得焦点
				cc_name.focus();
				cc_id.val('');

			}

		});


	});


	//标识，flag为true说明当前付款方式可新增
	var flag = true;
	//付款方式信息提交按钮响应事件
	$('#pm_submit').click(function(){
		paymentSave();
	});


	//表单提交事件
	function paymentSave(){
		
		//提交发送前验证表单信息
		var isValid = $('#pm_Form').form('validate');
		if(!isValid)
		{
			return isValid;	// 返回false将停止form提交 
		}
		
		validatePayment();
		if(!flag)
		{
			return false;
		}
		
		//格式化付款方式信息表单元素数据
		var formdata = $('#pm_Form').serialize();
		//获取付款方式下拉列表中文值
		var pm_Mode = $('#pm_Mode').combobox('getText');
		//获取序号
		var pm_seq = $('#pm_seq').val();

		//整合提交数据
		formdata = formdata + "&pmOptType="+pmOptType + "&modeName="+pm_Mode+ "&pm_seq="+pm_seq;

		//异步提交表单付款方式信息数据
		$.ajax({
			type:'POST',
			url:'custController.do?SavePaymentInfo&formdata='+formdata,
			//data:{pmOptType:pmOptType,modeName:pm_Mode,pm_seq:pm_seq},
			async:false,
			success:function(data,statue,xml){
				loadPaymentInfo();
				var text = xml.responseText;
				text = $.parseJSON(text);

				if(text.pm_id == '该客户公司已被删除')
				{
					$.messager.alert('提示','该客户公司已被删除!','info');
				}
				else if(text.pm_id == '此付款方式记录被删除')
				{
					$.messager.alert('提示','此付款方式记录被删除!','info');
				}
				else if(text.pm_id == '系统异常')
				{
					
				}
				else
				{
					//使用提交的付款方式数据设置付款明细tab中的付款方式文本框
					$('#pmMode_Mode').val($('#pm_Mode').combobox('getText'));

					if(pmOptType==0){
						//设置付款方式id
						$('#pmMode_id').val(text.pm_id);
						$('#pm_id').val(text.pm_id);

						//事件为新增事件提交，开放tab1付款方式明细和tab2附件
						$('#pm_tabs').tabs('enableTab',1);
						$('#pm_tabs').tabs('enableTab',2);	

						//选择付款方式明细tab
						$('#pm_tabs').tabs('select',1);

					}

					//修改标识为修改
					pmOptType=1;
					$.messager.alert('提示','提交成功!','info'); 
				}

			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.alert('提示','提交失败!','error');
			}
		});


	}


	/*************************combobx数据加载Star***********************************/

	//付款方式主界面加载客户公司状态下拉列表信息
	$('#pm_custCompState').combobox('loadData',[{id:"",text:"所有"},{id:1,text:'有效'},{id:2,text:'无效'}]);


	//付款方式弹出窗口加载状态下拉列表信息
	$('#pm_state').combobox('loadData',[{id:"",text:""},{id:1,text:'在用'},{id:2,text:'停用'}]);


	//初始化付款方式下拉列表
	$('#pm_Mode').combobox({
		onShowPanel: function(rec){  
			//选中付款方式下拉框时加载数据
			loadPaymentMode();
		}


	});

	//付款方式弹出窗口加载付款方式下拉列表信息
	function loadPaymentMode(){
		$.ajax({
			url:'custController.do?getPaymentMode',
			async:false,
			success:function(data,status,xml)
			{
				//将返回的字符串数据解析为JSON
				var obj = $.parseJSON(xml.responseText);

				//调用loadData方法加载数据
				$('#pm_Mode').combobox('loadData',obj);
			},
			error:function(){}
		});
	};



	//初始化付款约定下拉列表
	$('#pmMode_appoint').combobox({
		onShowPanel: function(rec){  
			//选中付款约定下拉框时加载数据
			loadPaymentAppoint();
		}

	});

	var aflag = true;
	//验证付款约定
	function validateAppoint()
	{
		var pm_id = $('#pm_id').val();
		var appoint_id = $('#pmMode_appoint').combobox('getValue');
		aflag = true;
		$.ajax({
			url:'custController.do?validatePaymentDesc',
			data:{appoint_id:appoint_id,pm_id:pm_id},
			async:false,
			success:function(data,status,xml){
				if(xml.responseText == '付款约定不可用'){
					var pmMode_appoint = $('#pmMode_appoint').combobox('getText');
					aflag = false;
					$.messager.alert('提示','该客户公司此付款方式已存在\"'+pmMode_appoint+'\"付款约定,请选择其他付款约定！','info'); 
				}
				else if(xml.responseText == '付款约定被删除')
				{
					var pmMode_appoint = $('#pmMode_appoint').combobox('getText');
					aflag = false;
					$.messager.alert('提示','此\"'+pmMode_appoint+'\"付款约定已被删除,请选择其他付款约定！','info'); 
				}
			}
		});
	}

	//加载付款约定下拉列表信息
	function loadPaymentAppoint(){
		$.ajax({
			url:'custController.do?getPaymentAppoint',
			async:false,
			success:function(data,status,xml)
			{
				//将返回的字符串数据解析为JSON
				var obj = $.parseJSON(xml.responseText);

				//调用loadData方法加载数据
				$('#pmMode_appoint').combobox('loadData',obj);
			},
			error:function(){}
		});
	}



	/*************************combobx数据加载End***********************************/

	//付款方式明细tab新增按钮响应事件
	$('#pmMode_add').click(function(){
		addPayDesc();
	});

	//新增付款方式说明事件
	function addPayDesc()
	{		
		//获取付款方式的id
		var pm_id = $('#pmMode_id').val();
		//获取付款约定说明的值
		var pm_appoDesc = $('#pmMode_appointDesc').val();
		//获取combobox付款约定的值
		var pm_appoint = $('#pmMode_appoint').combobox('getValue');

		//提交前验证有效性
		if(pm_appoint == "" || pm_appoint == 0)
		{
			$.messager.alert('提示','请输入有效的信息!','info');
			$('#pmMode_appoint').validatebox('validate');
			return false;
		} 
		if(pm_appoDesc == "")
		{
			$.messager.alert('提示','请输入有效的信息!','info');
			$('#pmMode_appointDesc').validatebox('validate');
			return false;
		}

		validateAppoint();
		
		if(aflag == false)
		{
			
		}
		else
		{
			
			//新增一条付款约定
			$.ajax({
				url:'custController.do?addPayAppoint',
				type:'POST',
				data:{
					pm_id:pm_id,
					pm_appoDesc:pm_appoDesc,
					pm_appoint:pm_appoint
				},
				success:function(data,status,xml){

					if(xml.responseText == '新增成功')
					{
						//重新加载datagrid
						loadPaymentDescDG(); 
						$.messager.alert('提示','提交成功!','info');
						
					}
						

					else if (xml.responseText == '新增失败')
					{
						$.messager.alert('提示','提交失败!','error');
					}
						
					
					else
					{
						$.messager.alert('提示','该付款方式记录被删除，刷新付款方式！','error');
					}

					$('#pmMode_appoint').validatebox('validate');
				},
				error:function(){
					$.messager.alert('提示','提交失败!','error');
				}
			});


			//新增之后清空付款约定和付款约定说明控件的数据
			clearPayDesc();
		}

	}

	//验证付款方式有效性
	function validatePayment()
	{
		var cc_id = $('#cc_id').val();
		var pm_id = $('#pm_id').val();
		var mode_id = $('#pm_Mode').combobox('getValue');
		if(cc_id == "")
		{
			$.messager.alert('提示','请先选择客户公司！','info');
			$('#pm_Mode').combobox('setValue',0);
			return false;
		}
		else
		{
			flag = true;
			$.ajax({
				url:'custController.do?validatePayment',
				async:false,
				data:{cc_id:cc_id,mode_id:mode_id,pm_id:pm_id},
				success:function(data,status,xml){
					if(xml.responseText == '付款方式不可用'){
						var pm_Mode = $('#pm_Mode').combobox('getText');
						flag = false;
						$.messager.alert('提示','该客户公司已存在\"'+pm_Mode+'\"付款方式,请选择其他付款方式！','info'); 
					}
					else if(xml.responseText == "付款方式被删除")
					{
						var pm_Mode = $('#pm_Mode').combobox('getText');
						flag = false;
						$.messager.alert('提示','该\"'+pm_Mode+'\"付款方式已被删除,请选择其他付款方式！','info');
					}
				}
			});
		}
	}
	
	
	//付款方式明细tab删除按钮响应事件
	$('#pmMode_delete').click(function(){
		delPayDesc();
	});

	//删除付款方式说明事件
	function delPayDesc(){
		var pmModeDataGrid = $('#pmMode_datagrid');

		//获取选中的行
		var rows=pmModeDataGrid.datagrid('getSelections');

		//没有选中行提示选择要删除的记录
		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return false;
		}

		//至少选择一行
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){
				var rows=pmModeDataGrid.datagrid('getSelections');
				//删除记录的id数组
				var idArray=[];
				for(var key in rows){
					idArray.push(rows[key].pd_id);
				}

				$.ajax({
					type:'POST',
					url:'custController.do?delPayDesc&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						loadPaymentInfo();
						loadPaymentDescDG();
						$.messager.alert('提示',data+'!','info');
						pmModeDataGrid.datagrid('unselectAll');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','error');
					}
				});
			}
		});

	}


	//清除付款方式说明tab文本框数据
	function clearPayDesc()
	{
		//设置付款约定下拉列表的值为空
		$('#pmMode_appoint').combobox('select',0);
		//设置付款约定说明文本框为空
		$('#pmMode_appointDesc').val("");
	}


});
