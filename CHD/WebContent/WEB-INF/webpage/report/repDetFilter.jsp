<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.glorisun.chd.report.common.ReportConst"%>
<%@include file="../base/basePath.jsp"%>
<!DOCTYPE html>
<html>
<base href="<%=basePath%>" />
<%
	pageContext.setAttribute("fData",
			request.getAttribute(ReportConst.REPORT_FILTER_DET));
%>
<head>
<title>${fData.label}-选择</title>
<t:base type="jquery,easyui,tools"></t:base>

</head>
<body>
	<c:if test="${fData.operType==1}">
		<c:set var="buttonType" value="radio" />
	</c:if>
	<c:if test="${fData.operType==2}">
		<c:set var="buttonType" value="checkbox" />
	</c:if>
	<input id="chkType" name="chkType" type="hidden" value="${fData.operType}" >
	<div region="center" style="padding: 1px;">
	<table WIDTH="100%" border="0" cellpadding="3" cellspacing="3" id="select_table" >
	<c:forEach var="fis" items="${fData.filterItems}" varStatus="st">
		<c:if test="${st.index %3==0}">
		<tr>
		</c:if>
		<td style="width: 30%"><input type="${buttonType}" id="detItem${fis.value.dataSeq}" 
				name="detItem" value="${fis.key}:::${fis.value.dataValue}"
				<c:if test="${fis.value.selected}">
				checked="checked"	
				</c:if>
				>${fis.value.dataValue}
		</td>
		<c:if test="${st.index %3==2}">
		</tr>
		</c:if>
	</c:forEach>
	</table>
</div>
</body>