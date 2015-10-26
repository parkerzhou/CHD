package com.glorisun.chd.core.util;

import java.util.Map;

import javax.servlet.http.HttpSession;

import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.pojo.DataDictionary;
import com.glorisun.chd.pojo.UserInfo;
import com.sun.net.httpserver.HttpContext;

public class DataDictionaryUtil {
	static public Map<String, DataDictionary> getDataDictionary(
			HttpSession session) {
		UserInfo userInfo = (UserInfo) session
				.getAttribute(Constant.GB_SESSION_USERINFO);

		return DataDictionary.allDataDict.get((userInfo == null ? 1 : userInfo
				.getDefLanguage()));

	}
	
	static public String getDictValue(Map<String,DataDictionary> map,String val,String defVal) {
		String strRes=defVal;
		if (map!=null )
		{
			DataDictionary dict=map.get(val);
			strRes=(dict==null?defVal:dict.getName());
		}
		return strRes;
	}
	
}
