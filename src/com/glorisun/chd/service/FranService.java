package com.glorisun.chd.service;

import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
	public String loadFranById(String cmp_seq);
	
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
	public String FprojFranInfo(String fran_id_name, String filterStr);
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
	public String checkProj(String frans_id,String filterStr);
	public String loadAgreeById(String AGREE_SEQ);
	public String loadPerbProjs(String frans_id);
	public String getCmpqualInfos();
	public String addOrEditPerbInfo(PerbInfo perbInfo, String optType, List<DTLAInfo> dTLAInfos, List<DTLBInfo> dTLBInfos, List<DTLCInfo> dTLCInfos);
	public String loadPerb();
	public String loadPerbById(String performance_seq);
	public String delPerb(String performance_seqs);
	public String getCmpqualInfosC();
	
	/*
	 * 申请付款====================================  廖伟亮 开始==============================================
	 */
	//首页新增操作
	public String loadAgreePay();
	public String searchFranPro(String franPro, String frans_id, String filterStr);
	public String loadPcoms(String proj_id);
	public String getPercents(String proj_no, String pay_amount);
	public String saveOrEditAgrPayInfo(AgrPayInfo agrPayInfo,
			List<AgrPayDtlInfo> agrPayDtlAddInfos,
			List<AgrPayDtlInfo> agrPayDtlEditInfos,
			String agrPayDtlsDelArr,String optType);
	//首页修改操作
	public String loadAgreePayById(String aGREE_SEQ);
	//首页删除操作
	public String delAgrPay(String aGREE_SEQS);
	
	
	
	
    /*
     * 申请付款========================================= 廖伟亮 结束=========================================================================
     */


	
	
	//====================================退保证金====余深宝====
	public String getAgrPercents(String proj_id ,String agree_seq, String compact_amt);
	public String saveOrEditAgrPayDelInfo(AgrPayInfo agrPayInfo, List<agrPayDtl2> agrPayDtlAddInfos, List<agrPayDtl2> agrPayDtlEditInfos,String agrPayDtlsDelArr,String optType);
	public String loadAgrePay();
	public String getAgrPercents(String proj_id);
	public String loadAgrPayById(String AGREE_SEQ);
	public String delAgrPay2(String AGREE_SEQ);
	public String loadAgrPay();
	
	public String loadPerbProjs2(String frans_id);
	public String addOrEditQuaInfo(QuaMarInfo quaMarInfo, String optType,
			List<DTLAInfo> dTLAInfos, List<DTLBInfo> dTLBInfos,
			List<DTLCInfo> dTLCInfos);
	public String loadQuaInfos();//
	public String loadQuaById(String quality_seq);//
	public String getPayamByFranID(String frans_id);//
	public String delQua(String quality_seqs);//
	//====================================加盟投标首页加载====周万杰
	public String loadTender();
	public String Certificates();
	public String loadStaff(String cmpqual_seq);

	
	//====================================加盟投标中的劳动合同下的新增加载====廖伟亮
	public String loadRen();
	public String loadBidCon();
	public String searchFproj(String cmp_id,String filterStr);//
	public String loadIns();
	//====================================加盟投标中的劳动合同下的新增加载====廖伟亮
	public String loadCmpIntelFiles();

	public String saveOrEditFprojTender(FprojTender fprojTender,
			List<FrojTenderDtlB> pZhengsAddArrs,
			List<FrojTenderDtlC> pContractsAddArrs,
			List<FrojTenderDtlC> pInsuranceAddArrs,
			List<FrojTenderDtlC> tContractsAddArrs,
			List<FrojTenderDtlC> tInsuranceAddArrs,
			List<FrojTenderDtlB> tZhengAddArrs, List<FprojTenderDtlA> pComs,
			List<FprojTenderDtlA> tcoms, String optType);

	public String loadTenderById(String pRE_REGSEQ);

	public String delTender(String pRE_REGSEQS);

	public String exportProj(String choice, LinkedHashMap<String, String> map);
    //加盟方报表打印
	public String GetPDForEXCEL();
	public String GetFprojPDForEXCEL();



}
