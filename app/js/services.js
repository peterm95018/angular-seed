'use strict';

/* Services */

/* Factory for localStorage */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('categoryList',["Food", "Fuel", "Grocery", "Entertainment"])
  .factory('expService',[function() {
    var prefix = 'exp-mgr';
    return {
      saveExpense: function(data) {
        var timeStamp = Math.round(new Date().getTime());
        var key = prefix + timeStamp;

        /* add the key to the object for deletion */
        data.itemKey = key;
      
        data = JSON.stringify(data);
        localStorage[key] = data;

      },
      
      getExpense: function() {
    	var expenses = [];
    	var prefixLength = prefix.length;
    	Object.keys(localStorage)
        	.forEach(function(key) {
            	if (key.substring(0, prefixLength) == prefix) {
                	var item = window.localStorage[key];
                	item = JSON.parse(item);
                	expenses.push(item);
            	}
       		 });
        		return expenses;
      },

      deleteExpense: function() {
        var prefixLength = prefix.length;
        Object.keys(localStorage)
          .forEach(function(key) {
            /* write a new if statement comparing the itemKey */
              if (key.substring(0, prefixLength) == prefix) {
                  localStorage.removeItem(key);
              }
            });

      },

    getCategoryTotal: function(category) {
  		var categoryTotal = 0;
  		var prefixLength = prefix.length;
  			Object.keys(localStorage)
    			.forEach(function(key) {
      				if (key.substring(0, prefixLength) == prefix) {
        			var item = localStorage[key]
        			item = JSON.parse(item)
        				if (item.category == category) {
          					categoryTotal += parseFloat(item.amount);
          				}
          			}
          		});
  		return categoryTotal;
	   }
  }

}]);
