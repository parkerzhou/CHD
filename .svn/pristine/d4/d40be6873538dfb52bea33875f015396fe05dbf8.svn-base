package com.glorisun.chd.service.impl;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

import org.apache.commons.lang.xwork.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.glorisun.chd.core.util.DateUtils;
import com.glorisun.chd.core.util.JSONHelper;
import com.glorisun.chd.core.util.StringUtil;
import com.glorisun.chd.pojo.AnnexInfo;
import com.glorisun.chd.pojo.AreaInfo;
import com.glorisun.chd.pojo.ComBoxInfo;
import com.glorisun.chd.pojo.CompanyInfo;
import com.glorisun.chd.pojo.ContactsInfo;
import com.glorisun.chd.pojo.DeptInfo;
import com.glorisun.chd.pojo.StaffInfo;
import com.glorisun.chd.pojo.DeptInfoGroup;
import com.glorisun.chd.pojo.TradeInfo;
import com.glorisun.chd.pojo.json.CustJsonInfo;
import com.glorisun.chd.pojo.json.RegionThreeInfo;
import com.glorisun.chd.pojo.json.RelationInfo;
import com.glorisun.chd.service.ICommService;
@Transactional
@Service("commService")
public class CommServiceImpl implements ICommService {
	@Autowired
	@Qualifier("jdbcTemplate")
	private JdbcTemplate jdbcTemplate;

	/** 定义级联级别 */
	public static String COMBOBOX_LEVEL_1 = "opt_1";
	public static String COMBOBOX_LEVEL_2 = "opt_2";
	public static String COMBOBOX_LEVEL_3 = "opt_3";
	public static String COMBOBOX_LEVEL_4 = "opt_4";
	
	public static String all="All";
	
	public static String UPLOADPATH="D:/userFiles/chcrm/";

	@Override
	public String queryAreaData(String objType, String objId, String type,String regionThree) {
		if (objType == null) {return null;}
		if (objId == null) {return null;}
		if (type == null) {return null;}
		List<AreaInfo> areaList = new ArrayList<AreaInfo>();// 创建存在数据的容器

		// 组织sql语句
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT t1.pd_id,t2.ar_countryId,t2.ar_countryName,");
		sb.append("t2.ar_provinceId,t2.ar_provinceName,");
		sb.append("t2.ar_cityId,t2.ar_cityName,");
		sb.append("t2.ar_zoneId,t2.ar_zoneName ");
		sb.append("FROM ba_popedom as t1,ba_area as t2");
		sb.append(" WHERE t1.pd_type=? and t1.pd_objId=? and t1.pd_cateId=? and t1.ar_id=t2.ar_id");

		if(regionThree!=null&&!regionThree.equals("")){
			sb.append(" AND t2.rh_id="+Integer.parseInt(regionThree));
		}else{
			sb.append(" AND (t2.rh_id is null OR t2.rh_id=0)");
		}
		
		Object[] obj = new Object[] { objType,objId,type };
		
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString(),obj);// 查询
		
		if (rs == null) {
			return null;
		}
		// 遍历结果集
		while (rs.next()) {
			AreaInfo areaInfo = new AreaInfo();
			areaInfo.setId(rs.getInt(1));
			areaInfo.setCountry_id(rs.getInt(2));
			areaInfo.setCountry(rs.getString(3));
			areaInfo.setProvince_id(rs.getInt(4));
			areaInfo.setProvince(rs.getString(5));
			areaInfo.setCity_id(rs.getInt(6));
			areaInfo.setCity(rs.getString(7));
			areaInfo.setZone_id(rs.getInt(8));
			areaInfo.setZone(rs.getString(9));
			areaList.add(areaInfo);
		}
		// 返回响应数据
		return JSONArray.fromObject(areaList).toString();
	}

	/**
	 * @see query()
	 */
	@Override
	public String queryCBoxData(String level, String id) {
		if (level.equals(COMBOBOX_LEVEL_1)) {// 查询国家
			return query(level,"SELECT zone_id,zone_sname FROM v_chd_country");
		} else if (level.equals(COMBOBOX_LEVEL_2)) {// 查询省份
			return query(level,"SELECT prov_id,prov_name FROM v_chd_prov where coun_id="
					+ Integer.parseInt(id));
		} else if (level.equals(COMBOBOX_LEVEL_3)) {// 查询市
			return query(level,"SELECT city_id,city_name FROM v_chd_city where prov_id="
					+ Integer.parseInt(id));
		} else if (level.equals(COMBOBOX_LEVEL_4)) {// 查询县
			return query(level,"SELECT zone_id,zone_name FROM v_chd_zone where city_id="
					+  Integer.parseInt(id));
		}
		return null;
	}
	
	
	
	private String query(String level,String sql) {
		List<ComBoxInfo> cboxListTemp = new ArrayList<ComBoxInfo>();
		List<ComBoxInfo> cboxList = new ArrayList<ComBoxInfo>();
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sql);
		if (rs != null) {
			while (rs.next()) {
				ComBoxInfo comBoxInfo = new ComBoxInfo();
				comBoxInfo.setId(rs.getInt(1));
				comBoxInfo.setText(rs.getString(2));
				cboxListTemp.add(comBoxInfo);
			}
			
			if(cboxListTemp.size()>=1){
				if(!level.equals(COMBOBOX_LEVEL_1)){
					ComBoxInfo comBoxInfoNull = new ComBoxInfo();
					comBoxInfoNull.setId(-1);
					comBoxInfoNull.setText("");
					cboxList.add(comBoxInfoNull);
					ComBoxInfo comBoxInfoAll = new ComBoxInfo();
					comBoxInfoAll.setId(-2);
					comBoxInfoAll.setText(all);
					cboxList.add(comBoxInfoAll);
				}
				
				for(ComBoxInfo comBoxInfo:cboxListTemp){
					cboxList.add(comBoxInfo);
				}
			}
		}
		return JSONArray.fromObject(cboxList).toString();
	}

	@Override
	public boolean submitData(Object[] t1, Object[] t2) {
		// TODO Auto-generated method stub

		//System.out.println("ssssssssss:"+t1[8]);
		
		int pa_id = queryMaxId("SELECT pd_id FROM ba_popedom ORDER BY pd_id DESC");

		int ar_id = queryMaxId("SELECT ar_id FROM ba_popedom ORDER BY ar_id DESC");

		Object[] t3=new Object[]{ar_id,1,t1[0],t1[1],t1[2],t1[3],t1[4],t1[5],t1[6],t1[7],"",t1[8]};
		
		Object[] t4=new Object[]{pa_id,t2[0],t2[1],t2[2],ar_id};
		
		int count_1=jdbcTemplate.update(
				"INSERT INTO ba_area values(?,?,?,?,?,?,?,?,?,?,?,?)", t3);
		
		int count_2=jdbcTemplate.update("INSERT INTO ba_popedom values(?,?,?,?,?)",t4);
		
		if(count_1>=1||count_2>=1){
			return true;
		}
		return false;
	}
	
	
	@Override
	public boolean batchData(Object[] t1,Object[] t2) {
		
		
		//System.out.println("ttttttttttt:"+t1[8]);
		
		int count_1=0;
		int count_2=0;
		// TODO Auto-generated method stub
		/*if(t1[8]==null||t1[8].equals("")){
			t1[8]="";
		}*/
		String popedomSql = "INSERT INTO ba_popedom values(?,?,?,?,?)";
		String areaSql="INSERT INTO ba_area values(?,?,?,?,?,?,?,?,?,?,?,?)";
		if(t1[3].equals(all)){
			String sql = "SELECT prov_id,prov_name FROM v_chd_prov where coun_id=?";
			SqlRowSet rs=jdbcTemplate.queryForRowSet(sql,new Object[]{t1[0]});
			while (rs.next()) {
				int pa_id = queryMaxId("SELECT pd_id FROM ba_popedom ORDER BY pd_id DESC");
				int ar_id = queryMaxId("SELECT ar_id FROM ba_area ORDER BY ar_id DESC");	
				count_1=jdbcTemplate.update(areaSql,new Object[] { ar_id,1,t1[0],t1[1],rs.getInt(1),rs.getString(2),"","","","","",t1[8]});
				count_2=jdbcTemplate.update(popedomSql,new Object[] { pa_id,t2[0],t2[1],t2[2],ar_id });
			}
		}else if(t1[5].equals(all)){
			String sql="SELECT city_id,city_name FROM v_chd_city where prov_id=?";
			SqlRowSet rs=jdbcTemplate.queryForRowSet(sql,new Object[]{t1[2]});
			while (rs.next()) {
				int pa_id = queryMaxId("SELECT pd_id FROM ba_popedom ORDER BY pd_id DESC");
				int ar_id = queryMaxId("SELECT ar_id FROM ba_area ORDER BY ar_id DESC");	
				count_1=jdbcTemplate.update(areaSql,new Object[] { ar_id,1,t1[0],t1[1],t1[2],t1[3],rs.getInt(1),rs.getString(2),"","","",t1[8]});
				count_2=jdbcTemplate.update(popedomSql,new Object[] { pa_id,t2[0],t2[1],t2[2],ar_id });
			}
		}else if(t1[7].equals(all)){
			String sql="SELECT zone_id,zone_name FROM v_chd_zone where city_id=?";
			SqlRowSet rs=jdbcTemplate.queryForRowSet(sql,new Object[]{t1[4]});
			while (rs.next()) {
				int pa_id = queryMaxId("SELECT pd_id FROM ba_popedom ORDER BY pd_id DESC");
				int ar_id = queryMaxId("SELECT ar_id FROM ba_area ORDER BY ar_id DESC");	
				count_1=jdbcTemplate.update(areaSql,new Object[] { ar_id,1,t1[0],t1[1],t1[2],t1[3],t1[4],t1[5],rs.getInt(1),rs.getString(2),"",t1[8]});
				count_2=jdbcTemplate.update(popedomSql,new Object[] { pa_id,t2[0],t2[1],t2[2],ar_id });
			}
		}
		
		if(count_1>=1||count_2>=1){
			return true;
		}
		return false;
		
	}

	@Override
	public void delArea(int id) {
		// TODO Auto-generated method stub
		SqlRowSet rs=jdbcTemplate.queryForRowSet("SELECT ar_id FROM ba_popedom WHERE pd_id=?",new Object[]{id});
		rs.next();
		int arId=rs.getInt(1);
		jdbcTemplate.update("DELETE FROM ba_popedom WHERE pd_id=?",new Object[]{id});
		jdbcTemplate.update("DELETE FROM ba_area WHERE ar_id=?",new Object[]{arId});
	}
	
	
	/** 取得数据表的最大ID */
	private int queryMaxId(String sql) {
		SqlRowSet rs=jdbcTemplate.queryForRowSet(sql);
		if(rs.last()){
			rs.first();
			return rs.getInt(1)+1;
		}
		return 1;
	}

	
	@Override
	public String queryAnnexData(String objType, String objId) {
		// TODO Auto-generated method stub
		if (objType == null || objType.equals("null") || objType.equals("")) {
			return null;
		}
		if (objId == null || objId.equals("null") || objId.equals("")) {
			return null;
		}

		StringBuffer sf = new StringBuffer();
		
		sf.append("SELECT t1.an_id,t1.an_Seq,t1.an_fileName,t1.an_fileSize,t1.an_uploadDate,s.us_userName,CONVERT(VARCHAR(8000),t1.an_path)");
		sf.append(" FROM ba_Annex AS t1 LEFT JOIN sy_User AS s ON t1.an_userid=s.us_id ");
		sf.append(" WHERE t1.an_objType=?");
		sf.append(" and t1.an_objId=?");
		sf.append(" ORDER BY t1.an_Seq");

		List<AnnexInfo> annexList = new ArrayList<AnnexInfo>();
		
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sf.toString(),new Object[]{objType,objId});

		while (rs.next()) {
			AnnexInfo an = new AnnexInfo();
			an.setId(rs.getInt(1));
			an.setAnnexName(rs.getString(3));
			an.setAnnexSize(String.valueOf(rs.getFloat(4)/1024/1024).substring(0, 4));
			an.setAnnexTime(DateUtils.date2Str(rs.getDate(5),DateUtils.time_sdf));
			an.setAnnexPerson(rs.getString(6));
			an.setAnnexPath(rs.getString(7));
			annexList.add(an);
		}
		return JSONArray.fromObject(annexList).toString();
	}


	@Override
	public void upload(int userId, String objType, String objId,
			String objSubType, Map<String, MultipartFile> fileMap) {	
		// 上传路径
		String dirPath = UPLOADPATH + objType + objSubType + "/" + objId + "/";
		File file = new File(dirPath);
		if (!file.exists()) {
			file.mkdirs();
		}
		for (String key : fileMap.keySet()) {
			MultipartFile multipartFile = fileMap.get(key);
			InputStream is;
			String fileName = multipartFile.getOriginalFilename();
			try {
				is = multipartFile.getInputStream();
				FileOutputStream fos = new FileOutputStream(dirPath + fileName);
				int all_Len = 0;
				int len = 0;
				byte[] b = new byte[1024];
				while ((len = is.read(b)) > 0) {
					all_Len += len;
					fos.write(b);
				}
				fos.close();
				is.close();

				String sql="SELECT count(*) FROM ba_Annex WHERE an_objType=? and an_objId=? and an_fileName='"+fileName+"'";
				
				int count = jdbcTemplate.queryForInt(sql, new Object[] {
						objType, objId });
				if (count > 0) {
					jdbcTemplate
							.update("DELETE FROM ba_Annex WHERE an_objType=? and an_objId=? and an_fileName=?",
									new Object[] { objType, objId, fileName });
				}
				int id = 1;
				try {
					id = queryMaxId("SELECT an_id FROM ba_Annex ORDER BY an_id DESC");
				} catch (Exception ex) {
				}

				Object[] obj = new Object[] { id, objType, objId, 1, "描述",
						fileName, all_Len, dirPath, new Date(), userId };
				jdbcTemplate
						.update("INSERT INTO ba_Annex values(?,?,?,?,?,?,?,?,?,?)",
								obj);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	
	@Override
	public String querySize(String objType, String objId) {
		
		Map<String,String> annexMap=new HashMap<String,String>();
		
		annexMap.put("accectfileType", getAccectfileType());
		
		annexMap.put("oneFileMaxSize", getOneFileMaxSize());
		
		annexMap.put("oneFileMaxNum", getOneFileMaxNum());
		
		annexMap.put("totalFileSize",getTotalFileSize());

		
		DecimalFormat fnum = new DecimalFormat("##0.00"); 
		float fileSize=hadUploadSize(objType,objId);
		
		if (fileSize > 0) {
			fileSize=fileSize / 1024 / 1024;
		}
		annexMap.put("hadSize", fnum.format(fileSize));
				
		float canUploadSize=0f;
		if(getTotalFileSize()!=null){
			canUploadSize=Float.parseFloat(getTotalFileSize())-fileSize;
		}else{
			canUploadSize=50-fileSize;
		}
		
		annexMap.put("canSize",fnum.format(canUploadSize));
		return JSONHelper.map2json(annexMap);
	}
	
	
	// 查询不能上传的文件类型
	private String getAccectfileType() {
		SqlRowSet rs = jdbcTemplate
				.queryForRowSet("SELECT sp_value FROM sy_systemParam WHERE sp_key='accectfileType'");
		rs.next();
		return rs.getString(1);
	}
	
	//查询一次上传文件的大小
	private String getOneFileMaxSize(){
		SqlRowSet rs = jdbcTemplate
				.queryForRowSet("SELECT sp_value FROM sy_systemParam WHERE sp_key='oneFileMaxSize'");
		rs.next();
		return rs.getString(1);
	}
	
	//查询上传文件总容量
	private String getTotalFileSize(){
		SqlRowSet rs = jdbcTemplate
				.queryForRowSet("SELECT sp_value FROM sy_systemParam WHERE sp_key='totalFileSize'");
		rs.next();
		return rs.getString(1);
	}
	
	//查询一次上传文件的数量
	private String getOneFileMaxNum(){
		SqlRowSet rs = jdbcTemplate
				.queryForRowSet("SELECT sp_value FROM sy_systemParam WHERE sp_key='oneFileMaxNum'");
		rs.next();
		return rs.getString(1);
	}
	
	//查询用户已上传容量
	private int hadUploadSize(String objType, String objId){
		String sql = "SELECT an_fileSize FROM ba_Annex WHERE an_objType=? and an_objId=?";
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sql, new Object[] { objType,
				objId });
		int fileSize = 0;
		while (rs.next()) {
			fileSize += rs.getInt(1);
		}
		return fileSize;
	}
	
	
	@Override
	public String queryHadUpload(String objType, String objId,String selectFileSize){
		int totalSize=Integer.parseInt(getTotalFileSize())*1024*1024;
		int fileSize=this.hadUploadSize(objType, objId);
		if(fileSize>=totalSize){
			return "0";
		}
		
		int selectFileSizes=Integer.parseInt(selectFileSize);
		if(selectFileSizes>0){
			if(selectFileSizes>(totalSize-fileSize)){
				return "1";
			}
		}
		return "2";
	}
	
	@Override
	public boolean delAnnex(String idArray,String objType,String objId,String objSubType,String fileArray){
		if(idArray==null||fileArray==null){
			return false;
		}
		try{
			String[] idArr=idArray.split(",");
			String[] fileArr=fileArray.split(",");
			
			for(int i=0;i<idArr.length;i++){
				this.delAnnex(Integer.parseInt(idArr[i]), objType, objId, objSubType, fileArr[i]);
			}
			return true;
		}catch(Exception e){
			return false;
		}
	}
	
	/**删除附件*/
	private void delAnnex(int id,String objType,String objId,String objSubType,String fileName) {	
		// TODO Auto-generated method stub
		String dirPath=UPLOADPATH+objType+objSubType+"/"+objId+"/";
		File file=new File(dirPath+fileName);
		if(file.exists()){
			file.delete();
		}
		jdbcTemplate.update("DELETE FROM ba_Annex WHERE an_id="+id);
	}
	
	@Override
	public String queryBaseInfo(int dsid,boolean isAll) {
		// TODO Auto-generated method stub

		String sql = "SELECT dd_id,dd_declareInfo FROM ba_baseDeclDet WHERE bd_id="
				+ dsid;

		List<ComBoxInfo> cboxList = new ArrayList<ComBoxInfo>();

		SqlRowSet rs = jdbcTemplate.queryForRowSet(sql);

		if(isAll){
			ComBoxInfo comBoxInfoAll = new ComBoxInfo();
			comBoxInfoAll.setId(-100);
			comBoxInfoAll.setText("所有");
			comBoxInfoAll.setSelected(true);
			cboxList.add(comBoxInfoAll);
		}
		
		while (rs.next()) {
			ComBoxInfo comBoxInfo = new ComBoxInfo();
			comBoxInfo.setId(rs.getInt(1));
			comBoxInfo.setText(rs.getString(2));
			cboxList.add(comBoxInfo);
		}
		
		return JSONArray.fromObject(cboxList).toString();
	}

	/**
	 ***************** 
	 * 员工选择模块相关方法
	 ***************** 
	 */

	@Override
	public String queryPersonInfo(String st, String idArray, String staffCode,
			String staffName, String staffComp,String staffDept) {

		// 定义员工选择公用sql语句
		StringBuffer sb = new StringBuffer();
		
		sb.append("SELECT staff_id,staff_code,staff_name,dept_sname,");
		sb.append("tel_no,mobile_no,staff_email,staff_title,cmp_sName,cmp_code ");
		sb.append("FROM chd_staff as s LEFT JOIN chd_Dept as d ON s.dept_Id=d.dept_code ");
		sb.append("LEFT JOIN chd_company as c ON d.cmp_id=c.cmp_code ");
		sb.append("WHERE s.staff_code LIKE '%" + staffCode.trim() + "%' ");
		sb.append("AND s.staff_name LIKE '%" + staffName.trim() + "%' ");
		if (staffDept != null && !staffDept.equals("")
				&& !staffDept.equals("null")) {
			sb.append(" AND d.dept_code='" + staffDept.trim() + "'");
		}
		
		if(idArray!=null&&idArray.length()>0){
			sb.append(" AND s.staff_id NOT IN("+idArray+")");
		}
		if(staffComp!=null&&staffComp.length()>0){
			sb.append(" AND c.cmp_code ='"+staffComp+"'");
		}		
		
		sb.append(" ORDER BY staff_code,staff_name,dept_sname");
		
		SqlRowSet rs=jdbcTemplate.queryForRowSet(sb.toString());
		List<StaffInfo> staffInfos=new ArrayList<StaffInfo>();
		
		while (rs.next()) {
			StaffInfo staffInfo = new StaffInfo();

			staffInfo.setId(rs.getInt("staff_id"));
			staffInfo.setStaff_code(rs.getString("staff_code"));
			staffInfo.setStaff_name(rs.getString("staff_name"));

			staffInfo.setCmp_sName(rs.getString("cmp_sName"));
			staffInfo.setDept_sname(rs.getString("dept_sname"));
			staffInfo.setStaff_title(rs.getString("staff_title"));

			staffInfo.setMobile_no(rs.getString("mobile_no"));
			staffInfo.setStaff_email(rs.getString("staff_email"));
			staffInfo.setTel_no(rs.getString("tel_no"));

			staffInfos.add(staffInfo);
		}
		return JSONHelper.array2json(staffInfos);
	}

	
	@Override
	public String queryCompInfo(){
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT cmp_code,rtrim(cmp_code)+'_'+cmp_sName as cmp_sName ");
		sb.append("FROM chd_company  ");
		sb.append("ORDER BY cmp_code");
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());// 
		
		List<CompanyInfo> compInfoList = new ArrayList<CompanyInfo>();
		while (rs.next()) {
			CompanyInfo compinfo=new CompanyInfo();
			compinfo.setCompCode(rs.getString("cmp_code"));
			compinfo.setCompSName(rs.getString("cmp_sName"));
			compInfoList.add(compinfo);
		}
		return JSONArray.fromObject(compInfoList).toString();
	}
		
	@Override
	public String queryDeptInfo(String company) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT cmp_code,dept_code,rtrim(dept_code)+'_'+dept_sname as dept_sname ");
		sb.append("FROM chd_company as c LEFT JOIN chd_dept as d ON c.cmp_code=d.cmp_id ");
		if(company!=null&&company.length()>0){
			sb.append(" WHERE c.cmp_code ='" + company.trim() + "'");			
		}
		sb.append(" ORDER BY cmp_sName,dept_code,dept_sname");
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());// 查询公司下的部门
				
		// 用于存放所有的数据
		List<DeptInfoGroup> deptInfoList = new ArrayList<DeptInfoGroup>();
		while (rs.next()) {
			DeptInfoGroup cmpInfo = new DeptInfoGroup();// 存放公司数据
			//cmpInfo.setGroup(rs.getString("cmp_sName"));
			cmpInfo.setValue(rs.getString("dept_code"));
			cmpInfo.setText(rs.getString("dept_sname"));
			deptInfoList.add(cmpInfo);
		}
		return JSONArray.fromObject(deptInfoList).toString();
	}

	
	@Override
	public String queryContactsInfo(String st, String idArray, String custCmpName,
			String ctName, String custName,String custIdArray) {
		// 定义联系人选择公用sql语句
		StringBuffer sb = new StringBuffer();

		// 想要获取的字段
		sb.append("SELECT de.de_id,ce.ce_id,cc.cc_id,dd.dd_id,cm.cc_id,ct.ct_id,ct.ct_code,");
		sb.append("ct.ct_name,de.de_name,dd.dd_declareInfo,");
		sb.append("cc.cc_name,ce.ce_name ");

		// 数据表
		sb.append("FROM ba_contCmp cm ");
		sb.append("LEFT JOIN ba_custCmp cc ON cm.cc_idU=cc.cc_id ");
		sb.append("LEFT JOIN ba_CustEnt ce ON cm.ce_idU=ce.ce_id ");
		sb.append("LEFT JOIN ba_Dept de ON cm.de_id=de.de_id ");
		sb.append("LEFT JOIN ba_baseDeclDet dd ON cm.ct_offi=dd.dd_id ");
		sb.append("LEFT JOIN ba_contacts ct ON cm.ct_id=ct.ct_id ");
		// 查询条件
		sb.append("WHERE dd.bd_id=248 ");
		
		
		if(idArray!=null&&idArray.length()>0){
			sb.append("AND cm.cc_id NOT IN("+idArray+")");
			
		}
		sb.append(" AND (cc.cc_name LIKE '%" + custCmpName.trim() + "%'");
		sb.append(" OR cc.cc_code LIKE '%"+ custCmpName.trim()+"%')");
		
		sb.append(" AND (ct.ct_name LIKE '%" + ctName.trim() + "%'");
		sb.append(" OR ct.ct_code LIKE '%"+ ctName.trim()+"%')");
		
		sb.append(" AND (ce.ce_name LIKE '%" + custName.trim() + "%'");
		sb.append(" OR ce.ce_code LIKE '%"+ custName.trim()+"%')");
		
		sb.append(" ORDER BY ct.ct_id");
		
		SqlRowSet rs=jdbcTemplate.queryForRowSet(sb.toString());
		
		List<ContactsInfo> contactsInfos = new ArrayList<ContactsInfo>();
		while (rs.next()) {
			ContactsInfo contInfo = new ContactsInfo();
			contInfo.setDe_id(rs.getInt(1));
			contInfo.setCe_id(rs.getInt(2));
			contInfo.setCc_id(rs.getInt(3));
			contInfo.setDd_id(rs.getInt(4));
			contInfo.setId(rs.getInt(5));//主键
			contInfo.setCt_id(rs.getInt("ct_id"));
			contInfo.setCt_code(rs.getString("ct_code"));
			contInfo.setCt_name(rs.getString("ct_name"));
			contInfo.setCt_dept(rs.getString("de_name"));
			contInfo.setCt_title(rs.getString("dd_declareInfo"));
			contInfo.setCt_cmp(rs.getString("cc_name"));
			contInfo.setCt_cust(rs.getString("ce_name"));
			contactsInfos.add(contInfo);
		}
		return JSONHelper.array2json(contactsInfos);
	}

	
	@Override
	public String queryComp(String compCode, String compSName) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT cmp_id,cmp_code,cmp_name,cmp_sname ");
		sb.append("FROM chd_company ");
		sb.append("WHERE cmp_code LIKE '%" + compCode + "%'");
		sb.append(" AND cmp_sname LIKE '%" + compSName + "%'");
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());
		List<CompanyInfo> compList = new ArrayList<CompanyInfo>();
		while (rs.next()) {
			CompanyInfo comp = new CompanyInfo();
			comp.setId(rs.getInt("cmp_id"));
			comp.setCompCode(rs.getString("cmp_code"));
			comp.setCompName(rs.getString("cmp_name"));
			comp.setCompSName(rs.getString("cmp_sName"));
			compList.add(comp);
		}
		return JSONArray.fromObject(compList).toString();
	}

	
	
	@Override
	public String queryDept(String compName,String deptName) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT c.cmp_id,dept_id,cmp_name,dept_name ");
		sb.append("FROM chd_company as c LEFT JOIN chd_dept as d ON c.cmp_code=d.cmp_id ");
		sb.append("WHERE c.cmp_name LIKE '%" + compName + "%' ");
		sb.append("AND d.dept_name LIKE '%" + deptName + "%'");

		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());

		List<DeptInfo> deptList = new ArrayList<DeptInfo>();

		while (rs.next()) {
			DeptInfo dept = new DeptInfo();
			dept.setCompId(rs.getInt(1));
			dept.setId(rs.getInt(2));
			dept.setCompName(rs.getString(3));
			dept.setDeptName(rs.getString(4));
			deptList.add(dept);
		}
		return JSONArray.fromObject(deptList).toString();
	}

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public String queryRelationInfo(final String objType,final String objId) {
		final List<RelationInfo> titleList = new ArrayList<RelationInfo>();
		jdbcTemplate.execute(new CallableStatementCreator() {
			@Override
			public CallableStatement createCallableStatement(Connection con)
					throws SQLException {
				CallableStatement cs = con
						.prepareCall("{call P_getFunction(?,?)}");
				cs.setInt(1, Integer.parseInt(objType));
				cs.setInt(2, Integer.parseInt(objId));
				//System.out.println("00:"+objType+";"+objId);
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
					RelationInfo relationInfo=new RelationInfo();
					relationInfo.setName(rs.getString(2));
					relationInfo.setOpt(rs.getString(1));
					relationInfo.setNums(rs.getInt(3));
					titleList.add(relationInfo);
				}

				return null;
			}
		});
		JSONArray json = JSONArray.fromObject(titleList);
		return json.toString();
	}

	@Override
	public String queryTradeCode(String tradeType, String tradeCode) {
		// TODO Auto-generated method stub	
		if(tradeType==null){
			tradeType="";
		}
		
		if(tradeCode==null){
			tradeCode="";
		}
		StringBuffer sb=new StringBuffer();	
		sb.append("SELECT d.id_id,d.id_code,g.ig_name,g.ig_code,d.id_name ");
		sb.append("FROM ba_induCateDet AS d LEFT JOIN ba_induCateGen AS g ON d.ig_id=g.ig_id ");
		sb.append("WHERE g.ig_typeId=2 AND (g.ig_name LIKE '%"+tradeType+"%'");
		sb.append(" OR g.ig_code LIKE '%"+tradeType+"%') ");
		sb.append("AND (d.id_code LIKE '%"+tradeCode+"%' ");
		sb.append("OR d.id_name LIKE '%"+tradeCode+"%') ");
		sb.append("ORDER BY d.id_id");
		SqlRowSet rs=jdbcTemplate.queryForRowSet(sb.toString());
		
		List<TradeInfo> tradeList=new ArrayList<TradeInfo>();
		
		while(rs.next()){
			TradeInfo tradeInfo=new TradeInfo();
			
			tradeInfo.setId(rs.getInt(1));
			tradeInfo.setTradeCode(rs.getString(2)+"-"+rs.getString(5));
			tradeInfo.setTradeType(rs.getString(4)+"-"+rs.getString(3));
			
			tradeList.add(tradeInfo);	
		}
		return JSONArray.fromObject(tradeList).toString();
	}

	@Override
	public String queryRegionInfo(String custId,String regionOneName, String regionTwoName,
			String regionThreeName) {
		// 数据集
		List<RegionThreeInfo> regionListOne = new ArrayList<RegionThreeInfo>();
		StringBuffer sb = new StringBuffer();
		// 查询大区一级资料
		sb.append("SELECT ro_id,ro_name FROM ba_regionOne WHERE ro_name LIKE '%"
				+ regionOneName + "%'");
		
		if(!custId.trim().equals("")){
			sb.append(" AND ce_id="+custId);
		}
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());
		while (rs.next()) {
			RegionThreeInfo regionThreeInfo = new RegionThreeInfo();
			regionThreeInfo.setRegionOneId(rs.getInt(1));
			regionThreeInfo.setRegionOneName(rs.getString(2));
			regionListOne.add(regionThreeInfo);
		}
		// 当大区一级没有资料时
		if (regionListOne.size() <= 0) {
			return "";
		}
		List<RegionThreeInfo> regionListTwo = new ArrayList<RegionThreeInfo>();
		for (RegionThreeInfo regionThreeInfo_1 : regionListOne) {

			String sqlCount = "SELECT count(*) FROM ba_regionTwo WHERE ro_id="
					+ regionThreeInfo_1.getRegionOneId()
					+ " AND rt_name LIKE '%" + regionTwoName + "%'";
			int count = jdbcTemplate.queryForInt(sqlCount);

			if (count >= 1) {
				String sqlRow = "SELECT rt_id,rt_name FROM ba_regionTwo WHERE ro_id="
						+ regionThreeInfo_1.getRegionOneId()
						+ " AND rt_name LIKE '%" + regionTwoName + "%'";
				rs = jdbcTemplate.queryForRowSet(sqlRow);
				while (rs.next()) {
					RegionThreeInfo regionThreeInfo = new RegionThreeInfo();
					regionThreeInfo.setRegionOneId(regionThreeInfo_1
							.getRegionOneId());
					regionThreeInfo.setRegionOneName(regionThreeInfo_1
							.getRegionOneName());
					regionThreeInfo.setRegionTwoId(rs.getInt(1));
					regionThreeInfo.setRegionTwoName(rs.getString(2));
					regionListTwo.add(regionThreeInfo);

				}
			} else {
				regionListTwo.add(regionThreeInfo_1);
			}
		}

		List<RegionThreeInfo> regionListThree = new ArrayList<RegionThreeInfo>();
		for (RegionThreeInfo regionThreeInfo_2 : regionListTwo) {
			String sqlCount = "SELECT count(*) FROM ba_regionThree WHERE rh_name LIKE '%"
					+ regionThreeName
					+ "%' AND rt_id="
					+ regionThreeInfo_2.getRegionTwoId();

			int count = jdbcTemplate.queryForInt(sqlCount);
			if (count >= 1) {

				String sqlRow = "SELECT rh_id,rh_name FROM ba_regionThree WHERE rh_name LIKE '%"
						+ regionThreeName
						+ "%' AND rt_id="
						+ regionThreeInfo_2.getRegionTwoId();
				rs = jdbcTemplate.queryForRowSet(sqlRow);
				while (rs.next()) {
					RegionThreeInfo regionThreeInfo = new RegionThreeInfo();
					regionThreeInfo.setRegionOneId(regionThreeInfo_2
							.getRegionOneId());
					regionThreeInfo.setRegionOneName(regionThreeInfo_2
							.getRegionOneName());
					regionThreeInfo.setRegionTwoId(regionThreeInfo_2
							.getRegionTwoId());
					regionThreeInfo.setRegionTwoName(regionThreeInfo_2
							.getRegionTwoName());
					regionThreeInfo.setRegionThreeId(rs.getInt(1));
					regionThreeInfo.setRegionThreeName(rs.getString(2));
					regionListThree.add(regionThreeInfo);
				}
			} else {
				regionListThree.add(regionThreeInfo_2);
			}
		}
		return JSONHelper.array2json(regionListThree);
	}

	@Override
	public String queryAreaInfo(String countryName, String provName,
			String cityName, String zoneName) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT cn.zone_id,cn.zone_sname,pr.prov_id,pr.prov_name,");
		sb.append("ci.city_id,ci.city_name,zn.zone_id,zn.zone_name ");
		sb.append("FROM v_chd_country AS cn LEFT JOIN v_chd_prov AS pr ON cn.zone_id=pr.coun_id ");
		sb.append("LEFT JOIN v_chd_city AS ci ON pr.prov_id=ci.prov_id ");
		sb.append("LEFT JOIN v_chd_zone AS zn ON ci.city_id=zn.city_id ");
		
		sb.append("WHERE 1=1  ");
		if(!countryName.equals("")){
			sb.append("AND cn.zone_sname LIKE '%" + countryName + "%' ");
		}
		if(!provName.equals("")){
			sb.append("AND pr.prov_name LIKE '%" + provName + "%' ");
		}
		if(!cityName.equals("")){
			sb.append("AND ci.city_name LIKE '%" + cityName + "%' ");
		}
		if(!zoneName.equals("")){
			sb.append("AND zn.zone_name LIKE '%" + zoneName + "%'");
		}
		sb.append(" ORDER BY cn.zone_id");
		
		/*sb.append("WHERE cn.zone_sname LIKE '%" + countryName + "%' ");
		sb.append("AND pr.prov_name LIKE '%" + provName + "%' ");
		sb.append("AND ci.city_name LIKE '%" + cityName + "%' ");
		sb.append("AND zn.zone_name LIKE '%" + zoneName + "%'");*/
		
		
		//System.out.println(sb.toString());
		
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());
		List<AreaInfo> areaList = new ArrayList<AreaInfo>();
		while (rs.next()) {
			AreaInfo areaInfo = new AreaInfo();
			areaInfo.setCountry_id(rs.getInt(1));
			areaInfo.setCountry(rs.getString(2));
			areaInfo.setProvince_id(rs.getInt(3));
			areaInfo.setProvince(rs.getString(4));
			areaInfo.setCity_id(rs.getInt(5));
			areaInfo.setCity(rs.getString(6));
			areaInfo.setZone_id(rs.getInt(7));
			areaInfo.setZone(rs.getString(8));
			areaList.add(areaInfo);
		}
		return JSONHelper.array2json(areaList);
	}

	@Override
	public String queryCustInfo(String custName,String custType,String entProp) {
		// TODO Auto-generated method stub
		
		StringBuffer sb=new StringBuffer();
		sb.append("SELECT ce_id,ce_name,ce_code,ce_state,ce_region,bb1.dd_declareInfo,bb2.dd_declareInfo ");
		sb.append("FROM ba_CustEnt AS ce LEFT JOIN ba_baseDeclDet AS bb1 ");
		sb.append("ON ce.ce_custType=bb1.dd_id ");
		sb.append("LEFT JOIN ba_baseDeclDet AS bb2 ON ce.ce_entProp=bb2.dd_id ");
		sb.append("WHERE ce_state=1 AND (ce_name LIKE '%"
				+ custName + "%' OR ce_code LIKE '%"+custName+"%') ");
		
		if(!custType.equals("")){
			sb.append(" AND bb1.dd_id="+Integer.parseInt(custType));
		}
		if(!entProp.equals("")){
			sb.append(" AND bb2.dd_id="+Integer.parseInt(entProp));
		}
		
		sb.append(" ORDER BY ce_code");
		
		SqlRowSet rs = jdbcTemplate
				.queryForRowSet(sb.toString());
		
		List<CustJsonInfo> custList=new ArrayList<CustJsonInfo>();
		while(rs.next()){
			CustJsonInfo cust=new CustJsonInfo();
			cust.setCustId(rs.getInt(1));
			cust.setCustName(rs.getString(3)+"-"+rs.getString(2));
			cust.setCustState(rs.getInt(4));
			cust.setCustRegion(rs.getBoolean(5));
			cust.setCustType(rs.getString(6));
			cust.setEntProp(rs.getString(7));
			custList.add(cust);
		}
		
		return JSONHelper.array2json(custList);
	}

	@Override
	public String queryCustCompInfo(String custName, String custCompName) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT bc.ce_id,ce_name,cc_id,cc_name,ce_code,cc_code ");
		sb.append("FROM ba_custCmp AS cc LEFT JOIN ba_CustEnt AS bc ");
		sb.append("ON bc.ce_id=cc.ce_id ");
		sb.append("WHERE (ce_name LIKE '%" + custName + "%' ");
		sb.append("or ce_code LIKE '%" + custName + "%')");
		sb.append("AND (cc_name LIKE '%" + custCompName + "%'");
		sb.append("or cc_code LIKE '%" + custCompName + "%')");
		sb.append(" ORDER BY ce_code,cc_code");
			
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());
		List<CustJsonInfo> custList = new ArrayList<CustJsonInfo>();

		while (rs.next()) {
			CustJsonInfo cust = new CustJsonInfo();
			cust.setCustId(rs.getInt(1));
			cust.setCustName(rs.getString(5)+"-"+rs.getString(2));
			cust.setCustCompId(rs.getInt(3));
			cust.setCustCompName(rs.getString(6)+"-"+rs.getString(4));
			custList.add(cust);
		}
		return JSONHelper.array2json(custList);
	}
	
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public String checkFunctionButton(final int userId,final String fuId){
		final StringBuffer sb=new StringBuffer();
		jdbcTemplate.execute(new CallableStatementCreator() {
			@Override
			public CallableStatement createCallableStatement(Connection con)
					throws SQLException {
				CallableStatement cs = con
						.prepareCall("{call P_GetUserOpt(?,?,?)}");
				cs.setInt(1, userId);
				cs.setInt(2, Integer.parseInt(fuId));
				cs.registerOutParameter(3,java.sql.Types.VARCHAR);
				return cs;
			}
		}, new CallableStatementCallback() {
			@Override
			public Object doInCallableStatement(CallableStatement cs)
					throws SQLException, DataAccessException {
				// TODO Auto-generated method stub
				cs.execute();
				cs.getMoreResults();
				sb.append(cs.getString(3));
				return null;
			}
		});
		return sb.toString();
	}
	
	
	
	public String queryCompetitorInfo(String code, String name) {
		StringBuffer sb = new StringBuffer();
		sb.append("SELECT cp_id,cp_code,CONVERT(VARCHAR(8000),cp_name) ");
		sb.append("FROM ba_competitor ");
		sb.append("WHERE cp_code LIKE '%" + code + "%'"
				+ " AND cp_name LIKE '%" + name + "%' ");
		sb.append("ORDER BY cp_code,cp_name");

		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());

		List<Map<String, String>> list = new ArrayList<Map<String, String>>();

		if (rs == null) {
			return null;
		}
		while (rs.next()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", rs.getString(1));
			map.put("competitorCode", rs.getString(2));
			map.put("competitorName", rs.getString(3));
			list.add(map);
		}
		return JSONHelper.array2json(list);
	}

	@Override
	public String queryCompetitorCompInfo(String competitor,
			String serviceCustComp) {
		// TODO Auto-generated method stub

		StringBuffer sb = new StringBuffer();
		sb.append("SELECT cp_code,CONVERT(VARCHAR(8000),cp_name),");
		sb.append("cc_id,cc_custCode,CONVERT(VARCHAR(8000),cc_custName),cc_cmpCode,CONVERT(VARCHAR(8000),cc_cmpName),cc_isSelfCust ");
		sb.append("FROM ba_compCust AS cc LEFT JOIN ba_competitor AS cp ON cc.cp_id=cp.cp_id ");
		sb.append("WHERE (cp.cp_code LIKE '%" + competitor + "%' ");
		sb.append("OR cp.cp_name LIKE '%" + competitor + "%') ");
		sb.append("AND  (cc.cc_cmpCode LIKE '%" + serviceCustComp + "%' ");
		sb.append("OR cc.cc_cmpName LIKE '%" + serviceCustComp + "%')");
		sb.append(" ORDER BY cp_code,cc_custCode,cc_cmpCode");
		
		
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());

		if (rs == null) {
			return "";
		}

		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		while (rs.next()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", rs.getString(3));
			map.put("competitor", rs.getString(1)+"-"+rs.getString(2));
			map.put("serviceCust", rs.getString(4)+"-"+rs.getString(5));
			map.put("serviceCustComp", rs.getString(6)+"-"+rs.getString(7));
			
			if(rs.getInt(8)==1){
				map.put("isOurCust", "是");
			}else{
				map.put("isOurCust", "否");
			}
			list.add(map);
		}
		return JSONHelper.array2json(list);
	}

	@Override
	public String queryVisit(String visitCustCompDept, String visitStartDate,
			String visitEndDate, String visitState) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();

		sb.append("SELECT cv_id,cc_code,cc_name,de_code,de_name,cv_state,cv_date,cv_title ");
		sb.append("FROM bu_custVisi AS v LEFT JOIN ba_Dept AS D ON v.de_id=d.de_id ");
		sb.append("LEFT JOIN  ba_custCmp AS c ON d.cc_id=c.cc_id ");
		sb.append("WHERE (c.cc_code LIKE '%"+visitCustCompDept+"%' ");
		sb.append("OR c.cc_name LIKE '%"+visitCustCompDept+"%')");
		
		if (!StringUtils.isEmpty(visitStartDate)){
			sb.append(" AND cv_date>='"+visitStartDate+"'");
		}
		
		if (!StringUtils.isEmpty(visitEndDate)){
			sb.append(" AND cv_date<='"+visitEndDate+"'");
		}
		
				
		if (!StringUtil.isEmpty(visitState)&&!visitState.equals("-1")) {
			sb.append(" AND cv_state="+visitState);
		}
		
		sb.append(" ORDER BY cc_code,de_code,cv_date");
		
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());
		List<Map<String, String>> list = new ArrayList<Map<String, String>>();
		while (rs.next()) {
			Map<String, String> map = new HashMap<String, String>();
			map.put("id", rs.getString(1));
			//map.put("visitCustCompDept", rs.getString(2)+"-"+rs.getString(4)+"-"+rs.getString(3)+"-"+rs.getString(5));
			map.put("visitCustCompDept", rs.getString(3)+"-"+rs.getString(5));
			if(rs.getInt(6)==0){
				map.put("visitState", "编辑中");
			}else if(rs.getInt(6)==1){
				map.put("visitState", "确认");
			}else{
				map.put("visitState","其他");
			}
			map.put("visitDate",DateUtils.dataformat(rs.getString(7),DateUtils.DATE_FORMAT_SQL_DEFAULT));
			map.put("visitTitle", rs.getString(8));
			
			list.add(map);
		}
		return JSONHelper.array2json(list);
	}
	
	public String queryExContacts(String theme,String st, String idArray,
			String custCmpName, String ctName, String custName,
			String custIdArray) {

		// 定义联系人选择公用sql语句
		StringBuffer sb = new StringBuffer();
		
		
		// 想要获取的字段
		sb.append("SELECT ct.ct_id,ct.ct_code,ct.ct_name,");
		sb.append("ep.ce_id,CONVERT(VARCHAR(8000),ep.ce_title),");
		sb.append("dp.de_id,dp.de_name,dp.cc_id,dp.cc_name,dp.ce_id,dp.ce_name,");//部门表(部门id/部门名称/客户公司ID/客户公司名称/客户id/客户名称
		sb.append("cc.cc_id,cc.dd_id,cc.dd_declareInfo ");//联系人所属公司(联系人所属公司id/职务ID/职务)
		// 数据表
		sb.append("FROM bu_custExpeCont ec ");
		sb.append("LEFT JOIN bu_custExpe ep ON ec.ce_id=ep.ce_id ");
		sb.append("LEFT JOIN ba_contacts ct ON ec.ct_id=ct.ct_id ");
		sb.append("LEFT JOIN (Select a.de_id,a.de_name,b.cc_id,b.cc_name,c.ce_id,c.ce_name from ba_dept a left join ba_custCmp b ON a.cc_id=b.cc_id left join ba_custEnt c on b.ce_id=c.ce_id)dp ON ec.de_id=dp.de_id ");
		sb.append("LEFT JOIN (Select a.cc_id,b.dd_id,b.dd_declareInfo,a.ct_id,a.de_id from ba_contCmp a left join ba_baseDeclDet b on a.ct_offi=b.dd_id where b.bd_id=248) cc ON ec.ct_id=cc.ct_id AND ec.de_id=cc.de_id ");
		
		sb.append(" WHERE ep.ce_id="+theme);
		
		if (idArray != null && idArray.length() > 0) {
			sb.append(" AND cm.cc_id NOT IN(" + idArray + ")");

		}
		sb.append(" AND dp.cc_name LIKE '%" + custCmpName.trim() + "%'");
		sb.append(" AND ct.ct_name LIKE '%" + ctName.trim() + "%'");
		sb.append(" AND dp.ce_name LIKE '%" + custName.trim() + "%'");
		
		sb.append(" ORDER BY ct.ct_id");
		
		//System.out.println(sb.toString());
		
		SqlRowSet rs = jdbcTemplate.queryForRowSet(sb.toString());

		List<ContactsInfo> contactsInfos = new ArrayList<ContactsInfo>();
		while (rs.next()) {
			ContactsInfo contInfo = new ContactsInfo();
			contInfo.setCt_id(rs.getInt(1));//联系人id
			contInfo.setCt_code(rs.getString(2));//联系人代码
			contInfo.setCt_name(rs.getString(3));//联系人姓名
			contInfo.setBatch_id(rs.getInt(4));//批次id
			contInfo.setBatch_Theme(rs.getString(5));//批次主题
			contInfo.setDe_id(rs.getInt(6));//部门id
			contInfo.setCt_dept(rs.getString(7));//部门名称
			contInfo.setCc_id(rs.getInt(8));//客户公司id
			contInfo.setCt_cmp(rs.getString(9));//客户公司名称
			contInfo.setCe_id(rs.getInt(10));//客户id
			contInfo.setCt_cust(rs.getString(11));//客户名称
			contInfo.setId(rs.getInt(12));// 主键 联系人所属公司id
			contInfo.setDd_id(rs.getInt(13));//职务id
			contInfo.setCt_title(rs.getString(14));//职务名称
			contactsInfos.add(contInfo);
		}
		return JSONHelper.array2json(contactsInfos);
	}

	@Override
	public boolean checkRegion(String objId, String countryId,String countryName,
			String provinceId,String provinceName,String cityId, String cityName,String zoneId,String zoneName) {
		if(provinceName.equals(all)){
			String sql = "SELECT prov_name FROM v_chd_prov where coun_id=?";
			SqlRowSet rs=jdbcTemplate.queryForRowSet(sql,new Object[]{countryId});
			
			StringBuffer sb = new StringBuffer();
			sb.append("SELECT COUNT(*) FROM ba_popedom AS p LEFT JOIN ba_area AS a ON p.ar_id=a.ar_id ");
			sb.append("WHERE p.pd_objId=? AND p.pd_cateId=2 AND p.pd_type=1 ");
			sb.append("AND a.ar_countryName=? AND a.ar_provinceName=?");
			
			while (rs.next()) {
				int count=jdbcTemplate.queryForInt(sb.toString(),new Object[]{objId,countryName,rs.getString(1)});
				if(count>=1){
					return true;
				}
			}
			
		}else if(cityName.equals(all)){
			
			//System.out.println(provinceId);
			
			String sql="SELECT city_name FROM v_chd_city where prov_id=?";
			SqlRowSet rs=jdbcTemplate.queryForRowSet(sql,new Object[]{provinceId});
			StringBuffer sb = new StringBuffer();
			sb.append("SELECT COUNT(*) FROM ba_popedom AS p LEFT JOIN ba_area AS a ON p.ar_id=a.ar_id ");
			sb.append("WHERE p.pd_objId=? AND p.pd_cateId=2 AND p.pd_type=1 ");
			sb.append("AND a.ar_countryName=? AND a.ar_provinceName=? AND a.ar_cityName=?");
			while (rs.next()) {
				int count=jdbcTemplate.queryForInt(sb.toString(),new Object[]{objId,countryName,provinceName,rs.getString(1)});
				if(count>=1){
					return true;
				}
			}
			
		}else if(zoneName.equals(all)){
			
			String sql="SELECT zone_name FROM v_chd_zone where city_id=?";
			SqlRowSet rs=jdbcTemplate.queryForRowSet(sql,new Object[]{cityId});
			StringBuffer sb = new StringBuffer();
			sb.append("SELECT COUNT(*) FROM ba_popedom AS p LEFT JOIN ba_area AS a ON p.ar_id=a.ar_id ");
			sb.append("WHERE p.pd_objId=? AND p.pd_cateId=2 AND p.pd_type=1 ");
			sb.append("AND a.ar_countryName=? AND a.ar_provinceName=? AND a.ar_cityName=? AND a.ar_zoneName=?");
			while (rs.next()) {
				int count=jdbcTemplate.queryForInt(sb.toString(),new Object[]{objId,countryName,provinceName,cityName,rs.getString(1)});
				if(count>=1){
					return true;
				}
			}
		}else{
			StringBuffer sb = new StringBuffer();
			sb.append("SELECT COUNT(*) FROM ba_popedom AS p LEFT JOIN ba_area AS a ON p.ar_id=a.ar_id ");
			sb.append("WHERE p.pd_objId=? AND p.pd_cateId=2 AND p.pd_type=1 ");
			sb.append("AND a.ar_countryName=? AND a.ar_provinceName=? AND a.ar_cityName=? AND a.ar_zoneName=?");
			int count=jdbcTemplate.queryForInt(sb.toString(), new Object[] { objId,
				countryName, provinceName, cityName, zoneName });
			if(count>=1){
				return true;
			}else{
				return false;
			}
		}
		return false;
	}

	@Override
	public String getAreaInfo(String owner_zone,String zone_type) {
		// TODO Auto-generated method stub
		String sql = null;
		sql = "select a.*,b.level_name,c.zone_name as owner_zone_name from chdpsdb.dbo.chd_zone a" +
					" left join chdpsdb.dbo.chd_level b on a.level_id = b.level_id" +
					" left join chdpsdb.dbo.chd_zone c on a.owner_zone = c.zone_id" +
					" left join chdpsdb.dbo.chd_zone d on c.zone_id = d.zone_id" +
					" where a.owner_zone = '"+owner_zone+"'";
		List<Map<String,Object>> areaInfos = jdbcTemplate.queryForList(sql);
		return JSONHelper.array2json(areaInfos);
	}

	@Override
	public String getZoneComboInfos(String zone_type, String owner_zone) {
		// TODO Auto-generated method stub
		List<Map<String,Object>> data = null;
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("id", "ALL[所有]");
		map.put("text", "ALL[所有]");
		if(owner_zone==null){
			data = jdbcTemplate.queryForList("select zone_id as id,zone_name as text from chdpsdb.dbo.chd_zone where zone_type='"+zone_type+"'");
			data.add(0, map);
		}else{
			data = jdbcTemplate.queryForList("select zone_id as id,zone_name as text from chdpsdb.dbo.chd_zone where owner_zone='"+owner_zone+"'");
			data.add(0, map);
		}
		return JSONHelper.array2json(data);
	}
}
