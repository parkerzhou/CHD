package com.glorisun.chd.service;

import com.glorisun.chd.pojo.BasicInfo;

public interface BasicService {
    /**
     * 基础资料维护-界面加载数据
     * @param d_TYPE 
     * @return
     */
    public String loadBasicInfo(String d_TYPE);
    /**
     * 基础资料维护-新增或修改的提交操作
     * @param basType
     * @param basicInfo
     * @return
     */
    public String addOrEditBasic(String basType,BasicInfo basicInfo);
    /**
     * 基础资料维护-删除操作
     * @param cmpqual_seqs
     * @return
     */
	public String delBasic(String cmpqual_seqs);
	/**
	 * 基础资料维护-根据主键id进行加载数据
	 * @param cMPQUAL_SEQ
	 * @return
	 */
	public String loadBasicById(String cMPQUAL_SEQ);
	

	 
}
