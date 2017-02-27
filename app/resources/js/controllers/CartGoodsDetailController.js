'use strict';

/**
 * 购物车中查看商品详情
 * CartGoodsDetailController
 * @constructor
 */
WxStoreApp.controller('CartGoodsDetailController', ["$rootScope","$scope","$http","$stateParams","$ionicPopup",
	function($rootScope, $scope, $http, $stateParams, $ionicPopup) {
	
	$scope.fetchGoodsDetail = function() {
        $http.get('Store/goodsDetail/' + $stateParams.goodsId + '.json').success(function(goodsDetail){
            $scope.goodsDetail = goodsDetail;
            console.log(goodsDetail);
        }).error(function(data, status, headers, config) {
        	$rootScope.wxstore.showError(data);
        });
    };
    
    $scope.fetchGoodsDetail();
	
}]);


