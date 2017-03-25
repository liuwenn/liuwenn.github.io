/**
 * Created by Peter on 2015-06-01.
 */
var OutlerCenterApp = {};

var WxStoreApp = angular.module('OutlerCenterApp', ['ionic','CoderYuan','OutlerCenterApp.filters', 'OutlerCenterApp.services', 'OutlerCenterApp.directives', 'ngDialog', 'tabSlideBox','ionic-citypicker','ionic-datepicker']);

/**
 * 问题：用户登录失效时的Ajax请求错误。直接得到login页面，而不是相应的业务数据。
 * 问题分析：当用户登录信息失效，这时的浏览器会得到302相应，并且浏览器会直接重定向到应用指定的[login URL]，然后Angularjs $http直接得到[login URL]的200相应。
 *          因此angularjs $http 的error函数并不会被调用，因为得到的是200，并且数据是登录页面的html。
 * 解决：使用拦截器，全局拦截 http的response，如果发现是登录页的html，让浏览器重定向到登录页面。
 */
WxStoreApp.factory('oauthInterceptor', ['$location', '$q', "$rootScope", function($location, $q, $rootScope) {
	return {
	    // All the following methods are optional
	    request: function(config) {
	      // Called before send a new XHR request.
	      // This is a good place where manipulate the
	      // request parameters.

	      return config || $q.when(config);
	    },

	    requestError: function(rejection) {
	      // Called when another request fails.

	      // I am still searching a good use case for this.
	      // If you are aware of it, please write a comment

	      return $q.reject(rejection);
	    },

	    response: function(response) {
	    	//console.log( response);
	    	//console.log("oauthInterceptor response");
	        // Called before a promise is resolved.
	    	if (typeof response.data === 'string') {
                if (response.data.indexOf instanceof Function &&  response.data.indexOf('<html weixinOauth2Login>') != -1) {
                	$rootScope.wxstore.reLoginAlert();
                	//$location.path("/wxstore");
                	//window.location = "/wxstore"; // just in case
                	//$state.go('tabs.store');
                }
            }
	      return response || $q.when(response);
	    },

	    responseError: function(rejection) {
	      // Called when another XHR request returns with
	      // an error status code.

	      return $q.reject(rejection);
	    }

	  }
	  
}]);

WxStoreApp.config(["$httpProvider","$stateProvider","$urlRouterProvider","$ionicConfigProvider",
                   function($httpProvider, $stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	//注入302重定向拦截器
	$httpProvider.interceptors.push('oauthInterceptor');
	
	//全局配置
	$ionicConfigProvider.platform.ios.tabs.style('standard'); 
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
   $ionicConfigProvider.platform.android.tabs.style('standard');
   $ionicConfigProvider.platform.android.tabs.position('bottom');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center'); 
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');  

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $ionicConfigProvider.backButton.previousTitleText(false);
    
	$ionicConfigProvider.backButton.text("");              //清除返回按钮文本   默认center.   Android 
//	$ionicConfigProvider.backButton.previousTitleText("")   //ios
//	$ionicConfigProvider.navBar.alignTitle("")      //navBar的标题的对齐方式
//	$ionicConfigProvider.navBar.positionPrimaryButtons("right")   //主导航栏对齐方式   默认 left.
//	$ionicConfigProvider.navBar.positionSecondaryButtons("right")   //次导航栏按钮的对齐方式. 默认right.

	 $stateProvider
	    .state('tabs', {
	      url: "/tab",
	      abstract: true,
	      templateUrl: "resources/templates/tabs.html"
	    })
	    .state('tabs.store', {
	      url: "/Store",
	      views: {
	        'store-tab': {
	             templateUrl: "resources/templates/store.html",
	             controller: 'StoreController'
	        }
	      }
	    })
	    .state('tabs.goodsDetail', {
	      url: "/GoodsDetail/:goodsId",//a 表情的href属性与此处的url对应
	      views: {
	        'store-tab': {//页面所属的tab
	             templateUrl: "resources/templates/store-goods-detail.html",//页面的位置
		         controller: 'StoreGoodsDetailController'//页面对应的前端的controller
	        }
	      }
	    })
	    .state('tabs.storeOrderConfirm', {
	      url: "/orderConfirm",
	      views: {
	        'store-tab': {
	             templateUrl: "resources/templates/order-confirm.html",
		         controller: 'OrderConfirmController'
	        }
	      }
	    })
	    .state('tabs.activity', {
	      url: "/Activity",
	      cache:'false', 
	      views: {
	        'activity-tab': {
	             templateUrl: "resources/templates/my-activity.html",
	             controller: 'ActivityController'
	        }
	      }
	    })
	    .state('tabs.appointment', {
	      url: "/Appointment",
	       cache:'false', 
	      views: {
	        'appointment-tab': {
	             templateUrl: "resources/templates/appointment.html",
	             controller: 'AppointMentController'
	        }
	      }
	    })
	    .state('tabs.appointcoach', {
	      url: "/Appointcoach",
	      views: {
	        'appointment-tab': {
	             templateUrl: "resources/templates/appoint-coach.html",
	             controller: 'AppointcoachController'
	        }
	      }
	    })
	    .state('tabs.appointmentmember', {
	      url: "/AppointmentMember",
	      views: {
	        'appointment-tab': {
	             templateUrl: "resources/templates/appointment-member.html",
	             controller: 'AppointMemberController'
	        }
	      }
	    })
	    /* //卡券
	    .state('tabs.cart', {
	      url: "/Cart",
	      cache:'false', 
	      views: {
	        'cart-tab': {
	             templateUrl: "resources/templates/cart.html",
	             controller: 'CartController'
	        }
	      }
	    })
	    .state('tabs.cartGoodsDetail', {
	      url: "/CartGoodsDetail/:goodsId",
	      views: {
	        'cart-tab': {
	             templateUrl: "resources/templates/cart-goods-detail.html",
	             controller: 'CartGoodsDetailController'
	        }
	      }
	    })
	    .state('tabs.cartOrderConfirm', {
	      url: "/orderConfirm",
	      views: {
	        'cart-tab': {
	        	 templateUrl: "resources/templates/order-confirm.html",
			     controller: 'OrderConfirmController'
	        }
	      }
	    })*/
	    //卡券2
	    .state('tabs.Card', {
	      url: "/Card",
	      cache:'false', 
	      views: {
	        'Card-tab': {
	          templateUrl: "resources/templates/Card.html",
	          controller: 'CardDetailsController'
	        }
	      }
	    })

	    .state('tabs.orderGoodsDetail', {
		      url: "/OrderGoodsDetail/:goodsId",
		      views: {
		        'Card-tab': {
		          templateUrl: "resources/templates/cart-goods-detail.html",
		          controller: 'CartGoodsDetailController'
		        }
		      }
		 })
	    
	     //优惠券详情
	    .state('tabs.CardCouponDetails', {
	      url: "/CardCouponDetails",
	      views: {
	        'Card-tab': {
	          templateUrl: "resources/templates/Card-Coupon-Details.html",
	        }
	      }
	    })
	    //会员卡详情
	    .state('tabs.CardMembershipDetails', {
	      url: "/CardMembershipDetails",
	      views: {
	        'Card-tab': {
	          templateUrl: "resources/templates/Card-Membership-Details.html",
	        }
	      }
	    })
	    //优惠券详情说明
	    .state('tabs.CardCouponDescription', {
	      url: "/CardCouponDescription",
	      views: {
	        'Card-tab': {
	          templateUrl: "resources/templates/Card-Coupon-Description.html",
	        }
	      }
	    })
	    
	    
	    
	    
	    
	    
	    
	    
	    
	    .state('tabs.myCenter', {
	      url: "/MyCenter",
       		cache:'false', 
	      views: {
	        'myCenter-tab': {
	          templateUrl: "resources/templates/my-center.html",
	          controller: 'MyCenterController'
	        }
	      }
	    })
	    //积分说明
	    .state('tabs.MyIntegral', {
	      url: "/MyIntegral",
	      views: {
	        'myCenter-tab': {
	          templateUrl: "resources/templates/my-Integral.html",
	          controller:'MyIntegralController'
	        }
	      }
	    })
	    //经验值
	    .state('tabs.MyExperience', {
	      url: "/MyExperience",
	      views: {
	        'myCenter-tab': {
	          templateUrl: "resources/templates/my-experience.html",
	        }
	      }
	    })
	    //金牌会员
	    .state('tabs.MyGold', {
	      url: "/MyGold",
	      views: {
	        'myCenter-tab': {
	          templateUrl: "resources/templates/my-gold.html",
	          controller:"MyGoldController"
	        }
	      }
	    })   
	    //金牌会员
	    .state('tabs.ceshi', {
	      url: "/ceshi",
	      views: {
	        'myCenter-tab': {
	          templateUrl: "resources/templates/ceshi.html",
	          controller:"ceshiController"
	        }
	      }
	    })  
	    
	    //收货地址
	    .state('tabs.myAddress', {
	       url: "/MyAddress",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-address-list.html",
	              controller: 'MyAddressController'
	          }
	       }
	    })
	    //个人信息
	    .state('tabs.myIntion', {
	       cache:false,
	       url: "/MyIntion",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Intion.html",
	              controller: 'MyIntionController'
	          }
	       }
	    })
	    //名字
	    .state('tabs.myIntionName', {
	       url: "/MyIntionName",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Intion-name.html",
	              controller: 'MyIntionNameController'
	          }
	       }
	    })
	    //昵称
	    .state('tabs.myNikeName', {
	       url: "/MyNikeName",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Intion-nikeName.html",
	              controller: 'MyNikeNameController'
	          }
	       }
	    })
	    //出生日期
	    .state('tabs.myBirthday', {
	       url: "/MyBirthday",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-birthday.html",
	              controller: 'MyBirthdayController'
	          }
	       }
	    })
	    //性别
	    .state('tabs.myIntionGender', {
	       url: "/MyIntionGender",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Intion-gender.html",
	              controller: 'MyIntionGenderController'
	          }
	       }
	    })
	    //我的二维码
	    .state('tabs.myIntionQR', {
	       url: "/MyIntionQR",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Intion-QR.html",
	              controller: 'QRCodeController'
	          }
	       }
	    })	    
	    //地区
	    .state('tabs.myIntionregion', {
	       url: "/MyIntionregion",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Intion-region.html",
	              controller: 'MyRegionController'
	          }
	       }
	    })
	    //账户与安全
	    .state('tabs.myAccount', {
	       url: "/MyAccountPassword",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-AccountPassword.html",
	          }
	       }
	    })
	    //服务中心
	    .state('tabs.myService', {
	       url: "/MyService",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Service.html",
	          }
	       }
	    })
	   	//卡券问题
	    .state('tabs.myServiceCard', {
	       url: "/MyServiceCard",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Service-Card.html",
	          }
	       }
	    })
		//积分问题
	    .state('tabs.myServiceIntegral', {
	       url: "/MyServiceIntegral",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Service-Integral.html",
	          }
	       }
	    })
		//会员问题
	    .state('tabs.myServiceMember', {
	       url: "/MyServiceMember",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Service-Member.html",
	          }
	       }
	    })
	    //其它问题
	    .state('tabs.myServiceOther', {
	       url: "/MyServiceOther",
	       views: {
	          'myCenter-tab': {
	              templateUrl: "resources/templates/my-Service-Other.html",
	              
	          }
	       }
	    })
	    
	    
	    
	    
	    
	    $urlRouterProvider.otherwise("/tab/Store");
	}]);

//run 方法初始化全局的数据 ,只对全局作用域起作用 如$rootScope
WxStoreApp.run(["$rootScope","$ionicLoading","$ionicPopup",function($rootScope, $ionicLoading, $ionicPopup){
		$rootScope.wxstore ={
				ctx : "member-wx",
				badgeData :{
					cartBadgeCount : 0,  //新加入购物车中的商品数量
					ordersBadgeCount : 0
				},
				cartNumber:0,  //购物车中的商品数量
				 
				//订单参数（通过设置全局变量，达到在两个controller之前传递对象类型的参数）
				orderVoListParam:{},
				orderFrom:"store",//订单页面的前一个页面：store:商城,cart:购物车。根据前一个页面所在tab弹出属于相应tab的addressPicker页面。
				
				//收货地址
				consigneeAddress:{},
				
				//加载蒙版 在前端可以防止重复提交
				showLoading : function() {
					$ionicLoading.show({
						template: '客官稍等，店小二玩命加载中...'
					});
				},
				hideLoading : function(){
					$ionicLoading.hide();
				},
				
				//错误信息 提示框
				showError : function(msg) {
					if(msg.errmsg && msg.errcode){
						msg='<h5 class="assertive">亲，出错啦！'+msg.errmsg+'</h5>';
					}
				    var alertPopup = $ionicPopup.alert({
				         title: '<h4 class="assertive">亲，出错啦！</h4>',
				         template: msg
				    });
				     
				    alertPopup.then(function(res) {
				         //console.log('Thank you for not eating my delicious ice cream cone');
				    });
				},
				
				//提示信息 提示框
				showAlert : function(msg) {
				     var alertPopup = $ionicPopup.alert({
				         title: '<h4 class="balanced">'+msg+'</h4>',
				         template: ""
				     });
				     
				     alertPopup.then(function(res) {
				         //console.log('Thank you for not eating my delicious ice cream cone');
				     });
				},
				
				//登录超时，点击确定将重新进入系统
				reLoginAlert : function() {
				     var alertPopup = $ionicPopup.alert({
				         title: '<h4 class="assertive">登录超时！</h4>',
				         okType:'button-positive',
				         okText:' 重 新 登 录 系 统 '
				     });
				     alertPopup.then(function(res) {
				    	 window.location = "/member-wx";
				     });
				}
				
		};
		
	}]);
