package com.glorisun.chd.core.util;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.apache.commons.dbutils.BasicRowProcessor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;

public class JdbcTemplateUtil extends JdbcTemplate{

		/**
		 * 此处是借用DBUtils中的对应类，同时增加了对Annotation的支持
		 */
		private final BasicRowProcessor convert = new BasicRowProcessor();

		public <T> T queryForBean(String sql, final Class<T> beanType) {
			return query(sql, new ResultSetExtractor<T>() {

				@Override
				public T extractData(ResultSet rs) throws SQLException,
						DataAccessException {
					return rs.next() ? convert.toBean(rs, beanType) : null;
				}
			});
		}

		public <T> T queryForBean(String sql, final Class<T> beanType,
				Object... args) {
			return query(sql, args, new ResultSetExtractor<T>() {

				@Override
				public T extractData(ResultSet rs) throws SQLException,
						DataAccessException {
					return rs.next() ? convert.toBean(rs, beanType) : null;
				}
			});
		}

		public <T> List<T> queryForBeanList(String sql, final Class<T> beanType) {
			return query(sql, new RowMapper<T>() {

				@Override
				public T mapRow(ResultSet rs, int rowNum) throws SQLException {
					return convert.toBean(rs, beanType);
				}
			});
		}

		public <T> List<T> queryForBeanList(String sql, final Class<T> beanType,
				Object... args) {
			return query(sql, args, new RowMapper<T>() {

				@Override
				public T mapRow(ResultSet rs, int rowNum) throws SQLException {
					return convert.toBean(rs, beanType);
				}
			});
		}
	}

