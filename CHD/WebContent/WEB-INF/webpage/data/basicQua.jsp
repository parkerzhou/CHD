<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>公司资质资料</title>
</head>
<body>
<div id="quaSelDlg" class="easyui-dialog" title="公司资质资料" style="width:400px;height:200px;"   
        data-options="resizable:true,modal:true,closed:true,maximizable:true,minimizable:true"  >   
      <form id="basicQuaForm" method="post" style="padding:35px" >   
      <table>
      <tr>
        <td><label for="LINE_NO">序&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</label></td><td>:</td>   
        <td><input class="easyui-validatebox" type="text" name="LINE_NO" required=true missingMessage="序号必须填写！"  /></td>   
      </tr>
      <tr>
        <td><label for="D_NAME">资质名称</label></td><td>:</td>   
        <td><input class="easyui-validatebox" type="text" name="D_NAME" required=true missingMessage="资质名称必须填写！" /></td> 
      </tr>
      <tr>
       <td><input type="hidden"  name="NICK" ></td>
       <td><input type="hidden" name="CMPQUAL_SEQ" ></td>
       <td><input type="hidden" name="D_TYPE" value="1" ></td>
      </tr>
      <tr>
       <td><a href="#" onclick="quaSumbit()" class="easyui-linkbutton" data-options="iconAlign:'right' ">提交</a>
      </tr>  
    </table>
</form>  
      


</div>




</body>
</html>