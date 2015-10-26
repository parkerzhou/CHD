function openCommDialog(title,href,width,height,callback){
	$("#dlg").dialog({
		width:width,
		height:height,
		modal:true,
		href:href,
		title:title,
		onLoad:function(){
			callback();
		}
	});
}