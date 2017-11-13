// alert('still hello')

// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

//ADDRESSES CHANGE IN ANGULARJS1.6 BEHAVIOR SO # LOGIC WILL STILL WORK
weatherApp.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

// ROUTES
weatherApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: '/static/AngularWeather/js/pages/home.htm',
        controller: 'homeController'
    })

    .when('/forecast', {
        templateUrl: '/static/AngularWeather/js/pages/forecast.htm',
        controller: 'forecastController'
    })

    // .when('/forecast/:days', {
    //     templateUrl: '/static/AngularWeather/js/pages/forecast1.htm',
    //     controller: 'forecastController'
    // })

});

//SERVICES
weatherApp.service('cityService',function(){
  this.city = "Chicago, IL"; //Default value
});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope', '$location', 'cityService', function($scope, $location, cityService) {
  $scope.city = cityService.city;

  $scope.$watch('city',function(){
    cityService.city = $scope.city;
  });

  $scope.submit = function(){
    $location.path("/forecast");
  };

}]);


weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService',
function($scope, $resource, $routeParams, cityService) {

  $scope.city = cityService.city;
  // $scope.days = $routeParams.days || '2';

  //OUTDATED INFO FOR WEATHER API
  // $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/?APPID=fe18ee52697b224410f7b2862ac27cbf", {
  // get: {method: "JSONP"}});
  //
  // $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});

  $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/weather?q=" + $scope.city.replace(/\s/g, '')
  + "&appid=fe18ee52697b224410f7b2862ac27cbf", {
  get: {method: "JSONP"}});

  $scope.weatherResult = $scope.weatherAPI.get();

  $scope.convertToDate = function(dt){
    return new Date(dt * 1000);
  };

  $scope.convertToFahrenheit = function(degK){
    return Math.round((1.8*(degK-273))+32);
  };

  $scope.convertToMPH = function(speedms){
    return Math.round(speedms * 2.23694);
  };

  console.log($scope.weatherResult);

}]);


//CUSTOM DIRECTIVES

// weatherApp.directive('weatherReport', function(){
//   return {
//     restrict : 'E',
//     templateUrl: '/static/AngularWeather/js/directives/weatherReport1.html',
//     replace: true,
//     scope: {
//        convertToStandard : "&",
//        convertToReadableDate : "&",
//        convertToWind : "&",
//        dateFormat : "@"
//     }
//   }
// })
