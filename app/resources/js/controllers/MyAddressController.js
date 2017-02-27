'use strict';

/**
 * 我的收货地址 MyAddressController
 * MyAddressController
 * @constructor
 */
WxStoreApp.controller('MyAddressController', ["$rootScope","$scope","$http","$ionicPopup","$ionicModal","$location",
	function($rootScope, $scope, $http, $ionicPopup, $ionicModal,$location) {
	//获取收货地址列表
	$scope.fetchConsigneeAddressList = function() {
		console.log('MyAddressController');
      $http.get('addr/addressList.json').success(function(addressList){
      	$scope.addressList = addressList;
      }).error(function(data, status, headers, config) {
	       	 //$rootScope.wxstore.showError(data);
      });
    };
    $scope.fetchConsigneeAddressList();
    
	 //下拉刷新页面
   $scope.doRefresh = function() {	   
	   $scope.fetchConsigneeAddressList();
	   $scope.$broadcast('scroll.refreshComplete');
	 };
    
	$scope.data = {
	    showDelete: false
	};
	
	
	//点击修改收货地址
	$scope.onItemEdit = function(addr) {
		if(addr){
			$scope.newAddress = addr;
		}
	    $scope.modal.show();
	};
	
	//删除收货地址
	$scope.onItemDelete = function(addr) {
		console.log(addr);
		//$rootScope.wxstore.showLoading();
		$http.delete('addr/delete/'+addr.sid+'.json').success(function(){
			//$rootScope.wxstore.hideLoading();
			$scope.doRefresh();
	    }).error(function(data, status, headers, config) {
	    	//$rootScope.wxstore.hideLoading();
	    	console.log(data);
	    	//$rootScope.wxstore.showError(data);
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
		var newAddress = new Object();
		$scope.newAddress = newAddress;//新增页面，设置addr为空对象
	    $scope.modal.show();
	}
	
	//关闭CreateAddress Model Window
	$scope.closeModal = function(){
	    $scope.modal.hide();
	}
	
	//获取区域数据
	$scope.showAreaList = function(parentId){
		var addressParam = new Object();
		addressParam.addrSid = parentId;		
		//$rootScope.wxstore.showLoading();	 		
 		console.log(addressParam);
 		$http.post('addr/areaList.json',addressParam).success(function(data){
 			//$rootScope.wxstore.hideLoading();
 			$scope.areaList = data;
 	    }).error(function(data, status, headers, config) {
 	    	//$rootScope.wxstore.hideLoading();
 	    	console.log(data);
 	    	//$rootScope.wxstore.showError(data);
 	    });
	}
	
	//选择区域
	$scope.pickArea = function(area){
		//省份选择
		if(area.level==1){
			$scope.newAddress.provinceId = area.code;
			$scope.newAddress.provinceName = area.name;
			$scope.showAreaList(area.code);
		}
		//市选择
		if(area.level==2){
			$scope.newAddress.cityId = area.code;
			$scope.newAddress.cityName = area.name;
			$scope.showAreaList(area.code);
		}
		//县选择
		if(area.level==3){
			$scope.newAddress.countyId = area.code;
			$scope.newAddress.countyName = area.name;
			$scope.showAreaList(area.code);
		}
		//街道选择
		if(area.level==4){
			$scope.newAddress.streetId = area.code;
			$scope.newAddress.streetName = area.name;
			$scope.showAreaList(area.code);
			//选择完后关闭区域选择弹出框
			$scope.closeAddrModel(0);
		}		
	}
	
	//初始化地区选择页面
	$ionicModal.fromTemplateUrl('resources/templates/my-Address-Area.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.addrModel = modal;
    });
	
	//打开地区选择页面
	$scope.openAddrModel= function(){
		$scope.showAreaList(0);
		$scope.addrModel.show();
	}
	//关闭地区选择页面
	$scope.closeAddrModel = function(type){
		if(type==1){
			//选择中断清除区域信息
			$scope.newAddress.provinceId = "";
			$scope.newAddress.provinceName = "";
			$scope.newAddress.cityId = "";
			$scope.newAddress.cityName = "";
			$scope.newAddress.countyId = "";
			$scope.newAddress.countyName = "";
			$scope.newAddress.streetId = "";
			$scope.newAddress.streetName = "";
		}
	    $scope.addrModel.hide();
	}
	
	//初始化收件人性别选择页面
	$ionicModal.fromTemplateUrl('resources/templates/my-Address-Gender.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.sexModel = modal;
    });
	
	//打开性别选择页面
	$scope.openSexModel= function(sex){
		$scope.genDerList = [
 	        { text: "女士", value: "0" },
 	        { text: "先生", value: "1" },
		 ];
		$scope.newAddress.sex = sex;
		$scope.sexModel.show();
	}
	//关闭性别选择页面
	$scope.closeSexModel = function(){
	    $scope.sexModel.hide();
	}	
	
	//保存地址
	$scope.saveAddress = function(){
		//$rootScope.wxstore.showLoading();		
		console.log($scope.newAddress);
		$http.post('addr/save.json',$scope.newAddress).success(function(addr){
			//$rootScope.wxstore.hideLoading();
			$scope.doRefresh();
			$scope.modal.hide();
	    }).error(function(data, status, headers, config) {
	    	//$rootScope.wxstore.hideLoading();
	    	console.log(data);
	    	//$rootScope.wxstore.showError(data);
	    });
	}
	
	//三级联城市 插件
 var vm=$scope.vm={};
  vm.cb = function () {
    console.log(vm.CityPickData1.areaData)
    console.log(vm.CityPickData2.areaData)
    console.log(vm.CityPickData3.areaData)
    console.log(vm.CityPickData4.areaData)
  }
  //例1
  vm.CityPickData1 = {
    areaData: [],
    backdrop: true,
    backdropClickToClose: true,
    defaultAreaData: ['江苏', '无锡', '江阴市'],
    buttonClicked: function () {
      vm.cb()
    },
    tag: '-',
    iconClass: 'ion-location',
    title: '有icon的数据'
  }
  //例2
  vm.CityPickData2 = {
  	title: '所在城市',
    areaData: ['点击选择'],
    hardwareBackButtonClose: false
  }
  //例3
  vm.CityPickData3 = {
    areaData: [],
    defaultAreaData: ['江苏', '无锡', '江阴市'],
    title: '初始城市江苏无锡江阴市'
  }
  //例4
  vm.CityPickData4 = {
    areaData: [],
    title: '外部更改值',
    watchChange: true
  }
  vm.change = function () {
    console.log('change')
    vm.CityPickData4.areaData = ['上海', '徐汇区']
  }
  vm.sync = function () {
    console.log('sync')
    vm.CityPickData4.areaData = vm.CityPickData2.areaData
  }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}]);
