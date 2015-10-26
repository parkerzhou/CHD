package com.glorisun.umm.service.impl;


import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import com.glorisun.chd.core.util.JSONHelper;
import com.glorisun.umm.pojo.UmmUserReplInfo;
import com.glorisun.umm.service.IUmmUserReplService;

@Service("iurs")
public class UmmUserReplServiceImpl implements IUmmUserReplService {

	@Autowired
	JdbcTemplate jdbcTemplate;
	
	/** 定义操作类型 */
	public static String OPT_TYPE_ADD = "0";// 新增
	public static String OPT_TYPE_EDIT = "1";// 修改
	
	
	//  查询函数。
	@Override
	public String searchUmmUserRepl(String ftime, String stime) {
		
		String sql = null;
		//查询分类的处理
		if(ftime.length() == 0 && stime.length() == 0)
		{
			sql = "select *from sy_UserRepl order by  ur_replDate";  // 两个时间都为空
		}else if(ftime.length() == 0 && stime.length() != 0)
		{
			stime = stime+" 23:59:59";
			sql = "select *from sy_UserRepl where ur_replDate <'"+stime+"'"; //  只有第二个时间
		}else if(ftime.length() != 0 && stime.length() == 0)
		{
			 ftime = ftime+" 0:0:0";
			sql = "select *from sy_UserRepl where ur_replDate >'"+ftime+"'";  // 只有第一个时间
		}else{
			ftime = ftime+" 0:0:0";
			stime = stime+" 23:59:59";
			 sql = "select *from sy_UserRepl where ur_replDate  between '"  // 两个时间都有
					+ ftime + "' and '" + stime + "'";
		}
			     
		return  changeData(sql);
	}
	
	// 执行查询的sql 语句  并将其转换成 相应的数据 
	private String changeData(String sql)
	{
		List<UmmUserReplInfo> uurInfoList = new ArrayList<UmmUserReplInfo>();
		
		SqlRowSet rs = null;
		
		rs = jdbcTemplate.queryForRowSet(sql);
		
		while(rs.next())
		{
			UmmUserReplInfo uurInfo = new UmmUserReplInfo();
			Map<String, Object> temp = new HashMap<String, Object>();
			
			uurInfo.setUr_id(rs.getString("ur_id"));// 表记录的id 
			temp = getUserName(rs.getInt(2));
			uurInfo.setUr_OperUserid(temp.get("us_userName").toString());//操作人的名字
			String opDate = rs.getDate(3).toLocaleString();
			String optime [] = opDate.split(":");
			uurInfo.setUr_opDate(optime[0]+":"+optime[1]);//操作时间
			temp = getUserName(rs.getInt(4));
			uurInfo.setUr_beRepl(temp.get("us_userName").toString());//旧用户名字
			uurInfo.setOldNickName(temp.get("us_nickName").toString());// 旧用户 nickname
			temp = getUserName(rs.getInt(5));
			uurInfo.setUr_replace(temp.get("us_userName").toString());// 新用户名字
			uurInfo.setNewNickName(temp.get("us_nickName").toString());// 新用户nickname
			uurInfo.setUr_replDate(rs.getDate(6).toString()); //  有效时间
			
			uurInfoList.add(uurInfo);
		}
		
		return JSONHelper.array2json(uurInfoList);
	}
	
	//  获取用户的名称 
	private Map<String, Object> getUserName(int id)
	{
		Map<String, Object>  userNameMap = new HashMap<String, Object>();
		String sql = "select us_userName,us_nickName from sy_User where us_id=" + id; 
	    List<Map<String, Object>> userList = jdbcTemplate.queryForList(sql);
		
	    if(!userList.isEmpty()){
	    	return  userList.get(0);
	    }else{
	    	userNameMap.put("us_userName", "该用户被删除");
			userNameMap.put("us_nickName", "该用户被删除");
			return userNameMap;
	    }
    

	}
	
	
	@Override
	// 新增时获取用户的信息
	public List<Map<String, Object>> getOldUserName() {
		
		// 查询相应的id 和名字 给下拉框
		String sql = "select   us_id,  us_nickName ,us_userName  from sy_User";
		List<Map<String, Object>> resultList = jdbcTemplate.queryForList(sql);
		return resultList;
		
	}
	
	
	
	
	// 插入记录的时获取合适的ID		
		private int getReplMaxId() {
			int urId = 0;
			// 分析表 一 获取的的合适Id
			SqlRowSet rs1 = jdbcTemplate
					.queryForRowSet("SELECT ur_id FROM sy_UserRepl ORDER BY ur_id DESC");
			if (rs1.last()) {
				rs1.first();
				// 获取客户最大ID,加上客户ID增量,自动生成下一个客户的id
				return urId = (rs1.getInt(1) + 1);
			} else {
				return urId = 1;
			}

		}
		
		//  新增或是修改 
		@Override
		public String addOrEditRepl(UmmUserReplInfo uurInfo, String optType) {

			if(optType.equals("0"))
			{
				String checekSql = "select *from sy_UserRepl where ur_beRepl = "+uurInfo.getOldUserId() +" and ur_replace = "+uurInfo.getNewUserId()+" ";
				
				List<Map<String, Object>> checkList = jdbcTemplate.queryForList(checekSql); // 判断插入的记录 在表里是否存在了
				
				
				if(checkList.size()>=1)
				{
					String message = "你插入的记录已存在!error";
					return  message;
				}else{
					int urId = getReplMaxId();
					//System.out.println(uurInfo.getUr_OperUserid()+uurInfo.getOldUserId()+uurInfo.getNewUserId()+uurInfo.getUr_replDate());
					Object [] addObj = new Object[]{urId,uurInfo.getUr_OperUserid(),new Date(),uurInfo.getOldUserId(),uurInfo.getNewUserId(),uurInfo.getUr_replDate()};
					
				    String sql = "insert into sy_UserRepl (ur_id,ur_OperUserid,ur_optDate,ur_beRepl,ur_replace,ur_replDate) values(?,?,?,?,?,?)";
				    
				    try {
				    	jdbcTemplate.update(sql, addObj);
				    	String message = "提交成功!info";
				    	return message;
				    	
					} catch (Exception e) {
						e.printStackTrace();
						String message = "提交失败!error";
				    	return message;
					}
		    
				}
				
			
				
			}
			
			if(optType.equals("1"))
			{
				
				String checekSql = "select *from sy_UserRepl where ur_beRepl = "+uurInfo.getOldUserId() +" and ur_replace = "+uurInfo.getNewUserId()+" and ur_id != "+ uurInfo.getUr_id();
				
				List<Map<String, Object>> checkList = jdbcTemplate.queryForList(checekSql); // 判断修改的记录 在表里是否存在了
				
				if(checkList.size()>=1)
				{
					String message = "你修改的记录的记录已存在，请找该记录做修改!error";
					return  message;
				}else{
					
					Object [] updateObj = new Object[] {uurInfo.getUr_OperUserid(),new Date(),uurInfo.getOldUserId(),uurInfo.getNewUserId(),uurInfo.getUr_replDate(),uurInfo.getUr_id()};
			         String sql = " update sy_UserRepl set ur_OperUserid=?,ur_optDate=?, ur_beRepl=?, ur_replace=?, ur_replDate=? where ur_id=?";
				
			         try {
			        	 jdbcTemplate.update(sql, updateObj);
			        	 String message = "提交成功!info";
					    	return message;
					} catch (Exception e) {
						e.printStackTrace();
						String message = "提交失败!error";
				    	return message;
					}
			       
				}
				
				
			}
			
			return null;

		}
		
		//  删除函数
		@Override
		public boolean deleateRepl(int urId) {

			String sql = "delete from sy_UserRepl where ur_id=" + urId;
			try {
				jdbcTemplate.update(sql);
				return true;
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
			
		}
	

}
