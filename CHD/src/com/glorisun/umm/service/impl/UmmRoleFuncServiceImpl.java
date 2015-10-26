package com.glorisun.umm.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.glorisun.umm.service.IUmmRoleFuncService;

@Service("ummRoleFuncService")
public class UmmRoleFuncServiceImpl implements IUmmRoleFuncService {

	private JdbcTemplate jdbcTemplate;

	/*
	 * getter and setter
	 */
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	// 获取所有角色。map中包含的字段：rl_id,rl_name,rl_code,rl_orderSeq
	@Override
	public List<Map<String, Object>> getAllRoles() {
		String sql = "select rl_id,rl_name,rl_code,rl_orderSeq from sy_Role";
		try {
			List<Map<String, Object>> resultList = jdbcTemplate
					.queryForList(sql);
			return resultList;
		} catch (Exception e) {
			// System.out.println("获取所有角色时出错！");
			// System.out.println("错误信息：" + e.getMessage());
			e.printStackTrace();
			return null;
		}
	}

	// 通过角色代码的前n个字符获取对应角色，map中包含的字段：rl_id,rl_name,rl_code
	@Override
	public List<Map<String, Object>> getSimilarRoles(Integer rlRange,
			String rlCodePrefix) {
		String sql = "select rl_id,rl_name,rl_code from sy_Role where (rl_range=0 OR rl_range="
				+ rlRange + ") and rl_code like '%" + rlCodePrefix + "%'";
		try {
			List<Map<String, Object>> resultList = jdbcTemplate
					.queryForList(sql);
			return resultList;
		} catch (Exception e) {
			// System.out.println("通过角色代码前缀检索角色时出错！");
			// System.out.println("错误信息：" + e.getMessage());
			e.printStackTrace();
			return null;
		}
	}

	// 获取适用范围内的所有功能。
	@Override
	public List<Map<String, Object>> getFuncsByRange(int rlRange) {
		String sqlGetFuncs = "select fu_id,fu_FuncCode,fu_FuncName,fu_range,oc_id,fu_orderSeq from sy_Function where (fu_range=0 or fu_range="
				/*+ rlRange + ") and fu_level!=1";*/
				+ rlRange + ") and fu_mainpage IS NOT NULL ";

		// 获取适用范围内的功能列表
		try {
			List<Map<String, Object>> funcsList = jdbcTemplate
					.queryForList(sqlGetFuncs);
			for (Map<String, Object> funcMap : funcsList) {

				// 获得oc_id功能对应的操作的ot_id集合
				List<Integer> otIds = this.getOtIdsByOcId((Integer) funcMap
						.get("oc_id"));

				// 匹配operList中otId对应的操作id，添加到功能中。
				for (Integer otId : otIds) {
					funcMap.put("" + otId, 1);
				}
			}
			Collections.sort(funcsList, new FuncSeqComparator());// 对功能列表进行排序。
			return funcsList;
		} catch (Exception e) {
			// System.out.println("通过角色适用范围获取功能列表时出错！");
			// System.out.println("错误信息：" + e.getMessage());
			e.printStackTrace();
			return null;
		}

	}

	// 根据角色id获取角色已授权的操作id，操作id对应的功能id。
	@Override
	public List<Map<String, Object>> getAuthedOperByRlId(int rlId) {
		String sql = "select fu_id,ot_id from sy_RoleFunc where rl_id=" + rlId;
		try {
			List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
			return list;
		} catch (Exception e) {
			// System.out.println("获取角色已授权的操作id和功能id时出错！");
			// System.out.println("错误信息：" + e.getMessage());
			e.printStackTrace();
			return null;
		}
	}

	// 通过操作代码获取操作id
	@Override
	public Integer getOtIdByOtCode(String otCode) {
		if (otCode.equals("edt")) {
			otCode = "edit";
		} else if (otCode.equals("del")) {
			otCode = "delete";
		} else if (otCode.equals("exp")) {
			otCode = "export";
		}
		String sql = "select ot_id from sy_Operation where ot_code='" + otCode
				+ "'";
		Integer otId = (Integer) jdbcTemplate
				.queryForObject(sql, Integer.class);
		return otId;
	}

	// 通过角色id获取已经有操作授权的功能的ID。
	@Override
	public List<Integer> getAuthedFuncsByRlId(Integer rlId) {
		String sql = "select fu_id from sy_RoleFunc where rl_id=" + rlId;
		try {
			List<Map<String, Object>> list = jdbcTemplate.queryForList(sql);
			List<Integer> fuList = new ArrayList<Integer>();
			for (Map<String, Object> map : list) {
				fuList.add((Integer) map.get("fu_id"));
			}
			return fuList;
		} catch (Exception e) {
			// System.out.println("通过角色id获取已经有操作授权的功能的ID时出错！");
			// System.out.println("错误信息：" + e.getMessage());
			e.printStackTrace();
			return null;
		}
	}

	// 通过角色id获取角色适用范围。
	@Override
	public Integer getRlRangeByRlId(Integer rlId) {
		String sql = "select rl_range from sy_Role where rl_id=" + rlId;
		Integer range = 0;
		try {
			range = jdbcTemplate.queryForInt(sql);
			return range;
		} catch (Exception e) {
			// System.out.println("通过角色id获取角色适用范围时出错！");
			// System.out.println("错误信息：" + e.getMessage());
			e.printStackTrace();
			return null;
		}

	}

	// 通过操作id获取操作代码和操作名称。
	@Override
	public Map<String, Object> getOperationByOtId(Integer otId) {
		String sql = "select ot_id,ot_name,ot_orderSeq from sy_Operation where ot_id="
				+ otId;
		try {
			Map<String, Object> oper = jdbcTemplate.queryForMap(sql);
			return oper;
		} catch (Exception e) {
			// System.out.println("通过操作id获取操作代码和操作名称时出错！");
			// System.out.println("错误信息：" + e.getMessage());
			e.printStackTrace();
			return null;
		}
	}

	// 通过操作id列表，获取列表中的所有操作id对应操作的属性
	@Override
	public List<Map<String, Object>> getOperationsByOtIds(List<Integer> otIds) {
		List<Map<String, Object>> opers = new ArrayList<Map<String, Object>>();
		for (Integer otId : otIds) {
			Map<String, Object> oper = this.getOperationByOtId(otId);
			opers.add(oper);
		}
		return opers;
	}

	// 获得oc_id功能对应的操作的ot_id集合
	@Override
	public List<Integer> getOtIdsByOcId(Integer ocId) {
		String sqlGetCate = "select ot_id from sy_OperRef where oc_id=" + ocId;
		try {
			List<Integer> otIds = jdbcTemplate.queryForList(sqlGetCate,
					Integer.class);
			return otIds;
		} catch (Exception e) {
			// System.out.println("在通过oc_id获取ot_id时发生了错误！");
			e.printStackTrace();
			return null;
		}

	}

	// 更新操作授权单个
	@Override
	public boolean updateRoleFunc(int rlId, int fuId, int otId)
			throws Exception {
		String sql = "insert into sy_RoleFunc values(" + rlId + "," + fuId
				+ "," + otId + ")";
		jdbcTemplate.update(sql);
		return true;
	}

	// 更新多个操作授权
	public boolean updateRoleFuncs(Integer aim, JSONArray funcAuths)
			throws Exception {
		/*
		 * 修改角色适用范围 if (!aim.equals(source)) { isUpdate =
		 * this.ummRoleFuncService.changeRoleRange(aim, sourceRange); } if
		 * (!isUpdate) { return new ModelAndView(new StringView(FAIL)); }
		 */
		this.cleanRoleFuncByRlId(aim);
		@SuppressWarnings("unchecked")
		Iterator<JSONObject> iter = funcAuths.iterator();
		while (iter.hasNext()) {
			JSONObject j = iter.next();
			this.updateRoleFunc(aim, j.getInt("fu_id"), j.getInt("ot_id"));

		}
		return true;
	}

	// 清除旧的授权记录
	@Override
	public boolean cleanRoleFuncByRlId(Integer rlId) throws Exception {
		String sql = "delete from sy_RoleFunc where rl_id=" + rlId;
		try {
			jdbcTemplate.update(sql);
			return true;
		} catch (Exception e) {
			// System.out.println("清理sy_RoleFunc表出错！");
			// System.out.println("错误信息：" + e.getMessage());
			e.printStackTrace();
			return false;
		}
	}

	// 修改角色适用范围
	@Override
	public boolean changeRoleRange(int rlId, int rlRange) throws Exception {
		String sql = "update sy_Role set rl_range=" + rlRange + " where rl_id="
				+ rlId;
		jdbcTemplate.update(sql);
		return true;
	}

	// 通过角色范围操作按钮列表
	public List<Map<String, Object>> getColumnsByRange(Integer rlRange) {
		List<Map<String, Object>> funcList = this.getFuncsByRange(rlRange);
		List<Integer> ocIds = new ArrayList<Integer>();// 存放该适用范围内，所有功能所拥有有的
														// 操作的id。
		List<Integer> otIds = new ArrayList<Integer>();
		for (Map<String, Object> map : funcList) {
			Integer ocId = (Integer) map.get("oc_id");
			if (!ocIds.contains(ocId)) {
				ocIds.add(ocId);
			}
		}
		for (Integer ocId : ocIds) {
			List<Integer> tempOtIds = this.getOtIdsByOcId(ocId);
			for (Integer otId : tempOtIds) {
				if (!otIds.contains(otId)) {
					otIds.add(otId);
				}
			}
		}

		List<Map<String, Object>> opers = this.getOperationsByOtIds(otIds);
		Collections.sort(opers, new OtSeqComparator());// 对操作进行排序。
		List<Map<String, Object>> columns = new ArrayList<Map<String, Object>>();

		Map<String, Object> funcSeq = new HashMap<String, Object>();
		funcSeq.put("field", "fu_orderSeq");
		funcSeq.put("title", "排序");
		funcSeq.put("width", 60);
		funcSeq.put("hidden", true);
		funcSeq.put("sortable", true);

		Map<String, Object> funcCode = new HashMap<String, Object>();
		funcCode.put("field", "fu_FuncCode");
		funcCode.put("title", "功能代码");
		funcCode.put("width", 60);

		Map<String, Object> funcName = new HashMap<String, Object>();
		funcName.put("field", "fu_FuncName");
		funcName.put("title", "功能名称");
		funcName.put("width", 80);

		columns.add(funcSeq);
		columns.add(funcCode);
		columns.add(funcName);

		for (Map<String, Object> oper : opers) {
			Map<String, Object> column = new HashMap<String, Object>();
			column.put("field", oper.get("ot_id").toString());
			column.put("title", oper.get("ot_name"));
			column.put("align", "center");
			column.put("width", 60);
			column.put("format", 1);
			columns.add(column);
		}
		return columns;
	}

	// 对操作进行排序
	private class OtSeqComparator implements Comparator<Map<String, Object>> {

		@Override
		public int compare(Map<String, Object> map0, Map<String, Object> map1) {
			int flag = ((Integer) map0.get("ot_orderSeq"))
					.compareTo((Integer) map1.get("ot_orderSeq"));
			if (flag == 0) {
				return ((Integer) map0.get("ot_id")).compareTo((Integer) map1
						.get("ot_id"));
			} else {
				return flag;
			}
		}

	}

	// 对功能列表进行排序
	private class FuncSeqComparator implements Comparator<Map<String, Object>> {

		@Override
		public int compare(Map<String, Object> map0, Map<String, Object> map1) {
			int flag = ((Integer) map0.get("fu_orderSeq"))
					.compareTo((Integer) map1.get("fu_orderSeq"));
			if (flag == 0) {
				return ((Integer) map0.get("fu_id")).compareTo((Integer) map1
						.get("fu_id"));
			} else {
				return flag;
			}
		}

	}
}
