package com.glorisun.umm.comm;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.glorisun.umm.pojo.UserState;

public class TUserStateRowMapper implements RowMapper {
	public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
		UserState userState=new UserState();
		userState.setState(rs.getString("st_name"));
		return userState;
	}
}
