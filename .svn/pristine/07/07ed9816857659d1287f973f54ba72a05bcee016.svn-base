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

import com.glorisun.umm.comm.CommonUtil;
import com.glorisun.umm.pojo.User;
public class UserInfoExcelView extends AbstractExcelView {
	private List<User> users;
	private String fileName;
	public UserInfoExcelView(List<User> users,String filename){
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
		header.createCell((short) 0).setCellValue("用户群组");
		header.createCell((short) 1).setCellValue("用户ID");
		header.createCell((short) 2).setCellValue("用户名称");
		header.createCell((short) 3).setCellValue("登陆ID");
		header.createCell((short) 4).setCellValue("邮箱");
		header.createCell((short) 5).setCellValue("手机号码");
		header.createCell((short) 6).setCellValue("用户类型");
		header.createCell((short) 7).setCellValue("状态");
		//获取userInfoService
/*		ApplicationContext applicationContext
		            = new ClassPathXmlApplicationContext("root-context.xml");
		IUmmUserInfoService userInfoService = (IUmmUserInfoService) applicationContext.getBean("userInfoService");
		List<User> users = userInfoService.getUserInfo();*/
		
		int rowNum = 1;
		for(int i = 0 ;i < users.size() ;i++)
		{
			HSSFRow row = sheet.createRow(rowNum++);
			row.createCell((short) 0).setCellValue(users.get(i).getUg_name());
			row.createCell((short) 1).setCellValue(users.get(i).getUs_userId());
			row.createCell((short) 2).setCellValue(users.get(i).getUs_userName());
			row.createCell((short) 3).setCellValue(users.get(i).getUs_nickName());
			row.createCell((short) 4).setCellValue(users.get(i).getUs_email());
			row.createCell((short) 5).setCellValue(users.get(i).getUs_mobileNo());
			row.createCell((short) 6).setCellValue(users.get(i).getUt_type());
			row.createCell((short) 7).setCellValue(users.get(i).getUs_state());
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
