'use strict';

/**
 * 约教练
 * AppointcoachController
 */

WxStoreApp.controller('AppointcoachController', ["$rootScope","$scope","$http","$location","$ionicModal","$ionicNavBarDelegate",
	function($rootScope,$scope, $http,$location,$ionicModal,$ionicNavBarDelegate) {

		//6.2根据产品编码获取教练
		var str=location.href; //取得整个地址栏
		var index=str.indexOf("?");
		var param=str.slice(index+1).split("=")[1];
//		$http.post('coach/findCocahListByGoodsCode.json',param).success(function(CocahList){
//			$scope.CocahList = CocahList;
//	    }).error(function(data, status, headers, config) {
//	    	$rootScope.wxstore.hideLoading();
//	    	console.log(data);
//	    	$rootScope.wxstore.showError(data);
//	    });
		$scope.CocahList=[
		      {
		        "username": "上地分店教练",
		        "merchantSid": 11,
		        "sid": 6,
		        "mobile": "13011111003",
		        "email": "zxlleizi1003@163.com",
		        "price": null,
		        "realName": "张进"
		      }
		    ];

	    
	   //6.4分店展示
// 		$http.get('member/queryBranchAddress.json').success(function(BranchAddress){
//			$scope.BranchAddress = BranchAddress;
//				console.log($scope.CocahListByGoods)
//				var queryBranch = new Object();
//				queryBranch.code=BranchAddress.code;
//				$scope.queryBranch=queryBranch;
//	    }).error(function(data, status, headers, config) {
//	    	$rootScope.wxstore.hideLoading();
//	    	console.log(data);
//	    	$rootScope.wxstore.showError(data);
//	    });

		$scope.BranchAddress=[
	      {
	        "sid": 1, //member主键
	        "username": "上地", // 商户地址名称
	        "code": "100", // 商户机构编码
	        "merchantSid": 1 // 商户自有主键
	      },
	       {
	        "sid": 1, //member主键
	        "username": "海淀分区", // 商户地址名称
	        "code": "110", // 商户机构编码
	        "merchantSid": 1 // 商户自有主键
	      }
	    ];

		$scope.selectedBranch=function(num){
			if(num==$scope.selected){
				$scope.selected=-1;
			}else{
				$scope.selected=num;
			}
			
		}

	   //6.5根据分店编码和时间查询教练
//	   	$http.post('member/queryCoachByCodeOrTime.json',aa).success(function(CocahList){
//			$scope.CocahList = CocahList;
//		}).error(function(data, status, headers, config) {
//		 	$rootScope.wxstore.hideLoading();
//		  	console.log(data);
//	  		$rootScope.wxstore.showError(data);
//	 	});
		$scope.changeTime=function(datetime){
			$scope.datetime=datetime;
			console.log(datetime)
        	var param2 = parseInt(datetime.split(" ")[1]);
        	$scope.param2=param2;
		}
		//console.log($scope.datetime)
		$scope.select=function(){
			$scope.closeModal();

			var ByCode = new Object();
   				ByCode.dateTime=$scope.datetime;
   				ByCode.start=$scope.param2;
   				ByCode.code=$scope.BranchAddress[$scope.selected];
   				$scope.ByCode=ByCode;
   				console.log(ByCode)
			$scope.CocahList=[
		      {
		        "username": "上地分店教练",
		        "merchantSid": 11,
		        "sid": 6,
		        "mobile": "13011111003",
		        "email": "zxlleizi1003@163.com",
		        "price": null,
		        "realName": "张进"
      			},{
		        "username": "上地分店教练",
		        "merchantSid": 11,
		        "sid": 6,
		        "mobile": "13011111003",
		        "email": "zxlleizi1003@163.com",
		        "price": null,
		        "realName": "张进123"
		      }
		    ];
		}
		
	   //传递教练个人信息展示
   	    $scope.tiaomenber=function(coupon){
   	    	console.log(coupon)
			$location.url("tab/AppointmentMember");
			var pulllocalStorage={
				mobile:coupon.mobile,
				realName:coupon.realName,
				username:coupon.username,
				merchantSid:coupon.merchantSid
			}
			console.log(pulllocalStorage)
			var pulllocalStorage=JSON.stringify(pulllocalStorage); 
			localStorage.setItem("pulllocalStorage",pulllocalStorage);
		} 
	   
    	

 
	    
//查询分店营业时间
	    
//	    $http.post('member/queryCoachByCodeOrTime.json',aa).success(function(CocahList){
//			$scope.CocahList = CocahList;
//	    }).error(function(data, status, headers, config) {
//	    	$rootScope.wxstore.hideLoading();
//	    	console.log(data);
//	    	$rootScope.wxstore.showError(data);
//	    });
	    
	    
	    
//	    
//		//根据教练SID(和时间)查询可预约信息
//		$scope.select=function(){
//			$scope.closeModal();
//			$http.post('coach/findCoachScheduleList.json',$scope.CocahListByGoods).success(function(ScheduleList){
//				$scope.ScheduleList = ScheduleList;
//				console.log(ScheduleList)
//		    }).error(function(data, status, headers, config) {
//		    	$rootScope.wxstore.hideLoading();
//		    	console.log(data);
//		    	$rootScope.wxstore.showError(data);
//		    });
//		}
		
		
		
/*		var oIput_A=document.getElementById('input_A');
		var aButton=document.getElementsByClassName('button');
		console.log(oIput_A)
		console.log(aButton)
		document.onclick=function(){
			oIput_A.blur();             //失焦
			oIput_A.value='';
		}
		if(oIput_A.value){
			aButton[1].style.display="block";
		}else{
			aButton[0].style.display="block";
		}*/
		
		$ionicNavBarDelegate.showBackButton(true);
		
		
		$ionicModal.fromTemplateUrl('resources/templates/appoint-shaixuan.html', {
	        scope: $scope,
	       animation: 'slide-in-up'
	    }).then(function(modal) {
	        $scope.modal = modal;
	    });
	    $ionicModal.fromTemplateUrl('resources/templates/appoint-zhezhao.html', {
	        scope: $scope,
	       animation: 'slide-in-up'
	    }).then(function(modal) {
	        $scope.modal2 = modal;
	    });
	
		//打开CreateAddress Model Window
		$scope.onCreate = function(){
			$scope.addr={};//新增页面，设置addr为空对象
		    
		    $scope.modal2.show();
		    $scope.modal.show();
		    var osection_xuan=document.getElementsByClassName('section_xuan')[0]
		    var oZhezhao=document.getElementsByClassName('ion_zhezhao')[0];
		    oZhezhao.style.background="rgba(0,0,0,0.3)";
		    //点击遮罩时
		}
		
		//关闭CreateAddress Model Window
		$scope.closeModal = function(){
		    $scope.modal.hide();
		    $scope.modal2.hide();
		}
		
		
	     
		
		
 }]);
