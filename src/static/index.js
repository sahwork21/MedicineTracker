//This is the controller for the index page. It mostly deals with logging users in and creating new accounts
//We will handle logging users in by sending them to the right page
var success = false;
var invalid = true;
var app = angular.module('myApp', []);
app.controller("IndexController", function($http, $scope, $q){


  console.log("Inside index controller")
  //Scope variables for displaying error messages
  $scope.data = {
    a:"aaa",
    b:"bbb"
  }

  $scope.formData = {
    username : ""
  };

  console.log($scope.formData)

  // Make an API request that checks a user exists and return a response
  $scope.login = function(){
    $http.get("")
  }

  //Submit function to handle an invalid username and return some info
  //If you want to get to your home you need to use this otherwise you will POST
  $scope.onSubmit = function(){
    //Access the form's username
    var name = $scope.formData.username;

    if(name === null || name.length === 0){
      $scope.invalid = true;
    }
    else{
      //Time to post 
      $http.post()
    }

    
  }
});