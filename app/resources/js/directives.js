'use strict';

/* Directives */

var AppDirectives = angular.module('OutlerCenterApp.directives', []);

/* show/hide ionic tabs */
AppDirectives.directive('hideTabs', ["$rootScope",function($rootScope) {
	  return {
	      restrict: 'A',
	      link: function(scope, element, attributes) {
	      	
	      	  scope.$on('$ionicView.beforeEnter', function() {         //进入页面时
                scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = value;
                });
            });


	          scope.$on('$ionicView.beforeLeave', function() {       //导出页面时
	               scope.$watch(attributes.hideTabs, function(value){
                    $rootScope.hideTabs = false;
                });
                
	               scope.$watch('$destroy', function(value){         //清除组件时
                    $rootScope.hideTabs = false;
                });
	          });
	      }
	  };
	}]);

/**
 * 二维码信息生成器
 */
AppDirectives.directive("wminfo", function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude :true,
        scope: {
            infostr: '@',
            size: '@',
            color: '@',
        },
        template: "<div id='qrcanvas'></div>",
        link: function (scope, element, attrs) {
            (function ($) {
                var q = $('#qrcanvas');
                var draw = function () {
                    var colorIn = '#04540f';
                    var colorOut = '#cd5c5c';
                    var colorFore = scope.color;
                    var options = {
                        cellSize: Number(scope.size),
                        foreground: [
                            // 背景颜色
                            {style: colorFore},
                            // outer squares of the positioner
                            {row: 0, rows: 7, col: 0, cols: 7, style: colorOut},
                            {row: -7, rows: 7, col: 0, cols: 7, style: colorOut},
                            {row: 0, rows: 7, col: -7, cols: 7, style: colorOut},
                            // inner squares of the positioner
                            {row: 2, rows: 3, col: 2, cols: 3, style: colorIn},
                            {row: -5, rows: 3, col: 2, cols: 3, style: colorIn},
                            {row: 2, rows: 3, col: -5, cols: 3, style: colorIn},
                        ],
                        data: scope.infostr,
                        typeNumber: 1,
                    };
                    q.innerHTML = '';
                    q.appendChild(qrgen.canvas(options));
                };
                draw();//自动调用画图方法
            })(document.querySelector.bind(document));
        }
    };
});


//全局浮动框调用
WxStoreApp.controller( 'AppCtrl',['$scope','$ionicPopover','$timeout',function($scope,$ionicPopover,$timeout){

          $scope.popover = $ionicPopover.fromTemplateUrl('my-popover.html', {
            scope: $scope
          });

          // .fromTemplateUrl() 方法
          $ionicPopover.fromTemplateUrl('my-popover.html', {
            scope: $scope
          }).then(function(popover) {
            $scope.popover = popover;
          });


          $scope.openPopover = function($event) {
            $scope.popover.show($event);
          };
          $scope.closePopover = function() {
            $scope.popover.hide();
          };
          // 清除浮动框
          $scope.$on('$destroy', function() {
            $scope.popover.remove();
          });
          // 在隐藏浮动框后执行
          $scope.$on('popover.hidden', function() {
            // 执行代码
          });
          // 移除浮动框后执行
          $scope.$on('popover.removed', function() {
            // 执行代码
          });

        }])

//全局弹框(弹框显示、对话框、警告框)调用
WxStoreApp.controller('PopupCtrl',function($scope, $ionicPopup, $timeout) {

         // Triggered on a button click, or some other target
         $scope.showPopup = function() {
           $scope.data = {}

           // 自定义弹窗
           var myPopup = $ionicPopup.show({
             template: '<input type="password" ng-model="data.wifi">',
             title: 'Enter Wi-Fi Password',
             subTitle: 'Please use normal things',
             scope: $scope,
             buttons: [
               { text: 'Cancel8' },
               {
                 text: '<b>Save</b>',
                 type: 'button-positive',
                 onTap: function(e) {
                   if (!$scope.data.wifi) {
                     // 不允许用户关闭，除非输入 wifi 密码
                     e.preventDefault();
                   } else {
                     return $scope.data.wifi;
                   }
                 }
               },
             ]
           });
           myPopup.then(function(res) {
             console.log('Tapped!', res);
           });
           $timeout(function() {
              myPopup.close(); // 3秒后关闭弹窗
           }, 3000);
          };
           //  confirm 对话框
           $scope.showConfirm = function() {
             var confirmPopup = $ionicPopup.confirm({
               title: 'Consume Ice Cream',
               template: 'Are you sure you want to eat this ice cream?'
//             templateUrl: 'resources/templates/my-Intion-QR.html'
             });
             confirmPopup.then(function(res) {
               if(res) {
                 console.log('You are sure');
               } else {
                 console.log('You are not sure');
               }
             });
           };

           //  alert（警告） 对话框
           $scope.showAlert = function() {
             var alertPopup = $ionicPopup.alert({
               title: 'Don\'t eat that!',
               template: 'It might taste good'
             });
             alertPopup.then(function(res) {
               console.log('Thank you for not eating my delicious ice cream cone');
             });
           };
        });



//全局Model框调用
WxStoreApp.controller('Modercontroller',function($rootScope, $scope, $http, $ionicPopup, $ionicModal,$ionicHistory,$location){
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
})



 
