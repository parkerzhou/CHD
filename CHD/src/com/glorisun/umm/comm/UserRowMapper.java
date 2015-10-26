package com.glorisun.umm.comm;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.glorisun.umm.pojo.User;

public class UserRowMapper implements RowMapper {
	public User mapRow(ResultSet rs, int rowNum) throws SQLException {
		
		//创建User对象
		User user=new User();
		//使用rs结果集的数据设置user的数据
		user.setUs_id(new Integer(rs.getInt("us_id")));
		user.setUs_userId(rs.getString("us_userId"));
		user.setUs_userName(rs.getString("us_userName"));
		user.setUs_nickName(rs.getString("us_nickName")); 
	//	user.setUs_userPwd(rs.getString("us_userPwd")); 
		user.setUs_email(rs.getString("us_email"));
		user.setUs_mobileNo(rs.getString("us_mobileNo"));
	//	user.setUt_id(new Integer(rs.getInt("ut_id")));

		user.setUs_state(rs.getString("st_name"));
	//	user.setUs_dataFrom(new Integer(rs.getInt("us_dataFrom")));
	//	user.setUs_defLanguage(new Integer(rs.getInt("us_defLanguage")));
		user.setUg_name(rs.getString("ug_name"));
		user.setUt_type(rs.getString("ut_type"));
		user.setUd_telNo(rs.getString("ud_telNo"));
		user.setUd_faxNo(rs.getString("ud_faxNo"));
		user.setUd_addr(rs.getString("ud_addr")); 
		return user;
	}
}
