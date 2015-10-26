package com.glorisun.chd.service.impl;

import java.io.UnsupportedEncodingException;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import com.glorisun.chd.pojo.DataGridInfo;
import com.glorisun.chd.pojo.ProcParamInfo;
import com.glorisun.chd.pojo.RoleInfo;
import com.glorisun.chd.service.RoleManageService;

@Service("roleManageService")
public class RoleManageServiceImpl implements RoleManageService {

	@Autowired
	@Qualifier("jdbcTemplate")
	private JdbcTemplate jdbcTemplate;

	@Override
	public String queryAllRole() {
		List<RoleInfo> roleList = new ArrayList<RoleInfo>();
		/*
		 * SqlRowSet rs = jdbcTemplate
		 * .queryForRowSet("select rl_id,rl_code,rl_name from sy_Role");
		 */
		SqlRowSet rs = jdbcTemplate
				.queryForRowSet("select bc_id,bc_assiCode,bc_cateInfo from ba_baseDeclCate");
		while (rs.next()) {
			RoleInfo roleInfo = new RoleInfo();
			roleInfo.setId(rs.getInt("bc_id"));
			roleInfo.setRoleName(rs.getString("bc_cateInfo"));
			roleInfo.setRoleCode(rs.getString("bc_assiCode"));
			roleList.add(roleInfo);
		}
		JSONArray json = JSONArray.fromObject(roleList);
		return json.toString();
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public String queryDataGridTitle(final int roleId) {

		final List<DataGridInfo> titleList = new ArrayList<DataGridInfo>();
		jdbcTemplate.execute(new CallableStatementCreator() {
			@Override
			public CallableStatement createCallableStatement(Connection con)
					throws SQLException {
				CallableStatement cs = con
						.prepareCall("{call P_GetRoleFuncList(?)}");

				cs.setInt(1, roleId);
				return cs;
			}
		}, new CallableStatementCallback() {

			@Override
			public Object doInCallableStatement(CallableStatement cs)
					throws SQLException, DataAccessException {
				// TODO Auto-generated method stub

				cs.execute();

				cs.getMoreResults();

				ResultSet rs = cs.getResultSet();

				while (rs.next()) {
					DataGridInfo dataGridInfo = new DataGridInfo();
					dataGridInfo.setF_align(rs.getString("field_align"));
					dataGridInfo.setF_butMapName(rs
							.getString("field_butMapName"));
					dataGridInfo.setF_editor(rs.getString("field_editor"));
					dataGridInfo.setF_gridTitle(rs.getString("field_gridTitle"));
					dataGridInfo.setF_hidden(rs.getBoolean("field_hidden"));
					dataGridInfo.setF_butid(rs.getInt("field_butid"));
					dataGridInfo.setF_width(rs.getInt("field_width"));
					titleList.add(dataGridInfo);
				}

				return null;
			}
		});

		JSONArray json = JSONArray.fromObject(titleList);
		return json.toString();
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public String queryFunction(final int roleId) {
		// TODO Auto-generated method stub
		final List<Map<String, Object>> contentList = new ArrayList<Map<String, Object>>();

		jdbcTemplate.execute(new CallableStatementCreator() {
			@Override
			public CallableStatement createCallableStatement(Connection con)
					throws SQLException {
				CallableStatement cs = con
						.prepareCall("{call P_GetRoleFuncList(?)}");

				cs.setInt(1, roleId);
				return cs;
			}
		}, new CallableStatementCallback() {

			@Override
			public Object doInCallableStatement(CallableStatement cs)
					throws SQLException, DataAccessException {
				// TODO Auto-generated method stub

				cs.execute();

				ResultSet rs = cs.getResultSet();

				while (rs.next()) {
					Map<String, Object> map = new HashMap<String, Object>();
					ResultSetMetaData mData = rs.getMetaData();
					for (int i = 1; i <= mData.getColumnCount(); i++) {

						if (mData.getColumnName(i).equals("fu_id")
								|| mData.getColumnName(i).equals("fu_FName")
								|| mData.getColumnName(i).equals("fu_FCode")) {
							map.put(mData.getColumnName(i),
									rs.getString(mData.getColumnName(i)));
						} else {
							if (rs.getString(mData.getColumnName(i))
									.equals("0")) {
								map.put(mData.getColumnName(i), "");
							} else if (rs.getString(mData.getColumnName(i))
									.equals("1")) {
								map.put(mData.getColumnName(i), "x");
							} else if (rs.getString(mData.getColumnName(i))
									.equals("2")) {
								map.put(mData.getColumnName(i), "v");
							}
						}
					}
					contentList.add(map);
				}

				return null;
			}
		});

		JSONArray json = JSONArray.fromObject(contentList);
		return json.toString();
	}

	@SuppressWarnings({ "rawtypes", "unused" })
	@Override
	public void submitOpt(HttpServletRequest request)
			throws UnsupportedEncodingException {
		// TODO Auto-generated method stub

		String param = request.getParameter("data");// 获取服务器端传递过来的数据

		/*
		 * String createSql =
		 * "CREATE TABLE FUNCTGION001(f_id INT NOT NULL,opt_id INT NOT NULL,r_id INT NOT NULL)"
		 * ; jdbcTemplate.execute(createSql);
		 */

		JSONObject json = JSONObject.fromObject(param);// 转化为JSONObject进行解析

		Iterator it = json.keys();// /获取key值，以便进行遍历

		boolean isDelete = false;

		while (it.hasNext()) {

			String funcId = (String) it.next();// 获取key值，对应为功能的id

			if (!isDelete) {
				jdbcTemplate.execute("delete from sy_RoleFunc where fu_id="
						+ Integer.parseInt(funcId));
				
				isDelete=true;
			}

			JSONArray ja = json.getJSONArray(funcId);// 获取每个功能的数据

			for (int i = 0; i < ja.size(); i++) {
				JSONObject obj = ja.getJSONObject(i);

				Iterator oit = obj.keys();

				String btnId = (String) oit.next();// 获取按钮id

				String btnValue = obj.getString(btnId);// 获取按钮的值

				if (btnValue.equals("v")) {// 如果btnValue的值为v，则表示按钮该功能的 按钮被授权
					jdbcTemplate
							.execute("insert into sy_RoleFunc (fu_id,ot_id,rl_id) values("
									+ Integer.parseInt(funcId)
									+ ","
									+ Integer.parseInt(btnId)
									+ ","
									+ Integer.parseInt(funcId) + ")");
				}
			}
		}

		/*
		 * String deleleSql="DROP TABLE FUNCTGION001";
		 * 
		 * jdbcTemplate.execute(createSql);
		 */

	}

	/**
	 * 调用存在过程,并返回多个结果集
	 * 
	 * @return List<ResultSet>
	 * @author zhangjinhong
	 * @param sqlProc调用存储过程的SQL语句
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public List<ResultSet> executeProcedure(final String sqlProc,
			final List<ProcParamInfo> plist) {
		List<ResultSet> resultList = (List<ResultSet>) jdbcTemplate.execute(
				new CallableStatementCreator() {
					public CallableStatement createCallableStatement(
							Connection con) throws SQLException {
						// String storedProc = "{call P_GetRoleFuncList(?)}";//
						// 调用的sql
						CallableStatement cs = con.prepareCall(sqlProc);

						if (plist != null) {
							for (ProcParamInfo ppi : plist) {
								if (ppi.isInput()) {
									if (ppi.isInteger()) {
										cs.setInt(ppi.getId(),
												ppi.getIntegerValue());
									} else {
										cs.setString(ppi.getId(),
												ppi.getStrValue());
									}
								} else {
									if (ppi.isInteger()) {
										cs.registerOutParameter(ppi.getId(),
												Types.INTEGER);
									} else {
										cs.registerOutParameter(ppi.getId(),
												Types.VARCHAR);
									}
								}
							}
						}

						cs.setInt(1, 1);// 设置输入参数的值

						// cs.registerOutParameter(2, Types.VARBINARY);//
						// 注册输出参数的类型

						return cs;
					}
				}, new CallableStatementCallback() {
					public Object doInCallableStatement(CallableStatement cs)
							throws SQLException, DataAccessException {

						List<ResultSet> results = new ArrayList<ResultSet>();

						boolean resultsAvailable = cs.execute();

						cs.getMoreResults();
						ResultSet rs = cs.getResultSet();

						while (rs.next()) {
							System.out.println(rs.getString(1));
						}

						/*
						 * while (resultsAvailable) { ResultSet rs =
						 * cs.getResultSet(); while (rs.next()) {
						 * System.out.println(rs .getString(1)); }
						 * results.add(cs.getResultSet()); resultsAvailable =
						 * cs.getMoreResults(); }
						 */
						return results;
					}
				});
		return resultList;
	}
}
