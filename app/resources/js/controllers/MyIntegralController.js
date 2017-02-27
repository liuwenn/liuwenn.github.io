'use strict';

/**
 * 选择 MyIntegralController
 * @constructor
 */
WxStoreApp.controller('MyIntegralController', ["$scope","$location","$http","$ionicModal",
	function($scope, $location,$http,$ionicModal) {
		
		//优惠券列表
		$scope.showIntegralList = function(type) {
			var param ={};
			param.type = type;
			if(type==2){
				param.type = "";
			}
			$scope.param = param;
			console.log('MyIntegralController');
		     $http.post('integral/integralLogs.json',$scope.param).success(function(integralList){
			    	 //消费记录
		    	 	if(type==0){
			    		 $scope.reduceIntegralList = integralList;
			    	 }
		    	 	//获取记录
			    	 if(type==1){
			    		 $scope.increaseIntegralList = integralList;
			    	 }
			    	 //全部记录
			    	 if(type==2){
			    		 $scope.integralList = integralList;
			    	 }
		    	 	
		         }).error(function(data, status, headers, config) {
		 	       	 $rootScope.wxstore.showError(data);
		         });
		     };
		//默认获取全部
		$scope.showIntegralList(2);
		
		 //下拉刷新积分记录
	    $scope.doRefresh = function(type) {	 
	    	$scope.showIntegralList(type);
	        $scope.$broadcast('scroll.refreshComplete');
		};
		
}]);