package com.glorisun.chd.pojo;

import java.io.Serializable;


import org.springframework.jdbc.core.RowMapper;


public class BusDefTable implements Serializable {
	private int id;
	private String cateInfo;
	private String cateDesc;
	private String assiCode;
	private int orderSeq;

//	public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
//		BusDefTable bdt = new BusDefTable();
//		bdt.setId(rs.getInt("id"));
//		bdt.setCateInfo(rs.getString("cateInfo"));
//		bdt.setCateDesc(rs.getString("cateDesc"));
//		bdt.setAssiCode(rs.getString("assiCode"));
//		bdt.setOrderSeq(rs.getInt("orderSeq"));
//
//		return bdt;
//	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getCateInfo() {
		return cateInfo;
	}

	public void setCateInfo(String cateInfo) {
		this.cateInfo = cateInfo;
	}

	public String getCateDesc() {
		return cateDesc;
	}

	public void setCateDesc(String cateDesc) {
		this.cateDesc = cateDesc;
	}

	public String getAssiCode() {
		return assiCode;
	}

	public void setAssiCode(String assiCode) {
		this.assiCode = assiCode;
	}

	public int getOrderSeq() {
		return orderSeq;
	}

	public void setOrderSeq(int orderSeq) {
		this.orderSeq = orderSeq;
	}

	@Override
	public String toString() {
		return "{id=" + id + ", cateInfo=" + cateInfo + ", cateDesc="
				+ cateDesc + ", assiCode=" + assiCode + ", orderSeq="
				+ orderSeq + "}";
	}
}
