'use strict';

/**
 * 个人中心
 * MyCenterController
 * @constructor
 */
WxStoreApp.controller('MyCenterController', ["$rootScope","$scope","$http","$ionicModal","$location","$timeout",
	function($rootScope,$scope, $http, $ionicModal,$location,$timeout) {
	console.log('MyCenterController');	
    $scope.showMemberInfo = function() {
        $http.get('member/userInfolist.json').success(function(memberCenterPageVo){
	    	$scope.memberCenterPageVo = memberCenterPageVo;
	      	console.log(memberCenterPageVo);
	      	var memberSid=memberCenterPageVo.sid;
	      	localStorage.setItem("memberSid",memberSid);
             
        }).error(function(data, status, headers, config) {
        	/* $rootScope.wxstore.showError(data);*/
        });
    };
    $scope.showMemberInfo();
    
    $scope.sign=function(flag){
    	if(flag){
    		$rootScope.wxstore.showAlert("今天已经签到！");
    	}else{
    		$http.get('member/sign.json').success(function(){
        		$rootScope.wxstore.showAlert("签到成功");
        		$scope.showMemberInfo();
           }).error(function(data, status, headers, config) {
        	   	$scope.showMemberInfo();
           	 $rootScope.wxstore.showError(data);
           });
    	}
    }
	//跳转到积分说明
	$scope.integral=function(){
		$location.url("tab/MyIntegral");
	};
	//跳转到金牌会员
	$scope.gold=function(){
		$location.url("tab/MyGold");
	}
	
	
	
	//日历
	     Date.prototype.Format = function (fmt11) { //author: meizz 
	    	    var o = {
	    	        "M+": this.getMonth() + 1, //月份 
	    	        "d+": this.getDate(), //日 
	    	        "h+": this.getHours(), //小时 
	    	        "m+": this.getMinutes(), //分 
	    	        "s+": this.getSeconds(), //秒 
	    	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	    	        "S": this.getMilliseconds() //毫秒 
	    	    };
	    	    if (/(y+)/.test(fmt)) fmt = fmt. replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    	    for (var k in o)
	    	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    	    return fmt;
	    	}
	     
	     var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
	     var monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	     
	     $scope.datepickerObject = {
	         titleLabel: '我的预约',  //Optional
	        todayLabel: '今天',  //Optional
	         closeLabel: '取消',  //Optional
	         setLabel: '确定预约',  //Optional
	         setButtonType: 'button-balanced',  //Optional
	         todayButtonType: 'button-balanced',  //Optional
	         closeButtonType: 'button-balanced',  //Optional
	         inputDate: new Date(),    //Optional
	         mondayFirst: false,    //Optional
	         //disabledDates: disabledDates, //Optional
	         weekDaysList: weekDaysList,   //Optional
	         monthList: monthList, //Optional
	         templateType: 'modal', //Optional
	         modalHeaderColor: 'bar-balanced', //Optional
	         modalFooterColor: 'bar-balanced', //Optional
	         //from: new Date(1920,1,1),   //Optional
//	         from: new Date(),
//	         to: new Date(), //Optional  
	         closeOnSelect:false,// 是否显示确认按钮
	         showTodayButton:true,//如果为true，则显示今天按钮，选择日期直接回调
	         callback: function (val) {    //Mandatory
	             datePickerCallback(val);
	             
	         }
	     };
	     //选择日期后保存生日
	     var datePickerCallback = function (val){
	         if (typeof(val) === 'undefined'){
	             console.log('No date selected');
	         } else {
//	         	e.preventDefault();
				console.log(val)
	         }
	     };
	
	$scope.mymy = function() {
		/*查询我的预约*/
		
		/*var memberSidB=localStorage.getItem("memberSid");会员sid*/
		var dateTimeB=localStorage.getItem("astr2year");   /*从预约时传过来的*/
		console.log(dateTimeB);
		var obj_my={};
		obj_my.condition=false;
		/*obj_my.dateTime=dateTimeB;*/
		$scope.obj_my=obj_my;
		console.log(obj_my);
	$http.post('coach/queryMyOrders.json',$scope.obj_my).success(function(myReservation){
		console.log(myReservation);
		var yidate2=[];
		$scope.myReservation=myReservation;
		for(var i=0;i<myReservation.length;i++){
			var aa=myReservation[i].dateTime;
			var bb=Number(aa.split(' ')[0].slice(-2));  
				yidate2.push(bb)        		/*我的已经预约的日期*/
		}
		
		console.log(yidate2);
		$scope.yidate2=yidate2;
		/* yidate2=JSON.stringify(yidate2)
		localStorage.setItem("yidate2",yidate2);  */
		
		
		//默认当月，取月
		var bmonth=myReservation[0].dateTime;
		var bmonth2=bmonth.split(' ')[0].substring(5,7)
		console.log(bmonth2)
		localStorage.setItem("bmonth2",bmonth2);//贮存传递
		
		
		
	}).error(function(data, status, headers, config) {
    	$rootScope.wxstore.hideLoading();
    	/*$rootScope.wxstore.showError(data);*/
    });
	
	

	
	}
        //初始化CreateAddress Model Window  
        //预约详情
        $ionicModal.fromTemplateUrl('resources/templates/appointMy.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal6 = modal;
        });
        $scope.closemodel6 = function() {
            $scope.modal6.hide();
        }
      
      	/*接收预约详情里的时间段*/
     	var arrSpan4=JSON.parse(localStorage.getItem("arrSpan4"));
     	console.log(arrSpan4)
     	//获取教练个人信息展示
		/*var getlocalStorage=JSON.parse(localStorage.getItem("pulllocalStorage"));
		
		var realName=getlocalStorage.realName;
		console.log(realName);*/
      
        //打开CreateAddress Model Window
        var arr_coach=[1,4,23];
        var astr2=[10];
      /*  console.log(yidate2);*/
        $scope.showmodel6 = function(dateObj,currentMonth) {
        	console.log(dateObj);
        	var aCol=$(".Date_timer .date_cell");  //当月所有表格集合
			var arrindex=[];
			var arraCol=[];
        	var currentMonth=parseInt(currentMonth);
        	console.log(currentMonth)
			$.each(arr_coach,function(index,elem){
				console.log(Number(elem))
				if(Number(dateObj.date)==Number(elem)&&astr2[0]==currentMonth){
					console.log(elem)
					$scope.modal6.show();
					var oInpt=$(".oinput input")
		        	var aInpt=$(".listappoint input")
		        	console.log(aInpt)
		        	console.log(oInpt.val())
		        	var i=0;
	        		$(oInpt).on("click",function(){
	        			i++;
			 			if(i%2==1){ //偶数时
				       	 	$.each(aInpt,function(index,elem){
		        				$(elem).prop("checked",true);   //设置属性
		        			});
			      	 	}else{
				      	 	console.log(i%2)
			       		 	$.each(aInpt,function(index,elem){
		        				$(elem).prop("checked",false);
		        			});
				       	}
	        		})
	        		
	        		
        		  	//确认订单
			        $ionicModal.fromTemplateUrl('resources/templates/appoint-sureOrder.html', {
			            scope: $scope,
			            animation: 'slide-in-up'
			        }).then(function(modal) {
			            $scope.modal5 = modal;
			        });   
			        $scope.openmodal5=function(){
			        	$scope.modal5.show();
			        	var arr_Inpt=[];
			        	var arr_Inpt2=[];
						var arr_coachh=JSON.parse(localStorage.getItem("arr_coachh"));
/*						for(var i=0;i<aInpt.length;i++){
							if(aInpt[i].checked){
								console.log(i)
								console.log(aInpt[i])
								arr_Inpt.push(i)
							}
						}
						console.log(arr_Inpt)
						for(var j=0;j<arr_coachh.length;j++){
							for(var i=0;i<arr_Inpt.length;i++){
								if(j==arr_Inpt[i]){
									arr_Inpt2.push(arr_coachh[j])
								}
							}
						}*/
						console.log(arr_coachh)
						var arr_coachh=[10,11,14,15,16]
						$scope.arr_coachh=arr_coachh;
						
			        }
			        $scope.closemodal5=function(){
			        	$scope.modal5.hide();
			        }  
	        		
	        		
	        		
	        		
	        		
	        		
				}
			})
		}
	
}]);