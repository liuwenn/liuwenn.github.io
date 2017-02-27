'use strict';

/**
 * 商城
 * StoreController
 * @constructor
 */
WxStoreApp.controller('StoreController', ["$rootScope","$scope","$http","$ionicModal",
  function($rootScope, $scope, $http,$ionicModal) {
	//新闻列表
	$scope.fetchNewsList = function() {
        $http.get('cms/articalList.json').success(function(newsList){
            $scope.newsList = newsList;
            console.log("newsList:"+newsList);
        }).error(function(data, status, headers, config) {
        	$rootScope.wxstore.hideLoading();
        	console.log(data+"-"+status+"-"+headers+"-"+config);
        	$rootScope.wxstore.showError(data);
        });
    };
    //获取滚动图
    $scope.scrollImg = function() {
        $http.get('activity/scrollImg.json').success(function(scrollImgs){
            $scope.scrollImgs = scrollImgs;
            console.log("scrollImgs:"+scrollImgs);
            $scope.fetchNewsList();
        }).error(function(data, status, headers, config) {
        	$rootScope.wxstore.hideLoading();
        	//console.log(data+"-"+status+"-"+headers+"-"+config);
        	$rootScope.wxstore.showError(data);
        });
    };
    
    //$scope.scrollImg(); 
    
    //查询文章详情
    $scope.newsDetail = function(news) {
        $http.get('cms/articalInfo/'+news.id+'.json').success(function(news){
            $scope.news = news;
            $('#news').html(news.articleData.content);
            console.log("news:"+news);
        }).error(function(data, status, headers, config) {
        	$rootScope.wxstore.hideLoading();
        	console.log(data+"-"+status+"-"+headers+"-"+config);
        	$rootScope.wxstore.showError(data);
        	alert(1)
        });
    };
    
	//初始化文章详情弹出窗
	$ionicModal.fromTemplateUrl('resources/templates/news-detail.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.newsMdel = modal;
    });
	
	//打开文章详情弹出窗
	$scope.onNewsMdel = function(news){
		 $scope.newsDetail(news);
		$scope.newsMdel.show();				    
	}
	
	//关闭文章详情弹出窗
	$scope.closeNewsMdel = function(){
	    $scope.newsMdel.hide();
	}
	
}]);


