package com.glorisun.chd.report.service;

import java.util.List;

import com.glorisun.chd.report.pojo.ReportParam;
import com.glorisun.chd.report.pojo.SqlCommand;

public interface IReportQuery {
	public List<SqlCommand> getSQL(ReportParam rp);
}
