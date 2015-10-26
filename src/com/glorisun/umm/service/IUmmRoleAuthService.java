package com.glorisun.umm.service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

public interface IUmmRoleAuthService {

	/**
	 * 获取所有用户群组。
	 * 
	 * @return 一个包含所有用户群组的List。一条map记录对应一个角色，map的key为字段名称，value为字段值。
	 */
	public List<Map<String, Object>> getAllUserGrps();

	/**
	 * 获取适用范围内的角色。
	 * 
	 * @param range
	 *            需要获得的角色的适用范围
	 * @return 一个包含适用范围内所有角色的List。一条map记录对应一个角色，map的key为字段名称，value为字段值。
	 */
	public List<Map<String, Object>> getRoleByRange(int range);

	/**
	 * 通过用户群组id获取该用户组所拥有的所有角色授权。
	 * 
	 * @param ugId
	 *            需要获取的用户组的id。
	 * @return 一个包含该用户群组所有角色id的list。
	 */
	public List<Integer> getRlIdByUgId(int ugId);

	/**
	 * 给指定用户群组添加指定角色授权。
	 * 
	 * @param roleId
	 *            要添加授权的角色id。
	 * @param userGrpId
	 *            要添加授权的用户群组id。
	 * @param raUserId
	 *            操作人id
	 * @param raOptDate
	 *            操作日期
	 * @return 添加成功返回真，否则返回假。
	 */
	public boolean addRoleAuth(int roleId, int userGrpId, int raUserId,
			Timestamp raOptDate) throws Exception;

	/**
	 * 从指定用户群组删除指定角色授权。
	 * 
	 * @param roleId
	 *            要删除授权的角色id。
	 * @param userGrpId
	 *            要删除授权的用户群组id。
	 * @return 删除成功返回真，否则返回假。
	 */
	public boolean deleteRoleAuth(int roleId, int userGrpId) throws Exception;

	/**
	 * 删除指定用户组所有角色授权。
	 * 
	 * @param userGrpId
	 *            要删除角色授权的用户群组的ID。
	 * @return 删除成功返回真，否则返回假。
	 */
	public boolean deleteRoleAuthByUgId(int userGrpId) throws Exception;

	/**
	 * 更新角色授权。
	 * 
	 * @param roleId
	 *            需要更新的角色的id。
	 * @param userGrpId
	 *            需要更新的用户群组的id。
	 * @param raUserId
	 *            操作人id。
	 * @param raOptDate
	 *            操作日期。
	 * @return 更新成功返回真，否则返回假。
	 */
	public boolean updateRoleAuth(List<Integer> roleIds, int userGrpId,
			int raUserId, java.sql.Timestamp raOptDate) throws Exception;
	
	
}
