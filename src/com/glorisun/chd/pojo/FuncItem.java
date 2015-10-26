package com.glorisun.chd.pojo;

import java.io.Serializable;

public class FuncItem implements Serializable{
	
	private int id;
	private String funcCode;
	private String funcName;
	private String icon;
	private	int range; 
	private int level;
	private int ocId;
	private String url;
	private int funcFrom;
	private int orderSeq;
	private int referenceID;
	private String mainPage;
	private int defType;
	private int catekey;
	
	private int servType;
	private String servReso;

	
	
	public int getServType() {
		return servType;
	}
	public void setServType(int servType) {
		this.servType = servType;
	}
	
	public String getServReso() {
		return servReso;
	}
	public void setServReso(String servReso) {
		this.servReso = servReso;
	}
	public int getDefType() {
		return defType;
	}
	public void setDefType(int defType) {
		this.defType = defType;
	}
	public int getCatekey() {
		return catekey;
	}
	public void setCatekey(int catekey) {
		this.catekey = catekey;
	}
	public int getReferenceID() {
		return referenceID;
	}
	public void setReferenceID(int referenceID) {
		this.referenceID = referenceID;
	}
	public String getMainPage() {
		return mainPage;
	}
	public void setMainPage(String mainPage) {
		this.mainPage = mainPage;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getFuncCode() {
		return funcCode;
	}
	public void setFuncCode(String funcCode) {
		this.funcCode = funcCode;
	}
	public String getFuncName() {
		return funcName;
	}
	public void setFuncName(String funcName) {
		this.funcName = funcName;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	}
	public int getRange() {
		return range;
	}
	public void setRange(int range) {
		this.range = range;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public int getFuncFrom() {
		return funcFrom;
	}
	public void setFuncFrom(int funcFrom) {
		this.funcFrom = funcFrom;
	}
	public int getOrderSeq() {
		return orderSeq;
	}
	public void setOrderSeq(int orderSeq) {
		this.orderSeq = orderSeq;
	}
	public int getOcId() {
		return ocId;
	}
	public void setOcId(int ocId) {
		this.ocId = ocId;
	}
	
	
	
}
