$(function(){ 
	
	var editable = true;
   var cpOptType=-1;//主菜单标识，操作类型 0表示新增 1表示修改,默认值为-1
   var opOptType=-1;//突出业绩标识，操作类型 0表示新增 1表示修改,默认值为-1
   var oaOptType=-1;//突出奖项标识，操作类型 0表示新增 1表示修改,默认值为-1
   
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
	var competitorTabsEven_First=false;
	//注册事件
	function registerCompetitorTabsEven(){
		if(!competitorTabsEven_First){
			$('#cpd_tabs').tabs({
				onSelect:function(title,index){
					if(index == 1)
					{
						//加载数据
						loadCompQualDg();
					}
					if(index == 2)
					{
						//加载数据
						loadOutsPerfDg();
					}
					if(index == 3)
					{
						//加载数据
						loadOutsAwarDg();
					}
					if(index==4){
						//调用附件
				    	//获取当前竞争对手id
				    	var cp_id = $('#cp_id').val();

						updateAnnex(13, cp_id, 1);
					}
					if(index == 5)
					{
						// 加载关联信息
					
							var cp_id = $('#cp_id').val();
							if (cp_id != null && cp_id != '') {
								updateRelation(13, cp_id);
							}
			
					}
				}
			});
		}
		competitorTabsEven_First=true;
	}
	

    //加载企业资质窗口datagird数据
    function loadCompQualDg(){
    	//获取当前竞争对手id
    	var cp_id = $('#cp_id').val();
    	
		//根据当前竞争对手idid加载企业资质
		var cqUrl='competitorController.do?loadCompQual&cp_id=' + cp_id;
		$('#cq_dg').datagrid({
			url:cqUrl,
			loadFilter:pagerFilter    //  即获取数据源 
		});
    }

    
    //加载突出业绩窗口datagird数据
    function loadOutsPerfDg(){
    	//获取当前竞争对手id
    	var cp_id = $('#cp_id').val();
    	
		//根据当前竞争对手id加载该突出业绩
		var opUrl='competitorController.do?loadOutsPerf&cp_id=' + cp_id;
		$('#op_dg').datagrid({
			url:opUrl,
			loadFilter:pagerFilter,    //  即获取数据源
			onDblClickRow:function(rowIndex, row){
				
				//修改事件
				opOptType = 1;
				
				//获取当前竞争对手突出业绩id  	
		        var op_id = row.op_id;
		        registerCompetitorTabsEven();
		        //加载指定id的突出业绩
				$.ajax({
					url:'competitorController.do?loadOutsPerfInfo&op_id='+op_id,
					type:'POST',
					async:false,
					success:function(data,status,xml){
						var obj = $.parseJSON(xml.responseText);
						//load data
						$('#op_form').form('load',obj);
				    	//设置竞争对手名称
				    	$('#op_compName').val($('#cq_competitor').val());
					},
					error:function(){}
				});
				outsPerfDialog.dialog('setTitle','突出业绩_修改');
				outsPerfDialog.dialog('open');
			}
		});
    }
    
    
    //加载突出奖项datagird
    function loadOutsAwarDg(){
    	//获取当前竞争对手id
    	var cp_id = $('#cp_id').val();
    	
		//根据当前竞争对手id加载该突出奖项
		var oaUrl='competitorController.do?loadOutsAwar&cp_id=' + cp_id;
		$('#oa_dg').datagrid({
			url:oaUrl,
			loadFilter:pagerFilter,    //  即获取数据源
			onDblClickRow:function(rowIndex, row){
		
				//修改事件
				oaOptType = 1;

				
				//获取当前竞争对手突出奖项id  	
		        var oa_id = row.oa_id;
				
		        //加载指定id的突出奖项
				$.ajax({
					url:'competitorController.do?loadOutsAwarInfo&oa_id='+oa_id,
					type:'POST',
					async:false,
					success:function(data,status,xml){
						var obj = $.parseJSON(xml.responseText);
						//load data
						$('#oa_form').form('load',obj);
				    	//设置竞争对手名称
				    	$('#oa_compName').val($('#cq_competitor').val());
					},
					error:function(){}
				});
				outsAwarDialog.dialog('setTitle','突出奖项_修改');
				outsAwarDialog.dialog('open');
			}
		});
    }
    
    //加载企业资质combobox数据
    function loadQualCombobox(){
    	$.ajax({
    		url:'competitorController.do?loadQualCombobox',
    		success:function(data,status,xml)
    		{
    			var obj = $.parseJSON(xml.responseText);
    			
    			
    			$('#cq_Qual').combobox('loadData',obj);
    		}
    	});
    }
    
    
	//竞争对手信息页面数据清除
	function clearPageForTab0(){
		//清除竞争对手信息窗口数据
		$('#cpi_form').form('clear');
		$('#ct_createDate').text("");
	}
	
	//清除企业资质窗口数据
	function clearPageForTab1(){
		//清除数据
		var cq_Qual = $('#cq_Qual');
		cq_Qual.combobox('clear');
		cq_Qual.combobox('validate');
	}
	
	//清除突出业绩窗口数据
	function clearPageForTab2(){
		//清除数据
		$('#op_form').form('clear');
		
	}
	
	
	function clearPageForTab3(){
		//清除数据
		$('#oa_form').form('clear');
	}
	
	

	var initData=[];
	$('#cq_dg').datagrid({
		data:initData,
		loadFilter:pagerFilter    //  即获取数据源 
	});
	
	$('#op_dg').datagrid({
		data:initData,
		loadFilter:pagerFilter    //  即获取数据源 
	});
	
	$('#oa_dg').datagrid({
		data:initData,
		loadFilter:pagerFilter    //  即获取数据源 
	});
	//创建并初始化付款方式datagrid对象
	var simpleDataGrid=$('#cp_dg').datagrid({
		data:initData,
		onDblClickRow:function(rowIndex, row){
			if(editable == false){
				return;//没有权限，直接返回
			}
			//修改标识
	    	cpOptType = 1;
			
			registerCompetitorTabsEven();
			
			//加载竞争对手信息
			$.ajax({
				url:'competitorController.do?loadCompetitorInfo&cp_id='+row.cp_id,
				type:'POST',
				async:false,
				success:function(data,status,xhr){
					var json  = $.parseJSON(xhr.responseText);
				
					//装载表单数据
					$('#cpi_form').form('load',json);
				
					
					//设置时间
					$('#ct_createDate').text(json.ct_createDate);
					//设置企业资质中的竞争对手名称
					$('#cq_competitor').val(json.cp_name);
					
				},
				error:function(){}
			});
			
			
			var cpd_tabs = $('#cpd_tabs');
			cpd_tabs.tabs('enableTab',1);
			cpd_tabs.tabs('enableTab',2);	
			cpd_tabs.tabs('enableTab',3);
			cpd_tabs.tabs('enableTab',4);
			cpd_tabs.tabs('enableTab',5);
			cpd_tabs.tabs('select',0);
			competitorDialog.dialog('setTitle','修改');
			competitorDialog.dialog('open');
		}
	});
	
	
	//拦截对话关闭事件
	var competitorDialog=$('#cpd_FuncWindow').window({
		//  面板关闭前触发 
		onBeforeClose:function(){
			$.messager.confirm('提示','是否确定返回至主界面?',function(r){ 
				if(r){
					//确定关闭窗口后清除页面数据并关闭窗口
					clearPageForTab0();
					competitorDialog.window('close',true); 
				 } 
			});
			return false;
		}

	});
	
	
	//查询按钮响应事件
    $('#cp_search').click(function(){
		loadCompetitorInfo();
    });
    
    
    function loadCompetitorInfo()
    {
    	//获取查询条件
    	var cp_competitor = $('#cp_competitor').val();
    	var cp_searchKeyWord = $('#cp_searchKeyWord').val();
    	
    	if(typeof cp_competitor==='undefined'){
    		cp_competitor='';
		}
		if(typeof cp_searchKeyWord==='undefined'){
			cp_searchKeyWord='';
		}
    	//根据查询条件获取相应的竞争对手信息
		var cpUrl='competitorController.do?searchCompetitorInfo';
		$.ajax({
			url:cpUrl,
			type:'POST',
			dataType:'JSON',
			data:{cp_competitor:cp_competitor,cp_searchKeyWord:cp_searchKeyWord},
			success:function(result){
				simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
    }
    
    
    
    //主菜单新增按钮响应事件
    $('#cp_add').click(function(){
    	addFunction();
    });
    
    
    //主菜单新增事件
    function addFunction(){
    	cpOptType=0;
        
    	//自动生成竞争对手代码
    	$.ajax({
    		url:'competitorController.do?getCompetitorCode',
    		async:false,
    		success:function(data,status,xml){
    			//获得竞争对手代码code
    			var code = xml.responseText;
    			//设置竞争对手代码
    			 $('#cp_code').val(code);

    		},
    		error:function(){}
    	});
    	
    	//获取建档时间
    	var myDate=new Date();
    	var month = myDate.getMonth()+1;
    	//处理建档时间格式为YYYY-MM-DD hh:mm
    	myDate = myDate.getFullYear()+'-'+month+'-'+myDate.getDate()
    	+' '+myDate.getHours()+':'+myDate.getMinutes() + ":" + myDate.getSeconds();
    	$('#ct_createDate').text(myDate);
		
    	var cpd_tabs = $('#cpd_tabs');
    	cpd_tabs.tabs('disableTab',1);
    	cpd_tabs.tabs('disableTab',2);
    	cpd_tabs.tabs('disableTab',3);
    	cpd_tabs.tabs('disableTab',4);
    	cpd_tabs.tabs('disableTab',5);
    	
    	cpd_tabs.tabs('select',0);
		registerCompetitorTabsEven();
		
		competitorDialog.dialog('setTitle','新增');
		competitorDialog.dialog('open');
    }
    
    
    //竞争对手信息窗口提交按钮响应事件
    $('#cpi_submit').click(function(){
    	saveCompetitorInfo();
    });
    
    
    //竞争对手信息提交事件
    function saveCompetitorInfo(){
    	//提交前验证数据有效性
    	var isValid = $('#cpi_form').form('validate');

    	if(!isValid)
    	{
    		return isValid;
    	}
    	
    	validateCompetitor();
    	if(!flag)
    	{
    		$.messager.alert('提示','竞争对手名称已被使用！','info');
    		return false;
    	}
    	
    	//获取表单数据
    	var format = $('#cpi_form').serializeArray();
    	
    	//获取建档时间
    	var time = $('#ct_createDate').text();
    	
    	//通过有效性验证，提交数据
    	$.ajax({
	    	url:'competitorController.do?saveCompetitorInfo&ct_createDate='+time+'&cpOptType=' + cpOptType,
    		type:'POST',
    		async:false,
    		data:format,
    		success:function(data,status,xml){
    			
    			var id = xml.responseText;

    			if(id == '0')
    			{
    				//新增失败
    				$.messager.alert('提示','竞争对手代码已被使用！请刷新！','info');
    			}
    			else if(id == '-1')
    			{
    				$.messager.alert('提示','竞争对手被删除！请刷新！','info');
    			}
    			else
    			{
        			//弹出提示
        			$.messager.alert('提示','提交成功!','info');
        			
    				if(cpOptType==0){
    	    			//设置竞争对手信息窗口竞争对手id
    	    			$('#cp_id').val(id);

    					//事件为新增事件提交
    	    			//cpd_tabs = $('#cpd_tabs');
    	    			$('#cpd_tabs').tabs('enableTab',1);
    	    			$('#cpd_tabs').tabs('enableTab',2);
    	    			$('#cpd_tabs').tabs('enableTab',3);
    	    			$('#cpd_tabs').tabs('enableTab',4);
    	    			$('#cpd_tabs').tabs('enableTab',5);
    	    			
    				    //选择tab1
    	    			$('#cpd_tabs').tabs('select',1);
    	    		
    	    			//修改标识
    	    			cpOptType = 1;
    					
    				}
	    			//设置企业资质窗口的竞争对手名称
	    			var cp_name = $('#cp_name').val();
	    			$('#cq_competitor').val(cp_name);
        			
        			//reload 主菜单的datagrid
    				loadCompetitorInfo();
    			}

    		},
    		error:function(){
    			$.messager.alert('提示','提交失败!','error');
    		}
    	});
    }
    
    
    //竞争对手信息窗口修改按钮响应事件
    $('#cp_alter').click(function(){
    	editFunction();
    });
    
    
    //修改事件
    function editFunction(){
    	//修改标识
    	cpOptType = 1;
    	
    	var rows=$('#cp_dg').datagrid('getSelections');
		
		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return null;
		}
		
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}
		
		registerCompetitorTabsEven();
		

		//加载竞争对手信息
		$.ajax({
			url:'competitorController.do?loadCompetitorInfo&cp_id='+rows[0].cp_id,
			type:'POST',
			async:false,
			success:function(data,status,xhr){
				var json  = $.parseJSON(xhr.responseText);
				
			
				//装载表单数据
				$('#cpi_form').form('load',json);
			
				
				//设置时间
				$('#ct_createDate').text(json.ct_createDate);
				//设置企业资质中的竞争对手名称
				$('#cq_competitor').val(json.cp_name);
				
			},
			error:function(){}
		});
		
		
		var cpd_tabs = $('#cpd_tabs');
		cpd_tabs.tabs('enableTab',1);
		cpd_tabs.tabs('enableTab',2);	
		cpd_tabs.tabs('enableTab',3);
		cpd_tabs.tabs('enableTab',4);
		cpd_tabs.tabs('enableTab',5);
		cpd_tabs.tabs('select',0);
		competitorDialog.dialog('setTitle','修改');
		competitorDialog.dialog('open');
    }
    
    
    //删除事件
    $('#cp_delete').click(function(){
    	 var cpDataGrid = $('#cp_dg');
 		
 		//获取选中的行
 		var rows=cpDataGrid.datagrid('getSelections');
 		
 		//没有选中行提示选择要删除的记录
 		if(rows.length<=0){
 			$.messager.alert('提示','请选择要删除的记录!','info');
 			return null;
 		}
 		
 		//至少选择一行
 		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
 			if(r){
 				//删除记录的id数组
 				var idArray=[];
 				for(var key in rows){
 					idArray.push(rows[key].cp_id);
 				}
 				
 				$.ajax({
 					type:'POST',
 					url:'competitorController.do?delCompetitor&idArray='+idArray,
 					dataType:'text',
 					success:function(data,status,xml){
 						loadCompetitorInfo();
 						$.messager.alert('提示',data,'info');
 						cpDataGrid.datagrid('unselectAll');
 					},
 					error:function(XMLHttpRequest, textStatus, errorThrown){
 						loadCompetitorInfo();
 						$.messager.alert('提示','删除错误!','error');
 					}
 				});
 			}
 		});
    });
    
    
    //企业资质下拉框
	$('#cq_Qual').combobox({
		onShowPanel: function(rec){    
			loadQualCombobox();
			$('#cq_Qual').combobox('unselect',0);
        }
	});
    
	
	//企业资质新增按钮响应事件
	$('#cq_add').click(function(){
		var idArray = $('#cq_Qual').combobox('getValues');
		var cp_id = $('#cp_id').val();


		if(idArray == 0 || idArray == "")
		{
			$.messager.alert('提示','请输入有效的信息!','info');
			return false;
		}
		//新增企业资质
		$.ajax({
			url:'competitorController.do?addCompQual&idArray='+ idArray +'&cp_id=' +cp_id,
			type:'POST',
			success:function(data,status,xml){
				$('#cq_dg').datagrid('reload');
				
				//清除页面数据
				clearPageForTab1();
				
				$.messager.alert('提示',xml.responseText,'info');
				
			},
			error:function(){
				$.messager.alert('提示','提交失败!','error');
			}
		});
	});
	
	
	//企业资质删除按钮响应事件
	$('#cq_delete').click(function(){
		var cqDataGrid = $('#cq_dg');
		
		//获取选中的行
		var rows=cqDataGrid.datagrid('getSelections');
		
		//没有选中行提示选择要删除的记录
		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return null;
		}
		
		//至少选择一行
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){
				//删除记录的id数组
				var idArray=[];
				for(var key in rows){
					idArray.push(rows[key].cq_id);
				}
				
				$.ajax({
					type:'POST',
					url:'competitorController.do?delCompQual&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						cqDataGrid.datagrid('reload');
						$.messager.alert('提示',data+'!','info');
						cqDataGrid.datagrid('unselectAll');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','error');
					}
				});
			}
		});
	});
	
	
	/********************************* 突出业绩窗口 Star ********************************/
	//突出业绩新增按钮响应事件
	$('#op_add').click(function(){
		addOutsPerf();
		
	});
	
	
	//突出业绩新增事件
	function addOutsPerf()
	{
        opOptType=0;
        
        var cp_id = $('#cp_id').val();
    	//设置竞争对手id
    	$('#op_competitor').val(cp_id);

    	
    	//获取序号
    	$.ajax({
    		url:'competitorController.do?getOutsPerfSeq&cp_id='+cp_id,
    		async:false,
    		success:function(data,status,xml){
    			//获得序号
    			var seq = xml.responseText;
    			//设置序号
    			$('#op_seq').val(seq);
    		},
    		error:function(){}
    	});
    	
    	//设置竞争对手名称
    	$('#op_compName').val($('#cq_competitor').val());
		
		outsPerfDialog.dialog('setTitle','突出业绩_新增');
		outsPerfDialog.dialog('open');
	}

	
	//突出业绩提交按钮响应事件
	$('#op_submit').click(function(){


		//有效性验证表单数据
    	var isValid = $('#op_form').form('validate');
    	
    	if(!isValid)
    	{
    		
    		return isValid;
    	}

 
		//获取表单元素数据
		var format = $('#op_form').serializeArray();
		//提交数据
		$.ajax({
			url:'competitorController.do?saveOutsPerf&opOptType='+opOptType,
			data:format,
			type:'POST',
			success:function(data,status,xml){
				if(xml.responseText == '提交成功')
				{
					$('#op_dg').datagrid('reload');
					$.messager.alert('提示','提交成功!','info');
					clearPageForTab2();
					outsPerfDialog.window('close');
				}
				else if(xml.responseText == '竞争对手被删除')
				{
					$.messager.alert('提示','竞争对手被删除!','error');
				}
				else if(xml.responseText == '突出业绩被删除')
				{
					$.messager.alert('提示','突出业绩被删除!','error');
				}

			},
			error:function(){
				$.messager.alert('提示','提交失败!','error');
			}
		});
		
	});
	
	
	//突出业绩修改按钮响应事件
	$('#op_alter').click(function(){
		//修改事件
		opOptType = 1;
        
		var rows=$('#op_dg').datagrid('getSelections');
		
		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return null;
		}
		
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}
		
		//获取当前竞争对手突出业绩id  	
        var op_id = rows[0].op_id;
		
        //加载指定id的突出业绩
		$.ajax({
			url:'competitorController.do?loadOutsPerfInfo&op_id='+op_id,
			type:'POST',
			async:false,
			success:function(data,status,xml){
				var obj = $.parseJSON(xml.responseText);
				//load data
				$('#op_form').form('load',obj);
		    	//设置竞争对手名称
		    	$('#op_compName').val($('#cq_competitor').val());
			},
			error:function(){}
		});
		outsPerfDialog.dialog('setTitle','突出业绩_修改');
		outsPerfDialog.dialog('open');
		
	});
	
	
	//突出业绩删除按钮响应事件
	$('#op_delete').click(function(){
        var opDataGrid = $('#op_dg');
		
		//获取选中的行
		var rows=opDataGrid.datagrid('getSelections');
		
		//没有选中行提示选择要删除的记录
		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return null;
		}
		
		//至少选择一行
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){
				//删除记录的id数组
				var idArray=[];
				for(var key in rows){
					idArray.push(rows[key].op_id);
				}
				
				$.ajax({
					type:'POST',
					url:'competitorController.do?delOutsPref&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						opDataGrid.datagrid('reload');
						$.messager.alert('提示',data+'!','info');
						opDataGrid.datagrid('unselectAll');
						
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','error');
					}
				});
			}
		});
	});
	
	
	//拦截对话关闭事件,突出业绩窗口新增或修改
	var outsPerfDialog=$('#op_FuncWindow').window({
		//  面板关闭前触发 
		onBeforeClose:function(){
			var date = $('#cp_Datetime').datebox('getText');
			var money = $('#cp_bcop').val();
			var yeji = $('#op_outsPerf').val();

			//如果表单不为空，返回false
			if(date == '' && money == '' && yeji == ''){
				return true;
			}
			$.messager.confirm('提示','是否确定返回至主界面?',function(r){ 
				if(r){
					//确定关闭窗口后清除页面数据并关闭窗口
					clearPageForTab2();
					outsPerfDialog.window('close',true); 
				 } 
			});
			return false;
		}

	});
	/********************************* 突出业绩窗口 End ********************************/
	
	/********************************* 突出奖项窗口 Star ********************************/
	//突出奖项新增按钮响应事件
	$('#oa_add').click(function(){
		addOutsAwar();
		
	});
	
	
	//新增事件
	function addOutsAwar()
	{
		 oaOptType = 0;

		var cp_id = $('#cp_id').val();
		// 设置竞争对手id
		$('#oa_competitor').val(cp_id);


		// 获取序号
		$.ajax({
			url : 'competitorController.do?getOutsAwarSeq&cp_id='+cp_id,
			async : false,
			success : function(data, status, xml) {
				// 获得序号
				var seq = xml.responseText;
				// 设置序号
				$('#oa_seq').val(seq);
			},
			error : function() {
			}
		});
		
		// 设置竞争对手名称
		$('#oa_compName').val($('#cq_competitor').val());

		outsAwarDialog.dialog('setTitle', '突出业绩_新增');
		outsAwarDialog.dialog('open');
	}
	
	
	//拦截对话关闭事件,突出奖项窗口新增或修改
	var outsAwarDialog=$('#oa_FuncWindow').window({
		//  面板关闭前触发 
		onBeforeClose:function(){
			var date = $('#oa_Datetime').datebox('getText');
			var yeji = $('#oa_outsAwar').val();

			//如果表单不为空，返回false
			if(date == '' && yeji == ''){
				return true;
			}
			$.messager.confirm('提示','是否确定返回至主界面?',function(r){ 
				if(r){
					//确定关闭窗口后清除页面数据并关闭窗口
					clearPageForTab3();
					outsAwarDialog.window('close',true); 
				 } 
			});
			return false;
		}

	});
	
	
	//突出奖项提交按钮响应事件
	$('#oa_submit').click(function(){


		//有效性验证表单数据
    	var isValid = $('#oa_form').form('validate');
    	
    	if(!isValid)
    	{
    		
    		return isValid;
    	}

    	
		//获取表单元素数据
		var format = $('#oa_form').serializeArray();

		//提交数据
		$.ajax({
			url:'competitorController.do?saveOutsAwar&oaOptType='+oaOptType,
			data:format,
			type:'POST',
			success:function(data,status,xml){
				if(xml.responseText == '提交成功')
				{
					$('#oa_dg').datagrid('reload');
					$.messager.alert('提示','提交成功!','info');
					clearPageForTab3();
					outsAwarDialog.window('close');
				}
				else if(xml.responseText == '突出奖项被删除')
				{
					$.messager.alert('提示','突出奖项被删除!','error');
				}
				else if(xml.responseText == '竞争对手被删除')
				{
					$.messager.alert('提示','竞争对手被删除!','error');
				}

			},
			error:function(){
				$.messager.alert('提示','提交失败!','error');
			}
		});
		
	});
	
	
	//突出奖项修改按钮响应事件
	$('#oa_alter').click(function(){
		//修改事件
		oaOptType = 1;
        
		var rows=$('#oa_dg').datagrid('getSelections');
		
		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return null;
		}
		
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}
		
		//获取当前竞争对手突出奖项id  	
        var oa_id = rows[0].oa_id;
		
        //加载指定id的突出奖项
		$.ajax({
			url:'competitorController.do?loadOutsAwarInfo&oa_id='+oa_id,
			type:'POST',
			async:false,
			success:function(data,status,xml){
				var obj = $.parseJSON(xml.responseText);
				//load data
				$('#oa_form').form('load',obj);
		    	//设置竞争对手名称
		    	$('#oa_compName').val($('#cq_competitor').val());
			},
			error:function(){}
		});
		outsAwarDialog.dialog('setTitle','突出奖项_修改');
		outsAwarDialog.dialog('open');
		
	});
	
	
	//突出奖项删除按钮响应事件
	$('#oa_delete').click(function(){
        var oaDataGrid = $('#oa_dg');
		
		//获取选中的行
		var rows=oaDataGrid.datagrid('getSelections');
		
		//没有选中行提示选择要删除的记录
		if(rows.length<=0){
			$.messager.alert('提示','请选择要删除的记录!','info');
			return null;
		}
		
		//至少选择一行
		$.messager.confirm('提示','是否确定删除所选择的记录?',function(r){
			if(r){
				//删除记录的id数组
				var idArray=[];
				for(var key in rows){
					idArray.push(rows[key].oa_id);
				}
				
				$.ajax({
					type:'POST',
					url:'competitorController.do?delOutsAwar&idArray='+idArray,
					dataType:'text',
					success:function(data,status,xml){
						oaDataGrid.datagrid('reload');
						$.messager.alert('提示',data+'!','info');
						oaDataGrid.datagrid('unselectAll');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('提示','删除错误!','error');
					}
				});
			}
		});
	});
	
	
	//区域选择按钮响应事件
	$('#cpi_select').click(function(){
		$.chcrm.openCommDialog('area',false,function(val){
			
			var cp_addrId = $('#cp_addrId');
			var cp_address = $('#cp_address');

			if(val[0].countryName != '' && val[0].countryName != null && val[0].provinceName != '' && val[0].provinceName != null
					&& val[0].cityName != '' && val[0].cityName != null && val[0].zoneName != '' && val[0].zoneName != null){
				cp_address.val(val[0].countryName+','+val[0].provinceName+','+val[0].cityName+','+val[0].zoneName);
				cp_address.focus();
				cp_addrId.val(val[0].countryId+','+val[0].provinceId+','+val[0].cityId+','+val[0].zoneId);

			}else if(val[0].countryName != '' && val[0].countryName != null && val[0].provinceName != '' && val[0].provinceName != null
					&& val[0].cityName != '' && val[0].cityName != null && val[0].zoneName == ''){
				cp_address.val(val[0].countryName+','+val[0].provinceName+','+val[0].cityName);
				cp_address.focus();
				cp_addrId.val(val[0].countryId+','+val[0].provinceId+','+val[0].cityId);

			}
			else{
				$.messager.alert('提示','总部地址至少包括城市，请重新选择','info');
				cp_address.val('');
				cp_address.focus();
				cp_addrId.val('');
			}
		});	
	});
	
	var flag = true;
	//验证付款约定
	function validateCompetitor()
	{
		var cp_id = $('#cp_id').val();
		var cp_name = $('#cp_name').val();
		flag = true;
		$.ajax({
			url:'competitorController.do?validateCompetitor',
			data:{cp_id:cp_id,cp_name:cp_name},
			async:false,
			type:'POST',
			success:function(data,status,xml){
				
				if(xml.responseText == '竞争对手名称已存在')
				{
					flag = false;
				}
				else if(xml.responseText == '异常')
				{
					flag = false;
				}
			}
		});
	}
	/******************************** 突出奖项窗口 End********************************/
	
});