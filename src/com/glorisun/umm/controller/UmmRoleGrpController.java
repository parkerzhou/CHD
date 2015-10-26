package com.glorisun.umm.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.LinkedHashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.core.util.EncodingUtils;
import com.glorisun.chd.pojo.UserInfo;
import com.glorisun.umm.pojo.UmmRoleGrpInfo;
import com.glorisun.umm.report.ExcelView;
import com.glorisun.umm.report.PDFView;
import com.glorisun.umm.service.IUmmRoleGrpService;

@Controller
@RequestMapping("/ummRoleGrpController")
public class UmmRoleGrpController {

	final String success = "提交成功!";
	final String fail = "提交失败!";

	final String deleteSuccess = "删除成功!";
	final String deleteFail = "删除失败!";

	/**
	 * 客户管理服务接口 提供客户管理模块的所有服务
	 */
	@Autowired
	IUmmRoleGrpService ummRoleGrpService;
	
	@RequestMapping(params="loadForm")
	public void loadForm(HttpServletRequest request,
			HttpServletResponse response,String roleGrpOptType,String userGrpId) throws IOException {
		response.setContentType("text/html;charset=utf-8;");
		response.getWriter().println(
				ummRoleGrpService.loadForm(roleGrpOptType,userGrpId));
	}
	
	@RequestMapping(params = "addorEditRoleGrp")
	public void addorEditRoleGrp(HttpServletRequest request,HttpServletResponse response,UmmRoleGrpInfo ummRoleGrpInfo,String roleGrpOptType) throws IOException {
		HttpSession session=(HttpSession)request.getSession();
		//System.out.println(ummRoleGrpInfo.getUserGrpRange());
		UserInfo userinfo=(UserInfo)session.getAttribute(Constant.GB_SESSION_USERINFO);
		//System.out.println(ummRoleGrpService.addorEditRoleGrp(ummRoleGrpInfo,roleGrpOptType,userinfo.getId()));
		response.setContentType("text/html;charset=utf-8;");
		response.getWriter().println(ummRoleGrpService.addorEditRoleGrp(ummRoleGrpInfo,roleGrpOptType,userinfo.getId()));
	}
	
	@RequestMapping(params = "delRoleGrp")
	public void delRoleGrp(HttpServletRequest request,
			HttpServletResponse response, String idArray) throws IOException {
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(
				ummRoleGrpService.delRoleGrp(idArray));
	}
	
	@RequestMapping(params = "searchRoleGrp")
	public void searchRoleGrp(HttpServletRequest request,
			HttpServletResponse response, String roleGrpCode, String roleGrpName,
			String roleGrpRange) throws IOException {
//		roleGrpCode = EncodingUtils.transfterCode(roleGrpCode);// 客户
//		roleGrpName = EncodingUtils.transfterCode(roleGrpName);// 客户
//		roleGrpRange = EncodingUtils.transfterCode(roleGrpRange);// 联系人名字
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(ummRoleGrpService.searchRoleGrp(roleGrpCode, roleGrpName,
				roleGrpRange));
	}
	
	@RequestMapping(params = "getRange.json")
	public void queryRangeInfo(HttpServletRequest request,
			HttpServletResponse response,int search) throws IOException {
		response.setContentType("text/html;charset=utf-8");
		//System.out.println(search);
		response.getWriter().println(ummRoleGrpService.queryRangeInfo(search));
	}

	/**
	 * 验证新增用户代码是否已存在
	 * 判断新增窗口所输入的用户代码字段是否在数据库中已存在，存在则返回“false”代表该用户不可用，否则则返回“true”代表该用户代码可用
	 */

	@RequestMapping(params="validateUmmRoleGrpData.json")
	public ModelAndView validateCode(HttpServletResponse response,
			HttpServletRequest request) {

		try {
			// 从request中获得检索条件code
			String code = request.getParameter("code");
			String roleGrpOptType = request.getParameter("roleGrpOptType");
			String userGrpCode = request.getParameter("userGrpCode");
			//System.out.println(roleGrpOptType+" + " + userGrpCode);
			int roleCount = 0;
			// 检索指定code的值是否已存在
			String roleGrpAllstr = ummRoleGrpService.searchRoleGrp("","",""+0);
			JSONArray roleGrpAll = JSONArray.fromObject(roleGrpAllstr);
			for (int i = 0; i < roleGrpAll.size(); i++) {
				if (code.equals(roleGrpAll.getJSONObject(i).get("userGrpCode"))) {
					roleCount = 1;
				}
				if(roleGrpOptType.equals("1") && code.equals(userGrpCode)) {
					roleCount = 0;
				}
			}

			// 写回验证结果
			response.setCharacterEncoding("utf-8");
			//System.out.println("roleCount="+roleCount);
			// roleCount为0说明角色代码不存在
			if (roleCount == 0) {
				// 返回true代表该角色代码可用
				response.getWriter().write("true");
			} // end of if(role == 0)
			else if (roleCount == 1)// roleCount为1说明角色代码存在
			{
				// 返回false代表该角色代码可用
				response.getWriter().write("false");
			}

		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}
	
	/**
	 * 导出excel和pdf
	 * @throws UnsupportedEncodingException 
	 */
	@RequestMapping(params = "rejectData")
	public ModelAndView rejectUserGrpController(String format,String fileName,
			String roleGrpCode, String roleGrpName,String roleGrpRange) throws IOException {
		//map中的每个键为pojo的属性名称，值为中文名称，即导出后的列名
		//必须使用LinkedHashMap，否则列名会乱序。
		roleGrpCode = new String(roleGrpCode.getBytes("ISO8859-1"), "UTF-8");
		roleGrpName = new String(roleGrpName.getBytes("ISO8859-1"), "UTF-8");
		roleGrpRange = new String(roleGrpRange.getBytes("ISO8859-1"), "UTF-8");
		String toReport = ummRoleGrpService.searchRoleGrp(roleGrpCode, roleGrpName,
				roleGrpRange);
		LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
		System.out.println("enter");
		//导出后列的排序和put进去的顺序相同
		map.put("userGrpCode", "代码");
		map.put("userGrpName", "名称");
		map.put("userGrpRange", "适用范围");
		map.put("userGrpOrderseq", "排序");
		
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