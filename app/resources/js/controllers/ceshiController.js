'use strict';

/**
 * 选择 AppointMemberController
 * @constructor
 */
WxStoreApp.controller('ceshiController', ["$rootScope","$scope","$http","$location","$ionicModal",
	function($rootScope,$scope, $http,$location,$ionicModal) {
		
		//可以预约的日期
		$scope.findCoachA=function(){
			setTimeout(function(){
				
				$('#btn').click();
				/*$('#btn').trigger('click');
				document.getElementById("btn").click();*/
	     
	     	},100);
	     
	     
	    }
	     
	     
     $scope.findCoachA();
	     //日历
	     Date.prototype.Format = function (fmt11) { //author: meizz 
	    	    var o = {
	    	        "M+": this.getMonth() + 1, //月份 
	    	        "d+": this.getDate(), //日 
	    	        "h+": this.getHours(), //小时 
	    	        "m+": this.getMinutes(), //分 
	    	        "s+": this.getSeconds(), //秒 
	    	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
	    	        "S": this.getMilliseconds() //毫秒 
	    	    };
	    	    if (/(y+)/.test(fmt)) fmt = fmt. replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	    	    for (var k in o)
	    	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	    	    return fmt;
	    	}
	     
	     var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
	     var monthList = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
	     
	     $scope.datepickerObject = {
	         titleLabel: '我的预约',  //Optional
	        todayLabel: '今天',  //Optional
	         closeLabel: '取消',  //Optional
	         setLabel: '确定预约',  //Optional
	         setButtonType: 'button-balanced',  //Optional
	         todayButtonType: 'button-balanced',  //Optional
	         closeButtonType: 'button-balanced',  //Optional
	         inputDate: new Date(),    //Optional
	         mondayFirst: false,    //Optional
	         //disabledDates: disabledDates, //Optional
	         weekDaysList: weekDaysList,   //Optional
	         monthList: monthList, //Optional
	         templateType: 'modal', //Optional
	         modalHeaderColor: 'bar-balanced', //Optional
	         modalFooterColor: 'bar-balanced', //Optional
	         //from: new Date(1920,1,1),   //Optional
//	         from: new Date(),
//	         to: new Date(), //Optional  
	         closeOnSelect:false,// 是否显示确认按钮
	         showTodayButton:true,//如果为true，则显示今天按钮，选择日期直接回调
	         callback: function (val) {    //Mandatory
	             datePickerCallback(val);
	             
	         }
	     };
	     //选择日期后保存生日
	     var datePickerCallback = function (val){
	         if (typeof(val) === 'undefined'){
	             console.log('No date selected');
	         } else {
//	         	e.preventDefault();
				console.log(val)
	         }
	     };
	     
	     
 }]);