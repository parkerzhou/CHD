package com.glorisun.umm.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.glorisun.chd.report.service.IReportService;
import com.glorisun.chd.service.InitService;

@Controller
@RequestMapping("/ummController")
public class UmmController {

	private IReportService reportService;

	@Autowired
	public void setReportService(IReportService reportService) {
		this.reportService = reportService;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(params = "pageCreate")
	public ModelAndView pageCreate(HttpServletRequest request) {
		String strFuid = request.getParameter("fuid");
		return new ModelAndView("/report/reportMain");
	}

	
}
