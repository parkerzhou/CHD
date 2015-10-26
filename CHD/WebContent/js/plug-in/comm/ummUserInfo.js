	/*datagrid分页begin*/ 
	function pagerFilter(data){
		if (typeof data.length == 'number' && typeof data.splice == 'function'){	// is array
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
	/*datagrid分页end*/ 
	
	
	var editable = true;//是否具有编辑权限
	$(function(){
		var initData = [];
		// 创建并初始化客户datagrid对象
		$('#datagrid').datagrid({
			loadFilter:pagerFilter,
			data : initData,
			onDblClickRow : function(rowIndex, row) {
				if(editable == false){
					return;//没有权限，直接返回
				}
				$('#editWindow').window('open');
				$('#editWindow').window('center');
				$('#editForm').form('clear');
				//用户类型下拉列表动态加载数据
				$('#editWindow #ut_type').combobox({
					url:'ummUserInfoController.do?getUserTypeComboboxData',
					valueField:'ut_type',
					textField:'ut_type',
					onLoadSuccess:function(){
						var ut_type=$('#editWindow #ut_type').combobox('getValue');
						var url = 'ummUserInfoController.do?getUserGrpNameByTypeComboboxData&ut_type='+ut_type;    
			            $('#editWindow #ug_name').combobox('reload', url);    
					},
					onSelect: function(rec){   
			            var url = 'ummUserInfoController.do?getUserGrpNameByTypeComboboxData&ut_type='+rec.ut_type;    
			            $('#editWindow #ug_name').combobox('reload', url); 
			            $('#editWindow #ug_name').combobox('clear');
			        }
				});
				//用户群组下拉列表框动态加载数据
				$('#editWindow #ug_name').combobox({
				    valueField:'ug_name',    
				    textField:'ug_name'
				});
				//状态下拉列表框动态加载数据  
				$('#editWindow #state').combobox({
					url:'ummUserInfoController.do?getUserStateComboboxData', 
				    valueField:'state',    
				    textField:'state'
				});
				//读取记录填充到表单中
				$('#editForm').form('load',{
					id:row.us_id,
					userId:row.us_userId,
					ug_name:row.ug_name,
					userName:row.us_userName,
					nickName:row.us_nickName,
					email:row.us_email,
					mobileNo:row.us_mobileNo,
					ut_type:row.ut_type,
					state:row.us_state,
					faxNo:row.ud_faxNo,
					telNo:row.ud_telNo,
					addr:row.ud_addr
				});
			}
		});

		/*用户管理模块主界面begin */
		//用户群组下拉列表框动态加载数据
		$('#toolbar #ug_name').combobox({
			url:'ummUserInfoController.do?getUserGrpNameComboboxData',
			method:'GET',
		    valueField:'ug_name',    
		    textField:'ug_name',
		    //加载远程数据成功的时候触发
		    onLoadSuccess: function(){
		    	 var data = $('#toolbar #ug_name').combobox('getData');//返回加载数据。
	             if (data.length > 0) {
	                 $('#toolbar #ug_name').combobox('select', data[0].ug_name);
	             } 
		    //	$('#toolbar #ug_name').combobox('setValue','所有');
			}
		}); 
		
		//用户类型下拉列表动态加载数据
		$('#toolbar #ut_type').combobox({
			url:'ummUserInfoController.do?getUserTypeComboboxData',
			method:'GET',
			valueField:'ut_type',
			textField:'ut_type',
		    //加载远程数据成功的时候触发
		    onLoadSuccess: function(){
		    	 var data = $('#toolbar #ut_type').combobox('getData');//返回加载数据。
	             if (data.length > 0) {
	                 $('#toolbar #ut_type').combobox('select', data[0].ut_type);
	             } 
			}
		});
		
		//状态下拉列表动态加载数据 
		$('#toolbar #state').combobox({
			url:'ummUserInfoController.do?getUserStateComboboxData',
			method:'GET',
			valueField:'state',
			textField:'state',
		    //加载远程数据成功的时候触发
		    onLoadSuccess: function(){
		    	 var data = $('#toolbar #state').combobox('getData');//返回加载数据。
	             if (data.length > 0) {
	                 $('#toolbar #state').combobox('select', data[0].state);
	             } 
			}
		});
		
		//datagrid加载数据 
		$('#datagrid').datagrid({
		//	url:'ummUserInfoController.do?getUserInfo',
			multiSort:'true',
			remoteSort:'false',
			rownumbers:'true',
			pagination:'true',
			pageSize:10,
			pageList:[10,15,20,30,50,100], 
			columns:[[
			      {field:'ok',checkbox:'true'}, 
			      {field:'us_id',title:'主键',hidden:true},
			      {field:'ud_telNo',title:'联系电话',hidden:true},
			      {field:'ud_faxNo',title:'传真',hidden:true},
			      {field:'ud_addr',title:'联系地址',hidden:true},
			      {field:'ug_name',title:'用户群组',width : 90/* ,sortable:'true' */},
			      {field:'us_userId',title:'用户ID',width : 80/* ,sortable:'true' */},
			      {field:'us_userName',title:'用户名称',width : 100},
			      {field:'us_nickName',title:'登陆ID',width : 90}, 
			      {field:'us_email',title:'邮箱',width : 120},
			      {field:'us_mobileNo',title:'手机号码',width : 100},
			      {field:'ut_type',title:'用户类型',width : 80},
			      {field:'us_state',title:'状态',width : 80}
			]],
			toolbar:'#toolbar',
/*			queryParams: {
				ug_name:'所有',
				userId:'',
				userName:'',
				nickName:'',
				ut_type:'所有', 
				state:'所有'
			}*/
		});
		
		/*用户管理模块主界面end*/
		
		/*新增按钮响应事件begin*/
		//新增按钮的单击事件 
		$('#addButton').click(function(){
			$('#addWindow').window('open');
			$('#addWindow').window('center');//居中显示
			$('#addForm').form('clear');//清空表单数据  
			//用户类型下拉列表动态加载数据
			$('#addWindow #ut_type').combobox({
				url:'ummUserInfoController.do?getUserTypeComboboxData',
				valueField:'ut_type',
				textField:'ut_type',
				onLoadSuccess:function(){
					var ut_type=$('#addWindow #ut_type').combobox('getValue');
					var url = 'ummUserInfoController.do?getUserGrpNameByTypeComboboxData&ut_type='+ut_type;    
		            $('#addWindow #ug_name').combobox('reload', url);    
				},
 				onSelect: function(rec){   
		            var url = 'ummUserInfoController.do?getUserGrpNameByTypeComboboxData&ut_type='+rec.ut_type;    
		            $('#addWindow #ug_name').combobox('reload', url); 
		            $('#addWindow #ug_name').combobox('clear');
		        } 
			});
			//用户群组下拉列表框动态加载数据
			$('#addWindow #ug_name').combobox({
			    valueField:'ug_name',    
			    textField:'ug_name'
			});
			//用户群组的单击事件
			$('#addWindow #name').unbind('click').click(function(){//unbind防止重复绑定
		    	 var data = $('#addWindow #ug_name').combobox('getData');//返回加载数据。
	             if (data.length <= 0) {
	            	 $.messager.alert('提示','请先选择用户类型！','info');
	             } 
			});
			//状态下拉列表框动态加载数据  
			$('#addWindow #state').combobox({
				url:'ummUserInfoController.do?getUserStateComboboxData', 
			    valueField:'state',    
			    textField:'state'
			});
		});
		
		//新增用户信息窗口里的提交按钮事件   
		$('#addWindow').find('#submit').click(function(){
	     /* 将表单元素格式化为JSON
		    var formdata = $('#addForm').serialize(); */
			
			$('#addForm').form('submit', { 
				url:'ummUserInfoController.do?addUserInfo', 
				//提交之前的验证 
				onSubmit: function(){
					//得到表格中所有数据
					var data=$('#datagrid').datagrid('getData');
					//获取用户ID，用户名称，登录ＩＤ，邮箱，手机号文本框的值　
					var userId=$('#addWindow #userId').val();
					var userName=$('#addWindow #userName').val();
					var nickName=$('#addWindow #nickName').val();
					var email=$('#addWindow #email').val();
					var mobileNo=$('#addWindow #mobileNo').val();
					// 转成JSON格式的字符串
					// var JsonData=JSON.stringify(data);
					//查找是否重复 
					for(var i=0;i<data.rows.length;i++){
						if(userId==data.rows[i].us_userId){
							$.messager.alert('提示','用户ID已存在，请换一个用户ID!','info');
							return false;
						}
						if(userName==data.rows[i].us_userName){
							$.messager.alert('提示','用户名称已存在，请换一个用户名称!','info');
							return false;
						}
						if(nickName!='' && nickName==data.rows[i].us_nickName){
							$.messager.alert('提示','登陆ID已存在，请换一个登陆ID!','info');
							return false;
						}
						if(email!='' && email==data.rows[i].us_email){
							$.messager.alert('提示','邮箱已存在，请换一个邮箱!','info');
							return false;
						}
						if(mobileNo==data.rows[i].us_mobileNo){
							$.messager.alert('提示','手机号已存在，请换一个手机号！','info');
							return false;
						}
					}
					//easyui自带的form验证
					var isValid = $(this).form('validate');
					if (!isValid){
						//如果表单无效提示提交失败信息
						$.messager.alert('提示','提交失败！','error'); 
					} 
					// 返回false终止表单提交
					return isValid;	
				},
				//提交成功之后的事件 
				success: function(data){
					if(data=='true'){
						$.messager.alert('提示','提交成功!','info'); 
					}else{
						$.messager.alert('提示','提交失败！','error');
					}
					$('#addWindow').window('close'); 
					searchButton();
				}
			});
		});
		
		//新增用户信息窗口里的取消按钮事件  
		$('#addWindow').find('#cancel').click(function(){
			$('#addWindow').window('close');
		});
		/*新增按钮响应事件end*/
		
		/*修改按钮响应事件begin*/  
		//修改按钮单击事件  
		$('#editButton').click(function(){
			var rows=$('#datagrid').datagrid('getSelections');
			if(rows.length==0){
				$.messager.alert('提示','请选择要修改的记录！','info');
			}else if(rows.length==1){
				$('#editWindow').window('open');
				$('#editWindow').window('center');
				$('#editForm').form('clear');
				//用户类型下拉列表动态加载数据
				$('#editWindow #ut_type').combobox({
					url:'ummUserInfoController.do?getUserTypeComboboxData',
					valueField:'ut_type',
					textField:'ut_type',
					onLoadSuccess:function(){
						var ut_type=$('#editWindow #ut_type').combobox('getValue');
						var url = 'ummUserInfoController.do?getUserGrpNameByTypeComboboxData&ut_type='+ut_type;    
			            $('#editWindow #ug_name').combobox('reload', url);    
					},
					onSelect: function(rec){   
			            var url = 'ummUserInfoController.do?getUserGrpNameByTypeComboboxData&ut_type='+rec.ut_type;    
			            $('#editWindow #ug_name').combobox('reload', url); 
			            $('#editWindow #ug_name').combobox('clear');
			        }
				});
				//用户群组下拉列表框动态加载数据
				$('#editWindow #ug_name').combobox({
				    valueField:'ug_name',    
				    textField:'ug_name'
				});
				//状态下拉列表框动态加载数据  
				$('#editWindow #state').combobox({
					url:'ummUserInfoController.do?getUserStateComboboxData', 
				    valueField:'state',    
				    textField:'state'
				});
				//读取记录填充到表单中
				$('#editForm').form('load',{
					id:rows[0].us_id,
					userId:rows[0].us_userId,
					ug_name:rows[0].ug_name,
					userName:rows[0].us_userName,
					nickName:rows[0].us_nickName,
					email:rows[0].us_email,
					mobileNo:rows[0].us_mobileNo,
					ut_type:rows[0].ut_type,
					state:rows[0].us_state,
					faxNo:rows[0].ud_faxNo,
					telNo:rows[0].ud_telNo,
					addr:rows[0].ud_addr
				});
			}
			else{
				$.messager.alert('提示','请选择一条记录进行修改！','info');
			}
		});
		
		//修改用户信息的提交按钮
		$('#editWindow').find('#submit').click(function(){
			$('#editForm').form('submit',{ 
				url:'ummUserInfoController.do?alterUserInfo',
				onSubmit:function(){
					//得到表格中所有数据
					var data=$('#datagrid').datagrid('getData');
					var userId=$('#editWindow #userId').val();
					var userName=$('#editWindow #userName').val();
					var nickName=$('#editWindow #nickName').val();
					var email=$('#editWindow #email').val();
					var mobileNo=$('#editWindow #mobileNo').val();
					var id=$("#editWindow input[name='id']").val();//要修改的用户信息的主键id
					// 转成JSON格式的字符串
					// var JsonData=JSON.stringify(data);
					for(var i=0;i<data.rows.length;i++){
						if(id==data.rows[i].us_id){//跳过自己
							continue;
						}
						if(userId==data.rows[i].us_userId){
							$.messager.alert('提示','用户ID已存在，请换一个用户ID!','info');
							return false;
						}
						if(userName==data.rows[i].us_userName){
							$.messager.alert('提示','用户名称已存在，请换一个用户名称!','info');
							return false;
						}
						if(nickName!='' && nickName!=null && nickName==data.rows[i].us_nickName){
							$.messager.alert('提示','登陆ID已存在，请换一个登陆ID!','info');
							return false;
						}
						if(email!='' && email!=null && email==data.rows[i].us_email){
							$.messager.alert('提示','邮箱已存在，请换一个邮箱!','info');
							return false;
						}
						if(mobileNo==data.rows[i].us_mobileNo){
							$.messager.alert('提示','手机号已存在，请换一个手机号！','info');
							return false;
						}
					}
					var isValid=$(this).form('validate');
					if(!isValid){
						$.messager.alert('提示','提交失败!','error');
					}
					// 返回false终止表单提交
					return isValid;	
				},
				success:function(data){
					if(data=='true'){
						$.messager.alert('提示','提交成功!','info'); 
					}else{
						$.messager.alert('提示','提交失败!','error');
					}
						
					$('#editWindow').window('close'); 
					$('#datagrid').datagrid('unselectAll');//取消选择 
					searchButton();
				}
			});
		});
		
		//修改用户信息的取消按钮
		$('#editWindow').find('#cancel').click(function(){
			$('#editWindow').window('close'); 
		});
		/*修改按钮响应事件end*/ 
		
		/*删除按钮响应事件begin*/
		//删除按钮单击事件
		$('#removeButton').click(function(){
			var rows=$('#datagrid').datagrid('getSelections');
			if(rows.length>0){
				$.messager.confirm('询问','是否确定删除所选择的记录?',function(r){
					if(r){
						//将要删除的主键id存到us_ids数组里面 
						var us_ids=[];   
						for(var i=0;i<rows.length;i++){
							us_ids.push(rows[i].us_id);
						}
	 					$.ajax({
							  url:'ummUserInfoController.do?deleteUserInfo',
							  async:false,
							  type:'POST',
							  data:{us_ids:us_ids},
							  success:function(data,status,xml)
							  {
								  if(data=='true'){
									  $.messager.alert('提示','删除成功!','info'); 
								  }else{
									  $.messager.alert('提示','删除失败！','error'); 
								  }
								  searchButton();
				      		  //  var obj = jQuery.parseJSON(xml.responseText);
							  },
							  error:function()
							  {
								  $.messager.alert('提示','删除失败！','error'); 
							  }
						  });   
					}
				});
			}else{
				$.messager.alert('提示','请选择要删除的记录！','info');
			}
		});
		/*删除按钮响应事件end*/
		
		/*导出按钮的响应事件begin*/
		//导出按钮的单击事件
		$('#undoButton').click(function(){
			$('#exportWindow').dialog('open'); 
			$('#exportWindow').dialog('center');
			$('#exportForm').form('clear');
		});
		
		//导出窗口里的确定按钮事件
		$('#exportWindow').find('#submit').click(function(){
			$('#exportForm').form('submit',{ 
				url:'ummUserInfoController.do?exportExcelOrPDF',   
				onSubmit:function(){
					var isValid=$('#exportForm').form('validate');
					if(!isValid){
						$.messager.alert('提示','请输入完整信息！','info'); 
					}
					// 返回false终止表单提交
					return isValid;	
				}
		    }); 

		});
		//导出窗口里的取消按钮事件
		$('#exportWindow').find('#cancel').click(function(){
			$('#exportWindow').dialog('close');
		});

		
		$.extend($.fn.validatebox.defaults.rules, {    
		    mobileNo: { //验证手机号   
		        validator : function(value) { 
		      //    return /^(13|15|18)\d{9}$/i.test(value); //13,15,18开头 
		            return /^(1(([358][0-9])|[4][57]|[7][08]))\d{8}$/i.test(value);
		        }, 
		        message : '手机号码格式不正确'  
		    },
		    phone : { //验证电话号码 
		        validator : function(value) { 
		            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value); 
		        }, 
		        message : '电话号码格式不正确'       
		    },
		    faxNo : { //验证传真 
		        validator : function(value) { 
	//	            return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,12})+$/i.test(value); 
		            return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value); 
		        }, 
		        message : '传真号码格式不正确' 
		    }
		});
    });
	/*查询按钮的响应事件begin*/
	//查询按钮的单击事件
	function searchButton(){
		$.messager.progress();	// 显示进度条
		$('#searchForm').form('submit', {
			url:'ummUserInfoController.do?searchUserInfo', 
			onSubmit: function(){
				var isValid = $(this).form('validate');
				if (!isValid){
					$.messager.progress('close');	// 如果表单是无效的则隐藏进度条
				}
				return isValid;	// 返回false终止表单提交
			},
			success: function(data){
				$.messager.progress('close');	// 如果提交成功则隐藏进度条
			    var jsdata = eval('(' + data + ')'); //change the JSON string to javascript object
			//	console.info(jsdata);
			//	var jsdata=jQuery.parseJSON(data);
				$('#datagrid').datagrid('loadData', jsdata);
			}
		});
	} 
	/*查询按钮的响应事件end*/