package com.glorisun.chd.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.glorisun.chd.pojo.JmsAgreement;
import com.glorisun.chd.pojo.JmsFprojReg;
import com.glorisun.chd.pojo.Jmscompany;

public interface FranService {
	/**
	 * 加盟方维护-新增或修改
	 * @param request
	 * @param jmscompany
	 * @param custVisiPlobOptType
	 * @return
	 */
	public String addOrEditFranInfo(HttpServletRequest request,Jmscompany jmscompany, 

String custVisiPlobOptType);
	/**
	 * 加盟方维护-删除
	 */
	public String delFran(String idArray);
	//下拉框选择
	public String CmpComboInfo(String cmp);
	/**
	 * 加盟方维护-加载首页信息
	 * @return
	 */
	public String loadFran();
	/**
	 * 加盟方维护-修改信息
	 * @param cmp_id  主键id
	 * @return
	 */
	public String loadFranById(String cmp_id);
	
	/**
	 * 加盟方维护-所属公司选择加载数据
	 * @return
	 */
	public String loadCompany();
	/**
	 * 加盟方维护-所属公司筛选
	 * @param companyCn
	 * @return
	 */
	public String searchCompany(String companyCn,String preCmp);
	/**
	 * 加盟工程项目登记-加载数据
	 * @param cmp_id  主键id
	 * @return
	 */
	public String loadFranInfo(String cmp_id);
	/**
	 * 加载加盟工程项目基本信息
	 * @return	返回加盟工程项目基本信息的json字符串
	 */

	public String loadFproj();

	//删除信息
		public String delFproj(String idArray);
	//保存信息
	public String addOrEditFprojInfo(HttpServletRequest request,JmsFprojReg 

jmsFprojReg, String custVisiPlobOptType);
	
	
	/**
	 * 加盟工程项目登记-加载雇员资料
	 * @return
	 */
	public String loadEmployees();
	/**
	 * 加盟工程项目登记-雇员资料筛选
	 * @param employeesDcn   部门代号或部门名称
	 * @param employeesScn   雇员编号或雇员名称
	 * @return
	 */
    public String checkEmployees(String employeesDcn,String employeesScn);
	
    //根据公式代号和部门代号查询信息
	public String DeptInfo(String cmp_id_name, String dept_id_name);
	/**
	 * 加载加盟工程项目的完整信息
	 * @param pre_regseq 加盟工程项目信息ID
	 * @return 返回加盟工程项目的完整信息json字符串
	 */
	public String loadFprojById(String pre_regseq);
	
	//加载加盟方信息
	public String FprojFranInfo(String fran_id_name);
	/**
	 * 加载加盟工程项目中的预审年度以及预审序号
	 * @return 预审年度以及预审序号的信息的json字符串
	 */
	public String loadYearSeq();
	//第四模块
	/**
	 * 加盟方管理协议-加载首页信息
	 * @return
	 */
	public String loadAgree();
	/**
	 * 加盟方管理协议-删除
	 */
	public String delAgree(String idArray);
	/**
	 * 加盟方管理协议-修改信息
	 * @param proj_id  主键id
	 * @return
	 */
	public String saveOrUpdateAgreeInfo(HttpServletRequest request,
			JmsAgreement jmsAgreement, String optType);
	public String checkProj(String frans_id);
	public String loadAgreeById(String AGREE_SEQ);
    
}
