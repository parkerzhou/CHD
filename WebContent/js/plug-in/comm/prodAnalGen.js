var custOptType=-1;//操作类型 0表示新增 1表示修改,默认值为-1
	//数据过滤器
var custCode; // 定义客户代码
var editable = true;//是否具有编辑权限

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
	
	
	//页面加载完成执行
	$(function(){
		var initData=[];
		//创建并初始化客户datagrid对象
		/**
		 * pg_id,cc_id,ce_id 分别是隐藏的 起作用是是在你点击某一条记录，要修改的时候，就是根据这三个id 去获取相应的数据
		 */
		simpleDataGrid=$('#ba_prodAnalGen').datagrid({
			 
			columns : [[
				{field : 'ck', checkbox : true},
				{field :'pg_id',hidden:true,title:'id'}, 
			   	{field : 'cc_name', title : '客户公司信息', width : 320}, 
			   	{field :'cc_id',hidden:true},
			   	{field :'ce_id',hidden:true},
				{field : 'pg_prodCate', title : '产品分类', width : 60},
			   	{field : 'pg_code', title : '产品代码', width : 110}, 
			  	{field : 'pg_prodName', title : '产品名称', width : 100}
			]],
			rownumbers : true,
			pageList:[10,15,20,30,50,100],
			checkOnSelect : true, 
			selectOnCheck : true, 
			singleSelect : false,
			method : 'get',
			toolbar : '#prodAnalGenTools',
			autoRowHeight : false,
			pagination : true,
			pageSize : 10,  
			fit : true, 
			fitColumns : true,
			data:initData,
			onDblClickRow:function(rowIndex, row){			
				if(editable == false){
					return;//没有权限，直接返回
				}
				custOptType=1;
				registerPagTabsEven();
				// 让产品分类不可选  为只读状态 
				$('#pg_prodCate').combobox({
					readonly:"true"
					
				});
				
				$('#totalCustCmp').linkbutton('disable'); // 让按钮不可选
				$('#codeshow').val(row.pg_code); //  给显示的产品代码复制 让其显示
				
				$('#pagForm').form('load','custController.do?loadUpdate&pgId='+row.pg_id+'&ccId='+row.cc_id+'&ceId='+row.ce_id);
				var temp = row.pg_code.split("-");
				custCode = temp[0];
				$('#pagInfoTab').tabs('enableTab',1);
				//$('#pagInfoTab').tabs('enableTab',2);		
				$('#pagInfoTab').tabs('select',0);
				$('#pagDialog').dialog('setTitle','修改');			
				$('#pg_prodName').focus();
				$('#custCmpl').focus();			
	
				$('#pagDialog').dialog('open');
				
			}
		});
		
		//查询按钮单击事件	
		$('#prodSerch').bind('click',function(){
			//refresh();
			var custEnt=$('#custEnt').val();//客户
			var custCmp=$('#custCmp').val();//客户公司
			var ccState=$('#ccState').combobox('getValue');//客户公司状态 

			if(typeof custEnt==='undefined'){
				cust='';
			}
			if(typeof custCmp==='undefined'){
				custCmp='';
			}
			if(typeof ccState==='undefined'){
				ccState='';
			}
			
			//var prodAnalGenUrl='custController.do?getprodAnalGen.json&cust='+custEnt+'&custCmp='+custCmp+'&state='+ccState;
			
			var prodAnalGenUrl='custController.do?getprodAnalGen.json';
			$.ajax({
				url:prodAnalGenUrl,
				type:'POST',
				dataType:'JSON',
				data:{cust:custEnt,custCmp:custCmp,state:ccState},
				success:function(result){
					simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
				}
			});
			
//			$('#ba_prodAnalGen').datagrid({
//				url:contributionUrl,
//				loadFilter:pagerFilter
//
//				
//			});
			
		});
		
	
		
		//拦截对话关闭事件
		simplecustDialog=$('#pagDialog').dialog({
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
		
		
		
		//客户公司选择按钮
		$('#totalCustCmp').click(function() {
			$.chcrm.openCommDialog('custComp',false,function(val){
				
				// 客户
				var custName=$('#cust');
				var custId=$('#custId');
				// 客户公司
				var custCmpName=$('#custCmpl');
				var custCmpId=$('#custCmpId');
								
				if(val.length>=1){
					
					$('#codeshow').val("自动生成");
					var name = val[0].custName;
					  custCode  = name.split("-");
					custCode = custCode[0];
//					$('#pg_code').val(custCode[0]+"-");
					if($('#pg_prodCate').combobox('getValue') != ''){
						$.get("custController.do?getProdCode",{id:$('#pg_prodCate').combobox('getValue')},
								function(data){
								if(typeof custCode != 'undefined'){
									$('#pg_code').val(custCode+"-"+data);
								}else{
									$('#pg_code').val(data);
								}
						});
					}else{
						$('#pg_code').val(custCode);
					}
					
					//客户获取值
					custName.val(val[0].custName);
					custName.focus();
					custId.val(val[0].custId);
					//客户公司获取值
					custCmpName.val(val[0].custCompName);
					custCmpName.focus();
					custCmpId.val(val[0].custCompId);
				}else{
					custName.val('');
					custName.focus();
					custId.val('');
					
					custCmpName.val('');
					custCmpName.focus();
					custCmpId.val('');
				}
			});	
		});
							
	});
	
	//此方法用于用户关闭新增或修改面板后的清除工作,使新增或修改对话回复最初状态
	  function clearPage(){	
		
		//使用tab面板回到第一个面板
		$('#pagInfoTab').tabs('select',0);
		//清除表单的数据
		$('#pagForm').form('clear');	
	}
	
	
	// 新增事件 
	function addprodAnalGen() {
		custOptType=0; //  表示新增
		
		$('#totalCustCmp').linkbutton('enable');

		$('#pagInfoTab').tabs('disableTab',1);
		registerPagTabsEven();
		$('#pg_prodCate').combobox('readonly', false);
		simplecustDialog.dialog('setTitle','服务产品分析');			
		simplecustDialog.dialog('open');
		//registerPagTabsEven();
	}
	// 修改事件 
	function editprodAnalGen(){
		custOptType=1;//  设置操作类型
		
		// 判断是否选择一条修改记录
		var rows=simpleDataGrid.datagrid('getSelections');
		if(rows.length<=0){
			$.messager.alert('提示','请选择要修改的记录!','info');
			return null;
		}		
		if(rows.length>1){
			$.messager.alert('提示','请选择一条记录进行修改!','info');
			return null;
		}
		registerPagTabsEven();
	
		var row=simpleDataGrid.datagrid('getSelected');
		
		// 让产品分类不可选  为只读状态 
		$('#pg_prodCate').combobox({
			readonly:"true"
			
		});
		
		$('#totalCustCmp').linkbutton('disable'); // 让按钮不可选
		
		$('#pagForm').form('load','custController.do?loadUpdate&pgId='+row.pg_id+'&ccId='+row.cc_id+'&ceId='+row.ce_id);

		//console.info(row.pg_code);
		$('#codeshow').val(row.pg_code);
		//$('#custCmpId').val(row.cc_id);
		var temp = row.pg_code.split("-");
		custCode = temp[0];
		
		$('#pagInfoTab').tabs('enableTab',1);
		$('#pagInfoTab').tabs('select',0);
		simplecustDialog.dialog('setTitle','服务产品分析');
		$('#pg_prodName').focus();
		$('#custCmpl').focus();
		simplecustDialog.dialog('open');
	}
	
	
	// 删除事件 
	function delprodAnalGen(){

	 	var rows =simpleDataGrid.datagrid('getSelections');
		if(rows.length >= 1){
			$.messager.confirm('提示','是否确定删除所选择的记录',function(r){
				if(r)
					{
						var j = 2;
						for(var i = 0; i<rows.length;i++)
							{
								$.post("custController.do?delProdAnalGen",{pgId:rows[i].pg_id},
								function(data)
								{
									var k = j++;
									if(k>rows.length)
										{
										//simpleDataGrid.datagrid('reload');
										refresh();
										$.messager.alert('提示',data,'info');
										}
								});
							}
					}
			});		
		}else{
			$.messager.alert('提示', '请选择要删除的记录', 'info');
		}
		
	}
	
	// 表单提交事件 
	function pagDialogSave(){
		 $('#pagForm').form('submit',{
			 
			url:'custController.do?addorEditProdAnalGen&pagOptType='+custOptType,
			onSubmit: function(){
				var isValid = $(this).form('validate');
				return isValid;	// 返回false将停止form提交 
			},
			success:function(data){
				
				$('#totalCustCmp').linkbutton('disable'); // 让按钮不可选
				
				$('#pg_prodCate').combobox('disable');
				
				//$('#pagForm').form('load','custController.do?loadUpdate&pgId='+row.pg_id+'&ccId='+row.cc_id+'&ceId='+row.ce_id);
				var temp = data.split("-");
				if(temp[2] == "info")
					{
					$.messager.alert('提示',temp[1],'info');
					$('#pgId').val(temp[0]);
					$('#pg_code').val(temp[3]+"-"+temp[4]+"-"+temp[5]);
					
					$('#codeshow').val(temp[3]+"-"+temp[4]+"-"+temp[5]); //是用以显示的
					refresh(); // 表单提交后刷新  带查询条件的刷新
					if(custOptType==0){
						$('#pagInfoTab').tabs('enableTab',1);	
						$('#pagInfoTab').tabs('select',1);
					}
					custOptType=1;				
					}
				
				if(temp[2] == "error")
				{
					$.messager.alert('提示',temp[1],'error'); 
				}
			//	console.info(data.length);

//				$('#pgId').val(data);  // 把回写的id 赋值 以便进入附件模块
//				refresh(); // 表单提交后刷新  带查询条件的刷新
//				if(custOptType==0){
//					$('#pagInfoTab').tabs('enableTab',1);	
//					$('#pagInfoTab').tabs('select',1);
//				}
//				custOptType=1;
//				//simpleDataGrid.datagrid('reload');
//				$.messager.alert('提示','提交成功!','info'); 
		    }
//		    error:function(XMLHttpRequest, textStatus, errorThrown){
//				$.messager.alert('提示','提交失败!','error');
//			}
		});
	}
	
	var contributionTabsEven_First=false;
	function registerPagTabsEven(){
		if(!contributionTabsEven_First){
			$('#pagInfoTab').tabs({
				onSelect:function(title,index){
					if(index==1){
						updateAnnex(7,$('#pgId').val(),1);//调用附件
					}
				}
			});
		}
	}
	
	// 刷新datagrid 的函数
	function  refresh(){
		var custEnt=$('#custEnt').val();//客户
		var custCmp=$('#custCmp').val();//客户公司
		var ccState=$('#ccState').combobox('getValue');//客户公司状态 

		if(typeof custEnt==='undefined'){
			cust='';
		}
		if(typeof custCmp==='undefined'){
			custCmp='';
		}
		if(typeof ccState==='undefined'){
			ccState='';
		}
		
		var prodAnalGenUrl='custController.do?getprodAnalGen.json';
		$.ajax({
			url:prodAnalGenUrl,
			type:'POST',
			dataType:'JSON',
			data:{cust:custEnt,custCmp:custCmp,state:ccState},
			success:function(result){
				simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
		
		
		
//		var contributionUrl='custController.do?getprodAnalGen.json&cust='+custEnt+'&custCmp='+custCmp+'&state='+ccState;
//		$('#ba_prodAnalGen').datagrid({
//			url:contributionUrl,
//			loadFilter:pagerFilter
//		});		
		
}
		
	// 为了获取产品代码
	$(function(){
		
		$('#pg_prodCate').combobox({
			onSelect:function(rec){
				$('#codeshow').val("自动生成");
				var s = $('#pg_prodCate').combobox('getValue');
				
				// 发送请求 
				$.get("custController.do?getProdCode",{id:s},
					function(data){
					if(typeof custCode != 'undefined'){
						$('#pg_code').val(custCode+"-"+data);
					}else{
						$('#pg_code').val(data);
					}
				});
			
			}
	
		});
		
		
		// 接收参数用来显示一开始的界面
		function getUrlParam(name){
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
			var r = window.location.search.substr(1).match(reg); 
			if (r!=null) return unescape(r[2]); return null;
		}
		
		var objId = getUrlParam('objId');//从客户公司的关联信息带过去的参数是objId，在此指客户公司ID。
		if(objId != null){
		$.ajax({
			//该url返回客户名称、客户公司名称，用于填充搜索中的“客户”、“客户公司”项。
			url:'custController.do?getCustNameAndCustCmpNameByCcId&ccId=' + objId,
			dataType:'text',
			success:function(result){
				result = $.parseJSON(result);
				$('#custEnt').val(result.ceName);
				$('#custCmp').val(result.ccName);
				/*$('#custEnt').attr("readonly","readonly")
				$('#custCmp').attr("readonly","readonly");*/
				//refresh();
				//console.info(result);//打印结果如下图
			}
		   });
		}
		
		

	});
	
	
	

	
	
	
	