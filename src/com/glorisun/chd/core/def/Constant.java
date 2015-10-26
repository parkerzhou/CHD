package com.glorisun.chd.core.def;

import java.util.HashMap;
import java.util.Map;

public class Constant {
	
	public static final Integer C_G_UPLOAD_MAX_FILESIZE = 20;

	static public Integer C_G_PAGESIZE = 20;
	
	public static final  String C_G_UPLOAD_FILE_TYPE="pdf|doc|docx|xls|xlsx|jpg|zip|rar|bmp|tif|png|jpeg|gif";

	//Application中记录系统信息
	static public String GB_APPLICATION_SYSTEMNFO = "SystemInfo";
		
	//Session中记录用户登录的信息
	static public String GB_SESSION_USERINFO = "userInfo";
	
	//Session中记录用户菜单信息
	static public String GB_SESSION_MENU = "menus";
	
	//功能的主页
	static public String GB_PARAM_FUNC_MAINPAGE = "funcMainPage";

	//功能的ID
	static public String GB_PARAM_FUNC_ID = "fuid";
	static public String GB_PARAM_FUNC_DEFTYPE = "deftype";
	static public String GB_PARAM_FUNC_CATEKEY = "catekey";
	static public String GB_PARAM_FUNC_CURR = "currFunc";
	
	static public String GB_PARAM_FUNC_OPT = "operable";
	
	static public int GB_OPT_NEW = 1;
	static public int GB_OPT_UPDATE = 2;
		
	
	//一天内尝试使用用户验证次数
	static public Integer TRYDayTIMES=3;
	
	
}
