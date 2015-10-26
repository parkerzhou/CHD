$.extend($.fn.validatebox.defaults.rules, {
	loginCode: {
//		param 参数集合
		validator: function (value, param) {
			if (value.length < param[0] && value.length > 0) {
				$.fn.validatebox.defaults.rules.loginCode.message= 'RL+3位数字';			
				return false;
			} 
			else { 
				var reg = /^RL\d{3}$/;

				if (!reg.test(value) || parseInt(value.substring(2)) < 0 
						|| parseInt(value.substring(2)) > 32767) {
					$.fn.validatebox.defaults.rules.loginCode.message 
					= 'RL+3位数字';
					return false;
				} 
				
				else {
					var postdata = {};
					if (param[3]) {
						postdata[param[2]] = param[3];
					} else {
						postdata[param[2]] = value;
					}
                    
					var result = false;
					$.ajax({
						url: param[1],
						data: {code:value,
							   id:param[2]},
						type: 'post',
						async:false,
						success:function(data,status,xml){

							if(xml.responseText == "true")
							{
								$.fn.validatebox.defaults.rules.loginCode.message = '角色代码可注册！';
								result = true;
							}
							else if(xml.responseText == "false")
							{
								$.fn.validatebox.defaults.rules.loginCode.message = '角色代码已存在！';
								result =  false;
							}
						}
					});
					return result;
				}
				
			}
		},
		message: ''}
,
loginName: {
//	param 参数集合
	validator: function (value, param) {
		if (value.length > param[3]) {
			$.fn.validatebox.defaults.rules.loginName.message= '必填项';
			return false;
		}
		if (value.length < param[0]) {
			$.fn.validatebox.defaults.rules.loginName.message= '必填项';
			return false;
		} else { 

				var result = false;
				$.ajax({
					url: param[1],
					data: {name:value,
						   id:param[2]},
					type: 'post',
					async:false,
					success:function(data,status,xml){

						if(xml.responseText == "true")
						{
							$.fn.validatebox.defaults.rules.loginName.message = '角色名称可注册！';
							result = true;
						}
						else
						{
							$.fn.validatebox.defaults.rules.loginName.message = '角色名称已存在！';
							result =  false;
						}
					}
				});
				return result;			
		}
	},
	message: ''}
,
validateSort: {
//	param 参数集合
	validator: function (value, param) {
			var reg = /\d{1,5}$/;

			if (!reg.test(value) || parseInt(value) < 0 
					|| parseInt(value) > 32767) {
				$.fn.validatebox.defaults.rules.validateSort.message 
				= '排序号只能在0-32767！';
				return false;
			} 
			else
				return true;
	},
	message: ''}
,
loginType: {
//	param 参数集合
	validator: function (value, param) {
		if (value.length > param[3]) {
			$.fn.validatebox.defaults.rules.loginType.message= '用户类型至多有' + param[3] 
			+ '位数！';
			return false;
		}
		if (value.length < param[0]) {
			$.fn.validatebox.defaults.rules.loginType.message= '用户类型至少要' + param[0] 
			+ '位数！';
			return false;
		} 
		else { 

			var postdata = {};
			if (param[3]) {
				postdata[param[2]] = param[3];
			} else {
				postdata[param[2]] = value;
			}

			var result = false;
			$.ajax({
				url: param[1],
				data: {
					type:value,
					id:param[2]},
				type: 'post',
				async:false,
				success:function(data,status,xml){

					if(xml.responseText == "true")
					{
						$.fn.validatebox.defaults.rules.loginType.message = '用户类型可注册！';
						result = true;
					}
					else
					{
						$.fn.validatebox.defaults.rules.loginType.message = '用户类型已存在！';
						result =  false;
					}
				}
			});
			return result;
		}
	},
	message: ''}
});
