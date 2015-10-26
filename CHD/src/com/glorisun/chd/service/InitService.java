package com.glorisun.chd.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import com.glorisun.chd.pojo.BsDBBuffer;
import com.glorisun.chd.pojo.FuncItem;
import com.glorisun.chd.pojo.ItemInfo;

/** 
*
* 项目名称：chcrm
* 类名称：InitService
* 类描述：
* 创建人：GuoYuCheng
* 创建时间：2014年3月7日 下午04:16:39
* 修改人：GuoYuCheng
* 修改时间：2014年3月7日 下午04:16:39
* 修改备注：
* @version
*
 */
public interface InitService {
	
	public void initDataDict();
	
	public Map<Integer, List<ItemInfo>> getOperCate();
	
	public String getEasyuiMenu(Map<Integer, FuncItem> map);

	
	
	
	//填充数据缓冲区(j=0为所有)
	public BsDBBuffer setBsDBBuffer(int j);
	
	
	public boolean login(HttpSession session,String userName,String passWord);
}
