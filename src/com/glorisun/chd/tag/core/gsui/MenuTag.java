package com.glorisun.chd.tag.core.gsui;

import java.io.IOException;
import java.util.List;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;



/**
 * 
 * 类描述：上传标签
 * 
 */
public class MenuTag extends TagSupport {
	protected String style="easyui";//菜单样式
	protected String loginMenu="";//菜单字符串
	
	public void setLoginMenu(String loginMenu) {
		this.loginMenu = loginMenu;
	}
	
//	protected List<TSFunction> parentFun;//一级菜单
//	protected List<TSFunction> childFun;//二级菜单
//	public void setParentFun(List<TSFunction> parentFun) {
//		this.parentFun = parentFun;
//	}
//
//	public void setChildFun(List<TSFunction> childFun) {
//		this.childFun = childFun;
//	}

	public int doStartTag() throws JspTagException {
		return EVAL_PAGE;
	}


	public int doEndTag() throws JspTagException {
		try {
			JspWriter out = this.pageContext.getOut();
			out.print(end().toString());
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		return EVAL_PAGE;
	}

	public StringBuffer end() {	
		StringBuffer sb = new StringBuffer();
		if(style.equals("easyui"))
		{	sb.append("<div id=\"nav\" class=\"easyui-accordion\" fit=\"true\" border=\"false\">");
			sb.append(loginMenu);
			sb.append("</div>");
		}
//		if(style.equals("bootstrap"))
//		{
//			sb.append(ListtoMenu.getBootMenu(parentFun, childFun));
//		}
//		if(style.equals("json"))
//		{
//			sb.append("<script type=\"text/javascript\">");
//			sb.append("var _menus="+ListtoMenu.getMenu(parentFun, childFun));
//			sb.append("</script>");
//		}
	
		return sb;
	}
	public void setStyle(String style) {
		this.style = style;
	}

	

}
