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

import org.springframework.web.servlet.view.document.AbstractPdfView;

import com.glorisun.chd.core.util.MyUtils;
import com.glorisun.chd.core.util.excel.PDFParagraph;
import com.glorisun.umm.comm.CommonUtil;
import com.lowagie.text.Document;
import com.lowagie.text.Table;
import com.lowagie.text.pdf.PdfWriter;

public class PDFView extends AbstractPdfView {
	
	private List<Map<String, Object>> data = new ArrayList<Map<String,Object>>();
	private LinkedHashMap<String, String> columnsMap;
	private Set<String> keySet;
	private String Name;
	@SuppressWarnings("unchecked")
	public PDFView(String jsonArrayData,LinkedHashMap<String, String> map, String fileName){
		if(jsonArrayData == null){
			jsonArrayData = "[]";
		}
		JSONArray ja = JSONArray.fromObject(jsonArrayData);
		for(Iterator<JSONObject> itr = ja.iterator(); itr.hasNext();){
			JSONObject j = itr.next();
			data.add((Map<String, Object>)j);
		}
		this.columnsMap = map;
		this.keySet = map.keySet();
		this.Name = fileName;
	}
	
	

	@Override
	protected void buildPdfDocument(Map<String, Object> arg0, Document document, PdfWriter workbook,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		/**
		 * 存放所有的KEY，每个Key在map中对应的值为列名。在this.data中的map中对应的值为该列某行的值。
		 */
		List<String> keys = new Vector<String>();
		
		for(Iterator<String> itr = keySet.iterator(); itr.hasNext();){
			keys.add(itr.next());
		}
		
		/*
		 * 建立一个书写器，与document对象关联   
		 */
		OutputStream ouputStream = response.getOutputStream();    
		PdfWriter.getInstance(document,ouputStream);
		document.open();
		
		/*
		 * 设置Table表格,创建一个4列的表格   
		 */
		Table table = new Table(keys.size());
		for(int i = 0; i < keys.size(); i++){
			table.addCell(new PDFParagraph((String)columnsMap.get(keys.get(i))));
		}
		
		/*
		 * 生成数据行
		 */
		for(int i = 0 ;i < data.size() ;i++)
		{
			for(int j = 0; j < keys.size(); j++){
				String key = keys.get(j);
				table.addCell(new PDFParagraph((data.get(i).get(key)).toString()));
			}
		}
		
		
		
		/*
		 * 向文档中添加内容
		 */
		document.add(table);
		String filename = Name + ".PDF";//设置下载时客户端PDF的名称   
		filename = new String(filename.getBytes("ISO8859-1"), "UTF-8");
		filename = CommonUtil.encodeFilename(filename, request);//处理中文文件名  
        response.setContentType("application/pdf");
        response.setHeader("Content-disposition", "attachment;filename=" + filename);     
               
        /*
         * 封闭文档
         */
        document.close();
        ouputStream.flush();     
        ouputStream.close();

	}

}
