package com.glorisun.chd.report.controller;
import java.net.URLEncoder;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.document.AbstractPdfView;

import com.lowagie.text.Document;
import com.lowagie.text.pdf.PdfWriter;
/**
* 生成PDF视图，可用PDF浏览器打开或者保存
* 由ViewController的return new ModelAndView(viewPDF, model)生成
* @version Version 1.0
*/
public class ViewPDF extends AbstractPdfView {   
    public void buildPdfDocument(Map model, Document document,   
            PdfWriter writer, HttpServletRequest request,   
            HttpServletResponse response) throws Exception {   
  
    	String excelName = "用户信息.pdf";
		// 设置response方式,使执行此controller时候自动出现下载页面,而非直接使用excel打开
		response.setContentType("APPLICATION/OCTET-STREAM");
		response.setHeader("Content-Disposition", "attachment; filename="+ URLEncoder.encode(excelName, "UTF-8"));	
		
    }   
}