package com.glorisun.chd.system.controller;


import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.pojo.FuncItem;
import com.glorisun.chd.pojo.UserInfo;
import com.glorisun.chd.service.InitService;


/**
 * 登陆初始化控制器
 * 
 * 
 */
@Controller
@RequestMapping("/loginController")
public class LoginController {
	
	private InitService initService;

	@Autowired
	public void setInitService(InitService initService) {
		this.initService = initService;
	}

	@RequestMapping(params = "login_main")
	public ModelAndView loginMain(HttpServletRequest request) {
			return new ModelAndView("/login/login");
	}
	
	@RequestMapping(params="check")
	public void check(HttpServletRequest request,HttpServletResponse response,String userName,String password) throws IOException{
		
		response.getWriter().print(initService.login(request.getSession(),userName, password));
	}
	
	@RequestMapping(params = "login")
	public ModelAndView login(HttpServletRequest request) {
		UserInfo userInfo = (UserInfo) (request.getSession()
				.getAttribute(Constant.GB_SESSION_USERINFO));//从session中获取用户信息
		request.setAttribute("user", userInfo);		
		return new ModelAndView( "/main/main");
	}

	
//	@RequestMapping(params = "home")
//	public ModelAndView home(HttpServletRequest request) {
//			return new ModelAndView("/main/home");
//	}
	
	@RequestMapping(params = "left")
	public ModelAndView left(HttpServletRequest request) {
		
		// 菜单栏
		Map<Integer, FuncItem> map=new HashMap<Integer, FuncItem>();
		String menuString = initService.getEasyuiMenu(map);
		request.setAttribute("loginMenu", menuString);
		initService.initDataDict();
		request.getSession().setAttribute(Constant.GB_SESSION_MENU, map);
			return new ModelAndView("/main/left");
	}

}
