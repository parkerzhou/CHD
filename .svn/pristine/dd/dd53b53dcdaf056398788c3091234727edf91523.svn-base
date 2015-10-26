package com.glorisun.chd.core.util.excel;

import java.io.File;

import com.jacob.activeX.ActiveXComponent;
import com.jacob.com.Dispatch;
import com.jacob.com.Variant;

public class TransferUtil {

	public static String SOURCE_FILE_SUFFIX_EXCEL_2003 = ".xls";

	public static String SOURCE_FILE_SUFFIX_EXCEL_2007 = ".xlsx";

	public static String TARGET_FILE_SUFFIX_HTML = ".html";

	public static String TARGET_FILE_SUFFIX_PDF = ".pdf";

	// 源文件与目标文件路径
	public String filePath;

	// 目标文件后缀
	private String targetSuffix;

	// 源文件后缀
	private String sourceSuffix;

	// 源文件与目标文件名称
	private String fileName;

	/**
	 * 构造器:使用此构造器构造一个文档转换工具类
	 * 
	 * @param docName
	 *            文档名称
	 * @param docType
	 *            文档类型 取值(DOCUMENT_TYPE_EXCEL,DOCUMENT_TYPE_EXCEL_HTML,
	 *            DOCUMENT_TYPE_EXCEL_PDF)
	 */
	public TransferUtil(String filePath, String fileName, String sourceSuffix,
			String targetSuffix) {
		this.filePath = filePath;
		this.fileName = fileName;
		this.sourceSuffix = sourceSuffix;
		this.targetSuffix = targetSuffix;
	}

	/**
	 * 返回文档在服务器的完整路径 文档完整路径=公共路径+文档名称+后缀名称
	 */
	public String returnFilePath() {

		/** 源文件 */
		String sourceFileCompleteName = filePath + fileName + sourceSuffix;

		/** 目标文件 */
		String targetFileCompleteName = filePath + fileName + targetSuffix;

		/** 判断源文件后缀,源文件后缀只能为"xls"或"xlsx" */
		if (!sourceSuffix.equals(SOURCE_FILE_SUFFIX_EXCEL_2003)
				|| !sourceSuffix.equals(SOURCE_FILE_SUFFIX_EXCEL_2007)) {
			return null;
		}

		/** 源文件目标文件不能为Excel的不同版本 */
		if (sourceSuffix.equals(SOURCE_FILE_SUFFIX_EXCEL_2003)
				&& targetSuffix.equals(SOURCE_FILE_SUFFIX_EXCEL_2007)) {
			return null;
		}

		/** 源文件目标文件不能为Excel的不同版本 */
		if (targetSuffix.equals(SOURCE_FILE_SUFFIX_EXCEL_2003)
				&& sourceSuffix.equals(SOURCE_FILE_SUFFIX_EXCEL_2007)) {
			return null;
		}

		/** 源文件不存在时 */
		if (!new File(sourceFileCompleteName).exists()) {
			return null;
		}

		/** Excel2003无法转换为pdf */
		if (sourceSuffix.equals(SOURCE_FILE_SUFFIX_EXCEL_2003)
				&& targetSuffix.equals(TARGET_FILE_SUFFIX_PDF)) {
			return null;
		}

		/** 当源文件与目标文件同为Excel,为同一版本时 */
		if (targetSuffix.equals(SOURCE_FILE_SUFFIX_EXCEL_2003)
				|| targetSuffix.equals(SOURCE_FILE_SUFFIX_EXCEL_2007)) {
			return fileName + targetSuffix;
		}

		if (isDocExist(targetFileCompleteName)) {// 判断文档html或pdf文档是否存在
			deleteDocumentFile(targetFileCompleteName);// 若存在,删除文档
		}

		/** 完成文档转换 */
		if (docTransformation(targetFileCompleteName)) {
			return fileName + targetSuffix;// 返回转换后文档的路径
		}

		return null;
	}

	/** 完成文档转换 */
	private boolean docTransformation(String docCompleteName) {
		if (targetSuffix.equals(TransferUtil.TARGET_FILE_SUFFIX_HTML)) {
			excelToHtml("", "");// 调用转换为html文档的方法
		} else if (targetSuffix.equals(TransferUtil.TARGET_FILE_SUFFIX_PDF)) {
			excelToPdf("", "");// 调用转换为pdf文档的方法
		} else {
			return false;
		}
		return true;
	}

	/** 判断文档是否存在 */
	private boolean isDocExist(String docCompleteName) {
		return new File(docCompleteName).exists();
	}

	/** 由外部调用 */
	/** 当临时文档目录存在时,删除临时文档目录 */
	public void deleteDocumentFolder(String FolderPathName) {
		new File(FolderPathName).delete();
	}

	/** 当文档存在时,删除文档 */
	public void deleteDocumentFile(String filePathName) {
		new File(filePathName).delete();
	}

	public static final int EXCEL_HTML = 44;

	/**
	 * EXCEL转HTML
	 * 
	 * @param xlsfile
	 *            EXCEL文件全路径
	 * @param htmlfile
	 *            转换后HTML存放路径
	 */
	public void excelToHtml(String xlsFile, String htmlFile) {
		ActiveXComponent app = new ActiveXComponent("Excel.Application");
		try {
			app.setProperty("Visible", new Variant(false));
			Dispatch excels = app.getProperty("Workbooks").toDispatch();
			Dispatch excel = Dispatch.invoke(
					excels,
					"Open",
					Dispatch.Method,
					new Object[] { xlsFile, new Variant(false),
							new Variant(true) }, new int[1]).toDispatch();

			Dispatch.invoke(excel, "SaveAs", Dispatch.Method, new Object[] {
					htmlFile, new Variant(EXCEL_HTML) }, new int[1]);
			Variant f = new Variant(false);
			Dispatch.call(excel, "Close", f);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			app.invoke("Quit", new Variant[] {});
		}
	}

	/**
	 * EXCEL转PDF
	 * 
	 * @param xlsFile
	 *            EXCEL文件全路径
	 * @param pdfFile
	 *            转换后PDF存放路径
	 */
	public void excelToPdf(String xlsFile, String pdfFile) {
		System.out.println("Starting excel...");
		long start = System.currentTimeMillis();
		ActiveXComponent app = new ActiveXComponent("Excel.Application");
		try {
			app.setProperty("Visible", false);
			Dispatch workbooks = app.getProperty("Workbooks").toDispatch();
			System.out.println("opening document:" + xlsFile);
			Dispatch workbook = Dispatch.invoke(
					workbooks,
					"Open",
					Dispatch.Method,
					new Object[] { xlsFile, new Variant(false),
							new Variant(false) }, new int[3]).toDispatch();
			Dispatch.invoke(workbook, "SaveAs", Dispatch.Method, new Object[] {
					pdfFile, new Variant(57), new Variant(false),
					new Variant(57), new Variant(57), new Variant(false),
					new Variant(true), new Variant(57), new Variant(true),
					new Variant(true), new Variant(true) }, new int[1]);
			Variant f = new Variant(false);
			System.out.println("to pdf " + pdfFile);
			Dispatch.call(workbook, "Close", f);
			long end = System.currentTimeMillis();
			System.out
					.println("completed..used:" + (end - start) / 1000 + " s");
		} catch (Exception e) {
			System.out
					.println("========Error:Operation fail:" + e.getMessage());
		} finally {
			if (app != null) {
				app.invoke("Quit", new Variant[] {});
			}
		}
	}
}
