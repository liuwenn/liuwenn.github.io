'use strict';

/**
 * 选择收货地址 Controller
 * AddressCreateController
 * @constructor
 */
WxStoreApp.controller('AddressCreateController', ["$rootScope","$scope","$http","$ionicPopup","$ionicModal","$state",
    function($rootScope, $scope, $http, $ionicPopup, $ionicModal,$state) {
	
	$scope.fetchConsigneeAddressList = function() {
		
        $http.get('Address/addressList.json').success(function(addressList){
        	$scope.addressList = addressList;
        }).error(function(data, status, headers, config) {
	       	 console.log(data);
	       	 console.log(status);
	       	 console.log(headers);
	       	 console.log(config);
	       	 $rootScope.wxstore.showError(data);
        });
    };
    $scope.fetchConsigneeAddressList();
 
    // 当前选中的地址，在页面上需要选中
    if($rootScope.wxstore.consigneeAddress){$scope.defaultSelectedAddressId = $rootScope.wxstore.consigneeAddress.id;}
    console.log("defaultSelectedAddressId:"+$scope.defaultSelectedAddressId);
	
	$scope.changeAddress = function(addr){
		 console.log(addr);
		 $rootScope.wxstore.consigneeAddress = addr;
	}
	
}]);
