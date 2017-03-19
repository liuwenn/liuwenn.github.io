	window.onload=function(){
		(function(){
			var oDiv1=document.getElementById('head_down')
			var oUl=document.getElementById('oul')
			var aLi=oUl.children;
			var oneX=aLi[0].offsetWidth;
			oUl.style.width=aLi.length*oneX+'px';
			var odownX=0;
			var downleft=0;
			var iNow=0;
			var downtimer=0
			var oBtn=true;
			var onOff=true;
			var timer=null;
			
			
			//自由轮播
//			var Num=0;
			var aQuan=document.getElementById('quan');
			var aSpan=aQuan.getElementsByTagName('span');
			aSpan[iNow].style.background="blue";
			
			timer=setInterval(function(){leftMove()},2000);
			
			function leftMove(){
				if(onOff){
					onOff=false;
					move(oUl,1000,{'left':-oneX},0,function(){    //左移动
						oUl.appendChild(aLi[0]);                //第一个添加到最后
						oUl.style.left=0;   //保持第二个开始永远在left为0的位置
						onOff=true;
					})
					iNow++;
					if(iNow==aSpan.length){
						iNow=0;
					}
					yanse()	
				}
			}
			
			//清除默认
//			document.addEventListener('touchmove',function(ev){
//				var ev=ev||window.event;
//				ev.preventDefault();
//			},false)

			//按下
			oUl.addEventListener('touchstart',function(ev){       //触点-开始
				clearInterval(timer)
				var ev=ev||window.event;
				var otouch=ev.changedTouches[0];
				downtimer=Date.now();
				odownX=otouch.pageX;                       //按下时在内容区域里的坐标点
				downleft=oUl.offsetLeft;
	//			disX=otouch.pageX-oUl.offsetLeft;			//按下时在oul里的坐标值
			},false)
			
			//触摸移动
			oUl.addEventListener('touchmove',function(ev){
				clearInterval(timer);
				ev.preventDefault();
				var ev=ev||window.event;
				var otouch=ev.changedTouches[0];
				if(oUl.offsetLeft>=0){   //oul>0时
					if(oBtn){										//防止滑动速度过快
						oBtn=false;
						odownX=otouch.pageX;             //防止刚开始时先往左后再次往右事出现速度差值现象而导致图片跳卡
					}
					oUl.style.left=(otouch.pageX-odownX )/3+'px'; 
				}else if(oUl.offsetLeft<=oDiv1.offsetWidth-oUl.offsetWidth){     //oul的末端的offsetleft小于0时
					oUl.style.left=(otouch.pageX-odownX )/3+(oDiv1.offsetWidth-oUl.offsetWidth)+'px'; 
				}else{
					oUl.style.left=otouch.pageX-odownX+downleft+'px';   //         正常拖拽区段
				}
			})
			
			//抬起
			oUl.addEventListener('touchend',function(ev){
				clearInterval(timer)
				var otouch=ev.changedTouches[0];
				if(otouch.pageX<odownX){
					if(iNow!=aLi.length-1){
						if(odownX-otouch.pageX>oDiv1.offsetWidth/2||Date.now()-downtimer<300&&odownX-otouch.pageX>30){   //前者为快滑,中间为慢滑，最后并为防止点击滑动(限制一个最小滑动距离的条件)
							iNow++;     	//前者保证划过屏幕的一半，或的后者为控制触摸滑动时的时间范围
						}
					}
					
				}else{
					if(iNow>0){
						if(otouch.pageX-odownX>oDiv1.offsetWidth/2||Date.now()-downtimer<300&&otouch.pageX-odownX>30){   //前者为快滑,中间为慢滑，最后并为防止点击滑动(限制一个最小滑动距离的条件)
							iNow--;
						}
					}
				}
				move(oUl,400,{left:-iNow*oneX},'easeOut');
				document.ontouchmove=document.ontouchend=null;
				timer=setInterval(function(){leftMove()},2000);
				
				yanse();

				
			})
			function yanse(){
				for(var i=0;i<aSpan.length;i++){
					aSpan[i].style.background='white';
					
				}
				aSpan[iNow].style.background='blue';
			}
		})()
		
	}
		
				
