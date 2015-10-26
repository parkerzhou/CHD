$(function(){
	var editable = true;
	var objId = getUrlParam('objId');
	if(objId != null){
		$.ajax({
			url:'visiController.do?getCustCmpByCvId&cv_id=' + objId,
			dataType:'text',
			async:false,
			success:function(result){
				$('#cve_visiCmp').val(result);
				
			}
		});
	}
	
	function getUrlParam(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r!=null) return unescape(r[2]); return null;
	}

	var cveOptType=-1;//操作类型 0表示新增 1表示修改,默认值为-1
	    
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
		var visiExpeTabsEven_First=false;
		//注册事件
		function registerVisiExpeInfoTabsEven(){
			if(!visiExpeTabsEven_First){
				$('#cved_tabs').tabs({
					onSelect:function(title,index){
						if(index == 0)
						{
							
						}
						if(index==1){
							//调用附件
							var cv_id = $('#cv_id').val();
							updateAnnex(20, cv_id, 1);
						}
					}
				});
			}
			visiExpeTabsEven_First=true;
		}
		
		
		//页面数据清除
		function clearPage(){
			//清除数据
			$('#ce_expeCapt').combobox('select',0);
			$('#ce_expeAmt2').val("");
			$('#ce_expeAmt').val("");
			$('#ce_type').combobox('select',0);
			$('#cve_expeUse').val("");
		}
	
	var initData=[];
	//创建并初始化付款方式datagrid对象
	var simpleDataGrid=$('#cve_dg').datagrid({
		data:initData,
		onDblClickRow:function(rowIndex, row){
			if(editable == false){
				return;//没有权限，直接返回
			}
			//修改标识
			cveOptType=1;
			
			registerVisiExpeInfoTabsEven();
			
			//使用row设置拜访费用信息中的拜访记录id和拜访记录标题
			$('#cv_id').val(row.cv_id);
			$('#cv_title').val(row.cv_title);
			
			
			//加载datagrid数据
			loadDataVisiExpe();
			
			$('#cved_tabs').tabs('enableTab',1);	
			$('#cved_tabs').tabs('select',0);
			custVisiExpeDialog.dialog('setTitle','修改');
			custVisiExpeDialog.dialog('open');
		}
	});
	
	
	//拦截对话关闭事件
	var custVisiExpeDialog=$('#cved_FuncWindow').window({
		//  面板关闭前触发 
		onBeforeClose:function(){
			//获取表单元素的值
			var ce_expeCapt = $('#ce_expeCapt').combobox('getText');
			var ce_expeAmt2 = $('#ce_expeAmt2').val();
			var ce_expeAmt = $('#ce_expeAmt').val();
			var ce_type = $('#ce_type').combobox('getText');
			var cve_expeUse = $('#cve_expeUse').val();
			
			//如果其中一个元素值不为空，弹出确认弹窗
			if(ce_expeCapt != "" || ce_expeAmt2 != "" || ce_expeAmt != "" || ce_type != "" || cve_expeUse != "")
			{
				$.messager.confirm('提示','是否确定返回至主界面?',function(r){ 
					if(r){
						//确定关闭窗口后清除页面数据并关闭窗口
						clearPage();
						custVisiExpeDialog.window('close',true); 
					 } 
				});
				return false;
			}
			
			}

	});
	
	
	//查询按钮单击响应事件
	$('#cve_search').click(function(){
		loadVisiExpeInfo();
	});
	
	function loadVisiExpeInfo()
	{
		//获取查询条件
		var cve_visiCmp = $('#cve_visiCmp').val();
		var cve_Date1 = $('#cve_Date1').datebox('getValue');

		var cve_Date2 = $('#cve_Date2').datebox('getValue');
		//$('#cve_Date2').datebox('getText');
		
		if(typeof cve_visiCmp==='undefined'){
			cve_visiCmp='';
		}
		if(typeof cve_Date1==='undefined'){
			cve_Date1='';
		}
		if(typeof cve_Date2==='undefined'){
			cve_Date2='';
		}
		
		//根据查询条件进行查询拜访记录费用信息，返回并装入表中
		var cveUrl='visiController.do?searchVisiInfo';
		$.ajax({
			url:cveUrl,
			type:'POST',
			dataType:'JSON',
			data:{cve_visiCmp:cve_visiCmp,cve_Date1:cve_Date1,cve_Date2:cve_Date2},
			success:function(result){
				simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
	}

	
	
	//修改按钮响应事件
	$('#cve_alter').click(function(){
		//调用修改响应事件
		editVisiFunc();
	});
	
	
	//删除按钮响应事件
	$('#cve_delete').click(function(){
		// 获取待删除的记录的id
		var cveDataGrid = $("#cve_dg");

		// 获取选中的行
		var rows = cveDataGrid.datagrid('getSelections');

		// 没有选中行提示选择要删除的记录
		if (rows.length <= 0) {
			$.messager.alert('提示', '请选择要删除的记录!', 'info');
			return null;
		}

		// 至少选择一行
		$.messager.confirm('提示', '是否确定删除所选择的记录?', function(r) {
			if (r) {
				var rows = cveDataGrid.datagrid('getSelections');
				// 删除记录的id数组
				var idArray = [];
				for ( var key in rows) {
					idArray.push(rows[key].cv_id);
				}
				

				$.ajax({
					type : 'POST',
					url : 'visiController.do?delVisiExpeInfo&idArray=' + idArray,
					dataType : 'text',
					success : function(data, status, xml) {
						//重新加载窗口datagrid数据
						loadVisiExpeInfo();
						$.messager.alert('提示', data + '!', 'info');
						cveDataGrid.datagrid('unselectAll');
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.alert('提示', '删除错误!', 'error');
					}
				});
				
			}
		});
	});
	
	//拜访费用修改响应事件
	function editVisiFunc(){
		//修改标识为修改事件
		cveOptType = 1;
		
		//注册选中tab响应事件
		registerVisiExpeInfoTabsEven();
		
		//获取选中记录信息
		var rows=$('#cve_dg').datagrid('getSelections');
		
		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return null;
		}
		
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}
		
		
		//使用rows[0]设置拜访费用信息中的拜访记录id和拜访记录标题
		$('#cv_id').val(rows[0].cv_id);
		$('#cv_title').val(rows[0].cv_title);
		
		
		//加载datagrid数据
		loadDataVisiExpe();
		
		//弹出修改窗口
		$('#cved_tabs').tabs('enableTab',1);
		$('#cved_tabs').tabs('select',0);
		
		custVisiExpeDialog.dialog('setTitle','修改');
		custVisiExpeDialog.dialog('open');
	}
	
	
	//加载拜访费用信息窗口datagrid数据
	function loadDataVisiExpe(){
		//获取当前付款记录的id
		var cv_id = $('#cv_id').val();
		//加载datagrid数据
		$.ajax({
			url:'visiController.do?loadVisiExpe',
			data:{
				cv_id:cv_id
			},
			type:'POST',
			success:function(data,status,xml){
				var obj = $.parseJSON(xml.responseText);
				
				//load data
				$('#cved_dg').datagrid('loadData',obj);
			},
			error:function(){}
		});
	}
	
	

	
	
	/******************combobox加载Star*************************/
	//拜访费用信息单据类型加载
	$('#ce_type').combobox('loadData',[{id:"",text:""},{id:1,text:'发票'},{id:2,text:'收据'}]);
	
	
	//费用科目下拉框被选中时加载费用科目
	$('#ce_expeCapt').combobox({
		onShowPanel: function(rec){    
			loadExpeCapt();
        }
	});
	
	function loadExpeCapt(){
		//费用科目加载
		$.ajax({
			url:'visiController.do?loadExpeCapt',
			success:function(data,status,xml){
				
				//将写回的费用科目数据转换成json
				var obj = $.parseJSON(xml.responseText);
				
				//加载费用科目
				$('#ce_expeCapt').combobox('loadData',obj);
			},
			error:function(){}
		});
	}
	
	
	/******************combobox加载End*************************/
	
	/*************************拜访费用信息窗口新增和删除事件*********************************/
	
	//拜访费用信息窗口新增按钮响应事件
	$('#cved_add').click(function(){
	
		var validate = $('#cved_form').form('validate');

		if(!validate)
		{
			//防止提交
			return validate;
		}
		validateCaptForAdd();
		if(!aflag)
		{
			return false;
		}

		
		//有效性通过验证，允许新增
		var format = $('#cved_form').serialize();
		
		//提交数据
		$.ajax({
			url:'visiController.do?saveVisiExpe&'+format+"&cveOptType="+cveOptType,
			type:'POST',
			async:false,
			success:function(data,status,xml){
				if(xml.responseText == '新增成功')
				{
					$.messager.alert('提示','提交成功!','info');
					
					//reload 拜访费用datagrid
					loadDataVisiExpe();
					loadVisiExpeInfo();
					
					//清除页面数据
					clearPage();
					$('#cved_form').form('validate');
				}
				else if(xml.responseText == '拜访记录已被删除')
				{
					$.messager.alert('提示','拜访记录已被删除！请刷新！','info');
				}

			},
			error:function(){
				$.messager.alert('提示','提交失败!','error');
			}
		});
		
	});
	
	
	
	//拜访费用信息窗口删除按钮响应事件
	$('#cved_delete').click(function(){
		deleteVisiExpe();
	});
	
	
	//修该验证费用科目结果，true表示可提交
	var eflag = true;
	//修改验证费用科目
	function validateCaptForEdit()
	{
		var cvew_expeCapt = $('#cvew_expeCapt').combobox('getValue');
		
		eflag = true;
		$.ajax({
			url:'visiController.do?validateCapt',
			data:{cvew_expeCapt:cvew_expeCapt},
			async:false,
			success:function(data,status,xml){
				if(xml.responseText == '费用科目被删除')
				{
					var expeCapt = $('#cvew_expeCapt').combobox('getText');
					eflag = false;
					$.messager.alert('提示','此\"'+expeCapt+'\"费用科目已被删除,请选择其他科目费用！','info'); 
				}
			}
		});
	}
	
	
	//新增时验证费用科目有效性
	//验证费用科目结果，true表示可提交
	var aflag = true;
	function validateCaptForAdd()
	{
		var ce_expeCapt = $('#ce_expeCapt').combobox('getValue');
		
		aflag = true;
		$.ajax({
			url:'visiController.do?validateCapt',
			data:{cvew_expeCapt:ce_expeCapt},
			async:false,
			success:function(data,status,xml){
				if(xml.responseText == '费用科目被删除')
				{
					var expeCapt = $('#ce_expeCapt').combobox('getText');
					aflag = false;
					$.messager.alert('提示','此\"'+expeCapt+'\"费用科目已被删除,请选择其他科目费用！','info'); 
				}
			}
		});
	}
	
	//拜访费用删除事件
	function deleteVisiExpe(){
		// 获取待删除的记录的id
		var cvedDataGrid = $("#cved_dg");

		// 获取选中的行
		var rows = cvedDataGrid.datagrid('getSelections');

		// 没有选中行提示选择要删除的记录
		if (rows.length <= 0) {
			$.messager.alert('提示', '请选择要删除的记录!', 'info');
			return null;
		}

		// 至少选择一行
		$.messager.confirm('提示', '是否确定删除所选择的记录?', function(r) {
			if (r) {
				var rows = cvedDataGrid.datagrid('getSelections');
				// 删除记录的id数组
				var idArray = [];
				for ( var key in rows) {
					idArray.push(rows[key].ce_id);
				}
				

				$.ajax({
					type : 'POST',
					url : 'visiController.do?delVisiExpe&idArray=' + idArray,
					dataType : 'text',
					success : function(data, status, xml) {
						//重新加载拜访费用信息窗口datagrid数据
						loadDataVisiExpe();
						loadVisiExpeInfo();
						$.messager.alert('提示', data + '!', 'info');
						cvedDataGrid.datagrid('unselectAll');
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.alert('提示', '删除错误!', 'error');
					}
				});
				
			}
		});
		
	}
	
	
	//拜访费用窗口修改按钮响应事件
	$('#cved_alter').click(function(){
        var rows=$('#cved_dg').datagrid('getSelections');
		
		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return null;
		}
		
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}

		loadExpeCapt2();
		//加载拜访费用信息
		$.ajax({
			url:'visiController.do?getVisiExpe&ce_id='+rows[0].ce_id,
			success:function(data,status,xml){
				$('#cvew_form').form('load',$.parseJSON(xml.responseText));
			},
			error:function(){}
			});

		
		cvewDialog = $('#cvew_FuncWindow');
		cvewDialog.dialog('open');
	});
	
	
	$('#cvew_expeCapt').combobox({
		onShowPanel: function(rec){    
			loadExpeCapt2();
        }
	});
	
	function loadExpeCapt2(){
		//费用科目加载
		$.ajax({
			url:'visiController.do?loadExpeCapt',
			success:function(data,status,xml){
				
				//将写回的费用科目数据转换成json
				var obj = $.parseJSON(xml.responseText);
				
				//加载费用科目
				$('#cvew_expeCapt').combobox('loadData',obj);
			},
			error:function(){}
		});
	}
	
	$('#cved_submit').click(function(){
		//提交前验证数据有效性
		var isValid = $('#cvew_form').form('validate');

		if(!isValid)
		{
			return isValid;
		}
		
		validateCaptForEdit();
		if(!eflag)
		{
			return false;
		}
		
		var format = $('#cvew_form').serializeArray();
        $.ajax({
        	url:'visiController.do?alterVisiExpe',
        	type:'POST',
        	data:format,
        	async:false,
    		success:function(data,status,xml){
    			
    			var id = xml.responseText;

    			//弹出提示
    			$.messager.alert('提示','提交成功!','info');
    			
    			//reload datagrid
    			loadDataVisiExpe();
    			loadVisiExpeInfo();
    			cvewDialog = $('#cvew_FuncWindow');
    			cvewDialog.dialog('close');
    			$('#cvew_form').form('clear');
    			
        		
        	},
        	error:function(){
        		$.messager.alert('提示','提交失败!','error');
        	}
        	
        });
	});


	
	//初始化拜访费用信息中的datagrid
	$('#cved_dg').datagrid({
		loadFilter:pagerFilter,
		data:initData,
		onDblClickRow:function(rowIndex, row){
			loadExpeCapt2();
			//加载拜访费用信息
			$.ajax({
				url:'visiController.do?getVisiExpe&ce_id='+row.ce_id,
				success:function(data,status,xml){
					$('#cvew_form').form('load',$.parseJSON(xml.responseText));
				},
				error:function(){}
				});

			
			cvewDialog = $('#cvew_FuncWindow');
			cvewDialog.dialog('open');
		}
	});
	
	
	$('#cvew_type').combobox('loadData',[{id:"",text:""},{id:1,text:'发票'},{id:2,text:'收据'}]);
	/*************************拜访费用信息窗口新增和删除事件*********************************/
	
});