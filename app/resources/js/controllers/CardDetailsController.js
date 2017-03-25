'use strict';

/**
 * 选择 CardCouponDetailsController
 * @constructor
 */
WxStoreApp.controller('CardDetailsController', ["$rootScope","$scope","$location","$http","$ionicModal",
	function($rootScope,$scope, $location,$http,$ionicModal) {
		
		//优惠券列表
/*		$scope.showCouponList = function(status) {
			console.log(status)
			var param ={};
			param.status = status;
			$scope.param = param;
			console.log('CardDetailsController');
		     $http.post('card/couponList.json',$scope.param).success(function(couponList){
		     	console.log(couponList)
			    	 if(status==0){
			    		 $scope.couponList = couponList;
			    		 $scope.showCardList();
			    	 }
			    	 if(status==1){
			    		 $scope.usedCouponList = couponList;
			    	 }
		         }).error(function(data, status, headers, config) {
		 	       	 //$rootScope.wxstore.showError(data);
		         });
		     };
		//$scope.showCouponList(0);
		
		 //下拉刷新优惠券
	    $scope.doRefreshCoupon = function() {	 
	    	$scope.showCouponList(0);
	        $scope.$broadcast('scroll.refreshComplete');
		};
		
		//初始化过期优惠券弹出窗
		$ionicModal.fromTemplateUrl('resources/templates/my-Coupon-Used.html', {
	        scope: $scope,
	        animation: 'slide-in-up'
	    }).then(function(modal) {
	        $scope.couponMdel = modal;
	    });
		
		//打开过期优惠券弹出窗
		$scope.onCreate = function(){
			$scope.showCouponList(1);	
			$scope.couponMdel.show();				    
		}
		
		//关闭过期优惠券弹出窗
		$scope.closeModal = function(){
		    $scope.couponMdel.hide();
		}
		
		//会员卡列表
		$scope.showCardList = function() {
			console.log('CardDetailsController');
		     $http.get('card/cardList.json').success(function(obj){
		         	$scope.cardList = obj.list;
		         	$scope.imgUrl = obj.imgUrl;
		         }).error(function(data, status, headers, config) {
		 	       	 //$rootScope.wxstore.showError(data);
		         });
		     };
		
		     
		//下拉刷新会员卡
	    $scope.doRefreshCard = function() {	 
	    	$scope.showCardList();
	        $scope.$broadcast('scroll.refreshComplete');
		};
		
		 //获取会员卡历史纪录
	 	$scope.showCardLog = function(card) {
	 		console.log(card);
	 		$rootScope.wxstore.showLoading();
	 		$http.post('card/cardLogList/'+card.sid+'.json').success(function(cardLogList){
	 			$rootScope.wxstore.hideLoading();
	 			$scope.cardLogList = cardLogList;
	 	    }).error(function(data, status, headers, config) {
	 	    	//$rootScope.wxstore.hideLoading();
	 	    	console.log(data);
	 	    	//$rootScope.wxstore.showError(data);
	 	    });
	 	};
		
		//初始化会员卡详情弹出窗
		$ionicModal.fromTemplateUrl('resources/templates/Card-Details.html', {
	        scope: $scope,
	        animation: 'slide-in-up'
	    }).then(function(modal) {
	        $scope.cardModal = modal;
	    });
		
		//打开会员卡详情弹出窗
		$scope.openCardModal = function(card){
			$scope.cardInfo = card;
			$scope.showCardLog(card);
			$scope.cardModal.show();				    
		}
		
		//关闭会员卡详情弹出窗
		$scope.closeCardModal = function(){
		    $scope.cardModal.hide();
		}
		
		//初始化会员卡二维码弹出窗
		$ionicModal.fromTemplateUrl('resources/templates/Card-QR.html', {
	        scope: $scope,
	        animation: 'slide-in-up'
	    }).then(function(modal) {
	        $scope.cardQRModal = modal;
	    });
		
		//打开会员卡二维码弹出窗
		$scope.openCardQRModal = function(card){
			Date.prototype.Format = function (fmt) { //author: meizz 
	    	    var o = {
	    	        "M+": this.getMonth() + 1, //月份 
	    	        "d+": this.getDate(), //日 
	    	        "h+": this.getHours(), //小时 
	    	        "m+": this.getMinutes(), //分 
	    	        "s+": this.getSeconds(), //秒 
	    	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	    	        "S": this.getMilliseconds() //毫秒 
	    	    };
	    	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    	    for (var k in o)
	    	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    	    return fmt;
	    	}
			$scope.cardQRInfo = "卡名："+card.cardName+",卡号："+card.cardNum+",卡类型："+(card.type==0?"普通卡":"次数卡")+",有效期："+new Date(card.startTime).Format("yyyy-MM-dd")+"至"+new Date(card.endTime).Format("yyyy-MM-dd");
			$scope.cardQRModal.show();				    
		}*/
		
		//关闭会员卡二维码弹出窗
		$scope.closeCardQRModal = function(){
		    $scope.cardQRModal.hide();
		}
		//跳转到优惠劵
		$scope.Jump=function(){
			$location.url("tab/CardCouponDetails");
		}
		//跳转到会员卡
		$scope.Jump_A=function(){
			$location.url("tab/CardMembershipDetails");
		}
		
		
		 //下拉刷新优惠券
	    $scope.doRefreshCoupon = function() {	 
	    	$scope.showCouponList(0);
	        $scope.$broadcast('scroll.refreshComplete');
		};
		
		//初始化过期优惠券弹出窗
		$ionicModal.fromTemplateUrl('resources/templates/my-Coupon-Used.html', {
	        scope: $scope,
	        animation: 'slide-in-up'
	    }).then(function(modal) {
	        $scope.couponMdel = modal;
	    });
		
		//打开过期优惠券弹出窗
		$scope.onCreate = function(){
			//$scope.showCouponList(1);	
			$scope.couponMdel.show();				    
		}
		
		//关闭过期优惠券弹出窗
		$scope.closeModal = function(){
		    $scope.couponMdel.hide();
		}
		
		
		
		
		
		
		
		
		
}]);