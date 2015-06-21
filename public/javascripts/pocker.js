// JavaScript 扑克牌初始化
//每个人初始有13张牌
//2-15 A-14 
//默认红桃3先出
var pocker = {
	blackA:false,
	blackNum:0,
	showA:false,
	length:0,
	container:document.getElementById("pocker-board"),
	list:null,
	init:function(arr){
		pocker.list = arr;
		pocker.length = pocker.list.length;
		pocker.layout();
	},
	layout:function(){
		for(var i = 0 ;i<13;i++){
			//花色判别
			if(pocker.list[i][1]==1){
				var number_class = 'red-';
				var color_class = 'color-hongtao';
			}
			else if(pocker.list[i][1]==2){
				var number_class = 'black-';
				var color_class = 'color-heitao';
				if(pocker.list[i][0]==14){
					pocker.blackA = true;
					pocker.blackNum ++;
				}
			}
			else if(pocker.list[i][1]==3){
				var number_class = 'black-';
				var color_class = 'color-caohua';
				if(pocker.list[i][0]==14){
					pocker.blackA = true;
					pocker.blackNum ++;
				}
			}
			else{
				var number_class = 'red-';
				var color_class = 'color-fangkuai';
			}
			//点数判断
			switch(pocker.list[i][0]){
				case 11:number_class=number_class+"j";break;
				case 12:number_class=number_class+"q";break;
				case 13:number_class=number_class+"k";break;
				case 14:number_class=number_class+"a";break;
				case 15:number_class=number_class+"2";break;
				default:
					number_class=number_class+pocker.list[i][0]+"";break;
					break;
			}
			//节点输入
			$(pocker.container).css("display","none");
			$(pocker.container).append('<div class="porker-item" data-number="'+pocker.list[i][0]+'" data-color="'+pocker.list[i][1]+'" onClick="javascript:pockerMove(this);" >\
                        	<div class="porker-top">\
                            	<div class="point  '+number_class+'"></div>\
                                <div class="'+color_class+'"></div>\
                            </div>\
                            <div class="porker-center">\
                            	<div class="'+color_class+'"></div>\
                            </div>\
                            <div class="porker-bottom">\
                            	<div class="'+color_class+'"></div>\
                            	<div class="point  '+number_class+'"></div>\
                            </div>\
                        </div>');
		}
		//节点输入后  慢慢显现
		playMusic("fapai");
		$(pocker.container).slideDown(2000,function(){
			game.musicplayer.pause();
		});
	},
	//出牌函数
	send:function(){
		if( game.ablePock == false ){
			return false;
		}
		var flag = false;
		var _nodeArr = $(".pocker-choosed");
		var _poc = [];
		if(_nodeArr.length == 0 ){
			falg = false;
		}
		else{
			for(var i = 0;i<_nodeArr.length;i++){
				var _temp =[0,0];
				_temp[0] = $(".pocker-choosed").eq(i).data("number");
				_temp[1] = $(".pocker-choosed").eq(i).data("color");
				_poc.push(_temp);
			}
		}
		
		if( pocker.checkType(_poc) !=0 ){
			//根据ID 依次判断上家牌型
			switch(game.id){
				case 1:{
					//ID=1 上家依次为4,3，2
					if( game.lastPock_4.length == 0 ){
						if( game.lastPock_3.length == 0 ){
							if( game.lastPock_2.length == 0 ){
								//直接出牌
								flag = true;
							}
							else{
								//与poc_2进行比较
								if( pocker.compare(_poc,game.lastPock_2) ){
									flag = true;
								}
							}
						}
						else{
							//与poc_3进行比较
							if( pocker.compare(_poc,game.lastPock_3) ){
								flag = true;
							}
						}
					}
					else{
						//与poc_4进行比较
						if( pocker.compare(_poc,game.lastPock_4) ){
							flag = true;
						}
					}
				};break;
				case 2:{
					//ID=2 上家依次为1,4,3
					if( game.lastPock_1.length == 0 ){
						if( game.lastPock_4.length == 0 ){
							if( game.lastPock_3.length == 0 ){
								//直接出牌
								flag = true;
							}
							else{
								//与poc_3进行比较
								if( pocker.compare(_poc,game.lastPock_3) ){
									flag = true;
								}
							}
						}
						else{
							//与poc_4进行比较
							if( pocker.compare(_poc,game.lastPock_4) ){
								flag = true;
							}
						}
					}
					else{
						//与poc_1进行比较
						if( pocker.compare(_poc,game.lastPock_1) ){
							flag = true;
						}
					}
				};break;
				case 3:{
					//ID=3 上家依次为2,1,4
					if( game.lastPock_2.length == 0 ){
						if( game.lastPock_1.length == 0 ){
							if( game.lastPock_4.length == 0 ){
								//直接出牌
								flag = true;
							}
							else{
								//与poc_4进行比较
								if( pocker.compare(_poc,game.lastPock_4) ){
									flag = true;
								}
							}
						}
						else{
							//与poc_1进行比较
							if( pocker.compare(_poc,game.lastPock_1) ){
								flag = true;
							}
						}
					}
					else{
						//与poc_2进行比较
						if( pocker.compare(_poc,game.lastPock_2) ){
							flag = true;
						}
					}
				};break;
				case 4:{
					//ID为4 上家依次为3,2,1
					if( game.lastPock_3.length == 0 ){
						if( game.lastPock_2.length == 0 ){
							if( game.lastPock_1.length == 0 ){
								//直接出牌
								flag = true;
								console.log("上三家为空");
							}
							else{
								//与poc_1进行比较
								if( pocker.compare(_poc,game.lastPock_1) ){
									flag = true;
								}
							}
						}
						else{
							//与poc_2进行比较
							if( pocker.compare(_poc,game.lastPock_2) ){
								flag = true;
							}
						}
					}
					else{
						//与poc_3进行比较
						if( pocker.compare(_poc,game.lastPock_3) ){
							flag = true;
						}
					}
				};break;
				default:break;
			}
		}
		if( false == flag ){
			playPork(11);
			setPorkerState("fail");
			return false;
		}
		else{
			//可以出牌
			var str = "";
			for(var i = 0;i<_poc.length;i++){
				if( i!=_poc.length-1 ){
					str =str+"["+_poc[i][0]+","+_poc[i][1]+"],";
				}
				else{
					str =str+"["+_poc[i][0]+","+_poc[i][1]+"]";
				}
			}
			var _j = '{type:5,content:['+game.id+',['+str+']]}';
			sendMsg(_j);
			game.ablePock = false;
			//出完牌之后 自己的出牌面板取消显示、已出牌取消显示
			$(".pocker-choosed").remove();
			$(".action").css("display","none");
			$(".num-1 .chupai-state").css("display","none");
			$(".num-3 .chupai-state").css("display","block");
			
			var type = pocker.checkType(_poc);
			if( type == 1){
				playPork(1,_poc[0][0]);				
			}
			else if( type == 2){
				playPork(2,_poc[0][0]);	
			}
			else if( type == 3){
				playPork(3,_poc[0][0]);	
			}
			else if( type == 4){
				playPork(5,_poc[0][0]);
			}
			else if( type == 5){
				playPork(6,_poc[0][0]);
			}
			else if( type == 6 || type == 9 || type == 10 || type == 11 || type == 14 || type == 15 || type == 18 || type == 19 || type == 21 ){
				playPork(7,_poc[0][0]);
			}
			else if( type == 7 || type == 13 || type == 17 || type == 20 ){
				playPork(8,_poc[0][0]);
			}
			else if( type == 8 ){
				playPork(9,_poc[0][0]);
			}
			else if( type == 12 || type == 16 ){
				playPork(10,_poc[0][0]);
			}
			else{
				//炸弹
				playPork(4,_poc[0][0]);
			}
			setPorkerState();
			showMyPock(_poc);
		}
	},
	sendEmpty:function(){
		//发送空牌  不出
		var _j = '{type:5,content:['+game.id+',[]]}';
		sendMsg(_j);
		game.ablePock = false;
		//出完牌之后 自己的出牌面板取消显示、已出牌取消显示
		$(".pocker-choosed").css("display","none").removeClass("display","none");
		$(".action").css("display","none");
		$(".num-1 .chupai-state").css("display","none");
		$(".num-1 .porker-state").css("display","none");
		$(".num-1 .porker-item").removeClass("pocker-choosed").css("display","inline-block").css("top","0px");
		$(".num-3 .chupai-state").css("display","block");
		$(".num-1 .out-board").css("display","block").append('<div class="out-item buchu-item" ></div>');
		playPork(12,'');
	},
	//牌型号检测
	checkType:function(_arr){
		var type = 0;
		var length = _arr.length;
		//根据所选择牌的长度 大致分类
		switch(length){
			case 1:{
				playPork(1,_arr[0][0]);
				type = 1;
			};break;
			case 2:{
				if( _arr[0][0]==_arr[1][0] ){
					if(_arr[0][0]==14 && _arr[0][1]==2 && _arr[1][1]==3 ){
						//双A
						playPork(4,_arr[0][0]);
						type = 31;
					}
					else{
						playPork(2,_arr[0][0]);
						type = 2;
					}
				}
			};break;
			case 3:{
				if( _arr[0][0]==_arr[1][0] && _arr[0][0]==_arr[2][0] ){
				//3张 三个
					playPork(3,_arr[0][0]);
					type = 3;
				}
			};break;
			case 4:{
				if( _arr[0][0]==_arr[1][0] && _arr[0][0]==_arr[2][0] && _arr[0][0]==_arr[3][0]){
					//4张牌 炸弹
					playPork(4,_arr[0][0]);
					flag = true;
					type = 30;
				}
				else if( (_arr[0][0]==_arr[1][0] && _arr[0][0]==_arr[2][0] && _arr[0][0]!=_arr[3][0]) || (_arr[3][0]==_arr[1][0] && _arr[3][0]==_arr[2][0] && _arr[3][0]!=_arr[0][0]) ){
					//三带一
					playPork(5,_arr[0][0]);
					type = 4;
				}
			};break;
			case 5:{
				var sum = _arr[0][0]+_arr[1][0]+_arr[2][0]+_arr[3][0]+_arr[4][0];
				var listSum = (_arr[0][0]+_arr[4][0])*2.5;
				if( (_arr[0][0]==_arr[1][0] && _arr[0][0]==_arr[2][0] && _arr[3][0] == _arr[4][0] ) || (_arr[4][0]==_arr[2][0] && _arr[4][0]==_arr[3][0] && _arr[0][0] == _arr[1][0] ) ){
					//三带对
					playPork(6,_arr[0][0]);
					type = 5;
				}
				else if( (_arr[0][0]<15) && sum == listSum && (_arr[0][0]-_arr[1][0])==1 ){
					//五连顺 公差为1的等差数列
					playPork(7,_arr[0][0]);
					type = 6;
				}
			};break;
			case 6:{
				var sum = _arr[0][0]+_arr[1][0]+_arr[2][0]+_arr[3][0]+_arr[4][0]+_arr[5][0];
				var listSum = (_arr[0][0]+_arr[5][0])*3;
				if( _arr[0][0] <15 && _arr[0][0]==_arr[1][0] && _arr[2][0]==_arr[3][0] && _arr[4][0]==_arr[5][0] && (_arr[0][0]-_arr[2][0]) == 1 && (_arr[2][0]-_arr[4][0]) == 1 ){
					//三连龙 三个对，且每张差一  不能带2
					playPork(8,_arr[0][0]);
					type = 7;
				}
				else if( (_arr[0][0]==_arr[1][0] && _arr[0][0]==_arr[2][0] && _arr[0][0]==_arr[3][0]) || (_arr[2][0]==_arr[3][0] && _arr[2][0]==_arr[4][0] && _arr[2][0]==_arr[5][0]) || (_arr[1][0]==_arr[2][0] && _arr[1][0]==_arr[3][0] && _arr[1][0]==_arr[4][0] ) ){
					//四带2单
					playPork(9,_arr[0][0]);
					type = 8;
				}
				else if( sum==listSum && _arr[0][0]<15 && (_arr[0][0]-_arr[1][0])==1 ){
					//6连顺
					playPork(7,_arr[0][0]);
					type=9;
				}
			};break;
			case 7:{
				var sum = _arr[0][0]+_arr[1][0]+_arr[2][0]+_arr[3][0]+_arr[4][0]+_arr[5][0]+_arr[6][0];
				var listSum = (_arr[0][0]+_arr[6][0])*3.5;
				if(sum==listSum && _arr[0][0]<15 && (_arr[0][0]-_arr[1][0])==1 ){
					//7连顺
					playPork(7,_arr[0][0]);
					type = 10;
				}
			};break;
			case 8:{
				var sum = _arr[0][0]+_arr[1][0]+_arr[2][0]+_arr[3][0]+_arr[4][0]+_arr[5][0]+_arr[6][0]+_arr[7][0];
				var listSum = (_arr[0][0]+_arr[7][0])*4;
				if( sum==listSum && _arr[0][0]<15 && (_arr[0][0]-_arr[1][0])==1 ){
					//八连顺
					playPork(7,_arr[0][0]);
					type = 11;
				}
				else if( ( _arr[0][0]==_arr[1][0] && _arr[0][0]==_arr[2][0] ) && ( _arr[3][0]==_arr[4][0] && _arr[3][0]==_arr[5][0] ) && ( _arr[6][0] !=_arr[7][0] ) && (_arr[0][0] == _arr[3][0]+1) ){
					//飞机+2个单 XXXYYYMN
					playPork(10,_arr[0][0]);
					type = 12;
				}
				else if( ( _arr[1][0]==_arr[2][0] && _arr[1][0]==_arr[3][0] ) && ( _arr[4][0]==_arr[5][0] && _arr[4][0]==_arr[6][0] ) && ( _arr[0][0] !=_arr[7][0] ) && (_arr[1][0] == _arr[4][0]+1) ){
					//飞机+2个单 MXXXYYYN
					playPork(10,_arr[0][0]);
					type = 12;
				}
				else if( ( _arr[2][0]==_arr[3][0] && _arr[2][0]==_arr[4][0] ) && ( _arr[5][0]==_arr[6][0] && _arr[5][0]==_arr[7][0] ) && ( _arr[0][0] !=_arr[1][0] ) && (_arr[2][0] == _arr[5][0]+1) ){
					//飞机+2个单 MNXXXYYY
					playPork(10,_arr[0][0]);
					type = 12;
				}
				else if( (_arr[0][0]==_arr[1][0]) && (_arr[2][0]==_arr[3][0]) && (_arr[4][0]==_arr[5][0]) && (_arr[6][0]==_arr[7][0]) && (_arr[0][0]==_arr[2][0]+1) && (_arr[2][0]==_arr[4][0]+1) && (_arr[4][0]==_arr[6][0]+1)  ){
					//四连龙
					playPork(8,_arr[0][0]);
					type = 13;

				}
			};break;
			case 9:{
				var sum =0
				for(var i = 0;i<9;i++){
					sum = sum+ _arr[i][0];
				}
				var listSum = (_arr[0][0]+_arr[8][0])*4.5;
				if( sum==listSum && _arr[0][0]<15 && (_arr[0][0]-_arr[1][0]) == 1 ){
					//九连顺
					playPork(7,_arr[0][0]);
					type = 14;
				}
			};break;
			case 10:{
				var sum =0
				for(var i = 0;i<10;i++){
					sum = sum+ _arr[i][0];
				}
				var listSum = (_arr[0][0]+_arr[9][0])*5;
				if( sum==listSum && _arr[0][0]<15 && (_arr[0][0]-_arr[1][0]) == 1 ){
					//十连顺
					playPork(7,_arr[0][0]);
					type = 15; 
				}
				else if( (_arr[0][0]==_arr[1][0]) && (_arr[2][0]==_arr[3][0]) && (_arr[0][0]!=_arr[2][0]) && (_arr[4][0]==_arr[5][0]) && (_arr[4][0]==_arr[6][0]) && (_arr[7][0]==_arr[8][0]) && (_arr[7][0]==_arr[9][0]) && (_arr[4][0]==_arr[7][0]+1) ){
					//飞机带两个对 AABBXXXYYY
					playPork(10,_arr[0][0]);
					type = 16; 
				}
				else if((_arr[0][0]==_arr[1][0]) && (_arr[8][0]==_arr[9][0]) && (_arr[2][0]==_arr[3][0]) && (_arr[2][0]==_arr[4][0]) && (_arr[5][0]==_arr[6][0]) && (_arr[5][0]==_arr[7][0]) && (_arr[2][0]==_arr[5][0]+1) ){
					//飞机带两个对 AAXXXYYYBB
					playPork(10,_arr[0][0]);
					type = 16; 
				}
				else if( (_arr[6][0]==_arr[7][0]) && (_arr[8][0]==_arr[9][0]) && (_arr[6][0]!=_arr[8][0]) && (_arr[0][0]==_arr[1][0]) && (_arr[0][0]==_arr[2][0]) && (_arr[3][0]==_arr[4][0]) && (_arr[3][0]==_arr[5][0]) && (_arr[0][0]==_arr[3][0]+1) ){
					//飞机带两个对 XXXYYYAABB
					playPork(10,_arr[0][0]);
					type = 16; 
				}
				else if( sum == (_arr[0][0]+_arr[2][0]+_arr[4][0]+_arr[6][0]+_arr[8][0])*2 && (_arr[0][0]==_arr[2][0]+1) && (_arr[2][0]==_arr[4][0]+1) && (_arr[4][0]==_arr[6][0]+1) && (_arr[6][0]==_arr[8][0]+1) ){
					//五连龙
					playPork(8,_arr[0][0]);
					type = 17; 
				}
			};break;
			case 11:{
				var sum =0
				for(var i = 0;i<11;i++){
					sum = sum+ _arr[i][0];
				}
				var listSum = (_arr[0][0]+_arr[10][0])*5.5;
				if( sum==listSum && _arr[0][0]<15 && (_arr[0][0]-_arr[1][0]) == 1 ){
					//十一连顺
					playPork(7,_arr[0][0]);
					type = 18; 
				}
			};break;
			case 12:{
				var sum =0
				for(var i = 0;i<12;i++){
					sum = sum+ _arr[i][0];
				}
				var listSum = (_arr[0][0]+_arr[11][0])*6;
				if( sum==listSum && _arr[0][0]<15 && (_arr[0][0]-_arr[1][0]) == 1 ){
					//十二连顺
					playPork(7,_arr[0][0]);
					type = 19;
				}
				else if( sum == (_arr[0][0]+_arr[2][0]+_arr[4][0]+_arr[6][0]+_arr[8][0]+_arr[10][0])*2 && (_arr[0][0]==_arr[2][0]+1) && (_arr[2][0]==_arr[4][0]+1) && (_arr[4][0]==_arr[6][0]+1) && (_arr[6][0]==_arr[8][0]+1) && (_arr[8][0]==_arr[10][0]+1) ){
					//六连龙
					playPork(8,_arr[0][0]);
					type = 20;
				}
			};break;
			case 13:{
				var sum =0
				for(var i = 0;i<13;i++){
					sum = sum+ _arr[i][0];
				}
				var listSum = (_arr[0][0]+_arr[12][0])*6.5;
				if( sum==listSum && _arr[0][0]<15 && (_arr[0][0]-_arr[1][0]) == 1 ){
					//十三连顺
					playPork(7,_arr[0][0]);
					type = 21;
				}
			};break;
			default:break;
		}		
		return type;
	},
	//相同牌型比大小
	compare:function(_arr,_pre){
		var flag = false;
		var arrType = pocker.checkType(_arr);
		var preType = pocker.checkType(_pre);
		if( arrType == 31 ){
			//双A炸
			flag = true;
		}
		else if( arrType==30 ){
			//炸弹
			if( preType < 30 ){
				flag = true;
			}
			else if( preType == 31 ){
				flag = false;
			}
			else{
				if( _arr[0][0] > _pre[0][0] ){
					flag = true;
				}
			}
		}
		else{
			//普通牌型
			if(arrType!=preType){
				flag = false;//牌型不符合
			}
			else{
				switch(arrType){
					case 1:{
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 2:{
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 3:{
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 4:{
						//三带一  直接比较第二位 XXXY MNNN
						if(_arr[1][0]>_pre[1][0]){
							flag = true;
						}
					};break;
					case 5:{
						//三带对 XXYYY MMMNN
						if(_arr[2][0]>_pre[2][0]){
							flag = true;
						}
					};break;
					case 6:{
						//五连顺
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 7:{
						//三连龙
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 8:{
						//四带两单 XYZZZZ XZZZZY ZZZZXY 比较第三个即可
						if(_arr[2][0]>_pre[2][0]){
							flag = true;
						}
					};break;
					case 9:{
						//六连顺
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 10:{
						//七连顺
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 11:{
						//八连顺
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 12:{
						//飞机带两单 XYAAABBB XAAABBBY AAABBBXY 比较第三个
						if(_arr[2][0]>_pre[2][0]){
							flag = true;
						}
					};break;
					case 13:{
						//四连龙
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 14:{
						//九连顺
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 15:{
						//十连顺
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 16:{
						//飞机带两对 XXYYAAABBB XXAAABBBYY AAABBBXXYY
						var A_arr = 0,B_arr = 0;
						if( _arr[0]==_arr[1] && _arr[0]==_arr[2] ){
							A_arr = _arr[0][0];
						}
						else{
							A_arr = _arr[4][0];
						}
						if( _pre[0]==_pre[1] && _pre[0]==_pre[2] ){
							B_arr = _pre[0][0];
						}
						else{
							B_arr = _pre[4][0];
						}
						if(A_arr>B_arr){
							flag = true;
						}
					};break;
					case 17:{
						//五连龙
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 18:{
						//十一连顺
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 19:{
						//十二连顺
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 20:{
						//六连龙
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					case 21:{
						//十三连顺
						if(_arr[0][0]>_pre[0][0]){
							flag = true;
						}
					};break;
					default:break;
				}
			}
		}
		return flag;
	}
//对象末尾	
};

/*自己的牌堆  布局*/
function showMyPock(_poc){
	console.log(game.id+"进行自布局，牌堆为"+_poc);
	var length = _poc.length;
	$(".num-1 .out-board").text("").css("display","block");
	//牌堆布局
	for(var i = 0 ;i<length;i++){
		//花色判别
		if(_poc[i][1]==1){
			var number_class = 'red-';
			var color_class = 'color-hongtao';
		}
		else if(_poc[i][1]==2){
			var number_class = 'black-';
			var color_class = 'color-heitao';
		}
		else if(_poc[i][1]==3){
			var number_class = 'black-';
			var color_class = 'color-caohua';
		}
		else{
			var number_class = 'red-';
			var color_class = 'color-fangkuai';
		}
		//点数判断
		switch(_poc[i][0]){
			case 11:number_class=number_class+"j";break;
			case 12:number_class=number_class+"q";break;
			case 13:number_class=number_class+"k";break;
			case 14:number_class=number_class+"a";break;
			case 15:number_class=number_class+"2";break;
			default:
				number_class=number_class+_poc[i][0]+"";break;
				break;
		}
		//节点输入
		$(".num-1 .out-board").append('<div class="out-item" >\
			<div class="out-top '+number_class+'"></div>\
			<div class="out-bottom '+color_class+'"></div>\
		</div>');
	}
}
/*收到别人的出牌信息广播 进行布局 更新 剩余张数*/
function showOtherPock(id,_poc){
	//已结束的人的"不出"记录无需更新
	if( game.isFinished(id) ){
		return ;	
	}
	console.log(id+"进行第三方布局，牌堆为"+_poc);
	var control = null;
	var length = _poc.length;
	switch(id){
		case 1:{
			control = game.id_1;
		};break;
		case 2:{
			control = game.id_2;
		};break;
		case 3:{
			control = game.id_3;
		};break;
		case 4:{
			control = game.id_4;
		};break;
	}
	//清空上轮牌
	control.find(".out-board").text("");
	if(length==0){
		control.find(".out-board").append('<div class="out-item buchu-item" ></div>');
		playPork(12,'');
		return ;
	}
	for(var i = 0 ;i<length;i++){
		//花色判别
		if(_poc[i][1]==1){
			var number_class = 'red-';
			var color_class = 'color-hongtao';
		}
		else if(_poc[i][1]==2){
			var number_class = 'black-';
			var color_class = 'color-heitao';
		}
		else if(_poc[i][1]==3){
			var number_class = 'black-';
			var color_class = 'color-caohua';
		}
		else{
			var number_class = 'red-';
			var color_class = 'color-fangkuai';
		}
		//点数判断
		switch(_poc[i][0]){
			case 11:number_class=number_class+"j";break;
			case 12:number_class=number_class+"q";break;
			case 13:number_class=number_class+"k";break;
			case 14:number_class=number_class+"a";break;
			case 15:number_class=number_class+"2";break;
			default:
				number_class=number_class+_poc[i][0]+"";break;
				break;
		}
		//节点输入
		control.find(".out-board").append('<div class="out-item" >\
			<div class="out-top '+number_class+'"></div>\
			<div class="out-bottom '+color_class+'"></div>\
		</div>');
	}
	control.find(".out-board").css("display","block");
	//播放对方的出牌音乐
	var type = pocker.checkType(_poc);
	if( type == 1){
		playPork(1,_poc[0][0]);				
	}
	else if( type == 2){
		playPork(2,_poc[0][0]);	
	}
	else if( type == 3){
		playPork(3,_poc[0][0]);	
	}
	else if( type == 4){
		playPork(5,_poc[0][0]);
	}
	else if( type == 5){
		playPork(6,_poc[0][0]);
	}
	else if( type == 6 || type == 9 || type == 10 || type == 11 || type == 14 || type == 15 || type == 18 || type == 19 || type == 21 ){
		playPork(7,_poc[0][0]);
	}
	else if( type == 7 || type == 13 || type == 17 || type == 20 ){
		playPork(8,_poc[0][0]);
	}
	else if( type == 8 ){
		playPork(9,_poc[0][0]);
	}
	else if( type == 12 || type == 16 ){
		playPork(10,_poc[0][0]);
	}
	else{
		//炸弹
		playPork(4,_poc[0][0]);
	}
	//剩余少3张 应该预警音响起
	var left_num = parseInt(control.find("#leftCount").text())-length;
	control.find("#leftCount").text(left_num);
	if(left_num<3){
		playMusic("alert");	
	}
	//输出结束
}


/*点击出牌按钮*/
function sendPock(){
	pocker.send();
}
function sendEmptyPock(){
	pocker.sendEmpty();
}