'use strict';

/**
 * 选择 AddressPickerController
 * @constructor
 */
WxStoreApp.controller('AddressPickerController', ["$rootScope","$scope","$http","$ionicPopup","$ionicModal","$ionicHistory","$location",
	function($rootScope, $scope, $http, $ionicPopup, $ionicModal,$ionicHistory,$location) {
	console.log('AddressPickerController');
	//跳转方法
//	$scope.Jump=function(){
//		console.log(12);
//		$location.url("tab/CardCouponDetails");
//	}
	
	$scope.fetchConsigneeAddressList = function() {
        $http.get('Address/addressList.json').success(function(addressList){
        	
        	$scope.addressList = addressList;
        	
        	//选中 订单页面显示的收货地址
        	if($rootScope.wxstore.consigneeAddress && $scope.addressList){
        		for(var i in $scope.addressList){
        			if($rootScope.wxstore.consigneeAddress.id == $scope.addressList[i].id){
        				$scope.addressList[i].checked = true;
        			}
        		}
        	}
        	
        }).error(function(data, status, headers, config) {
	       	 $rootScope.wxstore.showError(data);
        });
    };
    $scope.fetchConsigneeAddressList();
    
    
	$scope.data = {
	    showDelete: false
	};
	
	$scope.onItemEdit = function(addr) {
		if(addr){
			$scope.addr = addr;
		}
	    $scope.modal.show();
	};
	  
	$scope.onItemDelete = function(addr) {
		console.log(addr);
		$rootScope.wxstore.showLoading();
		$http.delete('Address/delete/'+addr.id+'.json').success(function(){
			$scope.addressList.splice($scope.addressList.indexOf(addr), 1);
			$rootScope.wxstore.hideLoading();
			$scope.modal.hide();
	    }).error(function(data, status, headers, config) {
	    	$rootScope.wxstore.hideLoading();
	    	console.log(data);
	    	$rootScope.wxstore.showError(data);
	    });
		
	};
	
	
	
	
	//初始化CreateAddress Model Window
	$ionicModal.fromTemplateUrl('resources/templates/my-address-create.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

	//打开CreateAddress Model Window
	$scope.onCreate = function(){
		$scope.addr={};//新增页面，设置addr为空对象
	    $scope.modal.show();
	}
	
	//关闭CreateAddress Model Window
	$scope.closeModal = function(){
	    $scope.modal.hide();
	}
	
	//保存地址
	$scope.saveAddress = function(){
		$rootScope.wxstore.showLoading();
		
		console.log($scope.addr);
		$http.post('Address/save.json',$scope.addr).success(function(addr){
			if($scope.addr.id && $scope.addr.id > 0){
				//编辑
			}else{
				//新增
				$scope.addressList.unshift(addr);
			}
			$rootScope.wxstore.hideLoading();
			$scope.modal.hide();
	    }).error(function(data, status, headers, config) {
	    	$rootScope.wxstore.hideLoading();
	    	console.log(data);
	    	$rootScope.wxstore.showError(data);
	    });
	}
	
	//点击某个收货地址，设置该地址为选中状态，并设置到全局的收货地址（$rootScope.wxstore.consigneeAddress）。
    $scope.checkAddr = function(addr){
    	console.log($scope.addressList);
    	console.log(addr);
    	//选中 用户点击的收货地址
    	if($scope.addressList && $scope.addressList.length > 0){
    		for(var i in $scope.addressList){
    			if(addr.id == $scope.addressList[i].id){
					$scope.addressList[i].checked = true;
					$rootScope.wxstore.consigneeAddress = $scope.addressList[i];
					console.log($rootScope.wxstore.consigneeAddress);
    			}else{
    				$scope.addressList[i].checked = false;
    			}
    			
    			$ionicHistory.goBack();
    		}
    	}else{
    		alert($scope.addressList);
    	}
    	
    }
    //点击事件
    
    
    
    
    
 
	 
}]);
