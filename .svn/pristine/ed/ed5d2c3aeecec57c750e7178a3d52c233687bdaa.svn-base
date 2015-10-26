package com.glorisun.chd.report.controller;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

/**
* 生成excel视图，可用excel工具打开或者保存
* 由ViewController的return new ModelAndView(viewExcel, model)生成
*/
public class ViewExcel extends AbstractExcelView {   
   
    public void buildExcelDocument(Map model, HSSFWorkbook workbook,   
            HttpServletRequest request, HttpServletResponse response)   
            throws Exception {  
    	
    	String excelName =(String) model.get("excelName");   
		// 设置response方式,使执行此controller时候自动出现下载页面,而非直接使用excel打开
		response.setContentType("APPLICATION/OCTET-STREAM");
		response.setHeader("Content-Disposition", "attachment; filename="+ URLEncoder.encode(excelName, "UTF-8"));	


    }   
}