'use strict';


WxStoreApp.controller('AppointMentController', ["$scope","$location","$http","$rootScope",
    function($scope,$location,$http,$rootScope) {
	//产品列表
	$scope.showMerchantGoodList = function(status) {
	     $http.get('merchantGoods/merchantGoodsList.json').success(function(couponList){
	     	$scope.couponList = couponList;
	         }).error(function(data, status, headers, config) {
	 	       	 $rootScope.wxstore.showError(data);
	         });
     };
//   $scope.showMerchantGoodList();
     $scope.couponList=[
      {
        "sid": 1,
        "goodsCode": "112031023", //产品编码
        "name": "乒乓球教学", // 产品名称
        "logo": "/",  // 产品logo
        "img": "/", // 产品图片
        "originalPrice": 200, // 原价
        "currentPrice": 180, // 现价
        "promotionPrice": 150, // 会员价
        "account": "乒乓球教学" // 描述
      }
    ]

	$scope.tiaocoach=function(coupon){
		var goodsCode= parseInt(coupon.goodsCode);
		$location.url("tab/Appointcoach?id="+goodsCode);  /*跳转*/
		 //$location.path('/validation').replace();
	}
   }]);
