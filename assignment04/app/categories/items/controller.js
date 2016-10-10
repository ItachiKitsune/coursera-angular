(function () {
'use strict';

angular.module('app')
.controller('ItemsController',
            ItemsController);


ItemsController.$inject = ['items','selected'];
function ItemsController(items, selected)
{
  var me = this;
  me.selected = selected;
  me.items = items;
}

})();
