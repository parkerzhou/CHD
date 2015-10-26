package com.glorisun.umm.service;

import java.util.List;
import java.util.Map;

import com.glorisun.umm.pojo.UmmUserReplInfo;

public interface IUmmUserReplService {
	
	/**
	 * 功能：查询功能
	 * 参数：为查询条件
	 * @param ftime  第一个时间
	 * @param stime  第二个时间
	 * @return
	 */
	public String searchUmmUserRepl(String ftime,String stime);
	
	
	// 下拉框通过输入用户id来获取用户星系	
	public List<Map<String,Object>> getOldUserName();
	
	/**
	 *  新增或是 修改 
	 * @param uurInfo
	 * @param optType
	 */
	public String addOrEditRepl(UmmUserReplInfo uurInfo,String optType);
	
	/**
	 *  删除函数 
	 * @param urId
	 * @return
	 */
	public boolean deleateRepl (int urId);
	
	 
}
