package com.glorisun.umm.service.impl;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import com.glorisun.umm.pojo.Range;
import com.glorisun.umm.pojo.Role;
import com.glorisun.umm.service.IUmmRoleService;

/**
 * 角色信息数据库操作类
 * 实现对数据库中角色信息的增删查改
 * @author Zero
 *
 */
@Service("ummRoleService")
public class UmmRoleServiceImpl implements IUmmRoleService{

	/**
	 * jdbcTemplate对象,用于操作数据库
	 */
	@Autowired
	JdbcTemplate jdbcTemplate;

	/**获取角色范围*/
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

	
	/**
	 * 获取所有指定code,name,范围的角色信息
	 */
	@SuppressWarnings("unchecked")
	@Override
	public String  loadRoleInfo(String roleCode, String roleName, String range) {
		//定义模糊查询角色信息的sql语句
		StringBuffer sql = new StringBuffer();
		sql.append("select rl.rl_id, rl.rl_code, rl.rl_name, rl.rl_orderSeq, ra.ra_name ");
		sql.append("from sy_Role AS rl INNER JOIN sy_Range AS ra ON ra.ut_range = rl.rl_range ");
		sql.append("WHERE  (rl.rl_range like '%"+range+"%' OR rl.rl_range like '%0%') ");
		sql.append("AND (rl.rl_name like '%"+roleName+"%') AND (rl.rl_code like '%"+roleCode+"%')");
		
		//执行sql语句
		List<Role> info = new ArrayList<Role>();
		info = jdbcTemplate.query(sql.toString(), new RowMapper() {
			public Object mapRow(ResultSet rs, int rowNum)
					throws SQLException {

				// 创建rl对象
				Role rl = new Role();
				rl.setRl_id(rs.getString("rl_id"));
				rl.setRl_code(rs.getString("rl_code"));
				rl.setRl_orderSeq(rs.getInt("rl_orderSeq"));
		        rl.setRl_name(rs.getString("rl_name"));
		        rl.setRl_range(rs.getString("ra_name"));
		       
				return rl;
				
			}
		} );
		
		JSONArray json = new JSONArray();
		json.addAll(info);
		return json.toString();
	}


	/**获取适用范围*/
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


	/**验证代码有效性*/
	@Override
	public String validataCode(int id, String code) {
		//获取代码为code的角色数量
		String sql = "SELECT COUNT(*) FROM sy_Role WHERE rl_code = '"+ code+"'";

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
			
			sql = "SELECT rl_id FROM sy_Role WHERE rl_code = '"+ code+"'";
			int ID = (Integer) jdbcTemplate.queryForObject(sql,java.lang.Integer.class);
			if(ID == id)
			{
				return "true";
			}
			else
				return "false";
		}

	}


	/**验证角色名称*/
	@Override
	public String validataName(int id, String name) {
		//获取代码为name的角色数量
		String sql = "SELECT COUNT(*) FROM sy_Role WHERE rl_name = '"+ name+"'";

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

			sql = "SELECT rl_id FROM sy_Role WHERE rl_name = '"+ name+"'";
			int ID = (Integer) jdbcTemplate.queryForObject(sql,java.lang.Integer.class);
			if(ID == id)
			{
				return "true";
			}
			else
				return "false";
		}

	}


	/**保存角色数据*/
	@Override
	public String saveRoleInfo(Role role) {
		if(Integer.parseInt(role.getRl_id()) == -1) //新增事件
		{
			//定义新增角色的sql语句
			String sql = "INSERT INTO sy_Role VALUES(?,?,?,?,?)";
			
			//获取当前角色的最大id ,并+1
			int maxId = getMaxRoleId() + 1;
			//执行sql
			int rows = jdbcTemplate.update(sql, new Object[]{maxId, role.getRl_code(),role.getRl_name(),
					Integer.parseInt(role.getRl_range()),role.getRl_orderSeq()});
			
			if(rows == 1)
			   return "true";
			else
			   return "false";
		}
		else if(Integer.parseInt(role.getRl_id()) != -1)
		{
			//定义修改 角色的sql语句
			String sql = "update sy_Role set rl_code = ?, rl_name = ?, rl_range = ?, rl_orderSeq = ? WHERE rl_id = ?";
			//执行sql
			int rows = jdbcTemplate.update(sql, new Object[]{role.getRl_code(), role.getRl_name(),
					Integer.parseInt(role.getRl_range()),role.getRl_orderSeq(), Integer.parseInt(role.getRl_id())});
			
			if(rows == 1)
				   return "true";
				else
				   return "false";
		}
		return "false";
	}


	/**
	 * 获取当前角色的最大id
	 * @return
	 */
	private int getMaxRoleId() {
		//定义获取角色的最大id
		String sql = "SELECT MAX(rl_id) FROM sy_Role";
		
		//获取最大id
		String id = (String) jdbcTemplate.queryForObject(sql, java.lang.String.class);
		
		if(id == null )
		{
			return 0;
		}
		else
		{
			return Integer.parseInt(id);
		}
		
	}


	@Override
	public String getRole(int id) {

		//定义获取指定id的角色的sql语句
		String sql = "SELECT * FROM sy_Role WHERE rl_id = "+id;
		//执行
		Role role = (Role) jdbcTemplate.queryForObject(sql, new RowMapper() {
			public Object mapRow(ResultSet rs, int rowNum)
					throws SQLException {

				// 创建rl对象
				Role rl = new Role();
				rl.setRl_id(rs.getString("rl_id"));
				rl.setRl_code(rs.getString("rl_code"));
				rl.setRl_name(rs.getString("rl_name"));
				rl.setRl_orderSeq(rs.getInt("rl_orderSeq"));
				rl.setRl_range(rs.getString("rl_range"));
				return rl;
				
			}
		});
		JSONObject jsonObject = JSONObject.fromObject(role);
		return jsonObject.toString();
	}


	@Override
	public String delRole(String idArray) {
		if (idArray == null) {
			return "删除失败";
		}
		//分割id数组
		String ids[] = idArray.split(",");
		
		for(String id : ids)
		{
			delSimpleRole(Integer.parseInt(id));
		}

		return "删除成功";
	}


	/**
	 * 删除指定的角色
	 * @param id
	 */
	private void delSimpleRole(int id) {
		//外键删除
		String sql1 = "DELETE FROM sy_RoleFunc WHERE rl_id = "+id;
		jdbcTemplate.update(sql1);
		String sql2 = "DELETE FROM sy_RoleAuth WHERE rl_id = "+id; 
		jdbcTemplate.update(sql2);
		String sql = "DELETE FROM sy_Role WHERE rl_id = " + id;
		jdbcTemplate.update(sql);
		
		
	}


	@SuppressWarnings("unchecked")
	@Override
	public List<Role> getRole(String code, String name, String range) {
		//定义模糊查询角色信息的sql语句
				StringBuffer sql = new StringBuffer();
				sql.append("select rl.rl_id, rl.rl_code, rl.rl_name, rl.rl_orderSeq, ra.ra_name ");
				sql.append("from sy_Role AS rl INNER JOIN sy_Range AS ra ON ra.ut_range = rl.rl_range ");
				sql.append("WHERE  (rl.rl_range like '%"+range+"%' OR rl.rl_range like '%0%') ");
				sql.append("AND (rl.rl_name like '%"+name+"%') AND (rl.rl_code like '%"+code+"%')");
				
				//执行sql语句
				List<Role> info = new ArrayList<Role>();
				info = jdbcTemplate.query(sql.toString(), new RowMapper() {
					public Object mapRow(ResultSet rs, int rowNum)
							throws SQLException {

						// 创建rl对象
						Role rl = new Role();
						rl.setRl_id(rs.getString("rl_id"));
						rl.setRl_code(rs.getString("rl_code"));
						rl.setRl_orderSeq(rs.getInt("rl_orderSeq"));
				        rl.setRl_name(rs.getString("rl_name"));
				        rl.setRl_range(rs.getString("ra_name"));
				       
						return rl;
						
					}
				} );
				
				return info;
	}
	
}
