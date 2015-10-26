package com.glorisun.chd.report.common;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.document.AbstractPdfView;


import com.glorisun.chd.core.util.MyUtils;
import com.glorisun.chd.core.util.excel.PDFParagraph;
import com.lowagie.text.Document;
import com.lowagie.text.Table;
import com.lowagie.text.pdf.PdfWriter;

public class PDFViewUserRepl extends AbstractPdfView {
	
	private List<Map<String, Object>> data;
	private String filename;
	public PDFViewUserRepl(List<Map<String, Object>> data,String filename){
		this.data = data;
		this.filename = filename;
	}

	@SuppressWarnings({ "rawtypes", "unused" })
	@Override
	protected void buildPdfDocument(Map arg0, Document document, PdfWriter workbook,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
	
		
		OutputStream ouputStream = response.getOutputStream();    
		PdfWriter writer = PdfWriter.getInstance(document,ouputStream);
		
		document.open();
		Table table = new Table(5);
		table.addCell(new PDFParagraph("旧用户"));
		table.addCell(new PDFParagraph("新用户"));
		table.addCell(new PDFParagraph("生效时间"));
		table.addCell(new PDFParagraph("操作人"));
		table.addCell(new PDFParagraph("操作时间"));
		
		
		for(int i = 0 ;i < data.size() ;i++)
		{
			table.addCell(new PDFParagraph((data.get(i).get("ur_beRepl")).toString()));
			table.addCell(new PDFParagraph((data.get(i).get("ur_replace")).toString()));
			table.addCell(new PDFParagraph((data.get(i).get("ur_replDate")).toString()));
			table.addCell(new PDFParagraph((data.get(i).get("ur_OperUserid")).toString()));
			table.addCell(new PDFParagraph((data.get(i).get("ur_optDate")).toString()));
		}
		
		document.add(table);
		
		String fileName =  new String(filename.getBytes("iso8859-1"))+".pdf";//设置下载时客户端PDF的名称     
        fileName = MyUtils.encodeFilename(fileName, request);//处理中文文件名  
        response.setContentType("application/pdf");
        response.setHeader("Content-disposition", "attachment;filename=" + fileName);     
               
        document.close();
        ouputStream.flush();     
        ouputStream.close();

	}

}
