package com.glorisun.chd.report.pojo;

import java.io.Serializable;

public class ReportCondition implements Serializable{
	private int id ;
	private String condCode;
	private String condName;
	private int includeModel;
	private int seq;
	
	
	public int getSeq() {
		return seq;
	}
	public void setSeq(int seq) {
		this.seq = seq;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCondCode() {
		return condCode;
	}
	public void setCondCode(String condCode) {
		this.condCode = condCode;
	}
	public String getCondName() {
		return condName;
	}
	public void setCondName(String condName) {
		this.condName = condName;
	}
	public int getIncludeModel() {
		return includeModel;
	}
	public void setIncludeModel(int includeModel) {
		this.includeModel = includeModel;
	}
}
