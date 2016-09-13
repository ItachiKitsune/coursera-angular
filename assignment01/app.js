//
//app.controller
//
(function () {
'use strict';

//Setting up our controller
angular.module('app', [])
.controller('controller', AppController);

//Setting up minification protection.
AppController.$inject = ['$scope'];

//the body of our controller.
function AppController($scope)
{
  //Public Properties:
  $scope.usualDishes = "";  //Input
  $scope.response = "";     //Output

  //Public Methods:

  //This action is called when the user wants to
  //validate their Lunch.
  $scope.check = function ()
  {
    $scope.response = checkMenu($scope.usualDishes);
  };

  //Private Methods
  
  //Implementation of actual logic.
  function checkMenu(sin)
  {
    var items = [];           //holds the filtered list of
                              //what the user had for lunch.

    //examine the string by splitting it into an [] on ',' and
    //processing each item. If it's empty just discard it.
    //If not push it into the items[]
    sin.split(",")
    .forEach( function(x, i)
    {
      var t = x.trim();
      if (0===t.length)
      {
          return;
      }
      items.push(t);
    });

    //now we determine the response by the items.length.
    if (0===items.length)
    {
      return "Please enter data first";
    }
    else if (items.length<=3)
    {
      return "Enjoy!";
    }
    else
    {
      return "Too much!";
    }
  }
}

})();
