package com.glorisun.chd.controller;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.glorisun.chd.core.def.Constant;





/**
 * 過濾所有請求路徑，防止非法登錄和session過期
 * @company Copyright 2011 glorisun, All rights reserved.
 *
 */
public class LoginFilter implements Filter {
	public void init(FilterConfig filterConfig) throws ServletException {

	}

	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		HttpSession session = req.getSession();

		//把请求路径转为小写
		String requesturi = req.getRequestURI().toLowerCase();
		//System.out.println("**getRequestURL ****"+req.getRequestURL()) ;
		//System.out.println("getRequestURI====="+requesturi) ;
		
		if (requesturi.endsWith("logincontroller.do")||
			requesturi.endsWith("login/login.jsp")
			||requesturi.endsWith("reg.jsp")
			|| requesturi.endsWith(req.getContextPath().toLowerCase() + "/")
			|| requesturi.endsWith(".jpg") 
			|| requesturi.endsWith(".gif") 
			|| requesturi.endsWith(".png")
			|| requesturi.endsWith(".swf")
			|| requesturi.endsWith(".js") 
			|| requesturi.endsWith(".css")
			|| requesturi.endsWith(".ico")
			|| requesturi.endsWith("login.action")
			|| requesturi.endsWith("downloadguide.action")
			|| requesturi.contains("/portal/")
			|| requesturi.contains("/logout")) {
			chain.doFilter(request, response);
		} else if (session.getAttribute(Constant.GB_SESSION_USERINFO) != null) {
			chain.doFilter(request, response);
		} else {
			String path = req.getContextPath();
			String basePath = req.getScheme() + "://" + req.getServerName()
					+ ":" + req.getServerPort() + path + "/";

			res.setContentType("text/html;charset=UTF-8");
			res.getWriter().println(
					"<script language=\"JavaScript\">alert('非法访问或者服务过期，请重新登录');"
							+ "window.top.location.href='" + basePath
							+ "loginController.do?login_main';</script>");
		}
	}

	public void destroy() {
	}
}
