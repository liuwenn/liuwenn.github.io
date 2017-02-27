'use strict';

/**
 * 个人中心
 * MyCenterController
 * @constructor
 */

WxStoreApp.controller('MyIntionHeadController',  ["$scope","$http",
    function($scope, $http) {
    	 $scope.showAlert = function() {
	         var alertPopup = $ionicPopup.alert({
	           title: 'Don\'t eat that!',
	           template: 'It might taste good'
	         });
	         alertPopup.then(function(res) {
	           console.log('Thank you for not eating my delicious ice cream cone');
	         });
       };
}]);