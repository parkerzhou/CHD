$
		.extend(
				$.fn.validatebox.defaults.rules,
				{
					idcard : {// 验证身份证
						validator : function(value) {
							return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
						},
						message : '身份证号码格式不正确'
					},
					minLength : {
						validator : function(value, param) {
							return value.length >= param[0];
						},
						message : '请输入至少（2）个字符.'
					},
					length : {
						validator : function(value, param) {
							var len = $.trim(value).length;
							return len >= param[0] && len <= param[1];
						},
						message : "输入内容长度必须介于{0}和{1}之间."
					},
					phone : {// 验证电话号码
						validator : function(value) {
							return /^((\d{3,5}-)?\d{3,5}-\d{7,8}(-\d{1,5})?|(13|14|15|17|18)\d{9})$/i
									.test(value);
						},
						message : '请使用正确的电话、手机号码'
					},
					mobile : {// 验证手机号码
						validator : function(value) {
							return /^(13|15|17|18)\d{9}$/i.test(value);
						},
						message : '手机号码格式不正确'
					},
					intOrFloat : {// 验证整数或小数
						validator : function(value) {
							return /^-\d+(\.\d+)?$/i.test(value);
						},
						message : '请输入数字，并确保格式正确'
					},
					Float : {
						validator : function(value) {
							return /^-{0,1}\d{1,12}(\.\d{1,2})?$/i.test(value);
						},
						message : '格式不正确，整数位不能超过12位，小数位不能超过2位'
					},
					currency : {// 验证货币
						validator : function(value) {
							return /^\d+(\.\d+)?$/i.test(value);
						},
						message : '货币格式不正确'
					},
					sum : {
						validator : function(value) {
							return /^[+-]?\d{1,8}(\.\d{1,4})?$/i.test(value);
						},
						message : '小数位不可超过四位，整数位不可超过8位'
					},
					sumtwo : {
						validator : function(value) {
							return /^[+-]?\d{1,12}(\.\d{1,2})?$/i.test(value);
						},
						message : '小数位不可超过两位，整数位不可超过12位'
					},
					qq : {// 验证QQ,从10000开始
						validator : function(value) {
							return /^[1-9]\d{4,9}$/i.test(value);
						},
						message : 'QQ号码格式不正确'
					},
					integer : {// 验证整数 可正负数
						validator : function(value) {
							// return /^[+]?[1-9]+\d*$/i.test(value);
							return /^\d+$/i.test(value);
						},
						message : '请输入整数'
					},
					Integer : {// 验证整数 可正负数
						validator : function(value) {
							// return /^[+]?[1-9]+\d*$/i.test(value);
							if(/^\d{1,10}$/i.test(value)&&value>=0&&value<=2147483647){
								return true;
							}else{
								return false;
							}
						},
						message : '请输入整数，且整数值不能超过2147483647'
					},
					age : {// 验证年龄
						validator : function(value) {
							return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i
									.test(value);
						},
						message : '年龄必须是0到120之间的整数'
					},

					chinese : {// 验证中文
						validator : function(value) {
							return /^[\Α-\￥]+$/i.test(value);
						},
						message : '请输入中文'
					},
					english : {// 验证英语
						validator : function(value) {
							return /^[A-Za-z]+$/i.test(value);
						},
						message : '请输入英文'
					},
					unnormal : {// 验证是否包含空格和非法字符
						validator : function(value) {
							return /.+/i.test(value);
						},
						message : '输入值不能为空和包含其他非法字符'
					},
					username : {// 验证用户名
						validator : function(value) {
							return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
						},
						message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
					},
					faxno : {// 验证传真
						validator : function(value) {
							// return /^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[
							// ]){1,12})+$/i.test(value);
							return /^(\d{3,5}-)?\d{3,5}-(\d{7,8})$/i
									.test(value);
						},
						message : '传真号码不正确'
					},
					zip : {// 验证邮政编码
						validator : function(value) {
							return /^[1-9]\d{5}$/i.test(value);
						},
						message : '邮政编码格式不正确'
					},
					ip : {// 验证IP地址
						validator : function(value) {
							return /d+.d+.d+.d+/i.test(value);
						},
						message : 'IP地址格式不正确'
					},
					name : {// 验证姓名，可以是中文或英文
						validator : function(value) {
							return /^[\Α-\￥]+$/i.test(value)
									| /^\w+[\w\s]+\w+$/i.test(value);
						},
						message : '请输入姓名'
					},
					date : {// 验证姓名，可以是中文或英文
						validator : function(value) {
							// 格式yyyy-MM-dd或yyyy-M-d
							return /^(?:(?!0000)[0-9]{4}([-]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)([-]?)0?2\2(?:29))$/i
									.test(value);
						},
						message : '请输入合适的日期格式'
					},
					msn : {
						validator : function(value) {
							return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
									.test(value);
						},
						message : '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
					},
					same : {
						validator : function(value, param) {
							if ($("#" + param[0]).val() != "" && value != "") {
								return $("#" + param[0]).val() == value;
							} else {
								return true;
							}
						},
						message : '两次输入的密码不一致！'
					},
					website : {
						validator : function(_2c) {
							return /^((https?|ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
									.test(_2c);
						},
						message : "请输入有效的网址"
					},
					regFunds : {
						validator : function(value) {
							return /^[+-]?\d{1,12}(\.\d{1,2})?$/i.test(value);
						},
						message : '小数位不可超过2位，整数位不可超过12位'
					},
					Length : {
						validator : function(value, param) {
							if (value.length > param[0]) {
								$.fn.validatebox.defaults.rules.Length.message = '字符长度最多'
										+ param[0];
								return false;
							}
							return true;
						},
						message : ''
					},
					maxLength : {
						validator : function(value) {
							if (value.length > 8000) {
								$.fn.validatebox.defaults.rules.maxLength.message = '字符长度最多8000';
								return false;
							}
							return true;
						},
						message : ''
					},
					integerForDj : {// 验证整数 可正数
						validator : function(value) {
							if(value > 32767 || value < 0)
							{
								return false;
							}
							else
							{
								return /^[1-9]\d*$/i.test(value);
							}					
						},
						message : '请输入不大于32767的整数'
					},
					userGrpCode : {
						// param 参数集合
						validator : function(value, param) {
							//console.info(param[3]);
							if (value.length < param[0] && value.length > 0) {
								$.fn.validatebox.defaults.rules.userGrpCode.message = 'UG+3位数字';
								return false;
							} else {
								var reg = /^UG\d{3}$/;

								if (!reg.test(value)
										|| parseInt(value.substring(2)) < 0
										|| parseInt(value.substring(2)) > 32767) {
									$.fn.validatebox.defaults.rules.userGrpCode.message = 'UG+3位数字';
									return false;
								}

								else {
									var result = false;
									//console.info(param[3]);
									$.ajax({
												url : param[1],
												data: {code:value,roleGrpOptType:param[2],userGrpCode:param[3]},
												type : 'post',
												async : false,
												success : function(data,
														status, xml) {

													if (xml.responseText == "true") {
														$.fn.validatebox.defaults.rules.userGrpCode.message = '角色代码可注册！';
														result = true;
													} else if (xml.responseText == "false") {
														$.fn.validatebox.defaults.rules.userGrpCode.message = '角色代码已存在！';
														result = false;
													}
												}
											});
									return result;
								}

							}
						},
						message : ''
					},
					validateSort : {
						// param 参数集合
						validator : function(value,param) {
							var reg = /\d{1,5}$/;
							//console.info("enter")
							if (!reg.test(value) || parseInt(value) < 0
									|| parseInt(value) > 32767) {
								$.fn.validatebox.defaults.rules.validateSort.message = '排序号只能在0-32767！';
								return false;
							} else
								return true;
						},
						message : ''
					},
					deptName : {//验证部门名称
						// param 参数集合
						validator : function(value, param) {
							if(value.trim() == ''){
								$.fn.validatebox.defaults.rules.deptName.message = '不能为空格！';
								return false;
							}
							if(value.length > 80){
								$.fn.validatebox.defaults.rules.deptName.message = '输入内容长度必须介于1和80之间';
								return false;
							}
							var result;
							$.ajax({
								url : 'custController.do?validateDeptName',
								type : 'post',
								data: {deptName:value,ccId:param[0]},
								async : false,
								success : function(data, status, xml) {
									if (xml.responseText == "true") {
										result = true;
									} else if (xml.responseText == "false") {
										$.fn.validatebox.defaults.rules.deptName.message = '部门名称已存在！';
										result = false;
									}
								}
							});
							return result;
						},
						message : ''
					},
					custCmpName : {//验证客户公司名称
						// param 参数集合
						validator : function(value, params) {
							if(typeof String.prototype.trim !== 'function') {
								  String.prototype.trim = function() {
								    return this.replace(/^\s+|\s+$/g, ''); 
								  }
							}
							if(value.trim() == ''){
								$.fn.validatebox.defaults.rules.custCmpName.message = '不能为空格！';
								return false;
							}
							if(value.length > 80){
								$.fn.validatebox.defaults.rules.custCmpName.message = '输入内容长度必须介于1和80之间';
								return false;
							}
							var result;
							$.ajax({
								url : 'custController.do?validateCcName',
								type : 'post',
								data: {ccName:value, ccId:params[0]},
								async : false,
								success : function(data, status, xml) {
									if (xml.responseText == "true") {
										result = true;
									} else if (xml.responseText == "false") {
										$.fn.validatebox.defaults.rules.custCmpName.message = '客户公司名称已存在！';
										result = false;
									}
								}
							});
							return result;
						},
						message : ''
					},
					custCmpCode : {//验证客户公司名称
						// param 参数集合
						validator : function(value, params) {
							if(typeof String.prototype.trim !== 'function') {
								  String.prototype.trim = function() {
								    return this.replace(/^\s+|\s+$/g, ''); 
								  }
							}
							if(value.trim() == ''){
								$.fn.validatebox.defaults.rules.custCmpCode.message = '不能为空格！';
								return false;
							}
							if(value.length > 4){
								$.fn.validatebox.defaults.rules.custCmpCode.message = '输入内容长度必须介于1和4之间';
								return false;
							}
							
							var ccCode = params[0] + '-' + value;
							//console.info(ccCode);
							var result;
							$.ajax({
								url : 'custController.do?validateCcCode',
								type : 'post',
								data: {ccCode:ccCode, ccId:params[1]},
								async : false,
								success : function(data, status, xml) {
									if (xml.responseText == "true") {
										result = true;
									} else if (xml.responseText == "false") {
										$.fn.validatebox.defaults.rules.custCmpCode.message = '客户公司代码已存在！';
										result = false;
									}
								}
							});
							return result;
						},
						message : ''
					},
					oaAccNo : {//验证付款账号
						// param 参数集合
						validator : function(value) {
							if(typeof String.prototype.trim !== 'function') {
								  String.prototype.trim = function() {
								    return this.replace(/^\s+|\s+$/g, ''); 
								  }
							}
							if(value.trim() == ''){
								$.fn.validatebox.defaults.rules.oaAccNo.message = '不能为空格！';
								return false;
							}
							if(value.length > 60){
								$.fn.validatebox.defaults.rules.oaAccNo.message = '输入内容长度必须介于1和60之间';
								return false;
							}
							
							$.fn.validatebox.defaults.rules.oaAccNo.message = '请输入整数';
							return /^\d*$/i.test(value);
						},
						message : ''
					}
					
					
					
//					sameUserName: {  // 用户名是否重复
//				            validator: function(value){    
//				            	var olduser = $('#oldUserId').val();
//				            	var newuser = $('#newUserId').val();
//								//console.info(olduser.us_nickName);
//								// console.info(olduser.us_userName);
//				                 if (olduser == newuser) {   
//				                    return false;  
//				                 }else {  
//				                    return true;  
//				                 }    
//				            },   
//				            	             
//				            message: '用户名重复'   
//				        }
				});