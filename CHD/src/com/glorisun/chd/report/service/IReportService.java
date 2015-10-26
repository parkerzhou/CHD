package com.glorisun.chd.report.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import com.glorisun.chd.pojo.ItemInfo;
import com.glorisun.chd.report.pojo.FilterItem;
import com.glorisun.chd.report.pojo.ReportFilter;
import com.glorisun.chd.report.pojo.ReportParam;


public interface IReportService {

	
	
	
	/**
	 * 
	* getFilterItems(获取报表筛选页面明细项)
	* @param rp　报表参数对象
	* @return Map<Integer, ReportFilter>
	* @Exception 异常对象
	* @since  
	* 
	 */
	public Map<Integer, ReportFilter> getFilterItems(ReportParam rp);
	
	
	
	/**
	 * 
	* getInitValue(取初始化值(code,name))
	* @param initType 初始化值类型
	* @param initValue 初始化值
	* @return ItemInfo
	* @Exception 异常对象
	* @since 
	 */
	public ItemInfo getInitValue(int initType, String initValue);
	
	/**
	 * 
	* getValue(取初值(code,name))
	* @param valueType 取值类型
	* @param value 取值条件
	* @return List<ItemInfo>
	* @Exception 异常对象
	* @since 
	 */
	public Map<String,FilterItem> getValue(int pId,int valueType, String value,String initValue );
	
	/**
	 * 
	* getDataSources(根据报表筛选条件，获取报表数据集数组)
	* @param rp　报表参数对象
	* @return List<SqlRowSet>
	* @Exception 异常对象
	* @since 
	 */
	public List<SqlRowSet> getDataSources(ReportParam rp) throws ClassNotFoundException, SQLException;
	
}
