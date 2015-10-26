package com.glorisun.umm.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.sql.rowset.serial.SerialClob;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import com.glorisun.chd.core.util.JSONHelper;
import com.glorisun.chd.pojo.ComBoxInfo;
import com.glorisun.umm.pojo.UmmRoleGrpInfo;
import com.glorisun.umm.service.IUmmRoleGrpService;

@Service("ummRoleGrpService")
public class UmmRoleGrpServiceImpl implements IUmmRoleGrpService {


	@Autowired
	JdbcTemplate jdbcTemplate;
	
	/** 删除客户信息后提示语句 */
	public static String ERROR_MESSAGE = "删除失败!";
	public static String SUCCESS_MESSAGE = "删除成功";
	
	/** 定义操作类型 */
	public static String OPT_TYPE_ADD = "0";// 新增
	public static String OPT_TYPE_EDIT = "1";// 修改
	
	/** 取得数据表的最大ID */
	private int queryMaxId(String sql) {
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sql);
		if (rs.last()) {
			rs.first();
			return rs.getInt(1) + 1;
		}
		return 1;
	}
	
	@Override
	public String loadForm(String roleGrpOptType,String userGrpId) {
		// TODO Auto-generated method stub
		UmmRoleGrpInfo ummRoleGrpInfo = new UmmRoleGrpInfo();
		if(roleGrpOptType.equals(OPT_TYPE_ADD)) {
			String userGrpOrderSeq = queryMaxId("select max(ug_orderSeq) from sy_userGrp")+"";
			ummRoleGrpInfo.setUserGrpCode("UG");
			ummRoleGrpInfo.setUserGrpOrderseq(userGrpOrderSeq);
			ummRoleGrpInfo.setUserGrpRange(0+"");
			return JSONHelper.bean2json(ummRoleGrpInfo);
		} else if(roleGrpOptType.equals(OPT_TYPE_EDIT)) {
			String sql = "select ug.ug_code,ug.ug_name,ug.ug_orderSeq,ug.ug_range from sy_userGrp as ug,sy_Range as ra where ug.ug_id="+userGrpId;
			SqlRowSet rs = jdbcTemplate.queryForRowSet(sql);
			while (rs.next()) {
				ummRoleGrpInfo.setUserGrpId(Integer.parseInt(userGrpId));
				ummRoleGrpInfo.setUserGrpCode(rs.getString("ug_code"));
				ummRoleGrpInfo.setUserGrpName(rs.getString("ug_name"));
				ummRoleGrpInfo.setUserGrpOrderseq(rs.getString("ug_orderSeq"));
				ummRoleGrpInfo.setUserGrpRange(rs.getString("ug_range"));
			}
			return JSONHelper.bean2json(ummRoleGrpInfo);
		}
		return null;
	}

	@Override
	public String addorEditRoleGrp(UmmRoleGrpInfo ummRoleGrpInfo,
			String roleGrpOptType, int id) {
		// TODO Auto-generated method stub
		Object[] obj = new Object[] { ummRoleGrpInfo.getUserGrpCode(),ummRoleGrpInfo.getUserGrpName(),
				ummRoleGrpInfo.getUserGrpRange(),ummRoleGrpInfo.getUserGrpOrderseq(),ummRoleGrpInfo.getUserGrpId()};
		Object[] obj2 = new Object[] { ummRoleGrpInfo.getUserGrpCode(),ummRoleGrpInfo.getUserGrpName(),
				ummRoleGrpInfo.getUserGrpRange(),ummRoleGrpInfo.getUserGrpOrderseq(),queryMaxId("select max(ug_id) from sy_userGrp")};
		if (roleGrpOptType.equals(OPT_TYPE_ADD)) {// 执行新增
			try {
				jdbcTemplate.update("INSERT INTO sy_userGrp (ug_code,ug_name,ug_range,ug_orderSeq,ug_id) VALUES(?,?,?,?,?)", obj2);
				return "提交成功!info";
			}catch(DataAccessException e){
				e.printStackTrace();
				return "提交失败!error";
			}
		} else if (roleGrpOptType.equals(OPT_TYPE_EDIT)) {// 执行修改
			try {
				jdbcTemplate.update("UPDATE sy_userGrp SET ug_code=?,ug_name=?,ug_range=?,ug_orderSeq=? WHERE ug_id=?", obj);
				return "提交成功!info";
			}catch(DataAccessException e){
				e.printStackTrace();
				return "提交失败!error";
			}
		}
		return "提交失败!error";
	}
	
	@Override
	public String delRoleGrp(String idArray) {
		// TODO Auto-generated method stub
		System.out.println(idArray);
		if (idArray == null) {
			return ERROR_MESSAGE;
		}
		String[] arr = idArray.split(",");
		System.out.println(arr);
		for (String userGrpId : arr) {
			System.out.println(userGrpId+"and");
			if(!deleteRoleGrp(Integer.parseInt(userGrpId))){
				return ERROR_MESSAGE;
			}
		}
		return SUCCESS_MESSAGE;
	}
	
	/** 根据年度计划id删除年度计划信息 */
	private boolean deleteRoleGrp(int userGrpId) {
		// TODO Auto-generated method stub
		/** 删除用户 */
		int count = jdbcTemplate.update("delete from sy_UserAssi" + " where ug_id = ?",new Object[] { userGrpId });
		int count2 = jdbcTemplate.update( "delete from sy_RoleAuth" + " where ug_id = ?",new Object[] { userGrpId });
		int count3 = jdbcTemplate.update( "DELETE FROM sy_userGrp WHERE ug_id=?",new Object[] { userGrpId });
		if (count3 >= 1) {
			return true;
		} else {
			return false;
		}
	}
	
	@Override
	public String searchRoleGrp(String roleGrpCode, String roleGrpName,
			String roleGrpRange) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT ug_id,ug_code,ug_name,ug_orderSeq,ra_name");
		sb.append(" FROM sy_userGrp,sy_Range ");
		sb.append(" WHERE ug_range=ut_range");
		sb.append(" AND ug_code like '%" + roleGrpCode + "%'");
		sb.append(" AND ug_name like '%" + roleGrpName + "%'");
		if(!roleGrpRange.equals("-1")) {
			sb.append(" AND ug_range = " + roleGrpRange);
		}
		sb.append(" ORDER BY ug_orderSeq");
		// 返回json数据并返回
		return this.TraversalRoleGrp(sb.toString());
	}
	
	private String TraversalRoleGrp(String sql) {
		List<UmmRoleGrpInfo> ummRoleGrpInfoList = new ArrayList<UmmRoleGrpInfo>();
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sql);
		while (rs.next()) {
			UmmRoleGrpInfo ummRoleGrpInfo = new UmmRoleGrpInfo();
			ummRoleGrpInfo.setUserGrpCode(rs.getString("ug_code"));
			ummRoleGrpInfo.setUserGrpName(rs.getString("ug_name"));
			ummRoleGrpInfo.setUserGrpRange(rs.getString("ra_name"));
			ummRoleGrpInfo.setUserGrpOrderseq(rs.getString("ug_orderSeq"));
			ummRoleGrpInfo.setUserGrpId(rs.getInt("ug_id"));
			ummRoleGrpInfoList.add(ummRoleGrpInfo);
		}
		return JSONHelper.array2json(ummRoleGrpInfoList);
	}
	

	@Override
	public String queryRangeInfo(int search) {
		// TODO Auto-generated method stub
		String sql = "SELECT ut_range,ra_name FROM sy_Range";

		List<ComBoxInfo> cboxList = new ArrayList<ComBoxInfo>();

		SqlRowSet rs = jdbcTemplate.queryForRowSet(sql);
		if(search == 1) {
			ComBoxInfo comBoxInfo = new ComBoxInfo();
			comBoxInfo.setId(-1);
			comBoxInfo.setText("所有");
			cboxList.add(comBoxInfo);
		}
		while (rs.next()) {
			ComBoxInfo comBoxInfo = new ComBoxInfo();
			comBoxInfo.setId(rs.getInt(1));
			comBoxInfo.setText(rs.getString(2));
			cboxList.add(comBoxInfo);
		}	
		return JSONArray.fromObject(cboxList).toString();
	}
}
