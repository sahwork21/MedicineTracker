//All this page does is get the information for a user's profile.
//All we have to do is send a GET request and display an object

var app = angular.module("myApp", []);

app.controller("ProfileController", function($http, $scope, $q){
  //Create our scope variable for a user to point to 
  //Then make a get request for it
  //We also have to do the same trick with session storage to prevent illegal access
  //We also can depend on the url variables to prevent us from an illegal access
  //Hide this page to start
  $scope.showPage = false
  
  //This scope variable will contain the user's information
  $scope.user;

  //On the loading of this page we should get the username that came with this session
  $scope.loadUser = function(){
    //Use our session stored info.
    //We may also have to check that the session is stored by the API controller.
    var storedUname = sessionStorage.getItem("username")

    //If the uname does not exist we should redirect back to the login page
    //Also bail out if the username path variable is different
    var urlParams = new URLSearchParams(window.location.search);
    var paramName = urlParams.get('uname');
    if(uname == null || paramName != storedUname){
      location.href = "/";
    }
    else{

    //Get the user data now
      $http.get("/user/" + paramName).then(function(response){
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

});

