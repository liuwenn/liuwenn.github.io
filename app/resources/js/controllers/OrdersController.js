'use strict';

/**
 * 我的订单
 * OrderController
 * @constructor
 */

WxStoreApp.controller('OrdersController', ["$rootScope","$scope","$http","$ionicPopup","$ionicLoading",
  function($rootScope, $scope, $http, $ionicPopup, $ionicLoading) {
	
	$scope.data = {
		badgeCount : 26
	};
	
	$rootScope.wxstore.showLoading();
	
	//立即购买（此时后台并不会创建订单）
	$scope.getOrderList = function() {
        $http.get('Order/orderList.json').success(function(orders){
        	$rootScope.wxstore.hideLoading();
        	
        	//1.待付款，2.待发货，3.待收货，4.已收货，5.取消，6.退款，7退款成功，8.取消退款
            $scope.orders = orders;//所有订单
            console.log(orders);
            $scope.unSendOrders = new Array();//2待发货
            $scope.unReceiveOrders = new Array();//3待收货
            $scope.receivedOrders = new Array();//4待评价（已收货）

            //根据订单状态过滤
            var orderList = new Array();  
        	for(var i=0; i < $scope.orders.length; i++){
        		var order = $scope.orders[i];
        		if(order.orderStatus == 2){
        			$scope.unSendOrders.push(order);
        		}else if(order.orderStatus == 3){
        			$scope.unReceiveOrders.push(order);
        		}else if(order.orderStatus == 4){
        			$scope.receivedOrders.push(order);
        		}
        	}
        	
            
        }).error(function(data, status, headers, config) {
        	$rootScope.wxstore.hideLoading();
        	console.log(data+"-"+status+"-"+headers+"-"+config);
        	$rootScope.wxstore.showError(data);
        });
    };
    $scope.getOrderList();
    
    $scope.changeOrderStatus = function(order,status){
    	$rootScope.wxstore.showLoading();
    	$http.post('Order/changeOrderStatus.json',{"orderId":order.id, "orderStatus":status}).success(function(){
    		$scope.getOrderList();
        }).error(function(data, status, headers, config) {
        	$rootScope.wxstore.hideLoading();
        	console.log(data+"-"+status+"-"+headers+"-"+config);
        	$rootScope.wxstore.showError(data);
        });
    }
    
 	 //下拉刷新页面
    $scope.doRefresh = function() {
    	 $http.get('Order/orderList.json').success(function(orders){
             $scope.orders = orders;
             console.log(orders);
         }).error(function(data, status, headers, config) {
        	 $rootScope.wxstore.showError(data);
         }).finally(function() {
        	 $scope.$broadcast('scroll.refreshComplete');
         });
	};
	
	//提交订单，后台创建订单，并查询订单详情。
	$scope.submitOrder = function(order) {
		$rootScope.wxstore.showLoading();

		if(!order.goodsDeliveryAddress.id){
			$rootScope.wxstore.hideLoading();
			$rootScope.wxstore.showError("没收设置收货地址，订单无效，请重新下单！");
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
                		  $rootScope.wxstore.showAlert(res.errMsg);
                	  }else{
                		  $rootScope.wxstore.showAlert(res.errMsg);
                	  }
            	},
            	cancel:function(res){
            		//支付取消  -->>需要跳转到【订单详情页面】
            		$rootScope.wxstore.showAlert(res.errMsg);
            	},
            	error:function(res){
            		$rootScope.wxstore.showError(res.errMsg);
            	}
            });
        	
        }).error(function(apiErrorInfo, status, headers, config) {4
        	$rootScope.wxstore.hideLoading();
        	$rootScope.wxstore.showError("<p class='assertive'>错误码："+apiErrorInfo.errcode+"</p><p class='assertive'>错误描述："+apiErrorInfo.errmsg+"</p>");
        });
    };
	
     
}]);





