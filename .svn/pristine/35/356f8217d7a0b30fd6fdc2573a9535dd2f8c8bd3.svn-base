package com.glorisun.chd.service.impl;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import com.glorisun.chd.core.util.JSONHelper;
import com.glorisun.chd.core.util.RflectCoder;

import com.glorisun.chd.pojo.AgrPayDtlInfo;
import com.glorisun.chd.pojo.AgrPayInfo;
import com.glorisun.chd.pojo.DTLAInfo;
import com.glorisun.chd.pojo.DTLBInfo;
import com.glorisun.chd.pojo.DTLCInfo;
import com.glorisun.chd.pojo.FprojTender;
import com.glorisun.chd.pojo.FprojTenderDtlA;
import com.glorisun.chd.pojo.Fran;
import com.glorisun.chd.pojo.FrojTenderDtlB;
import com.glorisun.chd.pojo.FrojTenderDtlC;
import com.glorisun.chd.pojo.JmsAgreement;
import com.glorisun.chd.pojo.JmsAgreementPayDtl;
import com.glorisun.chd.pojo.JmsFprojReg;
import com.glorisun.chd.pojo.Jmscompany;
import com.glorisun.chd.pojo.PerbInfo;
import com.glorisun.chd.pojo.QuaMarInfo;
import com.glorisun.chd.pojo.agrPayDtl2;
import com.glorisun.chd.service.FranService;
import com.glorisun.umm.pojo.Role;

@Service("franService")
public class FranServiceImpl implements FranService {
	@Autowired
	JdbcTemplate jdbcTemplate;

	// 新增或更新数据
	@Override
	public String addOrEditFranInfo(HttpServletRequest request,
			Jmscompany jmscompany, String optType) {
		// TODO Auto-generated method stub
		int count;
		Object[] obj;
		if (optType.equals("0")) {
			String nick = "0";
			jmscompany.setNick(nick);
			/*
			 * SqlRowSet rs = jdbcTemplate.queryForRowSet(
			 * "select cmp_id from jms_company order by cmp_id desc ");
			 * if(rs.last()){ rs.first();
			 * jmscompany.setCmp_id(String.valueOf(rs.getInt(1)+1)); }else{
			 * jmscompany.setCmp_id("1"); }
			 */
			/*
			 * obj = new Object[]{
			 * jmscompany.getCmp_id(),jmscompany.getCmp_name(
			 * ),jmscompany.getCmp_engname(),jmscompany.getCmp_sname(),
			 * jmscompany
			 * .getCmp_type(),jmscompany.getCmp_craft(),jmscompany.getCmp_level
			 * (),jmscompany.getCmp_country(),
			 * jmscompany.getCmp_province(),jmscompany
			 * .getCmp_city(),jmscompany.getCmp_county(),
			 * jmscompany.getCmp_town(
			 * ),jmscompany.getCmp_postcode(),jmscompany.getCmp_charger
			 * (),jmscompany.getBusiness_area(),
			 * jmscompany.getBusiness_license()
			 * ,jmscompany.getCmp_addr1(),jmscompany.getCmp_contactor1(),
			 * jmscompany
			 * .getCmp_tel1(),jmscompany.getCmp_email1(),jmscompany.getCmp_mobile1
			 * (),jmscompany.getCmp_addr2(),
			 * jmscompany.getCmp_contactor2(),jmscompany
			 * .getCmp_tel2(),jmscompany
			 * .getCmp_email2(),jmscompany.getCmp_mobile2(),
			 * jmscompany.getBank_name1
			 * (),jmscompany.getBank_tel1(),jmscompany.getBank_accno1
			 * (),jmscompany.getBank_name2(),
			 * jmscompany.getBank_tel2(),jmscompany
			 * .getBank_accno2(),jmscompany.getCmp_desc
			 * (),jmscompany.getBelong_cmp(),jmscompany.getCmp_address() };
			 * count = jdbcTemplate.update(getFranInsert(),obj);
			 */

			count = RflectCoder.insertJavaBean(jdbcTemplate, "jms_company",
					jmscompany, "cmp_seq");

		} else {

			/*
			 * obj = new Object[]{
			 * jmscompany.getCmp_name(),jmscompany.getCmp_engname
			 * (),jmscompany.getCmp_sname(),
			 * jmscompany.getCmp_type(),jmscompany.
			 * getCmp_craft(),jmscompany.getCmp_level
			 * (),jmscompany.getCmp_country().trim(),
			 * jmscompany.getCmp_province(
			 * ).trim(),jmscompany.getCmp_city().trim(
			 * ),jmscompany.getCmp_county().trim(),
			 * jmscompany.getCmp_town().trim
			 * (),jmscompany.getCmp_postcode(),jmscompany
			 * .getCmp_charger(),jmscompany.getBusiness_area(),
			 * jmscompany.getBusiness_license
			 * (),jmscompany.getCmp_addr1(),jmscompany.getCmp_contactor1(),
			 * jmscompany
			 * .getCmp_tel1(),jmscompany.getCmp_email1(),jmscompany.getCmp_mobile1
			 * (),jmscompany.getCmp_addr2(),
			 * jmscompany.getCmp_contactor2(),jmscompany
			 * .getCmp_tel2(),jmscompany
			 * .getCmp_email2(),jmscompany.getCmp_mobile2(),
			 * jmscompany.getBank_name1
			 * (),jmscompany.getBank_tel1(),jmscompany.getBank_accno1
			 * (),jmscompany.getBank_name2(),
			 * jmscompany.getBank_tel2(),jmscompany
			 * .getBank_accno2(),jmscompany.getCmp_desc
			 * (),jmscompany.getBelong_cmp
			 * (),jmscompany.getCmp_address(),jmscompany.getCmp_id() }; count =
			 * jdbcTemplate.update(getFranUpdate(),obj);
			 */

			count = RflectCoder.updateJavaBean(jdbcTemplate, "jms_company",
					jmscompany, "cmp_seq");

		}

		Map<String, Object> ob = new HashMap<String, Object>();
		if (count > 0) {
			ob.put("success", true);
			ob.put("msg", "提交成功!");
		} else {
			ob.put("success", false);
			ob.put("msg", "提交失败!");
		}
		return JSONHelper.map2json(ob);
	}

	private String getFranInsert() {
		StringBuffer sb = new StringBuffer();
		sb.append("insert into jms_company (cmp_id,cmp_name,cmp_engname,cmp_sname,cmp_type,cmp_craft,cmp_level,cmp_country,cmp_province,cmp_city,cmp_county,cmp_town,cmp_postcode,cmp_charger,business_area,business_license,cmp_addr1,cmp_contactor1,cmp_tel1,cmp_email1,cmp_mobile1,cmp_addr2,cmp_contactor2,cmp_tel2,cmp_email2,cmp_mobile2,bank_name1,bank_tel1,bank_accno1,bank_name2,bank_tel2,bank_accno2,cmp_desc,belong_cmp,cmp_address) ");
		sb.append("values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ");
		return sb.toString();
	}

	private String getFranUpdate() {
		StringBuffer sb = new StringBuffer();
		sb.append("update jms_company set cmp_name = ?,cmp_engname = ?,cmp_sname = ?,cmp_type = ?,"
				+ "cmp_craft = ?,cmp_level = ?,cmp_country = ?,cmp_province = ?,cmp_city = ?,"
				+ "cmp_county=?,cmp_town=?,cmp_postcode=?,cmp_charger=?,business_area=?,"
				+ "business_license=?,cmp_addr1=?,cmp_contactor1=?,cmp_tel1=?,cmp_email1=?,"
				+ "cmp_mobile1=?,cmp_addr2=?,cmp_contactor2=?,cmp_tel2=?,cmp_email2=?,"
				+ "cmp_mobile2=?,bank_name1=?,bank_tel1=?,bank_accno1=?,bank_name2=?,"
				+ "bank_tel2=?,bank_accno2=?,cmp_desc=?,belong_cmp=?,cmp_address=?  where cmp_id = ?");
		return sb.toString();
	}

	// 删除
	@Override
	public String delFran(String idArray) {
		// TODO Auto-generated method stub
		try {
			for (String cmp_id : idArray.split(",")) {
				// deleteFran(Integer.parseInt(cmp_id));
				deleteFran(cmp_id);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "部分记录已被引用，不允许删除";
		}
		return "删除成功";
	}

	private String deleteFran(String cmp_id) {
		String sql = "delete from jms_company where cmp_seq = '" + cmp_id + "'";
		int count = jdbcTemplate.update(sql);
		if (count >= 1) {
			return "删除成功";
		} else {
			return "删除错误";
		}
	}

	@Override
	public String CmpComboInfo(String cmp) {
		// TODO Auto-generated method stub
		if (cmp.equals("level")) {
			String sql = "select level_id as id,level_id+level_name as text from chdpsdb.dbo.chd_level";
			return JSONHelper.array2json(jdbcTemplate.queryForList(sql));
		} else {
			String sql = "select class_code as id,class_code+class_name as text from chdpsdb.dbo.chd_code where param_id="
					+ cmp;
			return JSONHelper.array2json(jdbcTemplate.queryForList(sql));
		}

	}

	// 首页加载数据
	@Override
	public String loadFran() {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("select code.class_name as cmp_craft_name,cc.cmp_seq,cc.cmp_id,cc.cmp_sname,cc.cmp_name,cc.cmp_craft,cc.cmp_charger,cc.cmp_address ");
		sb.append("from jms_company as cc ");
		sb.append("left join chdpsdb.dbo.chd_code as code on code.class_code = cc.cmp_craft ");
		sb.append("where code.param_id = 1");
		List<Map<String, Object>> jmscom = jdbcTemplate.queryForList(sb
				.toString());
		return com.glorisun.chd.core.util.JSONHelper.array2json(jmscom);
	}

	@Override
	public String loadFranById(String cmp_seq) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("select cc.*,country.zone_name as cmp_country_name,province.zone_name as cmp_province_name,city.zone_name as cmp_city_name,county.zone_name as cmp_county_name,town.zone_name as cmp_town_name,cmp.cmp_sname as belong_cmp_name  from jms_company as cc ");
		sb.append("left join chdpsdb.dbo.chd_zone as country on cc.cmp_country = country.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as province on cc.cmp_province=province.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as city on cc.cmp_city=city.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as county on cc.cmp_county=county.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as town on cc.cmp_town=town.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_company as cmp on cmp.cmp_id = cc.belong_cmp ");
		sb.append("where cc.cmp_seq = '" + cmp_seq + "' ");
		System.out.println(sb.toString());
		Map<String, Object> data = jdbcTemplate.queryForMap(sb.toString());

		return JSONHelper.bean2json(data);
	}

	public String loadFranInfo(String cmp_id) {
		StringBuffer sb = new StringBuffer();
		sb.append("select cc.*,country.zone_name as cmp_country_name,province.zone_name as cmp_province_name,city.zone_name as cmp_city_name,county.zone_name as cmp_county_name,town.zone_name as cmp_town_name,cmp.cmp_sname as belong_cmp_name ");
		sb.append("from jms_company as cc ");
		sb.append("left join chdpsdb.dbo.chd_zone as country on cc.cmp_country = country.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as province on cc.cmp_province=province.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as city on cc.cmp_city=city.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as county on cc.cmp_county=county.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as town on cc.cmp_town=town.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_company as cmp on cc.belong_cmp = cmp.cmp_id ");
		sb.append("where cc.cmp_id = '" + cmp_id + "' ");
		Map<String, Object> data = new HashMap<String, Object>();
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sb
				.toString());
		if (list.size() == 0) {
			data.put("exist", false);
		} else {
			data.put("exist", true);
			data.put("msg", list.get(0));
		}
		return JSONHelper.map2json(data);
	}

	@Override
	public String loadCompany() {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("select cy.*, parent.cmp_sname as cmp_parent_sname ");
		sb.append("from chdpsdb.dbo.chd_company as cy ");
		sb.append("left join chdpsdb.dbo.chd_company as parent on parent.cmp_id = cy.belong_cmp order by cy.cmp_id ");
		List<Map<String, Object>> company = jdbcTemplate.queryForList(sb
				.toString());
		return JSONHelper.array2json(company);

	}

	@Override
	public String searchCompany(String companyCn, String preCmp) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		// System.out.println(companyCn);
		sb.append("select cy.*,parent.cmp_sname as cmp_parent_sname ");
		sb.append("from chdpsdb.dbo.chd_company as cy ");
		sb.append("left join chdpsdb.dbo.chd_company as parent on parent.cmp_id = cy.belong_cmp ");
		sb.append("where (cy.cmp_id = '" + companyCn
				+ "' or cy.cmp_sname like '%" + companyCn + "%') ");
		if (preCmp != null) {
			if (!preCmp.equals("")) {
				sb.append("and cy.cmp_id like '" + preCmp + "%'");
			}
		}
		sb.append("order by cy.cmp_id ");
		// System.out.println(sb.toString());
		List<Map<String, Object>> company = jdbcTemplate.queryForList(sb
				.toString());

		return JSONHelper.array2json(company);
	}

	@Override
	public String loadFproj() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sb = new StringBuffer();
		sb.append("select fr.pre_regseq,fr.pre_no,fr.reg_date,fr.proj_name,fr.proj_sname,cmp.cmp_sname as cust_cmp_name,jms.cmp_sname as frans_id_name,fr.proj_type ");
		sb.append("from jms_fproj_reg as fr ");
		sb.append("left join chdpsdb.dbo.chd_company as cmp on cmp.cmp_id=fr.cust_cmp ");
		sb.append("left join jms_company as jms on jms.cmp_id=fr.frans_id order by fr.pre_no ");
		List<Map<String, Object>> jmsfprs = jdbcTemplate.queryForList(sb
				.toString());
		for (Map<String, Object> jmsfpr : jmsfprs) {
			Date reg_date = (Date) jmsfpr.get("reg_date");
			jmsfpr.put("reg_date", sdf.format(reg_date));
		}
		return com.glorisun.chd.core.util.JSONHelper.array2json(jmsfprs);
	}

	// 加载雇员资料
	@Override
	public String loadEmployees() {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("select cs.staff_id,cs.staff_name,cd.dept_name as staff_dept_name ");
		sb.append("from chdpsdb.dbo.chd_staff as cs ");
		sb.append("left join chdpsdb.dbo.chd_dept as cd on cd.dept_id = cs.dept_id order by cs.staff_id ");
		List<Map<String, Object>> employees = jdbcTemplate.queryForList(sb
				.toString());
		return JSONHelper.array2json(employees);

	}

	@Override
	public String checkEmployees(String employeesDcn, String employeesScn) {
		// TODO Auto-generated method stub
		// System.out.println(employeesDcn+"++"+employeesScn);

		StringBuffer sb = new StringBuffer();
		sb.append("select cs.staff_id,cs.staff_name,cd.dept_name as staff_dept_name ");
		sb.append("from chdpsdb.dbo.chd_staff as cs ");
		sb.append("left join chdpsdb.dbo.chd_dept as cd on cd.dept_id = cs.dept_id ");
		sb.append("where (cd.dept_id = '" + employeesDcn
				+ "' or cd.dept_name like '%" + employeesDcn + "%') ");
		sb.append("and (cs.staff_id = '" + employeesScn
				+ "' or cs.staff_name like '%" + employeesScn
				+ "%') order by cs.staff_id ");
		List<Map<String, Object>> sm = jdbcTemplate.queryForList(sb.toString());
		// System.out.println(sb.toString());
		return JSONHelper.array2json(sm);
	}

	@Override
	public String delFproj(String idArray) {

		try {
			for (String pre_regseq : idArray.split(",")) {
				// deleteFran(Integer.parseInt(cmp_id));
				deleteFproj(pre_regseq);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "记录已被引用，不允许删除";
		}
		return "删除成功";
	}

	private String deleteFproj(String pre_regseq) {
		String sql = "delete from jms_fproj_reg where pre_regseq = '"
				+ pre_regseq + "'";
		int count = jdbcTemplate.update(sql);
		if (count >= 1) {
			return "删除成功";
		} else {
			return "删除错误";
		}
	}

	@Override
	public String addOrEditFprojInfo(HttpServletRequest request,
			JmsFprojReg jmsFprojReg, String custVisiPlobOptType) {
		int count = 0;
		Object[] obj;
		jmsFprojReg.setPre_no(jmsFprojReg.getPre_year() + "-JMYS-"
				+ jmsFprojReg.getPre_seq());
		if (custVisiPlobOptType.equals("0")) {

			/*
			 * obj = new Object[]{
			 * jmsFprojReg.getPre_no(),jmsFprojReg.getPre_year
			 * (),jmsFprojReg.getPre_seq(),jmsFprojReg.getReg_date(),
			 * jmsFprojReg
			 * .getProj_name(),jmsFprojReg.getProj_sname(),jmsFprojReg
			 * .getCmp_id(),jmsFprojReg.getDept_id(),
			 * jmsFprojReg.getCharger(),jmsFprojReg
			 * .getProj_country(),jmsFprojReg
			 * .getProj_province(),jmsFprojReg.getProj_city(),
			 * jmsFprojReg.getProj_county
			 * (),jmsFprojReg.getProj_town(),jmsFprojReg
			 * .getProj_addr(),jmsFprojReg.getCust_cmp(),
			 * jmsFprojReg.getFrans_id
			 * (),jmsFprojReg.getProj_type(),jmsFprojReg.getRemarks
			 * (),jmsFprojReg.getSign_state() }; count =
			 * jdbcTemplate.update(getFprojInsert(), obj);
			 */

			count = RflectCoder.insertJavaBean(jdbcTemplate, "jms_fproj_reg",
					jmsFprojReg, "pre_regseq");

		} else if (custVisiPlobOptType.equals("1")) {
			/*
			 * obj = new Object[]{
			 * jmsFprojReg.getPre_no(),jmsFprojReg.getPre_year
			 * (),jmsFprojReg.getPre_seq(),jmsFprojReg.getReg_date(),
			 * jmsFprojReg
			 * .getProj_name(),jmsFprojReg.getProj_sname(),jmsFprojReg
			 * .getCmp_id(),jmsFprojReg.getDept_id(),
			 * jmsFprojReg.getCharger(),jmsFprojReg
			 * .getProj_country(),jmsFprojReg
			 * .getProj_province(),jmsFprojReg.getProj_city(),
			 * jmsFprojReg.getProj_county
			 * (),jmsFprojReg.getProj_town(),jmsFprojReg
			 * .getProj_addr(),jmsFprojReg.getCust_cmp(),
			 * jmsFprojReg.getFrans_id
			 * (),jmsFprojReg.getProj_type(),jmsFprojReg.getRemarks
			 * (),jmsFprojReg.getSign_state(),jmsFprojReg.getPre_regseq() };
			 * count = jdbcTemplate.update(getFprojUpdate(), obj);
			 */

			count = RflectCoder.updateJavaBean(jdbcTemplate, "jms_fproj_reg",
					jmsFprojReg, "pre_regseq");
		}
		Map<String, Object> ob = new HashMap<String, Object>();
		if (count > 0) {
			ob.put("success", true);
			ob.put("msg", "提交成功!");
		} else {
			ob.put("success", false);
			ob.put("msg", "提交失败!");
		}
		return JSONHelper.map2json(ob);
	}

	/*
	 * private String getFprojInsert() { StringBuffer sf = new StringBuffer();
	 * sf.append("insert jms_fproj_reg (pre_no,pre_year,pre_seq,reg_date,");
	 * sf.append("proj_name,proj_sname,cmp_id,dept_id,");
	 * sf.append("charger,proj_country,proj_province,proj_city,");
	 * sf.append("proj_county,proj_town,proj_addr,cust_cmp,");
	 * sf.append("frans_id,proj_type,remarks,sign_state) ");
	 * sf.append("values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) "); return
	 * sf.toString(); } private String getFprojUpdate(){ StringBuffer sf = new
	 * StringBuffer(); sf.append("update jms_fproj_reg set ");
	 * sf.append("pre_no = ?,pre_year = ?,pre_seq = ?,reg_date = ?,proj_name = ?,"
	 * ); sf.append(
	 * "proj_sname = ?,cmp_id = ?,dept_id = ?,charger = ?,proj_country = ?,");
	 * sf.append(
	 * "proj_province = ?,proj_city = ?,proj_county = ?,proj_town = ?,proj_addr = ?,"
	 * ); sf.append(
	 * "cust_cmp= ?,frans_id = ?,proj_type = ?,remarks = ?,sign_state = ? ");
	 * sf.append("where pre_regseq = ?"); return sf.toString(); }
	 */

	/*
	 * @Override public String DeptInfoByCmp(String belong_cmp) { StringBuffer
	 * sb = new StringBuffer(); sb.append(
	 * "select dept.dept_id,dept.dept_name,dept.cmp_id,staff.staff_name as dept_staff_name,cmp.cmp_sname as dept_cmp_sname  "
	 * ); sb.append("from chdpsdb.dbo.chd_dept as dept "); sb.append(
	 * "left join chdpsdb.dbo.chd_staff as staff on staff.staff_id = dept.dept_manager "
	 * ); sb.append(
	 * "left join CHJMS.dbo.jms_company as cmp on cmp.cmp_id = dept.cmp_id ");
	 * sb.append("where dept.cmp_id = '"+belong_cmp+"' ");
	 * System.out.println("hello:"+sb.toString()); List<Map<String,Object>>
	 * jmscom = jdbcTemplate.queryForList(sb.toString()); return
	 * com.glorisun.chd.core.util.JSONHelper.array2json(jmscom); }
	 */
	@Override
	public String DeptInfo(String cmp_id_name, String dept_id_name) {
		StringBuffer sb = new StringBuffer();
		sb.append("select dept.dept_id,dept.dept_name,dept.cmp_id,staff.staff_name as dept_staff_name,cmp.cmp_sname as dept_cmp_sname ");
		sb.append("from chdpsdb.dbo.chd_dept as dept ");
		sb.append("left join chdpsdb.dbo.chd_staff as staff on staff.staff_id = dept.dept_manager ");
		sb.append("left join chdpsdb.dbo.chd_company as cmp on cmp.cmp_id = dept.cmp_id ");
		sb.append("where dept.cmp_id like '" + cmp_id_name
				+ "%' and (dept.dept_id='" + dept_id_name
				+ "' or dept.dept_name like '%" + dept_id_name + "%') ");
		// System.out.println(sb.toString());
		List<Map<String, Object>> jmscom = jdbcTemplate.queryForList(sb
				.toString());
		return com.glorisun.chd.core.util.JSONHelper.array2json(jmscom);
	}

	@Override
	public String loadFprojById(String pre_regseq) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sf = new StringBuffer();
		sf.append("select reg.pre_regseq,reg.pre_no,reg.pre_year,reg.pre_seq,reg.reg_date,");
		sf.append("reg.proj_name,reg.proj_sname,reg.cmp_id,reg.dept_id,reg.charger,");
		sf.append("reg.proj_country,reg.proj_province,reg.proj_city,reg.proj_county,reg.proj_town,");
		sf.append("reg.proj_addr,reg.cust_cmp,reg.frans_id,reg.proj_type,reg.remarks,reg.sign_state,");
		sf.append("country.zone_name as proj_country_name,");
		sf.append("province.zone_name as proj_province_name,");
		sf.append("city.zone_name as proj_city_name,");
		sf.append("county.zone_name as proj_county_name,");
		sf.append("town.zone_name as proj_town_name,");
		sf.append("cmp.cmp_sname as cmp_id_name,");
		sf.append("dept.dept_name as dept_id_name,");
		sf.append("charger.staff_name as charger_name,");
		sf.append("cust.cmp_sname as cust_cmp_name,cust.cmp_contactor1 as cust_cmp_contactor,cust.cmp_tel1 as cust_cmp_tel1,");
		sf.append("jms.cmp_name as frans_name,jms.cmp_contactor1 as frans_contactor,jms.cmp_tel1 as frans_tel,jms.cmp_address as frans_address ");
		sf.append("from jms_fproj_reg as reg ");
		sf.append("left join chdpsdb.dbo.chd_zone as country on country.zone_id = reg.proj_country ");
		sf.append("left join chdpsdb.dbo.chd_zone as province on province.zone_id = reg.proj_province ");
		sf.append("left join chdpsdb.dbo.chd_zone as city on city.zone_id = reg.proj_city ");
		sf.append("left join chdpsdb.dbo.chd_zone as county on county.zone_id = reg.proj_county ");
		sf.append("left join chdpsdb.dbo.chd_zone as town on town.zone_id = reg.proj_town ");
		sf.append("left join chdpsdb.dbo.chd_company as cmp on cmp.cmp_id = reg.cmp_id ");
		sf.append("left join chdpsdb.dbo.chd_dept as dept on dept.dept_id = reg.dept_id ");
		sf.append("left join chdpsdb.dbo.chd_staff as charger on charger.staff_id = reg.charger ");
		sf.append("left join chdpsdb.dbo.chd_company as cust on cust.cmp_id = reg.cmp_id ");
		sf.append("left join jms_company as jms on jms.cmp_id = reg.frans_id ");
		sf.append("where pre_regseq = '" + pre_regseq + "'");
		Map<String, Object> fproj = jdbcTemplate.queryForMap(sf.toString());
		Date reg_date = (Date) fproj.get("reg_date");
		DecimalFormat df = new DecimalFormat("0000");
		fproj.put("reg_date", sdf.format(reg_date));
		fproj.put("pre_seq", df.format(fproj.get("pre_seq")));
		return JSONHelper.map2json(fproj);

	}

	@Override
	public String loadYearSeq() {
		// TODO Auto-generated method stub
		DecimalFormat df = new DecimalFormat("0000");
		Date today = new Date();
		String seq = "";
		String year = new SimpleDateFormat("yyyy").format(today);
		StringBuffer sf = new StringBuffer();
		sf.append("select count(*) from  jms_fproj_reg where pre_no like '"
				+ year + "-JMYS-%' ");
		int count = jdbcTemplate.queryForInt(sf.toString());
		if (count == 0) {
			seq = "0001";
		} else {
			sf.delete(0, sf.toString().length());
			sf.append("select top 1 pre_seq from jms_fproj_reg where pre_no like '"
					+ year + "-JMYS-%' order by pre_seq desc ");
			// System.out.println(sf.toString());
			int seq_int = (Integer) jdbcTemplate.queryForMap(sf.toString())
					.get("pre_seq");
			seq = df.format(seq_int + 1);
		}
		Map<String, String> data = new HashMap<String, String>();
		data.put("year", year);
		data.put("seq", seq);
		return JSONHelper.map2json(data);
	}

	@Override
	public String FprojFranInfo(String fran_id_name, String filterStr) {

		StringBuffer sb = new StringBuffer();
		sb.append("select cmp.cmp_id,cmp.cmp_name,cmp.cmp_charger,cmp.cmp_mobile1,cmp.cmp_sname,cmp.cmp_contactor1,cmp.cmp_tel1,cmp.cmp_address ");
		sb.append("from CHJMS.dbo.jms_company as cmp ");
		sb.append("where (cmp.cmp_id like'" + fran_id_name
				+ "%' or cmp.cmp_sname like '%" + fran_id_name + "%') ");
		if (!(filterStr == null || filterStr.equals(""))) {
			sb.append("and cmp.cmp_id not in (select frans_id from "
					+ filterStr + ") ");
		}
		// System.out.println(sb.toString());
		List<Map<String, Object>> jmscom = jdbcTemplate.queryForList(sb
				.toString());
		return com.glorisun.chd.core.util.JSONHelper.array2json(jmscom);
	}

	@Override
	public String loadAgree() {
		// TODO Auto-generated method stub
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sb = new StringBuffer();
		sb.append("select agree.AGREE_SEQ as AGREE_SEQ,a.proj_id,a.proj_name,a.proj_sname,b.cmp_sname as proj_fran_name,c.work_sdate as proj_sdate,c.work_edate as proj_edate ");
		sb.append("from jms_agreement as agree ");
		sb.append("left join chdpsdb.dbo.pms_project as a on agree.PROJ_NO=a.proj_no ");
		sb.append("left join jms_company as b on agree.FRANS_ID=b.cmp_id ");
		sb.append("left join chdpsdb.dbo.pms_startwork as c on agree.PROJ_NO=c.proj_no ");
		List<Map<String, Object>> jmscom = jdbcTemplate.queryForList(sb
				.toString());
		Date proj_sdate = new Date();
		Date proj_edate = new Date();
		for (int i = 0; i < jmscom.size(); i++) {
			proj_sdate = (Date) jmscom.get(i).get("proj_sdate");
			if (proj_sdate == null)
				continue;
			else

				jmscom.get(i).put("proj_sdate", sdf.format(proj_sdate));
		}
		for (int i = 0; i < jmscom.size(); i++) {
			proj_edate = (Date) jmscom.get(i).get("proj_edate");
			if (proj_edate == null)
				continue;
			else

				jmscom.get(i).put("proj_edate", sdf.format(proj_edate));
		}
		return com.glorisun.chd.core.util.JSONHelper.array2json(jmscom);
	}

	@Override
	public String loadAgreeById(String AGREE_SEQ) {
		// TODO Auto-generated method stub
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sf = new StringBuffer();
		sf.append("select a.*,b.proj_id,b.proj_name,b.proj_sname,c.work_sdate,c.work_edate,d.cmp_sname ");
		sf.append("from jms_agreement as a ");
		sf.append("left join chdpsdb.dbo.pms_project as b on a.PROJ_NO=b.proj_no ");
		sf.append("left join chdpsdb.dbo.pms_startwork as c on a.PROJ_NO=c.proj_no ");
		sf.append("left join jms_company as d on a.FRANS_ID=d.cmp_id ");
		sf.append("where a.AGREE_SEQ = '" + AGREE_SEQ + "'");
		Map<String, Object> agree = jdbcTemplate.queryForMap(sf.toString());
		Date sdate = (Date) agree.get("work_sdate");
		Date edate = (Date) agree.get("work_edate");
		if (sdate != null) {
			agree.put("work_sdate", sdf.format(sdate));
		}
		if (edate != null) {
			agree.put("work_edate", sdf.format(edate));
		}
		return JSONHelper.map2json(agree);
	}

	@Override
	public String saveOrUpdateAgreeInfo(HttpServletRequest request,
			JmsAgreement jmsAgreement, String optType) {
		int count = 0;
		if (optType.equals("0")) {
			jmsAgreement.setNICK("0");
			UUID uuid = UUID.randomUUID();
			jmsAgreement.setAGREE_SEQ(uuid.toString());
			count = RflectCoder.insertJavaBean(jdbcTemplate, "JMS_AGREEMENT",
					jmsAgreement, null);

		} else if (optType.equals("1")) {
			// System.out.println(JSONHelper.bean2json(jmsAgreement));
			count = RflectCoder.updateJavaBean(jdbcTemplate, "JMS_AGREEMENT",
					jmsAgreement, "AGREE_SEQ");
		}
		Map<String, Object> ob = new HashMap<String, Object>();
		if (count > 0) {
			ob.put("success", true);
			ob.put("msg", "提交成功!");
		} else {
			ob.put("success", false);
			ob.put("msg", "提交失败!");
		}
		return JSONHelper.map2json(ob);
	}

	@Override
	public String checkProj(String frans_id, String filterStr) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sf = new StringBuffer();
		sf.append("select pms.proj_id,pms.proj_name,work.work_sdate,work.work_edate,com.cmp_sname,pms.proj_sname,pms.proj_no,reg.frans_id ");
		sf.append("from chdpsdb.dbo.pms_project as pms ");
		sf.append("left join jms_fproj_reg as reg on reg.pre_regseq = pms.pre_regseq ");
		sf.append("left join jms_company as com on com.cmp_id = reg.frans_id ");
		sf.append("left join chdpsdb.dbo.pms_startwork as work on work.proj_no = pms.proj_no ");
		sf.append("where 1=1 and reg.frans_id is not null ");
		if (frans_id != null) {
			if (!frans_id.equals("")) {
				sf.append("and (com.cmp_id = '" + frans_id
						+ "' or com.cmp_sname like '%" + frans_id + "%') ");
			}
		}

		sf.append("and pms.proj_no > 22000 ");
		if (!(filterStr == null || filterStr.equals(""))) {
			sf.append("and pms.proj_no not in (select proj_no from "
					+ filterStr + ") ");
		}
		// System.out.println(sf.toString());
		List<Map<String, Object>> projs = jdbcTemplate.queryForList(sf
				.toString());
		for (Map<String, Object> proj : projs) {
			Date work_edate = (Date) proj.get("work_edate");
			if (work_edate != null) {
				proj.put("work_edate", sdf.format(work_edate));
			}
			Date work_sdate = (Date) proj.get("work_sdate");
			if (work_sdate != null) {
				proj.put("work_sdate", sdf.format(work_sdate));
			}
		}
		return JSONHelper.array2json(projs);
	}

	@Override
	public String delAgree(String idArray) {
		// TODO Auto-generated method stub
		try {
			for (String AGREE_SEQ : idArray.split(",")) {
				// deleteFran(Integer.parseInt(cmp_id));
				deleteAgree(AGREE_SEQ);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "记录已被引用，不允许删除";
		}
		return "删除成功";
	}

	private String deleteAgree(String AGREE_SEQ) {
		String sql = "delete from jms_agreement where AGREE_SEQ = '"
				+ AGREE_SEQ + "'";
		int count = jdbcTemplate.update(sql);
		if (count >= 1) {
			return "删除成功";
		} else {
			return "删除错误";
		}
	}

	@Override
	public String loadPerbProjs2(String frans_id) {

		StringBuffer sf = new StringBuffer();
		sf.append("select b.proj_no,sum(return_amount) return_amount  ");
		sf.append("from jms_agreementpay_dtl2 a  ");
		sf.append("join jms_agreement b on a.agree_seq = b.agree_seq  ");
		sf.append("where nick = '0' and frans_id = '" + frans_id + "'  ");
		sf.append("group by b.proj_no ");
		List<Map<String, Object>> data = jdbcTemplate.queryForList(sf
				.toString());
		return JSONHelper.array2json(data);
	}

	@Override
	public String loadPerbProjs(String frans_id) {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		sf.append("SELECT A.PROJ_ID,A0.compact_id,");
		sf.append("A0.compact_amt,");
		sf.append("A0.WORK_SDATE,");
		sf.append("A0.WORK_EDATE,");
		sf.append("A0.maint_period,");
		sf.append("B.STAFF_NAME business_charger,");
		sf.append("C.STAFF_NAME dept_manager,");
		sf.append("D.STAFF_NAME handle_people,");
		sf.append("E.STAFF_NAME CW_MANAGER ");
		sf.append("FROM jms_fproj_reg A00 ");
		sf.append("JOIN CHDPSDB.DBO.PMS_PROJECT A  ON A00.pre_regseq=A.pre_regseq ");
		sf.append("JOIN CHDPSDB.DBO.pms_compact A0 ON A.PROJ_ID =A0.PROJ_ID ");
		sf.append("LEFT JOIN CHDPSDB.DBO.chd_staff B ON A0.business_charger=B.STAFF_ID ");
		sf.append("LEFT JOIN CHDPSDB.DBO.chd_staff C ON A0.dept_manager=C.STAFF_ID ");
		sf.append("LEFT JOIN CHDPSDB.DBO.chd_staff D ON A0.handle_people=D.STAFF_ID ");
		sf.append("LEFT JOIN CHDPSDB.DBO.chd_staff E ON A.CW_MANAGER =E.STAFF_ID ");
		sf.append("WHERE A00.frans_id = '" + frans_id + "' ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sf
				.toString());
		for (Map<String, Object> data : list) {
			Date WORK_SDATE = (Date) data.get("WORK_SDATE");
			Date WORK_EDATE = (Date) data.get("WORK_EDATE");
			data.put("WORK_SDATE", sdf.format(WORK_SDATE));
			data.put("WORK_EDATE", sdf.format(WORK_EDATE));
		}
		// System.out.println(sf.toString());
		return JSONHelper.array2json(list);
	}

	@Override
	public String getCmpqualInfos() {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		sf.append("select CMPQUAL_SEQ as id,D_NAME as text from JMS_BASICDATA ");
		sf.append("where D_TYPE = '3' ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sf
				.toString());
		return JSONHelper.array2json(list);
	}

	@Override
	public String getCmpqualInfosC() {
		StringBuffer sf = new StringBuffer();
		sf.append("select cast(CMPQUAL_SEQ as varchar(50))+'|'+D_NAME as id,D_NAME as text from JMS_BASICDATA ");
		sf.append("where D_TYPE = '3' ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sf
				.toString());
		return JSONHelper.array2json(list);
	}

	@Override
	public String addOrEditQuaInfo(final QuaMarInfo quaMarInfo, String optType,
			final List<DTLAInfo> dTLAInfos, final List<DTLBInfo> dTLBInfos,
			final List<DTLCInfo> dTLCInfos) {
		int count = 0;
		String sql = "";
		if (optType.equals("0")) {
			quaMarInfo.setNick("0");
			UUID uuid = UUID.randomUUID();
			quaMarInfo.setQuality_seq(uuid.toString());
			final String quality_seq = uuid.toString();
			count = RflectCoder.insertJavaBean(jdbcTemplate,
					"jms_qualitymargin", quaMarInfo, null);
			sql = "insert into jms_qualitymargin_dtla(quality_seq,rec_date,rec_money) values(?,?,?) ";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLAInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, quality_seq);
					ps.setObject(2, dTLAInfos.get(i).getRec_date());
					ps.setObject(3, dTLAInfos.get(i).getRec_money());
				}

			});
			sql = "insert into jms_qualitymargin_dtlb(quality_seq,compact_id,cmpqual_seq,deduct_money) values(?,?,?,?)";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLBInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, quality_seq);
					ps.setObject(2, dTLBInfos.get(i).getCompact_id());
					ps.setObject(3, dTLBInfos.get(i).getCmpqual_seq());
					ps.setObject(4, dTLBInfos.get(i).getDeduct_money());
				}

			});
			sql = "insert into jms_qualitymargin_dtlc(quality_seq,line_no,cmpqual_desc,deduct_money) values(?,?,?,?)";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLCInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, quality_seq);
					ps.setObject(2, dTLCInfos.get(i).getLine_no());
					ps.setObject(3, dTLCInfos.get(i).getCmpqual_desc());
					ps.setObject(4, dTLCInfos.get(i).getDeduct_money());
				}

			});
			// System.out.println(key);
		} else if (optType.equals("1")) {
			sql = "delete from jms_qualitymargin_dtla where quality_seq = '"
					+ quaMarInfo.getQuality_seq() + "' ";
			jdbcTemplate.update(sql);
			sql = "delete from jms_qualitymargin_dtlb where quality_seq = '"
					+ quaMarInfo.getQuality_seq() + "' ";
			jdbcTemplate.update(sql);
			sql = "delete from jms_qualitymargin_dtlc where quality_seq = '"
					+ quaMarInfo.getQuality_seq() + "' ";
			jdbcTemplate.update(sql);
			sql = "insert into jms_qualitymargin_dtla(quality_seq,rec_date,rec_money) values(?,?,?) ";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLAInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, quaMarInfo.getQuality_seq());
					ps.setObject(2, dTLAInfos.get(i).getRec_date());
					ps.setObject(3, dTLAInfos.get(i).getRec_money());
				}

			});
			sql = "insert into jms_qualitymargin_dtlb(quality_seq,compact_id,cmpqual_seq,deduct_money) values(?,?,?,?)";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLBInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, quaMarInfo.getQuality_seq());
					ps.setObject(2, dTLBInfos.get(i).getCompact_id());
					ps.setObject(3, dTLBInfos.get(i).getCmpqual_seq());
					ps.setObject(4, dTLBInfos.get(i).getDeduct_money());
				}

			});
			sql = "insert into jms_qualitymargin_dtlc(quality_seq,line_no,cmpqual_desc,deduct_money) values(?,?,?,?)";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLCInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, quaMarInfo.getQuality_seq());
					ps.setObject(2, dTLCInfos.get(i).getLine_no());
					ps.setObject(3, dTLCInfos.get(i).getCmpqual_desc());
					ps.setObject(4, dTLCInfos.get(i).getDeduct_money());
				}

			});
		}
		return null;
	}

	@Override
	public String addOrEditPerbInfo(PerbInfo perbInfo, String optType,
			final List<DTLAInfo> dTLAInfos, final List<DTLBInfo> dTLBInfos,
			final List<DTLCInfo> dTLCInfos) {
		// TODO Auto-generated method stub
		if (perbInfo.getDiscontinue() == null) {
			perbInfo.setDiscontinue("0");
		}
		if (perbInfo.getCanceled() == null) {
			perbInfo.setCanceled("0");
		}
		int count = 0;
		String sql = "";
		if (optType.equals("0")) {
			perbInfo.setNick("0");
			UUID uuid = UUID.randomUUID();
			perbInfo.setPerformance_seq(uuid.toString());
			final String performance_seq = uuid.toString();
			count = RflectCoder.insertJavaBean(jdbcTemplate,
					"jms_performancebond", perbInfo, null);
			sql = "insert into jms_performancebond_dtla(performance_seq,rec_date,rec_money) values(?,?,?) ";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLAInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, performance_seq);
					ps.setObject(2, dTLAInfos.get(i).getRec_date());
					ps.setObject(3, dTLAInfos.get(i).getRec_money());
				}

			});
			sql = "insert into jms_performancebond_dtlb(performance_seq,compact_id,cmpqual_seq,deduct_money) values(?,?,?,?)";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLBInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, performance_seq);
					ps.setObject(2, dTLBInfos.get(i).getCompact_id());
					ps.setObject(3, dTLBInfos.get(i).getCmpqual_seq());
					ps.setObject(4, dTLBInfos.get(i).getDeduct_money());
				}

			});
			sql = "insert into jms_performancebond_dtlc(performance_seq,line_no,cmpqual_desc,deduct_money) values(?,?,?,?)";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLCInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, performance_seq);
					ps.setObject(2, dTLCInfos.get(i).getLine_no());
					ps.setObject(3, dTLCInfos.get(i).getCmpqual_desc());
					ps.setObject(4, dTLCInfos.get(i).getDeduct_money());
				}

			});
			// System.out.println(key);
		} else if (optType.equals("1")) {
			// System.out.println(JSONHelper.bean2json(perbInfo));
			count = RflectCoder.updateJavaBean(jdbcTemplate,
					"jms_performancebond", perbInfo, "performance_seq");
			sql = "delete from jms_performancebond_dtla where performance_seq = '"
					+ perbInfo.getPerformance_seq() + "' ";
			jdbcTemplate.update(sql);
			sql = "delete from jms_performancebond_dtlb where performance_seq = '"
					+ perbInfo.getPerformance_seq() + "' ";
			jdbcTemplate.update(sql);
			sql = "delete from jms_performancebond_dtlc where performance_seq = '"
					+ perbInfo.getPerformance_seq() + "' ";
			jdbcTemplate.update(sql);
			final PerbInfo perb = perbInfo;
			sql = "insert into jms_performancebond_dtla(performance_seq,rec_date,rec_money) values(?,?,?) ";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLAInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, perb.getPerformance_seq());
					ps.setObject(2, dTLAInfos.get(i).getRec_date());
					ps.setObject(3, dTLAInfos.get(i).getRec_money());
				}

			});
			sql = "insert into jms_performancebond_dtlb(performance_seq,compact_id,cmpqual_seq,deduct_money) values(?,?,?,?)";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLBInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, perb.getPerformance_seq());
					ps.setObject(2, dTLBInfos.get(i).getCompact_id());
					ps.setObject(3, dTLBInfos.get(i).getCmpqual_seq());
					ps.setObject(4, dTLBInfos.get(i).getDeduct_money());
				}

			});

			sql = "insert into jms_performancebond_dtlc(performance_seq,line_no,cmpqual_desc,deduct_money) values(?,?,?,?)";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub
					return dTLCInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, perb.getPerformance_seq());
					ps.setObject(2, dTLCInfos.get(i).getLine_no());
					ps.setObject(3, dTLCInfos.get(i).getCmpqual_desc());
					ps.setObject(4, dTLCInfos.get(i).getDeduct_money());
				}

			});
		}
		Map<String, Object> ob = new HashMap<String, Object>();
		if (count != 0) {
			ob.put("success", true);
			ob.put("msg", "提交成功!");
		} else {
			ob.put("success", false);
			ob.put("msg", "提交失败!");
		}
		return JSONHelper.map2json(ob);
	}

	@Override
	public String loadPerb() {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		sf.append("select a.performance_seq,b.cmp_id,b.cmp_sname,b.cmp_name,b.cmp_charger ");
		sf.append("from jms_performancebond as a ");
		sf.append("left join jms_company as b on a.frans_id = b.cmp_id ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sf
				.toString());
		return JSONHelper.array2json(list);
	}

	@Override
	public String loadQuaById(String quality_seq) {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		sf.append("select a.*,b.cmp_id,b.cmp_sname,b.cmp_name,b.cmp_charger,b.cmp_contactor1,b.cmp_tel1,b.cmp_mobile1,b.cmp_address ");
		sf.append("from jms_qualitymargin as a ");
		sf.append("left join jms_company as b on a.frans_id = b.cmp_id ");
		sf.append("where a.quality_seq = '" + quality_seq + "'");
		Map<String, Object> data = jdbcTemplate.queryForMap(sf.toString());
		sf = new StringBuffer();
		sf.append("select * ");
		sf.append("from jms_qualitymargin_dtla as a ");
		sf.append("where a.quality_seq = '" + quality_seq + "' ");
		List<Map<String, Object>> DTLADatas = jdbcTemplate.queryForList(sf
				.toString());
		for (Map<String, Object> DTLAData : DTLADatas) {
			Date rec_date = (Date) DTLAData.get("rec_date");
			DTLAData.put("rec_date", sdf.format(rec_date));
		}
		data.put("DTLADatas", DTLADatas);
		sf = new StringBuffer();
		sf.append("select b.D_NAME as cmpqual_text,a.* ");
		sf.append("from jms_qualitymargin_dtlb as a ");
		sf.append("left join JMS_BASICDATA as b on a.cmpqual_seq = b.CMPQUAL_SEQ ");
		sf.append("where a.quality_seq = '" + quality_seq + "' ");
		List<Map<String, Object>> DTLBDatas = jdbcTemplate.queryForList(sf
				.toString());
		sf = new StringBuffer();
		sf.append("select f.cmpqual_text,sum(f.deduct_money) deduct_money,f.cmpqual_seq from ");
		sf.append("(select c.D_NAME cmpqual_text,b.deduct_money,b.cmpqual_seq ");
		sf.append("from ");
		sf.append("(select sum(a.deduct_money) deduct_money,a.cmpqual_seq from jms_qualitymargin_dtlb as a where a.quality_seq = '"
				+ quality_seq + "' group by a.cmpqual_seq) b ");
		sf.append("left join JMS_BASICDATA as c on b.cmpqual_seq = c.CMPQUAL_SEQ ");
		sf.append("union ");
		sf.append("select d.cmpqual_desc,d.deduct_money,e.cmpqual_seq ");
		sf.append("from jms_qualitymargin_dtlc d ");
		sf.append("left join JMS_BASICDATA e on d.cmpqual_desc = e.D_NAME ");
		sf.append("where d.quality_seq = '" + quality_seq + "') f ");
		sf.append("group by f.cmpqual_seq,f.cmpqual_text ");
		sf.append("order by f.cmpqual_seq desc");
		List<Map<String, Object>> DTLBDatas1 = jdbcTemplate.queryForList(sf
				.toString());
		data.put("DTLBDatas", DTLBDatas);
		data.put("DTLBDatas1", DTLBDatas1);
		sf = new StringBuffer();
		sf.append("select a.* ");
		sf.append("from jms_qualitymargin_dtlc as a ");
		sf.append("where a.quality_seq = '" + quality_seq + "' ");
		List<Map<String, Object>> DTLCDatas = jdbcTemplate.queryForList(sf
				.toString());
		data.put("DTLCDatas", DTLCDatas);
		return JSONHelper.map2json(data);
	}

	@Override
	public String loadPerbById(String performance_seq) {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		sf.append("select a.*,b.cmp_id,b.cmp_sname,b.cmp_name,b.cmp_charger,b.cmp_contactor1,b.cmp_tel1,b.cmp_mobile1,b.cmp_address ");
		sf.append("from jms_performancebond as a ");
		sf.append("left join jms_company as b on a.frans_id = b.cmp_id ");
		sf.append("where a.performance_seq = '" + performance_seq + "'");
		Map<String, Object> data = jdbcTemplate.queryForMap(sf.toString());
		sf = new StringBuffer();
		sf.append("select * ");
		sf.append("from jms_performancebond_dtla as a ");
		sf.append("where a.performance_seq = '" + performance_seq + "' ");
		List<Map<String, Object>> DTLADatas = jdbcTemplate.queryForList(sf
				.toString());
		for (Map<String, Object> DTLAData : DTLADatas) {
			Date rec_date = (Date) DTLAData.get("rec_date");
			DTLAData.put("rec_date", sdf.format(rec_date));
		}
		data.put("DTLADatas", DTLADatas);
		sf = new StringBuffer();
		sf.append("select b.D_NAME as cmpqual_text,a.* ");
		sf.append("from jms_performancebond_dtlb as a ");
		sf.append("left join JMS_BASICDATA as b on a.cmpqual_seq = b.CMPQUAL_SEQ ");
		sf.append("where a.performance_seq = '" + performance_seq + "' ");
		List<Map<String, Object>> DTLBDatas = jdbcTemplate.queryForList(sf
				.toString());
		sf = new StringBuffer();
		sf.append("select f.cmpqual_text,sum(f.deduct_money) deduct_money,f.cmpqual_seq from ");
		sf.append("(select c.D_NAME cmpqual_text,b.deduct_money,b.cmpqual_seq ");
		sf.append("from ");
		sf.append("(select sum(a.deduct_money) deduct_money,a.cmpqual_seq from jms_performancebond_dtlb as a where a.performance_seq = '"
				+ performance_seq + "' group by a.cmpqual_seq) b ");
		sf.append("left join JMS_BASICDATA as c on b.cmpqual_seq = c.CMPQUAL_SEQ ");
		sf.append("union ");
		sf.append("select d.cmpqual_desc,d.deduct_money,e.cmpqual_seq ");
		sf.append("from jms_performancebond_dtlc d ");
		sf.append("left join JMS_BASICDATA e on d.cmpqual_desc = e.D_NAME ");
		sf.append("where d.performance_seq = '" + performance_seq + "') f ");
		sf.append("group by f.cmpqual_seq,f.cmpqual_text ");
		sf.append("order by f.cmpqual_seq desc");
		List<Map<String, Object>> DTLBDatas1 = jdbcTemplate.queryForList(sf
				.toString());
		data.put("DTLBDatas", DTLBDatas);
		data.put("DTLBDatas1", DTLBDatas1);
		sf = new StringBuffer();
		sf.append("select a.*,b.cmpqual_seq ");
		sf.append("from jms_performancebond_dtlc as a ");
		sf.append("left join JMS_BASICDATA as b on a.cmpqual_desc = b.D_NAME ");
		sf.append("where a.performance_seq = '" + performance_seq + "' ");
		List<Map<String, Object>> DTLCDatas = jdbcTemplate.queryForList(sf
				.toString());
		data.put("DTLCDatas", DTLCDatas);
		// System.out.println(JSONHelper.map2json(data));
		return JSONHelper.map2json(data);
	}

	@Override
	public String delQua(String quality_seqs) {
		for (String quality_seq : quality_seqs.split(",")) {
			deleteQua(quality_seq);
		}
		return "删除成功";
	}

	private void deleteQua(String quality_seq) {
		String sql = "delete from jms_qualitymargin_dtla where quality_seq = '"
				+ quality_seq + "' ";
		jdbcTemplate.update(sql);
		sql = "delete from jms_qualitymargin_dtlb where quality_seq = '"
				+ quality_seq + "' ";
		jdbcTemplate.update(sql);
		sql = "delete from jms_qualitymargin_dtlc where quality_seq = '"
				+ quality_seq + "' ";
		jdbcTemplate.update(sql);
		sql = "delete from jms_qualitymargin where quality_seq = '"
				+ quality_seq + "' ";
		jdbcTemplate.update(sql);
	}

	@Override
	public String delPerb(String performance_seqs) {
		// TODO Auto-generated method stub
		for (String performance_seq : performance_seqs.split(",")) {
			// deleteFran(Integer.parseInt(cmp_id));
			deletePerb(performance_seq);
		}
		return "删除成功";
	}

	private void deletePerb(String performance_seq) {
		String sql = "delete from jms_performancebond_dtla where performance_seq = '"
				+ performance_seq + "' ";
		jdbcTemplate.update(sql);
		sql = "delete from jms_performancebond_dtlb where performance_seq = '"
				+ performance_seq + "' ";
		jdbcTemplate.update(sql);
		sql = "delete from jms_performancebond_dtlc where performance_seq = '"
				+ performance_seq + "' ";
		jdbcTemplate.update(sql);
		sql = "delete from jms_performancebond where performance_seq = '"
				+ performance_seq + "' ";
		jdbcTemplate.update(sql);
	}

	// 申请付款====================================== 廖伟亮
	// 开始=======================================================================
	@Override
	public String loadAgreePay() {
		// TODO Auto-generated method stub
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT B.AGREE_SEQ,C.PROJ_ID,C.PROJ_NO,C.PROJ_SNAME,E.CMP_SNAME,D.WORK_SDATE,D.WORK_EDATE,CASE WHEN A.PAY_FLAG=0 THEN '否' ELSE '是' END PAY_FLAG ");
		sb.append("FROM jms_agreementpay A ");
		sb.append("JOIN JMS_agreement B ON A.AGREE_SEQ =B.AGREE_SEQ ");
		sb.append("JOIN CHDPSDB.DBO.pms_project C ON B.PROJ_NO=C.PROJ_NO ");
		sb.append("left join CHDPSDB.DBO.pms_startwork D on C.proj_no=D.proj_no ");
		sb.append("JOIN JMS_COMPANY E ON B.FRANS_ID=E.CMP_ID AND A.NICK=E.NICK ");
		sb.append("WHERE B.NICK=0 ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sb
				.toString());
		for (Map<String, Object> data : list) {
			Date WORK_SDATE = (Date) data.get("WORK_SDATE");
			Date WORK_EDATE = (Date) data.get("WORK_EDATE");
			if(WORK_SDATE!=null){
				data.put("WORK_SDATE", sdf.format(WORK_SDATE));
			}
			if(WORK_EDATE!=null){
				data.put("WORK_EDATE", sdf.format(WORK_EDATE));
			}
		}
		return JSONHelper.array2json(list);

	}

	@Override
	public String searchFranPro(String franPro,String frans_id,String filterStr) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		sb.append("select g.agree_seq,a.frans_id,f.cmp_sname,b.proj_no,b.proj_id,b.proj_name,b.proj_sname,c.work_sdate,c.work_edate,d.sd_money,e.compact_amt ");
		sb.append("from jms_fproj_reg a ");
		sb.append("join chdpsdb.dbo.pms_project b on a.pre_regseq=b.pre_regseq ");
		sb.append("left join chdpsdb.dbo.pms_startwork c on b.proj_no=c.proj_no ");
		sb.append("left join chdpsdb.dbo.pps_project_flow d on b.proj_id =d.proj_id ");
		sb.append("left join (select proj_id,sum(compact_amt) compact_amt from chdpsdb.dbo.pms_compact group by proj_id) e on b.proj_id=e.proj_id ");
		sb.append("join jms_compaNy f on a.frans_id =f.cmp_id and a.nick=f.nick ");
		sb.append("left join jms_agreement g on g.proj_no = b.proj_no ");
		sb.append("where 1=1 ");
		if (franPro == null || franPro.equals("")) {
			
		} else {
			if(franPro.contains("|")){
				if(franPro.contains("|agree_seq"))
					sb.append("and g.agree_seq is not null ");
				if(franPro.contains("|jms_agreementpay_dtl"))
					sb.append("and g.agree_seq in (select agree_seq from jms_agreementpay_dtl)");
			}else{
				sb.append("and a.frans_id = '" + franPro + "' and a.nick=0 ");
			}
		}
		if(frans_id!=null&&!frans_id.equals("")){
			sb.append("and a.frans_id = '" + frans_id + "' ");
		}
		System.out.println("filterStr:"+filterStr);
		if(filterStr!=null&&!filterStr.equals("")){
			sb.append("and g.agree_seq not in (select agree_seq from "+filterStr+") ");
		}
		sb.append("and b.pre_regseq is not null and a.nick = 0 and a.frans_id is not null ");
		System.out.println("franPro:"+franPro+"\n"+sb.toString());
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sb
				.toString());
		for (Map<String, Object> data : list) {

			Date WORK_SDATE = (Date) data.get("WORK_SDATE");
			Date WORK_EDATE = (Date) data.get("WORK_EDATE");
			if (WORK_SDATE != null) {

				data.put("WORK_SDATE", sdf.format(WORK_SDATE));
			}
			if (WORK_EDATE != null) {
				data.put("WORK_EDATE", sdf.format(WORK_EDATE));
			}
		}

		return JSONHelper.array2json(list);
	}

	@Override
	public String loadPcoms(String proj_id) {
		// TODO Auto-generated method stub
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sf = new StringBuffer();
		sf.append("SELECT A.COMPACT_ID,GET_SEQ,GET_DATE,GET_AMT ");
		sf.append("FROM CHDPSDB.DBO.pms_compact A ");
		sf.append("JOIN CHDPSDB.DBO.pms_compact_dtl2 B ON A.COMPACT_ID = B.COMPACT_ID ");
		sf.append("WHERE A.PROJ_ID = '" + proj_id + "' ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sf
				.toString());
		for (Map<String, Object> data : list) {
			Date get_date = (Date) data.get("GET_DATE");
			if (get_date != null) {
				data.put("GET_DATE", sdf.format(get_date));
			}
		}
		return JSONHelper.array2json(list);
	}

	@Override
	public String getPercents(String proj_no, String pay_amount) {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		sf.append("select MDEDUCT_RATIO,TAX_RATIO,OTH_RATIO,BAIL_RATIO,AGREE_SEQ ");
		sf.append("from JMS_AGREEMENT ");
		sf.append("where PROJ_NO = '" + proj_no + "' ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sf
				.toString());
		Map<String, Object> a = list.get(0);

		Map<String, Object> data = new HashMap<String, Object>();
		BigDecimal bg = (BigDecimal) a.get("MDEDUCT_RATIO");
		BigDecimal bg1 = (BigDecimal) a.get("TAX_RATIO");
		BigDecimal bg2 = (BigDecimal) a.get("OTH_RATIO");
		BigDecimal bg3 = (BigDecimal) a.get("BAIL_RATIO");

		DecimalFormat df = new DecimalFormat("0.00");
		String df1 = df.format(bg);
		String df2 = df.format(bg1);
		String df3 = df.format(bg2);
		String df4 = df.format(bg3);

		Float TAX_COST = Float.valueOf(pay_amount) * Float.valueOf(df2) / 100;
		Float OTH_COST = Float.valueOf(pay_amount) * Float.valueOf(df3) / 100;
		Float MANAGER_COST = Float.valueOf(pay_amount) * Float.valueOf(df1)
				/ 100;
		Float BAIL_RATIO = Float.valueOf(pay_amount) * Float.valueOf(df4) / 100;

		data.put("TAX_COST", df.format(TAX_COST));
		data.put("OTH_COST", df.format(OTH_COST));
		data.put("MANAGER_COST", df.format(MANAGER_COST));
		data.put("BAIL_RATIO", df.format(BAIL_RATIO));
		data.put("AGREE_SEQ", a.get("AGREE_SEQ"));
		return JSONHelper.map2json(data);
	}

	@Override
	public String saveOrEditAgrPayInfo(AgrPayInfo agrPayInfo,
			final List<AgrPayDtlInfo> agrPayDtlAddInfos,
			final List<AgrPayDtlInfo> agrPayDtlEditInfos,
			String agrPayDtlsDelArr, String optType) {
		// TODO Auto-generated method stub
		String sql = "";
		// System.out.println(agrPayInfo.getPay_flag());
		if (optType.equals("0")) {
			agrPayInfo.setNick("0");
			agrPayInfo.setReturnbail_flag("0");
			sql = "insert into jms_agreementpay(agree_seq,pay_flag,returnbail_flag,nick) values(?,?,?,?) ";
			jdbcTemplate.update(sql, new Object[] { agrPayInfo.getAgree_seq(),
					agrPayInfo.getPay_flag(), agrPayInfo.getReturnbail_flag(),
					agrPayInfo.getNick() });
			sql = "insert into jms_agreementpay_dtl(agree_seq,pay_seq,pay_date,pay_amount,manage_cost,tax_cost,oth_cost,bail_cost,sign_status) values(?,?,?,?,?,?,?,?,?) ";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub

					return agrPayDtlAddInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, agrPayDtlAddInfos.get(i).getAGREE_SEQ());
					ps.setObject(2, agrPayDtlAddInfos.get(i).getPAY_SEQ());
					ps.setObject(3, agrPayDtlAddInfos.get(i).getPAY_DATE());
					ps.setObject(4, agrPayDtlAddInfos.get(i).getPAY_AMOUNT());
					ps.setObject(5, agrPayDtlAddInfos.get(i).getMANAGE_COST());
					ps.setObject(6, agrPayDtlAddInfos.get(i).getTAX_COST());
					ps.setObject(7, agrPayDtlAddInfos.get(i).getOTH_COST());
					ps.setObject(8, agrPayDtlAddInfos.get(i).getBAIL_COST());
					ps.setObject(9, agrPayDtlAddInfos.get(i).getSIGN_STATUS());
				}

			});
		} else {
			// System.out.println(agrPayDtlAddInfos.size());
			jdbcTemplate
					.update("update jms_agreementpay set pay_flag = ? where agree_seq = ? ",
							new Object[] { agrPayInfo.getPay_flag(),
									agrPayInfo.getAgree_seq() });
			agrPayDtlsDelArr = agrPayDtlsDelArr.substring(1,
					agrPayDtlsDelArr.length() - 1);
			// System.out.println(agrPayDtlsDelArr);
			if (!agrPayDtlsDelArr.equals("")) {
				sql = "delete from jms_agreementpay_dtl where agree_seq = '"
						+ agrPayInfo.getAgree_seq() + "' and pay_seq in ("
						+ agrPayDtlsDelArr + ") ";
				jdbcTemplate.update(sql);
			}

			sql = "select max(PAY_SEQ) agree_seq from jms_agreementpay_dtl where agree_seq = '"
					+ agrPayInfo.getAgree_seq() + "' ";
			final Integer pay_seq = (Integer) jdbcTemplate.queryForMap(sql)
					.get("agree_seq");

			sql = "insert into jms_agreementpay_dtl(agree_seq,pay_seq,pay_date,pay_amount,manage_cost,tax_cost,oth_cost,bail_cost,sign_status) values(?,?,?,?,?,?,?,?,?) ";
			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

				@Override
				public int getBatchSize() {
					// TODO Auto-generated method stub

					return agrPayDtlAddInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, agrPayDtlAddInfos.get(i).getAGREE_SEQ());
					ps.setObject(2, (pay_seq == null ? 0 : pay_seq) + 1 + i);
					ps.setObject(3, agrPayDtlAddInfos.get(i).getPAY_DATE());
					ps.setObject(4, agrPayDtlAddInfos.get(i).getPAY_AMOUNT());
					ps.setObject(5, agrPayDtlAddInfos.get(i).getMANAGE_COST());
					ps.setObject(6, agrPayDtlAddInfos.get(i).getTAX_COST());
					ps.setObject(7, agrPayDtlAddInfos.get(i).getOTH_COST());
					ps.setObject(8, agrPayDtlAddInfos.get(i).getBAIL_COST());
					ps.setObject(9, agrPayDtlAddInfos.get(i).getSIGN_STATUS());
				}

			});

			sql = "update jms_agreementpay_dtl set pay_date=?,pay_amount=?,manage_cost=?,tax_cost=?,oth_cost=?,bail_cost=?,sign_status=? where agree_seq = ? and pay_seq = ? ";

			jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
				@Override
				public int getBatchSize() {

					return agrPayDtlEditInfos.size();
				}

				@Override
				public void setValues(PreparedStatement ps, int i)
						throws SQLException {
					// TODO Auto-generated method stub
					ps.setObject(1, agrPayDtlEditInfos.get(i).getPAY_DATE());
					ps.setObject(2, agrPayDtlEditInfos.get(i).getPAY_AMOUNT());
					ps.setObject(3, agrPayDtlEditInfos.get(i).getMANAGE_COST());
					ps.setObject(4, agrPayDtlEditInfos.get(i).getTAX_COST());
					ps.setObject(5, agrPayDtlEditInfos.get(i).getOTH_COST());
					ps.setObject(6, agrPayDtlEditInfos.get(i).getBAIL_COST());
					ps.setObject(7, agrPayDtlEditInfos.get(i).getSIGN_STATUS());
					ps.setObject(8, agrPayDtlEditInfos.get(i).getAGREE_SEQ());
					ps.setObject(9, agrPayDtlEditInfos.get(i).getPAY_SEQ());
				}

			});

		}

		return null;
	}

	@Override
	public String loadAgreePayById(String AGREE_SEQ) {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		sf.append("select * from jms_agreementpay where agree_seq = '"
				+ AGREE_SEQ + "' ");
		Map<String, Object> agrPay = (Map<String, Object>) jdbcTemplate
				.queryForList(sf.toString()).get(0);
		sf = new StringBuffer();
		sf.append("select g.agree_seq,a.frans_id,f.cmp_sname,b.proj_no,b.proj_id,b.proj_name,b.proj_sname,c.work_sdate,c.work_edate,d.sd_money,e.compact_amt ");
		sf.append("from jms_fproj_reg a ");
		sf.append("join chdpsdb.dbo.pms_project b on a.pre_regseq=b.pre_regseq ");
		sf.append("left join chdpsdb.dbo.pms_startwork c on b.proj_no=c.proj_no ");
		sf.append("left join chdpsdb.dbo.pps_project_flow d on b.proj_id =d.proj_id ");
		sf.append("left join (select proj_id,sum(compact_amt) compact_amt from chdpsdb.dbo.pms_compact group by proj_id) e on b.proj_id=e.proj_id ");
		sf.append("join jms_compaNy f on a.frans_id =f.cmp_id and a.nick=f.nick ");
		sf.append("left join jms_agreement g on g.proj_no = b.proj_no ");
		sf.append("where g.agree_seq = '" + AGREE_SEQ + "' ");
		// System.out.println(sf.toString());
		Map<String, Object> projInfo = (Map<String, Object>) jdbcTemplate
				.queryForList(sf.toString()).get(0);
		Date WORK_SDATE = (Date) projInfo.get("work_sdate");
		Date WORK_EDATE = (Date) projInfo.get("work_edate");
		if (WORK_SDATE != null) {

			projInfo.put("work_sdate", sdf.format(WORK_SDATE));
		}
		if (WORK_EDATE != null) {
			projInfo.put("work_edate", sdf.format(WORK_EDATE));
		}
		agrPay.put("projInfo", projInfo);
		sf = new StringBuffer();
		sf.append("SELECT A.COMPACT_ID,GET_SEQ,GET_DATE,GET_AMT ");
		sf.append("FROM CHDPSDB.DBO.pms_compact A ");
		sf.append("JOIN CHDPSDB.DBO.pms_compact_dtl2 B ON A.COMPACT_ID = B.COMPACT_ID ");
		sf.append("WHERE A.PROJ_ID = '" + projInfo.get("proj_id") + "' ");
		List<Map<String, Object>> pcomInfos = jdbcTemplate.queryForList(sf
				.toString());
		for (Map<String, Object> pcomInfo : pcomInfos) {
			Date GET_DATE = (Date) pcomInfo.get("GET_DATE");
			pcomInfo.put("GET_DATE", sdf.format(GET_DATE));
		}
		agrPay.put("pcomInfos", pcomInfos);
		sf = new StringBuffer();
		sf.append("select a.agree_seq AGREE_SEQ,a.pay_seq PAY_SEQ,a.pay_date PAY_DATE,a.pay_amount PAY_AMOUNT,a.manage_cost MANAGE_COST,a.tax_cost TAX_COST,a.oth_cost OTH_COST,a.bail_cost BAIL_COST,a.sign_status SIGN_STATUS from jms_agreementpay_dtl a where agree_seq = '"
				+ AGREE_SEQ + "' ");
		List<Map<String, Object>> agrPayDtlInfos = jdbcTemplate.queryForList(sf
				.toString());
		for (Map<String, Object> agrPayDtl : agrPayDtlInfos) {
			agrPayDtl.put("PAY_DATE", sdf.format(agrPayDtl.get("PAY_DATE")));
			Integer SIGN_STATUS = (Integer) agrPayDtl.get("SIGN_STATUS");
			if (SIGN_STATUS == 0) {
				agrPayDtl.put("SIGN_STATUSTEXT", "制作中");
			} else if (SIGN_STATUS == 1) {
				agrPayDtl.put("SIGN_STATUSTEXT", "送出批签");
			} else if (SIGN_STATUS == 2) {
				agrPayDtl.put("SIGN_STATUSTEXT", "批签完成");
			}
		}
		agrPay.put("agrPayDtlInfos", agrPayDtlInfos);
		return JSONHelper.map2json(agrPay);
	}

	@Override
	public String delAgrPay(String aGREE_SEQS) {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer("select count (agree_seq) from JMS_AGREEMENTPAY_DTL2 where agree_seq in ( ") ;
		for (String agree_seq : aGREE_SEQS.split(",")) {
			sf.append("?,");
		}
		String sql = sf.substring(0, sf.length()-1)+") ";
		
		int countDel = jdbcTemplate.queryForInt(sql,aGREE_SEQS.split(","));
		
		if(countDel > 0){
			
			return "删除失败，记录已被退保证金所引用";
		}else{
		
		for (String agree_seq : aGREE_SEQS.split(",")) {
			delAgr(agree_seq);
		}
		return "删除成功";
	    }
	}
	private String delAgr(String agree_seq) {
		String sql = "delete from JMS_AGREEMENTPAY_DTL  where AGREE_SEQ = '"
				+ agree_seq + "' ";
		int count = jdbcTemplate.update(sql);
		String sql0 = "delete from JMS_AGREEMENTPAY where AGREE_SEQ = '"
				+ agree_seq + "' ";
		int count0 = jdbcTemplate.update(sql0);
		if (count > 1 && count0 > 1) {
			return "删除成功";
		} else {
			return "删除失败";
		}

	}

	// 申请付款===============结束=========================================================

	@Override
	public String loadAgrePay() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAgrPercents(String proj_id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String loadQuaInfos() {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		sf.append("SELECT A.quality_seq,A.frans_id, ");
		sf.append("B.cmp_name,B.cmp_sname,B.cmp_charger ");
		sf.append("FROM JMS_QUALITYMARGIN A ");
		sf.append("JOIN JMS_COMPANY B ON A .NICK =B.NICK AND A .FRANS_ID =B.CMP_ID ");
		sf.append("WHERE A.NICK=0 ");
		List<Map<String, Object>> quaInfos = jdbcTemplate.queryForList(sf
				.toString());
		return JSONHelper.array2json(quaInfos);
	}

	@Override
	public String getAgrPercents(String proj_id, String agree_seq,
			String compact_amt) {
		StringBuffer sb = new StringBuffer();
		sb.append("select sum(get_amt) sum_amt ");
		sb.append("from CHDPSDB.DBO.pms_compact_dtl2 pac ");
		sb.append("left join CHDPSDB.DBO.pms_compact cpc on cpc.compact_id = pac.compact_id ");
		sb.append("where cpc.proj_id ='" + proj_id + "' ");
		List<Map<String, Object>> pacts = (List<Map<String, Object>>) jdbcTemplate
				.queryForList(sb.toString());
		Map<String, Object> a = pacts.get(0);

		StringBuffer sf = new StringBuffer();
		sf.append("select tax_ratio, mdeduct_ratio, oth_ratio ");
		sf.append("from JMS_AGREEMENT ");
		sf.append("where agree_seq = '" + agree_seq + "' ");
		List<Map<String, Object>> ratios = jdbcTemplate.queryForList(sf
				.toString());
		Map<String, Object> b = ratios.get(0);

		StringBuffer sk = new StringBuffer();
		sk.append("select manage_cost, tax_cost, oth_cost ");
		sk.append("from JMS_AGREEMENTPAY_DTL ");
		sk.append("where agree_seq = '" + agree_seq + "' ");
		List<Map<String, Object>> costs = jdbcTemplate.queryForList(sk
				.toString());
		Map<String, Object> c = costs.get(0);

		StringBuffer sd = new StringBuffer();
		sd.append("select bail_ratio ");
		sd.append("from JMS_AGREEMENT ");
		sd.append("where agree_seq = '" + agree_seq + "' ");
		List<Map<String, Object>> detcosts = jdbcTemplate.queryForList(sd
				.toString());
		Map<String, Object> d = detcosts.get(0);

		StringBuffer sh = new StringBuffer();
		sh.append("select sum(bail_cost) bail_cost ");
		sh.append("from JMS_AGREEMENTPAY_DTL ");
		sh.append("where agree_seq = '" + agree_seq + "' ");
		List<Map<String, Object>> sdecosts = jdbcTemplate.queryForList(sh
				.toString());
		Map<String, Object> e = sdecosts.get(0);

		Map<String, Object> data = new HashMap<String, Object>();
		String pact = "";
		if(a.get("sum_amt")!=null){
			pact = a.get("sum_amt").toString();
		}

		BigDecimal gd = (BigDecimal) b.get("tax_ratio");
		BigDecimal gd1 = (BigDecimal) b.get("mdeduct_ratio");
		BigDecimal gd2 = (BigDecimal) b.get("oth_ratio");
		BigDecimal s1 = null;

		BigDecimal cd = (BigDecimal) c.get("manage_cost");
		BigDecimal cd1 = (BigDecimal) c.get("tax_cost");
		BigDecimal cd2 = (BigDecimal) c.get("oth_cost");
		BigDecimal redcost = cd.add(cd1.add(cd2));
		BigDecimal detcost = null;
		BigDecimal p2 = null;
		if(compact_amt!=null&&!compact_amt.equals("")&&!compact_amt.equals("null")){
			s1 = BigDecimal.valueOf(Double.valueOf(compact_amt
					.toString()));
			BigDecimal dd = (BigDecimal) d.get("bail_ratio");
			detcost = dd.multiply(s1).divide(BigDecimal.valueOf(100));
			BigDecimal proSum = gd.add(gd1.add(gd2)).multiply(s1);
			BigDecimal p1 = new BigDecimal(100);
			p2 = proSum.divide(p1, 2, BigDecimal.ROUND_HALF_UP);
		}

		BigDecimal bail_cost = (BigDecimal) e.get("bail_cost");

		data.put("sum_amt", pact);
		data.put("proj_sum", p2);
		data.put("redcost", redcost);
		data.put("detcost", detcost);
		data.put("bail_cost", bail_cost);
		return JSONHelper.map2json(data);

	}

	@Override
	public String saveOrEditAgrPayDelInfo(final AgrPayInfo agrPayInfo,
			final List<agrPayDtl2> agrPayDtlAddInfos,
			final List<agrPayDtl2> agrPayDtlEditInfos, String agrPayDtlsDelArr,
			String optType) {
		StringBuffer sf = new StringBuffer();
		if (optType.equals("0")) {
			sf.append("update jms_agreementpay set returnbail_flag = ? ");
			jdbcTemplate.update(sf.toString(),
					new Object[] { agrPayInfo.getReturnbail_flag() });
			sf = new StringBuffer();
			sf.append("insert into jms_agreementpay_dtl2(agree_seq,return_date,return_amount) values(?,?,?) ");
			jdbcTemplate.batchUpdate(sf.toString(),
					new BatchPreparedStatementSetter() {

						@Override
						public int getBatchSize() {
							// TODO Auto-generated method stub

							return agrPayDtlAddInfos.size();
						}

						@Override
						public void setValues(PreparedStatement ps, int i)
								throws SQLException {
							// TODO Auto-generated method stub
							ps.setObject(1, agrPayDtlAddInfos.get(i)
									.getAGREE_SEQ());
							ps.setObject(2, agrPayDtlAddInfos.get(i)
									.getRETURE_DATE());
							ps.setObject(3, agrPayDtlAddInfos.get(i)
									.getRETURN_AMOUNT());
						}

					});
		} else {
			// System.out.println(agrPayDtlAddInfos.size());
			jdbcTemplate
					.update("update jms_agreementpay set returnbail_flag = ? where agree_seq = ? ",
							new Object[] { agrPayInfo.getReturnbail_flag(),
									agrPayInfo.getAgree_seq() });

			// System.out.println(agrPayDtlsDelArr);
			if (!agrPayDtlsDelArr.equals("")) {
				/*
				 * sf.append(
				 * "delete from jms_agreementpay_dtl2 where agree_seq = ? and return_date in ("
				 * ); for(String str : agrPayDtlsDelArr.split(",")){
				 * sf.append(str+","); } String sql =
				 * sf.toString().substring(0,sf.toString().length()-1)+") ";
				 * 
				 * System.out.println(sql); jdbcTemplate.update(sql,new
				 * Object[]{agrPayInfo.getAgree_seq()});
				 */
				final String agrPayDtlsDel = agrPayDtlsDelArr;
				sf = new StringBuffer();
				sf.append("delete from jms_agreementpay_dtl2 where agree_seq = ? and return_date = ? ");
				jdbcTemplate.batchUpdate(sf.toString(),
						new BatchPreparedStatementSetter() {

							@Override
							public int getBatchSize() {
								// TODO Auto-generated method stub

								return agrPayDtlsDel.split(",").length;
							}

							@Override
							public void setValues(PreparedStatement ps, int i)
									throws SQLException {
								// TODO Auto-generated method stub
								ps.setObject(1, agrPayInfo.getAgree_seq());
								ps.setObject(2, agrPayDtlsDel.split(",")[i]);

							}

						});

			}

			sf = new StringBuffer();

			sf.append("insert into jms_agreementpay_dtl2(agree_seq,return_date,return_amount) values(?,?,?) ");
			jdbcTemplate.batchUpdate(sf.toString(),
					new BatchPreparedStatementSetter() {

						@Override
						public int getBatchSize() {
							// TODO Auto-generated method stub

							return agrPayDtlAddInfos.size();
						}

						@Override
						public void setValues(PreparedStatement ps, int i)
								throws SQLException {
							// TODO Auto-generated method stub
							ps.setObject(1, agrPayDtlAddInfos.get(i)
									.getAGREE_SEQ());
							ps.setObject(2, agrPayDtlAddInfos.get(i)
									.getRETURE_DATE());
							ps.setObject(3, agrPayDtlAddInfos.get(i)
									.getRETURN_AMOUNT());

						}

					});

			sf = new StringBuffer();
			sf.append("update jms_agreementpay_dtl2 set return_amount=? where agree_seq=? and return_date=? ");

			jdbcTemplate.batchUpdate(sf.toString(),
					new BatchPreparedStatementSetter() {

						@Override
						public int getBatchSize() {
							// TODO Auto-generated method stub

							return agrPayDtlEditInfos.size();
						}

						@Override
						public void setValues(PreparedStatement ps, int i)
								throws SQLException {
							// TODO Auto-generated method stub
							ps.setObject(1, agrPayDtlEditInfos.get(i)
									.getRETURN_AMOUNT());
							ps.setObject(2, agrPayDtlEditInfos.get(i)
									.getAGREE_SEQ());
							ps.setObject(3, agrPayDtlEditInfos.get(i)
									.getRETURE_DATE());

						}

					});

		}
		return null;
	}

	@Override
	public String loadAgrPay() {
		SimpleDateFormat dat = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sb = new StringBuffer();
		sb.append("select pro.proj_id ,pro.proj_sname, cmp.compact_id,com.cmp_sname,cmp.work_sdate,cmp.work_edate,ag.retrun_amount ,ag.agree_seq ");
		sb.append("from (select agree_seq,sum(return_amount) retrun_amount from jms_agreementpay_dtl2 group by agree_seq) ag ");
		sb.append("left join jms_agreement agr on agr.agree_seq = ag.agree_seq ");
		sb.append("left join CHDPSDB.DBO.pms_project pro on pro.proj_no = agr.proj_no ");
		sb.append("left join CHDPSDB.DBO.pms_compact cmp on cmp.proj_id = pro.proj_id ");
		sb.append("left join jms_company com on com.cmp_id = agr.frans_id where agr.nick =0 ");
		List<Map<String, Object>> sfs = jdbcTemplate
				.queryForList(sb.toString());
		for (Map<String, Object> sf : sfs) {
			Date work_sdate = (Date) sf.get("work_sdate");
			if(work_sdate!=null){
				sf.put("work_sdate", dat.format(work_sdate));
			}
			Date work_edate = (Date) sf.get("work_edate");
			if(work_edate!=null){
				sf.put("work_edate", dat.format(work_edate));
			}
		}
		// System.out.println(sfs);
		return JSONHelper.array2json(sfs);
	}

	@Override
	public String getPayamByFranID(String frans_id) {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		sf.append("select sum(pay_amount) pay_amount from jms_agreementpay_dtl a ");
		sf.append("left join jms_agreement b on a.agree_seq = b.agree_seq ");
		sf.append("where b.frans_id = '" + frans_id + "' ");
		Map<String, Object> data = new HashMap<String, Object>();
		data.put("payam",
				jdbcTemplate.queryForMap(sf.toString()).get("pay_amount"));
		return JSONHelper.map2json(data);
	}

	@Override
	public String loadAgrPayById(String AGREE_SEQ) {
		// TODO Auto-generated method stub
		StringBuffer so = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

		so.append("select * from jms_agreementpay where agree_seq = '"
				+ AGREE_SEQ + "' ");
		Map<String, Object> agreePay = (Map<String, Object>) jdbcTemplate
				.queryForList(so.toString()).get(0);
		so = new StringBuffer();
		so.append("select g.agree_seq,a.frans_id,f.cmp_sname,b.proj_no,b.proj_id,b.proj_name,b.proj_sname,c.work_sdate,c.work_edate,d.sd_money,e.compact_amt ");
		so.append("from jms_fproj_reg a ");
		so.append("join chdpsdb.dbo.pms_project b on a.pre_regseq=b.pre_regseq ");
		so.append("left join chdpsdb.dbo.pms_startwork c on b.proj_no=c.proj_no ");
		so.append("left join chdpsdb.dbo.pps_project_flow d on b.proj_id =d.proj_id ");
		so.append("left join (select proj_id,sum(compact_amt) compact_amt from chdpsdb.dbo.pms_compact group by proj_id) e on b.proj_id=e.proj_id ");
		so.append("join jms_compaNy f on a.frans_id =f.cmp_id and a.nick=f.nick ");
		so.append("left join jms_agreement g on g.proj_no = b.proj_no ");
		so.append("where g.agree_seq = '" + AGREE_SEQ + "' ");
		Map<String, Object> ProjPay = (Map<String, Object>) jdbcTemplate
				.queryForList(so.toString()).get(0);
		Date WORK_SDATE = (Date) ProjPay.get("work_sdate");
		Date WORK_EDATE = (Date) ProjPay.get("work_edate");
		if (WORK_SDATE != null) {

			ProjPay.put("work_sdate", sdf.format(WORK_SDATE));
		}
		if (WORK_EDATE != null) {
			ProjPay.put("work_edate", sdf.format(WORK_EDATE));
		}
		agreePay.put("projInfo", ProjPay);
		/*
		 * System.out.println(ProjPay);
		 */

		StringBuffer sb = new StringBuffer();
		sb.append("select sum(get_amt) sum_amt ");
		sb.append("from CHDPSDB.DBO.pms_compact_dtl2 pac ");
		sb.append("left join CHDPSDB.DBO.pms_compact cpc on cpc.compact_id = pac.compact_id ");
		sb.append("where cpc.proj_id ='" + ProjPay.get("proj_id") + "' ");
		List<Map<String, Object>> pacts = (List<Map<String, Object>>) jdbcTemplate
				.queryForList(sb.toString());
		Map<String, Object> a = pacts.get(0);

		StringBuffer sf = new StringBuffer();
		sf.append("select tax_ratio, mdeduct_ratio, oth_ratio ");
		sf.append("from JMS_AGREEMENT ");
		sf.append("where agree_seq = '" + ProjPay.get("agree_seq") + "' ");
		List<Map<String, Object>> ratios = jdbcTemplate.queryForList(sf
				.toString());
		Map<String, Object> b = ratios.get(0);

		StringBuffer sk = new StringBuffer();
		sk.append("select manage_cost, tax_cost, oth_cost ");
		sk.append("from JMS_AGREEMENTPAY_DTL ");
		sk.append("where agree_seq = '" + ProjPay.get("agree_seq") + "' ");
		List<Map<String, Object>> costs = jdbcTemplate.queryForList(sk
				.toString());
		Map<String, Object> c = costs.get(0);

		StringBuffer sd = new StringBuffer();
		sd.append("select bail_ratio ");
		sd.append("from JMS_AGREEMENT ");
		sd.append("where agree_seq = '" + ProjPay.get("agree_seq") + "' ");
		List<Map<String, Object>> detcosts = jdbcTemplate.queryForList(sd
				.toString());
		Map<String, Object> d = detcosts.get(0);

		StringBuffer sh = new StringBuffer();
		sh.append("select bail_cost ");
		sh.append("from JMS_AGREEMENTPAY_DTL ");
		sh.append("where agree_seq = '" + ProjPay.get("agree_seq") + "' ");
		List<Map<String, Object>> sdecosts = jdbcTemplate.queryForList(sh
				.toString());
		Map<String, Object> e = sdecosts.get(0);

		Map<String, Object> data = new HashMap<String, Object>();
		BigDecimal pact = null;
		if(a.get("sum_amt")!=null){
			pact = BigDecimal.valueOf(Double.valueOf(a.get("sum_amt")
					.toString()));
		}

		BigDecimal gd = (BigDecimal) b.get("tax_ratio");
		BigDecimal gd1 = (BigDecimal) b.get("mdeduct_ratio");
		BigDecimal gd2 = (BigDecimal) b.get("oth_ratio");
		BigDecimal s1 = null;
		BigDecimal p2 = null;
		BigDecimal detcost = null;
		if(ProjPay.get("compact_amt")!=null){
			s1 = BigDecimal.valueOf(Double.valueOf(ProjPay.get(
							"compact_amt").toString()));
			BigDecimal proSum = gd.add(gd1.add(gd2)).multiply(s1);
			BigDecimal p1 = new BigDecimal(100);
			p2 = proSum.divide(p1, 2, BigDecimal.ROUND_HALF_UP);
			BigDecimal dd = (BigDecimal) d.get("bail_ratio");
			detcost = dd.multiply(s1).divide(BigDecimal.valueOf(100));
		}

		BigDecimal cd = (BigDecimal) c.get("manage_cost");
		BigDecimal cd1 = (BigDecimal) c.get("tax_cost");
		BigDecimal cd2 = (BigDecimal) c.get("oth_cost");
		BigDecimal redcost = cd.add(cd1.add(cd2));


		BigDecimal bail_cost = (BigDecimal) e.get("bail_cost");

		data.put("sum_amt", pact);
		data.put("proj_sum", p2);
		data.put("redcost", redcost);
		data.put("detcost", detcost);
		data.put("bail_cost", bail_cost);
		data.put("decost", p2.subtract(redcost));
		agreePay.put("cost", data);

		sb = new StringBuffer();
		sb.append("select agree_seq AGREE_SEQ,return_date as RETURE_DATE,return_amount as RETURN_AMOUNT from jms_agreementpay_dtl2 dtl2 where agree_seq = '"
				+ AGREE_SEQ + "' ");
		List<Map<String, Object>> dtl2 = jdbcTemplate.queryForList(sb
				.toString());
		for (Map<String, Object> dtl : dtl2) {
			Date return_date = (Date) dtl.get("RETURE_DATE");
			dtl.put("RETURE_DATE", sdf.format(return_date));
		}
		agreePay.put("dtl2", dtl2);

		return JSONHelper.map2json(agreePay);

	}

	@Override
	public String delAgrPay2(String AGREE_SEQ) {
		for (String agree_seq : AGREE_SEQ.split(",")) {
			jdbcTemplate.update(
					"delete from jms_agreementpay_dtl2 where agree_seq = ?",
					new Object[] { agree_seq });
		}
		return "删除成功";
	}

	@Override
	public String Certificates() {
		// TODO Auto-generated method stub
		String sql = "select CMPQUAL_SEQ as id,D_NAME as text from CHJMS.DBO.JMS_BASICDATA WHERE D_TYPE=2";
		return JSONHelper.array2json(jdbcTemplate.queryForList(sql));
	}

	@Override
	public String loadStaff(String cmpqual_seq) {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		sf.append("select A.STAFF_ID,B.STAFF_NAME ");
		sf.append("FROM CHDPSDB.DBO.CHD_STAFF_DTL A ");
		sf.append("JOIN CHDPSDB.DBO.CHD_STAFF B ON ");
		sf.append("A.STAFF_ID=B.STAFF_ID ");
		sf.append("WHERE A.CMPQUAL_SEQ='" + cmpqual_seq
				+ "' AND B.AR_DATE IS NULL ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sf
				.toString());
		return JSONHelper.array2json(list);
	}

	@Override
	public String loadRen() {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		sf.append("SELECT STAFF_ID,STAFF_NAME,LD_FLAG ");
		sf.append("FROM CHDPSDB.DBO.CHD_STAFF ");
		sf.append("WHERE LD_FLAG = 1 ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sf
				.toString());
		return JSONHelper.array2json(list);

	}

	@Override
	public String loadBidCon() {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		sf.append("SELECT STAFF_ID,STAFF_NAME,LD_FLAG ");
		sf.append("FORM CHDPSDB.DBO.CHD_STAFF ");
		sf.append("WHERE YL_FLAG = 1 ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sf
				.toString());

		return JSONHelper.array2json(list);
	}

	@Override
	public String searchFproj(String cmp_id,String filterStr) {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		sf.append("select a.pre_regseq,a.pre_no,a.proj_type,a.reg_date,a.proj_name,a.proj_sname,a.proj_addr,a.frans_id,b.cmp_sname cust_cmp,b.cmp_contactor1 cust_contactor,b.cmp_tel1 cust_tel,c.cmp_sname fran_sname,c.cmp_contactor1 fran_contactor,c.cmp_tel1 fran_tel,d.cmp_sname reg_cmp,e.dept_sname reg_dept,f.staff_name charger ");
		sf.append("from jms_fproj_reg a ");
		sf.append("left join chdpsdb.dbo.chd_company b on a.cust_cmp = b.cmp_id ");
		sf.append("left join jms_company c on a.frans_id = c.cmp_id ");
		sf.append("left join chdpsdb.dbo.chd_company d on a.cmp_id = d.cmp_id ");
		sf.append("left join chdpsdb.dbo.chd_dept e on a.dept_id = e.dept_id ");
		sf.append("left join chdpsdb.dbo.chd_staff f on a.charger = f.staff_id ");
		sf.append("where 1=1 ");
		if (!(cmp_id == null || cmp_id.equals(""))) {
			sf.append("and a.frans_id = '" + cmp_id + "' ");
		}
		if (!(filterStr == null || filterStr.equals(""))) {
			sf.append("and a.pre_regseq not in (select pre_regseq from "+filterStr+" ) ");
		}
		System.out.println(sf.toString());
		List<Map<String, Object>> datas = jdbcTemplate.queryForList(sf
				.toString());
		for (Map<String, Object> data : datas) {
			data.put("reg_date", sdf.format(data.get("reg_date")));
			
		/*	
			String sql = "select pre_regseq from jms_fproj_tender ";
			List<Map<String,Object>> a = jdbcTemplate.queryForList(sql);
			for(Map<String,Object> b : a){
				if() ("pre_regseq") == data.get("pre_regseq")){
					
				}
			}*/
			
		}
		
		return JSONHelper.array2json(datas);
	}

	@Override
	public String loadIns() {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		sf.append("SELECT STAFF_ID,STAFF_NAME,YL_FLAG ");
		sf.append("FROM CHDPSDB.DBO.CHD_STAFF ");
		sf.append("WHERE YL_FLAG = 1 ");
		List<Map<String, Object>> list = jdbcTemplate.queryForList(sf.toString());

		return JSONHelper.array2json(list);
	}

	@Override
	public String loadCmpIntelFiles() {
		// TODO Auto-generated method stub
		List<Map<String, Object>> datas = jdbcTemplate
				.queryForList("select cmpqual_seq,d_name from JMS_BASICDATA where d_type = '1' order by line_no ");
		return JSONHelper.array2json(datas);
	}

	// ==============================================
	@Override
	public String saveOrEditFprojTender(FprojTender fprojTender,
			final List<FrojTenderDtlB> pZhengsAddArrs,
			final List<FrojTenderDtlC> pContractsAddArrs,
			final List<FrojTenderDtlC> pInsuranceAddArrs,
			final List<FrojTenderDtlC> tContractsAddArrs,
			final List<FrojTenderDtlC> tInsuranceAddArrs,
			final List<FrojTenderDtlB> tZhengAddArrs,
			final List<FprojTenderDtlA> pComs,
			final List<FprojTenderDtlA> tcoms, String optType) {
		// TODO Auto-generated method stub
		String sql;

		
	if (optType.equals("0")) {
			
		sql = "insert into JMS_FPROJ_TENDER(pre_regseq,file_date,pre_flag,pre_date,pre_ori_flag,tender_date,ori_flag,comp_honor,comp_performance,remarks) values(?,?,?,?,?,?,?,?,?,?) ";
			jdbcTemplate.update(
					sql,
					new Object[] { fprojTender.getPre_regseq(),
							fprojTender.getFile_date(),
							fprojTender.getPre_flag(),
							fprojTender.getPre_date(),
							fprojTender.getPre_ori_flag(),
							fprojTender.getTender_date(),
							fprojTender.getOri_flag(),
							fprojTender.getComp_honor(),
							fprojTender.getComp_performance(),
							fprojTender.getRemarks() });
			
		}else{
			
			sql="update JMS_FPROJ_TENDER set file_date=?,pre_flag=?,pre_date=?,pre_ori_flag=?,tender_date=?,ori_flag=?,comp_honor=?,comp_performance=?,remarks=?" +
					"where pre_regseq=?";
			jdbcTemplate.update(
					sql,
					new Object[] { 
							fprojTender.getFile_date(),
							fprojTender.getPre_flag(),
							fprojTender.getPre_date(),
							fprojTender.getPre_ori_flag(),
							fprojTender.getTender_date(),
							fprojTender.getOri_flag(),
							fprojTender.getComp_honor(),
							fprojTender.getComp_performance(),
							fprojTender.getRemarks(),
							fprojTender.getPre_regseq()});
			sql="delete JMS_FPROJ_TENDER_DTLA where pre_regseq=?";
			jdbcTemplate.update(
					sql,
					new Object[] {
							fprojTender.getPre_regseq()});

			sql="delete JMS_FPROJ_TENDER_DTLB where pre_regseq=?";
			jdbcTemplate.update(
					sql,
					new Object[] {
							fprojTender.getPre_regseq()});

			sql="delete JMS_FPROJ_TENDER_DTLC where pre_regseq=?";
			jdbcTemplate.update(
					sql,
					new Object[] {
							fprojTender.getPre_regseq()});
		}
		
		sql = "insert into JMS_FPROJ_TENDER_DTLA(pre_regseq,i_type,cmpqual_seq) values(?,?,?) ";
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return pComs.size();
			}

			@Override
			public void setValues(PreparedStatement ps, int i)
					throws SQLException {
				// TODO Auto-generated method stub
				ps.setObject(1, pComs.get(i).getPre_regseq());
				ps.setObject(2, pComs.get(i).getI_type());
				ps.setObject(3, pComs.get(i).getCmpqual_seq());
			}
		});
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return tcoms.size();
			}

			@Override
			public void setValues(PreparedStatement ps, int i)
					throws SQLException {
				// TODO Auto-generated method stub
				ps.setObject(1, tcoms.get(i).getPre_regseq());
				ps.setObject(2, tcoms.get(i).getI_type());
				ps.setObject(3, tcoms.get(i).getCmpqual_seq());
			}
		});
		sql = "insert into JMS_FPROJ_TENDER_DTLB(pre_regseq,i_type,cmpqual_seq,staff_id1,staff_id2,staff_id3,staff_id4,staff_id5,staff_id6,staff_id7,staff_id8,staff_id9,staff_id10) values(?,?,?,?,?,?,?,?,?,?,?,?,?) ";
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return pZhengsAddArrs.size();
			}

			@Override
			public void setValues(PreparedStatement ps, int i)
					throws SQLException {
				ps.setObject(1, pZhengsAddArrs.get(i).getPre_regseq());

				ps.setObject(2, pZhengsAddArrs.get(i).getI_type());
				ps.setObject(3, pZhengsAddArrs.get(i).getCmpqual_seq());
				ps.setObject(4, pZhengsAddArrs.get(i).getStaff_id1());
				ps.setObject(5, pZhengsAddArrs.get(i).getStaff_id2());
				ps.setObject(6, pZhengsAddArrs.get(i).getStaff_id3());
				ps.setObject(7, pZhengsAddArrs.get(i).getStaff_id4());
				ps.setObject(8, pZhengsAddArrs.get(i).getStaff_id5());
				ps.setObject(9, pZhengsAddArrs.get(i).getStaff_id6());
				ps.setObject(10, pZhengsAddArrs.get(i).getStaff_id7());
				ps.setObject(11, pZhengsAddArrs.get(i).getStaff_id8());
				ps.setObject(12, pZhengsAddArrs.get(i).getStaff_id9());
				ps.setObject(13, pZhengsAddArrs.get(i).getStaff_id10());
			}
		});
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return tZhengAddArrs.size();
			}

			@Override
			public void setValues(PreparedStatement ps, int i)
					throws SQLException {
				ps.setObject(1, tZhengAddArrs.get(i).getPre_regseq());
				ps.setObject(2, tZhengAddArrs.get(i).getI_type());
				ps.setObject(3, tZhengAddArrs.get(i).getCmpqual_seq());
				ps.setObject(4, tZhengAddArrs.get(i).getStaff_id1());
				ps.setObject(5, tZhengAddArrs.get(i).getStaff_id2());
				ps.setObject(6, tZhengAddArrs.get(i).getStaff_id3());
				ps.setObject(7, tZhengAddArrs.get(i).getStaff_id4());
				ps.setObject(8, tZhengAddArrs.get(i).getStaff_id5());
				ps.setObject(9, tZhengAddArrs.get(i).getStaff_id6());
				ps.setObject(10, tZhengAddArrs.get(i).getStaff_id7());
				ps.setObject(11, tZhengAddArrs.get(i).getStaff_id8());
				ps.setObject(12, tZhengAddArrs.get(i).getStaff_id9());
				ps.setObject(13, tZhengAddArrs.get(i).getStaff_id10());
			}

		});
		sql = "insert into JMS_FPROJ_TENDER_DTLC (pre_regseq,i_type,p_type,staff_id) values(?,?,?,?) ";
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {
			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return pContractsAddArrs.size();
			}

			@Override
			public void setValues(PreparedStatement ps, int i)
					throws SQLException {
				ps.setObject(1, pContractsAddArrs.get(i).getPre_regseq());
				ps.setObject(2, pContractsAddArrs.get(i).getI_type());
				ps.setObject(3, pContractsAddArrs.get(i).getP_type());
				ps.setObject(4, pContractsAddArrs.get(i).getSTAFF_ID());
			}
		});
		// sql =
		// "insert into JMS_FPROJ_TENDER_DTLC(pre_regseq,i_type,p_type,staff_id) values(?,?,?,?) ";
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return pInsuranceAddArrs.size();
			}

			@Override
			public void setValues(PreparedStatement ps, int i)
					throws SQLException {
				ps.setObject(1, pInsuranceAddArrs.get(i).getPre_regseq());
				ps.setObject(2, pInsuranceAddArrs.get(i).getI_type());
				ps.setObject(3, pInsuranceAddArrs.get(i).getP_type());
				ps.setObject(4, pInsuranceAddArrs.get(i).getSTAFF_ID());
			}
		});
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return tContractsAddArrs.size();
			}

			@Override
			public void setValues(PreparedStatement ps, int i)
					throws SQLException {
				ps.setObject(1, tContractsAddArrs.get(i).getPre_regseq());
				ps.setObject(2, tContractsAddArrs.get(i).getI_type());
				ps.setObject(3, tContractsAddArrs.get(i).getP_type());
				ps.setObject(4, tContractsAddArrs.get(i).getSTAFF_ID());
			}
		});
		jdbcTemplate.batchUpdate(sql, new BatchPreparedStatementSetter() {

			@Override
			public int getBatchSize() {
				// TODO Auto-generated method stub
				return tInsuranceAddArrs.size();
			}

			@Override
			public void setValues(PreparedStatement ps, int i)
					throws SQLException {
				ps.setObject(1, tInsuranceAddArrs.get(i).getPre_regseq());
				ps.setObject(2, tInsuranceAddArrs.get(i).getI_type());
				ps.setObject(3, tInsuranceAddArrs.get(i).getP_type());
				ps.setObject(4, tInsuranceAddArrs.get(i).getSTAFF_ID());
			}
		});

		return null;
	}

	// =======================================================================

	@Override
	public String loadTender() {
		// TODO Auto-generated method stub
		SimpleDateFormat dat = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT A.PRE_REGSEQ,B.PRE_NO,B.REG_DATE,B.PROJ_NAME,B.PROJ_SNAME, ");
		sb.append("C.CMP_SNAME C_NAME,C.CMP_CONTACTOR1 C_CONTACTOR,C.CMP_TEL1 C_TEL, ");
		sb.append("D.CMP_SNAME J_NAME,D.CMP_CONTACTOR1 J_CONTACTOR,D.CMP_TEL1 J_TEL, ");
		sb.append("A.FILE_DATE,A.TENDER_DATE, ");
		sb.append("F.CMP_SNAME REG_C_NAME,G.DEPT_NAME,H.STAFF_NAME ");
		sb.append("FROM CHJMS.DBO.JMS_FPROJ_TENDER A ");
		sb.append("JOIN CHJMS.DBO.JMS_FPROJ_REG B ON A.PRE_REGSEQ =B.PRE_REGSEQ ");
		sb.append("JOIN CHDPSDB.DBO.CHD_COMPANY C ON B.CUST_CMP =C.CMP_ID ");
		sb.append("JOIN CHJMS.DBO.JMS_COMPANY D ON B.FRANS_ID =D.CMP_ID AND D.NICK=0 ");
		sb.append("JOIN CHDPSDB.DBO.CHD_COMPANY F ON B.CMP_ID =F.CMP_ID ");
		sb.append("JOIN CHDPSDB.DBO.CHD_DEPT G ON B.CMP_ID=G.CMP_ID AND B.DEPT_ID=G.DEPT_ID ");
		sb.append("JOIN CHDPSDB.DBO.CHD_STAFF H ON B.CHARGER=H.STAFF_ID ");
		sb.append("WHERE B.NICK=0 ");
		List<Map<String, Object>> yus = jdbcTemplate
				.queryForList(sb.toString());
		for (Map<String, Object> yu : yus) {
			Date REG_DATE = (Date) yu.get("REG_DATE");
			yu.put("REG_DATE", dat.format(REG_DATE));
			Date FILE_DATE = (Date) yu.get("FILE_DATE");
			yu.put("FILE_DATE", dat.format(FILE_DATE));
			Date TENDER_DATE = (Date) yu.get("TENDER_DATE");
			yu.put("TENDER_DATE", dat.format(TENDER_DATE));

		}
		return com.glorisun.chd.core.util.JSONHelper.array2json(yus);
	}


	@Override
	public String loadTenderById(String pRE_REGSEQ) {
		// TODO Auto-generated method stub
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sf = new StringBuffer();
		sf.append("select * from CHJMS.DBO.JMS_FPROJ_TENDER where pre_regseq= '" + pRE_REGSEQ
				+ "'");
		Map<String, Object> ten = jdbcTemplate.queryForMap(sf.toString());
		ten.put("file_date",sdf.format(ten.get("file_date")));
		ten.put("pre_date",sdf.format(ten.get("pre_date")));
		ten.put("tender_date",sdf.format(ten.get("tender_date")));
		sf = new StringBuffer();
		sf.append("select a.pre_regseq,a.pre_no,a.proj_type,a.reg_date,a.proj_name,a.proj_sname,a.proj_addr,a.frans_id,b.cmp_sname cust_cmp,b.cmp_contactor1 cust_contactor,b.cmp_tel1 cust_tel,c.cmp_sname fran_sname,c.cmp_contactor1 fran_contactor,c.cmp_tel1 fran_tel,d.cmp_sname reg_cmp,e.dept_sname reg_dept,f.staff_name charger ");
		sf.append("from jms_fproj_reg a ");
		sf.append("left join chdpsdb.dbo.chd_company b on a.cust_cmp = b.cmp_id ");
		sf.append("left join jms_company c on a.frans_id = c.cmp_id ");
		sf.append("left join chdpsdb.dbo.chd_company d on a.cmp_id = d.cmp_id ");
		sf.append("left join chdpsdb.dbo.chd_dept e on a.dept_id = e.dept_id ");
		sf.append("left join chdpsdb.dbo.chd_staff f on a.charger = f.staff_id ");
		sf.append("where a.pre_regseq='"+pRE_REGSEQ+"'");
		Map<String, Object> yu = jdbcTemplate.queryForMap(sf.toString());
		ten.put("yu",yu);
		sf = new StringBuffer();
		sf.append("select * from JMS_FPROJ_TENDER_DTLA WHERE i_type=0 and pre_regseq='"+pRE_REGSEQ+"'");
		List<Map<String, Object>> dtla1 = jdbcTemplate
				.queryForList(sf.toString());
		ten.put("dtla1",dtla1);
		sf = new StringBuffer();
		sf.append("select * from JMS_FPROJ_TENDER_DTLA WHERE i_type=1 and pre_regseq='"+pRE_REGSEQ+"'");
		List<Map<String, Object>> dtla2 = jdbcTemplate
				.queryForList(sf.toString());
		ten.put("dtla2",dtla2);
		sf = new StringBuffer();
		sf.append("select a.*,b.staff_name staff1,c.staff_name staff2,d.staff_name staff3,e.staff_name staff4,f.staff_name staff5,g.staff_name staff6,h.staff_name staff7,i.staff_name staff8,j.staff_name staff9,k.staff_name staff10,l.D_NAME seq from jms_fproj_tender_dtlb a ");
		sf.append("left join CHDPSDB.DBO.chd_staff b on a.staff_id1=b.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff c on a.staff_id2=c.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff d on a.staff_id3=d.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff e on a.staff_id4=e.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff f on a.staff_id5=f.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff g on a.staff_id6=g.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff h on a.staff_id7=h.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff i on a.staff_id8=i.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff j on a.staff_id9=j.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff k on a.staff_id10=k.staff_id ");
		sf.append("left join JMS_BASICDATA l on a.cmpqual_seq=l.CMPQUAL_SEQ ");
		sf.append("where a.pre_regseq='"+pRE_REGSEQ+"' and a.i_type=0 ");
		List<Map<String, Object>> zheng1 = jdbcTemplate
				.queryForList(sf.toString());
		ten.put("zheng1",zheng1);
		sf = new StringBuffer();
		sf.append("select a.*,b.staff_name staff1,c.staff_name staff2,d.staff_name staff3,e.staff_name staff4,f.staff_name staff5,g.staff_name staff6,h.staff_name staff7,i.staff_name staff8,j.staff_name staff9,k.staff_name staff10,l.D_NAME seq from jms_fproj_tender_dtlb a ");
		sf.append("left join CHDPSDB.DBO.chd_staff b on a.staff_id1=b.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff c on a.staff_id2=c.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff d on a.staff_id3=d.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff e on a.staff_id4=e.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff f on a.staff_id5=f.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff g on a.staff_id6=g.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff h on a.staff_id7=h.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff i on a.staff_id8=i.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff j on a.staff_id9=j.staff_id ");
		sf.append("left join CHDPSDB.DBO.chd_staff k on a.staff_id10=k.staff_id ");
		sf.append("left join JMS_BASICDATA l on a.cmpqual_seq=l.CMPQUAL_SEQ ");
		sf.append("where a.pre_regseq='"+pRE_REGSEQ+"' and a.i_type=1 ");
		List<Map<String, Object>> zheng2 = jdbcTemplate
				.queryForList(sf.toString());
		ten.put("zheng2",zheng2);
		sf = new StringBuffer();
		sf.append("select a.pre_regseq,a.i_type,a.p_type,a.STAFF_ID,b.staff_name STAFF_NAME from JMS_FPROJ_TENDER_DTLC a ");
		sf.append("left join CHDPSDB.DBO.chd_staff b on a.staff_id=b.staff_id ");
		sf.append("where a.pre_regseq='"+pRE_REGSEQ+"' and a.i_type=0 and p_type=0");
		List<Map<String, Object>>  yushenglaodong= jdbcTemplate
				.queryForList(sf.toString());
		ten.put("yushenglaodong",yushenglaodong);
		sf = new StringBuffer();
		sf.append("select a.pre_regseq,a.i_type,a.p_type,a.STAFF_ID,b.staff_name STAFF_NAME from JMS_FPROJ_TENDER_DTLC a ");
		sf.append("left join CHDPSDB.DBO.chd_staff b on a.staff_id=b.staff_id ");
		sf.append("where a.pre_regseq='"+pRE_REGSEQ+"' and a.i_type=0 and p_type=1");
		List<Map<String, Object>>  yushengyanlao= jdbcTemplate
				.queryForList(sf.toString());
		ten.put("yushengyanlao",yushengyanlao);
		sf = new StringBuffer();
		sf.append("select a.pre_regseq,a.i_type,a.p_type,a.STAFF_ID,b.staff_name STAFF_NAME from JMS_FPROJ_TENDER_DTLC a ");
		sf.append("left join CHDPSDB.DBO.chd_staff b on a.staff_id=b.staff_id ");
		sf.append("where a.pre_regseq='"+pRE_REGSEQ+"' and a.i_type=1 and p_type=0");
		List<Map<String, Object>>  toubiaolaodong= jdbcTemplate
				.queryForList(sf.toString());
		ten.put("toubiaolaodong",toubiaolaodong);
		sf = new StringBuffer();
		sf.append("select a.pre_regseq,a.i_type,a.p_type,a.STAFF_ID,b.staff_name STAFF_NAME from JMS_FPROJ_TENDER_DTLC a ");
		sf.append("left join CHDPSDB.DBO.chd_staff b on a.staff_id=b.staff_id ");
		sf.append("where a.pre_regseq='"+pRE_REGSEQ+"' and a.i_type=1 and p_type=1");
		List<Map<String, Object>>  toubiaoyanlao= jdbcTemplate
				.queryForList(sf.toString());
		ten.put("toubiaoyanlao",toubiaoyanlao);
		return JSONHelper.map2json(ten);
		
	}


	@Override
	public String delTender(String pRE_REGSEQS) {
		// TODO Auto-generated method stub
		for(String pre_regseq : pRE_REGSEQS.split(",")){
			delPre(pre_regseq);
		}
		
		
		return "删除成功！";
	}
	
	
	
	private void delPre(String pre_regseq) {
		// TODO Auto-generated method stub
		String sql2 = "delete from JMS_FPROJ_TENDER_DTLA where pre_regseq = '"+pre_regseq+"' ";
		int count2 = jdbcTemplate.update(sql2);
		String sql3 = "delete from JMS_FPROJ_TENDER_DTLB where pre_regseq = '"+pre_regseq+"' ";
		int count3 = jdbcTemplate.update(sql3);
		String sql4 ="delete from JMS_FPROJ_TENDER_DTLC where pre_regseq = '"+pre_regseq+"' ";
		int count4 = jdbcTemplate.update(sql4);

		String sql1 = "delete from JMS_FPROJ_TENDER where pre_regseq = '"+pre_regseq+"' ";
		int count1 = jdbcTemplate.update(sql1);
		
	}

	@Override
	public String exportProj(String choice,LinkedHashMap<String, String> map) {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		DecimalFormat df = (DecimalFormat) NumberFormat.getInstance();
		df.setMaximumFractionDigits(2);
		if(choice.equals("1")){
			sf.append("SELECT A1.PROJ_NO,A1.PROJ_NAME,A1.PROJ_SNAME, ");
			sf.append("D.CMP_SNAME,D.CMP_CONTACTOR1, ");
			sf.append("B.PROJ_AREA,A2.CONTRACT_PRICE, ");
			sf.append("B.WORK_SDATE,B.WORK_EDATE, ");
			sf.append("CASE B.QUALITY_LEVEL WHEN 1 THEN '合格' WHEN 2 THEN '优良' END QUALITY_LEVEL, ");
			sf.append("A2.REC_AMOUNT,A2.OTH_AMOUNT, ");
			sf.append("E.LJ_DEDUCT,F.REC_MONEY+A2.BAIL_AMOUNT BAIL_AMOUNT, ");
			sf.append("E.BAIL_COST,G.GET_TOTAL, ");
			sf.append("A2.CONTRACT_PRICE-G.GET_TOTAL OWE_AMOUNT,E.PAY_AMOUNT,H.SALE_MONEY, ");
			sf.append("A2.CONTRACT_PRICE-H.SALE_MONEY NSALE_MONEY, ");
			sf.append("G.GET_TOTAL-H.SALE_MONEY  REAMIN_MONEY, ");
			sf.append("G.GET_TOTAL/A2.CONTRACT_PRICE*100 REC_RATIO ");
			sf.append("FROM CHJMS.DBO.JMS_FPROJ_REG A ");
			sf.append("JOIN CHDPSDB.DBO.PMS_PROJECT A1 ON A.PRE_REGSEQ =A1.PRE_REGSEQ ");
			sf.append("JOIN (SELECT PROJ_NO,SUM(CONTRACT_PRICE) CONTRACT_PRICE,SUM(CONTRACT_PRICE*(MDEDUCT_RATIO+TAX_RATIO)/100)REC_AMOUNT, ");
			sf.append("SUM(CONTRACT_PRICE*OTH_RATIO/100)  OTH_AMOUNT, ");
			sf.append("SUM(CONTRACT_PRICE*BAIL_RATIO/100) BAIL_AMOUNT ");
			sf.append("FROM CHJMS.DBO.JMS_AGREEMENT GROUP BY PROJ_NO)A2 ON A1.PROJ_NO =A2.PROJ_NO ");
			sf.append("JOIN CHDPSDB.DBO.PMS_STARTWORK B ON A1.PROJ_NO =B.PROJ_NO ");
			sf.append("JOIN CHJMS.DBO.JMS_COMPANY D ON A.FRANS_ID=D.CMP_ID AND D.NICK=0 ");
			sf.append("LEFT JOIN (SELECT BB.PROJ_NO,SUM(AA.MANAGE_COST+TAX_COST+OTH_COST) LJ_DEDUCT,SUM(AA.BAIL_COST) BAIL_COST, ");
			sf.append("SUM(AA.PAY_AMOUNT) PAY_AMOUNT ");
			sf.append("FROM CHJMS.DBO.JMS_AGREEMENTPAY_DTL AA ");
			sf.append("JOIN CHJMS.DBO.JMS_AGREEMENT BB ON AA.AGREE_SEQ =BB.AGREE_SEQ ");
			sf.append("GROUP BY BB.PROJ_NO) E ON E.PROJ_NO=A1.PROJ_NO ");
			sf.append("LEFT JOIN (SELECT AA.FRANS_ID,SUM(REC_MONEY) REC_MONEY ");
			sf.append("FROM CHJMS.DBO.JMS_PERFORMANCEBOND AA ");
			sf.append("JOIN CHJMS.DBO.JMS_PERFORMANCEBOND_DTLA BB ON AA.PERFORMANCE_SEQ=BB.PERFORMANCE_SEQ ");
			sf.append("WHERE AA.NICK=0 ");
			sf.append("GROUP BY AA.FRANS_ID) F ON A.FRANS_ID=F.FRANS_ID ");
			sf.append("LEFT JOIN (SELECT B.PROJ_ID,SUM(A.GET_TOTAL)GET_TOTAL ");
			sf.append("FROM CHDPSDB.DBO.PMS_COMPACT_DTL2 A ");
			sf.append("JOIN CHDPSDB.DBO.PMS_COMPACT B ON A.COMPACT_ID=B.COMPACT_ID ");
			sf.append("GROUP BY B.PROJ_ID ");
			sf.append(") G ON A1.PROJ_ID=G.PROJ_ID ");
			sf.append("LEFT JOIN (SELECT PROJ_ID,SUM(SALE_MONEY)SALE_MONEY ");
			sf.append("FROM CHDPSDB.DBO.BMS_MONTH_SALES ");
			sf.append("GROUP BY PROJ_ID) H ON A1.PROJ_ID=H.PROJ_ID ");
			sf.append("WHERE A.NICK=0 AND B.CHECK_STATE=3 ");
			sf.append("AND NOT EXISTS(SELECT * FROM CHDPSDB.DBO.pms_outside_check C WHERE A1.PROJ_ID =C.PROJ_ID) ");
			map.put("PROJ_NO", "工程号");
			map.put("PROJ_SNAME", "工程名称");
			map.put("CMP_SNAME", "加盟方");
			map.put("CMP_CONTACTOR1", "聯系人");
			map.put("PROJ_AREA", "工程面积");
			map.put("CONTRACT_PRICE", "合同价/审定价");
			map.put("WORK_SDATE", "开工日期");
			map.put("WORK_EDATE", "竣工日期");
			map.put("QUALITY_LEVEL", "质量承诺");
			map.put("REC_AMOUNT", "應收費用");
			map.put("OTH_AMOUNT", "其他費用");
			map.put("LJ_DEDUCT", "累计扣费用");
			map.put("BAIL_AMOUNT", "保证金/加盟保证金");
			map.put("BAIL_COST", "工程质保金");
			map.put("GET_TOTAL", "累计付款");
			map.put("OWE_AMOUNT", "尚欠款");
			map.put("PAY_AMOUNT", "实际付款");
			map.put("SALE_MONEY", "已报收入");
			map.put("NSALE_MONEY", "未报收入");
			map.put("REAMIN_MONEY", "顾客付款-已报收入");
			map.put("REC_RATIO", "收款比例");
			map.put("", "是否交保險");
			map.put("","保險險種");
			map.put("","保險金額");
			List<Map<String,Object>> list = jdbcTemplate.queryForList(sf.toString());
			for(Map<String,Object> elem:list){
				for(Entry<String,Object> entry:elem.entrySet()){
					if(entry.getValue()==null){
						entry.setValue("");
					}
					if(entry.getKey().equals("WORK_SDATE")||entry.getKey().equals("WORK_EDATE")){
						entry.setValue(sdf.format(entry.getValue()));
					}
					if(entry.getKey().equals("REC_AMOUNT")){
						entry.setValue(df.format(entry.getValue()));
					}
				}
			}
			return JSONHelper.array2json(list);
		}
		if(choice.equals("2")){
			
			sf.append("SELECT A1.PROJ_NO,A1.PROJ_NAME,A1.PROJ_SNAME, ");
			sf.append("D.CMP_SNAME,D.CMP_CONTACTOR1, ");
			sf.append("B.PROJ_AREA,A2.CONTRACT_PRICE, ");
			sf.append("B.WORK_SDATE,B.WORK_EDATE, ");
			sf.append("CASE B.QUALITY_LEVEL WHEN 1 THEN '合格' WHEN 2 THEN '优良' END QUALITY_LEVEL, ");
			sf.append("A2.REC_AMOUNT,A2.OTH_AMOUNT, ");
			sf.append("E.LJ_DEDUCT,F.REC_MONEY+A2.BAIL_AMOUNT BAIL_AMOUNT, ");
			sf.append("E.BAIL_COST,G.GET_TOTAL, ");
			sf.append("A2.CONTRACT_PRICE-G.GET_TOTAL OWE_AMOUNT,E.PAY_AMOUNT,H.SALE_MONEY, ");
			sf.append("A2.CONTRACT_PRICE-H.SALE_MONEY NSALE_MONEY, ");
			sf.append("G.GET_TOTAL-H.SALE_MONEY REMAIN_AMOUNT, ");
			sf.append("G.GET_TOTAL/A2.CONTRACT_PRICE*100 REC_RATIO ");
			sf.append("FROM CHJMS.DBO.JMS_FPROJ_REG A ");
			sf.append("JOIN CHDPSDB.DBO.PMS_PROJECT A1 ON A.PRE_REGSEQ =A1.PRE_REGSEQ ");
			sf.append("JOIN (SELECT PROJ_NO,SUM(CONTRACT_PRICE) CONTRACT_PRICE,SUM(CONTRACT_PRICE*(MDEDUCT_RATIO+TAX_RATIO)/100)REC_AMOUNT, ");
			sf.append("SUM(CONTRACT_PRICE*OTH_RATIO/100)  OTH_AMOUNT, ");
			sf.append("SUM(CONTRACT_PRICE*BAIL_RATIO/100) BAIL_AMOUNT ");
			sf.append("FROM CHJMS.DBO.JMS_AGREEMENT GROUP BY PROJ_NO)A2 ON A1.PROJ_NO =A2.PROJ_NO ");
			sf.append("JOIN CHDPSDB.DBO.PMS_STARTWORK B ON A1.PROJ_NO =B.PROJ_NO ");
			sf.append("JOIN CHJMS.DBO.JMS_COMPANY D ON A.FRANS_ID=D.CMP_ID AND D.NICK=0 ");
			sf.append("LEFT JOIN (SELECT BB.PROJ_NO,SUM(AA.MANAGE_COST+TAX_COST+OTH_COST) LJ_DEDUCT,SUM(AA.BAIL_COST) BAIL_COST, ");
			sf.append("SUM(AA.PAY_AMOUNT) PAY_AMOUNT ");
			sf.append("FROM CHJMS.DBO.JMS_AGREEMENTPAY_DTL AA ");
			sf.append("JOIN CHJMS.DBO.JMS_AGREEMENT BB ON AA.AGREE_SEQ =BB.AGREE_SEQ ");
			sf.append("GROUP BY BB.PROJ_NO) E ON E.PROJ_NO=A1.PROJ_NO ");
			sf.append("LEFT JOIN (SELECT AA.FRANS_ID,SUM(REC_MONEY) REC_MONEY ");
			sf.append("FROM CHJMS.DBO.JMS_PERFORMANCEBOND AA ");
			sf.append("JOIN CHJMS.DBO.JMS_PERFORMANCEBOND_DTLA BB ON AA.PERFORMANCE_SEQ=BB.PERFORMANCE_SEQ ");
			sf.append("WHERE AA.NICK=0 ");
			sf.append("GROUP BY AA.FRANS_ID) F ON A.FRANS_ID=F.FRANS_ID ");
			sf.append("LEFT JOIN (SELECT B.PROJ_ID,SUM(A.GET_TOTAL)GET_TOTAL ");
			sf.append("FROM CHDPSDB.DBO.PMS_COMPACT_DTL2 A ");
			sf.append("JOIN CHDPSDB.DBO.PMS_COMPACT B ON A.COMPACT_ID=B.COMPACT_ID ");
			sf.append("GROUP BY B.PROJ_ID ");
			sf.append(") G ON A1.PROJ_ID=G.PROJ_ID ");
			sf.append("LEFT JOIN (SELECT PROJ_ID,SUM(SALE_MONEY)SALE_MONEY ");
			sf.append("FROM CHDPSDB.DBO.BMS_MONTH_SALES ");
			sf.append("GROUP BY PROJ_ID) H ON A1.PROJ_ID=H.PROJ_ID ");
			sf.append("WHERE A.NICK=0 AND B.CHECK_STATE=3 ");
			sf.append("AND  EXISTS(SELECT * FROM CHDPSDB.DBO.pms_outside_check C WHERE A1.PROJ_ID =C.PROJ_ID) ");
			sf.append("AND EXISTS(SELECT * FROM CHDPSDB.DBO.PMS_COMPACT XX WHERE A1.PROJ_ID=XX.PROJ_ID AND ISNULL(skfinsh_flag,0)=0) ");
			map.put("PROJ_NO", "工程号");
			map.put("PROJ_SNAME", "工程名称");
			map.put("CMP_SNAME", "加盟方");
			map.put("CMP_CONTACTOR1", "聯系人");
			map.put("PROJ_AREA", "工程面积");
			map.put("CONTRACT_PRICE", "合同价/审定价");
			map.put("WORK_SDATE", "开工日期");
			map.put("WORK_EDATE", "竣工日期");
			map.put("QUALITY_LEVEL", "质量承诺");
			map.put("REC_AMOUNT", "公司應收費用");
			map.put("OTH_AMOUNT", "其他費用");
			map.put("LJ_DEDUCT", "已扣费用");
			map.put("BAIL_AMOUNT", "保证金/加盟保证金");
			map.put("BAIL_COST", "已扣工程质保金");
			map.put("GET_TOTAL", "甲方付款情况");
			map.put("OWE_AMOUNT", "尚欠款");
			map.put("PAY_AMOUNT", "已付分包款");
			map.put("SALE_MONEY", "已报收入");
			map.put("NSALE_MONEY", "未报收入");
			map.put("REAMIN_MONEY", "甲方付款-已报收入");
			map.put("REC_RATIO", "收款比例");
			map.put("", "是否交保險");
			map.put("","保險險種");
			map.put("","保險金額");
			List<Map<String,Object>> list = jdbcTemplate.queryForList(sf.toString());
			for(Map<String,Object> elem:list){
				for(Entry<String,Object> entry:elem.entrySet()){
					if(entry.getValue()==null){
						entry.setValue("");
					}
					if(entry.getKey().equals("WORK_SDATE")||entry.getKey().equals("WORK_EDATE")){
						entry.setValue(sdf.format(entry.getValue()));
					}
				}
			}
			return JSONHelper.array2json(list);
		}
		if(choice.equals("3")){
			
			sf.append("SELECT A.REG_DATE,A.PROJ_NAME,A.PROJ_ADDR, ");
			sf.append("B.CMP_SNAME,B.CMP_CONTACTOR1, ");
			sf.append("B.CMP_TEL1, ");
			sf.append("CASE A.PROJ_TYPE WHEN 0 THEN '業務合作' WHEN 1 THEN '業務協作' END PROJ_TYPE, ");
			sf.append("A.REMARKS ");
			sf.append("FROM CHJMS.DBO.JMS_FPROJ_REG A ");
			sf.append("JOIN CHJMS.DBO.JMS_COMPANY B ON A.FRANS_ID=B.CMP_ID AND B.NICK=0 ");
			sf.append("WHERE NOT EXISTS(SELECT * FROM CHDPSDB.DBO.PMS_PROJECT B WHERE A.PRE_REGSEQ =B.PRE_REGSEQ) ");
			map.put("REG_DATE", "申请日期");
			map.put("PROJ_NAME", "投标工程");
			map.put("PROJ_ADDR", "工程地址");
			map.put("CMP_SNAME", "加盟方公司");
			map.put("CMP_CONTACTOR1", "联系人");
			map.put("CONTRACT_PRICE", "联系电话");
			map.put("CMP_TEL1", "合作类型");
			map.put("", "收费金额");
			map.put("REMARKS", "備注");
			List<Map<String,Object>> list = jdbcTemplate.queryForList(sf.toString());
			for(Map<String,Object> elem:list){
				for(Entry<String,Object> entry:elem.entrySet()){
					if(entry.getValue()==null){
						entry.setValue("");
					}
					if(entry.getKey().equals("REG_DATE")){
						entry.setValue(sdf.format(entry.getValue()));
					}
				}
			}
			return JSONHelper.array2json(list);
		}
		if(choice.equals("4")){
			
			sf.append("SELECT A.PROJ_ID,A.PROJ_NAME,B.CMP_SNAME, ");
			sf.append("B.CMP_CONTACTOR1, ");
			sf.append("ISNULL(C.COMPACT_AMT,0)COMACT_AMT, ");
			sf.append("ISNULL(D.PROJ_AREA,0)PROJ_AREA ");
			sf.append("FROM CHDPSDB.DBO.PMS_PROJECT A ");
			sf.append("LEFT JOIN CHJMS.DBO.JMS_COMPANY B ON A.JM_CMP =B.CMP_ID AND B.NICK=0 ");
			sf.append("LEFT JOIN (SELECT PROJ_ID,SUM(COMPACT_AMT) COMPACT_AMT FROM CHDPSDB.DBO.PMS_COMPACT GROUP BY PROJ_ID) C ");
			sf.append("ON A.PROJ_ID=C.PROJ_ID ");
			sf.append("LEFT JOIN CHDPSDB.DBO.PMS_STARTWORK D ON A.PROJ_NO=D.PROJ_NO ");
			sf.append("WHERE A.CHECK_STATE=0 AND A.PRE_REGSEQ IS NOT NULL ");
			map.put("PROJ_ID", "工程号");
			map.put("PROJ_NAME", "工程名称");
			map.put("CMP_SNAME", "分包单位（或个人）");
			map.put("CMP_CONTACTOR1", "分包负责人");
			map.put("PROJ_AREA", "工程面积");
			map.put("COMACT_AMT", "合同价");
			List<Map<String,Object>> list = jdbcTemplate.queryForList(sf.toString());
			for(Map<String,Object> elem:list){
				for(Entry<String,Object> entry:elem.entrySet()){
					if(entry.getValue()==null){
						entry.setValue("");
					}
				}
			}
			return JSONHelper.array2json(list);
		}
		return null;
	}


	@Override
	public String GetPDForEXCEL() {
		// TODO Auto-generated method stub
		//定义模糊查询角色信息的sql语句
				StringBuffer sql = new StringBuffer();
				sql.append("select cc.cmp_name,a.class_name as cmp_craft_name,b.class_name as cmp_type_name,cc.cmp_address,cc.cmp_charger,cc.cmp_tel1,cc.cmp_contactor2,cc.cmp_tel2 ");
				sql.append("from chjms.dbo.jms_company as cc ");
				sql.append("left join chdpsdb.dbo.chd_code as a on a.class_code = cc.cmp_craft ");
				sql.append("left join chdpsdb.dbo.chd_code as b on b.class_code = cc.cmp_type ");
				sql.append("where a.param_id = 1 and b.param_id = 2 ");
				//执行sql语句
				List<Fran> info = new ArrayList<Fran>();
				info = jdbcTemplate.query(sql.toString(), new RowMapper() {
					public Object mapRow(ResultSet rs, int rowNum)
							throws SQLException {

						// 创建f对象
                        Fran f = new Fran();
						f.setCmp_name(rs.getString("cmp_name"));
						f.setCmp_craft_name(rs.getString("cmp_craft_name"));
						f.setCmp_type_name(rs.getString("cmp_type_name"));
						f.setCmp_address(rs.getString("cmp_address"));
						f.setCmp_charger(rs.getString("cmp_charger"));
						f.setCmp_tel1(rs.getString("cmp_tel1"));
						f.setCmp_contactor2(rs.getString("cmp_contactor2"));
						f.setCmp_tel2(rs.getString("cmp_tel2"));
						return f;
						
					}
				} );
				JSONArray json = new JSONArray();
				json.addAll(info);
				return json.toString();
	}

	@Override
	public String GetFprojPDForEXCEL() {
		// TODO Auto-generated method stub
		StringBuffer sf = new StringBuffer();
		sf.append("select a.pre_no,a.proj_name,a.proj_addr,b.cmp_sname fran_sname,c.cmp_sname cust_sname,case sign_state when 1 then '优良' else '良好' end sign_state ");
		sf.append("from jms_fproj_reg a ");
		sf.append("left join jms_company b on b.cmp_id = a.frans_id ");
		sf.append("left join chdpsdb.dbo.chd_company c on c.cmp_id = a.cust_cmp ");
		List<Map<String,Object>> list = jdbcTemplate.queryForList(sf.toString());
		for(int i=0;i<list.size();i++){
			list.get(i).put("pre_seq", i+1);
		}
		return JSONHelper.array2json(list);
	}


	


}
