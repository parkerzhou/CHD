package com.glorisun.chd.core.util;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import com.glorisun.chd.pojo.JmsFprojReg;

public class RflectCoder {
	
	public static int insertJavaBean(JdbcTemplate jdbcTemplate,String tableName,Object obj,String keyName){
		Class clazz = obj.getClass();
		List list = new ArrayList();
		Field[] fields = clazz.getDeclaredFields();
		StringBuffer sf = new StringBuffer();
		sf.append("insert into "+tableName+" (");
		try{
			for(Field field:fields){
				String fieldName = field.getName();
				if(keyName!=null&&fieldName.equals(keyName)){
					continue;
				}
				fieldName = fieldName.replaceFirst(fieldName.substring(0, 1),fieldName.substring(0, 1).toUpperCase());
				String methodName = "get"+fieldName;
				list.add(clazz.getMethod(methodName, null).invoke(obj, null));
				sf.append(field.getName()+",");
			}
		}catch(Exception e){
			throw new RuntimeException(e);
		}
		Object[] objs = list.toArray();
		String sql = sf.substring(0,sf.length()-1);
		sf.delete(0, sf.length());
		sf.append(sql);
		sf.append(") values (");
		int length = keyName==null?fields.length:fields.length-1;
		for(int i=0;i<length;i++){
			sf.append("?,");
		}
		sql = sf.substring(0,sf.length()-1);
		sf.delete(0, sf.length());
		sf.append(sql);
		sf.append(")");
		sql = sf.toString();
		return jdbcTemplate.update(sql,objs);
	}
	
	public static int updateJavaBean(JdbcTemplate jdbcTemplate,String tableName,Object obj,String keyName){
		Class clazz = obj.getClass();
		List list = new ArrayList();
		Field[] fields = clazz.getDeclaredFields();
		StringBuffer sf = new StringBuffer();
		sf.append("update "+tableName+" set ");
		String keyMethodName = "get"+keyName.replaceFirst(keyName.substring(0, 1),keyName.substring(0, 1).toUpperCase());
		try{
			for(Field field:fields){
				String fieldName = field.getName();
				fieldName = fieldName.replaceFirst(fieldName.substring(0, 1),fieldName.substring(0, 1).toUpperCase());
				String methodName = "get"+fieldName;
				list.add(clazz.getMethod(methodName, null).invoke(obj, null));
				sf.append(field.getName()+" = ?,");
			}
		}catch(Exception e){
			throw new RuntimeException(e);
		}
		String sql = sf.substring(0,sf.length()-1);
		sf.delete(0, sf.length());
		sf.append(sql);
		sf.append(" where "+keyName+" = ?");
		sql = sf.toString();
		try{
			list.add(clazz.getMethod(keyMethodName, null).invoke(obj, null));
		}catch(Exception e){
			throw new RuntimeException(e);
		}
		Object[] objs = list.toArray();
		
		return jdbcTemplate.update(sql,objs);
	}
	
	
	/*public static Number insertAndGetKey(JdbcTemplate jdbcTemplate,String tableName,Object obj,String keyName){
		Class clazz = obj.getClass();
		List list = new ArrayList();
		Field[] fields = clazz.getDeclaredFields();
		StringBuffer sf = new StringBuffer();
		sf.append("insert into "+tableName+" (");
		try{
			for(Field field:fields){
				String fieldName = field.getName();
				if(keyName!=null&&fieldName.equals(keyName)){
					continue;
				}
				fieldName = fieldName.replaceFirst(fieldName.substring(0, 1),fieldName.substring(0, 1).toUpperCase());
				String methodName = "get"+fieldName;
				list.add(clazz.getMethod(methodName, null).invoke(obj, null));
				sf.append(field.getName()+",");
			}
		}catch(Exception e){
			throw new RuntimeException(e);
		}
		final Object[] objs = list.toArray();
		String sql = sf.substring(0,sf.length()-1);
		sf.delete(0, sf.length());
		sf.append(sql);
		sf.append(") values (");
		int length = keyName==null?fields.length:fields.length-1;
		for(int i=0;i<length;i++){
			sf.append("?,");
		}
		sql = sf.substring(0,sf.length()-1);
		sf.delete(0, sf.length());
		sf.append(sql);
		sf.append(")");
		sql = sf.toString();
		
		final String sqlStr = sql;
		
		final KeyHolder key = new GeneratedKeyHolder();
		jdbcTemplate.update(new PreparedStatementCreator(){

			@Override
			public PreparedStatement createPreparedStatement(Connection con)
					throws SQLException {
				// TODO Auto-generated method stub
				PreparedStatement ps = con.prepareStatement(sqlStr,PreparedStatement.RETURN_GENERATED_KEYS);
				for(int i=0;i<objs.length;i++){
					ps.setObject(i+1, objs[i]);
				}
				return ps;
			}
			
		},key);
		System.out.println(key.getKey().getClass());
		return null;
	}*/

}
