package com.glorisun.chd.report.service.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.sql.rowset.CachedRowSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.ResultSetWrappingSqlRowSet;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Service;

import com.glorisun.chd.core.util.JdbcTemplateUtil;
import com.glorisun.chd.pojo.ItemInfo;
import com.glorisun.chd.report.common.ReportConst;
import com.glorisun.chd.report.pojo.EditTextRule;
import com.glorisun.chd.report.pojo.FilterItem;
import com.glorisun.chd.report.pojo.ReportCondition;
import com.glorisun.chd.report.pojo.ReportFilter;
import com.glorisun.chd.report.pojo.ReportParam;
import com.glorisun.chd.report.pojo.SqlCommand;
import com.glorisun.chd.report.service.IReportQuery;
import com.glorisun.chd.report.service.IReportService;
import com.sun.rowset.CachedRowSetImpl;

@Service("reportService")
public class ReportServiceImpl implements IReportService {

	@Autowired
	@Qualifier("jdbcTemplate")
	private JdbcTemplateUtil jdbcTemplate;

	// public void setJdbcTemplate(JdbcTemplateUtil jdbcTemplate) {
	// this.jdbcTemplate = jdbcTemplate;
	// }

	@Override
	public List<SqlRowSet> getDataSources(ReportParam rp)
			throws ClassNotFoundException, SQLException {

		List<SqlRowSet> lsRs = new ArrayList<SqlRowSet>();
		List<SqlCommand> lsSc = null;
		switch (rp.getServiceType()) {
		case ReportConst.REPORT_GETRSTYPE_PROC:
			lsRs = ReportServiceImpl.executeProcedure(jdbcTemplate, rp);
			break;
		case ReportConst.REPORT_GETRSTYPE_PROC_EXEC:
			lsRs = execProc(rp);
			break;
		case ReportConst.REPORT_GETRSTYPE_CLASS:
			IReportQuery rq = this.getReportQuery(rp.getServiceResources());
			lsSc = rq.getSQL(rp);
			lsRs = this.execSQLs(lsSc);
			break;
		}

		return lsRs;
	}

	@SuppressWarnings("unchecked")
	private List<SqlRowSet> execProc(ReportParam rp) {
		List<SqlRowSet> lsRs = new ArrayList<SqlRowSet>();
		StringBuffer sb = new StringBuffer();

		sb.append(" EXEC" + rp.getServiceResources());
		sb.append(rp.getReportStyle());
		List<ReportCondition> ls = (List<ReportCondition>) rp.getAttributes()
				.get(ReportParam.C_ATTR_CONDITIONS);
		for (ReportCondition rd : ls) {
			sb.append("'" + rd.getCondCode() + "',");
		}

		sb.delete(sb.length() - 1, sb.length());
	
		SqlRowSet rs = this.jdbcTemplate
				.queryForRowSet(sb.toString());
		lsRs.add(rs);
		return lsRs;
	}

	@SuppressWarnings("unchecked")
	static public List<SqlRowSet> executeProcedure(JdbcTemplate jdbcTemplate,
			ReportParam rp) {

		// 格式：{call PROCEDURE_TEST(?, ?)}
		final String callProcedureSql = rp.getServiceResources().replace("(", rp.getReportStyle()+"(");
		final List<ReportCondition> ls = (List<ReportCondition>) rp
				.getAttributes().get(ReportParam.C_ATTR_CONDITIONS);

		return jdbcTemplate.execute(new CallableStatementCreator() {
			@Override
			public CallableStatement createCallableStatement(Connection conn)
					throws SQLException {
				CallableStatement cstmt = conn.prepareCall(callProcedureSql);

				for (ReportCondition rd : ls) {
					cstmt.setString(rd.getSeq(), rd.getCondCode());
				}
				return cstmt;
			}
		}, new CallableStatementCallback<List<SqlRowSet>>() {
			@Override
			public List<SqlRowSet> doInCallableStatement(CallableStatement cs)
					throws SQLException {

				List<SqlRowSet> results = new ArrayList<SqlRowSet>();
				boolean resultsAvailable = cs.execute();
				while (resultsAvailable) {
					
					CachedRowSet rowSet = new CachedRowSetImpl();
				    rowSet.populate(cs.getResultSet());
					
					results.add(new ResultSetWrappingSqlRowSet(rowSet));
					resultsAvailable = cs.getMoreResults();
				}
				return results;
			}
		});
	}

	@SuppressWarnings("unused")
	private List<SqlRowSet> execSQLs(List<SqlCommand> lsSc) {
		List<SqlRowSet> al = new ArrayList<SqlRowSet>();
		String strSQL = "";

		for (SqlCommand sc : lsSc) {
			strSQL = sc.getCommandText();

			try {
				if (sc.getExecuteMode() == ReportConst.REPORT_QUERY_GETDATASOURCE) {
					SqlRowSet rs = this.jdbcTemplate.queryForRowSet(strSQL);
					al.add(rs);
				} else if (sc.getExecuteMode() == ReportConst.REPORT_QUERY_EXEC) {
					this.jdbcTemplate.execute(strSQL);
				} else if (sc.getExecuteMode() == ReportConst.REPORT_QUERY_SPLITEXEC) {
					String sql[] = strSQL.split(";");
					for (int i = 0; i <= sql.length - 1; i++) {
						if (!(sql[i].trim().equals("") || sql[i].trim().equals(
								";"))) {
							this.jdbcTemplate.execute(sql[i].toString());
						}
					}
				}
			} catch (Exception e) {
				System.out.print(e.getMessage());
			}

		}
		return al;
	}

	
	private IReportQuery getReportQuery(String className) {
		Class<?> clazz = null;
		IReportQuery rep = null;

		try {
			clazz = Class.forName(className);
			rep = (IReportQuery) clazz.newInstance();
		} catch (Exception e) {
			rep = null;
		}
		return rep;
	}

	@Override
	public Map<Integer, ReportFilter> getFilterItems(ReportParam rp) {

		StringBuffer sf = new StringBuffer();
		String strTemp = "";
		sf.append(" SELECT rc_id,  rc_label, rc_type,rc_filterType,rc_optType, rc_valueType,");
		sf.append("   CONVERT(VARCHAR(8000),rc_valueList) AS rc_valueList, ");
		sf.append("   CONVERT(VARCHAR(8000),rc_initValue) AS rc_initValue, rc_initType, rs_Url, rc_orderSeq, ");
		sf.append("   ISNULL(rr_id,0) AS rr_id, rr_dispType, rr_componentType, rr_lengthMax, rr_lengthMin,");
		sf.append("   CONVERT(VARCHAR(8000),rr_valueDynaMin) AS rr_valueDynaMin, ");
		sf.append("   CONVERT(VARCHAR(8000),rr_valueDynaMax) AS rr_valueDynaMax, ");
		sf.append("   ISNULL(rr_compareObj,0) AS rr_compareObj, ");
		sf.append("   ISNULL(rr_compareType,0) AS rr_compareType, rr_height ");
		sf.append(" FROM sy_repCons a LEFT JOIN sy_repSubUrl b  ON a.rs_id=b.rs_id   LEFT JOIN sy_repConsRule c ON a.rc_id=c.rr_id ");
		sf.append(" WHERE  fu_id= " + rp.getReportId());
		sf.append(" ORDER BY rc_orderSeq; ");

		SqlRowSet rs = jdbcTemplate.queryForRowSet(sf.toString());
		Map<Integer, ReportFilter> map = new HashMap<Integer, ReportFilter>();

		while (rs.next()) {

			ReportFilter rf = new ReportFilter();
			rf.setId(rs.getInt("rc_id"));

			strTemp = rs.getString("rc_initValue");
			if (strTemp != null && !("".equals(strTemp))) {
				ItemInfo ii = getInitValue(rs.getInt("rc_initType"),
						rs.getString("rc_initValue"));

				rf.setDispValue(ii.getItemName());
				rf.setInnerVale(ii.getItemCode());

			} else {
				rf.setDispValue("");
				rf.setInnerVale("");
			}

			rf.setFilterType(rs.getInt("rc_filterType"));
			rf.setInitType(rs.getInt("rc_initType"));
			rf.setLabel(rs.getString("rc_label"));
			rf.setOperType(rs.getInt("rc_optType"));
			rf.setType(rs.getInt("rc_type"));
			rf.setSeq(rs.getInt("rc_orderSeq"));
			rf.setUrl(rs.getString("rs_Url"));
			rf.setValueType(rs.getInt("rc_valueType"));
			rf.setValue(rs.getString("rc_valueList"));

			if (rf.getType() == ReportFilter.C_TY_POP
					&& (rf.getOperType() == ReportFilter.C_OT_RADIOBUTTON || rf
							.getOperType() == ReportFilter.C_OT_CHECKBOX)) {

				Map<String, FilterItem> fis = getValue(rf.getId(),
						rf.getValueType(), rf.getValue(), rf.getInnerVale());
				if (fis != null && fis.size() >= 1) {
					// 当可选择的内容只有一个时，转为不可以选择的固定值。
					if (fis.size() == 1) {
						rf.setType(ReportFilter.C_TY_LOCAL);
						rf.setOperType(ReportFilter.C_OT_EDITTEXT);
						rf.setDispValue(fis.values().iterator().next()
								.getDataValue());
						rf.setInnerVale(fis.values().iterator().next()
								.getDataKey());
						rf.setEnabled(false);
					} else {
						rf.setFilterItems(fis);
					}
				} else {
					rf.setType(ReportFilter.C_TY_LOCAL);
					rf.setOperType(ReportFilter.C_OT_EDITTEXT);
					rf.setEnabled(false);
				}
			}

			if (rs.getInt("rr_id") >= 1) {
				EditTextRule etr = new EditTextRule();
				etr.setCompareObjId(rs.getInt("rr_compareObj"));
				etr.setCompareType(rs.getInt("rr_compareType"));
				etr.setComponentType(rs.getInt("rr_componentType"));
				etr.setDispType(rs.getInt("rr_dispType"));
				etr.setHeight(rs.getInt("rr_height"));
				etr.setLengthMax(rs.getInt("rr_lengthMax"));
				etr.setLengthMin(rs.getInt("rr_lengthMin"));
				strTemp = rs.getString("rr_valueDynaMin");
				if (strTemp != null && !("".equals(strTemp))) {
					ItemInfo itemInfo = getInitValue(ReportFilter.C_IT_SQL,
							strTemp);
					etr.setValueDynaMin(itemInfo.getItemCode());
				}
				strTemp = rs.getString("rr_valueDynaMax");
				if (strTemp != null && !("".equals(strTemp))) {
					ItemInfo itemInfo = getInitValue(ReportFilter.C_IT_SQL,
							strTemp);
					etr.setValueDynaMax(itemInfo.getItemCode());
				}

				rf.setEditTextRule(etr);

			}

			map.put(rf.getId(), rf);

		}

		return map;
	}

	@Override
	public ItemInfo getInitValue(int initType, String initValue) {
		ItemInfo itemInfo = new ItemInfo();
		switch (initType) {
		case ReportFilter.C_IT_STATIC:
			String[] items = initValue.split(";");
			if (items.length >= 2) {
				itemInfo.setItemCode(items[0]);
				itemInfo.setItemName(items[1]);
			} else {
				itemInfo.setItemCode(items[0]);
				itemInfo.setItemName(items[0]);
			}
			break;
		case ReportFilter.C_IT_SQL:
			SqlRowSet rs = jdbcTemplate.queryForRowSet(initValue);
			if (rs.next()) {

				itemInfo.setItemCode(rs.getString(1));
				if (rs.getMetaData().getColumnCount() >= 2) {
					itemInfo.setItemName(rs.getString(2));
				} else {
					itemInfo.setItemName(rs.getString(1));
				}
			}

			break;
		case ReportFilter.C_IT_GOBAL_MAP:
			break;
		case ReportFilter.C_IT_GOBAL_STRING:
			break;
		case ReportFilter.C_IT_METHOD:
			break;
		}

		return itemInfo;

	}

	@Override
	public Map<String, FilterItem> getValue(int pId, int valueType,
			String value, String initValue) {
		Map<String, FilterItem> mapFi = new LinkedHashMap<String, FilterItem>();
		int nLoop = 0;
		switch (valueType) {
		case ReportFilter.C_IT_STATIC:
			String[] items = value.split(",");
			if (items.length >= 1) {
				nLoop = 1;
				for (String s : items) {
					FilterItem filterItem = new FilterItem();
					String[] items2 = s.split(",");
					if (items2.length >= 2) {
						filterItem.setDataKey(items[0]);
						filterItem.setDataValue(items[1]);
					} else {
						filterItem.setDataKey(items[0]);
						filterItem.setDataValue(items[0]);
					}
					filterItem.setDataSeq(nLoop);
					filterItem.setPId(pId);
					mapFi.put(filterItem.getDataKey(), filterItem);
				}
			}
			break;
		case ReportFilter.C_IT_SQL:
			SqlRowSet rs = jdbcTemplate.queryForRowSet(value);
			while (rs.next()) {
				FilterItem filterItem = new FilterItem();
				filterItem.setDataKey(rs.getString(1));
				if (rs.getMetaData().getColumnCount() >= 2) {
					filterItem.setDataValue(rs.getString(2));
				} else {
					filterItem.setDataValue(rs.getString(1));
				}
				mapFi.put(filterItem.getDataKey(), filterItem);
			}

			break;
		case ReportFilter.C_IT_GOBAL_MAP:
			break;
		case ReportFilter.C_IT_GOBAL_STRING:
			break;
		case ReportFilter.C_IT_METHOD:
			break;
		}

		if (initValue != null && !("".equals(initValue))) {
			String[] items = value.split(",");

			if (items.length >= 1) {

				for (String s : items) {
					for (FilterItem filterItem : mapFi.values()) {
						if (filterItem.getDataKey().equals(s)) {
							filterItem.setSelected(true);
						}
					}
				}
			}

		}

		return mapFi;

	}

}
