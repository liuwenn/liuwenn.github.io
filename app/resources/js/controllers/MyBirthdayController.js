'use strict';

/**
 * 地区
 * MyBirthdayController
 */

WxStoreApp.controller('MyBirthdayController', ["$rootScope","$scope","$http","$location",
	function($rootScope,$scope, $http,$location) {
	//显示生日
	$scope.showMyBirthday = function() {
		console.log('MyBirthdayController');
	     $http.get('member/userInfolist.json').success(function(memberCenterPageVo){
	    	 	var birthday = new Object();
	    	 	birthday.mbrith = memberCenterPageVo.mbrith;
	    	 	birthday.extId = memberCenterPageVo.extId;
	    	 	birthday.sid = memberCenterPageVo.sid;
	         	$scope.birthday = birthday;
	         	$scope.memberCenterPageVo = memberCenterPageVo;
	         }).error(function(data, status, headers, config) {
	 	       	 //$rootScope.wxstore.showError(data);
	         });
	     };
	     $scope.showMyBirthday();
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
	     
	     var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
	     var monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	   //选择日期后保存生日
	     var datePickerCallback = function (val) {
	         if (typeof(val) === 'undefined') {
	             console.log('No date selected');
	         } else {
	        	$scope.birthday.mbrith = val.Format("yyyy-MM-dd")+" 00:00:00";	   //修改选择日期     	 
	        	$rootScope.wxstore.showLoading();	 		
	 	 		console.log($scope.birthday);
	 	 		$http.post('member/saveInfo.json',$scope.birthday).success(function(data){
	 	 			$rootScope.wxstore.hideLoading();
	 	 			$location.url("tab/MyIntion");
	 	 	    }).error(function(data, status, headers, config) {
	 	 	    	//$rootScope.wxstore.hideLoading();
	 	 	    	console.log(data);
	 	 	    	//$rootScope.wxstore.showError(data);
	 	 	    });
	         }
	     };
	     
	     $scope.datepickerObject = {
	         titleLabel: '日期选择',  //Optional
	         todayLabel: '今天',  //Optional
	         closeLabel: '取消',  //Optional
	         setLabel: '确定',  //Optional
	         setButtonType: 'button-balanced',  //Optional
	         todayButtonType: 'button-balanced',  //Optional
	         closeButtonType: 'button-balanced',  //Optional
	         inputDate: new Date(),    //Optional
	         mondayFirst: false,    //Optional
//	         disabledDates: disabledDates, //Optional
	         weekDaysList: weekDaysList,   //Optional
	         monthList: monthList, //Optional
	         templateType: 'modal', //Optional
	         modalHeaderColor: 'bar-balanced', //Optional
	         modalFooterColor: 'bar-balanced', //Optional
	         from: new Date(1920,1,1),   //Optional
	         to: new Date(), //Optional
	         callback: function (val) {    //Mandatory
	             datePickerCallback(val);
	         }
	     };
 }]);
