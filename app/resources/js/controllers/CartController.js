'use strict';

/**
 * 购物车
 * CartController
 * @constructor
 */
WxStoreApp.controller('CartController',  ["$rootScope","$scope","$state","$http","$ionicPopup",
	function($rootScope, $scope, $state, $http, $ionicPopup) {
	
	//合计
	$scope.total=0.00;
	
	//用户点击该tab,将通知提醒小图标的数字设置为0
	$rootScope.wxstore.badgeData.cartBadgeCount = 0;	

	$scope.fetchGoodsList = function() {
		console.log("fetchGoodsList");
		
        $http.get('Cart/goodsList.json').success(function(goodsList){
             $scope.goodsList = goodsList;
             $rootScope.wxstore.cartNumber = goodsList.length;//设置购物车中的商品数量
             console.log(goodsList);
        }).error(function(data, status, headers, config) {
        	 $rootScope.wxstore.showError(data);
        });
    };
    $scope.fetchGoodsList();
    
    //选中商品 计算出‘合计’价格
    $scope.selectCartGoods = function(cartGoodsId){
    	var currentGoods = $scope.getCurrentGoods(cartGoodsId);//用户点击的商品
    	currentGoods.selected = !currentGoods.selected;
    	if(currentGoods.selected){
    		$scope.total += currentGoods.realPrice * currentGoods.goodsNumber;
    	}else{
    		$scope.total -= currentGoods.realPrice * currentGoods.goodsNumber;
    	}
    }
    
    // 根据id获取列表中的对象
    $scope.getCurrentGoods=function(goodsId){
    	var currentGoods = null;
    	for(var i in $scope.goodsList){
    		var goods = $scope.goodsList[i];
    		if(goods.id === goodsId){
    			currentGoods = goods;
    		}
    	}
    	return currentGoods;
    }
    
    
    //下拉刷新页面
    $scope.doRefresh = function() {
    	 $http.get('Cart/goodsList.json').success(function(goodsList){
             $scope.goodsList = goodsList;
             console.log(goodsList);
         }).error(function(data, status, headers, config) {
        	 $rootScope.wxstore.showError(data);
         }).finally(function() {
        	 // Stop the ion-refresher from spinning
        	 $scope.$broadcast('scroll.refreshComplete');
         });
	};
	
	 //结算
	 $scope.preCartOrderConfirm = function(){
		 $rootScope.wxstore.showLoading();
		 var haveChecked = false;
		 var orderVoList = new Array();
		 
		 for(var i in $scope.goodsList){
    		 var goods = $scope.goodsList[i];
    		 if(goods.selected){
    			 orderVoList.push({"cartId" : goods.id, "goodsId" : goods.goodsId, "goodsNumber" : goods.goodsNumber});
    			 haveChecked = true;
    		 }
    	 }
		 console.log(orderVoList);
		 if(!haveChecked){
			 $rootScope.wxstore.showError("亲，您还未选择任何商品哦！");
			 $rootScope.wxstore.hideLoading();
		 }else{
			 $rootScope.wxstore.hideLoading();
			 $rootScope.wxstore.orderVoListParam = orderVoList;//用户选中的商品
			 $rootScope.wxstore.orderFrom = "cart";
			 $state.go('tabs.cartOrderConfirm');
		 }
	 }
	 
	 //删除 购物车中的商品
	 $scope.onItemDelete = function(cartGoods) {
			console.log(cartGoods);
			$rootScope.wxstore.showLoading();
			$http.delete('Cart/delete/'+cartGoods.id+'.json').success(function(){
				$scope.goodsList.splice($scope.goodsList.indexOf(cartGoods), 1);
				$rootScope.wxstore.hideLoading();
		    }).error(function(data, status, headers, config) {
		    	$rootScope.wxstore.hideLoading();
		    	console.log(data);
		    	$rootScope.wxstore.showError(data);
		    });
			
		};
    
}]);
