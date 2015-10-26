package com.glorisun.umm.comm;

import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.mail.internet.MimeUtility;
import javax.servlet.http.HttpServletRequest;

import org.springframework.util.StringUtils;

public class CommonUtil {
	//MD5加密 算法
	public final static String getMD5(String str){
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");//创建具有指定算法名称的摘要
			md.update(str.getBytes());                    //使用指定的字节数组更新摘要
			byte mdBytes[] = md.digest();                 //进行哈希计算并返回一个字节数组
			
			String hash = "";
			for(int i= 0;i<mdBytes.length;i++){           //循环字节数组
				int temp;
				if(mdBytes[i]<0)                          //如果有小于0的字节,则转换为正数
					temp =256+mdBytes[i];
				else
					temp=mdBytes[i];
				if(temp<16)
					hash+= "0";
				hash+=Integer.toString(temp,16);         //将字节转换为16进制后，转换为字符串
			}
			return hash;
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		return null;
	}
	/** 
     * 设置下载文件中文件的名称 
     *  
     * @param filename 
     * @param request 
     * @return 
     */  
    public static String encodeFilename(String filename, HttpServletRequest request) {  
      /** 
       * 获取客户端浏览器和操作系统信息 
       * 在IE浏览器中得到的是：User-Agent=Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; Maxthon; Alexa Toolbar) 
       * 在Firefox中得到的是：User-Agent=Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.7.10) Gecko/20050717 Firefox/1.0.6 
       */  
      String agent = request.getHeader("USER-AGENT");  
      try {  
        if ((agent != null) && (-1 != agent.indexOf("MSIE"))) {  
          String newFileName = URLEncoder.encode(filename, "UTF-8");  
          newFileName = StringUtils.replace(newFileName, "+", "%20");  
          if (newFileName.length() > 150) {  
            newFileName = new String(filename.getBytes("GB2312"), "ISO8859-1");  
            newFileName = StringUtils.replace(newFileName, " ", "%20");  
          }  
          return newFileName;  
        }  
        if ((agent != null) && (-1 != agent.indexOf("Mozilla")))  
          return MimeUtility.encodeText(filename, "UTF-8", "B");  
    
        return filename;  
      } catch (Exception ex) {  
        return filename;  
      }  
    } 

}
