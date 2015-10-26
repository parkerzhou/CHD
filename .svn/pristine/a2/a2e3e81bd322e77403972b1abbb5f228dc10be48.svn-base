<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ page import="com.glorisun.chd.pojo.UserInfo" %>
    <%@ page import="com.glorisun.chd.core.def.Constant" %> 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
    	.ftitle{
        font-size:14px;
        font-weight:bold;
        padding:5px 0;
        margin-bottom:10px;
        border-bottom:1px solid #ccc;
    }
    </style>
    <title> </title>


</head>
<body>

	<div id="dlgAdd" class="easyui-dialog" style="width: 600px; height: 210px; text-align: left;" closed="true"
		closable="false" noheader="true">
		<div class="easyui-layout" data-options="fit:true">

			<div data-options="region:'north'" style="height: 70px; padding-left: 75px;" border="false">
				<br />
				<p align="left"><h3>用户替换管理_[新增]</h3>
					<hr />
				</div>
				<div data-options="region:'center'"
				style="height:100px;text-align: center" border="false">
					<form id="userReplForm" name="userRepl" method="post" class="form">
						<table id="addnew" align="center">
							<tr>
								<td>旧用户:</td>
								<td>
								<input id = "ur_id" name="ur_id" hidden="true"/> <!-- 记录的id 为了修改的时候用   -->
								<input id="oldUser" name="oldUser" class="easyui-combogrid" required="true" style="width: 150px"  editable="false"  validType="newUserName" /> <!--  是负责用来显示的  -->
								<input id="oldUserId" name="oldUserId" hidden="true"/>
								
								</td>
								<td>新用户:</td>
								<td>
								<input id="newUser" name="newUser" class="easyui-combogrid" required="true" style="width: 150px"  editable="false" validType="newUserName" />
								<input id="newUserId" name="newUserId" hidden="true"/>
							
								</td>
							</tr>
							<tr>
								<td>生效时间:</td>
								<td><input id="ur_replDate" name="ur_replDate" class="easyui-datetimebox" required missingMessage="必填项" style="width: 150px"  editable="false" ></td>
							</tr>
							<tr>
								
								<%
								    UserInfo userInfo=(UserInfo)(request.getSession().getAttribute(Constant.GB_SESSION_USERINFO));
								 	
									String optName = userInfo.getUserName();
									String optId = userInfo.getId()+"";
								     
								%>
								<td>操作人：</td>
								<td > 
								<input  id="optUserName"  type="text" name="optUserName"  style="border:0px;" value="<%=optName %> "  readOnly="true" /> 
								<input id="ur_OperUserid" name="ur_OperUserid" hidden="true" value="<%=optId %> " />
								</td> 
								<td>操作时间</td>
								<td>
								<input id="ur_opDate" name="ur_opDate" style="border:0px;"  readOnly="true"/>
								</td>
							</tr>
						</table>
					</form>		
				</div>
				<div data-options="region:'south'" id="add"
				style="text-align: right;height:40px;background:#eee;">
						<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" id="Submit" onclick="submitRepl()" >确认</a> 
					<a href="#" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" id="Cancel" onclick="javascript:$('#dlgAdd').dialog('close')">取消</a>
				</div>
		</div>
	</div>

</body>
</html>