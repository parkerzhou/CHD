package com.glorisun.chd.tag.core.gsui;

import java.util.Map;

import javax.servlet.jsp.tagext.TagSupport;

import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.pojo.DataDictionary;
import com.glorisun.chd.pojo.UserInfo;

public class CommonTag extends TagSupport {
	
	public  Map<String,DataDictionary> getDataDictionary() {
		
		UserInfo userInfo=(UserInfo)this.pageContext.getSession().getAttribute(Constant.GB_SESSION_USERINFO);
		
		return DataDictionary.allDataDict.get((userInfo==null?1:userInfo.getDefLanguage()));
	}
	
	
	public String getDictValue(Map<String,DataDictionary> map,String val,String defVal) {
		String strRes=defVal;
		if (map!=null )
		{
			DataDictionary dict=map.get(val);
			strRes=(dict==null?defVal:dict.getName());
		}
		return strRes;
	}
}
