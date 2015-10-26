package com.glorisun.chd.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface ICommService {

	/** 查询区域资料 */
	public String queryAreaData(String part2, String part3, String part4,
			String regionThree);

	/*** 根据参数type查询下列选择框的值 */
	public String queryCBoxData(String level, String id);

	/** 提交操作 */
	public boolean submitData(Object[] t1, Object[] t2);

	public boolean batchData(Object[] t1, Object[] t2);

	/** 删除区域资料 */
	public void delArea(int id);

	/**
	 * 根据参数查询附件信息,并返回json格式数据
	 * 
	 * @param objType
	 *            对象类型
	 * @param objId
	 *            对象id
	 */
	public String queryAnnexData(String objType, String objId);

	/** 处理文件上传 */
	public void upload(int userId, String objType, String objId,
			String objSubType, Map<String, MultipartFile> fileMap);

	/** 查询已上传附件大小 */
	public String querySize(String objType, String objId);

	/**
	 * 检测用户剩余容量是否超过总量 检没用户上传文件大小是否超过总量
	 * 
	 * @param objType
	 *            对象类型
	 * @param objId
	 *            对象id
	 * @param selectFileSize
	 *            上传文件大小
	 * */
	public String queryHadUpload(String objType, String objId,
			String selectFileSize);

	/** 附件信息删除 */
	public boolean delAnnex(String idArray, String objType, String objId,
			String objSubType, String fileArray);

	/** 基础资料查询 */
	public String queryBaseInfo(int dsid, boolean isAll);

	/** 员工基本查询 */
	public String queryPersonInfo(String st, String idArray, String staffCode,
			String staffName, String staffComp,String staffDept);

	/** 查询公司资料 */
	public String queryCompInfo();
	
	/** 查询部门资料 */
	public String queryDeptInfo(String company);

	/** 联系人基本查询 */
	public String queryContactsInfo(String st, String idArray,
			String custCmpName, String ctName, String custName,
			String custIdArray);

	/** 联系人所属公司基本查询 */
	/* public String queryCmpInfo(); */

	/** 公司查询 */
	public String queryComp(String compCode, String compSName);

	/** 部门查询 */
	public String queryDept(String compName, String deptName);

	/** 关联信息查询 */
	public String queryRelationInfo(String objType, String objId);

	/** 行业代码查询 */
	public String queryTradeCode(String tradeType, String tradeCode);

	/** 大区资料查询 */
	public String queryRegionInfo(String custId, String regionOneName,
			String regionTwoName, String regionThreeName);

	/** 区域选择资料 */
	public String queryAreaInfo(String countryName, String provName,
			String cityName, String zoneName);

	/** 客户资料选择查询 */
	public String queryCustInfo(String custName, String custType, String entProp);

	/** 客户公司资料选择查询 */
	public String queryCustCompInfo(String custName, String custCompName);

	/** 检测用户功能按钮权限 */
	public String checkFunctionButton(final int userId, final String fuId);

	/** 查询竞争对手基本资料 */
	public String queryCompetitorInfo(String code, String name);

	/** 查询竞争对手服务客户公司资料 */
	public String queryCompetitorCompInfo(String competitor,
			String serviceCustComp);

	/** 查询拜访资料 */
	public String queryVisit(String visitCustCompDept, String visitStartDate,
			String visitEndDate, String visitState);

	/** 查询体验联系人 */
	public String queryExContacts(String theme, String st, String idArray,
			String custCmpName, String ctName, String custName,
			String custIdArray);

	/** 检测用户输入的区域信息是否重复 */
	public boolean checkRegion(String objId, String countryId,String countryName,
			String provinceId,String provinceName,String cityId, String cityName,String zoneId,String zoneName);

	public String getAreaInfo(String owner_zone, String zone_type);

	public String getZoneComboInfos(String zone_type, String owner_zone);

}
