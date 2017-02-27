 angular.module('starter', ['ionic'])

          .run(function($ionicPlatform) {
            $ionicPlatform.ready(function() {
              // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
              // for form inputs)
              if(window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              }
              if(window.StatusBar) {
                StatusBar.styleDefault();
              }
            });
          })

          .controller( 'actionsheetCtl',['$scope','$ionicActionSheet','$timeout' ,function($scope,$ionicActionSheet,$timeout){
              $scope.show = function() {

                  var hideSheet = $ionicActionSheet.show({
                      buttons: [
                        { text: '拍照' },
                        { text: '从手机相册选出' },
                        {text:'保存'},
                      ],
//                    destructiveText: '保存图片',
                      //titleText: 'Modify your album',
                      cancelText: '取消',
                      cancel: function() {
                           // add cancel code..
                         },
                      buttonClicked: function(index) {
                        return true;
                      }
                  });

//                $timeout(function() {
//                    hideSheet();
//                }, 2000);

              };  
          }])