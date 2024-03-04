//This is the controller for the index page. It mostly deals with logging users in and creating new accounts
//We will handle logging users in by sending them to the right page
var app = angular.module('myApp', []);
app.controller("IndexController", function($http, $scope, $q){

  // Make an API request that checks a user exists and return a response
  $scope.login = function(){
    $http.get("")
  }

  //Submit function
});