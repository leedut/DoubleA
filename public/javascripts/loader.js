// 资源加载器
var loader = {
	loaded:true,
	//已加载资源数
	loadCount:0,
	//需要加载资源数
	totalCount:0,
	loadImage : function(url){
		loader.totalCount++;
		loader.loaded = false;
		var img = new Image();
		img.src = url;
		img.onload = loader.itemLoaded;
		return img;
	},
	
	itemLoaded:function(){
		loader.loadCount ++;
		//每加载完一个资源都进行一次判断 是否调用回调函数
		if(loader.loadCount== loader.totalCount){
			loader.loaded = true;
			//onload回调函数
			if(loader.onload){
				loader.onload();
				loader.onload = undefined;
			}
		}
		else{
			loader.loaded = false;
		}	
	},
}