<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<style type="text/css">
	#panel label{
		display: inline-block;
		width:75px;
	}
	#panel{
		margin-left:60px;
		margin-top:20px;
	}
	#confirm_btn{
		margin-top:10px;
		margin-left:70px;
	}  
</style>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户密码修改</title>
	<%@ include file="../comm/comm_ui.jsp"%>
</head>
<body>
	<div id="ModiPwd_Panl" class="easyui-panel" title="" data-options="modal:true,
	   minimizable:false, resizable:false, maximizable:false, closable:false ,
	   draggable:false, collapsible:false"  style="width:360px; height:160px;left:250px;top:200px">
	   <form id="modipwd" method="post" action="#">
		   <div id="panel" >
			   <div>
				   <label>用户名:</label><panel style="margin-left:7px">${user.userName}</panel>
			   </div>	   
		  
			   <div>
				   <label>旧密码：</label>
				   <input  class="easyui-validatebox textbox"  type="password" name="user_oldpsw" id="old_psw" 
						       data-options="required:true"	validType="password"/>
			   </div>
		   
			   <div>
				   <label>新密码：</label>
				   <input  class="easyui-validatebox textbox"  type="password" name="user_newpsw" id="new_psw" 
						       data-options="required:true"	validType="password"/>
			   </div>
		   
			   <div>
				   <label>确认新密码：</label>
				   <input  class="easyui-validatebox textbox"  type="password" name="user_confirmpsw" id="confirm_psw" 
						       data-options="required:true"	validType="password"/>
			   </div>
		   		<br>
			   <div id="dlg-buttons" style="padding-left: 95px; padding-top: 10px;">
				   <a  href="#" class="easyui-linkbutton" onclick="submitForm()">确定</a>
	               <a  href="#" class="easyui-linkbutton" onclick="clearForm()">取消</a>
               </div>                       
		   </div>			   
	   </form>
	 </div>
			   
	<script type="text/javascript">	
    $(function(){

   	});
    
	
  //功能按键响应事件
    function submitForm(){
    	var formdata = $("#modipwd").serialize();
    	if(!$("#modipwd").form('validate'))
    	  {
    		if(!$("#old_psw").text('Validate'))
    		{ 
    			$("#old_psw").focus();
    		}
    		else if(!$("#new_psw").text('Validate'))
    		{ 
    			$("#new_psw").focus();
    		}
    		else if(!$("#confirm_psw").text('Validate'))
    		{ 
    			$("#confirm_psw").focus();
    		}
    	  }
    	else{
    	 $.ajax({
    		 url:'UmmModiPwdController.do?checkOldPwd',//检测旧密码
    	    	data:formdata,
    	    	type:'post',
    	    	dataType:'text',
    	    	success:function(result){
    	    		if(result==-1){
    	    			$.messager.alert('提示','旧密码错误，请重新输入！','error',function(){
    	    				$("#old_psw").focus();
    	    			});
    	    		}
     	    		else if(result==1){
                        if($('#new_psw').val()==$('#confirm_psw').val()){	//检测新密码与确认密码是否相等     	
                        	var tt=$('#new_psw').val().length;
                        	if(tt<6||tt>20)
                        	{	
                        		$.messager.alert("提示","密码长度不符合要求！",'error',function(){
                        			$("#new_psw").focus();
                        		});
                        	}
                        	else
                        	{  
                        		var cmplexity =getPwdScore($('#new_psw').val());//检测密码复杂度	    			
        	    			
	                            if(cmplexity>=11){ 
	        	    			$.ajax({
	        	    				 url:'UmmModiPwdController.do?modiPwd', //修改新密码
	        	    			    	data:formdata,
	        	    			    	type:'post',
	        	    			    	dataType:'text',
	        	    			    	success:function(data,status,xml){
	        	    			    		if(data==1){
	        	    			    			$.messager.alert('提示','修改密码成功,请记住新密码！','info',function(){
	        	    			    				$("#modipwd").form('clear');
	        	    			    				});
	        	    			    		}
	        	    			    		else{
	        	    			    			$.messager.alert('提示','修改密码失败！','error');
	        	    			    		}
	        	    			    	},
	        	    			 error:function(){
	        	    		    		$.messager.alert('提示','登录失败！','error');	
	        	    		    	}
	        	    			 });
        	    			}
        	    			else{
        	    				$.messager.alert('提示','密码复杂度不够！','error',function(){
        	    					$("new_psw").focus();
        	    					});
        	    			     }
                        		}
                        }
                        else{
                        	$.messager.alert('提示','确认新密码不一致,请重新输入！','error',function(){
                        		$("#new_psw").focus();
                        	});
                        }
    	    		}
    	    		
    	    	},
    	    	error:function(){
    	    		$.messager.alert('提示','修改失败！','error');
    	    	}
    	 
    	 });
    }
    	
    }    
  
	function clearForm(){
		$('#modipwd').form('clear');
	}
	
	
    function getPwdScore(pwd) {
    	intScore = 0;
    	if (pwd.match(/[a-z]/)) 
    	{
    		intScore = (intScore + 1)
    	}
    	if (pwd.match(/[A-Z]/))  
    	{
    		intScore = (intScore + 5)
    	} // NUMBERS
    	if (pwd.match(/\d+/))	{
    		intScore = (intScore + 5)
    	}
    	if (pwd.match(/(\d.*\d.*\d)/))	{
    		intScore = (intScore + 5)
    	} // SPECIAL CHAR
    	if (pwd.match(/[!,@#$%^&*?_~]/)){ //											{
    		intScore = (intScore + 5)
    	}
    	if (pwd.match(/([!,@#$%^&*?_~].*[!,@#$%^&*?_~])/))										
    	{
    		intScore = (intScore + 5)
    	} // COMBOS
    	if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/)) 
    	{
    		intScore = (intScore + 2)
    	}
    	if (pwd.match(/\d/) && pwd.match(/\D/)) 
    	{
    		intScore = (intScore + 2)
    	} 
    	if (pwd.match(/[a-z]/) && pwd.match(/[A-Z]/) && pwd.match(/\d/)
    			&& pwd.match(/[!,@#$%^&*?_~]/)) {
    		intScore = (intScore + 2)
    	}
    	return intScore;
    }  	
	</script>
</body>
</html>