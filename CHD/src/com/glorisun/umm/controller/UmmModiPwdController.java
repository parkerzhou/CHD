package com.glorisun.umm.controller;

import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.pojo.UserInfo;
import com.glorisun.umm.service.IUmmModiPwdService;



@Controller
@RequestMapping("/UmmModiPwdController")
public class UmmModiPwdController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

	/** 密码修改模块服务 */
	@Autowired
	IUmmModiPwdService ummModiPwdService;
	
   
	/** 调用修改用户密码窗体 */
	@RequestMapping(params = "loadModiPwd")
	public ModelAndView loadmodiPwd(HttpServletRequest request) {
		UserInfo userInfo = (UserInfo) (request.getSession()
				.getAttribute(Constant.GB_SESSION_USERINFO));
		request.setAttribute("user", userInfo);
		return new ModelAndView("/umm/ummModiPwd");
	}
	
	/**
	 * 检测用户旧密码
	 * 
	 * @throws IOException
	 */
	@RequestMapping(params = "checkOldPwd")
	public void checkOldPwd(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		UserInfo userInfo = (UserInfo) (request.getSession()
				.getAttribute(Constant.GB_SESSION_USERINFO));
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		int id = userInfo.getId();
		String old_psw = (String) request.getParameter("user_oldpsw");

		int iRet = ummModiPwdService.checkoldpwd(id, old_psw);
		if (iRet == 1) {
			response.getWriter().println("1");
		} else {
			response.getWriter().println("-1");
		}
	}
	
	/**
	 * 修改用户密码
	 * 
	 * @throws IOException
	 */
	@RequestMapping(params = "modiPwd")
	public void modiPwd(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		UserInfo userInfo = (UserInfo) (request.getSession()
				.getAttribute(Constant.GB_SESSION_USERINFO));
		request.setCharacterEncoding("utf-8");
		response.setCharacterEncoding("utf-8");
		int id = userInfo.getId();

		String new_psw = (String) request.getParameter("user_newpsw");
		int iRet = ummModiPwdService.modifypwd(id, new_psw);
		if (iRet == 1) {
			response.getWriter().println("1");
		} else {
			response.getWriter().println("-1");
		}
	}
	
}
