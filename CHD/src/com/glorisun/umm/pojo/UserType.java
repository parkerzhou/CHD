package com.glorisun.umm.pojo;

/*
 * 用户类型实体类
 * 用于保存用户类型信息
 */
public class UserType {
	//用户id
	private int ut_id;
	
	//用户类型
	private String ut_type;
	
	//适用范围range
	private String ut_range;

	
	//setter and getter
	


	public String getUt_type() {
		return ut_type;
	}

	public int getUt_id() {
		return ut_id;
	}

	public void setUt_id(int ut_id) {
		this.ut_id = ut_id;
	}

	public void setUt_type(String ut_type) {
		this.ut_type = ut_type;
	}

	public String getUt_range() {
		return ut_range;
	}

	public void setUt_range(String ut_range) {
		this.ut_range = ut_range;
	}


	
}
