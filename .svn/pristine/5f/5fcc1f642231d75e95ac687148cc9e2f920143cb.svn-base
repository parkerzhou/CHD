package com.glorisun.umm.report;

import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import com.glorisun.chd.pojo.InduCateDetInfo;
import com.glorisun.chd.pojo.InduCateGenInfo;
import com.glorisun.umm.comm.CommonUtil;

public class InduCateDetExcelView extends AbstractExcelView {
	private List<InduCateDetInfo> users;
	private String fileName;
	public InduCateDetExcelView(List<InduCateDetInfo> users,String filename){
		this.users=users; 
		this.fileName=filename;
	}
	
	@SuppressWarnings("deprecation")
	@Override
	protected void buildExcelDocument(Map model, HSSFWorkbook workbook,
			HttpServletRequest request, HttpServletResponse response)throws Exception {
		// TODO Auto-generated method stub
		HSSFSheet sheet=workbook.createSheet();
		HSSFRow header = sheet.createRow(0);
		header.createCell((short) 0).setCellValue("二级代码");
		header.createCell((short) 1).setCellValue("二级名称");
		header.createCell((short) 2).setCellValue("描述");
		//获取userInfoService
/*		ApplicationContext applicationContext
		            = new ClassPathXmlApplicationContext("root-context.xml");
		IUmmUserInfoService userInfoService = (IUmmUserInfoService) applicationContext.getBean("userInfoService");
		List<User> users = userInfoService.getUserInfo();*/
		
		int rowNum = 1;
		for(int i = 0 ;i < users.size() ;i++)
		{
			HSSFRow row = sheet.createRow(rowNum++);
			row.createCell((short) 0).setCellValue(users.get(i).getId_code());
			row.createCell((short) 1).setCellValue(users.get(i).getId_name());
			row.createCell((short) 2).setCellValue(users.get(i).getId_desc());
		}
		 
        String filename = fileName+".xls";//设置下载时客户端Excel的名称     
        filename = CommonUtil.encodeFilename(filename, request);//处理中文文件名  
        response.setContentType("application/vnd.ms-excel");     
        response.setHeader("Content-disposition", "attachment;filename=" + filename);     
        OutputStream ouputStream = response.getOutputStream();     
        workbook.write(ouputStream);     
        ouputStream.flush();     
        ouputStream.close();  
	}
}
