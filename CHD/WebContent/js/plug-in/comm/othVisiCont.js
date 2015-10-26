function addOthVisiCont(){
	var custCmptext = $('#custVisiForm #custCmptext').val().split('-')[2];
	var custName = $('#custVisiForm #custName');
//	alert(custCmptext+','+custName.val());
	$.chcrm.openCommDialog('contacts',true,function(val){
		var contacts = [];
		var cv_id = $('#custVisiForm #cv_id').val();
		if(val.length>=1){
			for(var key in val){
				var contact = {}
				contact.ve_confCont = val[key].ct_id;
				contact.de_id = val[key].deptId;
				contacts.push(contact);
			}
			contacts = JSON.stringify(contacts);
			$.ajax({
				type:'POST',
				url:'visiController.do?addOthVisiCont&cv_id='+cv_id+'&contacts='+contacts,
				dataType:'text',
				success:function(data,status,xml){
					data=eval('('+data+')');
					if(data.success){
						$('#othVisiContDg').datagrid('reload');
						$.messager.alert('提示',data.msg,'info');
					}else{
						$.messager.alert('提示',data.msg,'error');
					}
				},
				error:function(XMLHttpRequest,textStatus,errorThrown){
					
				}
			});
		}
	},custName.val(),custCmptext);
}

function delOthVisiCont(){
	var rows = $('#othVisiContDg').datagrid('getSelections');
	if(rows.length==0){
		$.messager.alert('提示','请选择要删除的记录！','info');
		return false;
	}
	if(rows.length>=1){
		$.messager.confirm('提示','是否确定删除所选择的记录？',function(r){
			if(r){
				var vc_ids = [];
				for(var key in rows){
					vc_ids.push(rows[key].vc_id);
				}
				$.ajax({
					type:'POST',
					url:'visiController.do?delOthVisiCont&vc_ids='+vc_ids,
					dataType:'text',
					success:function(data,status,xml){
						$('#othVisiContDg').datagrid('reload');
						$('#othVisiContDg').datagrid('uncheckAll');
						$.messager.alert('提示',data,'info');
					},
					error:function(XMLHttpRequest,textStatus,errorThrown){
						
					}
				});
			}
		});
	}
}