function returnBaseInfo(fuId){
		var c_id=$('#'+fuId).combobox('getValues');//获取下拉框选择的id
		var c_text=$('#'+fuId).combobox('getText');//获取下拉框选择的文本
		
		if(c_text==""){
			return null;
		}
		
		var index=c_text.indexOf(",");//判断是否为多选
		
		var rArray=[];
		
		
		if(index==-1){
			var rObject={};
			rObject.id=c_id[0];
			rObject.text=c_text;
			rArray.push(rObject);
			return JSON.stringify(rArray);
		}
		
		var texts=null;//存放用户的选择
		texts=c_text.split(','); 
		
		if(texts==null){
			return null;
		}
		
		for(var value in texts){
			var rObject={};
			rObject.id=c_id[value];
			rObject.text=texts[value];
			rArray.push(rObject);
		}
		
		return JSON.stringify(rArray);
	}