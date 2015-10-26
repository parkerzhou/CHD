package com.glorisun.chd.pojo;

public class ProcParamInfo {

	private int id;

	private int integerValue;

	private String strValue;

	private boolean isInteger;

	private boolean isInput;
	
	
	public void setValue(int integerValue){
		this.integerValue=integerValue;
	}
	
	public void setValue(String strValue){
		this.strValue=strValue;
	}
	
	public String getStrValue(){
		return strValue;
	}
	
	public int getIntegerValue(){
		return integerValue;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public boolean isInteger() {
		return isInteger;
	}

	public void setInteger(boolean isInteger) {
		this.isInteger = isInteger;
	}

	public boolean isInput() {
		return isInput;
	}

	public void setInput(boolean isInput) {
		this.isInput = isInput;
	}

	
}
