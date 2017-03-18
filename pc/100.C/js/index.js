$(document).ready(function(){
	//iframe.fadeIn();
	var ova=$(".otext").val();
	//tab 选项卡	
	$(".subNav li").eq(0).css({background:"#e21c01",border:"",color:"#fff",height:"27px","line-height":"27px","margin-top":"-2px"});
	$(".subNav li").on('click',function(ev){
		var ev=ev||window.event;
		ev.stopPropagation();
		$(this).css({background:"#e21c01",border:"",color:"#fff",height:"27px","line-height":"27px","margin-top":"-2px"});
		$(this).siblings().css({background:"",color:"#000",height:"25px","line-height":"25px","margin-top":"0px"});  //选择器遍历筛选
		$(".otext").val(date.oval[$(this).index()])
		//失焦
		ova=$(".otext").val();
		blu();
	})
	
	//点击获取焦点
	$(".otext").on('click',function(ev){
		var ev=ev||window.event;
		$(this).focus();
		$(this).val('');
		ev.stopPropagation();
		
	})
	blu();
	//失焦
	function blu(){
		$(document).on('click',function(){
			$(".otext").blur();
			$(".otext").val(ova)
		})
	}
	
	//文字滚动
	var Str='';
	for(var i=0;i<date.arrData.length;i++){
		Str+=`
		<li>
			<a target="_blank" href="${date.arrData[i].url}">
			<strong>${date.arrData[i].name} </strong>
			<em>${date.arrData[i].time}分钟前 </em>
			<span>${date.arrData[i].title}</span>
			</a>
		</li>
		`;
	}
	$(".oUl").html(Str);
	
	//自由滚动
	var T=0;
	var timer=null;
	var iH=$(".oUl li").height();
	function anima(){
		timer=setInterval(function(){
			T++;
			if(T==$(".oUl li").length){
				T=0;
			}
			$(".oUl").animate({'top':'-'+iH*T+'px'},500);
		},2000)
	}
	anima();
	
	//移入时停止
	var NowT=0;
	$(".nav_scroll").on("mouseover",function(){
		clearInterval(timer);
		NowT=T;
	})
	
	//移开时继续
	$(".nav_scroll").on("mouseleave",function(){
		T=NowT;
		anima();
	})	
	
	//点击滚动-下
	$(".tip_down").on("click",function(){
		NowT++;
		if(NowT==$(".oUl li").length){
			NowT=0;
		}
		$(".oUl").animate({'top':'-'+iH*NowT+'px'},500);
	})
	//点击滚动-上
	$(".tip_up").on("click",function(){
		NowT--;
		if(NowT==-1){
			NowT=$(".oUl li").length-1;
		}
		$(".oUl").animate({'top':'-'+iH*NowT+'px'},500);
	})
	
	//tab选项卡2
	$(".tab_title  li").eq(0).addClass('on');
	$(".tab_title  li a").eq(0).addClass('on2');
	$(".tab_title  li").on('click',function(ev){
		var ev=ev||window.event;
		var index=$(this).index();
		ev.stopPropagation();
		
		$(".tab_title a").removeClass('on2');
		$(".tab_title a").eq(index).addClass('on2');
		
		
		$(this).addClass('on').siblings().removeClass('on');
		//$(".tab_title a").eq(index).addClass('on2').siblings().removeClass('on2');
		$(".tab_titlecon>ul").eq(index).show().siblings().hide();
		
	})


	//自动轮播
	var Timer=null;
	var Apic=date.oPic[0].pico;
	var Atip=date.oPic[1].picTip;
	var oDiv=$(".main_picright div");
	var iI=0;
	$(".main_picright div").eq(iI).addClass('onborder');
	$(".main_pic p").html(Atip[0]);
	function go(){
		Timer=setInterval(function(){
			iI++;
			if(iI==3){
				iI=0;
			}
			$(".main_picleft img").attr({"src":Apic[iI],"class":"a-fadein"});
			$(".main_picright div").eq(iI).addClass('onborder').siblings().removeClass('onborder');
			$(".main_pic p").html(Atip[iI]);
		},2000)
	}
	go();
	//移入时停止
	$(".main_picleft").on("mouseover",function(){
		clearInterval(Timer);
	})
	$(".main_picright img").on("mouseover",function(){
		clearInterval(Timer);
	})
	//移开时继续
	$(".main_picleft").on("mouseleave",function(){
		go();
	})
	$(".main_picright img").on("mouseleave",function(){
		go();
	})

	//tab选项卡3
	$(".main_traleft >ul li").eq(0).addClass('on3');
	$(".main_traleft >ul li a").eq(0).addClass('on4');
	$(".main_traleft >ul li").on('click',function(ev){
		var ev=ev||window.event;
		var index2=$(this).index();
		ev.stopPropagation();
		
		$(".main_traleft >ul li a").removeClass('on4');
		$(".main_traleft >ul li a").eq(index2).addClass('on4');
		
		
		$(this).addClass('on3').siblings().removeClass('on3');
		$(".main_tralcont >div").eq(index2).show().siblings().hide();
		
	})

	//论坛
	var index3=$(this).index(); 
	$(".main_traright dd").eq(0).addClass('active_2');
	$(".main_traright dd").on('mouseover',function(){
		$(this).addClass('active_2').siblings().removeClass('active_2');
	})


	//bottom
	
	$(".main_bottomone li").eq(0).addClass('active_4');
	$(".main_bottomul ul").eq(0).show();
	$(".main_bottomone li").on('click',function(){
		var index4=$(this).index(); 
		$(this).addClass('active_4').siblings().removeClass('active_4');
		$(".main_bottomul >ul").eq(index4).show().siblings().hide();
		
	})

	//tab图片
	$(".main_botrigul li").on('mouseover',function(){
		var index5=$(this).index(); 
		$(this).addClass('active_5').siblings().removeClass('active_5');
	})
	
	//抢卷儿tab
	$(".con_cardone li span").eq(0).addClass('active_6');
	$(".con_cardone li ").eq(0).addClass('active_6')
	$(".con_cardone li").on('click',function(){
		var index6=$(this).index();
		$(this).addClass('active_6').siblings().removeClass('active_6');
		$(".con_cardoul ul").eq(index6).show().siblings().hide();
	})



})
