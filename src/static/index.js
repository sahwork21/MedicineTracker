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

    //You left the field blank so nothing is going to happen
    //This is more of insurance since the angular button should not work
    if(name === null || name.length === 0){
      $scope.invalid = true;
    }
    else{
      //Time to get a user 
      
      $http.get("/user/" + name).then(function(success){
        console.log("Success");

        //We got the user so display success and POST to get the right webpage
        $scope.invalid = false;
        $scope.success = true;

        //We will run a login api call that adds this user to a session group
        //The user must logout to get themselves removed from this collection of sessions
        //We are just doing this to have the frontend and backend check for a user
        /*
        $http.post("/login", name).then(function(success){
          console.log(success)
          //We were able to add the user to session so you can proceed
          //Session store the user and redirect
          

        });
        */

        sessionStorage.setItem("username", name);
        location.href = "/home";
        
        //Something went wrong with the server likely and you should not be here.
        console.log("Server failed us and you should have been redirected");
        

        
      }
      ,function (failure){
        console.log("Failed");
        console.log(failure);
        //The GET gave us a 404 error since the user was not found. Just return back to home with an error message
        $scope.invalid = true;
      });

    }

    
  }
});