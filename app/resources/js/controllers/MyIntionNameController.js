'use strict';

/**
 * 名称
 * MyIntionNameController
 */

WxStoreApp.controller('MyIntionNameController', ["$rootScope","$scope","$http","$location",
	function($rootScope,$scope, $http,$location) {
	//显示名称
	$scope.showIntionName = function() {
		console.log('MyIntionNameController');
	     $http.get('member/userInfolist.json').success(function(memberCenterPageVo){
	     	console.log(memberCenterPageVo)
	    	 	var intionName = new Object();
	    	 	intionName.mrealName = memberCenterPageVo.mrealName;//取值
	    	 	intionName.extId = memberCenterPageVo.extId;
	    	 	intionName.sid = memberCenterPageVo.sid;
	         	$scope.intionName = intionName;
	         }).error(function(data, status, headers, config) {
	 	       	 //$rootScope.wxstore.showError(data);
	         });
	     };
	     $scope.showIntionName();	
	     
	   //保存姓名
	 	$scope.saveIntionName = function(){
	 		//$rootScope.wxstore.showLoading();	//防止前端重复提交 		
	 		console.log($scope.intionName);
	 		$http.post('member/saveInfo.json',$scope.intionName).success(function(data){
	 			//$rootScope.wxstore.hideLoading();
	 			$location.url("tab/MyIntion");
	 	    }).error(function(data, status, headers, config) {
	 	    	//$rootScope.wxstore.hideLoading();
	 	    	console.log(data);
	 	    	//$rootScope.wxstore.showError(data);
	 	    });
	 	}
 }]);
