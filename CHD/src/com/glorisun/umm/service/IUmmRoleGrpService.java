package com.glorisun.umm.service;

import java.util.List;
import java.util.Map;

import com.glorisun.umm.pojo.UmmRoleGrpInfo;

public interface IUmmRoleGrpService {
	/**
	 * 加载用户群组管理新增或修改表单
	 * @param roleGrpOptType 类型
	 * @param userGrpId 群组id
	 * @return 根据roleGrpOptType，当等于0（即新增时），设置群组代码为UG，序号为最大序号加1，以及范围设置为value=0，即text=公用
	 * @return 当roleGrpOptType等于1（即修改时），根据userGrpId获得群组信息，并将群组信息插入表单中。
	 */
	public String loadForm(String roleGrpOptType,String userGrpId);

	/**
	 *  新增或修改群组管理
	 * @param ummRoleGrpInfo 群组pojo
	 * @param roleGrpOptType 类型
	 * @param id 新增或修改的用户id
	 * @return
	 */
	public String addorEditRoleGrp(UmmRoleGrpInfo ummRoleGrpInfo,
			String roleGrpOptType, int id);

	/**
	 * 删除群组管理
	 * @param idArray 传入的id数组
	 * @return
	 */
	public String delRoleGrp(String idArray);

	/**
	 * 查询
	 * @param roleGrpCode 查询代码
	 * @param roleGrpName 查询名称
	 * @param roleGrpRange 查询范围
	 * @return 根据以上三个值进行查询，返回查询获得的数据
	 */
	public String searchRoleGrp(String roleGrpCode, String roleGrpName,
			String roleGrpRange);

	/**
	 * 根据search设置不同的范围combobox的值
	 * @param search 值为1时，表明是查询栏的范围下拉列表，值为0时，表明是新增或修改表单里的范围下拉列表
	 * @return 从数据库中获取范围值后，根据不同的search值，返回不同的数据，search为0时返回数据库内数据，为1时除返回数据库内数据外，还有一条value=“-1”.text=“所有”的数据
	 */
	public String queryRangeInfo(int search);
}
