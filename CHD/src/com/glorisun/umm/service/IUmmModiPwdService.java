package com.glorisun.umm.service;

public interface IUmmModiPwdService {
	/**
	 * 检测旧密码
	 * 
	 * @param id
	 *        用户ID
	 * @param user_pwd
	 *        用户旧密码
	 * @return int -1 错误; 1 正确
	 */
	public int checkoldpwd(int id,String user_pwd);//使用use表验证 旧密码
	
	/**
	 * 修改用户密码
	 * 
	 * @param id
	 *        用户ID
	 * @param user_pwd
	 *        用户密码
	 * @return int -1 错误; 1 正确
	 */	
	public int modifypwd(int id,String user_pwd);	      
	
	
	public int unifiedstatus(String user_name,String user_pwd);//统一身份验证
}
