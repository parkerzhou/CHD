roleOptType = -1;

function pagerFilter(data) {
	if (typeof data.length == 'number' && typeof data.splice == 'function') {
		data = {
			total : data.length,
			rows : data
		};
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage : function(pageNum, pageSize) {
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh', {
				pageNumber : pageNum,
				pageSize : pageSize
			});
			dg.datagrid('loadData', data);
		},
		onBeforeRefresh : function() {
			dg.datagrid('load');
		}
	});
	if (!data.originalRows) {
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}
var editable = true;

var roleCodeBackup = null;
var roleNameBackup = null;
var roleRangeBackup = null;

// 功能按键响应事件
$(function() {

	// 新增按键响应事件
	$('#rl_add').click(function() {
		roleOptType = 0;
		// 打开窗口，并清除表单数据
		$('#rl_title').text('新增');

		$('#rl_form').form('clear');

		// 标记id=-1，说明为新增角色
		$('#rl_id').val("-1");
		$('#rl_code').val("RL");

		$('#rl_window').window('open');

	});

	var initData = [];
	$('#rl_dg').datagrid({
		data : initData,
		onDblClickRow : function(rowIndex, rowData) {
			if (editable == false) {
				return;// 没有权限，直接返回
			}
			$.ajax({
				url : 'ummRoleController.do?getRole&rl_id=' + rowData.rl_id,
				type : 'POST',
				async : false,
				success : function(data, status, xml) {
					var obj = $.parseJSON(xml.responseText);
					// console.info(obj);
					$('#rl_form').form('load', obj);
				},
				error : function() {
				}
			});
			$('#rl_title').text('修改');
			$('#rl_window').window('open');
		}
	});

	loadRoleDG();
	// 查询按钮响应事件
	$('#rl_search').click(function() {
		loadRoleDG();
	});

	// 加载角色管理datagrid数据
	function loadRoleDG() {
		var roleCode = $('#roleCode').val();
		var roleName = $('#roleName').val();
		var Range = $('#Range').combobox('getValue');

		roleCodeBackup = roleCode;
		roleNameBackup = roleName;
		roleRangeBackup = Range;
		
		var roleUrl = 'ummRoleController.do?loadRoleInfo&roleCode=' + roleCode
				+ "&roleName=" + roleName + "&Range=" + Range;
		$('#rl_dg').datagrid({
			url : roleUrl,
			loadFilter : pagerFilter
		// 即获取数据源
		});

	}

	// 适用范围数据加载
	$('#Range').combobox({
		onShowPanel : function() {
			// 加载适用范围数据
			getRangeInfo();
		}
	});

	// 获取适用范围数据
	function getRangeInfo() {
		$.ajax({
			url : 'ummRoleController.do?getRangeInfo',
			success : function(data, status, xml) {
				var obj = $.parseJSON(xml.responseText);

				$('#Range').combobox('loadData', obj);
			}
		});
	}

	// 加载新增或修改窗口适用范围下拉列表数据
	$('#rl_range').combobox({
		onShowPanel : function() {
			// 加载适用范围数据
			getRangeInfoNoAll();
		}
	});

	// 不含所有项的使用范围
	function getRangeInfoNoAll() {
		$.ajax({
			url : 'ummRoleController.do?getRangeInfoNoAll',
			success : function(data, status, xml) {
				var obj = $.parseJSON(xml.responseText);

				$('#rl_range').combobox('loadData', obj);
			}
		});
	}

	// 提交按钮响应事件
	$('#rl_submit').click(function() {
		// 验证表单
		var idValid = $('#rl_form').form('validate');
		if (!idValid) {
			return idValid;
		}

		// 格式化表单数据
		var format = $('#rl_form').serializeArray();
		// console.info(format);
		$.ajax({
			url : 'ummRoleController.do?saveRoleInfo',
			data : format,
			type : 'POST',
			success : function(data, status, xml) {
				// console.info(xml);
				if (xml.responseText == "true") {
					$.messager.alert('提示', '提交成功！', 'info');
					$("#rl_form").form('clear');
					$("#rl_window").window('close');
					$('#rl_dg').datagrid('reload');
				} else {
					$.messager.alert('提示', '提交失败！', 'error');
				}

			},
			error : function() {
				$.messager.alert('提示', '提交失败！', 'error');
			}
		});
	});

	// 修改事件
	$('#rl_alter').click(function() {
		var rows = $('#rl_dg').datagrid('getSelections');
		if (rows.length == 0) {
			$.messager.alert('提示', '请选择要修改的记录！', 'info');
			return null;
		} else if (rows.length > 1) {
			$.messager.alert('提示', '请选择一条记录进行修改！', 'info');
			return null;
		}

		$.ajax({
			url : 'ummRoleController.do?getRole&rl_id=' + rows[0].rl_id,
			type : 'POST',
			async : false,
			success : function(data, status, xml) {
				var obj = $.parseJSON(xml.responseText);
				// console.info(obj);
				$('#rl_form').form('load', obj);
			},
			error : function() {
			}
		});
		$('#rl_title').text('修改');
		$('#rl_window').window('open');
	});

	// 取消按键响应事件
	$('#rl_cancel').click(function() {
		$('#rl_form').form('clear');
		$('#rl_window').window('close');
	});

	$('#rl_delete').click(function() {
		var rows = $('#rl_dg').datagrid('getSelections');

		// 没有选中行提示选择要删除的记录
		if (rows.length <= 0) {
			$.messager.alert('提示', '请选择要删除的记录!', 'info');
			return null;
		}

		// 至少选择一行
		$.messager.confirm('提示', '是否确定删除所选择的记录?', function(r) {
			if (r) {
				// 删除记录的id数组
				var idArray = [];
				for ( var key in rows) {
					idArray.push(rows[key].rl_id);
				}

				$.ajax({
					type : 'POST',
					url : 'ummRoleController.do?delRole&idArray=' + idArray,
					dataType : 'text',
					success : function(data, status, xml) {
						$('#rl_dg').datagrid('reload');
						$('#rl_dg').datagrid('unselectAll');
						$.messager.alert('提示', data + '!', 'info');
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						$.messager.alert('提示', '删除错误!', 'error');
					}
				});
			}
		});

	});

	/* 导出功能响应事件Star */
	$('#rl_export').click(function() {
		url = "ummRoleController.do?roleDcExcelOrPDF&roleCode="+ roleCodeBackup +"&roleName="+ roleNameBackup +"&Range=" + roleRangeBackup;
		openReportDialog(url);
	});
});
