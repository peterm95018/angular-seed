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

    });
  	
  }])
.controller('NavigationCtrl',['$scope' ,'$location',
    function($scope,$location) {
      var incrementer = '';
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
    };
$scope.slidingDirection = (incrementer === 1) ? 'slide-right' : 'slide-left';

    $scope.goLeft = function() {
      navigator(-1);
    };
    $scope.goRight = function() {
      navigator(1);
    };
    

}



]);
