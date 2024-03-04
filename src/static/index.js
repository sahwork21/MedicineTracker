//This is the controller for the index page. It mostly deals with logging users in and creating new accounts
//We will handle logging users in by sending them to the right page

var app = angular.module('myApp', []);
app.controller("IndexController", function($http, $scope, $q){

  // Variables 
  $scope.success = false;
  $scope.invalid = false;
  
  
  
  //Scope variable to get username from the form
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
      //Time to get a user 
      var name = $scope.username;
      $http.get("/user/" + name, name).then(function(success){
        console.log("Success");

        //We got the user so display success and POST to get the right webpage
        $scope.invalid = false;
        $scope.success = true;

        $http.post("/home/" + name, name).then(function(response){
          
        });

        
      }
      ,function (failure){
        console.log("Failed");
        //The GET gave us a 404 error since the user was not found. Just return back to home with an error message
        $scope.invalid = true;
      });

    }

    
  }
});