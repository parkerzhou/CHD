function addOthVisiEmp(){
	$.chcrm.openCommDialog('personal',true,function(val){
		var ve_confEmps = [];
		var cv_id = $('#custVisiForm #cv_id').val();
		if(val.length>=1){
			for(var key in val){
				ve_confEmps.push(val[key].id);
			}
			$.ajax({
				type:'POST',
				url:'visiController.do?addOthVisiEmp&cv_id='+cv_id+'&ve_confEmps='+ve_confEmps,
				dataType:'text',
				success:function(data,status,xml){
					data = eval('('+data+')');
					if(data.success){
						$('#othVisiEmpDg').datagrid('reload');
						$.messager.alert('提示',data.msg,'info');
					}else{
						$.messager.alert('提示',data.msg,'error');
					}
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					
				}
			});
		}
	});
}

function delOthVisiEmp(){
	var rows = $('#othVisiEmpDg').datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要删除的记录！','info');
		return false;
	}
	if(rows.length>=1){
		$.messager.confirm('提示','是否确定删除所选择的记录？',function(r){
			if(r){
				var ve_ids = [];
				for(var key in rows){
					ve_ids.push(rows[key].ve_id);
				}
				$.ajax({
					type:'POST',
					url:'visiController.do?delOthVisiEmp&ve_ids='+ve_ids,
					dataType:'text',
					success:function(data,status,xml){
						$('#othVisiEmpDg').datagrid('reload');
						$('#othVisiEmpDg').datagrid('uncheckAll');
						$.messager.alert('提示',data,'info');
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){
						
					}
				});
			}
		});
	}
}