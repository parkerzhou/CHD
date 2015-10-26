package com.glorisun.umm.service.impl;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.glorisun.umm.comm.CompanyRowMapper;
import com.glorisun.umm.comm.TUserGrpRowMapper;
import com.glorisun.umm.comm.TUserStateRowMapper;
import com.glorisun.umm.comm.TUserTypeRowMapper;
import com.glorisun.umm.comm.UserRowMapper;
import com.glorisun.umm.pojo.Company;
import com.glorisun.umm.pojo.TUserDet;
import com.glorisun.umm.pojo.TUserGrp;
import com.glorisun.umm.pojo.TUserType;
import com.glorisun.umm.pojo.User;
import com.glorisun.umm.pojo.UserState;
import com.glorisun.umm.service.IUmmUserInfoService;
@Service("userInfoService")
public class UmmUserInfoServiceImpl implements IUmmUserInfoService{
	/*
	 *数据成员jdbcTemplate对象的定义 
	 */
	JdbcTemplate jdbcTemplate;
	/*
	 *jdbcTemplate对象的setter方法和getter方法 
	 */
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	//获取用户信息
	public List<User> getUserInfo(){
	//  定义sql语句
	//	String sql="select U.us_id,ug_name,us_userId,us_userName,us_nickName,us_email,us_mobileNo,ut_type,us_state,ud_telNo,ud_addr,ud_faxNo "
	//			+ "from sy_UserDet UD,sy_userType UT,sy_User U,sy_userGrp UG,sy_UserAssi UA where U.ut_id=UT.ut_id and UA.ug_id=UG.ug_id and UA.us_id=U.us_id and U.us_id=UD.us_id";
		String sql="select U.us_id,ug_name,us_userId,us_userName,us_nickName,us_email,us_mobileNo,ut_type,st_name,ud_telNo,ud_addr,ud_faxNo, C.cmp_name "
				+"from sy_User U left join sy_UserDet UD on U.us_id=UD.us_id "
				+"left join sy_UserState US on U.us_state=US.st_id "
				+"left join sy_userType UT on U.ut_id=UT.ut_id "
				+"left join sy_UserAssi UA on U.us_id=UA.us_id "
				+"left join sy_userGrp UG on UA.ug_id=UG.ug_id "
				+"left join company C on U.us_company=C.cmp_id "
				+"order by ug_name ";
		//使用jdbcTemplement.query()查询返回相应对象
		List<User> users = jdbcTemplate.query (sql , new UserRowMapper());
		//返回用户列表
		return users;
	}
	
	//根据查询条件返回用户信息
	public List<User> searchUserInfo(User user){
		String sql="select U.us_id,ug_name,us_userId,us_userName,us_nickName,us_email,us_mobileNo,ut_type,us_state,st_name,ud_telNo,ud_addr,ud_faxNo, C.cmp_name "
				+"from sy_userType UT,sy_User U left join sy_UserDet UD on U.us_id=UD.us_id "
				+"left join sy_UserState US on U.us_state=US.st_id "
				+"left join sy_UserAssi UA on U.us_id=UA.us_id "
				+"left join sy_userGrp UG on UA.ug_id=UG.ug_id "
				+"left join company C on U.us_company=C.cmp_id "
				+"where U.ut_id=UT.ut_id";
		if(!user.getUg_name().equals("所有"))
			sql+=" and ug_name = '"+user.getUg_name()+"'";
		if(!user.getUs_userId().equals(""))
			sql+=" and us_userId like '%"+user.getUs_userId()+"%'";
		if(!user.getUs_userName().equals(""))
			sql+=" and us_userName like '%"+user.getUs_userName()+"%'";
		if(!user.getUs_nickName().equals(""))
			sql+=" and us_nickName like '%"+user.getUs_nickName()+"%'";
		if(!user.getUt_type().equals("所有"))
			sql+=" and ut_type = '"+user.getUt_type()+"'";
		if(!user.getUs_state().equals("所有")) 
			sql+=" and st_name ='"+user.getUs_state()+"'";//状态
		sql+=" order by ug_name";
		List<User> users=jdbcTemplate.query(sql,new UserRowMapper());
		return users;
	}
	
	//将用户信息插入到数据库中
	public boolean addUserInfo(User user,TUserDet userDet,String ug_name,String ut_type){ 
		int us_state=jdbcTemplate.queryForInt("select st_id from sy_UserState where st_name='"+user.getUs_state()+"'");
		int ut_id=jdbcTemplate.queryForInt("select ut_id from sy_userType where ut_type='"+ut_type+"'");
		int us_id=jdbcTemplate.queryForInt("select max(us_id) from sy_User")+1;
		Integer us_company = null;
		if(!user.getUs_company().equals(null) && !user.getUs_company().trim().equals("")){
			us_company=jdbcTemplate.queryForInt("select cmp_id from company where cmp_name='"+user.getUs_company()+"'");
		}
		try{
			jdbcTemplate.update("insert into sy_User(us_id,us_userId,us_userName,us_nickName,us_userPwd,us_email,us_mobileNo,ut_id,us_state,us_dataFrom,us_defLanguage,us_company) "
					+ "values(?,?,?,?,?,?,?,?,?,?,?,?)", new Object[] {us_id,user.getUs_userId(),user.getUs_userName(),user.getUs_nickName(),
							user.getUs_userPwd(),user.getUs_email(),user.getUs_mobileNo(),ut_id,us_state,1,1,us_company});
			jdbcTemplate.update("insert into sy_UserDet(us_id,ud_telNo,ud_addr,ud_faxNo,ud_createDate) "
					+ "values(?,?,?,?,?)",new Object[]{us_id,userDet.getUd_telNo(),userDet.getUd_addr(),userDet.getUd_faxNo(),userDet.getUd_createDate() });
			int ug_id=jdbcTemplate.queryForInt("select ug_id from sy_UserGrp where ug_name='"+ug_name+"'");
			jdbcTemplate.update("insert into sy_UserAssi(ug_id,us_id) values(?,?)",new Object[]{ug_id,us_id});
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	//修改用户信息
	public boolean alterUserInfo(User user){
		int ut_id=jdbcTemplate.queryForInt("select ut_id from sy_userType where ut_type='"+user.getUt_type()+"'");
		int ug_id=jdbcTemplate.queryForInt("select ug_id from sy_UserGrp where ug_name='"+user.getUg_name()+"'");
		int us_state=jdbcTemplate.queryForInt("select st_id from sy_UserState where st_name='"+user.getUs_state()+"'");
		int us_company=jdbcTemplate.queryForInt("select cmp_id from company where cmp_name='"+user.getUs_company()+"'");
		try{
			jdbcTemplate.update("update sy_User set us_userId=? , us_userName=? , us_nickName=? , us_email=? , us_mobileNo=? , ut_id=? , us_state=?, us_company=?  where us_id=?", 
					new Object[] {user.getUs_userId(),user.getUs_userName(),user.getUs_nickName(),user.getUs_email(),user.getUs_mobileNo(),ut_id,us_state,us_company,user.getUs_id()});
			jdbcTemplate.update("update sy_UserDet set ud_telNo=? , ud_addr=? , ud_faxNo=? where us_id=?",new Object[]{user.getUd_telNo(),user.getUd_addr(),user.getUd_faxNo(),user.getUs_id()});
			int i=jdbcTemplate.update("update sy_UserAssi set ug_id=? where us_id=?",new Object[]{ug_id,user.getUs_id()});
			if(i!=1)
				jdbcTemplate.update("insert into sy_UserAssi(ug_id,us_id) values(?,?)",new Object[]{ug_id,user.getUs_id()});
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	//根据主键id删除用户信息
	public boolean deleteUserInfoById(Integer[] us_ids){
		try{
			for (int i=0;i<us_ids.length;i++){
				jdbcTemplate.update("delete from sy_UserDet where us_id='"+us_ids[i]+"'");
				jdbcTemplate.update("delete from sy_UserAssi where us_id='"+us_ids[i]+"'"); 
				jdbcTemplate.update("delete from sy_User where us_id='"+us_ids[i]+"'"); 
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	
	//获取用户群组名称
	public List<TUserGrp> getUserGrpName(){
		String sql="select ug_name from sy_userGrp";
		List<TUserGrp> userGrps = jdbcTemplate.query (sql , new TUserGrpRowMapper());
		return userGrps;
	}
	
	//获取用户类型
	public List<TUserType> getUserType(){
		String sql="select ut_type from sy_userType";
		List<TUserType> userTypes=jdbcTemplate.query (sql, new TUserTypeRowMapper());
		return userTypes;
	}
	//获取用户类型
	public List<UserState> getUserState(){
		String sql="select st_name from sy_UserState";
		List<UserState> userStates=jdbcTemplate.query (sql, new TUserStateRowMapper());
		return userStates;
	}
	//获取与用户类型相对应的用户群组
	public List<TUserGrp> getUserGrpNameByType(String ut_type){
		String sql="select ug_name from sy_userGrp where ug_range="
				+ "(select ut_range from sy_userType where ut_type='"+ut_type+"')";
		List<TUserGrp> userGrps = jdbcTemplate.query (sql , new TUserGrpRowMapper());
		return userGrps;
	}

	@Override
	public Integer getUgRange(String ugName) {
		String sql = "select ug_range from sy_userGrp where ug_name='" + ugName + "'";
		return jdbcTemplate.queryForInt(sql);
	}

	@Override
	public Integer getUtRange(String utType) {
		String sql = "select ut_range from sy_userType where ut_type='" + utType + "'";
		return jdbcTemplate.queryForInt(sql);
	}

	@Override
	public List<Company> getCompanys(){
		String sql = "select cmp_id, cmp_code, cmp_name from company";
		return jdbcTemplate.query (sql , new CompanyRowMapper());
	}

} 