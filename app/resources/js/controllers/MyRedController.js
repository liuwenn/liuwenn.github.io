'use strict';

/**
 * 卡券
 * MyCenterController
 * @constructor
 */
WxStoreApp.controller('MyRedController', ["$scope","$http","$ionicModal",
	function($scope, $http, $ionicModal) {
	console.log('HomeTabCtrl');
    $scope.fetchCarsList = function() {
        $http.get('MyRed/userInfolist.json').success(function(myRedPageVo){
        	 console.log(myRedPageVo);
             $scope.myRedPageVo = myRedPageVo;
        }).error(function(data, status, headers, config) {
        	 $rootScope.wxstore.showError(data);
        });
    };
    $scope.fetchCarsList();

}]);