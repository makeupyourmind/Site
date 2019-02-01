var myApp = angular.module('errorName',[ ]);

myApp.controller('controlName', ['$scope', '$http', function ($scope,$http){
  $scope.name = '';

$scope.getUser = function (){
  $http.get('getDb')
.then(function(response) {
    $scope.dataset = response.data;
});

}

$scope.getUser();

}]);
