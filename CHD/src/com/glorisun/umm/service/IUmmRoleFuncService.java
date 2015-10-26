package com.glorisun.umm.service;

import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;

public interface IUmmRoleFuncService {

	/**
	 * 获取所有角色。
	 * 
	 * @return 一个包含所有角色的List。一条map记录对应一个角色，map的key为字段名称，value为字段值。
	 */
	public List<Map<String, Object>> getAllRoles();

	/**
	 * 通过匹配角色代码的前n个字符，获取符合条件的角色集合。
	 * @param rlRange 需要获取的角色的适用范围。
	 * @param rlCodePrefix 需要匹配的字符前缀。
	 * @return
	 */
	public List<Map<String, Object>> getSimilarRoles(Integer rlRange, String rlCodePrefix);

	/**
	 * 通过角色适用范围获取适用的功能的集合。集合中每个元素除了拥有sy_Function表中的字段之外，还拥有add, edit,
	 * delete等sy_Operation表中定义的操作字段，如果功能拥有该操作，则对应的值为1，否则为0。
	 * 
	 * @param rlRange
	 *            角色适用范围
	 * @return 该适用范围内所有功能的集合。
	 */
	public List<Map<String, Object>> getFuncsByRange(int rlRange);

	/**
	 * 通过角色ID，从sy_RoleFunc表中获取该角色所有功能已授权的操作。
	 * 
	 * @param roleId
	 *            需要获取操作授权的角色的ID
	 * @return 该角色所有功能授权情况的集合。
	 */
	public List<Map<String, Object>> getAuthedOperByRlId(int rlId);

	

	/**
	 * 通过操作代码获取操作id
	 * 
	 * @param otCode
	 *            需要取得操作id的操作代码
	 * @return 操作代码对应的操作id
	 */
	public Integer getOtIdByOtCode(String otCode);
	
	/**
	 * 通过角色id获取存在操作的功能的id。比如某角色某个功能中有操作，则这个功能的id会被存在List里面返回出来。
	 * @param rlId 角色id
	 * @return 包含有授权操作的功能的id的列表。
	 */
	public List<Integer> getAuthedFuncsByRlId(Integer rlId);
	
	/**
	 * 通过角色id获取角色适用范围。
	 * @param RlId 角色id
	 * @return 该角色的适用范围。
	 */
	public Integer getRlRangeByRlId(Integer rlId);
	
	
	/**
	 * 更改角色适用范围
	 * 
	 * @param rlId
	 *            需要改变适用范围的角色的id
	 * @param rlRange
	 *            要改成的适用范围。
	 * @return 修改成功返回真，否则返回假。
	 */
	public boolean changeRoleRange(int rlId, int rlRange) throws Exception;
	
	/**
	 * 通过操作id，获取该操作的属性。
	 * @param otId 操作id
	 * @return 该操作属性对应的map。
	 */
	public Map<String, Object> getOperationByOtId(Integer otId);

	/**
	 * 通过操作id列表，获取列表中的所有操作id对应操作的属性。
	 * @param otIds 操作id列表。
	 * @return 类型为map的列表，每个map对应一个操作的属性。
	 */
	public List<Map<String, Object>> getOperationsByOtIds(List<Integer> otIds);

	/**
	 * 通过oc_id获取对应的操作id。
	 * @param ocId oc_id
	 * @return 该oc_id下所有操作id的列表
	 */
	public List<Integer> getOtIdsByOcId(Integer ocId);
	
	
	
	/**
	 * 通过角色id，删除该角色下所有操作授权。
	 * @param rlId 需要删除授权的角色id。
	 * @return 操作成功返回真，否则返回假。
	 * @throws Exception
	 */
	public boolean cleanRoleFuncByRlId(Integer rlId) throws Exception;

	/**
	 * 更新单条操作授权。
	 * @param rlId
	 *            需要更新的角色的id
	 * @param fuId
	 *            需要更新的功能的id
	 * @param otIds
	 *            需要更新的授权的操作的id集合。
	 * @return 更新成功返回真，否则返回假。
	 * @throws Exception
	 */
	public boolean updateRoleFunc(int rlId, int fuId, int otId) throws Exception;

	/**
	 * 更新多条操作授权， 将清空原有操作授权。
	 * @param aim 需要更新的角色id
	 * @param funcAuths 具体授权情况，该JSONArray下每个JSONObject下必须包含字段“ot_id”和“fu_id”。
	 * @return 成功更新返回真。
	 * @throws Exception
	 */
	public boolean updateRoleFuncs(Integer aim, JSONArray funcAuths) throws Exception;
	
	/**
	 * 通过角色范围获取有权限使用的字段
	 * @param rlRange 角色范围
	 * @return 字段的List。
	 */
	public List<Map<String, Object>> getColumnsByRange(Integer rlRange);

}
