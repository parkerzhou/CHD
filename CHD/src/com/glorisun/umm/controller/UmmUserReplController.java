package com.glorisun.umm.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;



import com.glorisun.chd.core.util.JSONListView;
import com.glorisun.chd.core.util.StringView;

import com.glorisun.umm.pojo.UmmUserReplInfo;
import com.glorisun.umm.report.ExcelView;
import com.glorisun.umm.report.PDFView;
import com.glorisun.umm.service.IUmmUserReplService;

@Controller
@RequestMapping("/ummReplController")
public class UmmUserReplController {
	
	@Autowired
	private IUmmUserReplService iurs;

//	private  final String  OK = "提交成功！";
//	private final String ERROR = "提交失败！";
	
	private final String DOK = "删除成功！";
	private final String DERROR = "删除失败！";

	/***
	 * 首页 返回至/page/home.jsp页面
	 * 
	 * @return
	 */

	// 拦截获取初始化表格的数据，并根据情况交给相应的控制器
	@RequestMapping(params="search")
	public void getUserRepl(HttpServletRequest request, HttpServletResponse response, String ftime, String stime) throws IOException {
		//System.out.println("seven");
		
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(iurs.searchUmmUserRepl(ftime, stime));
		

	}
	// 拦截获取用户的请求  获取 用户信息 供 新增的时候 给用户选择 
	@RequestMapping(params = "getuser")
	public ModelAndView getUserName() {
		List<Map<String, Object>> list = iurs.getOldUserName();
		return new ModelAndView(new JSONListView(list));
	}
	
	// 替换表的 新增和修改 
	@RequestMapping(params="addOrEdit")
	public void addOrEdit(HttpServletRequest request, HttpServletResponse response , UmmUserReplInfo uurInfo,String OptType) throws IOException
	{
		
		 String message =  iurs.addOrEditRepl(uurInfo, OptType);	 
		 response.setContentType("text/html;charset=utf-8");
		 response.getWriter().println(message);
	}
	
	
	   // 删除操作
		@RequestMapping( params="deleteRepl")
		public ModelAndView delete(int  ur_id) {
			//System.out.println("删除");
			 
			boolean a = iurs.deleateRepl(ur_id);
			if (a) {
				return new ModelAndView(new StringView(DOK));
			} else {
				return new ModelAndView(new StringView(DERROR));
			}
		}
		
		
		
		
//		// 导出表格
	@RequestMapping(params="rejectRepl")
	public ModelAndView dcExcelOrPDF(String format,String fileName, String ftime, String stime) throws IOException {
//		String format = request.getParameter("format");
//		String fileName = request.getParameter("fileName");
		ftime = new String(ftime.getBytes("ISO8859-1"), "UTF-8");
		stime = new String(stime.getBytes("ISO8859-1"), "UTF-8");
		String toReport  = iurs.searchUmmUserRepl(ftime, stime);  //保存包导出的数据
		LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
		
		//导出后列的排序和put进去的顺序相同
		map.put("ur_beRepl", "旧用户");
		map.put("ur_replace", "新用户");
		map.put("ur_replDate", "生效时间");
		map.put("ur_OperUserid", "操作人");
		map.put("ur_opDate", "操作时间");
		
		if (format.equals("pdf")) {
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
