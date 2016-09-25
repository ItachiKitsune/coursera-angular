(function () {
'use strict';

angular.module('app', [])
.service('AppService',AppService)
.controller('ToBuyController', ToBuyController)
.controller('BoughtController', BoughtController);

//controller for our to buy view.
ToBuyController.$inject = ['AppService'];
function ToBuyController(service)
{
  var controller = this;

  //items list for this view.
  controller.items = service.getToBuyList();

  //call this with $index to mark item as bought.
  controller.markBought = function(index)
  {
    service.BoughtItem(index);
  };

  //use this for ng-if to hide|show the error message.
  controller.itemsExist = function()
  {
    return controller.items.length!==0;
  };

}

//controller for out bought view.
BoughtController.$inject = ['AppService'];
function BoughtController(service)
{
  var controller = this;

  //items to show for this view.
  controller.items = service.getBoughtList();

  //use this for ng-if to show|hide the error message.
  controller.itemsExist = function()
  {
    return controller.items.length!==0;
  };

}

//our service.
function AppService()
{
  var service=this;

  //our initial list of items that need to be bought.
  var toBuy = [
    '10 bags of Cookies',
    '9 cases of Soda',
    '8 bags of chips',
    '7 cups of dip',
    '6 pounds of weenies',
    '5 cans of baked beans',
    '4 packs of paper plates',
    '3 bottles of barbaque sauce',
    '2 packs of sporks',
    '1 pack of earplugs'
  ];

  //our initial list of bought items.
  var bought = [];

  //the views call this when an Item has been bought.
  service.BoughtItem = function(index)
  {
    var item = toBuy.splice(index,1);
    bought.push(item[0]);
  };

  //the views call this to get the list of to-buy items.
  service.getToBuyList = function()
  {
    return toBuy;
  };

  //this views call this to get the list of bought items.
  service.getBoughtList = function()
  {
    return bought;
  };


}

})();
