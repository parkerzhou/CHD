package com.glorisun.chd.service.impl;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import com.glorisun.chd.core.util.JSONHelper;
import com.glorisun.chd.core.util.RflectCoder;

import com.glorisun.chd.pojo.JmsAgreement;
import com.glorisun.chd.pojo.JmsFprojReg;
import com.glorisun.chd.pojo.Jmscompany;
import com.glorisun.chd.service.FranService;

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
		for (String cmp_id : idArray.split(",")) {
			// deleteFran(Integer.parseInt(cmp_id));
			deleteFran(cmp_id);
		}
		return "删除成功";
	}

	private String deleteFran(String cmp_id) {
		String sql = "delete from jms_company where cmp_id = '" + cmp_id + "'";
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
		sb.append("select code.class_name as cmp_craft_name,cc.cmp_id,cc.cmp_sname,cc.cmp_name,cc.cmp_craft,cc.cmp_charger,cc.cmp_address ");
		sb.append("from jms_company as cc ");
		sb.append("left join chdpsdb.dbo.chd_code as code on code.class_code = cc.cmp_craft ");
		sb.append("where code.param_id = 1");
		List<Map<String, Object>> jmscom = jdbcTemplate.queryForList(sb
				.toString());
		return com.glorisun.chd.core.util.JSONHelper.array2json(jmscom);
	}

	@Override
	public String loadFranById(String cmp_id) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("select cc.*,country.zone_name as cmp_country_name,province.zone_name as cmp_province_name,city.zone_name as cmp_city_name,county.zone_name as cmp_county_name,town.zone_name as cmp_town_name,cmp.cmp_sname as belong_cmp_name  from jms_company as cc ");
		sb.append("left join chdpsdb.dbo.chd_zone as country on cc.cmp_country = country.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as province on cc.cmp_province=province.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as city on cc.cmp_city=city.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as county on cc.cmp_county=county.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_zone as town on cc.cmp_town=town.zone_id ");
		sb.append("left join chdpsdb.dbo.chd_company as cmp on cmp.cmp_id = cc.belong_cmp ");
		sb.append("where cc.cmp_id = '" + cmp_id + "' ");

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
	public String searchCompany(String companyCn,String preCmp) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		// System.out.println(companyCn);
		sb.append("select cy.*,parent.cmp_sname as cmp_parent_sname ");
		sb.append("from chdpsdb.dbo.chd_company as cy ");
		sb.append("left join chdpsdb.dbo.chd_company as parent on parent.cmp_id = cy.belong_cmp ");
		sb.append("where (cy.cmp_id = '"+companyCn+"' or cy.cmp_sname like '%"+companyCn+"%') ");
		if(preCmp!=null){
			if(!preCmp.equals("")){
				sb.append("and cy.cmp_id like '"+preCmp+"%'");
			}
		}
		sb.append("order by cy.cmp_id ");
		//System.out.println(sb.toString());
		List<Map<String,Object>> company = jdbcTemplate.queryForList(sb.toString());
		
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

		for (String pre_regseq : idArray.split(",")) {
			// deleteFran(Integer.parseInt(cmp_id));
			deleteFproj(pre_regseq);
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
		jmsFprojReg.setPre_no(jmsFprojReg.getPre_year()+"-JMYS-"+jmsFprojReg.getPre_seq());
		if(custVisiPlobOptType.equals("0")){
			
			/*obj = new Object[]{
				jmsFprojReg.getPre_no(),jmsFprojReg.getPre_year(),jmsFprojReg.getPre_seq(),jmsFprojReg.getReg_date(),
				jmsFprojReg.getProj_name(),jmsFprojReg.getProj_sname(),jmsFprojReg.getCmp_id(),jmsFprojReg.getDept_id(),
				jmsFprojReg.getCharger(),jmsFprojReg.getProj_country(),jmsFprojReg.getProj_province(),jmsFprojReg.getProj_city(),
				jmsFprojReg.getProj_county(),jmsFprojReg.getProj_town(),jmsFprojReg.getProj_addr(),jmsFprojReg.getCust_cmp(),
				jmsFprojReg.getFrans_id(),jmsFprojReg.getProj_type(),jmsFprojReg.getRemarks(),jmsFprojReg.getSign_state()
			};
			count = jdbcTemplate.update(getFprojInsert(), obj);*/
			
			count = RflectCoder.insertJavaBean(jdbcTemplate, "jms_fproj_reg", jmsFprojReg,"pre_regseq");
			
		}else if(custVisiPlobOptType.equals("1")){
			/*obj = new Object[]{
					jmsFprojReg.getPre_no(),jmsFprojReg.getPre_year(),jmsFprojReg.getPre_seq(),jmsFprojReg.getReg_date(),
					jmsFprojReg.getProj_name(),jmsFprojReg.getProj_sname(),jmsFprojReg.getCmp_id(),jmsFprojReg.getDept_id(),
					jmsFprojReg.getCharger(),jmsFprojReg.getProj_country(),jmsFprojReg.getProj_province(),jmsFprojReg.getProj_city(),
					jmsFprojReg.getProj_county(),jmsFprojReg.getProj_town(),jmsFprojReg.getProj_addr(),jmsFprojReg.getCust_cmp(),
					jmsFprojReg.getFrans_id(),jmsFprojReg.getProj_type(),jmsFprojReg.getRemarks(),jmsFprojReg.getSign_state(),jmsFprojReg.getPre_regseq()
			};
			count = jdbcTemplate.update(getFprojUpdate(), obj);*/
			
			count = RflectCoder.updateJavaBean(jdbcTemplate, "jms_fproj_reg", jmsFprojReg, "pre_regseq");
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
		//System.out.println(sb.toString());
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
		sf.append("select count(*) from  jms_fproj_reg where pre_no like '"+year+"-JMYS-%' ");
		int count = jdbcTemplate.queryForInt(sf.toString());
		if (count == 0) {
			seq = "0001";
		} else {
			sf.delete(0, sf.toString().length());
			sf.append("select top 1 pre_seq from jms_fproj_reg where pre_no like '"+year+"-JMYS-%' order by pre_seq desc ");
//			System.out.println(sf.toString());
			int seq_int = (Integer) jdbcTemplate.queryForMap(sf.toString()).get("pre_seq");
			seq = df.format(seq_int+1);
		}
		Map<String, String> data = new HashMap<String, String>();
		data.put("year", year);
		data.put("seq", seq);
		return JSONHelper.map2json(data);
	}

	@Override
	public String FprojFranInfo(String fran_id_name) {
		
		StringBuffer sb = new StringBuffer();
		sb.append("select cmp.cmp_id,cmp.cmp_sname,cmp.cmp_contactor1,cmp.cmp_tel1,cmp.cmp_address ");
		sb.append("from CHJMS.dbo.jms_company as cmp ");
		sb.append("where cmp.cmp_id like'" + fran_id_name
				+ "%' or cmp.cmp_sname like '%" + fran_id_name + "%' ");
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
				List<Map<String,Object>> jmscom = jdbcTemplate.queryForList(sb.toString());
				Date proj_sdate=new Date();
				Date proj_edate=new Date();
				for(int i=0;i<jmscom.size();i++){
					proj_sdate = (Date) jmscom.get(i).get("proj_sdate");
					if(proj_sdate==null)
						continue;
					else
					
					jmscom.get(i).put("proj_sdate", sdf.format(proj_sdate));
				}
				for(int i=0;i<jmscom.size();i++){
					proj_edate = (Date) jmscom.get(i).get("proj_edate");
					if(proj_edate==null)
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
		Date sdate=(Date) agree.get("work_sdate");
		Date edate=(Date) agree.get("work_edate");
		if(sdate!=null){
			agree.put("work_sdate", sdf.format(sdate));
		}
		if(edate!=null){
			agree.put("work_edate", sdf.format(edate));
		}
		return JSONHelper.map2json(agree);
	}

	@Override
	public String saveOrUpdateAgreeInfo(HttpServletRequest request,
			JmsAgreement jmsAgreement, String optType) {
		int count=0;
		if(optType.equals("0")){
			jmsAgreement.setNICK("0");
			UUID uuid = UUID.randomUUID();
			jmsAgreement.setAGREE_SEQ(uuid.toString());
			count = RflectCoder.insertJavaBean(jdbcTemplate, "JMS_AGREEMENT", jmsAgreement,null);
			
		}else if(optType.equals("1")){
			//System.out.println(JSONHelper.bean2json(jmsAgreement));
			count = RflectCoder.updateJavaBean(jdbcTemplate, "JMS_AGREEMENT", jmsAgreement, "AGREE_SEQ");
		}
		Map<String,Object> ob = new HashMap<String,Object>();
		if(count>0){
		ob.put("success",true );
		ob.put("msg", "提交成功!");
		}else{
		ob.put("success", false);
		ob.put("msg", "提交失败!");
		}
		return JSONHelper.map2json(ob);
	}

	@Override
	public String checkProj(String frans_id) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		StringBuffer sf = new StringBuffer();
		sf.append("select pms.proj_id,pms.proj_name,work.work_sdate,work.work_edate,com.cmp_sname,pms.proj_sname,pms.proj_no,reg.frans_id ");
		sf.append("from chdpsdb.dbo.pms_project as pms ");
		sf.append("left join jms_fproj_reg as reg on reg.pre_regseq = pms.pre_regseq ");
		sf.append("left join jms_company as com on com.cmp_id = reg.frans_id ");
		sf.append("left join chdpsdb.dbo.pms_startwork as work on work.proj_no = pms.proj_no ");
		sf.append("where 1=1 ");
		if (frans_id != null) {
			if (!frans_id.equals("")) {
				sf.append("com.cmp_id = '" + frans_id + "' ");
			}
		}
		sf.append("and pms.proj_no > 22000 ");
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
		for (String AGREE_SEQ : idArray.split(",")) {
			// deleteFran(Integer.parseInt(cmp_id));
			deleteAgree(AGREE_SEQ);
		}
		return "删除成功";
	}
	private String deleteAgree(String AGREE_SEQ) {
		String sql = "delete from jms_agreement where AGREE_SEQ = '" + AGREE_SEQ + "'";
		int count = jdbcTemplate.update(sql);
		if (count >= 1) {
			return "删除成功";
		} else {
			return "删除错误";
		}
	}
}
