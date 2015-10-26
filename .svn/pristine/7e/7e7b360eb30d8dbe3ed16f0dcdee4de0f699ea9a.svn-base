package com.glorisun.umm.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.glorisun.umm.pojo.Role;
import com.glorisun.umm.report.ExcelView;
import com.glorisun.umm.report.PDFView;
import com.glorisun.umm.service.IUmmRoleService;

/**
 * 实现角色增，删，查，改功能
 * 用前台页面传送过来的数据新增、更新或者删除数据库中相应的角色数据,还有查看指定字段模糊搜索的角色信息
 */
@Controller
@RequestMapping("/ummRoleController")
public class UmmRoleController {

	@Autowired
	IUmmRoleService roleService;
	
	/**
	 * 供外部调用 调用拜访费用界面
	 */
	@RequestMapping(params = "callRole")
	public ModelAndView main() {
		return new ModelAndView("/umm/ummRole");
	}
		
	/**
	 * 获取角色范围
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(params = "getRangeInfo")
	public void getRangeInfo(HttpServletRequest request,HttpServletResponse response)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");

		//获取角色范围
		String info = roleService.getRangeInfo();
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(info);
	}
	
	
	/**
	 * 获取指定代码，名称，范围的角色
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(params = "loadRoleInfo")
	public void loadRoleInfo(HttpServletRequest request,HttpServletResponse response)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");

		//获取参数
		String roleCode = new String(request.getParameter("roleCode").getBytes("iso8859-1"),"utf-8");
		String roleName = new String(request.getParameter("roleName").getBytes("iso8859-1"),"utf-8");
		String range = request.getParameter("Range");
		

		//获取角色范围
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(roleService.loadRoleInfo(roleCode,roleName,range));
	}

	
	/**
	 * 获取适用范围
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(params = "getRangeInfoNoAll")
	public void getRangeInfoNoAll(HttpServletRequest request,HttpServletResponse response)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");

		//获取角色范围
		String info = roleService.getRangeInfoNoAll();
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(info);
	}

	
	/**
	 * 验证角色代码可用性
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(params = "validataCode")
	public void validataCode(HttpServletRequest request,HttpServletResponse response, int id, String code)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");


		String info = roleService.validataCode(id,code);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().print(info);
	}
	
	/**
	 * 验证角色名称
	 * @param request
	 * @param response
	 * @param id 角色id 
	 * @param code 角色代码
	 * @throws IOException
	 */
	@RequestMapping(params = "validateName")
	public void validateName(HttpServletRequest request,HttpServletResponse response, int id, String name)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");
		

		String info = roleService.validataName(id,name);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().print(info);
	}
	
	
	@RequestMapping(params = "saveRoleInfo")
	public void saveRoleInfo(HttpServletRequest request,HttpServletResponse response, Role role)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");
		
		String info = roleService.saveRoleInfo(role);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().print(info);
	}
	
	
	/**
	 * 获取指定id的角色
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping(params = "getRole")
	public void loadRoleInfo(HttpServletRequest request,HttpServletResponse response,int rl_id)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");


		//获取角色范围
		String info = roleService.getRole(rl_id);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(info);
	}
	
	
	/**
	 * 批量删除角色
	 * @param request
	 * @param response
	 * @param idArray 角色id数组
	 * @throws IOException
	 */
	@RequestMapping(params = "delRole")
	public void delRole(HttpServletRequest request,HttpServletResponse response,String idArray)throws IOException {
		// 设置请求字符格式为“UTF-8”
		request.setCharacterEncoding("utf-8");


		//获取角色范围
		String info = roleService.delRole(idArray);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(info);
	}
	
	
	/**
	 * 导出操作
	 * @param request
	 * @param response
	 * @return 
	 * @throws UnsupportedEncodingException 
	 * @throws IOException
	 */
	@RequestMapping(params = "roleDcExcelOrPDF")
	public ModelAndView roleDcExcelOrPDF(String format,String fileName, String roleCode, String roleName, String Range) throws UnsupportedEncodingException {
		
		roleCode = new String(roleCode.getBytes("iso8859-1"),"utf-8");
		roleName = new String(roleName.getBytes("iso8859-1"),"utf-8");
		
		String toReport = roleService.loadRoleInfo(roleCode,roleName,Range);
		//map中的每个键为pojo的属性名称，值为中文名称，即导出后的列名
		//必须使用LinkedHashMap，否则列名会乱序。
		LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
		
		//导出后列的排序和put进去的顺序相同
		map.put("rl_code", "角色代码");
		map.put("rl_name", "角色名称");
		map.put("rl_range", "适用范围");
		map.put("rl_orderSeq", "排序");
		
		if (format.equalsIgnoreCase("pdf")) {
			//用toReport和map创建一个PDFview，fileName为导出的文件名
			PDFView view = new PDFView(toReport, map, fileName);
			return new ModelAndView(view);
		} else {
			//同上
			ExcelView view = new ExcelView(toReport, map, fileName);
			return new ModelAndView(view);
		}
	}
}
