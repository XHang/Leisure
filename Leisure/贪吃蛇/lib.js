//为蛇体设置默认的样式,并指定位置
	function setNodeStyle(Node,xplace,yplace){
		$(Node).css("background","black");
		$(Node).css("width","15px");
		$(Node).css("height","15px");
		$(Node).css("position","absolute");
		$(Node).css("left",xplace+"px");
		$(Node).css("top",yplace+"px");
	}

	//向左一直跑
	function leftRun(){
		$(".snake").css("left",(snakeLeft--)+"px");
		snakeNodes[0].direction="left";
		timeoutFlag=setTimeout(leftRun, speed);
	}
	//向右一直跑
	function rightRun(){
		snakeNodes[0].direction="right";
		$(".snake").css("left",(snakeLeft++)+"px");
		timeoutFlag=setTimeout(rightRun, speed);
	}
	//向上一直跑
	function upRun(){
		snakeNodes[0].direction="up";
		$(".snake").first().css("top",(snakeTop--)+"px");
		for(var i=1;i<snakeNodes.length;i++){
			$(snakeNodes[i].htmlElement).css("top",--(snakeNodes[i].htmlElement[0].offsetTop)+"px");
		}
		timeoutFlag=setTimeout(upRun, speed);
	}
	//向下一直跑
	function downRun(){
		snakeNodes[0].direction="down";
		$(".snake").css("top",(snakeTop++)+"px");
		timeoutFlag=setTimeout(downRun, speed);
	}


	//生成指定数食物，位置随机放置
	function placeFood(num){
		var xplace;
		var yplace;
		var effect;
	   for(var i=0;i<num;i++){
	   		xplace=Math.random()*790;
	   		yplace=Math.random()*560+8;
	   		var classflag=Math.random()*10;
	   		$(".snake").after("<div class='food"+i+"'></div>");
	   		$(".food"+i).css("background","red");
			$(".food"+i).css("width","5px");
			$(".food"+i).css("height","5px");
			$(".food"+i).css("position","absolute");
			$(".food"+i).css("left",xplace+"px");
			$(".food"+i).css("top",yplace+"px");
			var food=new Food();
			food.xPlace=xplace;
			food.yPlace=yplace;
			food.effect= randomEffect();
			food.class=".food"+i;
			foods[i]=food;
	   }
	}

	//随机生成效果
	/* 
	70%是好效果
		60%加10分和一节
		40%减速度
	30%是坏效果
		60%减20分
		30%加速度
		10%直接狗带
	*/
	function randomEffect(){
		//有70%是好效果
		if(Math.random()*10>3){
			if(Math.random()*10>6){
				return "slowing";
			}else{
				return "normal";
			}
		}else{
			if (Math.random()*10>6) {
				return "Minus20";
			}else if (Math.random()*10>3) {
				return "addSpeed";
			}else{
				return "godiel";
			}

		}
	}
	//死亡处理
	function die(){
		alert("你狗带了！");
		if(confirm("是否重新开始游戏？")){
			clearTimeout(timeoutFlag);
			for(var j = 0; j <foods.length; j++){
					$(foods[j].class).remove();
				}
			changeScore(-score);
			$(".msg").remove();
			snakeInit();
		}else{
			window.close(); 
		}
		return;
	}

	//初始化贪吃蛇，并开启死亡监听器和随机放置食物
	function snakeInit(){
		$(".score").after("<font class='msg'>欢迎来到游戏，请按方向键开启你的蛇生</font>");
		snakeLeft=384;			//初始化蛇头的x位置
		snakeTop=300;			//初始化蛇头的y位置
		keyCode=null;			//初始化键值
		speed=10;				//初始化速度
		setNodeStyle($(".snake"),snakeLeft,snakeTop);
		var snakeHead=new snakeNode();
		snakeHead.htmlElement=$(".snake");
		snakeNodes[0]=snakeHead;	//将蛇头节点添加到蛇节点集合中
		godie();					//启动死亡监听
		placeFood(2);				//随机放置食物
		listenEat(); 				//启动吃食监听
	}
	//创建食物对象
	function Food(){
		var food={};
		food.xPlace;  
		food.yPlace;
		food.effect;  //记录食物的效果，是增一节，还是减一节，还是加速度，减速度，亦或是直接狗带
		food.class;   //记录食物的class属性
	}
	//创建蛇身节点对象
	function snakeNode(){
		var snakeNode={};
		snakeNode.htmlElement;
		snakeNode.direction;
	}

	//为贪吃蛇添加效果
	function addEffect(food){
		 switch (food.effect){
		 	case "normal": addNode(); addInfo("很正常的猎物，给你10分，加一节"); changeScore(10); break;
		 }
	}
	//添加一节蛇体
	function addNode(){
		var tailNode=snakeNodes[snakeNodes.length-1]; //获取到最后的一节蛇体		
		switch(tailNode.direction){
			case "up" :
				$(tailNode.htmlElement).after("<div class='snake'></div>");
				setNodeStyle($(".snake").last(),tailNode.htmlElement[0].offsetLeft,tailNode.htmlElement[0].offsetTop+15);
				var Node=new snakeNode();
				Node.htmlElement=$(".snake").last();
				Node.direction="up";
				snakeNodes[snakeNodes.length]=Node;	//将蛇头节点添加到蛇节点集合中

		}
	}
	//添加系统信息
	function addInfo(msg){
		$(".msg").last().after("<font class='msg'>"+msg+"</font>")
	}
	function changeScore(variable){
		score=score+variable;
		$(".score").text("目前得分为"+score+"分");
	}