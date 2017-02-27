'use strict';

/**
 * 个人中心
 * MyCenterController
 * @constructor
 */
WxStoreApp.controller('MyCenterController', ["$rootScope","$scope","$http","$ionicModal","$location",
	function($rootScope,$scope, $http, $ionicModal,$location) {
	console.log('MyCenterController');	
    $scope.showMemberInfo = function() {
        $http.get('member/userInfolist.json').success(function(memberCenterPageVo){
      	console.log(memberCenterPageVo);
             //$scope.memberCenterPageVo = memberCenterPageVo;
        }).error(function(data, status, headers, config) {
        	 //$rootScope.wxstore.showError(data);
        });
    };
    $scope.showMemberInfo();
    
    $scope.sign=function(flag){
    	if(flag){
    		$rootScope.wxstore.showAlert("今天已经签到！");
    	}else{
    		$http.get('member/sign.json').success(function(){
        		$rootScope.wxstore.showAlert("签到成功");
        		$scope.showMemberInfo();
           }).error(function(data, status, headers, config) {
        	   	//$scope.showMemberInfo();
           	 //$rootScope.wxstore.showError(data);
           });
    	}
    }
	//跳转到积分说明
	$scope.integral=function(){
		$location.url("tab/MyIntegral");
	};
	//跳转到金牌会员
	$scope.gold=function(){
		$location.url("tab/MyGold");
	}
	
	
	
	
	
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
	
	
		//我的
        //初始化CreateAddress Model Window  
        //预约详情
        $ionicModal.fromTemplateUrl('resources/templates/appointMy.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal6 = modal;
        });
        $scope.closemodel6 = function() {
            $scope.modal6.hide();
        }
      
        //打开CreateAddress Model Window
        var arr_coach=[15,22,23];
        var astr2=[11];
        $scope.showmodel6 = function(dateObj,currentMonth) {
        	console.log(dateObj);
        	var aCol=$(".Date_timer .date_cell");  //当月所有表格集合
			var arrindex=[];
			var arraCol=[];
        	var currentMonth=parseInt(currentMonth);
			$.each(arr_coach,function(index,elem){
				console.log(typeof Number(elem))
				if(Number(dateObj.date)==Number(elem)&&astr2[0]==currentMonth){
					console.log(elem)
					$scope.modal6.show();
					var oInpt=$(".oinput input")
		        	var aInpt=$(".listappoint input")
		        	console.log(aInpt)
		        	console.log(oInpt.val())
		        	var i=0;
	        		$(oInpt).on("click",function(){
	        			i++;
			 			if(i%2==1){ //偶数时
				       	 	$.each(aInpt,function(index,elem){
		        				$(elem).prop("checked",true);   //设置属性
		        			});
			      	 	}else{
				      	 	console.log(i%2)
			       		 	$.each(aInpt,function(index,elem){
		        				$(elem).prop("checked",false);
		        			});
				       	}
	        		})
	        		
	        		
        		  	//确认订单
			        $ionicModal.fromTemplateUrl('resources/templates/appoint-sureOrder.html', {
			            scope: $scope,
			            animation: 'slide-in-up'
			        }).then(function(modal) {
			            $scope.modal5 = modal;
			        });   
			        $scope.openmodal5=function(){
			        	$scope.modal5.show();
			        	var arr_Inpt=[];
			        	var arr_Inpt2=[];
						var arr_coachh=JSON.parse(localStorage.getItem("arr_coachh"));
/*						for(var i=0;i<aInpt.length;i++){
							if(aInpt[i].checked){
								console.log(i)
								console.log(aInpt[i])
								arr_Inpt.push(i)
							}
						}
						console.log(arr_Inpt)
						for(var j=0;j<arr_coachh.length;j++){
							for(var i=0;i<arr_Inpt.length;i++){
								if(j==arr_Inpt[i]){
									arr_Inpt2.push(arr_coachh[j])
								}
							}
						}*/
						console.log(arr_coachh)
						var arr_coachh=[10,11,14,15,16]
						$scope.arr_coachh=arr_coachh;
						
			        }
			        $scope.closemodal5=function(){
			        	$scope.modal5.hide();
			        }  
	        		
	        		
	        		/*显示二维码*/
	        		$scope.drawCode = function(){
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
			                    data:$scope.qrCode2.obj,
			                    typeNumber: 1,
			                };
			                q.innerHTML = '';
			                q.appendChild(qrgen.canvas(options));
			            };
			            draw();//自动调用画图方法
					})(document.querySelector.bind(document));
			        }
	        		
	        		
	        		
			        $ionicModal.fromTemplateUrl('resources/templates/CardQR.html', {
			            scope: $scope,
			            animation: 'slide-in-up'
			        }).then(function(modal) {
			            $scope.modalQR = modal;
			        }); 
	        		 $scope.showQR=function(){
			        	$scope.modalQR.show();
			        }  
	        		 $scope.closeQR=function(){
			        	$scope.modalQR.hide();
			        }  
	        		
	        		var payobj={};
	        		payobj.orderSid=orderSid;
	        		payobj.couponSid=couponSid;
	        		payobj.cardSid=cardSid;
	        		payobj.integral=integral;
	        		payobj.originalPrice=originalPrice;
	        		$scope.payobj=payobj;
	        		 
				   	$scope.showQR_Code = function() {
				   	     $http.post('order/generateQRCode.json',$scope.payobj).success(function(PayQr){
				   	    	 	var qrCode2 = new Object();
				   	    	    qrCode2.mnickName = PayQr.mnickName;
				   	    	    qrCode2.mcomefrom = PayQr.mcomefrom;
				   	    	    qrCode2.mimg = PayQr.flag1;
				   	    	   /* qrCode2.qrInfo = "会员编号："+PayQr.sid+"，姓名："+PayQr.mrealName+"，昵称："+PayQr.mnickName+"，会员级别："+PayQr.levelName+"，积分："+PayQr.num;*/
				   	         	qrCode2.obj=obj;
				   	         	$scope.qrCode2 = qrCode2;
				   	         	//$scope.drawCode();   	         	
				   	         }).error(function(data, status, headers, config) {
				   	 	       	/* $rootScope.wxstore.showError(data);*/
				   	         });
				   	     };
				   	     
				   	  $scope.showQR_Code();   
	        		
	        		
	        		
				}
			})
		}
}]);