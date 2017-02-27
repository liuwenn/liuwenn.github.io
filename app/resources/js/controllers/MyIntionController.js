'use strict';

/**
 * 个人信息
 */
WxStoreApp.controller('MyIntionController', ["$scope","$http","$rootScope",
	function($scope, $http,$rootScope) {
	$scope.showMemberExt = function() {
		console.log('MyIntionController');
        $http.get('member/userInfolist.json').success(function(memberCenterPageVo){
        	
        	$scope.detail = memberCenterPageVo;
        	if($scope.detail.msex=="0"){
        		$scope.detail.msex = "女";
        	}else{
        		$scope.detail.msex = "男";
        	}
        }).error(function(data, status, headers, config) {
	       	 //$rootScope.wxstore.showError(data);
        });
    };
    //$scope.showMemberExt();	
    $scope.detail=
        	{
        	'mrealName':'刘稳',
        	'mnickName':'小刘',
        	'mbrith':'1993-02-24',
        	'msex':'男',
        	'mcomefrom':'北京昌平沙河'
	 		}
        	
        	
}]);
