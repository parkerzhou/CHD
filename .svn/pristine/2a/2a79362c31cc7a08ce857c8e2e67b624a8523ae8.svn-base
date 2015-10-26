package com.glorisun.chd.core.util;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.web.servlet.View;

/*
 *生成JSON对象
 *将JAVA的List对象转换成JSON对象
 *@author LinWeihang
 *@see render 
 */

public class JSONListView implements View{

	private List<Map<String, Object>> list;
	
	public JSONListView(List<Map<String, Object>> list){
		this.list = list;
	}
	
	@Override
	public String getContentType() {
		// TODO Auto-generated method stub
		return "text/html;charset=UTF-8";
	}
	
	@SuppressWarnings("rawtypes")
	@Override
	public void render(Map arg0, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		JSONArray json = new JSONArray();
		json.addAll(list);
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().write(json.toString());
	}
	
}