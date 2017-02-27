'use strict';

/* Filters */

var AppFilters = angular.module('OutlerCenterApp.filters', []);

AppFilters.filter('orderStatusNameFilter', function () {
    return function (text) {
    	/**
    	 * ----------订单状态----------
			1.待付款
			2.待发货
			3.待收货
			4.已收货
			5.已取消（付款前可以取消）
			6.退款（付款后，确认收货前可以申请退款，因为有可能快递原因导致未收到货）
		 */
    	var statusStr = "未知状态";
    	if(text == 1){
    		statusStr = "待付款";
    	}else if(text == 2){
    		statusStr = "待发货";
    	}else if(text == 3){
    		statusStr = "待收货";
    	}else if(text == 4){
    		statusStr = "已收货";
    	}else if(text == 5){
    		statusStr = "已取消";
    	}else if(text == 6){
    		statusStr = "已退款";
    	}
    	
    	
        return statusStr;
    }
});


AppFilters.filter('cardTypeFilter', function () {
    return function (text) {
    	/**
    	 * ----------卡类型----------
			0.普通卡
			1.次数卡
		 */
    	var statusStr = "未知卡类型";
    	if(text == 0){
    		statusStr = "普通卡";
    	}else if(text == 1){
    		statusStr = "次数卡";
    	}   	
    	
        return statusStr;
    }
});

/**
 * 日期格式转化
 */
AppFilters.filter('dateFormatFilter', function () {
    return function (text) {  
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
        return new Date(text).Format("yyyy-MM-dd");;
    }
});


AppFilters.filter('integralTypeFilter', function () {
    return function (text) {
    	/**
    	 * ----------积分类型----------
			1.手机注册
			2.手机登录
			3.签到
			4.大转盘
		 */
    	var statusStr = "未知积分类型";
    	if(text == 1){
    		statusStr = "手机注册";
    	}else if(text == 2){
    		statusStr = "手机登录";
    	}else if(text == 3){
    		statusStr = "签到";
    	}else if(text == 4){
    		statusStr = "大转盘";
    	}    	
        return statusStr;
    }
});







