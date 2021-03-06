package com.glorisun.umm.report;

import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.view.document.AbstractPdfView;

import com.glorisun.chd.pojo.InduCateDetInfo;
import com.glorisun.chd.pojo.InduCateGenInfo;
import com.glorisun.umm.comm.CommonUtil;
import com.lowagie.text.Document;
import com.lowagie.text.Table;
import com.lowagie.text.pdf.PdfWriter;

public class InduCateDetPdfView extends AbstractPdfView{
	List<InduCateDetInfo> list = new ArrayList<InduCateDetInfo>();
	private String fileName;
	public InduCateDetPdfView(List<InduCateDetInfo> list, String fileName) {
		super();
		this.list = list;
		this.fileName = fileName;
	}
	@Override
	protected void buildPdfDocument(Map model, Document document,
			PdfWriter workbook, HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// TODO Auto-generated method stub
		OutputStream ous = response.getOutputStream();
		PdfWriter writer = PdfWriter.getInstance(document, ous);
		
		document.open();
		Table table = new Table(3);
		table.normalize();
		table.setAutoFillEmptyCells(true);
		table.setAlignment(Table.ALIGN_CENTER); //居中
		table.setWidth(110);
		table.setPadding(5);
		table.addCell(new UserInfoPdfParagraph("二级代码"));
		table.addCell(new UserInfoPdfParagraph("二级名称"));
		table.addCell(new UserInfoPdfParagraph("描述"));
		
		for(int i = 0 ;i < list.size() ;i++)
		{
			table.addCell(new UserInfoPdfParagraph(list.get(i).getId_code()));
			table.addCell(new UserInfoPdfParagraph(list.get(i).getId_name()));
			table.addCell(new UserInfoPdfParagraph(list.get(i).getId_desc()));
		}
		
		document.add(table);
		String filename = fileName+".PDF";//设置下载时客户端PDF的名称     
        filename = CommonUtil.encodeFilename(filename, request);//处理中文文件名  
        response.setContentType("application/pdf");
        response.setHeader("Content-disposition", "attachment;filename=" + filename);     
               
        document.close();
        ous.flush();     
        ous.close();
	}
}
