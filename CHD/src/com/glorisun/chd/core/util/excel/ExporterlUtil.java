package com.glorisun.chd.core.util.excel;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.jdbc.support.rowset.SqlRowSetMetaData;

import com.glorisun.chd.core.util.UploadUtils;

/** Excel文档导出工具类 */

public class ExporterlUtil {

	final static public String C_RESULT_DATA = "GSDATA";

	/**
	 * 将报表查询的结果集(数组)导出到Excel模板文件
	 * 
	 * @param field
	 * @param targetId
	 * @return
	 */

	public static int ResultSets2Excel(List<SqlRowSet> rss, String modelFile,
			String targetDir, String targetFile) throws SQLException,
			FileNotFoundException, IOException {

		int nRes = 0;

		if (!UploadUtils.isFileExist(modelFile)) {

			nRes = -100;
		} else {

			HSSFWorkbook wb = new HSSFWorkbook(new FileInputStream(modelFile));// 利用
			// Excel模板创建一个新的Excel文件

			int nLoop = 1;
			for (SqlRowSet rs : rss) {

				HSSFSheet sheet = wb.getSheet(C_RESULT_DATA
						+ Integer.toString(nLoop));// 获取Excel文件里的第一个表

				HSSFRow row = sheet.createRow((int) 0);// 创建一行

				HSSFCell cell = null;// 创建一个单元格

				int rowNum = 1;

				if (rs != null) {
					SqlRowSetMetaData metaData = rs.getMetaData();
					for (int i = 1; i <= metaData.getColumnCount(); i++) {
						cell = row.createCell(i - 1);// 创建一个单元格
						cell.setCellValue(metaData.getColumnName(i));// 生成表头
					}
					while (rs.next()) {
						row = sheet.createRow((int) rowNum++);
						for (int i = 1; i <= metaData.getColumnCount(); i++) {
							int dataType = metaData.getColumnType(i);
							cell = row.createCell(i - 1);// 创建一个单元格
							switch (dataType) {
							case Types.NUMERIC:
							case Types.DECIMAL:
							case Types.DOUBLE:
							case Types.FLOAT:
							case Types.REAL:
								dataType = HSSFCell.CELL_TYPE_NUMERIC;
								cell.setCellValue(rs.getDouble(i));
								break;
							case Types.BIGINT:
							case Types.INTEGER:
							case Types.SMALLINT:
							case Types.TINYINT:
								dataType = HSSFCell.CELL_TYPE_NUMERIC;
								cell.setCellValue(rs.getLong(i));
								break;
							case Types.DATE:
								dataType = HSSFCell.CELL_TYPE_STRING;
								cell.setCellValue(rs.getDate(i));
								break;
							default:
								dataType = HSSFCell.CELL_TYPE_STRING;
								cell.setCellValue(rs.getString(i));
								break;
							}
							cell.setCellType(dataType);
						}
					}
				}

				nLoop++;
			}

			UploadUtils.createFolder(targetDir);

			FileOutputStream fout = new FileOutputStream(targetFile);
			wb.write(fout);
			fout.close();
			nRes = 1;

		}

		return nRes;
	}

	// public static String exportExcute(List<ResultSet> rss, String
	// modelFilePath,
	// String modelFileName) throws SQLException, FileNotFoundException,
	// IOException {
	//
	//
	// HSSFWorkbook wb = new HSSFWorkbook(new FileInputStream(excelPath
	// + modelFile));// 利用
	// // Excel模板创建一个新的Excel文件
	//
	// int nLoop = 1;
	// for (ResultSet rs : rss) {
	//
	// HSSFSheet sheet = wb.getSheet(C_RESULT_DATA
	// + Integer.toString(nLoop));// 获取Excel文件里的第一个表
	//
	// HSSFRow row = sheet.createRow((int) 1);// 创建一行
	//
	// HSSFCell cell = null;// 创建一个单元格
	//
	// int rowNum = 2;
	//
	// if (rs != null) {
	// ResultSetMetaData metaData = rs.getMetaData();
	// for (int i = 1; i <= metaData.getColumnCount(); i++) {
	// cell = row.createCell(i - 1);// 创建一个单元格
	// cell.setCellValue(metaData.getColumnName(i));// 生成表头
	// }
	// while (rs.next()) {
	// row = sheet.createRow((int) rowNum++);
	// for (int i = 1; i <= metaData.getColumnCount(); i++) {
	// cell = row.createCell(i - 1);// 创建一个单元格
	// cell.setCellValue(rs.getString(i));
	// }
	// }
	// }
	//
	// nLoop++;
	// }
	//
	// String reportFileName = String.valueOf(System.currentTimeMillis());
	//
	// FileOutputStream fout = new FileOutputStream(excelPath + "/"
	// + modelFile);
	// wb.write(fout);
	// fout.close();
	//
	// return modelFile + reportFileName;
	// }
}
