//This is the javascript for the user's home page
//We are really just handling button clicks and 
//We also have to receive the jsonified data at the start
//For a test just do a console log of the info 
var app = angular.module('myApp', []);
console.log("sdfa")
//This is the controller for users. It has the scope variable and http requests
app.controller("UserController", function($http, $scope, $q){

  
  $scope.test = function(){
    console.log("Hello") 
  }
  $scope.test();
});

