'use strict';

/**
 * 二维码展示
 * QRCodeController
 * @constructor
 */
WxStoreApp.controller('QRCodeController', ["$rootScope","$scope","$http","$location",
   	function($rootScope,$scope, $http,$location) {
	
	/*$scope.drawCode = function(){
		(function ($) {
            var q = $('#qrcanvas');
            var draw = function () {
                var colorIn = '#191970';
                var colorOut = '#cd5c5c';
                //var colorFore = scope.color;
                var colorFore = '#000000';
                var options = {
                    //cellSize: Number(scope.size),
                	cellSize: Number('5'),
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
                    data:$scope.qrCode.qrInfo,
                    typeNumber: 1,
                };
                q.innerHTML = '';
                q.appendChild(qrgen.canvas(options));
            };
            draw();//自动调用画图方法
		})(document.querySelector.bind(document));
        }	*/	
	
   	//显示二维码
   	$scope.showQRCode = function() {
   		console.log('QRCodeController');
   	     $http.get('member/userInfolist.json').success(function(memberCenterPageVo){
   	    	 	var qrCode = new Object();
   	    	    qrCode.mnickName = memberCenterPageVo.mnickName;
   	    	    qrCode.mcomefrom = memberCenterPageVo.mcomefrom;
   	    	    qrCode.mimg = memberCenterPageVo.flag1;
   	    	    qrCode.qrInfo = "会员编号："+memberCenterPageVo.sid+"，姓名："+memberCenterPageVo.mrealName+"，昵称："+memberCenterPageVo.mnickName+"，会员级别："+memberCenterPageVo.levelName+"，积分："+memberCenterPageVo.num;
   	         	$scope.qrCode = qrCode;
   	         	//$scope.drawCode();   	         	
   	         }).error(function(data, status, headers, config) {
   	 	       	 //$rootScope.wxstore.showError(data);
   	         });
   	         
   	     };
   	     
   	  $scope.showQRCode();   	  
}]);