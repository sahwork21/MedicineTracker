//This is the javascript for the user's home page
//We are really just handling button clicks and 
//We also have to receive the jsonified data at the start
//For a test just do a console log of the info 
var app = angular.module('myApp', []);
console.log("sdfa")
//This is the controller for users. It has the scope variable and http requests
app.controller("UserController", function($http, $scope, $q){

  //This scope variable will contain the user's information
  $scope.user;
  
  $scope.test = function(){
    console.log("Hello") 
    //Send an HTTP request to get the data for Alice
    $http.get("/user/Alice").then(function(response){
      //Get info from our response
      console.log(response);
      console.log(response.data);
      $scope.user = response.data;
      console.log($scope.user)
      //Flask 
    })
  }
  $scope.test();
});

