(function () {
'use strict';

angular.module('app')
.controller('CategoriesController',
            CategoriesController);


CategoriesController.$inject = ['categories'];
function CategoriesController(categories)
{
  var me = this;
  me.categories = categories;
}

})();
