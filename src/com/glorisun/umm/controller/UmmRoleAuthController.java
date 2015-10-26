package com.glorisun.umm.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import com.glorisun.chd.core.def.Constant;
import com.glorisun.chd.pojo.UserInfo;
import com.glorisun.umm.comm.StringView;
import com.glorisun.umm.service.IUmmRoleAuthService;

/**
 * 角色授权相关Controller
 * 
 * @author 林伟航
 * 
 */
@Controller
@RequestMapping(value="/ummRoleAuthController")
public class UmmRoleAuthController {

	/**
	 * 用户授权服务
	 */
	@Autowired
	IUmmRoleAuthService ummRoleAuthService;

	/**
	 * 获取用户群组列表
	 * 
	 * @return JSON格式的用户群组列表。
	 */
	@RequestMapping(params = "getUserGrp")
	public ModelAndView getAllUserGrps() {
		List<Map<String, Object>> list = ummRoleAuthService.getAllUserGrps();
		return new ModelAndView(new JSONListView(list));
	}

	/**
	 * 通过用户群组ID获取已授权的角色，并在已授权的角色上添加授权状态，该状态用来显示在网页上。
	 * 
	 * @param ugId
	 *            用户群组ID。
	 * @param range
	 *            用户群组适用范围。
	 * @return JSON格式的已授权角色列表。
	 */
	@RequestMapping(params = "getRoleInRange", method = RequestMethod.POST)
	public ModelAndView getAllRoles(@RequestParam(value = "ug_id") int ugId,
			@RequestParam(value = "ug_range") int range) {
		List<Map<String, Object>> rolesList = ummRoleAuthService
				.getRoleByRange(range);
		List<Integer> authRlIdList = ummRoleAuthService.getRlIdByUgId(ugId);

		// 给有授权的角色对应的Map添加“status”状态字段，有授权的角色赋值true，没有权限的角色赋值false。
		for (Map<String, Object> roleMap : rolesList) {
			int rlId = Integer.parseInt(roleMap.get("rl_id").toString());
			boolean status = false;

			for (int authRlId : authRlIdList) {
				if (rlId == authRlId) {
					status = true;
					break;
				}
			}

			roleMap.put("status", status);

		}

		return new ModelAndView(new JSONListView(rolesList));

	}

	/**
	 * 用来更新用户群组的角色授权，对比原数据库中的授权数据和传进来的数据，多余则删掉，缺少则增加。
	 * 
	 * @param ugId
	 *            用户群组ID。
	 * @param rlIdArray
	 *            授权的角色ID链表。
	 * @return 返回ModelAndView实例，如果更新成功，为"commit succeed!"，否则为"commit failed!"。
	 */
	@RequestMapping(params = "roleAuthCommit", method = RequestMethod.POST)
	public ModelAndView changeAuth(HttpServletRequest request, @RequestParam(value = "ug_id") int ugId,
			@RequestParam(value = "rl_id_array[]") List<Integer> rlIdArray) {
		UserInfo userInfo=(UserInfo)(request.getSession().getAttribute(Constant.GB_SESSION_USERINFO));
	     int  id = userInfo.getId(); 
		boolean isUpdate = false;// 是否成功更新数据库。

		if (rlIdArray.size() <= 1) {
			try {
				isUpdate = ummRoleAuthService.deleteRoleAuthByUgId(ugId);
			} catch (Exception e) {
				isUpdate = false;
			}

		} else {
			rlIdArray.remove(0);
			Date date = new Date();
			java.sql.Timestamp t1 = new java.sql.Timestamp(date.getTime());
			try {
				isUpdate = ummRoleAuthService.updateRoleAuth(rlIdArray, ugId,
						id, t1);
			} catch (Exception e) {
				isUpdate = false;
			}
		}

		return new ModelAndView(new StringView(isUpdate ? "commit succeed!"
				: "commit failed!"));
	}
	
	//输出JSONList的View
	class JSONListView implements View{

		private List<Map<String, Object>> list;
		
		public JSONListView(List<Map<String, Object>> list){
			this.list = list;
		}
		
		@Override
		public String getContentType() {
			// TODO Auto-generated method stub
			return "text/html;charset=UTF-8";
		}
		
		@SuppressWarnings("rawtypes")
		@Override
		public void render(Map arg0, HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			JSONArray json = new JSONArray();
			json.addAll(list);
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html;charset=UTF-8");
			response.getWriter().write(json.toString());
		}
		
	}

}
