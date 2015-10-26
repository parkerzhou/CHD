package com.glorisun.chd.report.pojo;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.glorisun.chd.pojo.UserInfo;

public class ReportParam implements Serializable{
	
	public final static String C_ATTR_CONDITIONS = "reportConditions";


	private String reportId; 		// 报表ID(功能ID)
	private UserInfo userInfo; 		// 当前用户信息
	private String sessionId; 		// 当前会话ID
	private String reportStyle; 	// 报表类型(空为"")
	private int serviceType;		// 其他参数(服务类型：REPORT_GETRSTYPE_PROC、REPORT_GETRSTYPE_PROC_EXEC、REPORT_GETRSTYPE_CLASS)
	private String serviceResources;// 其他参数(服务资源)
	
	private Map<String, Object> attributes;// 其他参数
	public Map<String, Object> getAttributes() {
		return attributes;
	}
	public String getReportId() {
		return reportId;
	}
	public void setReportId(String reportId) {
		this.reportId = reportId;
	}
	public UserInfo getUserInfo() {
		return userInfo;
	}
	public void setUserInfo(UserInfo userInfo) {
		this.userInfo = userInfo;
	}
	public String getSessionId() {
		return sessionId;
	}
	public void setSessionId(String sessionId) {
		this.sessionId = sessionId;
	}
	public int getServiceType() {
		return serviceType;
	}
	public void setServiceType(int serviceType) {
		this.serviceType = serviceType;
	}
	public String getServiceResources() {
		return serviceResources;
	}
	public void setServiceResources(String serviceResources) {
		this.serviceResources = serviceResources;
	}
	public void setAttributes(Map<String, Object> attributes) {
		this.attributes = attributes;
	}
	public String getReportStyle() {
		return reportStyle;
	}
	public void setReportStyle(String reportStyle) {
		this.reportStyle = reportStyle;
	}

	
	
	
	
}
