window.onload=function(){
	(function(){
		var Nav2=document.getElementById('nav2_left11')
		var Navleft=document.getElementById('nav2_leftt')
		var aSpan=Navleft.getElementsByTagName('span')
		var aImg=Nav2.getElementsByTagName('img');
		var oneSize=aImg[0].offsetWidth;
		var onOff=true;
		var num=0
		var Num=0;
		var timer=null;
		
		//小框
		var nav_sp=document.getElementById('nav_span');
		var nav2_mid1=document.getElementById('nav2_mid1')
		var aImg2=nav2_mid1.getElementsByTagName('img')
		
		//左点击
		Nav2.style.width=oneSize*aImg.length+'px';       //设置足够width
		aSpan[0].onclick=leftMove;     					//左点击
		leftMove();
		function leftMove(){
			if(onOff){
				
				onOff=false;                             //开关
				Num++;
				if(Num==5){
					Num=0;
				}
				move(Nav2,1000,{'left':-oneSize},0,function(){    //左移动
					Nav2.appendChild(aImg[0]);                //第一个添加到最后
					Nav2.style.left=0;                        //保持第二个开始永远在left为0的位置
					onOff=true;
					})
				move(nav_sp,1000,{top:Num*55-5},0,function(){
				})
				timer=setTimeout(function(){leftMove()},2000);
			}
		}
		Navleft.onmouseover=function(){
			clearTimeout(timer);
			timer=null;
		}
		nav2_mid1.onmouseover=function(){	
			clearTimeout(timer);
			timer=null;
		}
		Navleft.onmouseout=function(){
			if(!timer){
				timer=setTimeout(function(){leftMove()},2000)
			}
		}
		nav2_mid1.onmouseout=function(){
			if(!timer){
				timer=setTimeout(function(){leftMove()},2000)
			}
		}
		//右点击
		aSpan[1].onclick=function(){           
			if(onOff){
				onOff=false;
					Nav2.insertBefore(aImg[aImg.length-1],aImg[0])  //最后一个添加到第一个
					Nav2.style.left=-oneSize+'px'                   //让目标瞬间在-oneseft的位置
					move(Nav2,1000,{'left':0},0,function(){onOff=true;})  //归0的位置
				
				//小框
				var nav_sp=document.getElementById('nav_span');
				var nav2_mid1=document.getElementById('nav2_mid1')
				var aImg2=nav2_mid1.getElementsByTagName('img')
				Num--;
				if(Num==-1){
					Num=4;
				}
				move(nav_sp,1000,{top:Num*55-5},0,function(){
				})
			}
			
		}
//		//点击小框
//		var Nav2=document.getElementById('nav2_left11')
//		var nav2_mid1=document.getElementById('nav2_mid1')
//		var aImg2=nav2_mid1.getElementsByTagName('img')
	})()
	
	//足球运动
	var moveImg=document.getElementById('moveImg')
	var disX=0;
	var disY=0;
	
	var prevX=0;
	var prevY=0;
	var iSpeedX=0;
	var iSpeedY=0;
	
	var timer3=null;
	moveImg.style.width=0;                             //设定球宽高的初始值为0（看不到的）
	moveImg.style.height=0;
	moveImg.style.left=0+'px';                        //设定球在可视区内的初始位置
	moveImg.style.topoTextoTextoText=0+'px';
	
	//球慢慢变大的运动   
	tochange(145);                                
	function tochange(mX){
		var offsetL=moveImg.offsetLeft;       //记录球初始值位置的坐标
		var offsetT=moveImg.offsetTop;
		 timer3=setInterval(function(){
			if(moveImg.offsetWidth==mX){    //当球宽高达到正常值时关掉定时器 停止继续变大
				clearInterval(timer3);
				startMove();                 //并同时做自由落体运动
			}else{
				moveImg.style.display='block';
				moveImg.style.width=moveImg.offsetWidth+5+'px';           //球慢慢变大
				moveImg.style.height=moveImg.offsetHeight+5+'px';
				moveImg.style.left=offsetL-moveImg.offsetWidth/2;         //使球在慢慢变大的同时球心保持在初始位置
				moveImg.style.top=offsetT-moveImg.offsetHeight/2;
			}
		
		},30)
	}
	
	//球抛出后的运动（记录下拖拽快慢时的速度值）
	var timer2=null;
	moveImg.onmousedown=function(ev){
		var ev=ev||event;
		disX=ev.clientX-moveImg.offsetLeft;  //拖拽的初始值
		disY=ev.clientY-moveImg.offsetTop;
		console.log(ev.clientX)
		prevX=ev.clientX;             //为了求速度差时拖拽的初始值
		prevY=ev.clientY;
		
		clearInterval(timer2)    //小球有两个动力（抛开后调用的定时器和拖拽触发事件）,所以清除一个防止运动过程中再次点击拖动时有抖动Bug
		document.onmousemove=function(ev){
			var ev=ev||event;
			moveImg.style.left=ev.clientX-disX+'px';	//拖拽后的位置
			moveImg.style.top=ev.clientY-disY+'px';
			
			iSpeedX=ev.clientX-prevX;                   //快慢拖拽后的速度差的变化 (拖拽快则快，反之则慢)
			iSpeedY=ev.clientY-prevY;
			prevX=ev.clientX;                           //保持减去的后一个移动点始终相对于它自己是倒数后一个
			prevY=ev.clientY;
		}
		document.onmouseup=function(){
			document.onmousemove=null;
			document.onmouseup=null;
			startMove();             //抛拽后的调用
		}
		return false;
	}
	
	//球的自由落体运动及阻力控制
	function startMove(){
		clearInterval(timer2);
			timer2=setInterval(function(){
			iSpeedY+=5;
//			iSpeedX+=3;
			
			var L=moveImg.offsetLeft+iSpeedX;
			var T=moveImg.offsetTop+iSpeedY;
			if(L<0){                                             //左右边界              
				L=0;
				iSpeedX*=-1;
				iSpeedX*=0.75;
			}else if(L>window.innerWidth-moveImg.offsetWidth){
				L=window.innerWidth-moveImg.offsetWidth;
				iSpeedX*=-1;
				iSpeedX*=0.75;
			}
			
			if(T<0){                                            //上下边界  
				T=0;
				iSpeedY*=-1;
				iSpeedY*=0.75;
			}else if(T>window.innerHeight-moveImg.offsetHeight){
				T=window.innerHeight-moveImg.offsetHeight;
				iSpeedY*=-1;
				iSpeedY*=0.85;
				iSpeedX*=0.85; //由于153行的加速度原因 导致在底边碰撞的概率>左右 ，所以抵消的快，那么加上此句话让它拥有同等的抵消概率
			}
			
			moveImg.style.left=L+'px';        //抛拽的位置运动
			moveImg.style.top=T+'px';
			
		},30)
	}
	//吸顶和 二次页面
	(function(){
		var oNav_head=document.getElementsByClassName('nav_head')[0] ;
			 window.onscroll =function(){   //拖动滚动条时的吸顶  滚轮事件
//				var oBody=document.getElementsByTagName('body')[0];
//				console.log(oBody.scrollTop)
				var topH=document.body.scrollTop||document.documentElement.scrollTop;
				console.log(topH)
				if(topH>=100){
					oNav_head.style.position='fixed';
					oNav_head.style.zIndex='10';
				}
				if(topH<100){
					oNav_head.style.zIndex='';
					oNav_head.style.position='';
				}
			}
		
		var aA=oNav_head.getElementsByTagName('a');               //二次页面时的吸顶
		var topH=document.body.scrollTop||document.documentElement.scrollTop;
		var aArticle=document.getElementsByClassName('article');
			for(var i=0;i<aA.length;i++){
				aA[i].index=i;
				aA[i].onclick=function(){
					if(this.index==0){
						document.body.scrollTop=0;
						document.documentElement.scrollTop=0;
						oNav_head.style.position='';
						oNav_head.style.zIndex='';
					}else{
						document.body.scrollTop=aArticle[this.index-1].offsetTop-50;
						document.documentElement.scrollTop=aArticle[this.index-1].offsetTop-50;

						if(topH>=100){
							oNav_head.style.position='fixed';
							oNav_head.style.zIndex='10';
						}
						if(topH<100){
							oNav_head.style.position='';
							oNav_head.style.zIndex='';
						}
					}
				}
			}
		})()
		
		//个人博客图片的斜切
//	(function(){
		var oImg1=document.getElementsByClassName('Img1')[0];
//	})()
	
	//console.log(moveImg.getBoundingClientRect().top)
	//四张图片的运动
	var oContent=document.getElementById('content')
	var aLi=oContent.getElementsByTagName('li')
	var oLiA=document.getElementById('LiA');
	var aSpan=aLi[0].getElementsByTagName('span')
	var SpeedX=0;
	var SpeedY=0;
	var onOff=true;
	for(var i=0;i<aLi.length;i++){          //四个大图片的调用
		fn1(aLi[i],i);
	}
	function fn1(LI,i){
		var aSpan=aLi[i].getElementsByTagName('span')
		LI.onmouseover=function(){             //移入

			aSpan[0].style.left='-120px';     //四个小图片
			aSpan[0].style.top='-90px';
			aSpan[1].style.left='240px';
			aSpan[1].style.top='-90px';
			aSpan[2].style.left='-120px';
			aSpan[2].style.top='180px';
			aSpan[3].style.left='240px';
			aSpan[3].style.top='180px';
			for(var i=0;i<aSpan.length;i++){
				aSpan[i].style.opacity='0'
			}
		}
		LI.onmouseout=function(){            //移出
			aSpan[0].style.left='0';
			aSpan[0].style.top='0';
			aSpan[1].style.left='120px';
			aSpan[1].style.top='0';
			aSpan[2].style.left='0';
			aSpan[2].style.top='90px';
			aSpan[3].style.left='120px';
			aSpan[3].style.top='90px';
			for(var i=0;i<aSpan.length;i++){
				aSpan[i].style.opacity='1'
			}
		}
	}
		

	
	
	//文章推荐的数据渲染
	var oDiv_left=document.getElementById('div_left');
	for(var i=0;i<3;i++){
		var oDiv=document.createElement('div')
		oDiv.className='clear';
		var json=date;
		if(json[i]){
			oDiv.innerHTML='<h3><a href="javascripc:;">'+json[i].nav+'</a></h3><p class="lefttimer"><span>发布时间：'+json[i].timer+'</span><span class="leftspan2">作者：'+json[i].author+'</span><span class="leftspan3"><em>分类：'+json[i].classification+'</em></span></p><p class="leftImg"><img src="'+json[i].Img+'"/ class="leftImg_a"></p><p class="leftfont">'+json[i].content+'</p><span class="leftread"><a href="javascripc:;">阅读全文>></a></span>';
			oDiv_left.appendChild(oDiv)
		}
	}
	var aLeftImg=document.getElementsByClassName('leftImg_a'); /* 放大缩小*/
	for(var i=0;i<aLeftImg.length;i++){
		aLeftImg[i].onmouseover=function(){
			this.style.transform='scale(1.4)';
		}
		aLeftImg[i].onmouseout=function(){
			this.style.transform='';
		}
	}
	
	//artTemplate模板引擎
//	var html=template("tpl",date);
//	alert(html)
//	oDiv.innerHTML=html;

	//我的名片————百叶窗效果1
	(function(){
			var oUL=document.getElementById('rightul');
			var aDiv=oUL.getElementsByTagName('div');
			var iNow=0;
			var onOff=true;
			var timer=setInterval(function(){
				var timer2=setInterval(function(){
						if(onOff){
							move(aDiv[iNow],200,{top:-27})
							iNow++;
						}else{
							move(aDiv[iNow],200,{top:0})
							iNow++;
						}
						if(iNow==aDiv.length){
							clearInterval(timer2);
							iNow=0;
							onOff=!onOff;
						}
				},400)
			},3000)
	})();
	
	(function(){
		var right_nav=document.getElementById('right_nav');
		var aLi=right_nav.getElementsByTagName('li');
		var aA=right_nav.getElementsByTagName('a');
			for(var i=0;i<aA.length;i++){   
				aLi[i].index=i;
				aLi[i].onmouseover=function(){ //移入
					aA[this.index].className='active';
				}
			}
			for(var i=0;i<aA.length;i++){
				aLi[i].index=i;
				aLi[i].onmouseout=function(){      //移出
					aA[this.index].className='active2';
				}
			}
			
	})();
	
	//百叶窗2
	(function(){
		fn1('right_MessageA');
		fn1('right_MessageB');
		fn1('right_MessageC');
		function fn1(mn){
			var i=0;
			var onOff=true;
			var timer1=setInterval(function(){
				var timer2=setInterval(function(){
					var oUlA=document.getElementById(mn);
					var aDivA=oUlA.getElementsByTagName('div');
					if(onOff){
						move(aDivA[i],200,{top:-32})
						i++;
					}else{
						move(aDivA[i],200,{top:0})
						i++;
					}
					if(i==aDivA.length){
						clearInterval(timer2);
						i=0;
						onOff=!onOff;
					}
				},200)
			},3000)
		}
		
		//移入时的选项卡
		var oright_subNav=document.getElementById('right_subNav')
		var aLi=oright_subNav.getElementsByTagName('li')
		var oright_Message=document.getElementById('right_Message')
		var aUL=oright_Message.getElementsByTagName('ul')
		var oright_span=document.getElementById('right_span');
			for(var i=0;i<aLi.length;i++){
				aLi[i].index=i;
				aLi[i].onmouseover=function(){
					for(var j=0;j<aLi.length;j++){
						aUL[j].style.display='none';
					}
					aUL[this.index].style.display='block';              //ul的交替显示
					oright_span.style.left=16+(this.index)*90+'px';    
				}
			}
		
	})();
	

	//JSONP的百度应用
	(function(){
		var oUl=document.getElementById('oulA');
		var soso=document.getElementById("sousuo22");
		Seach();
		var Num=0;
		window.fn1=function(date){  //从百度端口传进来的相应的Object(是一个json)
			console.log(date)
			var arr=date.s; //json里的s数组
			var Arr=date.q;
			if(arr.length){                       //所找内容存在（即端口相应的数据库数组里有值）时，则显示
				oUl.style.display='block';
				oUl.innerHTML='';
				for(var i=0;i<arr.length;i++){
					oUl.innerHTML+='<li><a target="_blank"  href="http://www.baidu.com/s?wd='+arr[i]+'">'+arr[i]+'</a></li>';             //赋值
				}  //新建窗口打开                                Li里的链接地址
				
			}else{
				oUl.style.display='none';
			}
			Seach();
//			var select=false;
//			var selected=0;
			document.onkeydown = function(ev){
				
				var aLi=oUl.getElementsByTagName('li');
				iCode = ev.keyCode;
				if(ev.keyCode==13&&oText.value){
					window.open(href="http://www.baidu.com/s?wd="+oText.value)
				}
				if(ev.keyCode==40){
					if(Num==aLi.length){
						Num=-1;
						oText.value=Arr;
						oText.focus();
						for(var j=0;j<aLi.length;j++){
							aLi[j].style.background='';
						}
					}else{
						ev.preventDefault();
						oText.blur();         //失焦
						for(var j=0;j<aLi.length;j++){
							aLi[j].style.background='';
							oText.value='';
						}
						oText.value=aLi[Num].innerText;
						aLi[Num].style.background='orange';
					}
					Num++;
					return false;        //阻止默认行为
				}
				
				if(ev.keyCode==38){
					Num--;
					console.log(Num)
					if(Num<=0){
						oText.value=Arr;
						Num=aLi.length+1;
						console.log(Num)
						oText.focus();
						for(var j=0;j<aLi.length;j++){
							aLi[j].style.background='';
						}
					}else{
						console.log(Num)
						ev.preventDefault();
						oText.blur();         //失焦
						for(var j=0;j<aLi.length;j++){
							aLi[j].style.background='';
							oText.value='';
						}
						oText.value=aLi[Num-1].innerText;
						aLi[Num-1].style.background='orange';
					}
					return false; 
				}
			}
			oText.onclick=function(ev){
			var ev=ev||event;
			document.onclick=null;
			ev.stopPropagation();       //阻止冒泡
			}
			document.onclick=function(){
				oText.blur();             //失焦
				oUl.style.display='none'; 
				oText.value='';
			}
			return false;
			date.stopPropagation(); 
		}
		
		var oText=document.getElementById('oText');
		oText.onkeyup=function(){
			if(this.value){
				oText.focus();
				var oScr=document.createElement('script');
				document.body.appendChild(oScr);
				oScr.src='http://suggestion.baidu.com/su?wd='+this.value+'&json=1&p=3&cb=fn1';  //百度接口 1.txt fn1(ddfdf)
				document.body.removeChild(oScr);  //清除所创建的script
			}else{
				oUl.style.display='none';                            //没输入值时不存在，否者按任意键抬起时都能触发创建
			}
		}
		oText.focus();//聚焦
		function Seach(){
			soso.onclick=function(){
				if(oText.value){
					window.open(href="http://www.baidu.com/s?wd="+oText.value)
				}else{
					alert('您输入的为空!!!')
				}
			}
		}
		
	})();
			
	//留言板
	
	(function(){
	var oText = document.getElementById('tijiaoText');
	var oBtn = document.getElementById('btn1');
	var oDiv = document.getElementById('div1');
	var oPage = document.getElementsByClassName('page')[0];
	var aSpan1= document.getElementById('span1');
	var aA = oPage.children;
	var newPage = 1;
	var newPage2 = 1;
	
	//点击按钮生成div;
	oBtn.onclick = function(){
		//weibo.php?act=add&content=xxx
		var oVal = oText.value;
		//在实际工作中，后端给了完整的接口，那么我们在拼的时候，把接口分离出来
		//url：就是？号前面的地址
		//value:就是？后面的内容。
		ajax({
			"url":'php/weibo.php',
			"value":'act=add&content='+oVal,
			"dataType":'json',
			"succ":function(json){
					console.log(json)
					if(!json.error){
						var newDiv = createDiv(oVal,json.time,json.id,0,0);             //提交创建一个DIV
						oDiv.insertBefore(newDiv,oDiv.children[0]);
						oText.value = '';
					}
					//如果比6个还多，就把第7个删掉。
					if(oDiv.children.length > 3){
						oDiv.removeChild(oDiv.children[3]);
					}
			}
		});	
	}
	//回车发送
	document.onkeydown = function(ev){
		var ev=ev||window.event;
		if(event.keyCode==13){                   //回车键
			//weibo.php?act=add&content=xxx
			var oVal = oText.value;
			//在实际工作中，后端给了完整的接口，那么我们在拼的时候，把接口分离出来
			//url：就是？号前面的地址
			//value:就是？后面的内容。
			ajax({
				"url":'php/weibo.php',
				"value":'act=add&content='+oVal,
				"dataType":'json',
				"succ":function(json){
						//console.log(json)
						if(!json.error){
							var newDiv = createDiv(oVal,json.time,json.id);
							oDiv.insertBefore(newDiv,oDiv.children[0]);
							oText.value = '';
						}
						//如果比6个还多，就把第7个删掉。
						if(oDiv.children.length > 3){
							oDiv.removeChild(oDiv.children[3]);
						}
				}
			});	
		}
	}
	//获取一页数据：weibo.php?act=get&page=1        
	var Hash=window.location.hash.split('=')[1];
	newPage=Hash?Hash:1;
	newPage2=Hash?Hash:1;
	window.location.hash='page='+newPage; 
	getPage();                                 //刷新后在第一页上
	function getPage(){
		ajax({
			"url":"php/weibo.php",
			"value":"act=get&page="+newPage,
			"dataType":"json",
			"succ":function(arr){
				for(var i=0;i<arr.length;i++){
					var newDiv2 = createDiv(arr[i].content,arr[i].time,arr[i].id,arr[i].acc,arr[i].ref); //刷新页面创建页面6个DIV
					oDiv.appendChild(newDiv2);
				}
			}
			
		});
	}
	
	function createDiv(value,time,id,acc,ref){
		var oDate = new Date(time*1000);
		var iYear = oDate.getFullYear();
		var iMouth = oDate.getMonth()+1;
		var iDay = oDate.getDate();//day周几，getDate：几号
		var iH = oDate.getHours();
		var iM = oDate.getMinutes();
		var iSe = oDate.getSeconds();
		var str = iYear+'-'+toDou(iMouth)+'-'+toDou(iDay)+' '+toDou(iH)+':'+toDou(iM)+':'+toDou(iSe);
		function toDou(n){
			return n<10?'0'+n:''+n;
		}
		
		var newDiv = document.createElement('div');
		newDiv.className = 'reply';
		newDiv.innerHTML = '<p class="replyContent">'+value+'</p>'+
                '<p class="operation">'+
                    '<span class="replyTime">'+str+'</span>'+
                    '<span class="handle">'+
                    	'<a href="javascript:;" class="top">'+acc+'</a>'+
                        '<a href="javascript:;" class="down_icon">'+ref+'</a>'+
                        '<a href="javascript:;" class="cut">删除</a>'+
                    '</span>'+
                '</p>';
      //weibo.php?act=acc&id=num			顶某一条数据
	var oTop=newDiv.getElementsByClassName('top')[0];
		oTop.onclick=function(){
			ajax({
				"url":"php/weibo.php",
				"value":"act=acc&id="+id,
				"dataType":"json",
				"succ":function(json){
					if(!json.error){
						acc++;
						oTop.innerHTML=acc;
					}
				}
			});
	}
		
	//踩 weibo.php?act=ref&id=num	
		var oDown=newDiv.getElementsByClassName('down_icon')[0];
		oDown.onclick=function(){
			ajax({
				"url":"php/weibo.php",
				"value":"act=ref&id="+id,
				"dataType":"json",
				"succ":function(json){
					if(!json.error){
						ref++;
						oDown.innerHTML=ref;
					}
				}
			});
			
		}
		
	//删除某一条	weibo.php?act=del&id=num
		var oCut=newDiv.getElementsByClassName('cut')[0];
		oCut.onclick=function(){
			ajax({
				"url":"php/weibo.php",
				"value":"act=del&id="+id,
				"dataType":"json",
				"succ":function(json){
					if(!json.error){
						oDiv.removeChild(newDiv);
						oDiv.innerHTML='';
						getPage();
						fnPage();
					}
				}
			});
		}
		
		
		
        return newDiv;
	}
	
	//页码：
	
	//weibo.php?act=get_page_count	获取页数
	
	/*
		5,6,7,8,9	   10    11,12,13,14
		9,10,11,12,13  14    15,16,17,18
		
		newPage = 5
		
		2 3 4    5   6,7,8
		
		var i = newPage-3;i<newPage+3;i++
	*/
//	var page1 = 5;
//	var page2 = 
//	var oPage = document.getElementsByClassName('page')[0];
//	var aA = oPage.children;
//	var newPage = 1;
//	var newPage2 = 1;
	
	fnPage();
	function fnPage(){
		ajax({
			"url":"php/weibo.php",
			"value":"act=get_page_count",
			"dataType":"json",
			"succ":function(json){
//				console.log(json);
				oPage.innerHTML = '';
				
				if(newPage < 4){                   //阻止页码出现0
					newPage = 4;
				}
				if(newPage > json.count-3){
					newPage = json.count-3;
				}
				
				for(var i=newPage-3;i<=newPage+3;i++){  //设置每一页只能有7个div页码;
					
					if(i<1 || i>json.count){
						continue;
					}
					var oA = document.createElement('a');
					oA.href = 'javascript:;';
					oA.innerHTML = i;
					
					//点击按钮，刷新接口。
					oA.onclick = function(){
						oDiv.innerHTML = '';
						this.className = 'active';
						
						newPage = parseInt(this.innerHTML);
						newPage2 = parseInt(this.innerHTML);
						
						window.location.hash='page='+newPage;    //点击谁保持在第几页
						newPage2=newPage;
						
						getPage();                      //点击某一个页码后重新调用获取相应的页面数据
						fnPage();                       //重新获取页码接口始终保持相应的页码数            
					}
					oPage.appendChild(oA);
				}
				
				for(var j=0;j<aA.length;j++){
					if(aA[j].innerHTML == newPage2){
						aA[j].className = 'active';
					}
				}
				
			}
		});
	}
	})()
			
	//日历
//	(function(){
		var othead=document.getElementsByTagName('thead')[0];
		var aTh=othead.getElementsByTagName('th');
		var arr=['一','二','三','四','五','六','日',]
		for(var i=0;i<aTh.length;i++){
			aTh[i].innerHTML=arr[i];
		}
		
//		var oDate=new Date();
//		var year=oDate.getFullYear();
//		var month=oDate.getMonth()+1;
//		var hour=oDate.getHours();
//		var minute=oDate.getMinutes();
//		var second=oDate.getSeconds();
//		var dayNum=0;
//		var otbody=document.getElementsByTagName('tbody')[0];
//		var aTd=otbody.getElementsByTagName('td');
//		//头部
//		var odiv_year=document.getElementById('div_year');
//			var timers=setInterval(function(){
//				odiv_year.innerHTML=year+'年'+month+'月'     +hour+':'+minute+':'+second;
//			},1000)
			
			starttimer();
			function starttimer(){
				var odiv_year=document.getElementById('div_year');
				var iMyTime= new Date();
				var iYear=iMyTime.getFullYear();
				var iMonth=iMyTime.getMonth()+1;
				var iDate=iMyTime.getDate();
				var iWeek=iMyTime.getDay();
				var iHours=iMyTime.getHours();
				var iMin=iMyTime.getMinutes();
				var iSec=iMyTime.getSeconds();
				var src=null  ;
				function toTWO(n) {
					return n<10?'0'+n:''+n;
				}
				src=iYear+'年'+iMonth+'月'+iDate+'日'+' '+toTWO(iHours)+':'+toTWO(iMin)+':'+toTWO(iSec) ;
				odiv_year.innerHTML=src;
			}
			setInterval(starttimer,1000);
		//内容
		var odiv_year=document.getElementById('div_year');
		var otbody=document.getElementsByTagName('tbody')[0];
		var aTd=otbody.getElementsByTagName('td');
		var iMyTime= new Date();
		var iYear=iMyTime.getFullYear();
		var iMonth=iMyTime.getMonth()+1;
		var iDate=iMyTime.getDate();
		var iWeek=iMyTime.getDay();
		var iHours=iMyTime.getHours();
		var iMin=iMyTime.getMinutes();
		var iSec=iMyTime.getSeconds();
		if(iMonth==1||iMonth==3||iMonth==5||iMonth==7||iMonth==8||iMonth==10||iMonth==12){  //月份的天数
			dayNum=31;
		}
		else  if(iMonth==4||iMonth==6||iMonth==9||iMonth==11){
			dayNum=30;
		}
		else if(iMonth==2&&renYear(iYear)){
			dayNum=29;
		}else{
			dayNum=28;
		}
		function renYear(iYear){
			if(iYear%4==0&&iYear%100!=0){                //计算润年的方法
				return true;
			}
			else{
				if(iYear%400==0){
					return true;
				}else{
					return false;
				}
			}
		}
		
		iMyTime.setFullYear(iYear);
		iMyTime.setMonth(iMonth-1);
		iMyTime.setDate(1);
		switch(iMyTime.getDay()){
			case 0:
			for(var i=0;i<dayNum;i++){
				aTd[i+6].innerHTML=i+1;
			}
			break;
			case 1:
			for(var i=0;i<dayNum;i++){
				aTd[i].innerHTML=i+1;
			}
			break;
			case 2:
			for(var i=0;i<dayNum;i++){
				aTd[i+1].innerHTML=i+1;
			}
//			console.log(oDate.getDay())
			break;
			case 3:
			for(var i=0;i<dayNum;i++){
				aTd[i+2].innerHTML=i+1;
			}
			//console.log(oDate.getDay())
			break;
			case 4:
			for(var i=0;i<dayNum;i++){
				aTd[i+3].innerHTML=i+1;
			}
//			console.log(oDate.getDay())
			break;
			case 5:
			for(var i=0;i<dayNum;i++){
				aTd[i+4].innerHTML=i+1;
			}
			break;
			case 6:
			for(var i=0;i<dayNum;i++){
				aTd[i+5].innerHTML=i+1;
			}
		}
		
		//颜色
		var iMyTime= new Date();
		for(var i=0;i<aTd.length;i++){
//			var aTd[i].index=i;
			if(aTd[i].innerHTML==iMyTime.getDate()){
				aTd[i].style.background='#a3cbff';
				aTd[i].style.cursor='pointer';
				aTd[i].onmouseover=function(){
					this.style.background='#0099FF';
				}
				aTd[i].onmouseout=function(){
					this.style.background='#a3cbff';
				}
			}

		}
		
//	})();
		//回到顶部
		(function(){
			function b(){
		        h = $(window).height();
		        t = $(document).scrollTop();
		        if(t > h){
		            $('#gotop').show();
		        }else{
		            $('#gotop').hide();
		        }
			    }
			    $(document).ready(function(e) {
			
			        b();
			
			        $('#gotop').click(function(){
			            $(document).scrollTop(0);
			        });
			
			        $('#code').hover(function(){
			            $(this).attr('id','code_hover');
			            $('#code_img').show();
			            $('#code_img').addClass('a-fadeinL');
			        },function(){
			            $(this).attr('id','code');
			            $('#code_img').hide();
			        })
			
			    });
			
			    $(window).scroll(function(e){
			        b();
			    });
			})()
			
}