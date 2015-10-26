package com.glorisun.umm.comm;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.glorisun.umm.pojo.Company;

public class CompanyRowMapper implements RowMapper<Company>{

	public Company mapRow(ResultSet rs, int rowNum) throws SQLException {
		// 创建cmp对象
		Company cmp = new Company();
		// 使用rs结果集的数据设置cmp的数据
		cmp.setCmp_id(rs.getInt("cmp_id"));
		cmp.setCmp_code(rs.getString("cmp_code"));
		cmp.setCmp_name(rs.getString("cmp_name"));
		return cmp;
	}
}
