package com.glorisun.chd.report.pojo;

import java.io.Serializable;

public class FilterItem implements Serializable{
	
	private int dataSeq;
	private String dataKey;
	private String dataValue;
	private String desc;
	private boolean selected=false;
	private int PId;
	
	public int getDataSeq() {
		return dataSeq;
	}
	public void setDataSeq(int dataSeq) {
		this.dataSeq = dataSeq;
	}
	public String getDataKey() {
		return dataKey;
	}
	public void setDataKey(String dataKey) {
		this.dataKey = dataKey;
	}
	public String getDataValue() {
		return dataValue;
	}
	public void setDataValue(String dataValue) {
		this.dataValue = dataValue;
	}
	
	
	public boolean isSelected() {
		return selected;
	}
	public void setSelected(boolean selected) {
		this.selected = selected;
	}
	public String getDesc() {
		return desc;
	}
	public void setDesc(String desc) {
		this.desc = desc;
	}
	public int getPId() {
		return PId;
	}
	public void setPId(int pId) {
		PId = pId;
	}
	
	

}
