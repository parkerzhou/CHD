package com.glorisun.umm.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.View;

import com.glorisun.umm.comm.StringView;
import com.glorisun.umm.service.IUmmRoleFuncService;

@Controller
@RequestMapping(value="/ummRoleFuncController")
public class UmmRoleFuncController {

	private final String SUCCESS = "提交成功！";
	private final String FAIL = "提交失败！";

	@Autowired
	IUmmRoleFuncService ummRoleFuncService;

	

	/**
	 * 获取参照新增源角色
	 * @return 参照新增源角色，JSON List格式字符串
	 */
	@RequestMapping(params = "getSourceRoles")
	public ModelAndView getSourceRoles() {
		List<Map<String, Object>> list = ummRoleFuncService.getAllRoles();
		return new ModelAndView(new JSONListView(list));
	}

	@RequestMapping(params = "getFuncsInRange")
	public ModelAndView getFuncsByRange(
			@RequestParam(value = "rl_range") Integer rlRange) {
		List<Map<String, Object>> list = this.ummRoleFuncService
				.getFuncsByRange(rlRange);
		return new ModelAndView(new JSONListView(list));
	}

	// 前台接收页面中，checkbox的id==fu_id，name==ot_id。
	@RequestMapping(params = "getAuthedOper")
	public ModelAndView getAuthedOpers(@RequestParam(value = "rl_id") int rlId) {
		List<Map<String, Object>> list = this.ummRoleFuncService
				.getAuthedOperByRlId(rlId);
		return new ModelAndView(new JSONListView(list));
	}

	@RequestMapping(params = "updateFuncAuth", method=RequestMethod.POST)
	public ModelAndView updateFuncAuth(@RequestParam(value = "all") String all) {
		boolean isUpdate = true;
		JSONObject json = JSONObject.fromObject(all);
		Integer aim = json.getInt("aim_role_id");
		// Integer source = json.getInt("source_role_id");
		// Integer sourceRange = json.getInt("source_role_range");
		JSONArray funcAuths = json.getJSONArray("func_auths");
		try {
			isUpdate = this.ummRoleFuncService.updateRoleFuncs(aim, funcAuths);
		} catch (Exception e) {
			isUpdate = false;
		}

		if (!isUpdate) {
			return new ModelAndView(new StringView(FAIL));
		}

		return new ModelAndView(new StringView(SUCCESS));
	}

	@RequestMapping(params = "getRlRangeById")
	public ModelAndView getRangeById(@RequestParam(value = "rl_id") Integer rlId) {
		Integer range = ummRoleFuncService.getRlRangeByRlId(rlId);
		return new ModelAndView(new StringView(range.toString()));
	}

	@RequestMapping(params = "getSourceRolesByRange")
	public ModelAndView getSourceRolesByRange(Integer rl_id, Integer rl_range,
			String q) {
		List<Map<String, Object>> list = null;
		if (rl_range != null && q != null) {
			list = ummRoleFuncService.getSimilarRoles(rl_range, q);
			if (rl_id != null) {
				for (int i = 0; i < list.size(); i++) {
					Map<String, Object> map = list.get(i);
					if (Integer.parseInt(map.get("rl_id").toString()) == rl_id) {
						list.remove(i);
					}
				}
			}
		}

		return new ModelAndView(new JSONListView(list));
	}

	@RequestMapping(params = "getColumnsByRange")
	public ModelAndView getColumnsByRange(
			@RequestParam(value = "rl_range") Integer rlRange) {
		return new ModelAndView(new JSONListView(
				this.ummRoleFuncService.getColumnsByRange(rlRange)));
	}

	// 输出JSONList的View
	class JSONListView implements View {

		private List<Map<String, Object>> list;

		public JSONListView(List<Map<String, Object>> list) {
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
