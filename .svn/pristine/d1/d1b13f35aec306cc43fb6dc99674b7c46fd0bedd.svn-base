/**
 * @author Lin Weihang
 */

package com.glorisun.umm.report;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Vector;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.glorisun.chd.core.util.EncodingUtils;
import com.glorisun.umm.comm.CommonUtil;

public class ExcelView extends AbstractExcelView {

	private List<Map<String, Object>> data = new ArrayList<Map<String, Object>>();
	private LinkedHashMap<String, String> columnsMap;
	private Set<String> keySet;
	private String Name;

	@SuppressWarnings("unchecked")
	public ExcelView(String jsonArrayData, LinkedHashMap<String, String> map,
			String fileName) {
		if (jsonArrayData == null) {
			jsonArrayData = "[]";
		}
		JSONArray ja = JSONArray.fromObject(jsonArrayData);
		for (Iterator<JSONObject> itr = ja.iterator(); itr.hasNext();) {
			JSONObject j = itr.next();
			data.add((Map<String, Object>) j);
		}
		this.columnsMap = map;
		this.keySet = map.keySet();
		this.Name = fileName;
	}

	@SuppressWarnings("deprecation")
	@Override
	protected void buildExcelDocument(Map map,
			HSSFWorkbook workbook, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		/**
		 * 存放所有的KEY，每个Key在map中对应的值为列名。在this.data中的map中对应的值为该列某行的值。
		 */
		List<String> keys = new Vector<String>();

		for (Iterator<String> itr = keySet.iterator(); itr.hasNext();) {
			keys.add(itr.next());
		}

		// 列名
		HSSFSheet sheet = workbook.createSheet();
		HSSFRow header = sheet.createRow(0);
		for (int i = 0; i < keys.size(); i++) {
			header.createCell((short) i).setCellValue(
					(String) columnsMap.get(keys.get(i)));
		}

		// 数据行
		int rowNum = 1;
		for (int i = 0; i < data.size(); i++) {
			HSSFRow row = sheet.createRow(rowNum++);
			for (int j = 0; j < keys.size(); j++) {
				String key = keys.get(j);
				if(!"".equals(key)){
					if(data.get(i).get(key)!=null){
						row.createCell((short) j).setCellValue(
								(data.get(i).get(key)).toString());
					}
				}else{
					row.createCell(j).setCellValue("");
				}
			}

		}

		/*
		 * 设置下载时客户端Excel的名称 ，并处理中文文件名
		 */
		String filename = Name + ".XLS";//设置下载时客户端PDF的名称   
		filename = new String(filename.getBytes("ISO8859-1"), "UTF-8");
		filename = CommonUtil.encodeFilename(filename, request);//处理中文文件名  

		/*
		 * 得到相应
		 */
		response.setContentType("application/vnd.ms-excel");
		response.setHeader("Content-disposition", "attachment;filename="
				+ filename);
		OutputStream ouputStream = response.getOutputStream();

		/*
		 * 发回相应
		 */
		workbook.write(ouputStream);
		ouputStream.flush();
		ouputStream.close();
	}
}
