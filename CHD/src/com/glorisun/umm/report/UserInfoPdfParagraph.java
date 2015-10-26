package com.glorisun.umm.report;

import java.io.IOException;

import com.lowagie.text.DocumentException;
import com.lowagie.text.Font;
import com.lowagie.text.Paragraph;
import com.lowagie.text.pdf.BaseFont;

/*
 * 该类实现了PDF文档中文数据输出
 */
@SuppressWarnings("serial")
public class UserInfoPdfParagraph extends Paragraph {

    public UserInfoPdfParagraph(String content) {

    super(content, getChineseFont());    //通过构造方法实现字体定义功能

    }

    //设置转型字体的方法

    private static final Font getChineseFont() {

    Font FontChinese = null;

     try {

             BaseFont bfChinese = BaseFont.createFont("STSong-Light",

                             "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);

             FontChinese = new Font(bfChinese, 12, Font.NORMAL);

    } catch (DocumentException de) {

             System.err.println(de.getMessage());

    } catch (IOException ioe) {

             System.err.println(ioe.getMessage());

    }

    return FontChinese;

    }

}