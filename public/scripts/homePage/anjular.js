var myApp = angular.module('myApp',[ ]);

myApp.controller('myController', ['$scope', '$http', function ($scope,$http){
  $scope.name = '';
  $scope.password = '';

  $scope.getUser = function ()
  {
      $http.get('getDb')
     .then(function(response)
     {
        $scope.dataset = response.data;
     });

  }
  $scope.getUser();

}]);
