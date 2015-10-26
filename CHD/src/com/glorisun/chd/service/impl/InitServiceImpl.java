package com.glorisun.chd.service.impl;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.core.util.CodeUtil;
import com.glorisun.chd.core.util.JdbcTemplateUtil;
import com.glorisun.chd.pojo.BsDBBuffer;
import com.glorisun.chd.pojo.FuncItem;
import com.glorisun.chd.pojo.ItemInfo;
import com.glorisun.chd.pojo.UserInfo;
import com.glorisun.chd.service.InitService;

@Service("initService")
public class InitServiceImpl implements InitService {

	@Autowired
	@Qualifier("jdbcTemplate")
	private JdbcTemplateUtil jdbcTemplate;

	@Override
	public String getEasyuiMenu(Map<Integer, FuncItem> map) {
		StringBuffer menuString = new StringBuffer();
		StringBuffer sf = new StringBuffer();
		String strUrl = "";
		String strIcon = "folder.png";
		sf.append(" SELECT fu_id, fu_FuncCode, fu_FuncName,(CASE WHEN fu_icon IS NULL  THEN 'folder' ELSE fu_icon END) AS fu_icon ,");
		sf.append("  fu_range, fu_orderSeq, fu_level, CONVERT(VARCHAR(8000),fu_url) AS fu_url,fu_FuncFrom,");
		sf.append("  ISNULL(fu_funcs,0) AS fu_funcs,fu_funcs,oc_id,");
		sf.append("  fu_mainPage,ISNULL(fu_ReferenceID,0) AS fu_ReferenceID ");
		sf.append(" FROM sy_Function a LEFT JOIN(SELECT pf_pid,count(pf_cid) AS fu_funcs FROM sy_parentFunc GROUP BY pf_pid) b ");
		sf.append(" ON a.fu_id=b.pf_pid ");
		sf.append(" WHERE fu_level=1 ");
		sf.append(" ORDER BY fu_orderSeq; ");

		SqlRowSet rs = jdbcTemplate.queryForRowSet(sf.toString());

		FuncItem funcItem = null;

		while (rs.next()) {
			strIcon = rs.getString("fu_icon");
			funcItem = new FuncItem();
			funcItem.setId(rs.getInt("fu_id"));
			funcItem.setFuncCode(rs.getString("fu_FuncCode"));
			funcItem.setFuncName(rs.getString("fu_FuncName"));

			funcItem.setFuncFrom(rs.getInt("fu_id"));
			funcItem.setIcon(strIcon);
			funcItem.setLevel(rs.getInt("fu_level"));
			funcItem.setOcId(rs.getInt("oc_id"));
			funcItem.setRange(rs.getInt("oc_id"));
			funcItem.setOrderSeq(rs.getInt("fu_orderSeq"));
			funcItem.setUrl(rs.getString("fu_url"));
			funcItem.setMainPage(rs.getString("fu_mainPage"));
			funcItem.setReferenceID(rs.getInt("fu_ReferenceID"));

			int submenusize = rs.getInt("fu_funcs");
			if (submenusize == 0) {

				if (strUrl != null && !("".equals(strUrl))) {
					menuString.append("<div onclick=\"addTab(\'"
							+ rs.getString("fu_FuncName") + "\',\'"
							+ rs.getString("fu_url") + "\',\'" + strIcon
							+ "\')\"  title=\"" + rs.getString("fu_FuncName")
							+ "\" url=\"" + rs.getString("fu_url")
							+ "\" iconCls=\"" + strIcon + "\"> <a class=\""
							+ rs.getString("fu_FuncName")
							+ "\" href=\"#\" > <span class=\"icon " + strIcon
							+ "\" >&nbsp;</span> <span class=\"nav\" >"
							+ rs.getString("fu_FuncName")
							+ "</span></a></div> ");
				}

			} else {
				menuString.append("<div  title=\""
						+ rs.getString("fu_FuncName") + "\" iconCls=\""
						+ strIcon + "\">");
				menuString.append("<ul>");
				menuString.append(getSubMenu(map, rs.getString("fu_id")));
				menuString.append("</ul></div>");
			}

			map.put(funcItem.getId(), funcItem);
		}

		return menuString.toString();

	}

	private String getSubMenu(Map<Integer, FuncItem> map, String fuid) {
		StringBuffer sf = new StringBuffer();
		String strIcon = "folder.png";
		String strUrl = "";

		sf.append(" SELECT fu_id, fu_FuncCode, fu_FuncName,(CASE WHEN fu_icon IS NULL  THEN (CASE WHEN fu_funcs>=1 THEN 'folder' ELSE 'pictures' END) ELSE fu_icon END) AS fu_icon ,");
		sf.append("  fu_range, fu_orderSeq, fu_level, CONVERT(VARCHAR(8000),fu_url) AS fu_url,fu_FuncFrom,");
		sf.append("  ISNULL(fu_funcs,0) AS fu_funcs,fu_funcs,oc_id,");
		sf.append("  fu_mainPage,ISNULL(fu_ReferenceID,0) AS fu_ReferenceID,");
		sf.append("  ISNULL(fu_servType,1 ) AS fu_servType, CONVERT(VARCHAR(8000),fu_servReso) AS fu_servReso ");
		sf.append(" FROM sy_Function a,(SELECT pf_cid FROM sy_parentFunc WHERE pf_pid="
				+ fuid + ") b ");
		sf.append(" LEFT JOIN(SELECT pf_pid,count(pf_cid) AS fu_funcs FROM sy_parentFunc GROUP BY pf_pid) c ");
		sf.append(" ON b.pf_cid=c.pf_pid ");
		sf.append(" WHERE  a.fu_id=b.pf_cid  AND a.fu_id NOT IN(108,109,110) ");
		sf.append(" ORDER BY fu_orderSeq; ");

		SqlRowSet rs = jdbcTemplate.queryForRowSet(sf.toString());

		FuncItem funcItem = null;
		sf.setLength(0);
		while (rs.next()) {
			strIcon = rs.getString("fu_icon");
			strUrl = rs.getString("fu_url");
			funcItem = new FuncItem();
			funcItem.setId(rs.getInt("fu_id"));
			funcItem.setFuncCode(rs.getString("fu_FuncCode"));
			funcItem.setFuncName(rs.getString("fu_FuncName"));

			funcItem.setFuncFrom(rs.getInt("fu_id"));
			funcItem.setIcon(strIcon);
			funcItem.setLevel(rs.getInt("fu_level"));
			funcItem.setOcId(rs.getInt("oc_id"));
			funcItem.setRange(rs.getInt("oc_id"));
			funcItem.setOrderSeq(rs.getInt("fu_orderSeq"));
			funcItem.setUrl(rs.getString("fu_url"));
			funcItem.setMainPage(rs.getString("fu_mainPage"));
			funcItem.setReferenceID(rs.getInt("fu_ReferenceID"));
			funcItem.setServType(rs.getInt("fu_servType"));
			funcItem.setServReso(rs.getString("fu_servReso"));

			if (rs.getInt("fu_funcs") == 0
					&& (strUrl != null && !("".equals(strUrl)))) {
				String[] strKv;
				String[] params = funcItem.getUrl().split("&");
				for (String strParam : params) {

					if (strParam.startsWith(Constant.GB_PARAM_FUNC_DEFTYPE)) {
						strKv = strParam.split("=");
						if (strKv.length >= 2) {
							funcItem.setDefType(Integer.parseInt(strKv[1]));
						}
					}

					if (strParam.startsWith(Constant.GB_PARAM_FUNC_CATEKEY)) {
						strKv = strParam.split("=");
						if (strKv.length >= 2) {
							funcItem.setCatekey(Integer.parseInt(strKv[1]));
						}
					}
				}
			}

			map.put(funcItem.getId(), funcItem);
			int submenusize = rs.getInt("fu_funcs");
			if (submenusize == 0) {

				if (strUrl != null && !("".equals(strUrl))) {
					if (funcItem.getLevel() >= 3) {
						sf.append("<li >");
					}
					sf.append("<div onclick=\"addTab(\'"
							+ rs.getString("fu_FuncName") + "\',\'"
							+ rs.getString("fu_url") + "&isIframe',\'" + strIcon
							+ "\')\"  title=\"" + rs.getString("fu_FuncName")
							+ "\" url=\"" + rs.getString("fu_url")
							+ "\" iconCls=\"" + strIcon + "\"> <a class=\""
							+ rs.getString("fu_FuncName") + "\" href=\"#\" > ");

					if (funcItem.getLevel() < 3) {
						sf.append(" <span class=\"icon " + strIcon
								+ "\" >&nbsp;</span>");
					}
					sf.append("<span class=\"nav\" >"
							+ rs.getString("fu_FuncName") + "</span></a></div>");

					if (funcItem.getLevel() >= 3) {
						sf.append("</li>");
					}
				}

			} else {
				sf.append(" <ul class=\"easyui-tree\">");
				sf.append("<li state=\"closed\" >");
				sf.append("<span>" + rs.getString("fu_FuncName") + "</span>");
				sf.append(" <ul>");
				sf.append(getSubMenu(map, rs.getString("fu_id")));
				sf.append(" </ul>");
				sf.append("</li>");
				sf.append("</ul>");
			}
			map.put(funcItem.getId(), funcItem);
		}
		return sf.toString();
	}

	@Override
	public Map<Integer, List<ItemInfo>> getOperCate() {
		Map<Integer, List<ItemInfo>> map = new LinkedHashMap<Integer, List<ItemInfo>>();
		StringBuffer sf = new StringBuffer();
		Integer nKey = null;
		int ocId = 0;
		sf.append(" SELECT a.oc_id,b.ot_id, ot_code, ot_name, ot_orderSeq, ");
		sf.append("   row_number() over (partition by oc_id order by ot_orderSeq) AS fu_num");
		sf.append(" FROM dbo.sy_OperRef a,dbo.sy_Operation b");
		sf.append(" WHERE a.ot_id=b.ot_id");
		sf.append(" ORDER BY ot_orderSeq");

		SqlRowSet rs = jdbcTemplate.queryForRowSet(sf.toString());

		List<ItemInfo> lsIf = null;
		while (rs.next()) {
			if (rs.getInt("fu_num") == 1) {
				if (lsIf != null) {
					map.put(rs.getInt("oc_id"), lsIf);
					lsIf = new ArrayList<ItemInfo>();
					nKey = rs.getInt("oc_id");
				} else {
					lsIf = new ArrayList<ItemInfo>();
					nKey = rs.getInt("oc_id");
				}
			}
			ItemInfo itemInfo = new ItemInfo();
			itemInfo.setId(rs.getInt("ot_id"));
			itemInfo.setItemCode(rs.getString("ot_code"));
			itemInfo.setItemName(rs.getString("ot_name"));
			itemInfo.setItemSeq(rs.getInt("ot_orderSeq"));

			lsIf.add(itemInfo);

		}

		return null;
	}

	@Override
	public void initDataDict() {
		// String procedure = "{call P_GetRoleFuncList(?)}";// 参数用？替代（包含输出参数）
		//
		// String s = (String) jdbcTemplate.execute(procedure,
		// new CallableStatementCallback() { // 内部类
		// @Override
		// public Object doInCallableStatement(CallableStatement cs)
		// throws SQLException, DataAccessException {
		//
		//
		// // // 设置输入参数
		// cs.setInt(1, 1);
		// boolean resultsAvailable = cs.execute();
		// Set<ResultSet> results = new HashSet();
		//
		//
		// ResultSet rs1 =cs.getResultSet();// 获得结果集的返回值
		//
		// while (rs1.next()) {
		// System.out.println(rs1.getString(3));
		// }
		// System.out.println("****************************");
		// if (cs.getMoreResults()) {
		// ResultSet rs2 = cs.getResultSet(); // 获得结果集的返回值
		// while (rs2.next()) {
		// System.out.println(rs2.getString(3));
		// }
		// }
		// return results;
		// }
		// });
		//
		//
		// // Set<ResultSet> st =executeProcedure("call P_GetRoleFuncList(?)");
		// //
		// // System.out.println(st.size());
		//
	}
	
	
	@Override
	public BsDBBuffer setBsDBBuffer(int j) {
		StringBuffer sf = new StringBuffer();
		sf.append(" SELECT bc_Id,bd_id,dd_declareinfo,dd_declareDesc,dd_assiCode FROM dbo.ba_baseDeclDet ");
		if (j > 0) {
			sf.append(" Where bc_Id=" + j);
		}
		sf.append(" ORDER BY bc_Id,dd_orderseq; ");

		SqlRowSet rs = jdbcTemplate.queryForRowSet(sf.toString());
		BsDBBuffer bsDBBuffer = new BsDBBuffer();
		String datas = new String();
		while (rs.next()) {
			j = rs.getInt("bc_Id"); // 业务序号
									// 数据区
			datas ="[bd_id:"+ '"' + rs.getString("bd_id") + '"' + "," 
					+"dd_declareinfo:"+ '"'+ rs.getString("dd_declareinfo") + '"' + "," 
					+"dd_declareDesc:"+ '"'+ rs.getString("dd_declareDesc") + '"' + "," 
					+"dd_assiCode:"+ '"'+ rs.getString("dd_assiCode") + '"' + "],";
			datas.substring(0,datas.length()-1);
			datas = "{" + datas + "}";
			//System.out.println("datas:"+datas);
			bsDBBuffer.setBsId(j);
			bsDBBuffer.setDatas(datas);
		}

		return bsDBBuffer;
	}

	
	public boolean login(HttpSession session,String userName,String passWord){
		String t_pwd="";
		if(userName==null||passWord==null){
			return false;
		}
		passWord=CodeUtil.encodeByMD5(passWord);
		String sql="SELECT COUNT(us_id) FROM sy_User WHERE (us_nickName=? OR us_userId=? OR us_email=? OR us_mobileNo=?) AND us_userPwd=?";
		int count=jdbcTemplate.queryForInt(sql,new Object[]{userName,userName,userName,userName,passWord});
		if(count==1){
			String rowSql="SELECT us_id,us_userId,us_userName,us_userPwd FROM sy_User WHERE (us_nickName=? OR us_userId=? OR us_email=? OR us_mobileNo=?) AND us_userPwd=?";
			SqlRowSet rs=jdbcTemplate.queryForRowSet(rowSql,new Object[]{userName,userName,userName,userName,passWord});
			rs.next();
			UserInfo userInfo=new UserInfo();
			userInfo.setId(rs.getInt(1));
			userInfo.setUserId(rs.getString(2));
			userInfo.setUserName(rs.getString(3));
			t_pwd=rs.getString(4);
			if (t_pwd.equals("21218CCA77804D2BA1922C33E0151105")){
				userInfo.setIniLog(0);
			}else{
				userInfo.setIniLog(1);
			}
			userInfo.setDefLanguage(1);
			session.setAttribute(Constant.GB_SESSION_USERINFO, userInfo);
			return true;
		}
		return false;
	}
}
