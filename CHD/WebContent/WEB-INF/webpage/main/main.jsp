<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@include file="../base/basePath.jsp"%>
<!DOCTYPE html >
<meta http-equiv="X-UA-Compatible" content="IE=EDGE">

<html>
<head>
<title>常宏CRM系统</title>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>
<link rel="shortcut icon" href="images/favicon.ico">
<style type="text/css">
a {
	color: Black;
	text-decoration: none;
}

a:hover {
	color: black;
	text-decoration: none;
}
</style>
<script type="text/javascript">

	 $(function() {
		if($ {user.iniLog} == 0 ){
			openwindow('修改密码','UmmModiPwdController.do?loadModiPwd','',400,200);
			
		}
		
		
		$('#layout_east_calendar').calendar({
			fit : true,
			current : new Date(),
			border : false,
			onSelect : function(date) {
				$(this).calendar('moveTo', new Date());
			}
		});

	});
</script>
</head>
<body class="easyui-layout" style="overflow-y: hidden" scroll="no">
	<!-- 顶部-->
	<div region="north" border="false" title="常宏CRM系统"
		style="BACKGROUND: #FFFFFF; height: 70px; padding: 1px; overflow: hidden;">
		<table width="100%" border="0" cellpadding="0" cellspacing="0">
			<tr>
				<td align="left" style="vertical-align: text-bottom"><img
					src="images/chcrm_top.png" style="width: 800px;"> 
				</td>
				<td align="right" nowrap>
					<table>
						<tr>
							<td valign="top" height="50">
								<span style="color: #CC33FF">当前用户名:</span><span
								style="color: #666633">${user.userName}</span>
							</td>
						</tr>
						<tr>
						<td>
							<div style="position: absolute; right: 0px; bottom: 0px;">
								<a href="javascript:void(0);" class="easyui-menubutton"
									menu="#popMenu" iconCls="icon-tip">控制面板</a>
							</div>
							<div id="popMenu"
								style="width: 100px; display: none;">
								<div onclick="openwindow('用户信息','commController.do?userInfo','',220,120)">
									个人信息</div>
 								<div onclick="openwindow('修改密码','UmmModiPwdController.do?loadModiPwd','',400,200)">
									修改密码</div> 
								<div class="menu-sep"></div>
								<div onclick="exit('loginController.do?login_main','确定退出该系统吗 ?',1);">
									退出系统</div>									
							</div>
						</td>
						</tr>
					</table>
				</td>
				<td align="right">&nbsp;&nbsp;&nbsp;</td>
			</tr>
		</table>
	</div>
	<!-- 左侧-->
	<div region="west" split="true" href="loginController.do?left"
		title="导航菜单" style="width: 250px; padding: 1px;"></div>
	<!-- 中间-->
	<div id="mainPanle" region="center" style="overflow: hidden;">
		<div id="maintabs" class="easyui-tabs" fit="true" border="false">
		</div> 
	</div>
	<!-- 底部 -->
	<div region="south" border="false"
		style="height: 25px; overflow: hidden;background: #D2E0F2">
		<div align="center" style="color: #0099FF; padding-top: 2px;">
<!-- 		<div>
			<a href="portal/ebpsM001Action_getFooterInfo.do?type=1"
				target="_blank">联系方式</a> | <a
				href="portal/ebpsM001Action_getFooterInfo.do?type=2"
				target="_blank">法律公告</a> | <a
				href="portal/ebpsM001Action_getFooterInfo.do?type=3"
				target="_blank">隐私保护</a> | <span>技术支持：</span> | <a
				href="portal/ebpsM001Action_getFooterInfo.do?type=3"
				target="_blank">关于我们</a>
		</div> -->
		&copy; 版权所有 <span>XXX公司</span>
		</div>		
	</div>

</body>
</html>