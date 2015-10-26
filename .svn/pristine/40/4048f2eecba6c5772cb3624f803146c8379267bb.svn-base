package com.glorisun.chd.report.pojo;

import java.io.Serializable;
import java.util.Map;


public class ReportFilter implements Serializable {

	
	public final static int C_TY_LOCAL = 1;
	public final static int C_TY_LOCAL_REPTYPE = 2;
	public final static int C_TY_POP = 3;
	
	public final static int C_OT_NULL = 0;
	public final static int C_OT_RADIOBUTTON = 1;
	public final static int C_OT_CHECKBOX = 2;
	public final static int C_OT_DATE = 3;
	public final static int C_OT_DATETIME = 4;
	public final static int C_OT_AUTOTEXT = 5;
	public final static int C_OT_EDITTEXT = 6;
	
	public final static int C_FT_ALL = 0;
	public final static int C_FT_INCLUDE = 1;
	public final static int C_FT_EXCLUDE = 2;

	public final static int C_OUT_HTML = 1;
	public final static int C_OUT_PDF = 2;
	public final static int C_OUT_EXCEL = 3;

	// 0静态初始值 -- 1动态初始值(使用SELECT 語句) -- 2應用全局變量初始值,2應用全局變量初始值,
	public final static int C_IT_STATIC = 0; 
	public final static int C_IT_SQL = 1;
	public final static int C_IT_GOBAL_MAP = 2;
	public final static int C_IT_GOBAL_STRING = 3;
	public final static int C_IT_METHOD = 4;


	// 文本输入控件类型
	public final static int C_ITT_EDITTEXT = 1;
	public final static int C_ITT_TEXTPERSONNAME = 2;
	public final static int C_ITT_TEXTPASSWORD = 3;
	public final static int C_ITT_TEXTEMAILADDRESS = 4;
	public final static int C_ITT_PHONE = 5;
	public final static int C_ITT_TEXTPOSTALADDRESS = 6;
	public final static int C_ITT_DATETIME = 7;
	public final static int C_ITT_DATE = 8;
	public final static int C_ITT_TIME = 9;
	public final static int C_ITT_NUMBER = 10;
	public final static int C_ITT_DECIMAL = 11;

	private int id;
	private int seq;
	private String label;// 标签值
	private int type;// 类型
	private String dispValue;//显示值
	private String innerVale;// 内部值
	private int operType;// 明细操作类型
	private boolean enabled = true;
	private int initType = C_IT_SQL;
	private int filterType = C_FT_INCLUDE;
	private int valueType = C_IT_SQL;
	private String value ="";
	private String url;// 链接
	
	private EditTextRule editTextRule = null;
	private Map<String,FilterItem> filterItems;

	public EditTextRule getEditTextRule() {
		return editTextRule;
	}



	public Map<String, FilterItem> getFilterItems() {
		return filterItems;
	}

	public void setFilterItems(Map<String, FilterItem> filterItems) {
		this.filterItems = filterItems;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public int getFilterType() {
		return filterType;
	}

	public void setFilterType(int filterType) {
		this.filterType = filterType;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public int getValueType() {
		return valueType;
	}

	public void setValueType(int valueType) {
		this.valueType = valueType;
	}

	public void setEditTextRule(EditTextRule editTextRule) {
		this.editTextRule = editTextRule;
	}

	public int getOperType() {
		return operType;
	}

	public void setOperType(int operType) {
		this.operType = operType;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getSeq() {
		return seq;
	}

	public void setSeq(int seq) {
		this.seq = seq;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}


	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}


	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public int getInitType() {
		return initType;
	}

	public void setInitType(int initType) {
		this.initType = initType;
	}

	public String getDispValue() {
		return dispValue;
	}

	public void setDispValue(String dispValue) {
		this.dispValue = dispValue;
	}

	public String getInnerVale() {
		return innerVale;
	}

	public void setInnerVale(String innerVale) {
		this.innerVale = innerVale;
	}
	
}
