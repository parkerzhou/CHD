package com.glorisun.chd.tag.core.gsui;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

@SuppressWarnings("serial")
public class BaseInfoTag extends TagSupport {

	private String fuId;

	private int dsid;

	private boolean multiple;

	private int width;

	private boolean required;

	private boolean editable;
	
	private boolean all;

	public void setFuId(String fuId) {
		this.fuId = fuId;
	}

	public void setDsid(int dsid) {
		this.dsid = dsid;
	}

	public void setMultiple(boolean multiple) {
		this.multiple = multiple;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		if (width >= 80) {
			this.width = width;
		} else {
			this.width = 80;
		}
	}

	public boolean isRequired() {
		return required;
	}

	public void setRequired(boolean required) {
		this.required = required;
	}

	public boolean isEditable() {
		return editable;
	}

	public void setEditable(boolean editable) {
		this.editable = editable;
	}

	public String getFuId() {
		return fuId;
	}

	public int getDsid() {
		return dsid;
	}

	public boolean isMultiple() {
		return multiple;
	}

	

	public boolean isAll() {
		return all;
	}

	public void setAll(boolean all) {
		this.all = all;
	}

	@Override
	public int doEndTag() throws JspException {
		// TODO Auto-generated method stub
		JspWriter out = this.pageContext.getOut();

		try {
			out.println(this.combobox());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	private String combobox() {
		StringBuffer sb = new StringBuffer();
		sb.append("<input ");
		sb.append("class=\"easyui-combobox\" ");
		sb.append("data-options=\"editable:" + this.isEditable() + ",required:"
				+ this.isRequired() + ",width:" + this.getWidth() + ",");
		sb.append("url:'" + this.getUrl() + "',");
		sb.append("multiple:" + multiple + ",");
		sb.append("valueField:'id',");
		sb.append("textField:'text'");
		sb.append("\"");
		sb.append(" id=\"" + fuId + "\"");
		sb.append(" name=\"" + fuId + "\"");
		sb.append(" panelHeight=\"auto\" ");
		
		sb.append("/>");
		return sb.toString();
	}

	private String getUrl() {
		return "commController.do?baseinfo_combobox_data.json&dsid=" + dsid+"&isAll="+all;
	}
}
