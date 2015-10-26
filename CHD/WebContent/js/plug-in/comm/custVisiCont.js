	var custVistContOptType = -1;// 操作类型 0表示新增 1表示修改,默认值为-1
	
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
	var custVistContTabsEven_First = false;
	// 注册事件
	function registerCustVistContInfoTabsEven() {
		if (!custVistContTabsEven_First) {
			$('#custVisiContTabs').tabs({
				onSelect : function(title, index) {
					if (index == 1) {
						var cc_id = $('#cc_id').val();
						if (cc_id != null && cc_id != '') {
							updateAnnex(18, cc_id, 1);
						}
					}
				}
			});
			custVistContTabsEven_First = true;
		}
	}
	
	var editable = true;//是否具有编辑权限
	// 页面加载完成执行
	$(function(){
		registerCustVistContInfoTabsEven();
		var initData = [];
		// 创建并初始化客户datagrid对象
		$('#custVistContDataGrid').datagrid({
			data : initData,
			onDblClickRow : function(rowIndex, row) {
				if(editable == false){
					return;//没有权限，直接返回
				}
				custVistContOptType = 1;
				$('#custVisiContDialog #cc_id').val(row.cc_id);
				$('#custVisiContDialog #cv_id').val(row.cv_id);
				$('#custVisiContDialog #cv_title').val(row.cv_title);
				$('#custVisiContDialog #custCmp').val(row.custCmp);
				$('#custVisiContDialog #ct_name').val(row.ct_name);
				$('#custVisiContDialog #cc_seq').val(row.cc_seq);
				$('#custVisiContDialog #cc_confCont').val(row.cc_confCont);
				$('#custVisiContForm').form('load',{}); 
				$('#custVisiContTabs').tabs('enableTab', 1);
				$('#custVisiContTabs').tabs('select', 0);
				$('#custVisiContDialog').dialog('open');
			}
		});
		
		// 拦截拜访商谈记录对话框关闭事件
		$('#custVisiContDialog').dialog({
			onBeforeClose : function() {
				$.messager.confirm('提示', '是否确定返回至主界面?', function(r) {
					if (r) {
						// 清除表单的数据
						$('#custVisiContForm').form('clear');
						if(custVistContOptType==1)
							$('#custVistContDataGrid').datagrid('unselectAll');
						$('#custVisiContDialog').dialog('close', true);
					}
				});
				return false;
			}
		});
	});
	
	//拜访商谈记录查询按钮单击事件
	function custVistContSearch(){
		var custCmp = $.trim($('#custCmp').val());
		var beginDate = $('#beginDate').datebox('getValue');
		var endDate = $('#endDate').datebox('getValue');
		var cc_confCont = $.trim($('#cc_confCont').val());
		if(typeof custCmp==='undefined'){
			custCmp='';
		}
		if(typeof beginDate==='undefined'){
			beginDate='';
		}
		if(typeof endDate==='undefined'){
			endDate='';
		}
		if(typeof cc_confCont==='undefined'){
			cc_confCont='';
		}
/*			var Url = 'visiController.do?searchCustVistContInfo&custCmp='
				+ custCmp + '&beginDate=' + beginDate
				+ '&endDate=' + endDate
				+ '&cc_confCont=' + cc_confCont;
		$('#custVistContDataGrid').datagrid({
			url : Url,
			loadFilter : pagerFilter
		});*/
		var Url = 'visiController.do?searchCustVistContInfo';
		$.ajax({
			url:Url,
			type:'POST',
			dataType:'JSON',
			data:{custCmp:custCmp,beginDate:beginDate,endDate:endDate,cc_confCont:cc_confCont},
			success:function(result){
				$('#custVistContDataGrid').datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
	}
	
	//主界面的新增按钮的单击事件
	function custVistContAdd(){
		custVistContOptType=0;
		$('#custVisiContForm').form('load','visiController.do?loadCustVisiContMaxId');
		$('#custVisiContTabs').tabs('disableTab', 1);
		$('#custVisiContTabs').tabs('select', 0);
		$('#custVisiContDialog').dialog('open');
	}
	// 主界面修改事件
	function custVistContEdit() {
		custVistContOptType = 1;
		var rows = $('#custVistContDataGrid').datagrid('getSelections');
		if (rows.length <= 0) {
			$.messager.alert('提示', '请选择要修改的记录!', 'info');
			return null;
		}

		if (rows.length > 1) {
			$.messager.alert('提示', '请选择一条记录进行修改!', 'info');
			return null;
		}

		var row = $('#custVistContDataGrid').datagrid('getSelected');		
		$('#custVisiContDialog #cc_id').val(row.cc_id);
		$('#custVisiContDialog #cv_id').val(row.cv_id);
		$('#custVisiContDialog #cv_title').val(row.cv_title);
		$('#custVisiContDialog #custCmp').val(row.custCmp);
		$('#custVisiContDialog #ct_name').val(row.ct_name);
		$('#custVisiContDialog #cc_seq').val(row.cc_seq);
		$('#custVisiContDialog #cc_confCont').val(row.cc_confCont);
		$('#custVisiContForm').form('load',{}); 
	
		$('#custVisiContTabs').tabs('enableTab', 1);
		$('#custVisiContTabs').tabs('select', 0);
		$('#custVisiContDialog').dialog('open');
	}
	//主界面的删除按钮的单击事件
	function custVistContRemove(){
		var rows = $('#custVistContDataGrid').datagrid('getSelections');	
		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return null;
		}
		
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){
				var rows=$('#custVistContDataGrid').datagrid('getSelections');
				var idArray=[];
				for(var key in rows){
					idArray.push(rows[key].cc_id);
				}
				
				$.ajax({
					type:'POST',
					url:'visiController.do?delCustVistCont&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						$('#custVistContDataGrid').datagrid('unselectAll');
						custVistContSearch();
						$.messager.alert('提示',data+'!','info');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','info');
					}
				});
			}
		});
	}
	
	//拜访记录标题选择按钮的点击事件
	function custVisiContSelect(){
		$.chcrm.openCommDialog('visit',false,function(val){
			if(val.length>0){
			//	console.info(val);
				var cv_id=$('#custVisiContDialog #cv_id');
				var cv_title=$('#custVisiContDialog #cv_title');
				var custCmp=$('#custVisiContDialog #custCmp');
				var ct_name=$('#custVisiContDialog #ct_name');
				cv_id.val(val[0].id);
			//	cv_title.val(val[0].visitTitle);
				cv_title.focus();
				$.ajax({
					type:'post',
					url:'visiController.do?loadCustInfoAndContact&cv_id='+cv_id.val(),
					dataType:'text'	,
					success:function(result){	
						result = eval('('+result+')');
						custCmp.val(result.custCmp);
						ct_name.val(result.contact);
						cv_title.val(result.title);
					}
				});
			}else{
				cv_id.val('');
				cv_title.val('');
				custCmp.val('');
				ct_name.val('');
			}
		});
	}
	//拜访商谈记录信息的提交按钮事件
	function custVisiContDialogSave(){
		$('#custVisiContForm').form('submit',{
			url:'visiController.do?addorEditCustVisiCont&custVistContOptType='+custVistContOptType,
			onSubmit: function(){
				var isValid = $(this).form('validate');
				return isValid;	// 返回false将停止form提交 
			},
			success:function(data){
				if(data=="true"){
					if(custVistContOptType==0){
						$('#custVisiContTabs').tabs('enableTab',1);		
						$('#custVisiContTabs').tabs('select',1);
					}
					custVistContOptType=1;
					custVistContSearch();
					$.messager.alert('提示','提交成功!','info'); 
				}else{
					$.messager.alert('提示','当前拜访记录标题已被删除，请重新选择!','info'); 
				}
		    },
		    error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.alert('提示','提交失败!','error');
			}
		});
	}
	