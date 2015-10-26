package com.glorisun.chd.tag.core.gsui;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

import org.springframework.beans.factory.annotation.Autowired;

import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.core.util.DateUtils;
import com.glorisun.chd.pojo.DataDictionary;
import com.glorisun.chd.pojo.FuncItem;
import com.glorisun.chd.pojo.ItemInfo;
import com.glorisun.chd.pojo.UserInfo;
import com.glorisun.chd.report.common.ReportConst;
import com.glorisun.chd.report.pojo.FilterItem;
import com.glorisun.chd.report.pojo.ReportFilter;
import com.glorisun.chd.report.pojo.ReportParam;
import com.glorisun.chd.report.service.IReportService;
import com.glorisun.chd.report.service.impl.ReportServiceImpl;
import com.jspsmart.upload.Request;

@SuppressWarnings("serial")
public class ReportFilterTag extends CommonTag {
	private String fuId;

	public void setFuId(String fuId) {
		this.fuId = fuId;
	}

	private Map<Integer, ReportFilter> mapFilter;

	public void setMapFilter(Map<Integer, ReportFilter> mapFilter) {
		this.mapFilter = mapFilter;
	}

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
		String txtStyle = "";

		if (fuId != null && !fuId.isEmpty()) {
			Integer nfuId = Integer.parseInt(fuId);

			Map<String, DataDictionary> dataDict = this.getDataDictionary();

			sb.append(" <style type=\"text/css\"> ");
			sb.append("  .reportFilterHead { ");
			sb.append("     height: 30px;");
			sb.append("      background:#dae7f6;");
			sb.append(" }");
			sb.append("  .reportFilterDet {");
			sb.append("      height: 30px;");
			sb.append("      background:#EEEEEE;");
			sb.append(" }");
			sb.append(" </style> ");

			sb.append(" <table border=\"0\" cellpadding=\"3\" cellspacing=\"3\" id=\"report_table\">");
			sb.append(" <thead> ");
			sb.append(" <tr class=\"reportFilterHead\" bgcolor=\"#E6E6E6\">");
			sb.append(" <th align=\"center\"  style=\"width: 120px\" >"
					+ this.getDictValue(dataDict, "report.structure.label",
							"选择项") + " </th>");
			sb.append(" <th align=\"center\"  style=\"width: 600px\"  >"
					+ this.getDictValue(dataDict, "report.structure.value",
							"选择内容") + " </th>");
			sb.append(" <th align=\"center\"  style=\"width: 80px\" >"
					+ this.getDictValue(dataDict,
							"report.structure.filterType", "过滤方式") + " </th>");
			sb.append(" <th align=\"center\"  style=\"width: 80px\" >"
					+ this.getDictValue(dataDict, "report.structure.opt", "操作")
					+ "</th>");

			sb.append(" </tr>");
			sb.append(" </thead> ");

			if (mapFilter != null && mapFilter.size() >= 1) {
				for (ReportFilter rf : mapFilter.values()) {

					if (rf.getType() == ReportFilter.C_TY_LOCAL_REPTYPE) {
						Map<String, FilterItem> mapFi = rf.getFilterItems();
						if (mapFi != null && mapFi.size() >= 1) {
							sb.append("<tr class=\"reportFilterDet\">");
							sb.append(" <td align=\"left\">&nbsp;&nbsp;"
									+ rf.getLabel());
							sb.append(" </td>");
							sb.append("	<td colspan=\"3\" align=\"left\">");

							sb.append("<select id=\"reportStyle\" name=\"reportStyle\" ");

							if (mapFi.size() == 1) {
								sb.append("style=\"width: 180px\"");
							} else {
								sb.append("  readonly=\"readonly\"  style=\"width: 180px;background-color: #FFF0F5;\"");
							}

							sb.append(">");
							for (FilterItem filterItem : mapFi.values()) {

								sb.append("<option  value=\""
										+ filterItem.getDataKey() + "\"");
								if (filterItem.isSelected()) {
									sb.append(" \"selected\"");
								}

								sb.append(" >" + filterItem.getDataValue()
										+ "</option>");
							}

						}

					} else {

						sb.append("<tr class=\"reportFilterDet\" >");
						sb.append("	<td align=\"left\">&nbsp;&nbsp;"
								+ rf.getLabel() + "</td>");
						sb.append(" <td align=\"left\">");

						switch (rf.getOperType()) {
						case ReportFilter.C_OT_DATE:
						case ReportFilter.C_OT_DATETIME:
							sb.append("<input id=\"fi_Name"
									+ Integer.toString(rf.getId())
									+ "\" name=\"fi_Name\" maxlength=\"200\" class=\"Wdate\" "
									+ " onClick=\"WdatePicker({dateFmt:'"
									+ (rf.getOperType() == ReportFilter.C_OT_DATE ? DateUtils.DATE_FORMAT_SQL_DEFAULT
											: DateUtils.DATETIME_FORMAT_SQL_DEFAULT)
									+ "'})\""
									+ " value=\""
									+ (rf.getDispValue() == null ? "" : rf
											.getDispValue())
									+ "\" onblur =\"setCodeValue(this,'fi_Code"
									+ Integer.toString(rf.getId()) + "')\" ");

							txtStyle = " style=\"width:180px;";

							if (rf.getEditTextRule() != null) {
								if (rf.getEditTextRule().getValueDynaMin() != null
										&& !("".equals(rf.getEditTextRule()
												.getValueDynaMin()))) {
									sb.append(" MINDATE=\""
											+ rf.getEditTextRule()
													.getValueDynaMin() + "\"");
								}
								if (rf.getEditTextRule().getValueDynaMax() != null
										&& !("".equals(rf.getEditTextRule()
												.getValueDynaMax()))) {
									sb.append(" MAXDATE=\""
											+ rf.getEditTextRule()
													.getValueDynaMax() + "\"");
								}
							}
							break;
						case ReportFilter.C_OT_EDITTEXT:
							sb.append("<input id=\"fi_Name"
									+ Integer.toString(rf.getId())
									+ "\" name=\"fi_Name\" type=\"text\" value=\""
									+ (rf.getDispValue() == null ? "" : rf
											.getDispValue()) + "\" ");
							sb.append(" onblur =\"setCodeValue(this,'fi_Code"
									+ Integer.toString(rf.getId()) + "')\" ");

							txtStyle = " style=\"width:580px;";
							break;
						case ReportFilter.C_OT_CHECKBOX:
						case ReportFilter.C_OT_RADIOBUTTON:

							sb.append("<input id=\"fi_Name"
									+ Integer.toString(rf.getId())
									+ "\" name=\"fi_Name\" type=\"text\" value=\""
									+ (rf.getDispValue() == null ? "" : rf
											.getDispValue()) + "\" ");
							txtStyle = " style=\"width:580px;";
							break;
						}

						if (rf.getType() == ReportFilter.C_TY_POP) {
							sb.append("  readonly=\"readonly\" ");

							txtStyle += " background-color: #FFF0F5;";

						}
						txtStyle += "\"";

						sb.append(txtStyle);

						if (rf.getOperType() == ReportFilter.C_OT_EDITTEXT) {
							sb.append("  class=\"inputxt\" ");

							if (rf.getEditTextRule() != null) {
								switch (rf.getEditTextRule().getComponentType()) {

								// public final static int C_ITT_EDITTEXT = 1;
								// public final static int C_ITT_TEXTPERSONNAME
								// = 2;
								// public final static int C_ITT_TEXTPASSWORD =
								// 3;
								// public final static int
								// C_ITT_TEXTEMAILADDRESS =
								// 4;
								// public final static int C_ITT_PHONE = 5;
								// public final static int
								// C_ITT_TEXTPOSTALADDRESS =
								// 6;
								// public final static int C_ITT_DATETIME = 7;
								// public final static int C_ITT_DATE = 8;
								// public final static int C_ITT_TIME = 9;
								// public final static int C_ITT_NUMBER = 10;
								// public final static int C_ITT_DECIMAL = 11;

								case ReportFilter.C_ITT_EDITTEXT:
								case ReportFilter.C_ITT_TEXTPERSONNAME:
								case ReportFilter.C_ITT_TEXTPASSWORD:
								case ReportFilter.C_ITT_TEXTPOSTALADDRESS:
									sb.append(" errormsg=\"格式不对,请录入"
											+ rf.getEditTextRule()
													.getLengthMin()
											+ "-"
											+ rf.getEditTextRule()
													.getLengthMax()
											+ "位字符\"  datatype=\"s"
											+ rf.getEditTextRule()
													.getLengthMin()
											+ "-"
											+ rf.getEditTextRule()
													.getLengthMax() + " \"");
									break;
								case ReportFilter.C_ITT_TEXTEMAILADDRESS:
									sb.append(" errormsg=\"邮箱格式不正确!\" datatype=\"e\"");
									break;

								case ReportFilter.C_ITT_PHONE:
									sb.append(" errormsg=\"手机号码不正确!\" datatype=\"m\"");
									break;
								case ReportFilter.C_ITT_NUMBER:
									sb.append(" errormsg=\"请录入数字(整数)!\" datatype=\"n\"");
									break;
								case ReportFilter.C_ITT_DECIMAL:
									sb.append(" errormsg=\"请录入数字!\" datatype=\"d\"");
									break;
								}
							}
						}
						sb.append(" ><input type=\"hidden\" id=\"fi_Code"
								+ Integer.toString(rf.getId())
								+ "\" name=\"fi_Code\" value=\""
								+ (rf.getInnerVale() == null ? "" : rf
										.getInnerVale()) + "\" ></td> ");

						txtStyle = " style=\"width:120px;";
						sb.append("	<td align=\"left\"> <select id=\"includeModel"
								+ Integer.toString(rf.getId())
								+ "\" name=\"includeModel\" ");
						if (rf.getFilterType() != ReportFilter.C_FT_ALL) {
							sb.append(" readonly=\"readonly\" ");
							txtStyle += " background-color: #FFF0F5;";
						}
						txtStyle += "\"";
						sb.append(txtStyle);

						sb.append(" ><option  value=\"1\"");
						if (rf.getFilterType() == ReportFilter.C_FT_INCLUDE) {
							sb.append(" selected=\"selected\"");
						}
						sb.append(" >"
								+ this.getDictValue(dataDict,
										"report.structure.filterType", "包含")
								+ "</option><option value=\"2\"");
						if (rf.getFilterType() == ReportFilter.C_FT_EXCLUDE) {
							sb.append(" selected=\"selected\"");
						}
						sb.append(" >"
								+ this.getDictValue(dataDict,
										"report.structure.filterType", "排除")
								+ "</option></select></td>");

						sb.append(" <td align=\"center\">");
						if (rf.getType() == ReportFilter.C_TY_POP) {

							String strPop = "repPopChkBox";
							if (rf.getOperType() == ReportFilter.C_OT_RADIOBUTTON) {
								strPop = "repPopRadio";
							}
							sb.append("  <a class=\"easyui-linkbutton\" href=\"javaScript:void(0);\""
									+ " onclick=\""
									+ strPop
									+ "('"
									+ rf.getLabel()
									+ "-"
									+ this.getDictValue(dataDict,
											"report.structure.itemSelecter",
											"选择")
									+ "','"
									+ rf.getUrl()
									+ "','#fi_Name"
									+ Integer.toString(rf.getId())
									+ "','#fi_Code"
									+ Integer.toString(rf.getId())
									+ "','detItem',"
									+ fuId
									+ ","
									+ rf.getId()
									+ ")\">"
									+ this.getDictValue(dataDict,
											"report.structure.itemSelecter",
											"选择") + "</a>");
						}

						sb.append(" </td>");

						sb.append(" </tr>");
					}
				}

				sb.append("<tr class=\"reportFilterDet\">");
				sb.append("	<td align=\"left\">&nbsp;&nbsp;"
						+ this.getDictValue(dataDict,
								"report.structure.outtype", "报表输出类型") + "</td>");
				sb.append("	<td align=\"left\" colspan=\"3\"> <select id=\"repOutType\" name=\"repOutType\" style=\"width: 180px\" ><option  value=\"1\" selected=\"selected\" >html</option><option   value=\"2\" >pdf</option><option  value=\"3\">execl</option></select></td>");
				sb.append("</tr>");

				// Date dt=new Date();
				// String nowString=Long.toString(dt.getTime());
				sb.append("<tr class=\"reportFilterHead\" >");
				sb.append("	<td align=\"center\" colspan=\"4\" >");
				sb.append("	<a class=\"easyui-linkbutton\" >"
						+ this.getDictValue(dataDict,
								"report.structure.confirm", "帮助") + "</a>");
				sb.append("	<a class=\"easyui-linkbutton\" href=\"javaScript:void(0);"
						+ "\" onclick=\"repdoSubmit(\'reportForm" + fuId + "',");
				sb.append("	'reportController.do?queryReport&"
						+ Constant.GB_PARAM_FUNC_ID
						+ "="
						+ fuId
						+ "\')\" >"
						+ this.getDictValue(dataDict,
								"report.structure.confirm", "确定") + "</a></td>");
				sb.append("</tr>");

				sb.append("</table>");

				sb.append(" <script type=\"text/javascript\">");
				sb.append(" function setCodeValue(obj,cid) {");
				sb.append(" 	$('#' + cid).val(obj.value );");
				sb.append(" }");
				sb.append(" </script>");

				// sb.append(" <script type=\"text/javascript\">");
				// sb.append(" $(function(){");
				// sb.append(" $(\'#reportFilter\').datagrid({");
				// sb.append(" idField: 'f_id',");
				// sb.append(" title: \'" + currFunc.getFuncName() + "\',");
				// sb.append(" url:\'reportController.do?getFilterData&fuid=" +
				// fuId
				// + "\',");
				// sb.append(" fit:false,");
				// sb.append(" loadMsg: \'"+this.getDictValue(dataDict,
				// "common.data.load", "数据加载中...")+"\',");
				// sb.append(" fitColumns:true,");
				// sb.append(" singleSelect:true,");
				// sb.append(" columns:[[");
				// sb.append(" {field:\'f_label\',title:\'"+this.getDictValue(dataDict,
				// "report.structure.label", "选择项")+"\',width:\'200\'},");
				// sb.append(" {field:\'f_value\',title:\'"+this.getDictValue(dataDict,
				// "report.structure.label", "选择内容")+"\',width:\'600\'},");
				// sb.append(" {field:\'f_opt\',title:\'"+this.getDictValue(dataDict,
				// "report.structure.label", "操作")+"\',width:\'60\',");
				// sb.append(" formatter:function(value,rec,index){");
				// sb.append(" return '<a href=\"#\" class=\"easyui-linkbutton\" iconCls=\"icon-search\" onclick=\"departListsearch()\">选择</a>';}");
				// sb.append(" }]] ");
				// sb.append(" }); ");
				// sb.append(" }); ");
				//
				// sb.append(" </script>");
				//
				// sb.append("<table width=\"100%\" id=\"reportFilter\"></table>");
			}

		}
		return sb;

	}
}
