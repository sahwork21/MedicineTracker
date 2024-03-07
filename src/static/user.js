//This is the javascript for the user's home page
//We are really just handling button clicks and 
//We also have to receive the jsonified data at the start
//For a test just do a console log of the info 
var app = angular.module('myApp', []);

//This is the controller for users. It has the scope variable and http requests
app.controller("UserController", function($http, $scope, $q){

  //Hide this page to start
  $scope.showPage = false
  
  //This scope variable will contain the user's information
  $scope.user;

  //On the loading of this page we should get the username that came with this session
  $scope.loadUser = function(){
    //Use our session stored info.
    //We may also have to check that the session is stored by the API controller.
    var uname = sessionStorage.getItem("username")

    //If the uname does not exist we should redirect back to the login page
    if(uname == null){
      location.href = "/";
    }
    else{

    //Get the user data now
      $http.get("/user/" + uname).then(function(response){
      //Get info from our response
      //console.log(response);
      //console.log(response.data);
        $scope.user = response.data;
      //console.log($scope.user);
        $scope.show = true
      //Flask 
      })

      //Now show the page since we know the user is not cheating
      $scope.showPage = true;
    }


  }

  //Load the user now
  $scope.loadUser();

  //Create the other function for logging the user out
  //Remove this user's session info and redirect them to the home page
  $scope.logout = function(){
    //Remove sessionStorage info
    sessionStorage.removeItem("username");

    location.href = "/";
  }

  /*
  
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
  */
});

