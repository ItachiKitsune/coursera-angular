(function () {
'use strict';

angular.module('app')
.component('myItemsList', {
  templateUrl: 'app/categories/items/itemsList.html',
  bindings:
  {
    items: '<'
  }
});


})();
