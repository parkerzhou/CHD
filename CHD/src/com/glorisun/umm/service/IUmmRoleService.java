package com.glorisun.umm.service;

import java.util.List;

import com.glorisun.umm.pojo.Range;
import com.glorisun.umm.pojo.Role;

/**
 * 角色信息操作的接口类
 * @author Zero
 *
 */
public interface IUmmRoleService {

	/**
	 * 获取角色范围
	 * @return
	 */
	public String getRangeInfo();

	
	/**
	 * 加载角色信息
	 * @param range 
	 * @param roleName 
	 * @param roleCode 
	 * @return
	 */
	public String loadRoleInfo(String roleCode, String roleName, String range);


	/**
	 * 获取适用范围
	 * @return
	 */
	public String getRangeInfoNoAll();


	/**
	 * 验证角色代码
	 * @param id 角色id
	 * @param code 角色代码	
	 * @return 该代码不存在则返回true，反之返回false
	 */
	public String validataCode(int id, String code);


	/**
	 * 验证角色名称
	 * @param id 角色id
	 * @param name 角色名称
	 * @return
	 */
	public String validataName(int id, String name);


	/**
	 * 新增或修改角色数据
	 * @param role 角色数据
	 * @return
	 */
	public String saveRoleInfo(Role role);


	/**
	 * 获取指定id的角色
	 * @param id 角色id
	 * @return 角色数据，json字符串返回
	 */
	public String getRole(int id);


	/**
	 * 批量删除角色
	 * @param idArray 角色id数组
 	 * @return
	 */
	public String delRole(String idArray);


	/**
	 * 打印获取角色
	 * @param code
	 * @param name
	 * @param range
	 * @return
	 */
	public List<Role> getRole(String code, String name, String range);
	
	
}
