(function () {
'use strict';

angular.module('app')
.component('myCategoriesList', {
  templateUrl: 'app/categories/categoryList.html',
  bindings:
  {
    items: '<'
  }
});


})();
