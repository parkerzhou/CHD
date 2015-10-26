package com.glorisun.umm.pojo;

public class TUserGrp {
	private int ug_id;      //主键id
	private String ug_code; //用户组代码
	private String ug_name; //用户组名称
	private int ug_range;   //适用范围
	private int ug_orderSeq;//排序 
	public int getUg_id() {
		return ug_id;
	}
	public void setUg_id(int ug_id) {
		this.ug_id = ug_id;
	}
	public String getUg_code() {
		return ug_code;
	}
	public void setUg_code(String ug_code) {
		this.ug_code = ug_code;
	}
	public String getUg_name() {
		return ug_name;
	}
	public void setUg_name(String ug_name) {
		this.ug_name = ug_name;
	}
	public int getUg_range() {
		return ug_range;
	}
	public void setUg_range(int ug_range) {
		this.ug_range = ug_range;
	}
	public int getUg_orderSeq() {
		return ug_orderSeq;
	}
	public void setUg_orderSeq(int ug_orderSeq) {
		this.ug_orderSeq = ug_orderSeq;
	}
}
