package com.glorisun.chd.report.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URLEncoder;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.core.def.SystemGlobalObj;
import com.glorisun.chd.core.util.DataDictionaryUtil;
import com.glorisun.chd.core.util.UploadUtils;
import com.glorisun.chd.core.util.excel.ExporterlUtil;
import com.glorisun.chd.core.util.excel.TransferUtil;
import com.glorisun.chd.pojo.DataDictionary;
import com.glorisun.chd.pojo.FuncItem;
import com.glorisun.chd.pojo.UserInfo;
import com.glorisun.chd.pojo.json.AjaxJson;
import com.glorisun.chd.report.common.ReportConst;
import com.glorisun.chd.report.pojo.FilterItem;
import com.glorisun.chd.report.pojo.ReportCondition;
import com.glorisun.chd.report.pojo.ReportFilter;
import com.glorisun.chd.report.pojo.ReportParam;
import com.glorisun.chd.report.service.IReportService;

@Controller
@RequestMapping("/reportController")
public class ReportController {

	private IReportService reportService;

	@Autowired
	public void setReportService(IReportService reportService) {
		this.reportService = reportService;
	}

	@RequestMapping(params = "htmlView")
	public String redirect() {
		return "redirect:/temp/menu102_1.html";
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(params = "htmlTest")
	@ResponseBody
	public ModelAndView htmlTest(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		// httpHeaderExcelFileAttachment("D:\\menu102_1.html",0);
		// String storeName = "menu102_1.html";
		// String realName = "menu102_1.html";
		// String contentType = "application/octet-stream";
		//
		// download(request, response, storeName, contentType,
		// realName);
		//
		// return null;

		// return new ModelAndView("redirect:/htmlreports/menu102_1.html");
		String str = "redirect:menu102_1.html";
		return new ModelAndView(str);

	}

	public static void download(HttpServletRequest request,
			HttpServletResponse response, String downLoadPath, String contentType,
			String realName) throws Exception {
		response.setContentType("text/html;charset=UTF-8");
		request.setCharacterEncoding("UTF-8");
		BufferedInputStream bis = null;
		BufferedOutputStream bos = null;

		long fileLength = new File(downLoadPath).length();

		response.setContentType(contentType);
		response.setHeader("Content-disposition", "attachment; filename="
				+ new String(realName.getBytes("utf-8"), "ISO8859-1"));
		response.setHeader("Content-Length", String.valueOf(fileLength));

		bis = new BufferedInputStream(new FileInputStream(downLoadPath));
		bos = new BufferedOutputStream(response.getOutputStream());
		byte[] buff = new byte[2048];
		int bytesRead;
		while (-1 != (bytesRead = bis.read(buff, 0, buff.length))) {
			bos.write(buff, 0, bytesRead);
		}
		bis.close();
		bos.close();
	}

	/**
	 * easyuiAJAX请求数据
	 * 
	 * @param request
	 * @param response
	 * @param fuid
	 * @param user
	 * @throws SQLException
	 * @throws ClassNotFoundException
	 * @throws IOException
	 * @throws FileNotFoundException
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(params = "queryReport")
	@ResponseBody
	private AjaxJson queryReport(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		AjaxJson j = new AjaxJson();
		response.setCharacterEncoding("utf-8");
		response.setContentType("application/json");
		response.setHeader("Cache-Control", "no-store");

		String[] codes = request.getParameterValues("fi_Code");
		String[] names = request.getParameterValues("fi_Name");
		String[] includeModels = request.getParameterValues("includeModel");
		String repStyle = request.getParameter(ReportConst.REPORT_FILTER_STYLE);

		String strOutType = request
				.getParameter(ReportConst.REPORT_FILTER_OUT_TYPE);
		int nOutType = 3;
		if (strOutType != null && "".equals(strOutType)) {
			nOutType = Integer.parseInt(strOutType);
		}

		String strFuid = request.getParameter(Constant.GB_PARAM_FUNC_ID);
		Map<Integer, FuncItem> menu = (Map<Integer, FuncItem>) request
				.getSession().getAttribute(Constant.GB_SESSION_MENU);

		Map<String, DataDictionary> mapDd = DataDictionaryUtil
				.getDataDictionary(request.getSession());

		if (strFuid != null && !("".equals(strFuid))) {
			UserInfo ui = (UserInfo) request.getSession().getAttribute(
					Constant.GB_SESSION_USERINFO);
			FuncItem fi = menu.get(Integer.parseInt(strFuid));

			Integer nResSeq = (Integer) request.getSession().getAttribute(
					ReportConst.REPORT_RESULT_SEQ + strFuid);

			if (nResSeq == null) {
				nResSeq = 1;
			} else {
				nResSeq++;
			}

			ReportParam rp = new ReportParam();

			rp.setReportId(Integer.toString(fi.getId()));
			rp.setSessionId(request.getSession().getId());
			rp.setUserInfo(ui);
			rp.setServiceType(fi.getServType());
			rp.setServiceResources(fi.getServReso());
			rp.setReportStyle(repStyle == null ? "" : repStyle);

			List<ReportCondition> lsRd = new ArrayList<ReportCondition>();
			for (int i = 0; i < codes.length; i++) {
				ReportCondition rd = new ReportCondition();
				rd.setId(i + 1);
				rd.setCondCode(codes[i]);
				rd.setCondName(names[i]);
				rd.setIncludeModel(Integer.parseInt(includeModels[i]));
				rd.setSeq(i + 1);
				lsRd.add(rd);
			}
			if (rp.getAttributes() == null) {
				Map<String, Object> mapRd = new HashMap<String, Object>();
				rp.setAttributes(mapRd);
			}

			rp.getAttributes().put(ReportParam.C_ATTR_CONDITIONS, lsRd);

			List<SqlRowSet> lsRs = reportService.getDataSources(rp);

			if (lsRs != null && lsRs.size() >= 1) {
				int nState = 0;
				String targetFile = SystemGlobalObj.getMpSytempParam().get(
						SystemGlobalObj.GP_DIR_TEMP);
				String modelFile = SystemGlobalObj.getMpSytempParam().get(
						SystemGlobalObj.GP_DIR_MODEL);
				String fileName = "";
				String targetDir = SystemGlobalObj.getMpSytempParam().get(
						SystemGlobalObj.GP_DIR_TEMP);

				fileName = fi.getFuncCode();
				if (repStyle != null && !("".equals(repStyle))) {
					fileName += repStyle;
				}

				// 临时目录
				UploadUtils.createFolder(targetDir);
				targetDir += "\\" + ui.getId();
				UploadUtils.createFolder(targetDir);
				targetDir += "\\" + request.getSession().getId();
				UploadUtils.createFolder(targetDir);
				targetDir += "\\" + strFuid;
				UploadUtils.createFolder(targetDir);

				targetFile = targetDir + "\\" + fileName + "_"
						+ Integer.toString(nResSeq) + ".xls";

				// 模板文件
				modelFile += "\\" + fileName + ".xls";

				nState = ExporterlUtil.ResultSets2Excel(lsRs, modelFile,
						targetDir, targetFile);

				if (nState == 1) {

					if (nOutType != ReportConst.REPORT_OT_HTML) {

						// String storeName = "menu102_1.html";
						// String realName = "menu102_1.html";
						// String contentType = "application/octet-stream";
						String downLoadPath=targetFile;
						String contentType="application/octet-stream";
						if (nOutType == ReportConst.REPORT_OT_PDF)
						{
							TransferUtil transfer = new TransferUtil(null, null, null, null);

							downLoadPath=targetDir + "\\" + fileName + ".pdf";
							
							transfer.excelToHtml(targetFile ,
									downLoadPath);
							
						}
						
						download(request, response, downLoadPath, contentType,
								fileName);
						return null;
					} else {
						
						Map<String, Object> mapAttr = new HashMap<String, Object>();
						mapAttr.put(
								"subtitle",
								fi.getFuncName()
										+ "["
										+ DataDictionaryUtil.getDictValue(
												mapDd,
												"report.structure.queryResult",
												"查询结果") + nResSeq.toString()
										+ "]");
						mapAttr.put("addUrl", "reportController.do?viewHtml");
						mapAttr.put("fuid", "fuid=" + strFuid);
						mapAttr.put("uId", "uId=" + ui.getId());
						mapAttr.put("fName", "fName=" + fileName + "_"
								+ Integer.toString(nResSeq));
						mapAttr.put("resultSeq",
								"resultSeq=" + nResSeq.toString());
						mapAttr.put("icon", "icons icon-report-output");
						j.setAttributes(mapAttr);

						request.getSession().setAttribute(
								ReportConst.REPORT_RESULT_SEQ + strFuid,
								nResSeq);
					}
				} else {
					if (nState == -100) {
					} else {
						j.setSuccess(false);
						j.setMsg(DataDictionaryUtil.getDictValue(mapDd,
								"report.error.exporterError", "数据导出错误!"));
					}
				}
			} else {
				j.setSuccess(false);
				j.setMsg(DataDictionaryUtil.getDictValue(mapDd,
						"report.error.queryError", "查询错误!"));
			}

		} else {
			j.setSuccess(false);
			j.setMsg(DataDictionaryUtil.getDictValue(mapDd,
					"report.error.noFuncion", "无功能ID!"));
		}
		return j;
	}

	// @SuppressWarnings("unchecked")
	// @RequestMapping(params = "queryReport1")
	// @ResponseBody
	// public AjaxJson queryReport1(HttpServletRequest request,
	// HttpServletResponse response) throws ClassNotFoundException,
	// SQLException, FileNotFoundException, IOException {
	//
	// return this.queryReport(request, response);
	// }

	// @SuppressWarnings("unchecked")
	// @RequestMapping(params = "queryReport2")
	// @ResponseBody
	// public void queryReport2(HttpServletRequest request,
	// HttpServletResponse response) throws ClassNotFoundException,
	// SQLException, FileNotFoundException, IOException {
	//
	// String strFuid = request.getParameter(Constant.GB_PARAM_FUNC_ID);
	// String strUid = request.getParameter("uid");
	// String strFileName = request.getParameter("fName");
	// String targetFile = SystemGlobalObj.getMpSytempParam().get(
	// SystemGlobalObj.GP_DIR_TEMP);
	//
	//
	// targetFile += "\\" + strUid;
	// targetFile += "\\" + request.getSession().getId();
	// targetFile += "\\" + strFuid;
	//
	//
	// }

	@SuppressWarnings("unchecked")
	@RequestMapping(params = "viewHtml")
	public String viewHtml(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("text/html;charset=utf-8");
		String strFuid = request.getParameter(Constant.GB_PARAM_FUNC_ID);
		String strUid = request.getParameter("uId");
		String strFileName = request.getParameter("fName");
		String targetFile = SystemGlobalObj.getMpSytempParam().get(
				SystemGlobalObj.GP_DIR_TEMP);

		targetFile += "\\" + strUid;
		targetFile += "\\" + request.getSession().getId();
		targetFile += "\\" + strFuid;

		String HtmlFile =SystemGlobalObj.getMpSytempParam().get(
				SystemGlobalObj.GP_DIR_TEMP);
		
		HtmlFile += "/" + strUid;
		HtmlFile += "/" + request.getSession().getId();
		HtmlFile += "/" + strFuid;
	
		TransferUtil transfer = new TransferUtil(null, null, null, null);

		transfer.excelToHtml(targetFile + "\\" + strFileName + ".xls",
				targetFile + "\\" + strFileName + ".html");

		String strReturn = "redirect:/"+HtmlFile+"/"+ strFileName + ".html";

		return strReturn;

	}

	
	@SuppressWarnings("unchecked")
	@RequestMapping(params = "pageCreate")
	public ModelAndView pageCreate(HttpServletRequest request) {

		String strFuid = request.getParameter(Constant.GB_PARAM_FUNC_ID);
		if (strFuid != null && !("".equals(strFuid))) {

			UserInfo ui = (UserInfo) request.getSession().getAttribute(
					Constant.GB_SESSION_USERINFO);

			ReportParam rp = new ReportParam();
			rp.setReportId(strFuid);
			rp.setUserInfo(ui);
			rp.setSessionId(request.getSession().getId());
			Map<Integer, ReportFilter> mapFilter = reportService
					.getFilterItems(rp);

			request.getSession().setAttribute(
					ReportConst.REPORT_FILTER_MAP + strFuid, mapFilter);
			request.setAttribute(Constant.GB_PARAM_FUNC_ID, strFuid);
		}
		return new ModelAndView("/report/reportFilter");
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(params = "repResult")
	public ModelAndView repResult(HttpServletRequest request) {
		String strFuid = request.getParameter("fuid");
		return new ModelAndView("/report/reportFilter");
	}

	
	@SuppressWarnings("unchecked")
	@RequestMapping(params = "repPop")
	public ModelAndView repPop(HttpServletRequest request) {
		String strFId = request.getParameter(Constant.GB_PARAM_FUNC_ID);
		String strRId = request.getParameter(ReportConst.REPORT_FILTER_ID);
		String initVal = request
				.getParameter(ReportConst.REPORT_FILTER_INITVAL);

		if ((strFId != null && !("".equals(strFId)))
				&& (strRId != null && !("".equals(strRId)))) {
			Map<Integer, ReportFilter> mapFilter = (Map<Integer, ReportFilter>) request
					.getSession().getAttribute(
							ReportConst.REPORT_FILTER_MAP + strFId);

			ReportFilter rf = mapFilter.get(Integer.parseInt(strRId));

			if (initVal != null && !("".equals(initVal))) {
				Map<String, FilterItem> mapFi = rf.getFilterItems();

				if (mapFi != null && mapFi.size() >= 1) {
					String[] iv = initVal.split(",");

					for (String s : iv) {
						for (FilterItem fi : mapFi.values()) {
							if (fi.getDataKey().equals(s)) {
								fi.setSelected(true);
								break;
							}
						}
					}

				}
			}

			request.setAttribute(ReportConst.REPORT_FILTER_DET, rf);

		}

		return new ModelAndView("/report/repDetFilter");
	}

}
