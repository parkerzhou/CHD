package com.glorisun.chd.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.apache.poi.util.SystemOutLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.glorisun.chd.core.util.JSONHelper;
import com.glorisun.chd.pojo.AgrPayDtlInfo;
import com.glorisun.chd.pojo.AgrPayInfo;
import com.glorisun.chd.pojo.DTLAInfo;
import com.glorisun.chd.pojo.DTLBInfo;
import com.glorisun.chd.pojo.DTLCInfo;
import com.glorisun.chd.pojo.FprojTender;
import com.glorisun.chd.pojo.FprojTenderDtlA;
import com.glorisun.chd.pojo.FrojTenderDtlB;
import com.glorisun.chd.pojo.FrojTenderDtlC;
import com.glorisun.chd.pojo.JmsAgreement;
import com.glorisun.chd.pojo.JmsAgreementPayDtl;
import com.glorisun.chd.pojo.JmsFprojReg;
import com.glorisun.chd.pojo.Jmscompany;
import com.glorisun.chd.pojo.PerbInfo;
import com.glorisun.chd.pojo.QuaMarInfo;
import com.glorisun.chd.pojo.agrPayDtl2;
import com.glorisun.chd.service.FranService;
import com.glorisun.chd.service.impl.FranServiceImpl;
import com.glorisun.umm.report.ExcelView;
import com.glorisun.umm.report.PDFView;

@Controller
@RequestMapping("/franController")
public class FranController {
	@Autowired
	FranService franService;
	
	

	@RequestMapping(params = "CmpComboInfo")
	public void CmpComboInfo(HttpServletResponse response, String cmp) {
		output(response, franService.CmpComboInfo(cmp));
	}

	// 输出方法
	private void output(HttpServletResponse response, String cmpComboInfo) {
		response.setContentType("text/html; charset=utf-8");
		try {
			response.getWriter().print(cmpComboInfo);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/**
	 * 加盟方维护-首页加载
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(params = "loadFran")
	public void loadFran(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// System.out.println(franService.loadFran());
		output(response, franService.loadFran());
		// System.out.println(franService.loadFran());
	}

	/**
	 * 加盟方维护-加载修改界面数据
	 * 
	 * @param request
	 * @param response
	 * @param cmp_id
	 *            主键id
	 * @throws Exception
	 */
	@RequestMapping(params = "loadFranById")
	public void loadFranById(HttpServletRequest request,
			HttpServletResponse response, String cmp_seq) throws Exception {
		// System.out.println(franService.loadFran());
		output(response, franService.loadFranById(cmp_seq));
	}

	/**
	 * 加盟方维护-删除
	 * 
	 * @param request
	 * @param response
	 * @param cmp_ids
	 *            主键id数组
	 * @throws Exception
	 */
	@RequestMapping(params = "delFran")
	public void delFran(HttpServletRequest request,
			HttpServletResponse response, String cmp_ids) throws Exception {
		System.out.println(cmp_ids);
		output(response, franService.delFran(cmp_ids));
	}

	/**
	 * 加盟方代码文本框失焦时调用的函数
	 * 
	 * @param cmp_id
	 *            加盟方代码
	 */
	@RequestMapping(params = "loadFranInfo")
	public void loadFranInfo(HttpServletRequest request,
			HttpServletResponse response, String cmp_id) {
		// System.out.println(franService.loadFran());
		output(response, franService.loadFranInfo(cmp_id));
	}

	/**
	 * 加盟方维护-新增或删除
	 * 
	 * @param request
	 * @param response
	 * @param jmscompany
	 * @param optType
	 *            操作符（新增为1或修改为0）
	 */
	@RequestMapping(params = "addOrEditFranInfo")
	public void addOrEditFranInfo(HttpServletRequest request,
			HttpServletResponse response, Jmscompany jmscompany, String optType) {
		// System.out.println(jmscompany.getCmp_province().trim());
		output(response,
				franService.addOrEditFranInfo(request, jmscompany, optType));

	}

	/**
	 * 加盟方维护-加载所属公司
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(params = "loadCompany")
	public void loadCompany(HttpServletRequest request,
			HttpServletResponse response) {

		output(response, franService.loadCompany());

	}

	/**
	 * 加盟方维护-所属公司资料
	 * 
	 * @param request
	 * @param response
	 * @param companyCn
	 *            公司代号或公司名称
	 */
	@RequestMapping(params = "searchCompany")
	public void searchCompany(HttpServletRequest request,
			HttpServletResponse response, String companyCn, String preCmp) {
		output(response, franService.searchCompany(companyCn, preCmp));
	}

	/**
	 * 加盟工程项目登记-首页加载
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(params = "loadFproj")
	public void loadFproj(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		 //System.out.println("3452414213");
		output(response, franService.loadFproj());
	}
	

	/**
	 * 加盟工程项目登记-加载雇员资料
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(params = "loadEmployees")
	public void searchEmployees(HttpServletRequest request,
			HttpServletResponse response) {
		output(response, franService.loadEmployees());
	}

	/**
	 * 加盟工程项目登记-删除
	 * 
	 * @param request
	 * @param response
	 * @param pre_regseqs
	 * @throws Exception
	 */
	@RequestMapping(params = "delFproj")
	public void delFproj(HttpServletRequest request,
			HttpServletResponse response, String pre_regseqs) throws Exception {
		output(response, franService.delFproj(pre_regseqs));
	}

	@RequestMapping(params = "addOrEditFprojInfo")
	public void addOrEditFprojInfo(HttpServletRequest request,
			HttpServletResponse response, JmsFprojReg jmsFprojReg,
			String optType) {
		output(response,
				franService.addOrEditFprojInfo(request, jmsFprojReg, optType));

	}

	/**
	 * 加盟工程登记-雇员资料刷新功能
	 * 
	 * @param request
	 * @param response
	 * @param employeesDcn
	 * @param employeesScn
	 */
	@RequestMapping(params = "checkEmployees")
	public void checkEmployees(HttpServletRequest request,
			HttpServletResponse response, String employeesDcn,
			String employeesScn) {

		output(response, franService.checkEmployees(employeesDcn, employeesScn));
	}

	/**
	 * 加盟工程登记-加载部门信息
	 * 
	 * @param request
	 * @param response
	 * @param cmp_id_name
	 * @param dept_id_name
	 */
	@RequestMapping(params = "searchDept")
	public void searchDept(HttpServletRequest request,
			HttpServletResponse response, String cmp_id_name,
			String dept_id_name) throws Exception {

		// System.out.println(dept_id_name);
		output(response, franService.DeptInfo(cmp_id_name, dept_id_name));

	}

	/**
	 * 加盟工程登记-加载加盟方信息
	 * 
	 * @param request
	 * @param response
	 * @param fran_id_name
	 */

	@RequestMapping(params = "loadFprojById")
	public void loadFprojById(HttpServletRequest request,
			HttpServletResponse response, String pre_regseq) {
		output(response, franService.loadFprojById(pre_regseq));
	}

	@RequestMapping(params = "searchFprojFran")
	public void searchFprojFran(HttpServletRequest request,
			HttpServletResponse response, String fran_id_name, String filterStr)
			throws Exception {
        
		// System.out.println(dept_id_name);
		output(response, franService.FprojFranInfo(fran_id_name, filterStr));

	}

	/**
	 * 加载加盟工程项目中的预审年度以及预审序号
	 */
	@RequestMapping(params = "loadYearSeq")
	public void loadYearSeq(HttpServletRequest request,
			HttpServletResponse response) {
		output(response, franService.loadYearSeq());
	}

	@RequestMapping(params = "getCommPage")
	public ModelAndView getCommPage(HttpServletRequest request,
			HttpServletResponse response, String page) {
		ModelAndView md = new ModelAndView("data/" + page + "Dlg");
		/*
		 * if(page.equals("areaSel")){ md = new ModelAndView("data/areaSelDlg");
		 * } if(page.equals("deptSel")){ md = new
		 * ModelAndView("data/deptSelDlg"); } if(page.equals("cmpSel")){ md =
		 * new ModelAndView("data/cmpSelDlg"); } if(page.equals("empl")){ md =
		 * new ModelAndView("data/emplDlg"); } if(page.equals("fprojFranSel")){
		 * md = new ModelAndView("data/franSelDlg"); }
		 * if(page.equals("projSel")){ md = new ModelAndView("data/projSelDlg");
		 * }
		 */

		return md;
	}

	// 第四模块
	/**
	 * 加盟方管理协议-首页加载
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(params = "loadAgree")
	public void loadAgree(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// System.out.println(franService.loadFran());
		output(response, franService.loadAgree());
	}

	@RequestMapping(params = "saveOrUpdateAgreeInfo")
	public void saveOrUpdateAgreeInfo(HttpServletRequest request,
			HttpServletResponse response, JmsAgreement jmsAgreement,
			String optType) {
		// System.out.println(jmsAgreement.getFRANS_ID());
		output(response, franService.saveOrUpdateAgreeInfo(request,
				jmsAgreement, optType));

	}

	/**
	 * 加盟工程项目管理协议-加载工程资料信息
	 * 
	 * @param request
	 * @param response
	 * @param frans_id
	 */

	@RequestMapping(params = "checkProj")
	public void checkProj(HttpServletRequest request,
			HttpServletResponse response, String frans_id, String filterStr) {
		output(response, franService.checkProj(frans_id, filterStr));

	}

	@RequestMapping(params = "loadAgreeById")
	public void loadAgreeById(HttpServletRequest request,
			HttpServletResponse response, String AGREE_SEQ) {
		output(response, franService.loadAgreeById(AGREE_SEQ));
	}

	@RequestMapping(params = "delAgree")
	public void delAgree(HttpServletRequest request,
			HttpServletResponse response, String AGREE_SEQ) {
		output(response, franService.delAgree(AGREE_SEQ));
	}

	@RequestMapping(params = "loadPerbProjs")
	public void loadPerbProjs(HttpServletRequest request,
			HttpServletResponse response, String frans_id) {
		output(response, franService.loadPerbProjs(frans_id));
	}

	@RequestMapping(params = "loadPerbProjs2")
	public void loadPerbProjs2(HttpServletRequest request,
			HttpServletResponse response, String frans_id) {
		output(response, franService.loadPerbProjs2(frans_id));
	}

	@RequestMapping(params = "getCmpqualInfos")
	public void getCmpqualInfos(HttpServletRequest request,
			HttpServletResponse response) {
		output(response, franService.getCmpqualInfos());
	}

	@RequestMapping(params = "getCmpqualInfosC")
	public void getCmpqualInfosC(HttpServletRequest request,
			HttpServletResponse response) {
		output(response, franService.getCmpqualInfosC());
	}

	@RequestMapping(params = "addOrEditPerbInfo")
	public void addOrEditPerbInfo(HttpServletRequest request,
			HttpServletResponse response, PerbInfo perbInfo, String optType,
			String DTLAJsonData, String DTLBJsonData, String DTLCJsonData) {
		List<DTLAInfo> DTLAInfos = JSONArray.toList(
				JSONArray.fromObject(DTLAJsonData), DTLAInfo.class);
		List<DTLBInfo> DTLBInfos = JSONArray.toList(
				JSONArray.fromObject(DTLBJsonData), DTLBInfo.class);
		List<DTLCInfo> DTLCInfos = JSONArray.toList(
				JSONArray.fromObject(DTLCJsonData), DTLCInfo.class);

		output(response, franService.addOrEditPerbInfo(perbInfo, optType,
				DTLAInfos, DTLBInfos, DTLCInfos));
	}

	@RequestMapping(params = "addOrEditQuaInfo")
	public void addOrEditQuaInfo(HttpServletRequest request,
			HttpServletResponse response, QuaMarInfo quaMarInfo,
			String optType, String DTLAJsonData, String DTLBJsonData,
			String DTLCJsonData) {
		List<DTLAInfo> DTLAInfos = JSONArray.toList(
				JSONArray.fromObject(DTLAJsonData), DTLAInfo.class);
		List<DTLBInfo> DTLBInfos = JSONArray.toList(
				JSONArray.fromObject(DTLBJsonData), DTLBInfo.class);
		List<DTLCInfo> DTLCInfos = JSONArray.toList(
				JSONArray.fromObject(DTLCJsonData), DTLCInfo.class);
		output(response, franService.addOrEditQuaInfo(quaMarInfo, optType,
				DTLAInfos, DTLBInfos, DTLCInfos));
	}

	@RequestMapping(params = "loadPerb")
	public void loadPerb(HttpServletRequest request,
			HttpServletResponse response) {
		output(response, franService.loadPerb());
	}

	@RequestMapping(params = "loadQuaInfos")
	public void loadQuaInfos(HttpServletRequest request,
			HttpServletResponse response) {
		output(response, franService.loadQuaInfos());
	}

	@RequestMapping(params = "loadQuaById")
	public void loadQuaById(HttpServletRequest request,
			HttpServletResponse response, String quality_seq) {
		output(response, franService.loadQuaById(quality_seq));
	}

	@RequestMapping(params = "loadPerbById")
	public void loadPerbById(HttpServletRequest request,
			HttpServletResponse response, String performance_seq) {
		String jsonData = franService.loadPerbById(performance_seq);
		// System.out.println(jsonData);
		request.getParameter("username");
		output(response, jsonData);
	}

	@RequestMapping(params = "delPerb")
	public void delPerb(HttpServletRequest request,
			HttpServletResponse response, String performance_seqs) {
		output(response, franService.delPerb(performance_seqs));
	}

	// 付款申请 =========================廖伟亮 开始
	// ==================================================

	@RequestMapping(params = "loadAgreePay")
	public void delFproj(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		output(response, franService.loadAgreePay());
	}

	@RequestMapping(params = "searchFranPro")
	public void searchFranPro(HttpServletRequest request,
			HttpServletResponse response, String franPro,String frans_id,String filterStr) throws Exception {
		output(response, franService.searchFranPro(franPro,frans_id,filterStr));
	}

	@RequestMapping(params = "loadPcoms")
	public void loadPcoms(HttpServletRequest request,
			HttpServletResponse response, String proj_id) throws Exception {
		output(response, franService.loadPcoms(proj_id));
	}

	@RequestMapping(params = "getPercents")
	public void getPercents(HttpServletRequest request,
			HttpServletResponse response, String proj_no, String pay_amount)
			throws Exception {

		output(response, franService.getPercents(proj_no, pay_amount));

	}

	@RequestMapping(params = "saveOrEditAgrPayInfo")
	public void saveOrEditAgrPayInfo(HttpServletRequest request,
			HttpServletResponse response, AgrPayInfo agrPayInfo,
			String agrPayDtlsAddArr, String agrPayDtlsEditArr,
			String agrPayDtlsDelArr, String optType) {

		if (agrPayInfo.getPay_flag() == null
				|| agrPayInfo.getPay_flag().equals("")) {
			agrPayInfo.setPay_flag("0");
		} else {
			agrPayInfo.setPay_flag("1");
		}
		List<AgrPayDtlInfo> agrPayDtlAddInfos = new ArrayList<AgrPayDtlInfo>();
		// System.out.println(agrPayDtlsAddArr);
		if (!agrPayDtlsAddArr.equals("[]")) {
			agrPayDtlAddInfos = JSONArray
					.toList(JSONArray.fromObject(agrPayDtlsAddArr),
							AgrPayDtlInfo.class);
		}
		List<AgrPayDtlInfo> agrPayDtlEditInfos = new ArrayList<AgrPayDtlInfo>();
		if (!agrPayDtlsEditArr.equals("[]")) {
			agrPayDtlEditInfos = JSONArray.toList(
					JSONArray.fromObject(agrPayDtlsEditArr),
					AgrPayDtlInfo.class);
		}
		franService.saveOrEditAgrPayInfo(agrPayInfo, agrPayDtlAddInfos,
				agrPayDtlEditInfos, agrPayDtlsDelArr, optType);
		// System.out.println(JSONHelper.array2json(agrPayDtlAddInfos));
	}

	@RequestMapping(params = "loadAgreePayById")
	public void loadAgreePayById(HttpServletRequest request,
			HttpServletResponse response, String AGREE_SEQ) {
		output(response, franService.loadAgreePayById(AGREE_SEQ));
	}

	@RequestMapping(params = "delAgrPay")
	public void delAgrPay(HttpServletRequest request,
			HttpServletResponse response, String AGREE_SEQS) {
		output(response, franService.delAgrPay(AGREE_SEQS));
	}

	// 付款申请 =========================余深宝 开始
	// ==================================================
	@RequestMapping(params = "getAgrPercents")
	public void getAgrPercents(HttpServletRequest request,
			HttpServletResponse response, String proj_id, String agree_seq,
			String compact_amt) {
		output(response,
				franService.getAgrPercents(proj_id, agree_seq, compact_amt));
	}

	@RequestMapping(params = "loadAgrPay")
	public void loadAgrPay(HttpServletRequest request,
			HttpServletResponse response) {
		output(response, franService.loadAgrPay());
	}

	@RequestMapping(params = "saveOrEditAgrPayDelInfo")
	public void saveOrEditAgrPayDelInfo(HttpServletRequest request,
			HttpServletResponse response, AgrPayInfo agrPayInfo,
			String agrPayDtlsAddArr, String agrPayDtlsEditArr,
			String agrPayDtlsDelArr, String optType) {

		if (agrPayInfo.getReturnbail_flag() == null
				|| agrPayInfo.getReturnbail_flag().equals("")) {
			agrPayInfo.setReturnbail_flag("0");
		} else {
			agrPayInfo.setReturnbail_flag("1");
		}
		agrPayInfo.setNick("0");
		List<agrPayDtl2> agrPayDtlAddInfos = new ArrayList<agrPayDtl2>();
		if (!agrPayDtlsAddArr.equals("[]")) {
			agrPayDtlAddInfos = JSONArray.toList(
					JSONArray.fromObject(agrPayDtlsAddArr), agrPayDtl2.class);
		}
		List<agrPayDtl2> agrPayDtlEditInfos = new ArrayList<agrPayDtl2>();
		if (!agrPayDtlsEditArr.equals("[]")) {
			agrPayDtlEditInfos = JSONArray.toList(
					JSONArray.fromObject(agrPayDtlsEditArr), agrPayDtl2.class);
		}

		franService.saveOrEditAgrPayDelInfo(agrPayInfo, agrPayDtlAddInfos,
				agrPayDtlEditInfos, agrPayDtlsDelArr, optType);
	}

	@RequestMapping(params = "getPayamByFranID")
	public void getPayamByFranID(HttpServletRequest request,
			HttpServletResponse response, String frans_id) {
		output(response, franService.getPayamByFranID(frans_id));
	}

	@RequestMapping(params = "delQua")
	public void delQua(HttpServletRequest request,
			HttpServletResponse response, String quality_seqs) {
		output(response, franService.delQua(quality_seqs));
	}

	@RequestMapping(params = "loadAgrPayById")
	public void loadAgrPayById(HttpServletRequest request,
			HttpServletResponse response, String AGREE_SEQ) {
		output(response, franService.loadAgrPayById(AGREE_SEQ));
	}

	@RequestMapping(params = "delAgrPay2")
	public void delAgrPay2(HttpServletRequest request,
			HttpServletResponse response, String AGREE_SEQS) {
		output(response, franService.delAgrPay2(AGREE_SEQS));
	}

	/**
	 * 加盟工程工程投标-加载证书信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping(params = "getCertificates")
	public void getCertificates(HttpServletResponse response) {
		output(response, franService.Certificates());
	}

	@RequestMapping(params = "loadStaff")
	public void loadStaff(HttpServletRequest request,
			HttpServletResponse response, String cmpqual_seq) {
		output(response, franService.loadStaff(cmpqual_seq));
	}

	// 加盟工程提交进展情况--新增中的投标按钮下的劳动合同的新增按钮==============廖伟亮==========

	@RequestMapping(params = "loadRen")
	public void loadRen(HttpServletRequest request, HttpServletResponse response) {
		output(response, franService.loadRen());
	}

	@RequestMapping(params = "loadBidCon")
	public void loadBidCon(HttpServletRequest request,
			HttpServletResponse response) {
		output(response, franService.loadBidCon());
	}

	@RequestMapping(params = "searchFproj")
	public void searchFproj(HttpServletRequest request,
			HttpServletResponse response, String cmp_id,String filterStr) {
		
		output(response, franService.searchFproj(cmp_id,filterStr));
	}

	@RequestMapping(params = "loadIns")
	public void loadIns(HttpServletRequest request, HttpServletResponse response) {
		output(response, franService.loadIns());
	}

	@RequestMapping(params = "loadCmpIntelFiles")
	public void loadCmpIntelFiles(HttpServletRequest request,
			HttpServletResponse response) {
		output(response, franService.loadCmpIntelFiles());
	}

	// 加盟工程提交进展情况--新增或修改的提交按钮==================廖伟亮
	// 开始=======================================

	@RequestMapping(params = "saveOrEditFprojTender")
	public void saveOrEditFprojTender(HttpServletRequest request,
			HttpServletResponse response, FprojTender fprojTender,
			String PZhengsAddArr, String PContractsAddArr,
			String PInsuranceAddArr, String TContractsAddArr,
			String TInsuranceAddArr, String TZhengAddArr, String PCom,
			String Tcom, String optType) {


		/*
		 * System.out.println(optType);
		 * 
		 * System.out.println(JSONHelper.bean2json(fprojTender));
		 * System.out.println
		 * ("=================="+PZhengsAddArr+"==================");
		 * System.out.println(PContractsAddArr);
		 * System.out.println(PInsuranceAddArr);
		 * System.out.println(TContractsAddArr);
		 * System.out.println(TInsuranceAddArr);
		 * System.out.println(TZhengAddArr);
		 * System.out.println("=========nihao "+PCom); System.out.println(Tcom);
		 */
        
//		System.out.println("=================="+PZhengsAddArr+"==================");
		
		

		List<FrojTenderDtlB> PZhengsAddArrs = JSONArray.toList(
				JSONArray.fromObject(PZhengsAddArr), FrojTenderDtlB.class);
	//	System.out.println("======廖伟看来======"+JSONHelper.array2json(PZhengsAddArrs)+"==================");
		
		
		List<FrojTenderDtlC> PContractsAddArrs = JSONArray.toList(
				JSONArray.fromObject(PContractsAddArr), FrojTenderDtlC.class);
		List<FrojTenderDtlC> PInsuranceAddArrs = JSONArray.toList(
				JSONArray.fromObject(PInsuranceAddArr), FrojTenderDtlC.class);
		List<FrojTenderDtlC> TContractsAddArrs = JSONArray.toList(
				JSONArray.fromObject(TContractsAddArr), FrojTenderDtlC.class);
		List<FrojTenderDtlC> TInsuranceAddArrs = JSONArray.toList(
				JSONArray.fromObject(TInsuranceAddArr), FrojTenderDtlC.class);
//		System.out.println(TZhengAddArr);
		List<FrojTenderDtlB> TZhengAddArrs = JSONArray.toList(
				JSONArray.fromObject(TZhengAddArr), FrojTenderDtlB.class);
		List<FprojTenderDtlA> PComs = JSONArray.toList(
				JSONArray.fromObject(PCom), FprojTenderDtlA.class);
		List<FprojTenderDtlA> Tcoms = JSONArray.toList(
				JSONArray.fromObject(Tcom), FprojTenderDtlA.class);

		franService.saveOrEditFprojTender(fprojTender, PZhengsAddArrs,
				PContractsAddArrs, PInsuranceAddArrs, TContractsAddArrs,
				TInsuranceAddArrs, TZhengAddArrs, PComs, Tcoms, optType);
		// System.out.println(JSONHelper.array2json(agrPayDtlAddInfos));
	}

	
	@RequestMapping(params = "delTender")
	public void delTender(HttpServletRequest request,
			HttpServletResponse response, String PRE_REGSEGS) {
		//System.out.println("wet");
		output(response, franService.delTender(PRE_REGSEGS));
	}
	
	
	
	
	
	
	
	
	
	
	// 加盟工程提交进展情况--新增或修改的提交按钮==================廖伟亮
	// 结束=======================================
    //加载首页
	@RequestMapping(params = "loadTender")
	public void loadTender(HttpServletRequest request,
			HttpServletResponse response) {
		output(response, franService.loadTender());
	}
    //修改投标
	@RequestMapping(params = "loadTenderById")
	public void loadTenderById(HttpServletRequest request,
			HttpServletResponse response,String PRE_REGSEQ) {
		output(response, franService.loadTenderById(PRE_REGSEQ));
	}
	
	@RequestMapping(params="exportProj")
	public ModelAndView exportProj(HttpServletRequest request,HttpServletResponse response,
			String type,String choice,String filename)throws UnsupportedEncodingException{
		LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
		String toReport = franService.exportProj(choice,map);
		if(type.equalsIgnoreCase("pdf")){
			PDFView view = new PDFView(toReport, map, filename);
			return new ModelAndView(view);
		}
		else{
			ExcelView view = new ExcelView(toReport, map, filename);
			return new ModelAndView(view);
		}
	}
	
	//加盟方资料报表
	@RequestMapping(params = "GetPDForEXCEL")
	public ModelAndView GetPDForEXCEL(HttpServletRequest request,
			HttpServletResponse response,String formtype,String name)throws UnsupportedEncodingException {
		
		String toReport = franService.GetPDForEXCEL();
		//map中的每个键为pojo的属性名称，值为中文名称，即导出后的列名
		//必须使用LinkedHashMap，否则列名会乱序。
		LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
		
		//导出后列的排序和put进去的顺序相同
		map.put("cmp_name", "公司全称");
		map.put("cmp_craft_name", "公司行业");
		map.put("cmp_type_name", "公司类别");
		map.put("cmp_address", "公司地址");
		map.put("cmp_charger", "法定代表人");
		map.put("cmp_tel1", "联系电话");
		map.put("cmp_contactor2", "第二联系人");
		map.put("cmp_tel2", "联系电话");
		if(formtype.equalsIgnoreCase("0")){
			PDFView view = new PDFView(toReport, map, name);
			return new ModelAndView(view);
		}
		else{
			ExcelView view = new ExcelView(toReport, map, name);
			return new ModelAndView(view);
		}
	}
	
	@RequestMapping(params = "GetFprojPDForEXCEL")
	public ModelAndView GetFprojPDForEXCEL(HttpServletRequest request,
			HttpServletResponse response,String formtype,String name) {
		String a = franService.GetFprojPDForEXCEL();
LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
		
		//导出后列的排序和put进去的顺序相同
		map.put("pre_seq", "序号");
		map.put("pre_no", "工程编号");
		map.put("proj_name", "工程名称");
		map.put("proj_addr", "工程地址");
		map.put("cust_sname", "顾客公司");
		map.put("fran_sname", "加盟方");
		map.put("sign_state", "项目类型");
		if(formtype.equalsIgnoreCase("0")){
			PDFView view = new PDFView(a, map, name);
			return new ModelAndView(view);
		}
		else{
			ExcelView view = new ExcelView(a, map, name);
			return new ModelAndView(view);
		}
	}
	
}
