'use strict';

/**
 * 地区
 * MyRegionController
 */

WxStoreApp.controller('MyRegionController', ["$rootScope","$scope","$http","$location",
	function($rootScope,$scope, $http,$location) {
	//显示地区
	$scope.showMyRegion = function() {
		console.log('MyRegionController');
	     $http.get('member/userInfolist.json').success(function(memberCenterPageVo){
	    	 	var region = new Object();
	    	 	region.mcomefrom = memberCenterPageVo.mcomefrom;
	    	 	region.extId = memberCenterPageVo.extId;
	    	 	region.sid = memberCenterPageVo.sid;
	         	$scope.region = region;
	         }).error(function(data, status, headers, config) {
	 	       	 //$rootScope.wxstore.showError(data);
	         });
	     };
	     $scope.showMyRegion();	
	     
	   //保存地区
	 	$scope.saveMyRegion = function(){
	 		$rootScope.wxstore.showLoading();	 		
	 		console.log($scope.region);
	 		$http.post('member/saveInfo.json',$scope.region).success(function(data){
	 			$rootScope.wxstore.hideLoading();
	 			$location.url("tab/MyIntion");
	 	    }).error(function(data, status, headers, config) {
	 	    	//$rootScope.wxstore.hideLoading();
	 	    	console.log(data);
	 	    	//$rootScope.wxstore.showError(data);
	 	    });
	 	}
 }]);
