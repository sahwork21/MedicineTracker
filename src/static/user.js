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
      console.log($scope.user);
      //Flask 
    })


    //Test a post op
    // No id needed since the SQL insertion should do it for us
    $scope.user = {
      username : "Foo",
      age : 50,
      gender : "X",
      weight : 140,
      hpc : "Dr. Bar"
    }

    console.log($scope.user)

    $http.post("/user/Foo", $scope.user).then(
      //The user was created so tell the user
      function(success){
        console.log("New account");
      }

      //This is a duplicate name they input. Tell the user
      , function(failure){
        console.log("Duplicate Account");
      }

    )
  }
  $scope.test();
});

