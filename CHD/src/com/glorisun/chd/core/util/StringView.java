package com.glorisun.chd.core.util;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.View;

public class StringView implements View{

	String content;
	
	public StringView(String content){
		this.content = content;
	}
	
	@Override
	public String getContentType() {
		return "text/html;charset=UTF-8";
	}

	@SuppressWarnings("rawtypes")
	@Override
	public void render(Map arg0, HttpServletRequest arg1,
			HttpServletResponse response) throws Exception {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().write(content);
	}

}
