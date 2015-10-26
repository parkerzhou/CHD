package com.glorisun.umm.service;

import java.util.List;

import com.glorisun.umm.pojo.TUser;
import com.glorisun.umm.pojo.TUserDet;
import com.glorisun.umm.pojo.TUserGrp;
import com.glorisun.umm.pojo.TUserType;
import com.glorisun.umm.pojo.User;
import com.glorisun.umm.pojo.UserState;
/*
 *用户信息接口类 
 */
public interface IUmmUserInfoService{
	//获取用户信息
	public List<User> getUserInfo();
	//根据查询条件返回用户信息
	public List<User> searchUserInfo(User user);
	//将用户信息插入到数据库中
	public boolean addUserInfo(User user,TUserDet userDet,String ug_name,String ut_type);
	//修改用户信息
	public boolean alterUserInfo(User user);
	//根据主键id删除用户信息
	public boolean deleteUserInfoById(Integer[] us_ids);
	//获取用户群组名称
	public List<TUserGrp> getUserGrpName();
	//获取用户类型
	public List<TUserType> getUserType();
	//获取用户状态
	public List<UserState> getUserState();
	//获取与用户类型相对应的用户群组
	public List<TUserGrp> getUserGrpNameByType(String ut_type);
	
	public Integer getUgRange(String ugName);
	
	public Integer getUtRange(String utType);
}