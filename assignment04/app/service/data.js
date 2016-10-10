(function()
{
  'use strict';

  angular.module('Data', []);

  angular.module('Data').config(function () {
    console.log("Data config fired.");
  }).
  run(function () {
    console.log("Data run fired.");
  });



  angular.module('Data').service("DataService", DataService);

  DataService.$inject = ['$q', '$http'];

  function DataService($q, $http)
  {
    var service = this;

    var cacheCategories = [];
    var cacheCategoryItems = {};

    var indexCategories = {};

    service.GetCategory = function(short_name)
    {
      var deferred = $q.defer();

      service.GetCategories().then(
        function success(response)
        {
          deferred.resolve(indexCategories[short_name]);
        });

      return deferred.promise;

    };


    service.GetCategories = function()
    {
      var deferred = $q.defer();

      if (cacheCategories.length !== 0)
      {
          deferred.resolve(cacheCategories);
      }
      else
      {
          $http(
            {
                method: 'GET',
                url: 'http://davids-restaurant.herokuapp.com/categories.json'
            }
          ).then(
            function success(response)
            {
                var data = response.data;
                cacheCategories = data;

                for(var idx=0, len=data.length, item; idx<len; idx++)
                {
                  item = data[idx];
                  indexCategories[item.short_name]=item;
                }

                deferred.resolve(data);
            },
            function failed(response)
            {
                deferred.reject(new Error('Call failed to get categories.'));
            }
          );
      }
      return deferred.promise;
    };

    service.GetCategoryItems = function(categoryShortName)
    {
      var deferred = $q.defer();
      console.log("GetCategoryItems('" + categoryShortName + "').in_get");

      if (cacheCategoryItems.hasOwnProperty(categoryShortName))
      {
        console.log("GetCategoryItems('" + categoryShortName + "').cached");
        deferred.resolve(cacheCategoryItems[categoryShortName]);
      }
      else
      {
        console.log("GetCategoryItems('" + categoryShortName + "').fetch");
        $http(
        {
          method: 'GET',
          url: 'https://davids-restaurant.herokuapp.com/menu_items.json',
          params:
          {
            category: categoryShortName
          }
        }).then(
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
              cacheCategoryItems[categoryShortName] = data;
              deferred.resolve(data);
            }
            catch (e)
            {
              deferred.reject(e);
            }
          },
          function failed(response)
          {
            deferred.reject(new Error('Call failed unable to get menu items for category "' + categoryShortName + '".'));
          }
        );
      }
      return deferred.promise;
    };
  }

})();
