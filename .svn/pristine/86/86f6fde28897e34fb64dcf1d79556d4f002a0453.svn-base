package com.glorisun.umm.service;

import java.util.List;

import com.glorisun.umm.pojo.Range;
import com.glorisun.umm.pojo.UserType;

public interface IUmmUserTypeService {

	
	/**
	 * 模糊查询用户类型
	 * @param type
	 * @param range
	 * @return
	 */
	String loadUserType(String type, String range);

	/**
	 * 获取适用范围
	 * @return
	 */
	String getRangeInfo();

	/**
	 * 获取适用范围除去所有
	 * @return
	 */
	String getRangeInfoNoAll();

	/**
	 * 验证用户类型
	 * @param type
	 * @param id
	 * @return
	 */
	String validateUserType(String type, int id);

	
	/**
	 * 新增或修改用户类型
	 * @param ut
	 * @return
	 */
	String addUserType(UserType ut);

	/**
	 * 获取用户类型
	 * @param ut_id
	 * @return
	 */
	String getUserTypeById(int ut_id);
	

	
	/**
	 * 删除用户类型
	 * @param ids 需要删除的用户类型id数组。
	 * @return 有冲突而无法删除的用户类型id集合。如果ids对应的所有用户类型均成功删除返回长度为0的list，如果出现错误返回null。
	 */
	public String deleteUserType(String ids);

	/**
	 * 打印用户类型
	 * @param type
	 * @param range
	 * @return
	 */
	List<UserType> getUserType(String type, String range);
	
}
