package com.glorisun.chd.report.common;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.glorisun.chd.core.util.MyUtils;


public class RoleGrpExcelView extends AbstractExcelView {
	
	private List<Map<String, Object>> data;
	private String Name;
	public RoleGrpExcelView(List<Map<String, Object>> data, String fileName){
		this.data = data;
		this.Name = fileName;
	}
	@SuppressWarnings({ "rawtypes", "deprecation" })
	@Override
	protected void buildExcelDocument(Map arg0, HSSFWorkbook workbook,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		/*
		 * 内存中生成excle文件
		 */
		HSSFSheet sheet = workbook.createSheet();
		
		/*
		 * 生成标题
		 */
		HSSFRow header = sheet.createRow(0);
		header.createCell((short) 0).setCellValue("用户群组代码");
		header.createCell((short) 1).setCellValue("用户群组名称");
		header.createCell((short) 2).setCellValue("适用范围");
		header.createCell((short) 3).setCellValue("排序");
		
		/*
		 * 获得所有群组信息
		 */
				
		/*
		 * 生成数据行
		 */
		int rowNum = 1;
		for(int i = 0 ;i < data.size() ;i++)
		{
			HSSFRow row = sheet.createRow(rowNum++);
			row.createCell((short) 0).setCellValue((data.get(i).get("ug_code")).toString());
			row.createCell((short) 1).setCellValue((data.get(i).get("ug_name")).toString());
			row.createCell((short) 2).setCellValue((data.get(i).get("range")).toString());
			row.createCell((short) 3).setCellValue((data.get(i).get("ug_orderSeq")).toString());
		}
		
		/*
		 * 设置下载时客户端Excel的名称  ，并处理中文文件名 
		 */
        String filename = new String(Name.getBytes("iso8859-1")) + ".xls";
        filename = MyUtils.encodeFilename(filename, request); 
        
        /*
         * 得到相应
         */
        response.setContentType("application/vnd.ms-excel");     
        response.setHeader("Content-disposition", "attachment;filename="+ filename);     
        OutputStream ouputStream = response.getOutputStream();     
        
        /*
         * 发回相应
         */
        workbook.write(ouputStream);     
        ouputStream.flush();     
        ouputStream.close();  
	}

}
