//All this page does is get the information for a user's medicines.
//All we have to do is send a GET request and display an object

var app = angular.module('myApp', []);

app.controller("MedicineController", function($http, $scope, $q){
  //Create our scope variable for a user to point to 
  //Then make a get request for it
  //We also have to do the same trick with session storage to prevent illegal access
  //We also can depend on the url variables to prevent us from an illegal access
  //Hide this page to start
  $scope.showPage = false;
  
  //This scope variable will contain the user's information
  $scope.user;

  // This scope variable will contain a list for our medicines
  $scope.medicines;


  //This is the boolean for showing or not showing the form for medicine entry
  $scope.showForm = false;

  //These scope variables have to do with the form for the entry form of the user
  //We might be able to reuse this to edit a medicine
  $scope.formData = {
    name : "",
    amount : ""
  };

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

  //This is the function for managing the popup form to create a new medicine
  // All it does is make the form show up on the page by turning the boolean for the form to true
  $scope.openForm = function(){
    $scope.showForm = true;
  }

  // This is like the openForm function but we are going to shut the form down
  // Turn the boolean to false so the form disappears
  $scope.closeForm = function(){
    $scope.showForm = false;


    //Clean up the entry data
    $scope.formData = {
      name : "",
      amount : ""
    };

    
  }



  // This is the submission form for the medicine. It will send a POST request to the /meds/<userid>
  // POST body will contain the name and amount for the medicine.
  // It should also wipe the text boxes on the form, close the form, and GET the medicine info a second time
  $scope.onSubmit = function(){

    //Make a POST request if the medicine name and amount are correct

    //Certify the amount is a number and is more than 0
    if(isNaN($scope.formData.amount) || $scope.formData.amount <= 0){
      //We should probably set some error scope vars here
      console.error("Error in medicine form");
    }
    else{
      //Convert the amount into an Integer on the server end
      //Don't want to stress the client system too hard
    
      console.log($scope.formData);
      
      // POST request with the formData body and clean everything up now
      $http.post("/meds/" + $scope.user.userID, $scope.formData).then(function(success){
        console.log("Inputting Meds");
        console.log(success);
        //Close the form and reget the meds
        $scope.closeForm();

        $scope.loadMedicines();

      },
      function(failure){
        //We messed up and the server did not like the input
        console.log("Cannot input meds");
      
      });

      

    }


  }



  //Delete a medicine row from our table
  //We will receive a button input with an id to delete. We will then have to reload the medicines table
  $scope.deleteMedicine = function(medID){
    //Make a DELETE request with the medID
    
    //We could add some extra verification here but SQL is probably quicker
    //Append the userID and medID onto the resource path
    $http.delete("/meds/" + $scope.user.userID + "/" + medID).then(function(success){
      console.log("Medicine deleted");
      
      //Reget the medicines
      $scope.loadMedicines();
    }
    ,function(failure){
      //The item was not found or the server messed up
      //This should probably not happen 
      console.error(failure);
    });


  }

  $scope.loadAllData();

  

});

