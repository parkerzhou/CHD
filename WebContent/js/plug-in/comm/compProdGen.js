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
		simpleDataGrid=$('#compProdGenTable').datagrid({
			 
			columns : [[
				{field : 'ck', checkbox : true},
				{field :'cg_id',hidden:true,title:'竞争对手客户产品id'}, 
			   	{field : 'cp_name', title : '竞争对手', width : 30}, 
			   	{field :'cp_id',hidden:true,title:'竞争对手id'},
			   	{field : 'cc_cmpName', title : '竞争对手服务客户公司', width : 30},
			   	{field :'cc_id',hidden:true,  title:'竞争对手客户id'},
			   	{field :'rows',title : '序号' ,width:10},
				{field : 'cg_prodCate', title : '产品分类', width : 20}, 
			  	{field : 'cpg_name', title : '产品服务名称', width : 20}
			]],
			rownumbers : true,
			pageList:[10,15,20,30,50,100],
			checkOnSelect : true, 
			selectOnCheck : true, 
			singleSelect : false,
			method : 'get',
			toolbar : '#compProdGenTools',
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
				
				$('#cp_code').combobox({   //  打开修改时 产品代码不可以 编辑            
				    editable:false 		  
				});
				
				$('#cgId').val(row.cg_id);// 是为了保持 附件和记录id 的一致性
				$('#cc_seq').val(row.rows);// 修改时获取 序号
				custOptType=1;
				registerPagTabsEven();
				$('#pagForm').form('load','competitorController.do?loadCompProdGenData&cgId='+row.cg_id+'&ccId='+row.cc_id+'&cpId='+row.cp_id);
				$('#pagInfoTab').tabs('enableTab',1);
				//$('#pagInfoTab').tabs('enableTab',2);		
				$('#pagInfoTab').tabs('select',0);
				$('#cpgDialog').dialog('setTitle','竞争对手主要服务客户产品分析信息');	
				//simplecustDialog.dialog('setTitle','竞争对手主要服务客户产品分析信息');	
				$('#pg_prodName').focus();
				$('#custCmpl').focus();			
	
				$('#cpgDialog').dialog('open');
				
			}
		});
		
	
		
		//查询按钮单击事件	
		$('#Serch').bind('click',function(){
			//refresh();
			var competitor=$('#competitor').val();//客户
			var compCust=$('#compCust').val();//客户公司
			var compProdGen = $('#compProdGen').val();//  竞争对手服务产品
//			var have=$('#have').combobox('getValue');//客户公司状态 

			if(typeof competitor==='undefined'){
				competitor='';
			}
			if(typeof compCust==='undefined'){
				compCust='';
			}
			if(typeof compProdGen==='undefined'){
				compProdGen='';
			}
//			if(typeof have==='undefined'){
//				have='';
//			}
			
			
			var compProdGenUrl='competitorController.do?serchCompProdGen';
			$.ajax({
				url:compProdGenUrl,
				type:'POST',
				dataType:'JSON',
				data:{competitor:competitor,compCust:compCust,compProdGen:compProdGen},
				success:function(result){
					simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
				}
			});
			
			
//			var contributionUrl='competitorController.do?serchCompProdGen&competitor='+competitor+'&compCust='+compCust+'&compProdGen='+compProdGen+'&have='+have;
//			$('#compProdGenTable').datagrid({
//				url:contributionUrl,
//				loadFilter:pagerFilter
//		
//			});
			
		});
		
		
		
		
		//拦截对话关闭事件
		simplecustDialog=$('#cpgDialog').dialog({
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
		
		// 竞争对手客户公司选择按钮
		$('#totalCustCmp').click(function() {
			$.chcrm.openCommDialog('competitorComp',false,function(val){
				
				
				// 竞争对手客户公司的名称和id
				var custCmpName=$('#compCustDlg');
				var compId=$('#compId'); // 竞争对手客户id
				
				var isUs = $('#isUs');
				
				if(val.length>=1){
					//console.info(val[0].serviceCustComp)
					//竞争对手客户公司获取值
					custCmpName.val(val[0].serviceCustComp);
					custCmpName.focus();
					compId.val(val[0].id);
					
					// 是否我们客户的赋值
					isUs.val(val[0].isOurCust);
					if(isUs.val() == '是' && $('#cg_isSelfCompProd').combobox('getValue') == '1'){
						$('#cp_code').combobox({                 
						    valueField:'pg_id',    
						    textField:'prodCode',  
						    editable:false,
						    readonly:false,
						    url:'competitorController.do?getProdCode'   
						});		
					}else if($('#cg_isSelfCompProd').combobox('getValue') != ''){
						$('#cg_usProd').val("0"); // 否则， 产品id一律为0
						
						$('#cg_prodCateFrom').combobox('setValue',''); // 当选择否 是立马 清除产品分类的数值
						$('#cg_prodCateFrom').combo({readonly:false});
						
						$('#cp_code').combobox({readonly:true});
						$('#cp_code').combobox('setValue',"自动生成");// 有系统自己生成产品代码
						
						$('#cp_nameFrom').val(''); // 清除产品名称
						$('#cp_nameFrom').attr('readOnly',false);
						$('#cp_nameFrom').validatebox('validate');
					}
				}else{	
					// 清除的作用  
					custCmpName.val('');
					custCmpName.focus();
					compId.val('');					
					isUs.val('');
				}
			});	
		});
		
		// 当选择是我方竞争产品触发的事件 
		$('#cg_isSelfCompProd').combobox({
			onSelect:function(record){
				var isUs = $('#isUs').val();
				//console.info(isUs);
				//console.info(record.tt);
				if(record.tt == "是" && isUs == "是" )
				{
					//console.info("选择");
				//  当是我们的竞争产品的时候 自动产生 产品代码 
					$('#cp_code').combobox({                 
					    valueField:'pg_id',    
					    textField:'prodCode',  
					    editable:false,
					    readonly:false,
					    url:'competitorController.do?getProdCode'   
					});
					
					//  给不需要手动输入的 输入框  赋值为 ： 有系统生成，并且此时处于只读的状态  不可以编辑
							
					//  设为 只读的状态 
					$('#cg_prodCateFrom').combo({
						readonly:true
					});
					
					$('#cp_nameFrom').attr('readOnly',true);
								
					$('#cg_prodCateFrom').combobox('setValue','自动引用');// 产品分类
					$('#cp_nameFrom').val("自动引用"); //  产品名称

					
				}else if(isUs != ""){
					$('#cg_usProd').val("0"); // 否则， 产品id一律为0
					
					$('#cg_prodCateFrom').combobox('setValue',''); // 当选择否 是立马 清除产品分类的数值
					$('#cg_prodCateFrom').combo({readonly:false});
					
					$('#cp_code').combobox({readonly:true});
					$('#cp_code').combobox('setValue',"自动生成");// 有系统自己生成产品代码
					
					$('#cp_nameFrom').val(''); // 清除产品名称
					$('#cp_nameFrom').attr('readOnly',false);
					$('#cp_nameFrom').validatebox('validate');
				}
						
			}
		});
			
	//当选择产品代码时需要触发的事件 
		$('#cp_code').combobox({
			onSelect:function(record){
				$('#cp_code').combobox('setValue',record.pg_code); //给产品代码赋值 (只有代码没有名称)

				$('#cg_prodCateFrom').combobox('setValue',record.pg_prodCate); // 给产品分类赋值
				$('#cp_nameFrom').val(record.pg_prodName); // 给产品名称赋值
				$('#cp_nameFrom').focus();
								
				$('#cg_usProd').val(record.pg_id);// 给产品id 赋值 
							
			}
		});
		
		
							
	});
	
	//此方法用于用户关闭新增或修改面板后的清除工作,使新增或修改对话回复最初状态
	  function clearPage(){	
		
		//使用tab面板回到第一个面板
		$('#pagInfoTab').tabs('select',0);
		//清除表单的数据
		$('#pagForm').form('clear');	
		
		$('#cp_code').combobox({
		    editable:false,
		    readonly:true
		});
	}
	
	
	// 新增事件 
	function addcompProdGen() {
		custOptType=0; //  表示新增
		$('#pagInfoTab').tabs('disableTab',1);
		registerPagTabsEven();
		simplecustDialog.dialog('setTitle','竞争对手主要服务客户产品分析信息');			
		simplecustDialog.dialog('open');
		//registerPagTabsEven();
	}
	// 修改事件 
	function editcompProdGen(){

		custOptType=1;//  设置操作类型
		
		$('#cp_code').combobox({   //  打开修改时 产品代码不可以 编辑            
		    editable:false 		  
		});
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
		$('#cgId').val(row.cg_id);// 是为了保持 附件和记录id 的一致性
		//$('#cc_seq').val(row.rows);// 修改时获取 序号
		$('#pagForm').form('load','competitorController.do?loadCompProdGenData&cgId='+row.cg_id+'&ccId='+row.cc_id+'&cpId='+row.cp_id);

	
		$('#pagInfoTab').tabs('enableTab',1);
		$('#pagInfoTab').tabs('select',0);
		simplecustDialog.dialog('setTitle','竞争对手主要服务客户产品分析信息');	
		$('#pg_prodName').focus();
		$('#custCmpl').focus();
		simplecustDialog.dialog('open');
	}
	
	// 删除事件 
	function delcompProdGen(){

	 	var rows =simpleDataGrid.datagrid('getSelections');
		if(rows.length >= 1){
			$.messager.confirm('提示','是否确定删除所选择的记录',function(r){
				if(r)
					{
						var j = 2;
						for(var i = 0; i<rows.length;i++)
							{
								$.post("competitorController.do?deleteCompProdGen",{cgId:rows[i].cg_id},
									
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
			 
			url:'competitorController.do?addOrEdit&optType='+custOptType,
			onSubmit: function(){
				var isValid = $(this).form('validate');
				return isValid;	// 返回false将停止form提交 
			},
			success:function(data){
				//console.info(data);
				//  对返回的数据进行分割
				var temp = data.split("-");
				var isUs = $('#isUs').val();
				if(isUs == '否' || $('#cg_isSelfCompProd').combobox('getValue') == '2'){
					$('#cp_code').combobox('setValue', temp[3] + '-' + temp[4] + '-' + temp[5]);
				}
				if(temp[2]== "info")
				{
					$.messager.alert('提示',temp[1],'info'); 
					$('#cgId').val(temp[0]);  // 把回写的id 赋值 以便进入附件模块	
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
							
			
		    },
		    error:function(XMLHttpRequest, textStatus, errorThrown){
				$.messager.alert('提示','提交失败!','error');
			}
		});
	}
	
	
	//  打开附件的函数
	var contributionTabsEven_First=false;
	function registerPagTabsEven(){
		if(!contributionTabsEven_First){
			$('#pagInfoTab').tabs({
				onSelect:function(title,index){
					if(index==1){
						updateAnnex(15,$('#cgId').val(),1);//调用附件
					}
				}
			});
		}
	}
	
	// 刷新datagrid 的函数
	function  refresh(){
		var competitor=$('#competitor').val();//客户
		var compCust=$('#compCust').val();//客户公司
		var compProdGen = $('#compProdGen').val();//  竞争对手服务产品


		if(typeof competitor==='undefined'){
			competitor='';
		}
		if(typeof compCust==='undefined'){
			compCust='';
		}
		if(typeof compProdGen==='undefined'){
			compProdGen='';
		}
		
		

		var compProdGenUrl='competitorController.do?serchCompProdGen';
		$.ajax({
			url:compProdGenUrl,
			type:'POST',
			dataType:'JSON',
			data:{competitor:competitor,compCust:compCust,compProdGen:compProdGen},
			success:function(result){
				simpleDataGrid.datagrid({loadFilter:pagerFilter}).datagrid('loadData',result);
			}
		});
		
		
//		var contributionUrl='competitorController.do?serchCompProdGen&competitor='+competitor+'&compCust='+compCust+'&compProdGen='+compProdGen+'&have='+have;
//		$('#compProdGenTable').datagrid({
//			url:contributionUrl,
//			loadFilter:pagerFilter
//	
//		});
		
}
	
	// 在选择竞争对手客户公司的时候得到序号
//	function  getSeq( val){
//		var s = val[0].id;
//		
//		// 发送请求 
//		$.get("competitorController.do?getSeq",{id:s},
//				function(data){
//				$('#cc_seq').val(data);
//		});
//	}
		

	$(function(){
	
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
			url:'competitorController.do?getCompetitorByCpId&cpId=' + objId,
			dataType:'text',
			success:function(result){
				result = $.parseJSON(result);
			//	console.info(result);//打印结果如下图
				$('#competitor').val(result.cpName);

//				$('#custEnt').attr("readonly","readonly")
//				$('#custCmp').attr("readonly","readonly");
				
			//	refresh();
				
			}
		   });
		}
			
		
	});
	
	
	

	
	
	
	