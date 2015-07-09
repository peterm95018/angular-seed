'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('HomeCtrl', ['$scope', 'categoryList',
  	function($scope, categoryList) {
  		$scope.categories = categoryList;

  }])
  .controller('AddExpenseCtrl', ['$scope', 'categoryList', 'expService',
  	function($scope, categoryList, expService) {
  		$scope.categories = categoryList;

  		$scope.submit = function() {
  			expService.saveExpense($scope.expense);
  		};

      $scope.resetForm = function() {
        console.log('starting reset');
        $scope.addForm = {};
        $scope.addForm.$setUntouched();
        $scope.addForm.$setPristine();
        console.log('ending reset');
      };

  }])
  .controller('ViewSummaryCtrl', ['$scope', 'categoryList', 'expService',
  	function($scope, categoryList, expService) {
  		$scope.expenses = expService.getExpense();

      $scope.summaryData = [];

      var categories = categoryList;
      
      categories.forEach(function(item) {
        var catTotal = expService.getCategoryTotal(item);

        $scope.summaryData.push({
            category: item,
            amount: catTotal
        });


        /* remove the expense from the list */
      $scope.removeExpense = function(index) {
        $scope.expenses.splice(index,1);
      };

      /* call the deleteExpense function for this itemKey in services */
      $scope.deleteExpense = function(itemKey) {
        expService.deleteExpense(itemKey);
      };

    });
  	
  }])
.controller('NavigationCtrl',['$scope' ,'$location',
    function($scope,$location) {
      //var incrementer = 0;
      var navigator = function(incrementer) {
      var pages = ['/', '/add-expense', '/view-summary'];

      var nextUrl = "";
      var currentPage = $location.path();
      var lastPageIndex = pages.length - 1;
      var pageIndex = pages.indexOf(currentPage);
      var direction = pageIndex + incrementer;
      if (direction === -1) direction = lastPageIndex;
      if (direction > lastPageIndex) direction = 0;
      nextUrl = pages[direction];
      $location.url(nextUrl);

      $scope.slidingDirection = (incrementer === 1) ? 'slide-right' : 'slide-left';
    };

    

    $scope.goLeft = function() {
      navigator(-1);
    };
    $scope.goRight = function() {
      navigator(1);
    };
    

}



]);
