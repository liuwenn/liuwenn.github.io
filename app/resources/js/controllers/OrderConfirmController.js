'use strict';

/**
 * 订单确认
 * OrderController
 * @constructor
 */

WxStoreApp.controller('OrderConfirmController', ["$rootScope","$scope","$http","$stateParams","$ionicPopup","ngDialog","$state",
	function($rootScope, $scope, $http, $stateParams, $ionicPopup, ngDialog, $state) {
	
	$scope.isDebug=true;
	
	if(!angular.isArray($rootScope.wxstore.orderVoListParam)){
		//$state.go("tabs.store");
		// 如果订单确认页面的订单参数不是数组，说明用刷新了该页面，直接跳转到首页
		window.location = "/wxstore";
	}
	
	//购物车 [结算]（创建订单）
	$scope.preOrder = function() {
		$rootScope.wxstore.showLoading();
		
		console.log($rootScope.wxstore.orderVoListParam);//订单商品信息，存放在全局变量中
		//设置订单信息
		$http.post('Order/preOrderInfo.json',$rootScope.wxstore.orderVoListParam).success(function(order){
			$rootScope.wxstore.hideLoading();
			console.log(order);
			$scope.order = order;
			
			//设置收货地址，到全局变量，在AddressController中可以修改该收货地址
			$rootScope.wxstore.consigneeAddress = order.goodsDeliveryAddress;
			
		}).error(function(data, status, headers, config) {
			$rootScope.wxstore.hideLoading();
			console.log(data);
			$rootScope.wxstore.showError(data);
		});
		

    };
    $scope.preOrder();

	//提交订单，后台创建订单，并查询订单详情。
	$scope.submitOrder = function(order) {
		$rootScope.wxstore.showLoading();
		
		//设置订单的收货地址 = 用户选择的收货地址
		order.goodsDeliveryAddress = $rootScope.wxstore.consigneeAddress;
		
		if($rootScope.wxstore.consigneeAddress == null || order.goodsDeliveryAddress ==null || $rootScope.wxstore.consigneeAddress.id==null || order.goodsDeliveryAddress.id==null){
			$rootScope.wxstore.hideLoading();
			$rootScope.wxstore.showAlert("请选择收货地址！");
			$scope.choiseAddress();
			return ;
		}
		
		
		
		$http.post('Order/createOrder', order).success(function(params) {
			$rootScope.wxstore.hideLoading();
            console.log("创建订单成功:￥"+order.realMoney);
            //alert("params:"+params);
            //调用微信H5支付接口
            wx.chooseWXPay({
                timestamp: params.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: params.nonceStr, // 支付签名随机串，不长于 32 位
                package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: params.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: params.paySign, // 支付签名
                success: function (res) {
                	if(res.errMsg == "chooseWXPay:ok" ) {
                	    //支付成功
                		$rootScope.wxstore.showAlert("恭喜，付款成功，店小二马上为您发货！");
                	}else{
                		//支付失败 取消订单
                		$rootScope.wxstore.showAlert("订单已取消！");
                	}
            	},
            	cancel:function(res){
            		//支付取消
            		$rootScope.wxstore.showAlert("支付取消！");
            	},
            	fail:function(res){
            		$rootScope.wxstore.showError("支付失败！");
            	},
            	complete:function(res){
            		//$rootScope.wxstore.showAlert("complete!");
            	}
            });
        	
        }).error(function(apiErrorInfo, status, headers, config) {
        	$rootScope.wxstore.hideLoading();
        	$rootScope.wxstore.showError("<p class='assertive'>错误码："+apiErrorInfo.errcode+"</p><p class='assertive'>错误描述："+apiErrorInfo.errmsg+"</p>");
        });
    };
    
    $scope.choiseAddress = function(){
    	//根据前一个页面所在tab弹出属于相应tab的addressPicker页面。
    	if("store" == $rootScope.wxstore.orderFrom){
    		$state.go("tabs.orderManagerAddress");
    	}else{
    		$state.go("tabs.cartManagerAddress");
    	}
    }


}]);





