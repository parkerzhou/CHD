package com.glorisun.chd.core.def;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.glorisun.chd.pojo.BsDBBuffer;


public class SystemGlobalObj {
	
	//系统ID
	final static public String GP_SYSTEM_ID ="SYSTEM_ID";
	
	//系统名称
	final static public String GP_SYSTEM_NAME ="SYSTEM_NAME";

	//系统所属公司名称
	final static public String GP_SYSTEM_COMPANY ="SYSTEM_COMPANY";
	
	//存在附件的绝对目录(主目录)
	final static public String GP_DIR_ANNEX ="DIR_ANNEX";
	
	//上传类文件(内部访问)
	final static public String GP_DIR_UPLOAD ="DIR_UPLOAD";
	
	//下载类文件(外部访问)
	final static public String GP_DIR_DOWNLOAD ="DIR_DOWNLOAD";
	
	//模板类目录
	final static public String GP_DIR_MODEL ="DIR_MODEL";
		
	//临时文件类目录
	final static public String GP_DIR_TEMP ="DIR_TEMP";
	
	//临时文件类目录
	final static public String GP_DIR_TEMP_URL ="DIR_TEMP_URL";
	
	//日期格式
	final static public String GP_SYSTEM_DATE_FORMAT ="DATE_FORMAT";
	
	//时间格式
	final static public String GP_SYSTEM_DATETIME_FORMAT ="DATETIME_FORMAT";
	final static public String GP_SYSTEM_DATETIME_FORMAT_SH ="DATETIME_FORMAT_SH";
	
	//支持上传类型
	final static public String GP_SYSTEM_UPLOAD_FILETYPE ="UPLOAD_FILETYPE";
	
	//上传显示说明
	final static public String GP_SYSTEM_UPLOAD_FILEDESC ="UPLOAD_FILEDESC";
	
	//上传文件大小限制
	final static public String GP_SYSTEM_UPLOAD_FILESIZE ="UPLOAD_FILESIZE";
	
	
	
	//本站域名
	static public String GP_SYSTEM_INTERNETADDR ="INTERNETADDR";
	
	static private Map<String, String> mpSytempParam=new HashMap<String, String>();

	public static Map<String, String> getMpSytempParam() {
		return mpSytempParam;
	}
	
	//数据缓冲区
	final static public Integer ALLDatas =0;
	static private Map<Integer, BsDBBuffer> mpBsDBBuffer=new HashMap<Integer, BsDBBuffer>();
	public static Map<Integer, BsDBBuffer> getBsDBBuffer() {
		return mpBsDBBuffer;
	}
	

	
	
}
