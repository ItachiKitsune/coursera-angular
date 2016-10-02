(function () {
'use strict';

angular.module('app', [])
.controller('mainController', MainController)
.service('DataSourceMenuService', DataSourceMenuService)
.directive('foundItems',FoundItemsDirective);

function FoundItemsDirective()
{
  var directive = this;

  var ddo =
  {
    templateUrl: 'foundlist.template',
    scope:
    {
      items : '<',
      title : '@',
      remove : '&'
    },
    controller: FoundListDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };


  return ddo;
}

function FoundListDirectiveController()
{
  var list = this;
}



MainController.$inject = ['DataSourceMenuService'];
function MainController(DataSourceMenu) {
  var controller = this;

  controller.searchTerm = '';
  controller.found = [];
  controller.exception = '';

  controller.hasException = function()
  {
    return controller.exception.length!==0;
  };

  controller.query = function()
  {
    controller.exception='';
    controller.found=[];

    if (controller.searchTerm.length===0)
    {
      controller.exception="Nothing Found. We carry many types of 'soup' and other dishes.";
      return;
    }


    DataSourceMenu
    .query(controller.searchTerm)
    .then(
      function success(result)
      {
        controller.found = result;

        if (controller.found.length===0)
        {
          controller.exception = "Nothing Found.";
        }

      },
      function onfail(error)
      {
        controller.exception = error.message;
      }
    );
  };

  controller.remove = function(idx)
  {
    controller.found.splice(idx,1);
    if (controller.found.length===0)
    {
      controller.exception = "I'm all out of suggestions.. Try again.";
    }
  };

}

DataSourceMenuService.$inject=['$q','$http'];
function DataSourceMenuService($q, $http)
{
  var service = this;

  service.query = function(str)
  {
    var strlc = str.toLowerCase();

    var deferred = $q.defer();

    $http(
      {
        method: 'GET',
        url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
      }
    ).then(

      function success(response)
      {
        var data = response.data;
        try
        {
          if (!data.hasOwnProperty('menu_items'))
          {
            throw new Error("Call failed to return the expected data structure!");
          }
          data = data.menu_items;
          var arry = [];
          for(var idx=0, len=data.length, item; idx<len; idx++)
          {
            item = data[idx];
            if (item.name.toLowerCase().indexOf(strlc)>=0)
            {
              arry.push(item);
            }
          }
          deferred.resolve(arry);
        }
        catch (e)
        {
          deferred.reject(e);
        }
      },
      function failed(response)
      {
        deferred.reject(new Error('Call failed.'));
      }
    );

    return deferred.promise;
  };


}









})();
