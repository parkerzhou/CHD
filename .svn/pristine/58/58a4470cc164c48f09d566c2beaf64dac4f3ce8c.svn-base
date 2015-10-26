package com.glorisun.chd.core.util;

import javax.sql.rowset.serial.SerialClob;
import javax.sql.rowset.serial.SerialException;

public class SerialClobUtil {
	/**
	 * 功能：在给修改窗口返回数据的时候，有些特殊的数据是要通过这个函数来处理的不然返回的就不是你想要的数据
	 * @param ob  传进 object 类型的数据 然后进行转换
	 * @return 返回 转换后的数据
	 */
	public static String clob2String(SerialClob clob)
	{
		if (clob == null) {
			return "";
		}
		try {
			if (clob.length() != 0)
				return clob.getSubString(1, (int) clob.length());
			else
				return "";
		} catch (SerialException e) {
			e.printStackTrace();
			return "";
		}
	}

}
