package com.glorisun.umm.comm;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.glorisun.umm.pojo.TUserGrp;

public class TUserGrpRowMapper implements RowMapper {
	public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
		TUserGrp userGrp=new TUserGrp();
		userGrp.setUg_name(rs.getString("ug_name")); 
		return userGrp;
	}
}
