package com.glorisun.umm.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.glorisun.umm.service.IUmmRoleAuthService;

@Service("ummRoleAuthService")
public class UmmRoleAuthServiceImpl implements IUmmRoleAuthService {

	private JdbcTemplate jdbcTemplate;

	// getter and setter.
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	// 获取所有用户群组。
	@Override
	public List<Map<String, Object>> getAllUserGrps() {
		String sql = "select ug_id,ug_code,ug_name,ug_orderSeq,ug_range from sy_userGrp";
		try {
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> resultList = jdbcTemplate
					.queryForList(sql);
			return resultList;
		} catch (Exception e) {
			// System.out.println("获取所有用户群组出错！");
			e.printStackTrace();
			return null;
		}
	}

	// 通过群组id获取有权限的角色id。
	@Override
	public List<Integer> getRlIdByUgId(int ugId) {
		String sql = "select rl_id from sy_RoleAuth where ug_id=" + ugId;
		try {
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
			List<Integer> resultList = new ArrayList<Integer>();
			for (Map<String, Object> map : list) {
				Object obj = map.get("rl_id");
				if (obj instanceof Integer) {
					resultList.add((Integer) obj);
				}
			}
			return resultList;
		} catch (Exception e) {
			// System.out.println("通过群组id获取已授权角色出错！");
			e.printStackTrace();
			return null;
		}
	}

	// 获取适用范围内的角色。
	@Override
	public List<Map<String, Object>> getRoleByRange(int range) {
		String sql = "select * from sy_Role where rl_range=0 or rl_range="
				+ range;
		try {
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
			return list;
		} catch (Exception e) {
			// System.out.println("获取适用范围内的角色出错！");
			e.printStackTrace();
			return null;
		}
	}

	// 添加角色授权
	@Override
	public boolean addRoleAuth(int roleId, int userGrpId, int raUserId,
			java.sql.Timestamp raOptDate) throws Exception {
		String sql_getMaxId = "select max(ra_id) from sy_RoleAuth";
		int id = jdbcTemplate.queryForInt(sql_getMaxId) + 1;
		// System.out.println("The max id in sy_roleAuth is: " + id);
		String sql = "insert into sy_RoleAuth values " + "(" + id + ", "
				+ roleId + ", " + userGrpId + ", '" + raOptDate + "', "
				+ raUserId + ")";

		jdbcTemplate.update(sql);
		return true;

	}

	// 删除角色授权
	@Override
	public boolean deleteRoleAuth(int roleId, int userGrpId) throws Exception {
		String sql = "delete from sy_RoleAuth where rl_id=" + roleId + " and "
				+ "ug_id=" + userGrpId;
		jdbcTemplate.update(sql);
		return true;
	}

	// 删除指定用户所有角色授权
	@Override
	public boolean deleteRoleAuthByUgId(int userGrpId) throws Exception {
		String sql = "delete from sy_RoleAuth where ug_id=" + userGrpId;

		jdbcTemplate.update(sql);
		return true;

	}

	// 更新角色授权
	@Override
	public boolean updateRoleAuth(List<Integer> roleIds, int userGrpId,
			int raUserId, Timestamp raOptDate) throws Exception {
		// System.out.println("updating role auth......");
		boolean isUpdate = true;
		String sql = "select rl_id from sy_RoleAuth where ug_id=" + userGrpId;
		@SuppressWarnings("unchecked")
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
		List<Integer> rlIdList = new ArrayList<Integer>();
		for (Map<String, Object> map : list) {
			rlIdList.add(Integer.parseInt(map.get("rl_id").toString()));
		}
		// 对比原表中的项和将更新的项，将原表中多余的项删除。
		for (int originRoleId : rlIdList) {
			// System.out.println("now the originRoleId is: " + originRoleId);
			boolean hasThis = false;
			for (int roleId : roleIds) {
				if (originRoleId == roleId) {
					hasThis = true;
					break;
				}
			}
			if (!hasThis) {
				isUpdate = this.deleteRoleAuth(originRoleId, userGrpId);
				if (!isUpdate) {
					return isUpdate;
				}
			}
		}
		// 对比原表中的项和要更新的项，将要更新的项插入到表中。
		for (int roleId : roleIds) {
			boolean hasThis = false;
			for (int originRoleId : rlIdList) {
				if (roleId == originRoleId) {
					hasThis = true;
					break;
				}
			}
			if (!hasThis) {
				isUpdate = this.addRoleAuth(roleId, userGrpId, raUserId,
						raOptDate);
				if (!isUpdate) {
					return isUpdate;
				}
			}
		}
		
		return isUpdate;
	}

}
