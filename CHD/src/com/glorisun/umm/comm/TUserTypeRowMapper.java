package com.glorisun.umm.comm;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.glorisun.umm.pojo.TUserType;

public class TUserTypeRowMapper implements RowMapper {
	public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
		TUserType userType=new TUserType();
		userType.setUt_type(rs.getString("ut_type"));
		return userType;
	}
}
