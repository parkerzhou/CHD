package com.glorisun.umm.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.glorisun.umm.comm.CommonUtil;
import com.glorisun.umm.comm.StringView;
import com.glorisun.umm.pojo.Company;
import com.glorisun.umm.pojo.TUserDet;
import com.glorisun.umm.pojo.TUserGrp;
import com.glorisun.umm.pojo.TUserType;
import com.glorisun.umm.pojo.User;
import com.glorisun.umm.pojo.UserState;
import com.glorisun.umm.report.UserInfoExcelView;
import com.glorisun.umm.report.UserInfoPdfView;
import com.glorisun.umm.service.IUmmUserInfoService;
/**
 * 实现用户管理功能，包括增删查改及导出功能
 * @author ZhongShengjun
 * @version 1,2014-4-8
 */
@Controller
@RequestMapping("/ummUserInfoController")
public class UmmUserInfoController {
	private List<User> userInfo;
	@Autowired
	private IUmmUserInfoService userInfoService;
	
	public IUmmUserInfoService getUserInfoService() {
		return userInfoService;
	}

	public void setUserInfoService(IUmmUserInfoService userInfoService) {
		this.userInfoService = userInfoService;
	}
	/*
	 * 获得用户信息
	 * 该方法用于获取数据库中的用户信息，并将用户信息以JSON数组形式写回请求页面
	 */
	@RequestMapping(params = "getUserInfo")
	public ModelAndView getUserInfo(String ug_name,String userId,String userName,String nickName,String ut_type,String state,HttpServletRequest request,HttpServletResponse response)throws IOException{
		System.out.println(ug_name);
		System.out.println(userId);
		if(!ug_name.equals("所有") || !userId.equals("") || !userName.equals("") || !nickName.equals("") || !ut_type.equals("所有") || !state.equals("所有")){
			searchUserInfo(ug_name,userId,userName,nickName,ut_type,state,request,response);
		}else{
			//获取用户信息
			List<User> users = userInfoService.getUserInfo();
			//保存当前datagrid显示的用户信息
			userInfo=users;
			
			//将用户信息转换成JSON
			JSONArray json = new JSONArray();
			json.addAll(users);
			//写回信息
			response.setCharacterEncoding("utf-8");
			response.setContentType("text/html; charset=UTF-8");
			response.getWriter().write(json.toString());
		}

		return null;
	}
	
	/*
	 * 添加用户信息
	 */
	@RequestMapping(params ="addUserInfo")
	public void addUserInfo(String userId,String userName,String nickName,String email,String mobileNo,String telNo,String faxNo,
			String ug_name,String ut_type,String state,String addr,String usCompany,HttpServletRequest request,HttpServletResponse response)throws IOException{
		//设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");
		
		//获取当前时间
		SimpleDateFormat SDFormat = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");     
		String ud_creadeDate = SDFormat.format(new java.util.Date()); 
		
		//取当前时间的后5位数字进行MD5加密
		String lastFiveNumber = ""; 
/*		String[] ymd_hms=ud_creadeDate.split(" ");//根据空格进行分割成数组
		String hms=ymd_hms[1];//hh:mm:ss
		String[] h_m_s=hms.split(":");//根据':'进行分割成数组
		String number=h_m_s[0]+h_m_s[1]+h_m_s[2];//连接成纯数字 
		if(number.length()==6){
			lastFiveNumber=number.substring(1);
		}else{
			lastFiveNumber=number;
		}*/
		lastFiveNumber="888888";
			
		String us_userPwd=CommonUtil.getMD5(lastFiveNumber);//用MD5进行加密
		User user=new User();
		user.setUs_userId(userId);
		user.setUs_userName(userName); 
		if(nickName!=""){
			user.setUs_nickName(nickName);
		}else{
			user.setUs_nickName(null);
		}
		user.setUs_userPwd(us_userPwd);
		if(email!=""){
			user.setUs_email(email);
		}else{
			user.setUs_email(null);
		}
		user.setUs_mobileNo(mobileNo);
/*		TUser user=new TUser();
		user.setUs_userId(userId);
		user.setUs_userName(userName); 
		user.setUs_nickName(nickName);
		user.setUs_userPwd(us_userPwd);
		user.setUs_email(email);;
		user.setUs_mobileNo(mobileNo);*/
		user.setUs_state(state);
		user.setUs_company(usCompany);

		TUserDet userDet=new TUserDet();
		userDet.setUd_telNo(telNo);
		userDet.setUd_faxNo(faxNo);
		userDet.setUd_addr(addr);
		userDet.setUd_createDate(ud_creadeDate); 
		
		response.setContentType("text/html; charset=utf-8");
		response.getWriter().print(userInfoService.addUserInfo(user,userDet,ug_name,ut_type));
	}
	
	/*
	 * 修改用户信息
	 */
	@RequestMapping(params ="alterUserInfo")
	public ModelAndView alterUserInfo(String id,String ug_name,String userId,String userName,String nickName,String email,String mobileNo,
			String ut_type,String state,String telNo,String faxNo,String addr,String usCompany,HttpServletRequest request,HttpServletResponse response)throws IOException{
		//设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");
		if(userInfoService.getUgRange(ug_name) != userInfoService.getUtRange(ut_type)){
			return new ModelAndView(new StringView("用户群组和用户类型的适用范围冲突，请重试！"));
		}
		
		
		User user=new User();
		user.setUs_id(Integer.parseInt(id)); 
		user.setUs_userId(userId);
		user.setUs_userName(userName); 
		if(nickName!=""){
			user.setUs_nickName(nickName);
		}else{
			user.setUs_nickName(null);
		}
		if(email!=""){
			user.setUs_email(email);
		}else{
			user.setUs_email(null);
		}
		user.setUs_mobileNo(mobileNo);
		user.setUs_state(state);
		user.setUg_name(ug_name);
		user.setUt_type(ut_type);
		user.setUd_telNo(telNo);
		user.setUd_faxNo(faxNo);
		user.setUd_addr(addr);
		user.setUs_company(usCompany);
		boolean result=userInfoService.alterUserInfo(user);
		if(result)
			return new ModelAndView(new StringView("true"));
		else
			return new ModelAndView(new StringView("false"));
	}
	
	/*
	 * 删除用户信息，支持批量删除
	 */
	@RequestMapping(params ="deleteUserInfo")
	public void deleteUserInfo(@RequestParam("us_ids[]")Integer[] us_ids,HttpServletRequest request,HttpServletResponse response)throws IOException{
		response.setContentType("text/html; charset=utf-8");
		response.getWriter().print(userInfoService.deleteUserInfoById(us_ids));
	}
	
	/**
	 * 导出Excel or PDF
	 * @param model
	 * @param request
	 * @param response
	 * @return ModelAndView
	 */
	@RequestMapping(params ="exportExcelOrPDF")
	public ModelAndView dcExcelOrPDF(ModelMap model, HttpServletRequest request,HttpServletResponse response)throws IOException{
		String exportModel = request.getParameter("exportModel");
		String filename = request.getParameter("filename");
	//	System.out.println(exportModel);
	//	System.out.println(filename);

		//如果exportModel为"PDF",则导出方式为"PDF"
		if(exportModel.equals("PDF"))
		{
			UserInfoPdfView view = new UserInfoPdfView(userInfo,filename);
			return new ModelAndView(view, model);
		}
		else
		{
			//用excel方式导出
			UserInfoExcelView view = new UserInfoExcelView(userInfo,filename); 
			return new ModelAndView(view, model);
		}
	}
	
	/*
	 * 查找用户信息
	 */
	@RequestMapping(params ="searchUserInfo")
	public ModelAndView searchUserInfo(String ug_name,String userId,String userName,String nickName,String ut_type,String state,
			HttpServletRequest request,HttpServletResponse response)throws IOException{
		//设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");

		User user=new User();
		user.setUs_userId(userId);
		user.setUs_userName(userName); 
		user.setUs_nickName(nickName);
		user.setUs_state(state);
		user.setUg_name(ug_name);
		user.setUt_type(ut_type);
		List<User> users = userInfoService.searchUserInfo(user);
		userInfo=users;
	//	System.out.println(userInfo+"1");
		//将用户信息转换成JSON
		JSONArray json = new JSONArray();
		json.addAll(users);
		//写回信息
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		response.getWriter().write(json.toString());
		return null;
	}
	
	/*
	 * 从数据库中获取用户群组的名称，并转化为JSON格式的字符串传回用户群组下拉列表框 
	 */
	@RequestMapping(params ="getUserGrpNameComboboxData")
	public ModelAndView getUserGrpNameComboboxData(HttpServletRequest request,HttpServletResponse response)throws IOException{
		List<TUserGrp> userGrps = userInfoService.getUserGrpName();
		if(request.getMethod()=="GET"){//如何请求类型为GET，则添加用户群组名称“所有”
			TUserGrp userGrp=new TUserGrp();
			userGrp.setUg_name("所有");
			userGrps.add(0, userGrp);
		}
		
		//将用户群组转换成JSON
		JSONArray json = new JSONArray();
		json.addAll(userGrps);
		
		//写回信息
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		response.getWriter().write(json.toString());
		return null;
	}
	
	/*
	 * 从数据库中获取用户类型，并转化为JSON格式的字符串传回用户类型下拉列表框 
	 */
	@RequestMapping(params ="getUserTypeComboboxData")
	public ModelAndView getUserTypeComboboxData(HttpServletRequest request,HttpServletResponse response)throws IOException{
		List<TUserType> userTypes = userInfoService.getUserType();
		if(request.getMethod()=="GET"){//如何请求类型为GET，则为用户类型添加“所有”名称
			TUserType userType=new TUserType();
			userType.setUt_type("所有");
			userTypes.add(0, userType);
		}
		//将用户类型转换成JSON
		JSONArray json = new JSONArray();
		json.addAll(userTypes);
		
		//写回信息
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		response.getWriter().write(json.toString());
		return null;
	}
	/*
	 * 从数据库中获取状态，并转化为JSON格式的字符串传回状态下拉列表框 
	 */
	@RequestMapping(params ="getUserStateComboboxData")
	public ModelAndView getUserStateComboboxData(HttpServletRequest request,HttpServletResponse response)throws IOException{
		List<UserState> userStates = userInfoService.getUserState();
 		if(request.getMethod()=="GET"){//如何请求类型为GET，则为用户类型添加“所有”名称
			UserState userState=new UserState();
			userState.setState("所有");
			userStates.add(0,userState);
		}
		//将用户类型转换成JSON
		JSONArray json = new JSONArray();
		json.addAll(userStates);
		
		//写回信息
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		response.getWriter().write(json.toString());
		return null;
	}
	/*
	 * 根据用户类型进行联动分范围获取用户群组的名称，并转化为JSON格式的字符串传回用户群组下拉列表框 
	 */
	@RequestMapping(params ="getUserGrpNameByTypeComboboxData")
	public ModelAndView getUserGrpNameByTypeComboboxData(@RequestParam("ut_type") String ut_type,HttpServletRequest request,HttpServletResponse response)throws IOException{
		//设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");
		ut_type=new String(ut_type.getBytes("iso-8859-1"), "UTF-8");
	//	System.out.println(ut_type);
		List<TUserGrp> userGrps = userInfoService.getUserGrpNameByType(ut_type);
		
		//将用户群组转换成JSON
		JSONArray json = new JSONArray();
		json.addAll(userGrps);
		
		//写回信息
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		response.getWriter().write(json.toString());
		
		return null;
	}
	/*
	 * 获取所在公司下拉框数据
	 */
	@RequestMapping(params ="getCompanyComboboxData")
	public ModelAndView getCompanyComboboxData(HttpServletRequest request,HttpServletResponse response)throws IOException{
		//设置请求字符格式为“UTF-8”
		List<Company> cmpList = userInfoService.getCompanys();
		
		JSONArray json = new JSONArray();
		json.addAll(cmpList);
		
		//写回信息
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html; charset=UTF-8");
		response.getWriter().write(json.toString());
		
		return null;
	}
}
