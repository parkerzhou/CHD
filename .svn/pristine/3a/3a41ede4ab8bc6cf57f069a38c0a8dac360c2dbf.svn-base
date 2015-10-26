package com.glorisun.umm.comm;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.glorisun.umm.pojo.UserType;

public class UserTypeRowMapper implements RowMapper {

	@Override
	public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
		
		//创建userType对象
		UserType userType=new UserType();
				
		//使用rs结果集的数据设置userType的数据
		userType.setUt_id(new Integer(rs.getInt("ut_id")));
		userType.setUt_type(rs.getString("ut_type"));
		userType.setUt_range(rs.getString("ra_name"));
				
		//返回userType
		return userType;

	}

}
