package com.glorisun.chd.core.util;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

public class DataBaseHelper {
	public static int getTableMaxId(JdbcTemplate jdbcTemplate,String sql){
		SqlRowSet rs=jdbcTemplate.queryForRowSet(sql);
		if(rs.last()){
			rs.first();
			return rs.getInt(1)+1;
		}
		return 1;	
	}
}
