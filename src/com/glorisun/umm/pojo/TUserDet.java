package com.glorisun.umm.pojo;

public class TUserDet {
	int us_id;           //用户ＩＤ
	int at_at;           //关联身份
	String ud_telNo;     //联系电话
	String ud_addr;      //联系地址
	String ud_faxNo;     //传真
	String ud_createDate;//创建日期
	public int getUs_id() {
		return us_id;
	}
	public void setUs_id(int us_id) {
		this.us_id = us_id;
	}
	public int getAt_at() {
		return at_at;
	}
	public void setAt_at(int at_at) {
		this.at_at = at_at;
	}
	public String getUd_telNo() {
		return ud_telNo;
	}
	public void setUd_telNo(String ud_telNo) {
		this.ud_telNo = ud_telNo;
	}
	public String getUd_addr() {
		return ud_addr;
	}
	public void setUd_addr(String ud_addr) {
		this.ud_addr = ud_addr;
	}
	public String getUd_faxNo() {
		return ud_faxNo;
	}
	public void setUd_faxNo(String ud_faxNo) {
		this.ud_faxNo = ud_faxNo;
	}
	public String getUd_createDate() {
		return ud_createDate;
	}
	public void setUd_createDate(String ud_createDate) {
		this.ud_createDate = ud_createDate;
	}
}
