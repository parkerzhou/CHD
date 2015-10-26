package com.glorisun.umm.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.LinkedHashMap;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.glorisun.umm.pojo.Range;
import com.glorisun.umm.pojo.UserType;
import com.glorisun.umm.report.ExcelView;
import com.glorisun.umm.report.PDFView;
import com.glorisun.umm.service.IUmmRoleService;
import com.glorisun.umm.service.IUmmUserTypeService;

/**
 * 实现用户类型的新增，删除，修改和查看功能
 * 使用用前台页面传送过来的用户类型数据新增、更新用户类型，或者删除数据库中相应的用户类型的数据，还可以查看指定的用户类型
 */
@Controller
@RequestMapping("/ummUserTypeController")
public class UmmUserType {
	
	@Autowired
	IUmmUserTypeService userTypeService;

	/**
	 * 供外部调用 调用拜访费用界面
	 */
	@RequestMapping(params = "callUserType")
	public ModelAndView main() {
		return new ModelAndView("/umm/ummUserType");
	}
	
	
	/**
	 * 获取指定用户类型和范围的用户类型
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(params = "loadUserType")
	public void loadUserType(HttpServletRequest request,HttpServletResponse response,String range)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");
		String type = new String(request.getParameter("type").getBytes("iso8859-1"),"utf-8");

		//获取角色范围
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(userTypeService.loadUserType(type,range));
	}
	
	/**
	 * 获取适用范围
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(params = "getRangeInfo")
	public void getRangeInfo(HttpServletRequest request,HttpServletResponse response)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");

		//获取角色范围
		String info = userTypeService.getRangeInfo();
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(info);
	}
	
	/**
	 * 获取适用范围除去所有
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(params = "getRangeInfoNoAll")
	public void getRangeInfoNoAll(HttpServletRequest request,HttpServletResponse response)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");

		//获取角色范围
		String info = userTypeService.getRangeInfoNoAll();
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(info);
	}
	
	/**
	 * 验证用户类型
	 * @param request
	 * @param response
	 * @param type
	 * @param id
	 * @throws IOException
	 */
	@RequestMapping(params = "validateUserType")
	public void validateUserType(HttpServletRequest request,HttpServletResponse response, String type, int id)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");


		//获取角色范围
		String info = userTypeService.validateUserType(type,id);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().print(info);
	}
	
	/**
	 * 保存用户类型
	 * @param request
	 * @param response
	 * @param ut
	 * @throws IOException
	 */
	@RequestMapping(params = "addUserType")
	public void addUserType(HttpServletRequest request,HttpServletResponse response,UserType ut)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");
	

		//获取角色范围
		String info = userTypeService.addUserType(ut);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().print(info);
	}
	
	/**
	 * 获取用户类型
	 * @param request
	 * @param response
	 * @param ut
	 * @throws IOException
	 */
	@RequestMapping(params = "getUserTypeById")
	public void getUserTypeById(HttpServletRequest request,HttpServletResponse response,int ut_id)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");
	

		//获取角色范围
		String info = userTypeService.getUserTypeById(ut_id);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().print(info);
	}
	
	
	/**
	 * 删除用户类型
	 * @param request
	 * @param response
	 * @param ut_id
	 * @throws IOException
	 */
	@RequestMapping(params = "deleteUserType")
	public void deleteUserType(HttpServletRequest request,HttpServletResponse response,String ids)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");

		//获取角色范围
		String info = userTypeService.deleteUserType(ids);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().print(info);
	}

		


	/**
	 * 导出Excel
	 * 
	 * @param model
	 * @param projectId
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(params = "UserTypedcExcelOrPDF")
	public ModelAndView UserTypedcExcelOrPDF(String format, String fileName, String type, String range) throws UnsupportedEncodingException {
		type = new String(type.getBytes("iso8859-1"),"utf-8");
		String toReport = userTypeService.loadUserType(type,range);
		// map中的每个键为pojo的属性名称，值为中文名称，即导出后的列名
		// 必须使用LinkedHashMap，否则列名会乱序。
		LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();

		// 导出后列的排序和put进去的顺序相同
		map.put("ut_type", "用户类型");
		map.put("ut_range", "适用范围");
		
		if (format.equalsIgnoreCase("pdf")) {
			// 用toReport和map创建一个PDFview，fileName为导出的文件名
			PDFView view = new PDFView(toReport, map, fileName);
			return new ModelAndView(view);
		} else {
			// 同上
			ExcelView view = new ExcelView(toReport, map, fileName);
			return new ModelAndView(view);
		}
	}
}
