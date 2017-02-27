'use strict';

/**
 * 名称
 * MyIntionNameController
 */

WxStoreApp.controller('MyIntionGenderController', ["$rootScope","$scope","$http","$location",
	function($rootScope,$scope, $http,$location) {
	//显示性别
	$scope.showGender = function() {
		console.log('MyIntionGenderController');
	     $http.get('member/userInfolist.json').success(function(memberCenterPageVo){
	    	 	var gender = new Object();
	    	 	gender.msex = memberCenterPageVo.msex;
	    	 	gender.extId = memberCenterPageVo.extId;
	    	 	gender.sid = memberCenterPageVo.sid;
	         	$scope.gender = gender;         	
	         	$scope.genDerList = [
	                { text: "女", value: "0" },
	                { text: "男", value: "1" },
	              ];
	         }).error(function(data, status, headers, config) {
	 	       	 //$rootScope.wxstore.showError(data);
	         });
	     };
	     $scope.showGender();	
	     
	     
	     
	   //保存性别
	 	$scope.saveGender = function(item){
	 		$rootScope.wxstore.showLoading();	 		
	 		console.log($scope.gender);
	 		$http.post('member/saveInfo.json',$scope.gender).success(function(data){
	 			$rootScope.wxstore.hideLoading();
	 			$location.url("tab/MyIntion");
	 	    }).error(function(data, status, headers, config) {
	 	    	//$rootScope.wxstore.hideLoading();
	 	    	console.log(data);
	 	    	//$rootScope.wxstore.showError(data);
	 	    });
	 	}
 }]);
