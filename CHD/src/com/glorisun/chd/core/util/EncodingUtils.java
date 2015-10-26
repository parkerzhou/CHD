package com.glorisun.chd.core.util;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;

import org.springframework.util.StringUtils;

public class EncodingUtils {
	/** 设置客户下载文件中文文件名称*/
	public static String encodeFilename(String fileName,
			HttpServletRequest request) {
		String agent = request.getHeader("USER-AGENT");
		try {
			if ((agent != null) && (-1 != agent.indexOf("MSIE"))) {
				
				String newFileName = URLEncoder.encode(fileName, "UTF-8");
				
				newFileName = StringUtils.replace(newFileName, "+", "%20");
				
				if (newFileName.length() > 150) {
					newFileName = new String(fileName.getBytes("GB2312"),
							"ISO8859-1");
					newFileName = StringUtils.replace(newFileName, " ", "%20");
				}
				return newFileName;
			}
			if ((agent != null) && (-1 != agent.indexOf("Mozilla")))
				return MimeUtility.encodeText(fileName, "UTF-8", "B");
			return fileName;
		} catch (Exception ex) {
			return fileName;
		}
	}
	
	
	
	public static String transfterCode(String data){
		if(data!=null&&!data.equals("")&&!data.equals("null")){
			try {
				return new String(data.getBytes("iso-8859-1"),"utf-8");
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return "";
	}
}
