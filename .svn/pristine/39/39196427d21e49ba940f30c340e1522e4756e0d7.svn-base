package com.glorisun.chd.controller;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


import com.glorisun.chd.core.util.JSONHelper;
import com.glorisun.chd.pojo.JmsAgreement;
import com.glorisun.chd.pojo.JmsFprojReg;
import com.glorisun.chd.pojo.Jmscompany;
import com.glorisun.chd.service.FranService;
import com.glorisun.chd.service.impl.FranServiceImpl;

@Controller
@RequestMapping("/franController")
public class FranController {
	@Autowired
	FranService franService;
	
	
	@RequestMapping(params="CmpComboInfo")
      public void CmpComboInfo(HttpServletResponse response,String cmp){
    	 output(response,franService.CmpComboInfo(cmp)); 
      }
	

    //输出方法
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
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(params="loadFran")
	public void loadFran(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
   //System.out.println(franService.loadFran());
		output(response, franService.loadFran());
		//System.out.println(franService.loadFran());
	}
	
	/**
	 * 加盟方维护-加载修改界面数据
	 * @param request
	 * @param response
	 * @param cmp_id   主键id
	 * @throws Exception
	 */
	@RequestMapping(params="loadFranById")
	public void loadFranById(HttpServletRequest request,
			HttpServletResponse response,String cmp_id) throws Exception {
   //System.out.println(franService.loadFran());
		output(response, franService.loadFranById(cmp_id));
	}
	
	
	/**
	 * 加盟方维护-删除
	 * @param request
	 * @param response
	 * @param cmp_ids    主键id数组
	 * @throws Exception
	 */
	@RequestMapping(params="delFran")
	public void delFran(HttpServletRequest request,
			HttpServletResponse response,String cmp_ids) throws Exception {
   System.out.println(cmp_ids);
		output(response, franService.delFran(cmp_ids));
	}
	
	/**
	 * 加盟方代码文本框失焦时调用的函数
	 * @param cmp_id	加盟方代码
	 */
	@RequestMapping(params="loadFranInfo")
	public void loadFranInfo(HttpServletRequest request,
			HttpServletResponse response,String cmp_id) {
   //System.out.println(franService.loadFran());
		output(response, franService.loadFranInfo(cmp_id));
	}
	
    /**
     * 加盟方维护-新增或删除
     * @param request
     * @param response
     * @param jmscompany   
     * @param optType      操作符（新增为1或修改为0）
     */
	@RequestMapping(params="addOrEditFranInfo")
	public void addOrEditFranInfo(HttpServletRequest request,
			HttpServletResponse response,Jmscompany jmscompany,String optType){
		//System.out.println(jmscompany.getCmp_province().trim());
		output(response,franService.addOrEditFranInfo(request,jmscompany,optType));
		
	}
	

	/**
	 * 加盟方维护-加载所属公司
	 * @param request
	 * @param response
	 */
	@RequestMapping(params="loadCompany")
	public void loadCompany(HttpServletRequest request,HttpServletResponse response){

		output(response, franService.loadCompany());
		
	}
	
	/**
	 * 加盟方维护-所属公司资料
	 * @param request
	 * @param response
	 * @param companyCn   公司代号或公司名称
	 */
	@RequestMapping(params="searchCompany")
	public void searchCompany(HttpServletRequest request,
			HttpServletResponse response,String companyCn,String preCmp){
		output(response,franService.searchCompany(companyCn,preCmp));
	}
	
	/**
	 * 加盟工程项目登记-首页加载
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(params="loadFproj")
	public void loadFproj(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
   //System.out.println(franService.loadFran());
		output(response, franService.loadFproj());
	}
	
	/**
	 * 加盟工程项目登记-加载雇员资料
	 * @param request
	 * @param response
	 */
	@RequestMapping(params="loadEmployees")
	public void searchEmployees(HttpServletRequest request,
			HttpServletResponse  response){
		output(response,franService.loadEmployees());
	}
	
	/**
	 * 加盟工程项目登记-删除
	 * @param request
	 * @param response
	 * @param pre_regseqs 
	 * @throws Exception
	 */
		@RequestMapping(params="delFproj")
		public void delFproj(HttpServletRequest request,
				HttpServletResponse response,String pre_regseqs) throws Exception {
			output(response, franService.delFproj(pre_regseqs));
		}
		
		@RequestMapping(params="addOrEditFprojInfo")
		public void addOrEditFprojInfo(HttpServletRequest request,
				HttpServletResponse response,JmsFprojReg jmsFprojReg,String optType){
			output(response,franService.addOrEditFprojInfo(request,jmsFprojReg,optType));
			
		}
	
	/**
	 * 加盟工程登记-雇员资料刷新功能	
	 * @param request
	 * @param response
	 * @param employeesDcn
	 * @param employeesScn
	 */
	@RequestMapping(params="checkEmployees")
	public void checkEmployees(HttpServletRequest request,
			HttpServletResponse response,String employeesDcn,String employeesScn){
	
		output(response,franService.checkEmployees(employeesDcn,employeesScn));
	}
	/**
	 * 加盟工程登记-加载部门信息
	 * @param request
	 * @param response
	 * @param cmp_id_name
	 * @param dept_id_name
	 */
	@RequestMapping(params="searchDept")
	public void searchDept(HttpServletRequest request,
			HttpServletResponse response,String cmp_id_name,String dept_id_name) throws Exception {
  
   //System.out.println(dept_id_name);
		output(response, franService.DeptInfo(cmp_id_name,dept_id_name));
		
	}

	/**
	 * 加盟工程登记-加载加盟方信息
	 * @param request
	 * @param response
	 * @param fran_id_name
	 */

	@RequestMapping(params="loadFprojById")
	public void loadFprojById(HttpServletRequest request,
			HttpServletResponse response,String pre_regseq){
		output(response,franService.loadFprojById(pre_regseq));
	}
	

	@RequestMapping(params="searchFprojFran")
	public void searchFprojFran(HttpServletRequest request,
			HttpServletResponse response,String fran_id_name) throws Exception {
  
   //System.out.println(dept_id_name);
		output(response, franService.FprojFranInfo(fran_id_name));
		
	}
	/**
	 * 加载加盟工程项目中的预审年度以及预审序号
	 */
	@RequestMapping(params="loadYearSeq")
	public void loadYearSeq(HttpServletRequest request,
			HttpServletResponse response){
		output(response,franService.loadYearSeq());
	}
	
	@RequestMapping(params="getCommPage")
	public ModelAndView getCommPage(HttpServletRequest request,
			HttpServletResponse response,String page){
		ModelAndView md = new ModelAndView("data/areaSelDlg");
		if(page.equals("areaSel")){
			md = new ModelAndView("data/areaSelDlg");
		}
		if(page.equals("deptSel")){
			md = new ModelAndView("data/deptSelDlg");
		}
		if(page.equals("cmpSel")){
			md = new ModelAndView("data/cmpSelDlg");
		}
		if(page.equals("empl")){
			md = new ModelAndView("data/emplDlg");
		}
		if(page.equals("fprojFranSel")){
			md = new ModelAndView("data/franSelDlg");
		}
		if(page.equals("projSel")){
			md = new ModelAndView("data/projSelDlg");
		}
		return md;
	}
	//第四模块
	/**
	 * 加盟方管理协议-首页加载
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(params="loadAgree")
	public void loadAgree(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
   //System.out.println(franService.loadFran());
		output(response, franService.loadAgree());
	}

	@RequestMapping(params="saveOrUpdateAgreeInfo")
	public void saveOrUpdateAgreeInfo(HttpServletRequest request,
			HttpServletResponse response,JmsAgreement jmsAgreement,String optType){
		//System.out.println(jmsAgreement.getFRANS_ID());
		output(response,franService.saveOrUpdateAgreeInfo(request,jmsAgreement,optType));
		
	}

	
	@RequestMapping(params="checkProj")
	public void  checkProj(HttpServletRequest request,
			HttpServletResponse response,String frans_id){
		output(response, franService.checkProj(frans_id));
		
	}
	@RequestMapping(params="loadAgreeById")
	public void loadAgreeById(HttpServletRequest request,
			HttpServletResponse response,String AGREE_SEQ){
		output(response,franService.loadAgreeById(AGREE_SEQ));
	}
	@RequestMapping(params="delAgree")
	public void delAgree(HttpServletRequest request,
			HttpServletResponse response,String AGREE_SEQ){
		output(response,franService.delAgree(AGREE_SEQ));
	}

}
