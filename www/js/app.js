// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

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

.factory('VideoService', [
    '$http',
    '$q',
    function($http, $q) {
        var videoService = {
            getVideos: function() {
                var deferred = $q.defer();

                var promise = $http.get('http://localhost:3434/videos');

                promise.then(function(result) {
                    deferred.resolve(result.data);
                }, function(err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }
        };

        return videoService;
    }
])

.controller('VideoController', [
    '$scope',
    'VideoService',
    '$cordovaBarcodeScanner',
    function($scope, VideoService, $cordovaBarcodeScanner) {
        VideoService.getVideos()
            .then(function(result) {    
                $scope.videos = result;
                //alert(JSON.stringify(result));
            }, function(err) {
                alert("Error on getting data: " + JSON.stringify(err));
            });

        $scope.scan = function() {
            $cordovaBarcodeScanner
                .scan()
                .then(function(barcodeData) {
                    alert(barcodeData.text);
                }, function(err) {

                });
        }
    }
])