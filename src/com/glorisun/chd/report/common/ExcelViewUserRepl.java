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




public class ExcelViewUserRepl extends AbstractExcelView {

	
	private List<Map<String, Object>> data;
	private String filename;
	public ExcelViewUserRepl(List<Map<String, Object>> data,String filename){
		this.data = data;
		this.filename = filename;
	}
	@SuppressWarnings({ "rawtypes", "deprecation" })
	@Override
	protected void buildExcelDocument(Map arg0, HSSFWorkbook workbook,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		HSSFSheet sheet = workbook.createSheet();
		HSSFRow header = sheet.createRow(0);
		header.createCell((short) 0).setCellValue("旧用户");
		header.createCell((short) 1).setCellValue("新用户");
		header.createCell((short) 2).setCellValue("生效时间");
		header.createCell((short) 3).setCellValue("操作人");
		header.createCell((short) 4).setCellValue("操作人");

		
	
		int rowNum = 1;
		for(int i = 0 ;i < data.size() ;i++)
		{
			HSSFRow row = sheet.createRow(rowNum++);
			row.createCell((short) 0).setCellValue((data.get(i).get("ur_beRepl")).toString());
			row.createCell((short) 1).setCellValue((data.get(i).get("ur_replace")).toString());
			row.createCell((short) 2).setCellValue((data.get(i).get("ur_replDate")).toString());
			row.createCell((short) 3).setCellValue((data.get(i).get("ur_OperUserid")).toString());
			row.createCell((short) 4).setCellValue((data.get(i).get("ur_optDate")).toString());
		}
		
        String fileName =  new String(filename.getBytes("iso8859-1"))+".xls";//设置下载时客户端Excel的名称     
         fileName = MyUtils.encodeFilename(fileName, request);//处理中文文件名  
        response.setContentType("application/vnd.ms-excel");     
        response.setHeader("Content-disposition", "attachment;filename=" + fileName);     
        OutputStream ouputStream = response.getOutputStream();     
        workbook.write(ouputStream);     
        ouputStream.flush();     
        ouputStream.close();  
	}



	

}
