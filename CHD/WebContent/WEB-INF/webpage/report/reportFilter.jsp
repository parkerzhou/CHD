<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@include file="../base/basePath.jsp"%>
<!DOCTYPE html>
<html>
<base href="<%=basePath%>" />
<head>
<%
	pageContext.setAttribute(
			"filterMap",
			session.getAttribute("filterMap"
					+ request.getAttribute("fuid")));
%>
<title>报表查询</title>
<t:base type="jquery,easyui,tools,DatePicker"></t:base>

</head>
<body>
	<t:formvalid formid="reportForm${fuid}" dialog="true"
		usePlugin="password" layout="table"
		action="reportController.do?queryReport&fuid=${fuid}">
		<div class="fitem">
			<div region="center" style="padding:1px;">
				<t:repFilter fuId="${fuid }" mapFilter="${filterMap}"></t:repFilter>
			</div>
		</div>
	</t:formvalid>
</body>