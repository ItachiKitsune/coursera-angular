(function () {
'use strict';

angular.module('app').config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  console.log("RoutesConfig fired.");

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'app/home/template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'app/categories/template.html',
    controller: 'CategoriesController as categoryList',
    resolve: {
      categories: ['DataService',
      function (DataService)
      {
        return DataService.GetCategories();
      }]
    }
  })

  .state('categories.items', {
    url: '/items/{categoryName}',
    templateUrl: 'app/categories/items/template.html',
    controller: "ItemsController as itemsList",
    resolve: {
      items: ['DataService','$stateParams',
      function (DataService,$stateParams)
      {
        return DataService.GetCategoryItems($stateParams.categoryName);
      }],
      selected: ['DataService','$stateParams',
      function (DataService,$stateParams)
      {
        return DataService.GetCategory($stateParams.categoryName);
      }]
    }

  });

}

})();
