package com.glorisun.chd.service;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;

public interface RoleManageService {
	
	/**查询系统角色服务*/
	public String queryAllRole();
	
	/**查询datagrid数据title服务*/
	public String queryDataGridTitle(int roleId);
	
	/**查询功能服务*/
	public String queryFunction(int roleId);
	
	/**提交事件处理服务
	 * @throws UnsupportedEncodingException */
	public void submitOpt(HttpServletRequest request) throws UnsupportedEncodingException;
	
}
