package com.glorisun.umm.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.glorisun.chd.core.util.CodeUtil;
import com.glorisun.umm.service.IUmmModiPwdService;

@Service("ummModiPwdService")
public class UmmModiPwdServiceImpl implements IUmmModiPwdService {
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	
	// 检测旧密码
	@Override
	public int checkoldpwd(int id, String user_pwd) {
		user_pwd = CodeUtil.encodeByMD5(user_pwd);
		String sql = "SELECT count(*) FROM sy_User  WHERE us_Id = '" + id
				+ "' AND us_userPwd='" + user_pwd + "'";
		int i = jdbcTemplate.queryForInt(sql);
		if (i >= 1) {
			return 1;
		} else {
			return -1;
		}
	}

	// 修改用户密码
	@Override
	public int modifypwd(int id, String user_pwd) {
		String sSql = "";
		user_pwd = CodeUtil.encodeByMD5(user_pwd);
		sSql = "UPDATE sy_User set us_userPwd='" + user_pwd
				+ "' WHERE us_Id = '" + id + "'";
		int count = jdbcTemplate.update(sSql);
		if (count >= 1) {
			return 1;
		} else {
			return -1;
		}
	}
	
	@Override
	public int unifiedstatus(String user_name, String user_psw) {
		return 0;
	}

}
