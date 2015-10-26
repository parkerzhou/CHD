 var editable = true;
 var typeBackup = null;
 var rangeBackup = null;
 
 /*datagrid分页Star*/
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
				$('#ut_dg').datagrid('load');
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


//功能按键响应事件
  $(function(){
	  
	   
	  
	  //新增按键响应事件
	  $('#ut_add').click(function()
	  {
		  $('#ut_form').form('clear');
			
		  //标记id=-1，说明为新增角色
		  $('#ut_form').find('#ut_id').val("-1");
		  $('#ut_title').text("新增");
		  
		  //打开窗口，并清除表单数据
		  $('#ut_window').window('open');

	  });
	  
	  //提交按键响应事件
	  $('#ut_submit').click(function(){
		  //将表单元素格式化为JSON
		  var formdata = $("#ut_form").serialize();

		  //表单验证不通过，提交失败
		  if(!$("#ut_form").form('validate'))
		  {
			  return $(this).form('validate');
		  }
		  
		  $.ajax({
			  url:'ummUserTypeController.do?addUserType',
			  data:formdata,
			  type:'POST',
			  success:function(data,status,xml)
			  {
				  if(xml.responseText == "true"){
					  $.messager.alert('提示','提交成功！','info');
					  $('#ut_window').window('close');
					  $('#ut_dg').datagrid('reload');
				  }
				  else if(xml.responseText == "false"){
					  $.messager.alert('提示','提交失败！','error');
				  }
			  },
			  error:function()
			  {
				  $.messager.alert('提示','提交失败！','error');
			  }
		  });
	  });
	  
	  //取消按键响应事件
	  $('#ut_cancel').click(function(){
		  //关闭窗口
		  $('#ut_window').window('close');
		  $('#ut_form').form('clear');
	  });
	  

	  //修改按键响应事件
	  $('#ut_alter').click(function()
	  {
		  var rows = $('#ut_dg').datagrid('getSelections');
		  
		  if(rows.length==1)
		  {
			 
			  //清空修改窗口的数据
			  $('#ut_form').form('clear');
			  
			  getRangeInfoNoAll();
			  //获取数据rows[0].ut_id
			  
			  $.ajax({
				  url:'ummUserTypeController.do?getUserTypeById',
				  data:{ut_id:rows[0].ut_id},
				  success:function(data,status,xml){
					  var obj = $.parseJSON(xml.responseText);
					  $('#ut_form').form('load',obj);
				  },
				  error:function(){}
			  });
			  $('#ut_title').text('修改');
			  $('#ut_window').window('open');
		  }
		  else if(rows.length>1)
		  {
			  $.messager.alert('提示','请选择一条记录进行修改！','info');
		  }
		  else
		  {
			  $.messager.alert('提示','请选择要修改的记录！','info');
		  }
		  
	  });
	
	
	  
	

	  //删除按键响应事件
	  $('#ut_delete').click(function()
	  {
		  //获取已选择的行
		  var rows = $('#ut_dg').datagrid('getSelections');
		  

			  
		  if(rows.length==0)
		  {
			  $.messager.alert('提示','请选择要删除的记录！','info');
		  }
		  else
		  {
			  //获取选中要删除的记录的id
			  var ids = [];
			  for(var i = 0 ;i < rows.length ; i++)
				  ids[i]=rows[i].ut_id;
			  
			  //弹出删除提示窗口
			  $.messager.confirm('询问', '是否确定删除所选择的记录?', function(r){
				    //确定则删除数据
				    if (r){

				    $.ajax({
				    	url:'ummUserTypeController.do?deleteUserType&ids='+ids,
				    	async:false,
				    	type:'POST',
				    	
				    	success:function(data,status,xml){
			    			$.messager.alert('提示',xml.responseText,'info');
				    		$('#ut_dg').datagrid('reload');
				    		$('#ut_dg').datagrid('unselectAll');
				    		
				    	},
				    	error:function(){
				    		$.messager.alert('提示','删除失败','error');
				    	}
				    });
				    
					}
				});
		  }
	  });

	  
	  
	/*导出功能响应事件Start*/
	  $('#ut_export').click(function(){
		  url = "ummUserTypeController.do?UserTypedcExcelOrPDF&type="+ typeBackup +"&range="+ rangeBackup;
		  openReportDialog(url);
	  });
	 
	/*导出功能响应事件End*/
	

	
	var initdata = [];
	$('#ut_dg').datagrid({
		data:initdata,
		onDblClickRow:function(rowIndex, rowData ){
			if(editable == false){
				return;//没有权限，直接返回
			}
			//清空修改窗口的数据
			  $('#ut_form').form('clear');
			  
			  getRangeInfoNoAll();
			  //获取数据rows[0].ut_id
			  
			  $.ajax({
				  url:'ummUserTypeController.do?getUserTypeById',
				  data:{ut_id:rowData.ut_id},
				  async:false,
				  success:function(data,status,xml){
					  var obj = $.parseJSON(xml.responseText);
					  $('#ut_form').form('load',obj);
				  },
				  error:function(){}
			  });
			  $('#ut_title').text('修改');
			  $('#ut_window').window('open');
		}
	});
	loadUserTypeRange();
	
	function loadUserTypeRange(){
		var type = $('#type').val();
		var range = $('#range').combobox('getValue');
		typeBackup = type;
		rangeBackup = range;
		var utUrl = 'ummUserTypeController.do?loadUserType&type='+type+'&range='+range;
		//获取所有角色信息
		$('#ut_dg').datagrid({
			loadFilter:pagerFilter,
			url:utUrl
		});
	}


	//查询按钮响应事件
    $('#ut_search').click(function(){
    	loadUserTypeRange();
    });
    

  //适用范围数据加载
	$('#range').combobox({
		onShowPanel:function(){
			//加载适用范围数据
			getRangeInfo();
		}
	});
	
	//获取适用范围数据
	function getRangeInfo(){
		$.ajax({
			url:'ummUserTypeController.do?getRangeInfo',
			success:function(data,status,xml){
				var obj = $.parseJSON(xml.responseText);

				$('#range').combobox('loadData',obj);
			}
		});
	}
	
	//加载新增或修改窗口适用范围下拉列表数据
	$('#ut_range').combobox({
		onShowPanel:function(){
			//加载适用范围数据
			getRangeInfoNoAll();
		}
	});
	
	
	//不含所有项的使用范围
	function getRangeInfoNoAll(){
		$.ajax({
			url:'ummUserTypeController.do?getRangeInfoNoAll',
			async:false,
			success:function(data,status,xml){
				var obj = $.parseJSON(xml.responseText);

				$('#ut_range').combobox('loadData',obj);
			}
		});
	}
    
	
  });
  