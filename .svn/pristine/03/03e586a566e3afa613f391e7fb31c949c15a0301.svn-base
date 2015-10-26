package com.glorisun.chd.listener;

import javax.servlet.ServletContextEvent;

import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.glorisun.chd.core.def.SystemGlobalObj;
import com.glorisun.chd.service.InitService;

public class InitListener implements javax.servlet.ServletContextListener {

	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void contextInitialized(ServletContextEvent event) {
		WebApplicationContext webApplicationContext = WebApplicationContextUtils.getWebApplicationContext(event.getServletContext());
		InitService systemService = (InitService) webApplicationContext.getBean("initService");
		
		
		//先赋值使用。以后再从数据库中取值
		SystemGlobalObj.getMpSytempParam().put(SystemGlobalObj.GP_DIR_MODEL, "D:\\userfiles\\chcrm\\system\\report_model");
		SystemGlobalObj.getMpSytempParam().put(SystemGlobalObj.GP_DIR_TEMP, "C:\\Program Files\\Apache Software Foundation\\Tomcat 6.0\\webapps\\chcrm\\temp");
		
		
		
		
		
		/*初始化数据缓冲区,填充所有数据。
		 *(SystemGlobalObj.ALLDatas:为所有，其他值取ba_baseDeclCate.bc_id，如201:客户相关;220:产品相关;240:联系人相关;260:其它代码)
		 *若修改客户相关的数据缓冲区数据，则:
		 * SystemGlobalObj.getBsDBBuffer().put(201, systemService.setBsDBBuffer(201));
		 * 若调用客户相关的数据缓冲区数据，则:
		 * SystemGlobalObj.getBsDBBuffer().put(201);
		 */		
		SystemGlobalObj.getBsDBBuffer().put(SystemGlobalObj.ALLDatas, systemService.setBsDBBuffer(SystemGlobalObj.ALLDatas));
		//调用数据缓冲区
		SystemGlobalObj.getBsDBBuffer().get(SystemGlobalObj.ALLDatas);
		

		
		
		
	}

}
