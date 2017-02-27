'use strict';

/**
 * 抽奖活动页面
 * ActivityController
 */

WxStoreApp.controller('ActivityController', ["$rootScope","$scope","$http","$location",
	function($rootScope,$scope, $http,$location) {
	//大转盘
	$scope.showActivity = function() {
		console.log('ActivityController');
	     $http.get('activity/activityInfo.json').success(function(activity){
	         	$scope.activity = activity;
	         	console.log(activity);
	         	var active = new Object();
	         	active.activityId = activity.sid;
	         	active.title = activity.title;
	         	active.numPerDay = activity.numPerDay;
	         	$scope.active = active;
	         }).error(function(data, status, headers, config) {
	 	       	 $rootScope.wxstore.showError(data);
	         });
	     };
	$scope.showActivity();
	
	//抽奖
 	$scope.lottery = function(){
 		
 		var num = $scope.active.numPerDay
		if(num == 0){
			$rootScope.wxstore.showAlert('亲，您的机会已用完~');
			return false;
		}
 		$rootScope.wxstore.showLoading();	 		
 		console.log($scope.active);
 		$http.post('activity/lottery.json',$scope.active).success(function(json){
 			$rootScope.wxstore.hideLoading();
 			$("#inner").css("cursor", "default");
			var angle = parseInt(json.angle); //角度 
			var msg = json.msg; //提示信息
			$("#outer").rotate({ //inner内部指针转动，outer外部转盘转动
				duration : 5000, //转动时间 
				angle : 0, //开始角度 
				animateTo : 360 + angle, //转动角度 
				easing : $.easing.easeOutSine, //动画扩展 
				callback : function() {
					var number = parseInt(json.num);	//剩余次数
					$scope.active.numPerDay = number;
					$rootScope.wxstore.showAlert(msg);
					$("#num").html(number);
				}
			});
 	    }).error(function(data, status, headers, config) {
 	    	$rootScope.wxstore.hideLoading();
 	    	console.log(data);
 	    	$rootScope.wxstore.showError(data);
 	    });
 	}
	
	
 }]);
