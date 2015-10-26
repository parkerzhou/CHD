
package com.glorisun.chd.system.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.pojo.FuncItem;
import com.glorisun.chd.service.InitService;


/**
 * 菜单控制器
 * 
 * 
 */
@Controller
@RequestMapping("/menuController")
public class MenuController {
	
	@RequestMapping(params = "pageCreate")
	public ModelAndView pageCreate(HttpServletRequest request) {
		String fuid=(String)request.getParameter(Constant.GB_PARAM_FUNC_ID);
		Map<Integer,FuncItem> menu= (Map<Integer,FuncItem>) request.getSession().getAttribute(Constant.GB_SESSION_MENU);
		
		String mainPage= "/main/main";
		
		if (fuid!=null && !("".equals(fuid)))
		{
		
			FuncItem fi=menu.get(Integer.parseInt(fuid));
			
			request.setAttribute(Constant.GB_PARAM_FUNC_CURR,fi);
			request.setAttribute(Constant.GB_PARAM_FUNC_OPT,"1111");
			mainPage=fi.getMainPage();
		}
		
		return new ModelAndView(mainPage);
	}
}
