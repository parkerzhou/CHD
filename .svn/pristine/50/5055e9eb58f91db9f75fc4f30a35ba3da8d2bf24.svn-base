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

public class RoleGrpPDFView extends AbstractPdfView {
	
	private List<Map<String, Object>> data;
	private String Name;
	public RoleGrpPDFView(List<Map<String, Object>> data, String fileName){
		this.data = data;
		this.Name = fileName;
	}
	
	@SuppressWarnings({ "rawtypes", "unused" })
	@Override
	protected void buildPdfDocument(Map arg0, Document document, PdfWriter workbook,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		/*
		 * 获得所有群组信息
		 */
		
		/*
		 * 建立一个书写器，与document对象关联   
		 */
		OutputStream ouputStream = response.getOutputStream();    
		PdfWriter writer = PdfWriter.getInstance(document,ouputStream);
		document.open();
		
		/*
		 * 设置Table表格,创建一个4列的表格   
		 */
		Table table = new Table(4);
		table.addCell(new PDFParagraph("用户群组代码"));
		table.addCell(new PDFParagraph("用户群组名称"));
		table.addCell(new PDFParagraph("适用范围"));
		table.addCell(new PDFParagraph("排序"));
		
		/*
		 * 生成数据行
		 */
		for(int i = 0 ;i < data.size() ;i++)
		{
			table.addCell(new PDFParagraph((data.get(i).get("ug_code")).toString()));
			table.addCell(new PDFParagraph((data.get(i).get("ug_name")).toString()));
			table.addCell(new PDFParagraph((data.get(i).get("range")).toString()));
			table.addCell(new PDFParagraph((data.get(i).get("ug_orderSeq")).toString()));
		}
		/*
		 * 向文档中添加内容
		 */
		document.add(table);
		String filename = new String(Name.getBytes("iso8859-1")) + ".PDF";//设置下载时客户端PDF的名称     
        filename = MyUtils.encodeFilename(filename, request);//处理中文文件名  
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
