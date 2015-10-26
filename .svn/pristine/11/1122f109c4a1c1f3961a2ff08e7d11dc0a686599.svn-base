package com.glorisun.chd.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.glorisun.chd.core.util.JSONHelper;
import com.glorisun.chd.pojo.BasicInfo;
import com.glorisun.chd.service.BasicService;

@Service("basicService")
public class BasicServiceImpl implements BasicService {
      @Autowired
      JdbcTemplate jdbcTemplate;

    /**
     *  基础资料维护-公司资质资料
     */
	@Override
	public String loadBasicInfo(String d_Type) {
		// TODO Auto-generated method stub
		StringBuffer sb = new StringBuffer();
		sb.append("select bc.* ");
		sb.append("from jms_basicdata as bc ");
		sb.append("where bc.D_Type="+d_Type);
		List<Map<String,Object>> basic = jdbcTemplate.queryForList(sb.toString());
		return JSONHelper.array2json(basic);
	}

	@Override
	public String addOrEditBasic(String basType,BasicInfo basicInfo) {
		// TODO Auto-generated method stub
		
		int count;
		Object[] obj;
		if(basType.equals("0")){
           basicInfo.setNICK("0");
			obj=new Object[]{
					basicInfo.getLINE_NO(),basicInfo.getD_NAME(),basicInfo.getNICK(),basicInfo.getD_TYPE()	
			};
			String sql = "insert into jms_basicdata (LINE_NO,D_NAME,NICK,D_TYPE) values (?,?,?,?) ";
			count = jdbcTemplate.update(sql,obj);
			
		}else{
			obj = new Object[]{
					basicInfo.getLINE_NO(),basicInfo.getD_NAME(),basicInfo.getNICK(),basicInfo.getD_TYPE(),basicInfo.getCMPQUAL_SEQ()
			};
			String sql = "update jms_basicdata set LINE_NO = ?,D_NAME = ?,NICK = ?,D_TYPE = ? where CMPQUAL_SEQ = ? ";
			count = jdbcTemplate.update(sql,obj);
		}
	
		Map<String,Object> map = new HashMap<String,Object>();
		if(count>0){
		    map.put("success", true);
		    map.put("msg", "提交成功！");
		}else{
			map.put("success",false);
			map.put("msg","提交失败！");
		}
		return JSONHelper.map2json(map);
	}

	@Override
	public String delBasic(String cmpqual_seqs) {
		// TODO Auto-generated method stub
			for(String cmpqual_seq : cmpqual_seqs.split(",")){
				//deleteFran(Integer.parseInt(cmp_id));
				deleteBasic(cmpqual_seq);
			}
			return "删除成功";
		}
		private String deleteBasic(String cmpqual_seq){
			String sql = "delete from jms_basicdata where cmpqual_seq = '"+cmpqual_seq+"'";
			int count = jdbcTemplate.update(sql);
			if(count>=1){
				return "删除成功";
			}else{
				return "删除错误";
			}
		}

		@Override
		public String loadBasicById(String cMPQUAL_SEQ) {
			// TODO Auto-generated method stub
			StringBuffer sb = new StringBuffer();
			
			sb.append("select bc.* ");
			sb.append("from jms_basicdata as bc ");
			sb.append("where CMPQUAL_SEQ = '"+cMPQUAL_SEQ+"' ");
		
		    Map<String,Object> ab = jdbcTemplate.queryForMap(sb.toString());
		    return JSONHelper.map2json(ab);
			
		}

		

		
	/*	
		*//**
		 * 基础资料维护-证书资料
		 *//*
		@Override
		public String loadBasicCerInfo() {
			// TODO Auto-generated method stub
			StringBuffer sb = new StringBuffer();
			sb.append("select bc.* ");
			sb.append("from jms_basicdata as bc ");
			List<Map<String,Object>> basic = jdbcTemplate.queryForList(sb.toString());
			return JSONHelper.array2json(basic);
		}

	
      */
      
      
      
      
      
}
