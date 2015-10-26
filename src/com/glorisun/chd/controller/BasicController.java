package com.glorisun.chd.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.glorisun.chd.pojo.BasicInfo;
import com.glorisun.chd.service.BasicService;

@Controller
@RequestMapping("/basicController")
public class BasicController {
   @Autowired
   BasicService basicService;
   
   private void output(HttpServletResponse response, String cmpComboInfo) {
		response.setContentType("text/html; charset=utf-8");

		try {
			response.getWriter().print(cmpComboInfo);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
   
   /**
    * 界面加载操作
    * @param request
    * @param response
    * @param D_TYPE
    */
   @RequestMapping(params="loadBasicInfo")
   public void loadBasic(HttpServletRequest request,
		   HttpServletResponse response,String D_TYPE){
	
	   output(response, basicService.loadBasicInfo(D_TYPE));
   }
   
   /**
    * 新增或修改提交操作
    * @param request
    * @param response
    * @param basType
    * @param basicInfo
    */
   @RequestMapping(params="addOrEditBasic")
	   public void addOrEditBasic(HttpServletRequest request,
		   HttpServletResponse response,String basType,BasicInfo basicInfo){
			   output(response,basicService.addOrEditBasic(basType,basicInfo));
		   }
   
   /**
    * 删除操作
    * @param request
    * @param response
    * @param cmpqual_seqs
    */
   @RequestMapping(params="delBasic")
   public void delBasic(HttpServletRequest request,
		   HttpServletResponse response,String cmpqual_seqs){
	  
	   output(response,basicService.delBasic(cmpqual_seqs));
   }
   
   /**
    * 修改时加载信息操作
    * @param request
    * @param response
    * @param CMPQUAL_SEQ
    */
   @RequestMapping(params="loadBasicById")
   public void loadBasicById(HttpServletRequest request,
		   HttpServletResponse response,String CMPQUAL_SEQ){
	   //System.out.println(CMPQUAL_SEQ);
	   output(response,basicService.loadBasicById(CMPQUAL_SEQ));
   }
   
   
   
   
   
   }
   
   

