package com.glorisun.chd.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.core.util.EncodingUtils;
import com.glorisun.chd.pojo.UserInfo;
import com.glorisun.chd.service.ICommService;

/**
 * 公用控制器 用于所有的公用组件
 */
@Controller
@RequestMapping("/commController")
public class CommController {

	/** 公用模块服务 */
	@Autowired
	ICommService commService;
	
	/** 调用测试页面时使用 */
	@RequestMapping(params = "callTestPage")
	public ModelAndView main() {
		return new ModelAndView("/comm/test");
	}
	
	/** 调用行业代码选择页面时使用 */
	@RequestMapping(params = "calltradeCodePage")
	public ModelAndView tradeCode() {
		return new ModelAndView("/comm/tradeCodeDialog");
	}
	
	/** 调用拜访记录选择页面时使用 */
	@RequestMapping(params = "callVisitPage")
	public ModelAndView visit() {
		return new ModelAndView("/comm/visitDialog");
	}
	
	/** 调用部门资料选择页面时使用 */
	@RequestMapping(params = "callDeptPage")
	public ModelAndView dept() {
		return new ModelAndView("/comm/deptDialog");
	}
	
	/** 调用公司资料选择页面时使用 */
	@RequestMapping(params = "callCompanyPage")
	public ModelAndView company() {
		return new ModelAndView("/comm/companyDialog");
	}
	
	/** 调用客户资料选择页面时使用 */
	@RequestMapping(params = "callCustPage")
	public ModelAndView cust() {
		return new ModelAndView("/comm/custDialog");
	}
	
	/** 调用客户公司资料选择页面时使用 
	 * @throws UnsupportedEncodingException */
	@RequestMapping(params = "callCustCompPage")
	public ModelAndView custComp(HttpServletRequest request,HttpServletResponse response) throws UnsupportedEncodingException {
		return new ModelAndView("/comm/custCompDialog");
	}
	
	/** 调用竞争对手资料选择页面时使用 */
	@RequestMapping(params = "callCompetitorPage")
	public ModelAndView competitor() {
		return new ModelAndView("/comm/competitorDialog");
	}
	
	/** 调用竞争对手服务公司资料选择页面时使用 */
	@RequestMapping(params = "callCompetitorCompPage")
	public ModelAndView competitorComp() {
		return new ModelAndView("/comm/competitorCompDialog");
	}
	
	/** 调用区域资料选择页面时使用 */
	@RequestMapping(params = "callAreaPage")
	public ModelAndView area() {
		return new ModelAndView("/comm/areaDialog");
	}
	
	/** 调用大区资料选择页面时使用 */
	@RequestMapping(params = "callRegionPage")
	public ModelAndView region() {
		return new ModelAndView("/comm/regionDialog");
	}
	
	/** 调用员工资料选择页面时使用 */
	@RequestMapping(params = "callPersonalPage")
	public ModelAndView personal() {
		return new ModelAndView("/comm/personalDialog");
	}
	
	/** 调用联系人资料选择页面时使用 
	 * @throws UnsupportedEncodingException */
	@RequestMapping(params = "callContactslPage")
	public ModelAndView contacts(HttpServletRequest request,HttpServletResponse response) throws UnsupportedEncodingException {
		return new ModelAndView("/comm/contactsDialog");
	}
	
	/** 调用体验联系人资料选择页面时使用 */
	@RequestMapping(params = "callExperienceContactslPage")
	public ModelAndView experienceContacts() {
		return new ModelAndView("/comm/experienceContactsDialog");
	}
	
	/** 调用单选联系人资料选择页面时使用 
	 * @throws UnsupportedEncodingException */
	@RequestMapping(params = "simpleContactslPage")
	public ModelAndView simpleContacts(HttpServletRequest request,HttpServletResponse response) throws UnsupportedEncodingException {
		return new ModelAndView("/comm/simpleContactsDialog");
	}
	
	/** 调用单选体验联系人资料选择页面时使用 */
	@RequestMapping(params = "simpleExperienceContactsPage")
	public ModelAndView simpleExperienceContacts() {
		return new ModelAndView("/comm/simpleExperienceContactsDialog");
	}
	
	/** 调用单选员工人资料选择页面时使用 */
	@RequestMapping(params = "simplePersonalPage")
	public ModelAndView simplePersonal() {
		return new ModelAndView("/comm/simplePersonalDialog");
	}
	
	
	
	
	/** 查询区域对象json数据 */
	@RequestMapping(params = "areaData.json")
	public void queryAreaData(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		response.setContentType("text/html;charset=utf-8");
		// 获取参数
		String objType = request.getParameter("objType");
		String objId = request.getParameter("objId");
		String type = request.getParameter("type");
		String regionThree = request.getParameter("regionThree");
		// 调用服务层,返回数据
		String data = commService.queryAreaData(objType, objId, type,
				regionThree);
		// 响应数据
		response.getWriter().println(data);
	}

	/** 响应级联数据 */
	@RequestMapping(params = "comboxboxdata")
	public void dialogData(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String level = request.getParameter("level");
		String id = request.getParameter("id");
		String cdata = commService.queryCBoxData(level, id);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(cdata);
	}

	
	
	/**
	 * 检测用户输入的区域信息是否重复
	 * @throws IOException
	 */
	@RequestMapping(params = "checkRegion")
	public void checkRegion(HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		String objId = request.getParameter("objId");// 对象ID
		String countryName = request.getParameter("cnT");// 国家名称
		String provinceName = request.getParameter("prT");// 省份名称
		String cityName = request.getParameter("cyT");// 城市名称
		String zoneName = request.getParameter("zeT");// 区县名称
		
		String countryId = request.getParameter("cnV");// 国家ID
		String provinceId = request.getParameter("prV");// 省份ID
		String cityId = request.getParameter("cyV");// 城市ID
		String zoneId = request.getParameter("zeV");// 区县ID
		
		response.getWriter().print(
				commService.checkRegion(objId,countryId,countryName,provinceId,provinceName,
						cityId,cityName,zoneId,zoneName));

	}
	
	
	/**
	 * 响应提交事件
	 * 
	 * @throws IOException
	 */
	@RequestMapping(params = "datasubmit")
	public void formSimbit(HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		String objType = request.getParameter("objType");// 对象类型
		String objId = request.getParameter("objId");// 对象ID
		String type = request.getParameter("type");// 类别
		String regionThree = request.getParameter("regionThree");// 大区三级id

		String counValue = request.getParameter("cnV");// 国家ID
		String counText = request.getParameter("cnT");// 名称
		String provValue = request.getParameter("prV");// 省份ID
		String provText = request.getParameter("prT");// 省份名称
		String cityValue = request.getParameter("cyV");// 城市ID
		String cityText = request.getParameter("cyT");// 城市名称
		String zoneValue = request.getParameter("zeV");// 区县ID
		String zoneText = request.getParameter("zeT");// 区县名称

		
		Object[] t1 = { counValue, counText, provValue, provText, cityValue,
				cityText, zoneValue, zoneText, regionThree };
		Object[] t2 = { objType, objId, type };

		if(regionThree==null||regionThree.equals("")){
			regionThree=null;
		}
		
		if (provText.equals("All") || cityText.equals("All")
				|| zoneText.equals("All")) {
			response.getWriter().print(commService.batchData(t1, t2));// 调用批量处理
		} else {
			response.getWriter().print(commService.submitData(t1, t2));// 调用提交服务
		}
	}

	@RequestMapping(params = "delArea")
	public void delArea(HttpServletRequest request, HttpServletResponse response)
			throws IOException {
		String idArray = request.getParameter("idArray");
		if (idArray != null && !idArray.equals("") || !idArray.equals("null")) {
			String[] idArr = idArray.split(",");
			for (String id : idArr) {
				commService.delArea(Integer.parseInt(id));
			}
		}
		response.getWriter().println("true");
	}

	/**
	 * 用户调用或跳转到附件信息及上传界面
	 * 调用方式commController.do?callUploadPage&part1=&part2=part3=&part4=part5=
	 * part1、part2、part3、part4、part5为需要传入的参数，其后必须有值
	 */
	@RequestMapping(params = "callUploadPage")
	public ModelAndView skipUploadPage(HttpServletRequest request) {
		return new ModelAndView("/comm/annexDialog");
	}
	
	@RequestMapping(params = "callAnnexPage")
	public ModelAndView annex(HttpServletRequest request) {
		return new ModelAndView("/comm/annex");
	}

	/**
	 * 为附件信息界面填充资料
	 * @throws IOException
	 */
	@RequestMapping(params = "uploadPageData")
	public void uploadPageData(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		// 接收参数
		String objType = request.getParameter("objType");
		String objId = request.getParameter("objId");
		// 调用服务，并返回数据
		String data = commService.queryAnnexData(objType, objId);
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(data);// 响应数据
	}

	@RequestMapping(params = "uploadSumit")
	public void uploadSubmit(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		//System.out.println("uploadSumit-->");
		HttpSession session = (HttpSession) request.getSession();
		UserInfo userinfo = (UserInfo) session
				.getAttribute(Constant.GB_SESSION_USERINFO);//获取当前登录的用户
		
		// 解析请求
		MultipartHttpServletRequest multipartRequest = (MultipartHttpServletRequest) request;
		// 获取参数
		String objType = multipartRequest.getParameter("objType");
		String objId = multipartRequest.getParameter("objId");
		String objSubType = multipartRequest.getParameter("objSubType");
		// 获取待上传文件
		Map<String, MultipartFile> fileMap = multipartRequest.getFileMap();
		// 调用服务，执行上传操作
		commService.upload(userinfo.getId(),objType, objId, objSubType, fileMap);
		response.getWriter().println("data");

	}

	/**进入下载模块时或文件上传成功时,更新前台有关文件大小、容量等信息*/
	@RequestMapping(params = "uploadSize")
	public void queryHaveSize(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		// 接收参数
		String objType = request.getParameter("objType");
		String objId = request.getParameter("objId");
		response.getWriter().println(commService.querySize(objType, objId));
	}

	/** 前台用户单击上传附件时,检测用户当前剩余容量或用户上传文件大小是否超过总容量 */
	@RequestMapping(params = "queryAnnexCapacity")
	public void uploadFileCount(HttpServletRequest request,
			HttpServletResponse response, String objType, String objId,
			String selectFileSize) throws IOException {
		response.getWriter().print(
				commService.queryHadUpload(objType, objId, selectFileSize));
	}

	/**删除附件*/
	@RequestMapping(params = "delAnnex")
	public void delAnnex(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		request.setCharacterEncoding("utf-8");
		String idArray = request.getParameter("idArray");
		String objType = request.getParameter("objType");
		String objId = request.getParameter("objId");
		String objSubType = request.getParameter("objSubType");
		String fileArray = request.getParameter("fileArray");
		response.getWriter().print(
				commService.delAnnex(idArray, objType, objId, objSubType,
						fileArray));
	}

	/** 基础资料json数据 */
	@RequestMapping(params = "baseinfo_combobox_data.json")
	public void baseInfo(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		int dsid = Integer.parseInt(request.getParameter("dsid"));
		boolean isAll=Boolean.parseBoolean(request.getParameter("isAll"));
		
		this.output(response, commService.queryBaseInfo(dsid,isAll));
	}

	/**
	 * 员工资料选择json数据
	 */
	@RequestMapping(params = "personal_info.json")
	public void personal(HttpServletRequest request,
			HttpServletResponse response,String idArray,String st,String staffCode,String staffName,String staffComp,String staffDept) throws IOException {
		
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(
				commService.queryPersonInfo(st, idArray, staffCode, staffName,
						staffComp,staffDept));
	}
	
	/**
	 * 员工所属公司json数据 
	 * @throws IOException
	 */
	@RequestMapping(params = "comp_info.json")
	public void compInfo(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(commService.queryCompInfo());
	}
	
	/**
	 * 员工所属部门json数据 
	 * @throws IOException
	 */
	@RequestMapping(params = "dept_info.json")
	public void deptInfo(HttpServletRequest request,
			HttpServletResponse response,String compName) throws IOException {
		response.setContentType("text/html;charset=utf-8");
		response.getWriter().println(commService.queryDeptInfo(compName));
	}

	/**
	 * 联系人资料选择json数据
	 */
	@RequestMapping(params = "contacts_info.json")
	public void contacts(HttpServletRequest request,
			HttpServletResponse response, String st, String custIdArray,
			String idArray, String custCmpName, String ctName, String custName)
			throws IOException {
		String data = commService.queryContactsInfo(st, idArray, custCmpName,
				ctName, custName, custIdArray);
		output(response, data);
	}
	
	/** 体验联系人资料选择json数据 */
	@RequestMapping(params="ex_contacts.json")
	public void ex_contacts(HttpServletRequest request,
			HttpServletResponse response,String theme,String st, String custIdArray,
			String idArray, String custCmpName, String ctName, String custName) {
		
		String data = commService.queryExContacts(theme,st, idArray, custCmpName,
				ctName, custName, custIdArray);
		output(response, data);
	}

	/**
	 * 公司选择
	 * @throws IOException
	 */
	@RequestMapping(params = "cmpChoice")
	public void CmpChoice(HttpServletRequest request,
			HttpServletResponse response,String compCode,String compSName) throws IOException {
		String data=commService.queryComp(compCode, compSName);
		output(response,data);
	}

	/** 部门选择模块 */
	@RequestMapping(params = "deptChoice")
	public void DeptChoice(HttpServletRequest request,
			HttpServletResponse response,String compName,String deptName) throws IOException {
		String data=commService.queryDept(compName, deptName);
		output(response, data);
	}

	/** 行业代码查询模块 */
	@RequestMapping(params = "tradeInfo.json")
	public void tradeInfo(HttpServletRequest request,
			HttpServletResponse response,String tradeType,String tradeCode) {
		/*String tradeType = request.getParameter("tradeType");
		String tradeCode = request.getParameter("tradeCode");*/
		output(response, commService.queryTradeCode(tradeType, tradeCode));
	}

	/** 大区资料选择模块 */
	@RequestMapping(params = "region.json")
	public void regionInfo(HttpServletRequest request,
			HttpServletResponse response,String custId,String regionOneName,String regionTwoName,String regionThreeName) {
		
		
		output(response, commService.queryRegionInfo(custId,regionOneName,
				regionTwoName, regionThreeName));
	}

	/** 客户资料选择模块 */
	@RequestMapping(params = "cust.json")
	public void custInfo(HttpServletRequest request,
			HttpServletResponse response,String custName,String custType,String entProp) {
		
	
		output(response, commService.queryCustInfo(custName,custType,entProp));
	}

	/** 客户公司资料选择模块 */
	@RequestMapping(params = "custComp.json")
	public void custCompInfo(HttpServletRequest request,
			HttpServletResponse response,String custName,String custCompName) {
		
		output(response, commService.queryCustCompInfo(custName, custCompName));
	}

	/** 区域资料选择模块 */
	@RequestMapping(params = "area.json")
	public void areaInfo(HttpServletRequest request,
			HttpServletResponse response,String countryName,String provName,String cityName,String zoneName) {
		output(response, commService.queryAreaInfo(countryName, provName,
				cityName, zoneName));
	}

	/** 关联信息json数据 */
	@RequestMapping(params = "relation.json")
	public void relation(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		//System.out.println(":::"+request.getParameter("objType")+";"+request.getParameter("objId"));
		String data = commService.queryRelationInfo(request
				.getParameter("objType"),request.getParameter("objId"));
		output(response, data);
	}

	/** 从导航菜单进入各个模块时,用于检测该用户在该模块的按钮权限 */
	@RequestMapping(params = "checkFuncBtn")
	public void checkFuncBtn(HttpServletRequest request,
			HttpServletResponse response, String fuId) {
		UserInfo userInfo = (UserInfo) (request.getSession()
				.getAttribute(Constant.GB_SESSION_USERINFO));//从session中获取用户信息
		String data = commService.checkFunctionButton(userInfo.getId(), fuId);
		output(response, data);
	}

	/** 成功登录后,显示用 户信息 */
	@RequestMapping(params = "userInfo")
	public ModelAndView getUserInfo(HttpServletRequest request) {
		UserInfo userInfo = (UserInfo) (request.getSession()
				.getAttribute(Constant.GB_SESSION_USERINFO));//从session中获取用户信息
		request.setAttribute("user", userInfo);
		return new ModelAndView("/main/userInfo");
	}

	
	/** 根据参数查询竞争对手信息 */
	@RequestMapping(params = "competitorInfo.json")
	public void queryComptitorInfo(HttpServletResponse response,String competitorCode,
			String competitorName) throws IOException {
		String data=commService.queryCompetitorInfo(competitorCode,competitorName);
		if(data!=null){
			output(response,data);
		}else{
			response.getWriter().println("");
		}
		
	}
	
	
	/** 根据参数查询竞争对手服务公司信息 
	 * @throws IOException */
	@RequestMapping(params = "competitorCompInfo.json")
	public void queryComptitorCompInfo(HttpServletResponse response,
			String competitor, String serviceCustComp) throws IOException {
		String data=commService.queryCompetitorCompInfo(competitor,serviceCustComp);
		if(data!=null){
			output(response,data);
		}else{
			response.getWriter().println("");
		}
	}
	
	/** 根据参数查询拜访记录 
	 * @throws IOException */
	@RequestMapping(params="visitInfo.json")
	public void queryVisitInfo(HttpServletResponse response,
			String visitCustCompDept, String visitStartDate,
			String visitEndDate, String visitState) throws IOException {
		String data=commService.queryVisit(visitCustCompDept, visitStartDate, visitEndDate, visitState);
		output(response,data);
	}
	
	
	
	/**
	 * 公用模块私有的公用方法
	 * @param response 响应
	 * @param jsonData 输出的数据
	 */
	private void output(HttpServletResponse response, String jsonData) {
		response.setContentType("text/html;charset=utf-8");
		try {
			response.getWriter().println(jsonData);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	

	@RequestMapping(params="getAreaInfo")
	public void getAreaInfo(HttpServletResponse response,String owner_zone,String zone_type){
		String data = commService.getAreaInfo(owner_zone,zone_type);
		output(response,data);
	}
	
	@RequestMapping(params="getZoneComboInfos")
	public void getZoneComboInfos(HttpServletResponse response,String zone_type,String owner_zone){
		String data = commService.getZoneComboInfos(zone_type,owner_zone);
		output(response,data);
	}
}
