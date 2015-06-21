function initScreen(){
	var _disHeight = (window.innerHeight-600)/2.0;
	$(".game-container").css("margin-top",_disHeight);      
}

//提供用户名输入
function inputName(){
	$(".start-screen").hide();
	$(".input-name").show();
}
function getName(){
	var name = $("#userName").val() || "";
	if( name.length>5 || name.length== 0 ){
		alert("昵称不能为空，也不能超过5个字呦！");
		return ;
	}
	else{
		game.name = name;
		var _j = '{type:1,content:"'+name+'"}';
		sendMsg(_j);
	}
}

//点击选牌 牌面上移或下移
function pockerMove(obj){
	playMusic("xuanpai");
	if($(obj).css("top")=="0px"){
		$(obj).addClass("pocker-choosed");
		$(obj).css("top","-15px");	
	}
	else{
		$(obj).removeClass("pocker-choosed");
		$(obj).css("top","0px");
	}
};

//左键拖拽选中 右键出牌
/*var dragPos = {start_x:0,start_y:0,finish_x:0,finish_y:0};*/
//document.oncontextmenu=new Function("event.returnValue=false;");
document.getElementById("pocker-board").onmouseup=function(oEvent) {
    if (!oEvent){
		oEvent=window.event;
	}
	/*if(oEvent.button==0){
		dragPos.finish_x = oEvent.x-$("#pocker-board").offset().left;
		dragPos.finish_y = oEvent.y-$("#pocker-board").offset().top+75;
		//根据位置判定选中哪些牌
		var startI = parseInt(dragPos.start_x/30);
		if(startI>13){
			startI = 13;
		}
		var finishI = parseInt(dragPos.finish_x/30);
		if(finishI>13){
			finishI = 13;
		}
		if(finishI==startI){
			//防止pocker-board的拖拽事件会阻止pocker-item的click事件
			return ;
		}
		if( (finishI-startI)>0 ){
			for(startI;startI<=finishI;startI++){
				pockerMove( $(".porker-item").eq(startI) );				
			}			
		}
		else{
			for(startI;startI>=finishI;startI--){
				pockerMove( $(".porker-item").eq(startI) );				
			}
		}
	}*/
    if (oEvent.button==2) {
        pocker.send();
    }
}
/*document.getElementById("pocker-board").onmousedown=function(oEvent) {
	if (!oEvent){
		oEvent=window.event;
	}
	//相对于 容器位置 （0,0） ~ （460,150）
	dragPos.start_x = oEvent.x-$("#pocker-board").offset().left;
	dragPos.start_y = oEvent.y-$("#pocker-board").offset().top+75;
}*/

//亮A
function showA(opt){
	$(".show-A").css("display","none");
	if(opt==1){
		playMusic("liang");
		pocker.showA = true;
		if(pocker.blackNum == 2){
			//亮双A 
			var _j = "{type:4,content:"+game.id+"}";
			sendMsg(_j);
			$(".num-1 .ready-state").css("display","block").css("background-image","url(./images/shuangA.png)");
		}
		else{
			//亮单A
			var _j = "{type:3,content:"+game.id+"}";
			sendMsg(_j);
			$(".num-1 .ready-state").css("display","block").css("background-image","url(./images/heitao.png)");
		}
	}
	else{
		//不亮双A
		playMusic("click");
		if(pocker.blackNum == 2){
			var _j = "{type:6,content:["+game.id+",2]}";
			sendMsg(_j);
		}
		else{
			//不亮单A
			var _j = "{type:6,content:["+game.id+",1]}";
			sendMsg(_j);	
		}
	}
}

//出牌 显示所出牌型状态 porcker-state
function setPorkerState(opt){
	$("#pocker-state").css("display","block");
	if(opt=="undefined"||opt==null){
		//出牌成功
		$("#pocker-state").css("background","none");
	}
	else if(opt=="fail"){
		//您所出的牌型不符合规则
		$("#pocker-state").css("background","url(./images/notable.png)");
	}
}

/*实时聊天*/
function sendChat(){
	var msg = $("#textChat").val();
	if(msg.length==0){
		return false;
	}
	var _j = "{type:8,content:["+game.id+",'"+msg+"']}";
	sendMsg(_j);
	$("#textChat").text("").val("");
}
//语音发送
function voiceChat(opt){
	var msg = $("#textChat").val();
	var _j = "{type:7,content:"+opt+"}";
	sendMsg(_j);
}
