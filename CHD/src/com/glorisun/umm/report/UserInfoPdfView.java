package com.glorisun.umm.report;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.servlet.view.document.AbstractPdfView;

import com.glorisun.umm.comm.CommonUtil;
import com.glorisun.umm.pojo.User;
import com.glorisun.umm.service.IUmmUserInfoService;
import com.lowagie.text.Document;
import com.lowagie.text.Table;
import com.lowagie.text.pdf.PdfWriter;

public class UserInfoPdfView extends AbstractPdfView {
	private List<User> users;
	private String fileName;
	public UserInfoPdfView(List<User> users,String filename){
		this.users=users;
		this.fileName=filename;
	}
	@Override
	protected void buildPdfDocument(Map model, Document document, PdfWriter workbook,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		//获取userInfoService
/*		ApplicationContext applicationContext
		            = new ClassPathXmlApplicationContext("root-context.xml");
		IUmmUserInfoService userInfoService = (IUmmUserInfoService) applicationContext.getBean("userInfoService");
		//获得所有用户信息
		List<User> users = userInfoService.getUserInfo();*/
		
		OutputStream ouputStream = response.getOutputStream();    
		PdfWriter writer = PdfWriter.getInstance(document,ouputStream);
		
		document.open();
		Table table = new Table(8);
		table.normalize();
		table.setAutoFillEmptyCells(true);
		table.setAlignment(Table.ALIGN_CENTER); //居中
		table.setWidth(110);
		table.setPadding(5);
		table.addCell(new UserInfoPdfParagraph("用户群组"));
		table.addCell(new UserInfoPdfParagraph("用户ID"));
		table.addCell(new UserInfoPdfParagraph("用户名称"));
		table.addCell(new UserInfoPdfParagraph("登陆ID"));
		table.addCell(new UserInfoPdfParagraph("邮箱"));
		table.addCell(new UserInfoPdfParagraph("手机号码"));
		table.addCell(new UserInfoPdfParagraph("用户类型"));
		table.addCell(new UserInfoPdfParagraph("状态"));

		
		for(int i = 0 ;i < users.size() ;i++)
		{
			table.addCell(new UserInfoPdfParagraph(users.get(i).getUg_name()));
			table.addCell(new UserInfoPdfParagraph(users.get(i).getUs_userId()));
			table.addCell(new UserInfoPdfParagraph(users.get(i).getUs_userName()));
			table.addCell(new UserInfoPdfParagraph(users.get(i).getUs_nickName()));
			table.addCell(new UserInfoPdfParagraph(users.get(i).getUs_email()));
			table.addCell(new UserInfoPdfParagraph(users.get(i).getUs_mobileNo()));
			table.addCell(new UserInfoPdfParagraph(users.get(i).getUt_type()));
			table.addCell(new UserInfoPdfParagraph(users.get(i).getUs_state()));
		}
		
		document.add(table);
		String filename = fileName+".PDF";//设置下载时客户端PDF的名称     
        filename = CommonUtil.encodeFilename(filename, request);//处理中文文件名  
        response.setContentType("application/pdf");
        response.setHeader("Content-disposition", "attachment;filename=" + filename);     
               
        document.close();
        ouputStream.flush();     
        ouputStream.close();

	}

}
