// My Socket 
var socket = null;
var isFirstConnect = true;
var ip = window.server_ip;
function connect(){
	socket = io.connect(ip,{'reconnect':false});
	socket.on("connect",function(){
		inputName();
		if( isFirstConnect ){
			isFirstConnect = false;
			regEvent();
		}
		else{
			socket.socket.reconnect();
		}
	});
}
//消息接受
function regEvent(){
	socket.on("message",function(msg){
		var type = msg.type;
		var content = msg.content ;
		switch(type){
			case 1:{
				Type1(content);
			};break;
			case 101:{
				Type101(content);
			};break;
			case 102:{
				Type102(content);
			};break;
			case 103:{
				Type103(content);
			};break;
			case 104:{
				Type104(content);
			};break;
			case 105:{
				Type105(content);
			};break;
			case 106:{
				Type106(content);
			};break;
			case 107:{
				Type107(content);
			};break;
			case 108:{
				Type108(content);
			};break;
			case 200:{
				Type200(content);
			};break;
			case 201:{
				Type201(content);
			};break;
			default:break;
		}	
	});
}
//发送信息
function sendMsg(_json){
	if( socket!=null ){
		socket.send(_json);
	}
}

//广播函数处理Type1
function Type1(content){
	//接收反馈的姓名提交信息   包括分配的ID，其他人的就坐信息（id,name,ready）
	if(content[0]==0){
		alert("服务器人数已满，不能进入");
	}
	else{
		$(".input-name").css("display","none");
		$(".game-layer").show();
		game.drawPerson(content);
		game.id = content[0];
	}
}	
function Type101(content){
	//接收其他人的登陆广播信息
	game.drawSinglePerson(content);
}
function Type102(content){
	//准备信息绘制
	game.drawReady(content);
}
function Type103(content){
	//发牌 牌堆初始化
	switch(game.id){
		case 1:{
			game.start(content[0]);
		};break;
		case 2:{
			game.start(content[1]);
		};break;
		case 3:{
			game.start(content[2]);
		};break;
		case 4:{
			game.start(content[3]);
		};break;
		default:break;
	}
}
function Type104(content){
	switch(content){
		case 1:{
			game.id_1.find(".ready-state").css("display","block").css("background-image","url(./images/heitao.png)");
		};break;
		case 2:{
			game.id_2.find(".ready-state").css("display","block").css("background-image","url(./images/heitao.png)");
		};break;
		case 3:{
			game.id_3.find(".ready-state").css("display","block").css("background-image","url(./images/heitao.png)");
		};break;
		case 4:{
			game.id_4.find(".ready-state").css("display","block").css("background-image","url(./images/heitao.png)");
		};break;
		default:break;
	}
	//如果我有A 但是没亮
	if( pocker.blackA==true && pocker.showA==false ){
		showA(1);
	}
}
function Type105(content){
	//有人亮双A
	switch(content){
		case 1:{
			game.id_1.find(".ready-state").css("display","block").css("background-image","url(./images/shuangA.png)");
		};break;
		case 2:{
			game.id_2.find(".ready-state").css("display","block").css("background-image","url(./images/shuangA.png)");
		};break;
		case 3:{
			game.id_3.find(".ready-state").css("display","block").css("background-image","url(./images/shuangA.png)");
		};break;
		case 4:{
			game.id_4.find(".ready-state").css("display","block").css("background-image","url(./images/shuangA.png)");
		};break;
		default:break;
	}
}
function Type106(content){
	cp_id = content[0];
	game.lastPock_1 = content[1];
	game.lastPock_2 = content[2];
	game.lastPock_3 = content[3];
	game.lastPock_4 = content[4];
	if( content[1].length==0 && content[2].length==0 && content[3].length==0 && content[4].length==0){
		//四家记录均为空且所有人剩余牌数<52  首次出牌
		if( cp_id == game.id ){
			game.ablePock = true;
			$(".num-1 .out-board").text("").css("display","block");
			$(".action").css("display","block");
			$(".action .chupaiBtn").css("display","block");
		}
	}
	else{
		//正常出牌记录
		console.log("调用showOtherPock函数");
		switch(cp_id){
			case 1:{//该1出了  那就更新4的出牌信息
				showOtherPock(4,game.lastPock_4);
			};break;
			case 2:{//该2出了  那就更新1的出牌信息
				showOtherPock(1,game.lastPock_1);
			};break;
			case 3:{//该2出了  那就更新2的出牌信息
				showOtherPock(2,game.lastPock_2);
			};break;
			case 4:{//该4出了  那就更新3的出牌信息
				showOtherPock(3,game.lastPock_3);
			};break;
			default:break;
		}
		//出牌权限赋予
		if( cp_id == game.id ){
			//如果是牌权 但是自己已出完 则广播不出
			if($(".porker-item").length==0){
				game.ablePock = false;
				var _j = '{type:5,content:['+game.id+',[]]}';
				sendMsg(_j);
				$(".num-1 .oper-board").css("display","none");
				$(".num-1 .chupai-state").css("display","none");
				return false;
			}
			//若还有牌 则正常出牌
			game.ablePock = true;
			$(".num-1 .out-board").text("").css("display","block");
			$(".action").css("display","block");
			$(".action .chupaiBtn").css("display","block");
			//如果上三家出牌记录有一家不空  则可以显示不出按钮
			switch(cp_id){
				case 1:{
					if(game.lastPock_2.length>0 || game.lastPock_3.length>0 || game.lastPock_4.length>0 ){
						$(".action .buchuBtn").css("display","block");
					}
					else{
						$(".action .buchuBtn").css("display","none");
					}
				};break;
				case 2:{
					if( game.lastPock_1.length>0 || game.lastPock_3.length>0 || game.lastPock_4.length>0 ){
						$(".action .buchuBtn").css("display","block");
					}
					else{
						$(".action .buchuBtn").css("display","none");	
					}
				};break;
				case 3:{
					if( game.lastPock_1.length>0 || game.lastPock_2.length>0 || game.lastPock_4.length>0 ){
						$(".action .buchuBtn").css("display","block");
					}
					else{
						$(".action .buchuBtn").css("display","none");	
					}
				};break;
				case 4:{
					if( game.lastPock_1.length>0 || game.lastPock_2.length>0 || game.lastPock_3.length>0 ){
						$(".action .buchuBtn").css("display","block");
					}
					else{
						$(".action .buchuBtn").css("display","none");	
					}
				};break;
				default:{console.log("EROOR ID");};break;
			}
		}
	}
	$(".chupai-state").css("display","none");
	console.log("该出牌："+cp_id);
	game.getArea(cp_id).find(".chupai-state").css("display","block");
}
function Type107(content){
	//某人出完牌了
	game.finished.push(content);
}
function Type108(content){
	//比赛结束 胜 平 负
	/*清除上一局的信息*/
	$(".game-result").removeClass("win").removeClass("equal").removeClass("lose");

	if(content.length==4){
		//平局
		playMusic("win");
		$(".game-result").addClass("equal").find(".word").text("哎呀呀，差一点就获得胜利了，您这局平了！");
	}
	else{
		var flag = false ;
		for(var i =0;i<content.length;i++){
			if( content[i][0]==game.id ){
				flag = true;
				break;	
			}
		}	
		if(flag){//胜
			var str = "";
			for(var i = 0;i<content.length;i++){
				if( content[i][0]!=game.id ){
					str = str +content[i][1]+" ";
				}
			}
			playMusic("win");
			$(".game-result").addClass("win").find(".word").text("哎呀卧槽，胜利了，您和"+str+"配合真赞！");
		}
		else{//负
			var str = "";
			playMusic("lose");
			$(".game-result").addClass("lose").find(".word").text("又尼玛坑队友了，您这局输了！");
		}
	}
	$(".game-result").css("display","block");
}
function Type200(content){
	//游戏语音
	switch(content){
		case 1:{
			playMusic("cuiren");
		};break;
		case 2:{
			playMusic("tucao");
		};break;
		case 3:{
			playMusic("maren");
		};break;
		default:break;	
	}
}
function Type201(content){
	//游戏文字聊天
	var msg = content[0]+" ： "+content[1]+"\r\n";
	$("textarea").text($("textarea").text()+msg);
	$("textarea").scrollTop( document.getElementsByTagName("textarea")[0].scrollHeight );
}