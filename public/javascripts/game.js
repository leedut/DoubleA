var game ={
	name:"",
	id:0,
	//ID对应的操作面板
	id_1:null, 
	id_2:null,
	id_3:null,
	id_4:null,
	getArea:function(id){
		switch(id){
			case 1:{return game.id_1;};break;
			case 2:{return game.id_2;};break;
			case 3:{return game.id_3;};break;
			case 4:{
				return game.id_4;
			};break;
			default:break;
		}
	},
	state:"unready",
	//能否出牌
	ablePock:false,
	lastPock_1:[],
	lastPock_2:[],
	lastPock_3:[],
	lastPock_4:[],
	finished:[],
	isFinished:function(id){
		//完成了就返回true
		for(var i=0;i<game.finished.length;i++){
			if( game.finished[i] == id ){
				return true;
			}
		}
		return false;
	},
	//画布控制部分
	canvas:document.getElementById("gameCanvas"),
	bgImg:null,
	personImg:null,
	//音效控制部分
	play_control: true,
	bgplayer : document.getElementById("bgPlayer"),
	musicplayer:document.getElementById("musicPlayer"),
	playerImg : document.getElementById("playerIcon"),
	
	init : function(){
		//图像预加载 事件绑定
		game.context = game.canvas.getContext("2d");
		game.bgImg= loader.loadImage("/images/bg-1.png");
		game.personImg = loader.loadImage("/images/person-2.png");
		if(loader.loaded){
			game.drawBg();
		}
		else{
			loader.onload = game.drawBg;
		}
		$("#enterBtn").click(function(){
			//点击进入游戏   建立Socket链接，connect回调函数 会让用户输入姓名
			playMusic("click");
			connect();
			$(".start-btn").css("background-size","contain");
			$(".start-btn").css("background","url(./images/connecting.png) center no-repeat");
		});
	},
	drawBg:function(){
		game.context.drawImage(game.bgImg,0,0,910,600);
	},
	drawPerson:function(arr){
		//根据返回的信息 对座位信息绘制
		//个人信息绘制
		game.context.drawImage(game.personImg,5,520,150,200,20,470,100,130);
		game.context.font= 'normal bold 18px 微软雅黑';
		game.context.fillStyle = "#FFFFFF";
		game.context.fillText(game.name,150,530);
		if( arr[0]!=0 ){
			//若用户ID为1
			if(arr[0]==1){
					//指定用户ID 对应的 操作面板
					game.id_1 = $('.num-1');
					game.id_2 = $('.num-3');
					game.id_3 = $('.num-2');
					game.id_4 = $('.num-4');
				for(var i =1;i<arr.length;i++){
					if(arr[i][0]==2){
						game.context.fillText(arr[i][1],820,350);
						game.context.drawImage(game.personImg,0,710,170,230,800,180,100,148);						
					}
					if(arr[i][0]==3){
						game.context.fillText(arr[i][1],520,140);
						game.context.drawImage(game.personImg,5,520,150,200,400,70,100,130);
					}
					if(arr[i][0]==4){
						game.context.fillText(arr[i][1],10,350);
						game.context.drawImage(game.personImg,0,710,170,230,-15,180,100,148);
					}
				}
			}
			else if(arr[0]==2){
					//指定用户ID 对应的 操作面板
					game.id_1 = $('.num-4');
					game.id_2 = $('.num-1');
					game.id_3 = $('.num-3');
					game.id_4 = $('.num-2');
				for(var i =1;i<arr.length;i++){
					if(arr[i][0]==1){
						game.context.fillText(arr[i][1],10,350);
						game.context.drawImage(game.personImg,0,710,170,230,-15,180,100,148);
						game.id_1.css("display","block");
						if(arr[i][2]==true)
							game.id_1.find(".ready-state").css("display","block");
					}
					if(arr[i][0]==3){
						game.context.fillText(arr[i][1],820,350);
						game.context.drawImage(game.personImg,0,710,170,230,800,180,100,148);
						game.id_3.css("display","block");
						if(arr[i][2]==true)
							game.id_3.find(".ready-state").css("display","block");
					}
					if(arr[i][0]==4){
						game.context.fillText(arr[i][1],520,140);
						game.context.drawImage(game.personImg,5,520,150,200,400,70,100,130);
						game.id_4.css("display","block");
						if(arr[i][2]==true)
							game.id_4.find(".ready-state").css("display","block");
					}
				}
			}
			else if(arr[0]==3){
					//指定用户ID 对应的 操作面板
					game.id_1 = $('.num-2');
					game.id_2 = $('.num-4');
					game.id_3 = $('.num-1');
					game.id_4 = $('.num-3');
				for(var i =1;i<arr.length;i++){
					if(arr[i][0]==1){
						game.context.fillText(arr[i][1],520,140);
						game.context.drawImage(game.personImg,5,520,150,200,400,70,100,130);
						game.id_1.css("display","block");
						if(arr[i][2]==true)
							game.id_1.find(".ready-state").css("display","block");
					}
					if(arr[i][0]==2){
						game.context.fillText(arr[i][1],10,350);
						game.context.drawImage(game.personImg,0,710,170,230,-15,180,100,148);
						game.id_2.css("display","block");
						if(arr[i][2]==true)
							game.id_2.find(".ready-state").css("display","block");
					}
					if(arr[i][0]==4){
						game.context.fillText(arr[i][1],820,350);
						game.context.drawImage(game.personImg,0,710,170,230,800,180,100,148);		
						game.id_4.css("display","block");
						if(arr[i][2]==true)
							game.id_4.find(".ready-state").css("display","block");				
					}
				}
			}
			else{
					//指定用户ID 对应的 操作面板
					game.id_1 = $('.num-3');
					game.id_2 = $('.num-2');
					game.id_3 = $('.num-4');
					game.id_4 = $('.num-1');
				//本人ID为4
				for(var i =1;i<arr.length;i++){
					if(arr[i][0]==1){
						game.context.fillText(arr[i][1],820,350);
						game.context.drawImage(game.personImg,0,710,170,230,800,180,100,148);
						game.id_1.css("display","block");
						if(arr[i][2]==true)
							game.id_1.find(".ready-state").css("display","block");						
					}
					if(arr[i][0]==2){
						game.context.fillText(arr[i][1],520,140);
						game.context.drawImage(game.personImg,5,520,150,200,400,70,100,130);
						game.id_2.css("display","block");
						if(arr[i][2]==true)
							game.id_2.find(".ready-state").css("display","block");
					}
					if(arr[i][0]==3){
						game.context.fillText(arr[i][1],10,350);
						game.context.drawImage(game.personImg,0,710,170,230,-15,180,100,148);
						game.id_3.css("display","block");
						if(arr[i][2]==true)
							game.id_3.find(".ready-state").css("display","block");
					}
				}
			}
			
		}
	},
	drawSinglePerson:function(arr){
		switch(game.id){
			case 1:{
				if(arr[0]==2){
					game.id_2.css("display","block");
					game.context.fillText(arr[1],820,350);
					game.context.drawImage(game.personImg,0,710,170,230,800,180,100,148);
				}
				else if(arr[0]==3){
					game.id_3.css("display","block");
					game.context.fillText(arr[1],520,140);
					game.context.drawImage(game.personImg,5,520,150,200,400,70,100,130);
				}
				else if(arr[0]==4){
					game.id_4.css("display","block");
					game.context.fillText(arr[1],10,350);
					game.context.drawImage(game.personImg,0,710,170,230,-15,180,100,148);
				}
			};break;
			case 2:{
				if(arr[0]==1){
					game.id_1.css("display","block");
					game.context.fillText(arr[1],10,350);
					game.context.drawImage(game.personImg,0,710,170,230,-15,180,100,148);
				}
				else if(arr[0]==3){
					game.id_3.css("display","block");
					game.context.fillText(arr[1],820,350);
					game.context.drawImage(game.personImg,0,710,170,230,800,180,100,148);
				}
				else if(arr[0]==4){
					game.id_4.css("display","block");
					game.context.fillText(arr[1],520,140);
					game.context.drawImage(game.personImg,5,520,150,200,400,70,100,130);
				}
			};break;
			case 3:{
				if(arr[0]==1){
					game.id_1.css("display","block");
					game.context.fillText(arr[1],520,140);
					game.context.drawImage(game.personImg,5,520,150,200,400,70,100,130);
				}
				else if(arr[0]==2){
					game.id_2.css("display","block");
					game.context.fillText(arr[1],10,350);
					game.context.drawImage(game.personImg,0,710,170,230,-15,180,100,148);
				}
				else if(arr[0]==4){
					game.id_4.css("display","block");
					game.context.fillText(arr[1],820,350);
					game.context.drawImage(game.personImg,0,710,170,230,800,180,100,148);
				}
			};break;
			case 4:{
				if(arr[0]==1){
					game.id_1.css("display","block");
					game.context.fillText(arr[1],820,350);
					game.context.drawImage(game.personImg,0,710,170,230,800,180,100,148);
				}
				else if(arr[0]==2){
					game.id_2.css("display","block");
					game.context.fillText(arr[1],520,140);
					game.context.drawImage(game.personImg,5,520,150,200,400,70,100,130);
				}
				else if(arr[0]==3){
					game.id_3.css("display","block");
					game.context.fillText(arr[1],10,350);
					game.context.drawImage(game.personImg,0,710,170,230,-15,180,100,148);
				}
			};break;
			default:break;
		}
	},
	drawReady:function(_id){
		_id = parseInt(_id);
		switch(_id){
			case 1:{
				game.id_1.find(".ready-state").css("display","block");
			};break;
			case 2:{
				game.id_2.find(".ready-state").css("display","block");
			};break;
			case 3:{
				game.id_3.find(".ready-state").css("display","block");
			};break;
			case 4:{
				game.id_4.find(".ready-state").css("display","block");
			};break;
			default:break;
		}
	},
	start:function(arr){
		playBg("start");
		$("#readyBtn").css("display","none");
		$(".ready-state").css("display","none");
		pocker.init(arr);
		$(".porkerbg-item-1").css("display","block");
		$(".porkerbg-item-2").css("display","block");
		$(".oper-board").css("display","block");
		if( pocker.blackA ){
			$(".show-A").css("display","block");
		}
	},
	test:function(){
		var i = 0;
		var ani = setInterval(function(){
			game.context.drawImage(game.personImg,175+(i%4+3)*114.2,728,114.2,94,820,226,73,58);
			i++;
			if(i==8){
				game.context.drawImage(game.personImg,175+(0)*114.2,728,114.2,94,820,226,73,58);
				clearInterval(ani);
			}
		},150);		
	}
};

//播放特殊音效
function playBg(option){
	if(game.play_control==true){
		switch(option){
			case "start":game.bgplayer.src = "/sounds/normal/MusicEx_Normal.ogg";break;
			case "zhadan":game.bgplayer.src = "/sounds/normal/MusicEx_Exciting.ogg";break;
			default:break;
		}
		game.bgplayer.play();
	}
}
function playMusic(option){
	if(game.play_control==true){
		switch(option){
			case "ready":game.musicplayer.src = "/sounds/mouse/SpecOk.ogg";break;
			case "click":game.musicplayer.src = "/sounds/mouse/Special_menu.ogg";break;
			case "xuanpai":game.musicplayer.src = "/sounds/mouse/SpecSelectCard.ogg";break;
			case "fapai":game.musicplayer.src = "/sounds/normal/Special_Dispatch.ogg";break;
			case "liang":game.musicplayer.src = "/sounds/normal/Special_star.ogg";break;
			case "alert":game.musicplayer.src = "/sounds/normal/Special_alert.ogg";break;
			case "win":game.musicplayer.src = "/sounds/normal/MusicEx_Win.ogg";break;
			case "lose":game.musicplayer.src = "/sounds/normal/MusicEx_Lose.ogg";break;
			case "cuiren":game.musicplayer.src = "/sounds/normal/1005.ogg";break;
			case "tucao":game.musicplayer.src = "/sounds/normal/1004.ogg";break;
			case "maren":game.musicplayer.src = "/sounds/normal/1006.ogg";break;
			default:break;
		}
		game.musicplayer.play();
	}
}

function playPork(type,num){
	if(game.play_control==true){
		switch(type){
			case 1:game.musicplayer.src = "/sounds/pock/Man_"+num+".ogg";break;
			case 2:game.musicplayer.src = "/sounds/pock/Man_dui"+num+".ogg";break;
			case 3:game.musicplayer.src = "/sounds/pock/Man_tuple"+num+".ogg";break;
			case 4:game.musicplayer.src = "/sounds/pock/Man_zhadan.ogg";break;
			case 5:game.musicplayer.src = "/sounds/pock/Man_sandaiyi.ogg";break;
			case 6:game.musicplayer.src = "/sounds/pock/Man_sandaiyidui.ogg";break;
			case 7:game.musicplayer.src = "/sounds/pock/Man_shunzi.ogg";break;
			case 8:game.musicplayer.src = "/sounds/pock/Man_liandui.ogg";break;
			case 9:game.musicplayer.src = "/sounds/pock/Man_sidaier.ogg";break;
			case 10:game.musicplayer.src = "/sounds/pock/Man_feiji.ogg";break;
			case 11:game.musicplayer.src = "/sounds/pock/SpecSysReturnFail.ogg";break;
			case 12:{
				var i = Math.floor(1+Math.random()*(4-1));
				var song_name =  "/sounds/pock/Man_buyao"+i+".ogg";
				game.musicplayer.src = song_name;
			};break;
			default:break;
		}
		game.musicplayer.play();
		if( type == 4 ){
			playBg("zhadan");
		}
	}
}

function playControl(){
	if( game.play_control == true ){
		game.bgplayer.pause();
		game.musicplayer.pause();
		game.musicplayer.src = ""; //清理累计音效
		game.playerImg.src = "/images/iconfont-shengyin2.png";
		game.play_control = false;
	}
	else{
		game.bgplayer.play();
		game.musicplayer.play();
		game.playerImg.src = "/images/iconfont-shengyin1.png";
		game.play_control = true;
	}
}
//游戏准备开始
function gameReady(){
	game.state = "ready";
	$("#readyBtn").addClass("ready-waiting");
	$(".num-1 .ready-state").show();
	playMusic("ready");
	var _j = '{type:2,content:"'+game.id+'"}';
	sendMsg(_j);
}
//继续第二局游戏
function continueGame(){
	console.log("清理函数执行");
	//数据清理
	game.state = "unready";
	game.ablePock =  false;
	game.lastPock_1=[];
	game.lastPock_2=[];
	game.lastPock_3 =[];
	game.lastPock_4 = [];
	game.finished = [];
	pocker.blackA = false;
	pocker.blackNum = 0;
	pocker.showA = false;
	pocker.length=0;
	pocker.list=null;
	//界面清理
	$(".ready-btn").removeClass("ready-waiting").css("display","block");
	$(".out-board").text("").css("display","none");
	$(".porker-state").css("display","none");
	$(".ready-state").css("background","url(./images/readyState.png) center no-repeat").css("display","none");
	$(".porker-board").text("").css("display","block");
	$(".chupai-state").css("display","none");
	$(".num-2 #leftCount").text("13");
	$(".num-3 #leftCount").text("13");
	$(".num-4 #leftCount").text("13");
	$(".porkerbg-item-1").css("display","none");
	$(".porkerbg-item-2").css("display","none");
	$(".game-result").hide("fast");
}
/*
*初始化函数
*/
$(window).load(function(e) {
    game.init();
});