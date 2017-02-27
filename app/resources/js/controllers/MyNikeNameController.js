'use strict';

/**
 * 昵称
 * MyNikeNameController
 */

WxStoreApp.controller('MyNikeNameController', ["$rootScope","$scope","$http","$location",
	function($rootScope,$scope, $http,$location) {
	//显示昵称
	$scope.showNikeName = function() {
		console.log('MyNikeNameController');
	     $http.get('member/userInfolist.json').success(function(memberCenterPageVo){
	    	 	var nikeName = new Object();
	    	 	nikeName.mnickName = memberCenterPageVo.mnickName;
	    	 	nikeName.extId = memberCenterPageVo.extId;
	    	 	nikeName.sid = memberCenterPageVo.sid;
	         	$scope.nikeName = nikeName;
	         }).error(function(data, status, headers, config) {
	 	       	 //$rootScope.wxstore.showError(data);
	         });
	     };
	     $scope.showNikeName();	
	     
	   //保存昵称
	 	$scope.saveNikeName = function(){
	 		$rootScope.wxstore.showLoading();	 		
	 		console.log($scope.nikeName);
	 		$http.post('member/saveInfo.json',$scope.nikeName).success(function(data){
	 			$rootScope.wxstore.hideLoading();
	 			$location.url("tab/MyIntion");
	 	    }).error(function(data, status, headers, config) {
	 	    	//$rootScope.wxstore.hideLoading();
	 	    	console.log(data);
	 	    	//$rootScope.wxstore.showError(data);
	 	    });
	 	}
 }]);
