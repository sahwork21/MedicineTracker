//All this page does is get the information for a user's medicines.
//All we have to do is send a GET request and display an object

var app = angular.module('myApp', []);

app.controller("MedicineController", function($http, $scope, $q){
  //Create our scope variable for a user to point to 
  //Then make a get request for it
  //We also have to do the same trick with session storage to prevent illegal access
  //We also can depend on the url variables to prevent us from an illegal access
  //Hide this page to start
  $scope.showPage = false
  
  //This scope variable will contain the user's information
  $scope.user;

  // This scope variable will contain a list for our medicines
  $scope.medicines;

  //On the loading of this page we should get the username that came with this session
  $scope.loadUser = function(){
    //Use our session stored info.
    //We may also have to check that the session is stored by the API controller.
    var storedUname = sessionStorage.getItem("username")

    //If the uname does not exist we should redirect back to the login page
    //Also bail out if the username path variable is different
    const urlParams = new URLSearchParams(window.location.search);
    

    const paramName = urlParams.get('uname');
    if(paramName == null || storedUname == null || paramName != storedUname){
      location.href = "/";
    }
    else{

    //Get the user data now
      $http.get("/user/" + storedUname).then(function(response){
      //Get info from our response
      //console.log(response);
        console.log(response.data);
      
        $scope.user = response.data;

        //We also have to get their medicine information
        //This call needs to be made here since HTTP requests are asynchronous
        //Good thing we have another function for this
        $scope.loadMedicines();
      //console.log($scope.user);
      
      //Flask 
      });

      //Now show the page since we know the user is not cheating

      
      $scope.showPage = true;
    }
    //console.log($scope.user);


    


  }


  //Load up the medicines for this userID
  $scope.loadMedicines = function(){
    // Use the userID from the scope variable to assist us
    
    console.log($scope.user.userID);

    //Now make a get request
    // A 200 means we have data a 404 means no medicines exist and we don't need to display anything
    $http.get("/meds/" + $scope.user.userID).then(function(success){
      console.log(success.data);
      $scope.medicines = success.data;
    },

    //404 do nothing so just make an empty list then the ng-if tags will take care of the rest
    function(failure){
      console.log("No Meds found");
      $scope.medicines = [];
    });
  }

  //Start function to act like main kind of
  // Just load all the data so javascript does not skip over anything
  $scope.loadAllData = function(){
    //Load the user now
    $scope.loadUser();


  }

  $scope.loadAllData();

  

});

