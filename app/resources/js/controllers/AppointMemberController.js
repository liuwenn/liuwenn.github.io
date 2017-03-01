'use strict';

/**
 * 选择 AppointMemberController
 * @constructor
 */
WxStoreApp.controller('AppointMemberController', ["$rootScope","$scope","$http","$location","$ionicModal",
	function($rootScope,$scope, $http,$location,$ionicModal) {
		//教练个人信息展示
		var getlocalStorage=JSON.parse(localStorage.getItem("pulllocalStorage"));
		$scope.getlocalStorage=getlocalStorage;
		console.log($scope.getlocalStorage)
		
		//可以预约的日期
		$scope.findCoachA=function(){
			var findCoachB={}
				findCoachB.coachSid=getlocalStorage.merchantSid;
				findCoachB.condition=false;
				console.log(findCoachB)
				$scope.findCoachB=findCoachB;
			$http.post('coach/findCoachScheduleList.json',$scope.findCoachB).success(function(findCoach){
				console.log(findCoach)
				var astr='';
				astr=findCoach[0].dateTime;
				var astr_2=astr.split(' ')[0].slice(-4,-6);
				//将返回的可以预约的天数变成数组形式
				var arr_coach=[];
				for(var i=0;i<findCoach.length;i++){
						var a=findCoach[i].dateTime;
						var aa=a.split(' ')[0].slice(-2);
						arr_coach.push(aa)
				}
				console.log(arr_coach)
				$scope.findCoach = findCoach;
				//贮存数组
				
				var arr_coach=JSON.stringify(arr_coach)
				localStorage.setItem("arr_coach",arr_coach);
				localStorage.setItem("astr2",astr2);
				
		    }).error(function(data, status, headers, config) {
		    	/*$rootScope.wxstore.hideLoading();
		    	$rootScope.wxstore.showError(data);*/
		    });
		}
		$scope.findCoachA();
		
		//某天可以预约的时间段
		$scope.findCoachAA=function(dateObj,currentMonth){
			var findCoachBB={}
				findCoachBB.coachSid=getlocalStorage.merchantSid;
				findCoachBB.condition=false;
				findCoachBB.dateTime=dateObj.year+'-'+dateObj.month+'-'+dateObj.date
				console.log(findCoachBB)
				$scope.findCoachBB=findCoachBB;
			$http.post('coach/findCoachScheduleList.json',$scope.findCoachBB).success(function(findCoachh){
				console.log(findCoachh)
				alert('提交成功')
				//将返回的可以预约的时间段变成数组形式
				var arr_coachh=[];
				for(var i=0;i<findCoachh.length;i++){
						var a=findCoachh[i].start;
						arr_coachh.push(a)
						removal(arr_coachh)
				}
				console.log(arr_coachh)
				$scope.arr_coachh = arr_coachh;
				//贮存数组
				
				var arr_coachh=JSON.stringify(arr_coachh)
				localStorage.setItem("arr_coachh",arr_coachh);
				
		    }).error(function(data, status, headers, config) {
		    	/*$rootScope.wxstore.hideLoading();
		    	$rootScope.wxstore.showError(data);*/
		    });
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
	         titleLabel: '预约时段',  //Optional
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
	     
	     
	     
	     //日历时间段弹窗
        //初始化CreateAddress Model Window  弹窗
        $ionicModal.fromTemplateUrl('resources/templates/appointmentPopup.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.modal3 = modal;
        });
        //打开CreateAddress Model Window
        var arr_coach=[15,22,23];
        var astr2=[3];
        $scope.showmodel3 = function(dateObj,currentMonth) {
        	console.log(dateObj);
        	var aCol=$(".Date_timer .date_cell");  //当月所有表格集合
    		//console.log(aCol)
			var arrindex=[];
			var arraCol=[];
        	var currentMonth=parseInt(currentMonth);
			$.each(arr_coach,function(index,elem){
				console.log(typeof Number(elem))
				if(Number(dateObj.date)==Number(elem)&&astr2[0]==currentMonth){
					console.log(elem)
					$scope.modal3.show();
					$scope.findCoachAA(dateObj,currentMonth);
				}
			})
        	
            
            //选择时段
            var aSpan = $(".Popup_A span"); //13个时间段集合
            console.log(aSpan)
            var arrSpan = [];
            var arrSpan2 = [];
            for (var i = 0; i < aSpan.length; i++) {
                aSpan[i].index = i;
                aSpan[i].style.opacity = "1";
                aSpan[i].onclick = function() {
                    if (this.style.opacity == "1") { //时间段的变色开关设置
                        this.style.opacity = "0.4";
                        arrSpan.push(aSpan[this.index].innerHTML);
                        console.log(arrSpan)
                    } else {
                        this.style.opacity = "1";
                        console.log(aSpan[this.index].innerHTML)
                        Remove() //删除某个特定元素
                        arrSpan.remove(aSpan[this.index].innerHTML);
//                      removal(arrSpan); //数组去重
                        console.log(arrSpan)
                    }
                    arrSpan2=arrSpan;
					console.log(arrSpan2)   //要的就是你
                   $scope.closemodal3 = function() {
                        //预约预览 左nav
						$scope.secondCtrl(date)
						console.log(date)
                        var oyuxuan_left = document.getElementsByClassName('xuanzhong_left')[0];
                        var oDiv = document.createElement('div');
                        oDiv.innerHTML = $scope.myDate.year + '年' + ($scope.myDate.month + 1) + '月' + $scope.myDate.date + '日';
                        oyuxuan_left.appendChild(oDiv);
                        var oDate_timer = document.getElementsByClassName('Date_timer')[0];
                        var aCol = oDate_timer.getElementsByClassName('col');

                        //右
                        var oyuxuan_right = document.getElementsByClassName('xuanzhong_right')[0];
                        oyuxuan_right.innerHTML = "";
                        for (var j = 0; j < arrSpan.length; j++) {
                            var oDiv2 = document.createElement('div');
                            oyuxuan_right.appendChild(oDiv2);
                            oDiv2.innerHTML = arrSpan[j] + ",";
                            //console.log(arrSpan[j])
                            oDiv2.style.display = "inline-block";
                        }
                        $scope.modal3.hide();
                        
                    }
                }
                
            }
            
            
        }

        //数组去重
        function removal(arr) {
            for (var i = 0; i < arr.length; i++) {
                for (var j = i + 1; j < arr.length; j++) {
                    if (arr[i] === arr[j]) {
                        arr.splice(j, 1);
                        j--;
                    }
                }
            }
        }
        //删除某个特定的数组元素       
        function Remove() {
            Array.prototype.indexOf = function(val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) return i;
                }
                return -1;
            };
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) { this.splice(index, 1); }
            };
        }

        //关闭CreateAddress Model Window
        $scope.closemodel3 = function() {
            $scope.modal3.hide();
        }
		$scope.changemyDate=function(date){
			$scope.myDate=date;
			console.log($scope.myDate)
		}
	     
	     
	     
	     
	     
	     
	     
	     
	     
 }]);