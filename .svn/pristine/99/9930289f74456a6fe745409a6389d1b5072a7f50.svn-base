/*
 * modular:说明如下
 * (1)、必填参数
 * (2)、模块代码,不同代码打开不同模块对话框
 * (3)、modular常量值:
 * 		contacts、personal、dept、company、tradecode、area、region、cust、custComp、competitor、competitorComp
 * 
 * multiple:说明如下
 * (1)、必填参数
 * (2)、是否多选,设置打开的对话框中的数据列表是否可选择多条记录
 * 
 * callback:
 * (1)、必填参数
 * (2)、回调函数,用户自定义函数,
 * (3)、设置用户单击对话框的确定后的回调处理函数
 * (4)、封装外部调用取得公用模块返回值后的处理逻辑
 * 
 * extensionOne:说明如下
 * (1)、扩展参数
 * (2)、该参数可不填，默认为空
 * (3)、当调用联系人资料选择模块时,该参数可传递客户名称,
 * (4)、当调用客户公司资料选择时,该参数传可递客户名称,
 * (5)、当调用大区资料选择时,该参数可传递客户Id
 * 
 * extensionTwo:说明
 * (1)、扩展参数
 * (2)、该参数可不填，默认为空
 * (3)、当调用联系资料选择时,该参数可传递客户公司名称
 */
$.extend({
	chcrm : {}
});
$.extend($.chcrm,
		{
			multiple : false,
			callback : null,
			modular:'',
			theme : 0,
			extensionOne:'',
			extensionTwo:'',
			openCommDialog : function(modular, multiple, callback,
					extensionOne, extensionTwo) {
				this.modular=modular;
				this.multiple = multiple;
				this.callback = callback;
				this.extensionOne=extensionOne;
				this.extensionTwo=extensionTwo;
				if (extensionOne == null) {
					extensionOne = '';
				}
				if (extensionTwo == null) {
					extensionTwo = '';
				}
				if (modular == 'contacts') {
					if (multiple) {
						this.openDialog('联系人选择', 789, 494,
								'commController.do?callContactslPage');
					} else {
						this.openDialog('联系人选择', 789, 400,
								'commController.do?simpleContactslPage');
					}
				} else if (modular == 'personal') {
					if (multiple) {
						this.openDialog('员工选择', 865, 494,
								'commController.do?callPersonalPage');
					} else {
						this.openDialog('员工选择', 865, 400,
								'commController.do?simplePersonalPage');
					}
				} else if (modular == 'dept') {
					this.openDialog('部门选择', 690, 350,
							'commController.do?callDeptPage');
				} else if (modular == 'company') {
					this.openDialog('公司选择', 690, 350,
							'commController.do?callCompanyPage');
				} else if (modular == 'tradeCode') {
					this.openDialog('行业代码', 740, 350,
							'commController.do?calltradeCodePage');
				} else if (modular == 'area') {
					this.openDialog('区域选择', 700, 350,
							'commController.do?callAreaPage');
				} else if (modular == 'region') {
					this.openDialog('大区资料选择', 700, 350,
							'commController.do?callRegionPage');
				} else if (modular == 'cust') {
					this.openDialog('客户选择', 690, 350,
							'commController.do?callCustPage');
				} else if (modular == 'custComp') {
					this.openDialog('客户公司选择', 690, 350,
							'commController.do?callCustCompPage&cust='
									+ extensionOne);
				} else if (modular == 'competitor') {
					this.openDialog('竞争对手选择', 690, 350,
							'commController.do?callCompetitorPage');
				} else if (modular == 'competitorComp') {
					this.openDialog('竞争对手服务客户公司选择', 720, 350,
							'commController.do?callCompetitorCompPage');
				} else if (modular == 'visit') {
					this.openDialog('拜访记录选择', 790, 350,
							'commController.do?callVisitPage');
				} else {

				}
			},
			openExperienceContacts : function(theme, multiple, callback) {
				this.multiple = multiple;
				this.callback = callback;
				this.theme = theme;
				if (multiple) {
					this.openDialog('体验联系人资料选择', 789, 494,
							'commController.do?callExperienceContactslPage');
				} else {
					this.openDialog('体验联系人资料选择', 789, 400,
							'commController.do?simpleExperienceContactsPage');
				}
			},
			bindBtnClick : function bindBtnClick(btnElement, callback) {// 为按钮绑定事件
				btnElement.unbind('click')
				btnElement.click(callback);
			},
			openAndInitDialog : function(c_dialog, c_datagrid) {// 打开并初始化对话框数据
				c_dialog.dialog('open');
				// 设置单选或多选
				c_datagrid.datagrid({
					singleSelect : !this.multiple
				});
				// 清空数据列表
				c_datagrid.datagrid('loadData', {
					"total" : 0,
					"rows" : []
				});
				c_datagrid.datagrid({
					url : ''
				});
			},
			callRemoteData : function(el, d_url, d_data) {// 请求远程服务器数据,并填充datagrid
				$.ajax({
					url : d_url,
					type : 'POST',
					dataType : 'json',
					data : d_data,
					success : function(result) {
						el.datagrid('loadData', result);
					}
				});
			},
			openDialog : function(title, width, height, url) {
				var dlg = $('#dlg').dialog({
					title : title,
					width : width,
					height : height,
					href : url,
					modal : true,
					buttons : [ {
						text : '确定',
						iconCls : 'icon-ok',
						handler : function() {
							callback();
							dlg.dialog('close');
						}
					}, {
						text : '关闭',
						iconCls : 'icon-no',
						handler : function() {
							dlg.dialog('close');
						}
					} ],
					onLoad : function() {
						setMultiple($.chcrm.multiple);
						if($.chcrm.modular=='custComp'){
							setCustName($.chcrm.extensionOne);
						}else if($.chcrm.modular=='contacts'){
							setCustAndComp($.chcrm.extensionOne,$.chcrm.extensionTwo);
						}
					}
				});
			}
		});