package com.glorisun.chd.tag.core.gsui;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

@SuppressWarnings("serial")
public class CommChoiceTag extends TagSupport {

	// 模块名称常量
	public static String CONTACTS_MODULAR = "contacts";// 联系人
	public static String PERSONAL_MODULAR = "personal";// 员工
	public static String DEPT_MODULAR = "dept";// 部门
	public static String COMPANY_MODULAR = "company";// 公司
	public static String TRADECODE_MODULAR = "tradecode";// 行业代码
	public static String AREA_MODULAR = "area";// 区域
	public static String REGION_MODULAR = "region";// 大区
	public static String CUST_MODULAR = "cust";// 客户
	public static String CUSTCOMP_MODULAR = "custComp";// 客户公司

	private String fuId;// 标签id
	private String modularID;// 标签调用的模块
	private boolean multiple;// 单选或多选
	private int width;// 文本框长度
	private boolean required;// 是否必填

	// 只读

	public String getFuId() {
		return fuId;
	}

	public void setFuId(String fuId) {
		this.fuId = fuId;
	}

	public String getModularID() {
		return modularID;
	}

	public void setModularID(String modularID) {
		this.modularID = modularID;
	}

	public boolean isMultiple() {
		return multiple;
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

	@Override
	public int doEndTag() throws JspException {
		// TODO Auto-generated method stub
		JspWriter out = this.pageContext.getOut();
		String f_text = fuId + "text";
		String f_hidden = fuId + "hidden";

		//用于输出文本框以及隐藏域
		if (this.modularID.equals(REGION_MODULAR)) {// 当为大区资料选择时，输出三个文本框以及三个隐藏域
			printTextBox(out, f_text, f_hidden, "one");
			printTextBox(out, f_text, f_hidden, "two");
			printTextBox(out, f_text, f_hidden, "three");
		} else if (this.modularID.equals(DEPT_MODULAR)) {// 当为部门选择时，输出两个文本框以及两个隐藏域
			printTextBox(out, f_text, f_hidden, "one");
			printTextBox(out, f_text, f_hidden, "two");
		} else {// 输出一个文本框以及一个隐藏域
			printTextBox(out, f_text, f_hidden, "");
		}

		//用于输出选择按钮
		if (this.modularID.equals(CONTACTS_MODULAR)) {
			printBtn(out, "openContactsDlg");
		} else if (this.modularID.equals(PERSONAL_MODULAR)) {
			printBtn(out, "openPersonalDlg");
		} else if (this.modularID.equals(DEPT_MODULAR)) {
			printBtn(out, "openDeptDlg");
		} else if (this.modularID.equals(COMPANY_MODULAR)) {
			printBtn(out, "openCompanyDlg");
		} else if (this.modularID.equals(TRADECODE_MODULAR)) {
			printBtn(out, "openTradeCode");
		} else if (this.modularID.equals(AREA_MODULAR)) {
			printBtn(out, "openAreaDialog");
		} else if (this.modularID.equals(REGION_MODULAR)) {
			printBtn(out, "openRegionDialog");
		} else if (this.modularID.equals(CUST_MODULAR)) {
			printBtn(out, "openCustDialog");
		} else if (this.modularID.equals(CUSTCOMP_MODULAR)) {
			printBtn(out, "openCustCompDialog");
		}

		return EVAL_PAGE;
	}

	/** 输出button的HTML代码 */
	private void printBtn(JspWriter out, String funcName) {
		try {
			StringBuffer sb = new StringBuffer();
			sb.append("<button class=\"easyui-linkbutton\" ");
			sb.append("onclick=\"" + funcName + "('");
			sb.append(this.fuId + "'," + this.multiple);
			sb.append(")\"");
			sb.append(">");
			sb.append("选择");
			sb.append("</button>");
			out.println(sb.toString());

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	/** 输出text的HTML代码 */
	private void printTextBox(JspWriter out, String f_text, String f_hidden,
			String seq) {
		try {
			String s="";
			if(this.modularID.equals(DEPT_MODULAR)){
				if(seq.equals("one")){
					s="<br>";
					this.setWidth(520);
					this.setRequired(false);
				}else{
					s="";
					this.setWidth(150);
					this.setRequired(true);
				}
			}else{
				s="";
			}
			if(this.modularID.equals(REGION_MODULAR)){
				if(seq.equals("one")){
					this.setRequired(false);
				}else if(seq.equals("two")){
					this.setRequired(false);
				}else{
					this.setRequired(true);
				}
			}
			StringBuffer textSb = new StringBuffer();
			textSb.append("<input ");
			textSb.append("class=\"easyui-validatebox\" ");
			textSb.append("style=\"width:" + this.width + "px;\" ");
			textSb.append("type=\"text\" ");
			textSb.append("id=\"" + f_text + seq + "\" ");
			textSb.append("name=\"" + f_text + seq + "\" ");
			textSb.append("readOnly=\"true\" data-options=\"required:"+this.isRequired()+"\">");
			out.println(textSb.toString());

			StringBuffer hiddenSb = new StringBuffer();
			hiddenSb.append("<input ");
			hiddenSb.append("type=\"hidden\" ");
			hiddenSb.append("id=\"" + f_hidden + seq + "\" ");
			hiddenSb.append("name=\"" + f_hidden + seq + "\"");
			hiddenSb.append(">");
			out.println(hiddenSb.toString());
			out.println(s);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
