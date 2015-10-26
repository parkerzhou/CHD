package com.glorisun.umm.service.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import com.glorisun.umm.pojo.Range;
import com.glorisun.umm.pojo.UserType;
import com.glorisun.umm.service.IUmmUserTypeService;
@Service("ummUserTypeService")
public class UmmUserTypeServiceImpl implements IUmmUserTypeService{

	/**
	 * jdbcTemplate对象,用于操作数据库
	 */
	@Autowired
	JdbcTemplate jdbcTemplate;
	


	@Override
	public String deleteUserType(String ids) {
		if(ids == null)
		{
			return "删除失败！";
		}
		String id[] = ids.split(",");
		
		List<String> utList = new ArrayList<String>();

		// 定义根据ids提供的角色id删除用户类型信息的SQL语句
		String sql = "DELETE FROM sy_userType WHERE ut_id = ?";

		// 删除外键
		String sql1 = "select us_id FROM sy_User WHERE ut_id = ?";

		// 循环变量
		int i;
		// 使用循环删除所有指定id的用户类型信息
		for (i = 0; i < id.length; i++) {
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> usList = jdbcTemplate.queryForList(sql1,
					new Object[] { Integer.parseInt(id[i]) });

			// 如果该用户类型有用户在使用，则跳过删除该用户类型，同时将该用户类型添加至List中返回。
			if (usList.size() != 0) {
				@SuppressWarnings("unchecked")
				List<Map<String, Object>> tList = jdbcTemplate
						.queryForList("select ut_type from sy_userType WHERE ut_id="
								+ id[i]);
				utList.add(tList.get(0).get("ut_type").toString());
				continue;
			}

			// id号存在则删除
			jdbcTemplate.update(sql, new Object[] { Integer.parseInt(id[i]) });
		}

		//rs=1，删除成功
		if(utList.equals(null)){
			return "删除时出现未知错误！请重试！";
		}
		
		if(utList.size() == 0){
			return "删除成功！";
		}
		else
		{
			String alert = "用户类型";
			for(String utType : utList){
				alert = alert + utType + "，";
			}
			alert = alert + "不能删除，因为用户类型下存在用户，请移除用户类型下的用户，再尝试删除。";
			return alert;
		}

	}
	
	
	
	//setter and getter
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	/**模糊查询用户类型*/
	@SuppressWarnings("unchecked")
	@Override
	public String loadUserType(String type, String range) {
		//定义模糊查询的sql语句
		StringBuffer sql = new StringBuffer();
		sql.append("SELECT ut.ut_id, ut.ut_type, ra.ra_name ");
		sql.append("FROM sy_UserType AS ut INNER JOIN sy_Range AS ra ON ut.ut_range = ra.ut_range ");
		sql.append("WHERE ut.ut_type LIKE '%"+type+"%' ");
		sql.append("AND ut.ut_range LIKE '%"+range+"%'");
		
		List<UserType> info = new ArrayList<UserType>();
		info = jdbcTemplate.query(sql.toString(), new RowMapper() {
			public Object mapRow(ResultSet rs, int rowNum)
					throws SQLException {

				// 创建ut对象
				UserType ut = new UserType();
				ut.setUt_id(rs.getInt("ut_id"));
				ut.setUt_type(rs.getString("ut_type"));
				ut.setUt_range(rs.getString("ra_name"));
				return ut;	
			}
		});
		
		JSONArray json = new JSONArray();
		json.addAll(info);
		return json.toString();
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getRangeInfo() {
		//定义获取角色范围的sql语句
				String sql = "SELECT ut_range, ra_name FROM sy_Range";
				
				//执行sql语句
				List<Range> info = new ArrayList<Range>();
				info = jdbcTemplate.query(sql,  new RowMapper() {
					public Object mapRow(ResultSet rs, int rowNum)
							throws SQLException {

						// 创建ra对象
						Range ra = new Range();
						ra.setId(rs.getString("ut_range"));
						ra.setText(rs.getString("ra_name"));
						return ra;
						
					}
				});
				Range ra = new Range();
				ra.setId("");
				ra.setText("所有");
				info.add(0, ra);
				
				JSONArray json = new JSONArray();
				json.addAll(info); 
				
				return json.toString();
				
	}

	@SuppressWarnings("unchecked")
	@Override
	public String getRangeInfoNoAll() {
		//定义获取角色范围的sql语句
		String sql = "SELECT ut_range, ra_name FROM sy_Range";
		
		//执行sql语句
		List<Range> info = new ArrayList<Range>();
		info = jdbcTemplate.query(sql,  new RowMapper() {
			public Object mapRow(ResultSet rs, int rowNum)
					throws SQLException {

				// 创建ra对象
				Range ra = new Range();
				ra.setId(rs.getString("ut_range"));
				ra.setText(rs.getString("ra_name"));
				return ra;
				
			}
		});

		
		JSONArray json = new JSONArray();
		json.addAll(info); 
		
		return json.toString();
	}

	@Override
	public String validateUserType(String type, int id) {
		//获取用户类型为type的角色数量
				String sql = "SELECT COUNT(*) FROM sy_userType WHERE ut_type = '"+ type+"'";

				//获取数量
				int counts = jdbcTemplate.queryForInt(sql);
				if(counts == 0)
				{
					return "true";
				}
				else
				{
					if(id == -1){
						return "false";
					}
					
					sql = "SELECT ut_id FROM sy_userType WHERE ut_type = '"+ type+"'";
					int ID = (Integer) jdbcTemplate.queryForObject(sql,java.lang.Integer.class);
					if(ID == id)
					{
						return "true";
					}
					else
						return "false";
				}
	}

	@Override
	public String addUserType(UserType ut) {
		if(ut.getUt_id() == -1)
		{
			int maxId = getMaxUserTypeId() + 1;
			//定义新增用户类型的sql语句
			String sql = "INSERT INTO sy_userType VALUES(?,?,?)";
			int rows = jdbcTemplate.update(sql,new Object[]{maxId,ut.getUt_type(),Integer.parseInt(ut.getUt_range())});
			if(rows == 1)
				   return "true";
				else
				   return "false";
		}
		if(ut.getUt_id() != -1)
		{
			//定义修改 角色的sql语句
			String sql = "update sy_userType set ut_type = ?, ut_range = ? WHERE ut_id = ?";
			//执行sql
			int rows = jdbcTemplate.update(sql, new Object[]{ut.getUt_type(),Integer.parseInt(ut.getUt_range()),ut.getUt_id()});
			
			if(rows == 1)
				   return "true";
				else
				   return "false";
		}
		return "false";
	}

	/**
	 * 获取用户类型最大id
	 * @return
	 */
	private int getMaxUserTypeId() {
		//定义获得最大用户类型id的SQL语句
		String sql = "SELECT MAX(ut_id) FROM sy_userType";
		
		//使用queryForObject()获得最大id字段
		String strId = (String) jdbcTemplate.queryForObject(sql, java.lang.String.class);
		
		if(strId == null)
		{
			return -1;
		}
		
		int maxId = Integer.parseInt(strId);
		
		return maxId;
	}

	@Override
	public String getUserTypeById(int ut_id) {
		//定义获取用户类型的sql
		String sql = "SELECT ut_id, ut_type,ut_range FROM sy_userType WHERE ut_id ="+ut_id;
		UserType ut = (UserType) jdbcTemplate.queryForObject(sql, new RowMapper() {
			public Object mapRow(ResultSet rs, int rowNum)
					throws SQLException {

				// 创建ra对象
				UserType ra = new UserType();
				ra.setUt_id(rs.getInt("ut_id"));
				ra.setUt_type(rs.getString("ut_type"));
				ra.setUt_range(rs.getString("ut_range"));
				return ra;
				
			}
		});
		JSONObject json = JSONObject.fromObject(ut);
		return json.toString();
	}



	@SuppressWarnings("unchecked")
	@Override
	public List<UserType> getUserType(String type, String range) {
		//定义模糊查询的sql语句
				StringBuffer sql = new StringBuffer();
				sql.append("SELECT ut.ut_id, ut.ut_type, ra.ra_name ");
				sql.append("FROM sy_UserType AS ut INNER JOIN sy_Range AS ra ON ut.ut_range = ra.ut_range ");
				sql.append("WHERE ut.ut_type LIKE '%"+type+"%' ");
				sql.append("AND ut.ut_range LIKE '%"+range+"%'");
				
				List<UserType> info = new ArrayList<UserType>();
				info = jdbcTemplate.query(sql.toString(), new RowMapper() {
					public Object mapRow(ResultSet rs, int rowNum)
							throws SQLException {

						// 创建ut对象
						UserType ut = new UserType();
						ut.setUt_id(rs.getInt("ut_id"));
						ut.setUt_type(rs.getString("ut_type"));
						ut.setUt_range(rs.getString("ra_name"));
						return ut;	
					}
				});
				

				return info;
	}
}
